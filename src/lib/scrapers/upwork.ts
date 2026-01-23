/**
 * Upwork RSS Scraper
 * Freelance jobs via RSS feed
 */

import * as cheerio from 'cheerio';
import {
  Job,
  ScraperConfig,
  fetchPage,
  delay,
  cleanText,
} from './base';

const SITE_ID = 'upwork';
const RSS_BASE_URL = 'https://www.upwork.com/ab/feed/jobs/rss';

export async function scrapeUpwork(
  keywords: string[],
  config: ScraperConfig
): Promise<Job[]> {
  const jobs: Job[] = [];

  for (const keyword of keywords) {
    try {
      const url = buildRssUrl(keyword);
      const xml = await fetchPage(url);
      const feedJobs = parseRssFeed(xml, keyword);
      jobs.push(...feedJobs);
      await delay(config.rateLimit);
    } catch (error) {
      console.error(`[${SITE_ID}] Error fetching RSS for "${keyword}":`, error);
    }
  }

  return deduplicateJobs(jobs);
}

function buildRssUrl(keyword: string): string {
  const params = new URLSearchParams({
    q: keyword,
    sort: 'recency',
  });
  return `${RSS_BASE_URL}?${params}`;
}

function parseRssFeed(xml: string, _keyword: string): Job[] {
  const $ = cheerio.load(xml, { xmlMode: true });
  const jobs: Job[] = [];

  $('item').each((_, element) => {
    const $el = $(element);

    const title = cleanText($el.find('title').text());
    if (!title) return;

    const link = $el.find('link').text();
    // Extract job ID from URL
    const externalId = link.match(/~([a-f0-9]+)/i)?.[1] || link.split('/').pop() || '';
    if (!externalId) return;

    const description = cleanText($el.find('description').text());
    const pubDate = $el.find('pubDate').text();

    // Parse budget/hourly from description
    const { budget, hourlyRange, jobType } = parseBudgetInfo(description);

    jobs.push({
      externalId,
      site: SITE_ID,
      title,
      company: 'Upwork Client', // Upwork hides client names in RSS
      salary: budget || hourlyRange,
      description: cleanDescription(description),
      url: link,
      jobType: jobType || 'freelance',
      workArrangement: 'remote',
      postedAt: pubDate ? new Date(pubDate) : undefined,
    });
  });

  return jobs;
}

interface BudgetInfo {
  budget?: string;
  hourlyRange?: string;
  jobType?: string;
}

function parseBudgetInfo(description: string): BudgetInfo {
  const result: BudgetInfo = {};

  // Fixed price budget
  const budgetMatch = description.match(/Budget:\s*\$?([\d,]+)/i);
  if (budgetMatch) {
    result.budget = `$${budgetMatch[1]}`;
    result.jobType = 'contract';
  }

  // Hourly range
  const hourlyMatch = description.match(/Hourly Range:\s*\$?([\d.]+)\s*-\s*\$?([\d.]+)/i);
  if (hourlyMatch) {
    result.hourlyRange = `$${hourlyMatch[1]} - $${hourlyMatch[2]}/hr`;
    result.jobType = 'freelance';
  }

  return result;
}

function cleanDescription(description: string): string {
  // Remove HTML tags and Upwork metadata from description
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/Budget:.*$/im, '')
    .replace(/Hourly Range:.*$/im, '')
    .replace(/Posted On:.*$/im, '')
    .replace(/Category:.*$/im, '')
    .replace(/Skills:.*$/im, '')
    .replace(/Country:.*$/im, '')
    .trim();
}

function deduplicateJobs(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    if (seen.has(job.externalId)) return false;
    seen.add(job.externalId);
    return true;
  });
}
