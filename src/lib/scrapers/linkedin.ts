/**
 * LinkedIn Jobs Scraper
 * IMPORTANT: LinkedIn blocks aggressively - use with caution
 * Recommended: 5s+ delays, max 3 pages
 */

import * as cheerio from 'cheerio';
import {
  Job,
  ScraperConfig,
  fetchPage,
  delay,
  parseSalary,
  parseRelativeDate,
  cleanText,
} from './base';

const SITE_ID = 'linkedin';
const BASE_URL = 'https://www.linkedin.com/jobs/search';

export async function scrapeLinkedIn(
  keywords: string[],
  config: ScraperConfig
): Promise<Job[]> {
  const jobs: Job[] = [];
  const geoId = ((config as Record<string, unknown>).geoId as string) || '103121230'; // Philippines

  for (const keyword of keywords) {
    for (let page = 0; page < Math.min(config.maxPages, 3); page++) {
      try {
        const start = page * 25;
        const url = buildSearchUrl(keyword, start, geoId);
        const html = await fetchPage(url);
        const pageJobs = parseJobListings(html);

        if (pageJobs.length === 0) break;

        jobs.push(...pageJobs);

        // LinkedIn is strict - use longer delays
        await delay(Math.max(config.rateLimit, 5000));
      } catch (error) {
        console.error(`[${SITE_ID}] Error scraping page ${page} for "${keyword}":`, error);
        // If blocked, stop scraping LinkedIn
        if (String(error).includes('429') || String(error).includes('403')) {
          console.warn(`[${SITE_ID}] Rate limited or blocked, stopping`);
          return jobs;
        }
        break;
      }
    }
  }

  return deduplicateJobs(jobs);
}

function buildSearchUrl(keyword: string, start: number, geoId: string): string {
  const params = new URLSearchParams({
    keywords: keyword,
    location: 'Philippines',
    geoId,
    f_TPR: 'r604800', // Last week
    f_WT: '2', // Remote
    start: String(start),
  });
  return `${BASE_URL}?${params}`;
}

function parseJobListings(html: string): Job[] {
  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  // LinkedIn job card selectors
  $('.jobs-search__results-list li, .job-search-card').each((_, element) => {
    const $el = $(element);

    const linkEl = $el.find('a.base-card__full-link, a[href*="/jobs/view/"]').first();
    const href = linkEl.attr('href') || '';
    const externalId = href.match(/\/jobs\/view\/(\d+)/)?.[1] || '';
    if (!externalId) return;

    const title = cleanText($el.find('.base-search-card__title, h3').text());
    if (!title) return;

    const company = cleanText($el.find('.base-search-card__subtitle, h4').text());
    const location = cleanText($el.find('.job-search-card__location').text());
    const dateText = $el.find('time').attr('datetime') || $el.find('.job-search-card__listdate').text();
    const salaryText = $el.find('.job-search-card__salary-info').text();
    const salary = parseSalary(salaryText);

    jobs.push({
      externalId,
      site: SITE_ID,
      title,
      company,
      salary: salaryText || undefined,
      salaryMin: salary.min,
      salaryMax: salary.max,
      salaryCurrency: salary.currency,
      description: '', // Would need to fetch job detail page
      url: href.startsWith('http') ? href : `https://www.linkedin.com${href}`,
      location,
      postedAt: dateText ? new Date(dateText) : parseRelativeDate($el.find('.job-search-card__listdate').text()),
    });
  });

  return jobs;
}

function deduplicateJobs(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    if (seen.has(job.externalId)) return false;
    seen.add(job.externalId);
    return true;
  });
}
