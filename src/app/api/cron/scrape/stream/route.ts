/**
 * Streaming Scrape API (Server-Sent Events)
 * GET /api/cron/scrape/stream - Stream job results in real-time
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { scrapers, type Job } from '@/lib/scrapers';
import { applyFilters, type FilterConfig } from '@/lib/filters';
import { getSiteConfig } from '@/config/sites';

export const maxDuration = 300; // 5 minutes max for Vercel

export async function GET(request: NextRequest) {
  // Verify authorization
  const referer = request.headers.get('referer') || '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const isInternalRequest = referer.startsWith(appUrl) || referer.includes('localhost');

  if (!isInternalRequest) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const daysPosted = searchParams.get('daysPosted');
  const fetchFullDetails = searchParams.get('fetchFullDetails') === 'true';

  // Create SSE stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // Get search config
        const configRecord = await prisma.searchConfig.findUnique({
          where: { id: 'default' },
        });

        if (!configRecord) {
          sendEvent('error', { message: 'Search config not found' });
          controller.close();
          return;
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

        // Send start event
        sendEvent('start', {
          keywords: config.keywords,
          sites: config.enabledSites,
          fetchFullDetails,
        });

        let totalFound = 0;
        let newJobsCount = 0;

        // Process each enabled site
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

                // Apply filters
                const filtered = applyFilters([job], filterConfig);
                if (filtered.length === 0) {
                  sendEvent('job-filtered', {
                    externalId: job.externalId,
                    title: job.title,
                    reason: 'Did not pass filters',
                  });
                  return;
                }

                // Check if job already exists
                const existing = await prisma.job.findUnique({
                  where: {
                    site_externalId: {
                      site: job.site,
                      externalId: job.externalId,
                    },
                  },
                });

                if (existing) {
                  sendEvent('job-duplicate', {
                    externalId: job.externalId,
                    title: job.title,
                  });
                  return;
                }

                // Save to database
                const savedJob = await prisma.job.create({
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

                newJobsCount++;

                // Stream the new job to the client
                sendEvent('job', {
                  id: savedJob.id,
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

        // Send completion event
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
      'Connection': 'keep-alive',
    },
  });
}
