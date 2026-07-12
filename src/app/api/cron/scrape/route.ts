/**
 * Cron Scrape API
 * POST /api/cron/scrape - Shared catalog scrape + per-user UserJob matching
 */

import { NextRequest, NextResponse } from 'next/server';
import { defaultSearchConfig } from '@/config/search';
import { applyFilters, type FilterConfig } from '@/lib/filters';
import { sendJobAlert } from '@/lib/email';
import { scoreJobRelevance, type MatchingConfig } from '@/lib/ai';
import { withServiceRls } from '@/lib/rls';
import { runAllScrapers, type Job } from '@/lib/scrapers';

export const maxDuration = 300;

function isCronAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const referer = request.headers.get('referer') || '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const isInternalRequest = referer.startsWith(appUrl);

  return (
    !cronSecret ||
    authHeader === `Bearer ${cronSecret}` ||
    isVercelCron ||
    isInternalRequest
  );
}

type ParsedConfig = {
  userId: string;
  keywords: string[];
  excludeKeywords: string[];
  enabledSites: string[];
  daysPosted: number | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  jobTypes: string[];
  experienceLevels: string[];
  workArrangements: string[];
  excludeCompanies: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  useAIMatching: boolean;
  aiThreshold: number;
  digestMode: boolean;
  maxEmailsPerRun: number;
};

function parseSearchConfig(
  userId: string,
  record: {
    keywords: string;
    excludeKeywords: string;
    enabledSites: string;
    daysPosted: number | null;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string;
    jobTypes: string;
    experienceLevels: string;
    workArrangements: string;
    excludeCompanies: string;
    requiredSkills: string;
    preferredSkills: string;
    useAIMatching: boolean;
    aiThreshold: number;
    digestMode: boolean;
    maxEmailsPerRun: number;
  }
): ParsedConfig {
  return {
    userId,
    keywords: JSON.parse(record.keywords) as string[],
    excludeKeywords: JSON.parse(record.excludeKeywords) as string[],
    enabledSites: JSON.parse(record.enabledSites) as string[],
    daysPosted: record.daysPosted,
    salaryMin: record.salaryMin,
    salaryMax: record.salaryMax,
    salaryCurrency: record.salaryCurrency,
    jobTypes: JSON.parse(record.jobTypes) as string[],
    experienceLevels: JSON.parse(record.experienceLevels) as string[],
    workArrangements: JSON.parse(record.workArrangements) as string[],
    excludeCompanies: JSON.parse(record.excludeCompanies) as string[],
    requiredSkills: JSON.parse(record.requiredSkills) as string[],
    preferredSkills: JSON.parse(record.preferredSkills) as string[],
    useAIMatching: record.useAIMatching,
    aiThreshold: record.aiThreshold,
    digestMode: record.digestMode,
    maxEmailsPerRun: record.maxEmailsPerRun,
  };
}

