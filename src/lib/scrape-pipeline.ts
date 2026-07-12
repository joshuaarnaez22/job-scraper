/**
 * Shared scrape → catalog → match → digest pipeline
 * Used by Inngest workers and (fallback) synchronous callers.
 */

import { defaultSearchConfig } from '@/config/search';
import { filterEnabledSiteIds } from '@/config/sites';
import {
  applyFilters,
  matchesScrapeKeywords,
  selectScrapeKeywords,
  type FilterConfig,
} from '@/lib/filters';
import { sendJobAlert } from '@/lib/email';
import { scoreJobRelevance, type MatchingConfig } from '@/lib/ai';
import { withServiceRls } from '@/lib/rls';
import { scrapeSingleSite, type Job, type ScraperResult } from '@/lib/scrapers';

export type ParsedSearchConfig = {
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
  notificationEmail?: string | null;
};

export function parseSearchConfigRecord(
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
  },
  notificationEmail?: string | null
): ParsedSearchConfig {
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
    notificationEmail,
  };
}

export async function loadUserSearchConfigs(): Promise<ParsedSearchConfig[]> {
  return withServiceRls(async (tx) => {
    const configs = await tx.searchConfig.findMany({
      include: { user: { select: { email: true } } },
    });
    return configs.map((c) =>
      parseSearchConfigRecord(c.userId, c, c.user.email)
    );
  });
}

export function resolveScrapeTargets(options: {
  userConfigs: ParsedSearchConfig[];
  sites?: string[];
  keywords?: string[];
}): { sites: string[]; keywords: string[] } {
  const { userConfigs, sites, keywords } = options;

  const scrapeKeywords =
    keywords?.length
      ? keywords
      : userConfigs.length > 0
        ? [...new Set(userConfigs.flatMap((c) => c.keywords))]
        : defaultSearchConfig.keywords;

  const scrapeSites =
    sites?.length
      ? sites
      : userConfigs.length > 0
        ? [...new Set(userConfigs.flatMap((c) => c.enabledSites))]
        : defaultSearchConfig.enabledSites;

  // Hard gate: never scrape sites disabled in sites.ts (test / ops kill switch)
  const enabledSites = filterEnabledSiteIds(scrapeSites);

  // Each keyword = a full OnlineJobs search; keep the most specific few
  const cappedKeywords = selectScrapeKeywords(scrapeKeywords, 3);

  return { sites: enabledSites, keywords: cappedKeywords };
}

export type PipelineResult = {
  totalScraped: number;
  newCatalogJobs: number;
  userMatchesCreated: number;
  duration: number;
  results: Array<{
    site: string;
    jobsFound: number;
    newJobs: number;
    error?: string;
    duration: number;
  }>;
  catalogNewJobs: Job[];
};

/**
 * Scrape one site with retries; log empty/error outcomes.
 */
export async function scrapeSiteWithRetry(
  siteId: string,
  keywords: string[],
  maxAttempts = 3
): Promise<ScraperResult> {
  let last: ScraperResult = {
    site: siteId,
    jobs: [],
    error: 'not started',
    duration: 0,
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    last = await scrapeSingleSite(siteId, keywords);

    if (!last.error && last.jobs.length > 0) {
      return last;
    }

    // Empty but no hard error — retry once more; circuit after repeats
    if (!last.error && last.jobs.length === 0 && attempt < maxAttempts) {
      console.warn(
        `[Pipeline] ${siteId} returned 0 jobs (attempt ${attempt}/${maxAttempts})`
      );
      await new Promise((r) => setTimeout(r, 1000 * attempt));
      continue;
    }

    if (last.error && attempt < maxAttempts) {
      console.warn(
        `[Pipeline] ${siteId} error attempt ${attempt}: ${last.error}`
      );
      await new Promise((r) => setTimeout(r, 1500 * attempt));
      continue;
    }
  }

  if (!last.error && last.jobs.length === 0) {
    last = {
      ...last,
      error: `Empty result after ${maxAttempts} attempts (possible selector drift)`,
    };
  }

  return last;
}

/**
 * Upsert scraped jobs into the global catalog; return saved rows.
 * Batched so Neon interactive transactions stay under the timeout.
 */
