import { inngest } from './client';
import { runFullScrapePipeline } from '@/lib/scrape-pipeline';

/**
 * Durable scrape orchestrator.
 * Triggered by cron or dashboard via `scrape/requested`.
 *
 * Uses a single pipeline step (retries as a unit). Per-site fan-out can be
 * split later once job payloads are serialization-safe.
 */
export const scrapeRequested = inngest.createFunction(
  {
    id: 'scrape-requested',
    name: 'Scrape requested',
    retries: 2,
    concurrency: [{ limit: 1 }],
    triggers: [{ event: 'scrape/requested' }],
  },
  async ({ event, step }) => {
    const data = (event.data ?? {}) as {
      sites?: string[];
      keywords?: string[];
      dryRun?: boolean;
      daysPosted?: number | null;
      onlyUserId?: string;
      source?: string;
    };

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
      source: data.source ?? 'manual',
      ...result,
    };
  }
);

export const inngestFunctions = [scrapeRequested];
