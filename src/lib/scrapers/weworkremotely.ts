/**
 * We Work Remotely Scraper
 * Remote-first job board
 */

import * as cheerio from 'cheerio';
import {
  Job,
  ScraperConfig,
  fetchPage,
  delay,
  parseRelativeDate,
  cleanText,
} from './base';

const SITE_ID = 'weworkremotely';
const BASE_URL = 'https://weworkremotely.com';

export async function scrapeWeWorkRemotely(
  keywords: string[],
  config: ScraperConfig
): Promise<Job[]> {
  const jobs: Job[] = [];
  const categories = ['remote-jobs/programming', 'remote-jobs/design', 'remote-jobs/devops-sysadmin'];

  for (const category of categories) {
    try {
      const url = `${BASE_URL}/categories/${category}`;
      const html = await fetchPage(url);
      const categoryJobs = parseJobListings(html, keywords);
      jobs.push(...categoryJobs);
      await delay(config.rateLimit);
    } catch (error) {
      console.error(`[${SITE_ID}] Error scraping ${category}:`, error);
    }
  }

  return deduplicateJobs(jobs);
}

function parseJobListings(html: string, keywords: string[]): Job[] {
  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  $('li.feature, li.new').each((_, element) => {
    const $el = $(element);

    const linkEl = $el.find('a[href*="/remote-jobs/"]').first();
    const href = linkEl.attr('href') || '';
    const externalId = href.split('/').pop() || '';
    if (!externalId) return;

    const title = cleanText($el.find('.title').text());
    if (!title) return;

    // Check if matches keywords
    const searchText = `${title} ${$el.text()}`.toLowerCase();
    const matches = keywords.some((kw) => searchText.includes(kw.toLowerCase()));
    if (!matches) return;

    const company = cleanText($el.find('.company').text());
    const location = cleanText($el.find('.region').text());
    const dateText = $el.find('time').attr('datetime') || $el.find('.date').text();

    jobs.push({
      externalId,
      site: SITE_ID,
      title,
      company,
      description: '', // Would need to fetch individual job pages for full description
      url: `${BASE_URL}${href}`,
      location,
      workArrangement: 'remote',
      postedAt: dateText ? new Date(dateText) : parseRelativeDate($el.find('.date').text()),
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
