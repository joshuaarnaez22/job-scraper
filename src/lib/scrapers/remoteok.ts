/**
 * RemoteOK Scraper
 * Uses JSON API for better reliability
 */

import {
  Job,
  ScraperConfig,
  fetchJson,
  delay,
  cleanText,
} from './base';

const SITE_ID = 'remoteok';
const API_URL = 'https://remoteok.com/api';

interface RemoteOKJob {
  id: string;
  slug: string;
  company: string;
  position: string;
  description: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  tags: string[];
  url: string;
  date: string;
  company_logo?: string;
}

export async function scrapeRemoteOK(
  keywords: string[],
  config: ScraperConfig
): Promise<Job[]> {
  try {
    // RemoteOK API returns all jobs, we filter by keywords locally
    const response = await fetchJson<RemoteOKJob[]>(API_URL);

    // First item is usually metadata/legal notice, skip it
    const jobData = Array.isArray(response) ? response.slice(1) : [];

    const jobs = jobData
      .filter((job) => matchesKeywords(job, keywords))
      .slice(0, config.maxPages * 20) // Limit results
      .map(parseJob);

    await delay(config.rateLimit);
    return jobs;
  } catch (error) {
    console.error(`[${SITE_ID}] Error fetching API:`, error);
    return [];
  }
}

function matchesKeywords(job: RemoteOKJob, keywords: string[]): boolean {
  const searchText = [
    job.position,
    job.company,
    job.description,
    ...(job.tags || []),
  ]
    .join(' ')
    .toLowerCase();

  return keywords.some((keyword) =>
    searchText.includes(keyword.toLowerCase())
  );
}

function parseJob(job: RemoteOKJob): Job {
  const salaryText = job.salary_min && job.salary_max
    ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
    : undefined;

  return {
    externalId: job.id || job.slug,
    site: SITE_ID,
    title: cleanText(job.position),
    company: cleanText(job.company),
    salary: salaryText,
    salaryMin: job.salary_min,
    salaryMax: job.salary_max,
    salaryCurrency: 'USD',
    description: cleanText(job.description || ''),
    url: job.url || `https://remoteok.com/remote-jobs/${job.slug}`,
    location: job.location,
    workArrangement: 'remote',
    skills: job.tags,
    postedAt: job.date ? new Date(job.date) : undefined,
  };
}
