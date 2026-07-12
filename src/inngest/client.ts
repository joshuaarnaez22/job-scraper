import { Inngest } from 'inngest';

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
    source?: 'cron' | 'dashboard' | 'manual';
  };
};