export async function upsertJobsToCatalog(
  jobs: Job[]
): Promise<{ saved: { job: Job; dbId: string; isNew: boolean }[]; newJobs: Job[] }> {
  const saved: { job: Job; dbId: string; isNew: boolean }[] = [];
  const newJobs: Job[] = [];
  const BATCH = 25;

  for (let i = 0; i < jobs.length; i += BATCH) {
    const chunk = jobs.slice(i, i + BATCH);
    const batchResult = await withServiceRls(
      async (tx) => {
        const batchSaved: { job: Job; dbId: string; isNew: boolean }[] = [];
        const batchNew: Job[] = [];

        for (const job of chunk) {
          const existing = await tx.job.findUnique({
            where: {
              site_externalId: { site: job.site, externalId: job.externalId },
            },
          });

          if (existing) {
            batchSaved.push({ job, dbId: existing.id, isNew: false });
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

          batchNew.push(job);
          batchSaved.push({ job, dbId: created.id, isNew: true });
        }

        return { batchSaved, batchNew };
      },
      { timeout: 30_000 }
    );

    saved.push(...batchResult.batchSaved);
    newJobs.push(...batchResult.batchNew);
  }

  return { saved, newJobs };
}

/**
 * Match catalog jobs to users' filters and create UserJob rows.
 * AI scoring runs outside DB transactions; writes are batched.
 */
export async function matchJobsToUsers(options: {
  saved: { job: Job; dbId: string }[];
  userConfigs: ParsedSearchConfig[];
  daysPostedOverride?: number | null;
  /** If set, only match this user */
  onlyUserId?: string;
}): Promise<number> {
  const { saved, userConfigs, daysPostedOverride, onlyUserId } = options;
  let created = 0;

  const configs = onlyUserId
    ? userConfigs.filter((c) => c.userId === onlyUserId)
    : userConfigs;

  type PendingMatch = {
    userId: string;
    jobId: string;
    aiScore?: number;
    aiSummary?: string;
  };
  const pending: PendingMatch[] = [];

  for (const config of configs) {
    const effectiveDaysPosted =
      daysPostedOverride !== undefined && daysPostedOverride !== null
        ? daysPostedOverride
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
      keywords: config.keywords,
      requireKeywordInTitle: true,
    };

    const matchingJobs = applyFilters(
      saved
        .filter((s) => config.enabledSites.includes(s.job.site))
        .map((s) => s.job),
      filterConfig
    );

    const matchingIds = new Set(
      matchingJobs.map((j) => `${j.site}:${j.externalId}`)
    );

    for (const { job, dbId } of saved) {
      if (!matchingIds.has(`${job.site}:${job.externalId}`)) continue;

      let aiScore: number | undefined;
      let aiSummary: string | undefined;

      if (config.useAIMatching && process.env.DEEPSEEK_API_KEY) {
        const matchConfig: MatchingConfig = {
          keywords: config.keywords,
          preferredSkills: config.preferredSkills,
          excludeKeywords: config.excludeKeywords,
        };
        const score = await scoreJobRelevance(job, matchConfig);
        if (score.score < config.aiThreshold) continue;
        aiScore = score.score;
        aiSummary = score.summary;
      }

      pending.push({
        userId: config.userId,
        jobId: dbId,
        aiScore,
        aiSummary,
      });
    }
  }

  const BATCH = 40;
  for (let i = 0; i < pending.length; i += BATCH) {
    const chunk = pending.slice(i, i + BATCH);
    const inserted = await withServiceRls(
      async (tx) => {
        let n = 0;
        for (const row of chunk) {
          const existingMatch = await tx.userJob.findUnique({
            where: {
              userId_jobId: { userId: row.userId, jobId: row.jobId },
            },
          });
          if (existingMatch) continue;

          await tx.userJob.create({
            data: {
              userId: row.userId,
              jobId: row.jobId,
              status: 'new',
              aiScore: row.aiScore,
              aiSummary: row.aiSummary,
            },
          });
          n++;
        }
        return n;
      },
      { timeout: 30_000 }
    );
    created += inserted;
  }

  return created;
}

export async function writeScrapeLogs(
  results: ScraperResult[],
  newJobsBySite: Record<string, number>
): Promise<void> {
  await withServiceRls(async (tx) => {
    for (const result of results) {
      const isEmpty = !result.error && result.jobs.length === 0;
      await tx.scrapeLog.create({
        data: {
          site: result.site,
          endedAt: new Date(),
          jobsFound: result.jobs.length,
          newJobs: newJobsBySite[result.site] ?? 0,
          filtered: 0,
          status: result.error ? 'error' : isEmpty ? 'partial' : 'success',
          error: result.error ?? (isEmpty ? 'Zero jobs scraped' : null),
          duration: result.duration,
        },
      });
    }
  });
}

