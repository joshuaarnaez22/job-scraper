/**
 * Streaming Scrape API (Server-Sent Events)
 * GET /api/cron/scrape/stream - Stream job results for the authenticated user
 */

import { NextRequest } from 'next/server';
import { scrapers, type Job } from '@/lib/scrapers';
import { applyFilters, type FilterConfig } from '@/lib/filters';
import { getSiteConfig } from '@/config/sites';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { withServiceRls, withUserRls } from '@/lib/rls';

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  let user;
  try {
    user = await requireCurrentUser();
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return new Response('Unauthorized', { status: 401 });
    }
    throw error;
  }

  const { searchParams } = new URL(request.url);
  const daysPosted = searchParams.get('daysPosted');
  const fetchFullDetails = searchParams.get('fetchFullDetails') === 'true';

  const configRecord = await withUserRls(user.id, async (tx) =>
    tx.searchConfig.findUnique({ where: { userId: user.id } })
  );

  if (!configRecord) {
    return new Response('Search config not found', { status: 400 });
  }

  const config = {
    keywords: JSON.parse(configRecord.keywords) as string[],
    excludeKeywords: JSON.parse(configRecord.excludeKeywords) as string[],
    enabledSites: JSON.parse(configRecord.enabledSites) as string[],
    daysPosted: daysPosted ? parseInt(daysPosted) : configRecord.daysPosted,
    salaryMin: configRecord.salaryMin,
    salaryMax: configRecord.salaryMax,
    salaryCurrency: configRecord.salaryCurrency,
    jobTypes: JSON.parse(configRecord.jobTypes) as string[],
    experienceLevels: JSON.parse(configRecord.experienceLevels) as string[],
    workArrangements: JSON.parse(configRecord.workArrangements) as string[],
    excludeCompanies: JSON.parse(configRecord.excludeCompanies) as string[],
    requiredSkills: JSON.parse(configRecord.requiredSkills) as string[],
  };

  const filterConfig: FilterConfig = {
    daysPosted: config.daysPosted,
    salaryMin: config.salaryMin,
    salaryMax: config.salaryMax,
    salaryCurrency: config.salaryCurrency,
    jobTypes: config.jobTypes,
    experienceLevels: config.experienceLevels,
    workArrangements: config.workArrangements,
    excludeCompanies: config.excludeCompanies,
    excludeKeywords: config.excludeKeywords,
    requiredSkills: config.requiredSkills,
  };

  const encoder = new TextEncoder();
  const userId = user.id;

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      try {
        sendEvent('start', {
          keywords: config.keywords,
          sites: config.enabledSites,
          fetchFullDetails,
        });

        let totalFound = 0;
        let newJobsCount = 0;

        for (const siteId of config.enabledSites) {
          const scraper = scrapers[siteId];
          const siteConfig = getSiteConfig(siteId);

          if (!scraper || !siteConfig?.enabled) continue;

          sendEvent('site-start', { site: siteId });

          try {
            await scraper(config.keywords, {
              enabled: true,
              rateLimit: siteConfig.rateLimit,
              maxPages: siteConfig.maxPages,
              keywords: config.keywords,
              fetchFullDetails,
              onJobFound: async (job: Job) => {
                totalFound++;

                const filtered = applyFilters([job], filterConfig);
                if (filtered.length === 0) {
                  sendEvent('job-filtered', {
                    externalId: job.externalId,
                    title: job.title,
                    reason: 'Did not pass filters',
                  });
                  return;
                }

                const saved = await withServiceRls(async (tx) => {
                  let catalogJob = await tx.job.findUnique({
                    where: {
                      site_externalId: {
                        site: job.site,
                        externalId: job.externalId,
                      },
                    },
                  });

                  const isNewCatalog = !catalogJob;

                  if (!catalogJob) {
                    catalogJob = await tx.job.create({
                      data: {
                        externalId: job.externalId,
                        site: job.site,
                        title: job.title,
                        company: job.company,
                        salary: job.salary,
                        salaryMin: job.salaryMin,
                        salaryMax: job.salaryMax,
                        salaryCurrency: job.salaryCurrency,
                        description: job.description,
                        url: job.url,
                        jobType: job.jobType,
                        experienceLevel: job.experienceLevel,
                        workArrangement: job.workArrangement,
                        skills: job.skills ? JSON.stringify(job.skills) : null,
                        location: job.location,
                        postedAt: job.postedAt,
                      },
                    });
                  }

                  const existingMatch = await tx.userJob.findUnique({
                    where: {
                      userId_jobId: { userId, jobId: catalogJob.id },
                    },
                  });

                  if (existingMatch) {
                    return { duplicate: true as const };
                  }

                  await tx.userJob.create({
                    data: {
                      userId,
                      jobId: catalogJob.id,
                      status: 'new',
                    },
                  });

                  return {
                    duplicate: false as const,
                    isNewCatalog,
                    savedJob: catalogJob,
                  };
                });

                if (saved.duplicate) {
                  sendEvent('job-duplicate', {
                    externalId: job.externalId,
                    title: job.title,
                  });
                  return;
                }

                newJobsCount++;
                sendEvent('job', {
                  id: saved.savedJob.id,
                  externalId: job.externalId,
                  site: job.site,
                  title: job.title,
                  company: job.company,
                  salary: job.salary,
                  url: job.url,
                  jobType: job.jobType,
                  postedAt: job.postedAt,
                });
              },
            });

            sendEvent('site-complete', { site: siteId });
          } catch (error) {
            sendEvent('site-error', {
              site: siteId,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        }

        sendEvent('complete', {
          totalFound,
          newJobs: newJobsCount,
          filtered: totalFound - newJobsCount,
        });

        controller.close();
      } catch (error) {
        sendEvent('error', {
          message: error instanceof Error ? error.message : 'Unknown error',
        });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
