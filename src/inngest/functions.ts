import { inngest } from './client';
import { runFullScrapePipeline } from '@/lib/scrape-pipeline';

type ScrapePayload = {
  sites?: string[];
  keywords?: string[];
  dryRun?: boolean;
  daysPosted?: number | null;
  onlyUserId?: string;
  source?: string;
};

/**
 * Durable scrape orchestrator.
 * - Event: dashboard / Vercel cron via `scrape/requested`
 * - Cron: Inngest Cloud schedule (08:00 Asia/Manila) when not in INNGEST_DEV
 */
export const scrapeRequested = inngest.createFunction(
  {
    id: 'scrape-requested',
    name: 'Scrape requested',
    retries: 2,
    concurrency: [{ limit: 1 }],
    triggers: [
      { event: 'scrape/requested' },
      // Matches vercel.json cron intent; Inngest Cloud runs this in production
      { cron: 'TZ=Asia/Manila 0 8 * * *' },
    ],
  },
  async ({ event, step }) => {
    const data = (event.data ?? {}) as ScrapePayload;
    const source =
      data.source ??
      (event.name?.startsWith('inngest/scheduled.') || !event.data
        ? 'inngest-cron'
        : 'manual');

    const result = await step.run('run-scrape-pipeline', async () => {
      return runFullScrapePipeline({
        sites: data.sites,
        keywords: data.keywords,
        dryRun: data.dryRun,
        daysPosted: data.daysPosted,
        onlyUserId: data.onlyUserId,
      });
    });

    return {
      success: true,
      source,
      ...result,
    };
  }
);

export const inngestFunctions = [scrapeRequested];
