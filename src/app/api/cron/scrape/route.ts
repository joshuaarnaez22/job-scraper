/**
 * Cron Scrape API
 * POST /api/cron/scrape - Trigger job scraping
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { runAllScrapers, type Job } from '@/lib/scrapers';
import { applyFilters, type FilterConfig } from '@/lib/filters';
import { sendJobAlert } from '@/lib/email';
import { scoreJobRelevance, type MatchingConfig } from '@/lib/ai';

export const maxDuration = 300; // 5 minutes max for Vercel

export async function POST(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const referer = request.headers.get('referer') || '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const isInternalRequest = referer.startsWith(appUrl);

  // Allow: valid auth header, Vercel cron, or internal dashboard requests
  const isAuthorized =
    !cronSecret ||
    authHeader === `Bearer ${cronSecret}` ||
    isVercelCron ||
    isInternalRequest;

  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const sitesParam = searchParams.get('sites');
    const dryRun = searchParams.get('dryRun') === 'true';
    const daysPostedParam = searchParams.get('daysPosted');

    // Get search config
    const configRecord = await prisma.searchConfig.findUnique({
      where: { id: 'default' },
    });

    if (!configRecord) {
      return NextResponse.json(
        { error: 'Search config not found. Please configure settings first.' },
        { status: 400 }
      );
    }

    const config = {
      keywords: JSON.parse(configRecord.keywords) as string[],
      excludeKeywords: JSON.parse(configRecord.excludeKeywords) as string[],
      enabledSites: JSON.parse(configRecord.enabledSites) as string[],
      daysPosted: configRecord.daysPosted,
      salaryMin: configRecord.salaryMin,
      salaryMax: configRecord.salaryMax,
      salaryCurrency: configRecord.salaryCurrency,
      jobTypes: JSON.parse(configRecord.jobTypes) as string[],
      experienceLevels: JSON.parse(configRecord.experienceLevels) as string[],
      workArrangements: JSON.parse(configRecord.workArrangements) as string[],
      excludeCompanies: JSON.parse(configRecord.excludeCompanies) as string[],
      requiredSkills: JSON.parse(configRecord.requiredSkills) as string[],
      preferredSkills: JSON.parse(configRecord.preferredSkills) as string[],
      useAIMatching: configRecord.useAIMatching,
      aiThreshold: configRecord.aiThreshold,
      digestMode: configRecord.digestMode,
      maxEmailsPerRun: configRecord.maxEmailsPerRun,
    };

    // Determine sites to scrape
    const sites = sitesParam
      ? sitesParam.split(',')
      : config.enabledSites;

    console.log(`[Cron] Starting scrape for sites: ${sites.join(', ')}`);
    console.log(`[Cron] Keywords: ${config.keywords.join(', ')}`);
    console.log(`[Cron] Days posted filter: ${daysPostedParam || config.daysPosted || 'none'}`);
    console.log(`[Cron] Dry run: ${dryRun}`);

    // Run scrapers
    const scrapeResults = await runAllScrapers({
      keywords: config.keywords,
      sites,
      dryRun,
    });

    // Collect all jobs
    const allJobs: Job[] = scrapeResults.results.flatMap((r) => r.jobs);
    console.log(`[Cron] Total jobs scraped: ${allJobs.length}`);

    // Apply filters (use query param if provided, otherwise use config)
    const effectiveDaysPosted = daysPostedParam ? parseInt(daysPostedParam) : config.daysPosted;
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

    const filteredJobs = applyFilters(allJobs, filterConfig);
    console.log(`[Cron] Jobs after filtering: ${filteredJobs.length}`);

    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        totalScraped: allJobs.length,
        afterFiltering: filteredJobs.length,
        results: scrapeResults.results.map((r) => ({
          site: r.site,
          jobsFound: r.jobs.length,
          error: r.error,
          duration: r.duration,
        })),
        sampleJobs: filteredJobs.slice(0, 5),
      });
    }

    // Check for duplicates and save new jobs
    const newJobs: Job[] = [];

    for (const job of filteredJobs) {
      const existing = await prisma.job.findUnique({
        where: {
          site_externalId: {
            site: job.site,
            externalId: job.externalId,
          },
        },
      });

      if (!existing) {
        // Score with AI if enabled
        let aiScore: number | undefined;
        let aiSummary: string | undefined;

        if (config.useAIMatching && process.env.OPENAI_API_KEY) {
          const matchConfig: MatchingConfig = {
            keywords: config.keywords,
            preferredSkills: config.preferredSkills,
            excludeKeywords: config.excludeKeywords,
          };

          const score = await scoreJobRelevance(job, matchConfig);

          // Skip if below threshold
          if (score.score < config.aiThreshold) {
            console.log(`[Cron] Skipping job (AI score ${score.score} < ${config.aiThreshold}): ${job.title}`);
            continue;
          }

          aiScore = score.score;
          aiSummary = score.summary;
        }

        // Save to database
        await prisma.job.create({
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
            aiScore,
            aiSummary,
          },
        });

        newJobs.push(job);
      }
    }

    console.log(`[Cron] New jobs saved: ${newJobs.length}`);

    // Log the scrape
    for (const result of scrapeResults.results) {
      await prisma.scrapeLog.create({
        data: {
          site: result.site,
          endedAt: new Date(),
          jobsFound: result.jobs.length,
          newJobs: newJobs.filter((j) => j.site === result.site).length,
          filtered: result.jobs.length - filteredJobs.filter((j) => j.site === result.site).length,
          status: result.error ? 'error' : 'success',
          error: result.error,
          duration: result.duration,
        },
      });
    }

    // Send email notification for new jobs
    if (newJobs.length > 0) {
      await sendJobAlert({
        jobs: newJobs,
        digestMode: config.digestMode,
        maxEmails: config.maxEmailsPerRun,
      });
    }

    return NextResponse.json({
      success: true,
      totalScraped: allJobs.length,
      afterFiltering: filteredJobs.length,
      newJobs: newJobs.length,
      duration: scrapeResults.duration,
      results: scrapeResults.results.map((r) => ({
        site: r.site,
        jobsFound: r.jobs.length,
        newJobs: newJobs.filter((j) => j.site === r.site).length,
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

// Also support GET for easier testing
export async function GET(request: NextRequest) {
  return POST(request);
}