export async function POST(request: NextRequest) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const sitesParam = searchParams.get('sites');
    const dryRun = searchParams.get('dryRun') === 'true';
    const daysPostedParam = searchParams.get('daysPosted');

    const userConfigs = await withServiceRls(async (tx) => {
      const configs = await tx.searchConfig.findMany();
      return configs.map((c) => parseSearchConfig(c.userId, c));
    });

    const scrapeKeywords =
      userConfigs.length > 0
        ? [...new Set(userConfigs.flatMap((c) => c.keywords))]
        : defaultSearchConfig.keywords;

    const scrapeSites = sitesParam
      ? sitesParam.split(',')
      : userConfigs.length > 0
        ? [...new Set(userConfigs.flatMap((c) => c.enabledSites))]
        : defaultSearchConfig.enabledSites;

    console.log(`[Cron] Starting scrape for sites: ${scrapeSites.join(', ')}`);
    console.log(`[Cron] Keywords: ${scrapeKeywords.join(', ')}`);
    console.log(`[Cron] Users to match: ${userConfigs.length}`);
    console.log(`[Cron] Dry run: ${dryRun}`);

    const scrapeResults = await runAllScrapers({
      keywords: scrapeKeywords,
      sites: scrapeSites,
      dryRun,
    });

    const allJobs: Job[] = scrapeResults.results.flatMap((r) => r.jobs);
    console.log(`[Cron] Total jobs scraped: ${allJobs.length}`);

    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        totalScraped: allJobs.length,
        users: userConfigs.length,
        results: scrapeResults.results.map((r) => ({
          site: r.site,
          jobsFound: r.jobs.length,
          error: r.error,
          duration: r.duration,
        })),
        sampleJobs: allJobs.slice(0, 5),
      });
    }

    const catalogNewJobs: Job[] = [];
    let userMatchesCreated = 0;

    await withServiceRls(async (tx) => {
      const savedJobs: { job: Job; dbId: string }[] = [];

      for (const job of allJobs) {
        const existing = await tx.job.findUnique({
          where: {
            site_externalId: {
              site: job.site,
              externalId: job.externalId,
            },
          },
        });

        if (existing) {
          savedJobs.push({ job, dbId: existing.id });
          continue;
        }

        const created = await tx.job.create({
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

        catalogNewJobs.push(job);
        savedJobs.push({ job, dbId: created.id });
      }

      for (const config of userConfigs) {
        const effectiveDaysPosted = daysPostedParam
          ? parseInt(daysPostedParam)
          : config.daysPosted;

        const filterConfig: FilterConfig = {
          daysPosted: effectiveDaysPosted,
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

        const matchingJobs = applyFilters(
          savedJobs
            .filter((s) => config.enabledSites.includes(s.job.site))
            .map((s) => s.job),
          filterConfig
        );

        const matchingIds = new Set(
          matchingJobs.map((j) => `${j.site}:${j.externalId}`)
        );

        for (const { job, dbId } of savedJobs) {
          if (!matchingIds.has(`${job.site}:${job.externalId}`)) continue;

          const existingMatch = await tx.userJob.findUnique({
            where: {
              userId_jobId: { userId: config.userId, jobId: dbId },
            },
          });
          if (existingMatch) continue;

          let aiScore: number | undefined;
          let aiSummary: string | undefined;

          if (config.useAIMatching && process.env.DEEPSEEK_API_KEY) {
            const matchConfig: MatchingConfig = {
              keywords: config.keywords,
              preferredSkills: config.preferredSkills,
              excludeKeywords: config.excludeKeywords,
            };
            const score = await scoreJobRelevance(job, matchConfig);
            if (score.score < config.aiThreshold) {
              console.log(
                `[Cron] Skipping UserJob (AI ${score.score} < ${config.aiThreshold}): ${job.title}`
              );
              continue;
            }
            aiScore = score.score;
            aiSummary = score.summary;
          }

          await tx.userJob.create({
            data: {
              userId: config.userId,
              jobId: dbId,
              status: 'new',
              aiScore,
              aiSummary,
            },
          });
          userMatchesCreated++;
        }
      }

      for (const result of scrapeResults.results) {
        await tx.scrapeLog.create({
          data: {
            site: result.site,
            endedAt: new Date(),
            jobsFound: result.jobs.length,
            newJobs: catalogNewJobs.filter((j) => j.site === result.site).length,
            filtered: 0,
            status: result.error ? 'error' : 'success',
            error: result.error,
            duration: result.duration,
          },
        });
      }
    });

    console.log(`[Cron] New catalog jobs: ${catalogNewJobs.length}`);
    console.log(`[Cron] UserJob matches created: ${userMatchesCreated}`);

    if (catalogNewJobs.length > 0 && userConfigs[0]) {
      await sendJobAlert({
        jobs: catalogNewJobs,
        digestMode: userConfigs[0].digestMode,
        maxEmails: userConfigs[0].maxEmailsPerRun,
      });
    }

    return NextResponse.json({
      success: true,
      totalScraped: allJobs.length,
      newCatalogJobs: catalogNewJobs.length,
      userMatchesCreated,
      duration: scrapeResults.duration,
      results: scrapeResults.results.map((r) => ({
        site: r.site,
        jobsFound: r.jobs.length,
        newJobs: catalogNewJobs.filter((j) => j.site === r.site).length,
        error: r.error,
        duration: r.duration,
      })),
    });
  } catch (error) {
    console.error('[Cron] Scrape error:', error);
    return NextResponse.json(
      { error: 'Scrape failed', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
