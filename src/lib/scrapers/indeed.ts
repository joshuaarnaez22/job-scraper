/**
 * Indeed PH Scraper
 * Global job board with Philippine listings
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

const SITE_ID = 'indeed';
const BASE_URL = 'https://ph.indeed.com';

export async function scrapeIndeed(
  keywords: string[],
  config: ScraperConfig
): Promise<Job[]> {
  const jobs: Job[] = [];

  for (const keyword of keywords) {
    for (let page = 0; page < config.maxPages; page++) {
      try {
        const start = page * 10;
        const url = buildSearchUrl(keyword, start);
        const html = await fetchPage(url);
        const pageJobs = parseJobListings(html);

        if (pageJobs.length === 0) break;

        jobs.push(...pageJobs);
        await delay(config.rateLimit);
      } catch (error) {
        console.error(`[${SITE_ID}] Error scraping page ${page} for "${keyword}":`, error);
        break;
      }
    }
  }

  return deduplicateJobs(jobs);
}

function buildSearchUrl(keyword: string, start: number): string {
  const params = new URLSearchParams({
    q: keyword,
    l: 'Philippines',
    fromage: '7', // Last 7 days
    remotejob: '1', // Remote jobs
    start: String(start),
  });
  return `${BASE_URL}/jobs?${params}`;
}

function parseJobListings(html: string): Job[] {
  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  // Indeed job card selectors
  $('.job_seen_beacon, .jobsearch-ResultsList > li, [data-jk]').each((_, element) => {
    const $el = $(element);

    const externalId = $el.attr('data-jk') || $el.find('a[data-jk]').attr('data-jk') || '';
    if (!externalId) return;

    const titleEl = $el.find('.jobTitle a, h2.jobTitle a').first();
    const title = cleanText(titleEl.text());
    if (!title) return;

    const href = titleEl.attr('href') || '';
    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

    const company = cleanText($el.find('.companyName, [data-testid="company-name"]').text());
    const location = cleanText($el.find('.companyLocation, [data-testid="text-location"]').text());
    const salaryText = $el.find('.salary-snippet, .estimated-salary, [data-testid="attribute_snippet_testid"]').text();
    const salary = parseSalary(salaryText);
    const description = cleanText($el.find('.job-snippet, .underShelfFooter').text());
    const dateText = $el.find('.date, [data-testid="myJobsStateDate"]').text();

    jobs.push({
      externalId,
      site: SITE_ID,
      title,
      company,
      salary: salaryText || undefined,
      salaryMin: salary.min,
      salaryMax: salary.max,
      salaryCurrency: salary.currency,
      description,
      url: fullUrl,
      location,
      postedAt: parseRelativeDate(dateText),
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
