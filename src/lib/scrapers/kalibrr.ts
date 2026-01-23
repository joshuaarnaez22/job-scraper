/**
 * Kalibrr Scraper
 * Philippine tech-focused job board
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

const SITE_ID = 'kalibrr';
const BASE_URL = 'https://www.kalibrr.com';

export async function scrapeKalibrr(
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
    sort: 'Freshness', // Most recent first
    page: String(page),
  });
  return `${BASE_URL}/home/te/jobs?${params}`;
}

function parseJobListings(html: string): Job[] {
  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  // Kalibrr job card selectors (may need updates if site changes)
  $('[data-testid="job-card"], .k-job-card, .job-card').each((_, element) => {
    const $el = $(element);

    const linkEl = $el.find('a[href*="/c/"][href*="/jobs/"]').first();
    const href = linkEl.attr('href') || '';
    const externalId = href.match(/\/jobs\/(\d+)/)?.[1] || '';
    if (!externalId) return;

    const title = cleanText($el.find('.k-job-card__title, h2, .job-title').text());
    if (!title) return;

    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

    const company = cleanText($el.find('.k-job-card__company, .company-name').text());
    const location = cleanText($el.find('.k-job-card__location, .job-location').text());
    const salaryText = $el.find('.k-job-card__salary, .salary').text();
    const salary = parseSalary(salaryText);
    const dateText = $el.find('.k-job-card__date, .posted-date').text();

    // Extract job type and arrangement from badges/tags
    const badges = $el.find('.k-badge, .badge, .tag').map((_, b) => $(b).text().toLowerCase()).get();
    const jobType = detectJobType(badges);
    const workArrangement = detectWorkArrangement(badges, location);
    const experienceLevel = detectExperienceLevel(title, badges);

    jobs.push({
      externalId,
      site: SITE_ID,
      title,
      company,
      salary: salaryText || undefined,
      salaryMin: salary.min,
      salaryMax: salary.max,
      salaryCurrency: salary.currency || 'PHP',
      description: '',
      url: fullUrl,
      location,
      jobType,
      workArrangement,
      experienceLevel,
      postedAt: parseRelativeDate(dateText),
    });
  });

  return jobs;
}

function detectJobType(badges: string[]): string | undefined {
  const text = badges.join(' ');
  if (text.includes('full-time') || text.includes('full time')) return 'full-time';
  if (text.includes('part-time') || text.includes('part time')) return 'part-time';
  if (text.includes('contract') || text.includes('contractor')) return 'contract';
  if (text.includes('freelance') || text.includes('project-based')) return 'freelance';
  if (text.includes('intern')) return 'internship';
  return 'full-time'; // Default for Kalibrr
}

function detectWorkArrangement(badges: string[], location: string): string | undefined {
  const text = [...badges, location.toLowerCase()].join(' ');
  if (text.includes('remote') || text.includes('work from home') || text.includes('wfh')) return 'remote';
  if (text.includes('hybrid') || text.includes('flexible')) return 'hybrid';
  return 'onsite';
}

function detectExperienceLevel(title: string, badges: string[]): string | undefined {
  const text = [title.toLowerCase(), ...badges].join(' ');
  if (text.includes('senior') || text.includes('sr.') || text.includes('lead')) return 'senior';
  if (text.includes('junior') || text.includes('jr.') || text.includes('entry')) return 'entry';
  if (text.includes('mid') || text.includes('intermediate')) return 'mid';
  return undefined;
}

function deduplicateJobs(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    if (seen.has(job.externalId)) return false;
    seen.add(job.externalId);
    return true;
  });
}
