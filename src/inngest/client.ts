import { Inngest } from 'inngest';

/**
 * JobScout Inngest app.
 * Keys come from env (INNGEST_EVENT_KEY / INNGEST_SIGNING_KEY).
 * With INNGEST_DEV=1, events go to the local Dev Server instead of Cloud.
 */
export const inngest = new Inngest({
  id: 'jobscout',
  name: 'JobScout',
});

export type ScrapeRequestedEvent = {
  name: 'scrape/requested';
  data: {
    sites?: string[];
    keywords?: string[];
    dryRun?: boolean;
    daysPosted?: number | null;
    onlyUserId?: string;
    source?: 'cron' | 'dashboard' | 'manual' | 'inngest-cron';
  };
};
