/**
 * Scraper Registry & Orchestrator
 * Coordinates scraping across all enabled job sites
 */

import { Job, ScraperConfig, ScraperResult, ScraperFunction } from './base';
import { getSiteConfig } from '@/config/sites';

// Import all scraper functions
import { scrapeOnlineJobs } from './onlinejobs';
import { scrapeJobstreet } from './jobstreet';
import { scrapeKalibrr } from './kalibrr';
import { scrapeLinkedIn } from './linkedin';
import { scrapeIndeed } from './indeed';
import { scrapeWeWorkRemotely } from './weworkremotely';
import { scrapeRemoteOK } from './remoteok';
import { scrapeUpwork } from './upwork';

// ===========================================
// Scraper Registry
// ===========================================

export const scrapers: Record<string, ScraperFunction> = {
  onlinejobs: scrapeOnlineJobs,
  jobstreet: scrapeJobstreet,
  kalibrr: scrapeKalibrr,
  linkedin: scrapeLinkedIn,
  indeed: scrapeIndeed,
  weworkremotely: scrapeWeWorkRemotely,
  remoteok: scrapeRemoteOK,
  upwork: scrapeUpwork,
};

// ===========================================
// Orchestrator
// ===========================================

export interface ScrapeOptions {
  keywords: string[];
  sites?: string[];          // Specific sites to scrape (defaults to all enabled)
  dryRun?: boolean;          // If true, don't save to database
  onProgress?: (result: ScraperResult) => void;
}

export interface ScrapeResults {
  totalJobs: number;
  newJobs: number;
  results: ScraperResult[];
  duration: number;
}

/**
 * Run scrapers for all enabled sites (or specified sites)
 */
export async function runAllScrapers(options: ScrapeOptions): Promise<ScrapeResults> {
  const startTime = Date.now();
  const results: ScraperResult[] = [];

  // Determine which sites to scrape
  const sitesToScrape = options.sites?.length
    ? options.sites.filter((id) => scrapers[id])
    : Object.keys(scrapers).filter((id) => getSiteConfig(id)?.enabled);

  console.log(`[Orchestrator] Starting scrape for ${sitesToScrape.length} sites:`, sitesToScrape);

  // Run scrapers sequentially to respect rate limits
  for (const siteId of sitesToScrape) {
    const result = await scrapeSite(siteId, options.keywords);
    results.push(result);

    if (options.onProgress) {
      options.onProgress(result);
    }

    console.log(`[Orchestrator] ${siteId}: ${result.jobs.length} jobs found${result.error ? ` (error: ${result.error})` : ''}`);
  }

  const totalJobs = results.reduce((sum, r) => sum + r.jobs.length, 0);

  return {
    totalJobs,
    newJobs: 0, // Will be calculated after deduplication/DB check
    results,
    duration: Date.now() - startTime,
  };
}

/**
 * Scrape a single site
 */
async function scrapeSite(siteId: string, keywords: string[]): Promise<ScraperResult> {
  const startTime = Date.now();
  const scraper = scrapers[siteId];
  const siteConfig = getSiteConfig(siteId);

  if (!scraper) {
    return {
      site: siteId,
      jobs: [],
      error: `Scraper not found for site: ${siteId}`,
      duration: 0,
    };
  }

  const config: ScraperConfig = {
    enabled: siteConfig?.enabled ?? true,
    rateLimit: siteConfig?.rateLimit ?? 2000,
    maxPages: siteConfig?.maxPages ?? 5,
    keywords,
    ...siteConfig?.settings,
  };

  try {
    const jobs = await scraper(keywords, config);
    return {
      site: siteId,
      jobs,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    console.error(`[${siteId}] Scraper error:`, error);
    return {
      site: siteId,
      jobs: [],
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Get all available scraper IDs
 */
export function getAvailableScrapers(): string[] {
  return Object.keys(scrapers);
}

/**
 * Check if a scraper exists
 */
export function hasScraper(siteId: string): boolean {
  return siteId in scrapers;
}

// Re-export types
export type { Job, ScraperConfig, ScraperResult, ScraperFunction };