export async function sendDigestsForNewJobs(
  catalogNewJobs: Job[],
  userConfigs: ParsedSearchConfig[]
): Promise<void> {
  if (catalogNewJobs.length === 0 || userConfigs.length === 0) return;

  // Prefer the matched user's email; fall back to NOTIFICATION_EMAIL (Resend test mode
  // only allows the account owner address until a domain is verified).
  const digestUser = userConfigs.find((c) => c.digestMode) ?? userConfigs[0];
  const to =
    digestUser.notificationEmail || process.env.NOTIFICATION_EMAIL || undefined;

  await sendJobAlert({
    jobs: catalogNewJobs,
    to,
    digestMode: digestUser.digestMode,
    maxEmails: digestUser.maxEmailsPerRun,
  });
}

/**
 * Full pipeline (used by Inngest orchestrator and sync fallback).
 */
export async function runFullScrapePipeline(options: {
  sites?: string[];
  keywords?: string[];
  dryRun?: boolean;
  daysPosted?: number | null;
  onlyUserId?: string;
}): Promise<PipelineResult & { dryRun?: boolean; sampleJobs?: Job[] }> {
  const start = Date.now();
  const userConfigs = await loadUserSearchConfigs();
  const { sites, keywords } = resolveScrapeTargets({
    userConfigs,
    sites: options.sites,
    keywords: options.keywords,
  });

  const scrapeResultsList: ScraperResult[] = [];
  for (const siteId of sites) {
    scrapeResultsList.push(await scrapeSiteWithRetry(siteId, keywords));
  }
  const scrapeResults = {
    results: scrapeResultsList,
    totalJobs: scrapeResultsList.reduce((sum, r) => sum + r.jobs.length, 0),
    newJobs: 0,
    duration: Date.now() - start,
  };

  // Prefer retry path when running site-by-site from Inngest; here orchestrator already ran once.
  // Harden empty results into scrape logs below.

  const allJobsRaw = scrapeResults.results.flatMap((r) => r.jobs);
  // Drop loose OnlineJobs hits that never mention a keyword in the title
  const allJobs = allJobsRaw.filter((job) =>
    matchesScrapeKeywords(job, {
      keywords,
      requireKeywordInTitle: true,
    })
  );
  if (allJobs.length < allJobsRaw.length) {
    console.log(
      `[Pipeline] Keyword title gate: ${allJobsRaw.length} → ${allJobs.length} jobs`
    );
  }

  if (options.dryRun) {
    return {
      dryRun: true,
      totalScraped: allJobs.length,
      newCatalogJobs: 0,
      userMatchesCreated: 0,
      duration: Date.now() - start,
      results: scrapeResults.results.map((r) => ({
        site: r.site,
        jobsFound: r.jobs.length,
        newJobs: 0,
        error: r.error,
        duration: r.duration,
      })),
      catalogNewJobs: [],
      sampleJobs: allJobs.slice(0, 5),
    };
  }

  const { saved, newJobs } = await upsertJobsToCatalog(allJobs);
  const userMatchesCreated = await matchJobsToUsers({
    saved,
    userConfigs,
    daysPostedOverride: options.daysPosted,
    onlyUserId: options.onlyUserId,
  });

  const newJobsBySite: Record<string, number> = {};
  for (const j of newJobs) {
    newJobsBySite[j.site] = (newJobsBySite[j.site] ?? 0) + 1;
  }

  await writeScrapeLogs(scrapeResults.results, newJobsBySite);
  await sendDigestsForNewJobs(newJobs, userConfigs);

  return {
    totalScraped: allJobs.length,
    newCatalogJobs: newJobs.length,
    userMatchesCreated,
    duration: Date.now() - start,
    results: scrapeResults.results.map((r) => ({
      site: r.site,
      jobsFound: r.jobs.length,
      newJobs: newJobsBySite[r.site] ?? 0,
      error: r.error,
      duration: r.duration,
    })),
    catalogNewJobs: newJobs,
  };
}
