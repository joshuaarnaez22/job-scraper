/**
 * Jobstreet PH Scraper
 * Large Philippine job board
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

const SITE_ID = 'jobstreet';
const BASE_URL = 'https://www.jobstreet.com.ph';

export async function scrapeJobstreet(
  keywords: string[],
  config: ScraperConfig
): Promise<Job[]> {
  const jobs: Job[] = [];

  for (const keyword of keywords) {
    for (let page = 1; page <= config.maxPages; page++) {
      try {
        const url = buildSearchUrl(keyword, page);
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

function buildSearchUrl(keyword: string, page: number): string {
  const params = new URLSearchParams({
    keyword: keyword,
    datePosted: '7', // Last 7 days
    page: String(page),
  });
  return `${BASE_URL}/jobs?${params}`;
}

function parseJobListings(html: string): Job[] {
  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  // Jobstreet job card selectors (may need updates if site changes)
  $('[data-automation="job-card"], article[data-job-id], .job-card').each((_, element) => {
    const $el = $(element);

    const externalId = $el.attr('data-job-id') || $el.find('a[href*="/job/"]').attr('href')?.match(/\/job\/(\d+)/)?.[1] || '';
    if (!externalId) return;

    const titleEl = $el.find('[data-automation="jobTitle"], h1 a, .job-title a').first();
    const title = cleanText(titleEl.text());
    if (!title) return;

    const href = titleEl.attr('href') || '';
    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

    const company = cleanText($el.find('[data-automation="jobCompany"], .company-name').text());
    const location = cleanText($el.find('[data-automation="jobLocation"], .job-location').text());
    const salaryText = $el.find('[data-automation="jobSalary"], .salary').text();
    const salary = parseSalary(salaryText);
    const description = cleanText($el.find('[data-automation="jobShortDescription"], .job-description').text());
    const dateText = $el.find('[data-automation="jobListingDate"], .listing-date').text();

    // Detect job type and work arrangement from tags
    const tags = $el.find('.job-tag, .badge').map((_, t) => $(t).text().toLowerCase()).get();
    const jobType = detectJobType(tags);
    const workArrangement = detectWorkArrangement(tags, location);

    jobs.push({
      externalId,
      site: SITE_ID,
      title,
      company,
      salary: salaryText || undefined,
      salaryMin: salary.min,
      salaryMax: salary.max,
      salaryCurrency: salary.currency || 'PHP',
      description,
      url: fullUrl,
      location,
      jobType,
      workArrangement,
      postedAt: parseRelativeDate(dateText),
    });
  });

  return jobs;
}

function detectJobType(tags: string[]): string | undefined {
  const tagText = tags.join(' ');
  if (tagText.includes('full-time') || tagText.includes('full time')) return 'full-time';
  if (tagText.includes('part-time') || tagText.includes('part time')) return 'part-time';
  if (tagText.includes('contract')) return 'contract';
  if (tagText.includes('freelance')) return 'freelance';
  return undefined;
}

function detectWorkArrangement(tags: string[], location: string): string | undefined {
  const text = [...tags, location.toLowerCase()].join(' ');
  if (text.includes('remote') || text.includes('work from home') || text.includes('wfh')) return 'remote';
  if (text.includes('hybrid')) return 'hybrid';
  return 'onsite';
}

function deduplicateJobs(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    if (seen.has(job.externalId)) return false;
    seen.add(job.externalId);
    return true;
  });
}
