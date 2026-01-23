/**
 * Site-specific configuration for each job board
 */

export interface SiteConfig {
  id: string;
  name: string;
  enabled: boolean;
  baseUrl: string;
  rateLimit: number;      // ms between requests
  maxPages: number;
  // Site-specific settings
  settings?: Record<string, unknown>;
}

export const siteConfigs: Record<string, SiteConfig> = {
  onlinejobs: {
    id: 'onlinejobs',
    name: 'OnlineJobs.ph',
    enabled: true,
    baseUrl: 'https://www.onlinejobs.ph',
    rateLimit: 2000,
    maxPages: 5,
    settings: {
      categories: ['web-development', 'software-development'],
    },
  },

  jobstreet: {
    id: 'jobstreet',
    name: 'Jobstreet PH',
    enabled: false,       // Disabled - use onlinejobs only
    baseUrl: 'https://www.jobstreet.com.ph',
    rateLimit: 2000,
    maxPages: 5,
  },

  kalibrr: {
    id: 'kalibrr',
    name: 'Kalibrr',
    enabled: false,       // Disabled - use onlinejobs only
    baseUrl: 'https://www.kalibrr.com',
    rateLimit: 2000,
    maxPages: 5,
  },

  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn Jobs',
    enabled: false,       // Disabled - use onlinejobs only
    baseUrl: 'https://www.linkedin.com/jobs',
    rateLimit: 5000,
    maxPages: 3,
    settings: {
      geoId: '103121230',
      useEasyApplyOnly: false,
    },
  },

  indeed: {
    id: 'indeed',
    name: 'Indeed PH',
    enabled: false,       // Disabled - use onlinejobs only
    baseUrl: 'https://ph.indeed.com',
    rateLimit: 3000,
    maxPages: 5,
  },

  weworkremotely: {
    id: 'weworkremotely',
    name: 'We Work Remotely',
    enabled: false,       // Disabled - use onlinejobs only
    baseUrl: 'https://weworkremotely.com',
    rateLimit: 2000,
    maxPages: 5,
    settings: {
      categories: ['programming', 'design'],
    },
  },

  remoteok: {
    id: 'remoteok',
    name: 'RemoteOK',
    enabled: false,       // Disabled - use onlinejobs only
    baseUrl: 'https://remoteok.com',
    rateLimit: 1000,
    maxPages: 5,
    settings: {
      useApi: true,
    },
  },

  upwork: {
    id: 'upwork',
    name: 'Upwork',
    enabled: false,       // Disabled - RSS feed only
    baseUrl: 'https://www.upwork.com',
    rateLimit: 1000,
    maxPages: 1,
    settings: {
      useRss: true,
      rssUrl: 'https://www.upwork.com/ab/feed/jobs/rss',
    },
  },
};

/**
 * Get config for a specific site
 */
export function getSiteConfig(siteId: string): SiteConfig | undefined {
  return siteConfigs[siteId];
}

/**
 * Get all enabled sites
 */
export function getEnabledSites(): SiteConfig[] {
  return Object.values(siteConfigs).filter((site) => site.enabled);
}

/**
 * Get site IDs
 */
export function getAllSiteIds(): string[] {
  return Object.keys(siteConfigs);
}
