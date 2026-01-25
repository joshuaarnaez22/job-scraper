/**
 * OnlineJobs.ph Scraper
 * Primary source for Philippine remote jobs
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

const SITE_ID = 'onlinejobs';
const BASE_URL = 'https://www.onlinejobs.ph';

export async function scrapeOnlineJobs(
  keywords: string[],
  config: ScraperConfig
): Promise<Job[]> {
  const jobs: Job[] = [];
  const seenIds = new Set<string>();
  const fetchFullDetails = config.fetchFullDetails ?? false;

  for (const keyword of keywords) {
    for (let page = 1; page <= config.maxPages; page++) {
      try {
        const url = buildSearchUrl(keyword, page);
        const html = await fetchPage(url);
        const pageJobs = parseJobListings(html);

        if (pageJobs.length === 0) break; // No more results

        for (const job of pageJobs) {
          // Skip duplicates (same job can appear for multiple keywords)
          if (seenIds.has(job.externalId)) continue;
          seenIds.add(job.externalId);

          let finalJob = job;

          // Only fetch full details if enabled
          if (fetchFullDetails) {
            try {
              finalJob = await fetchJobDetails(job, config.rateLimit);
            } catch (error) {
              console.error(`[${SITE_ID}] Error fetching details for job ${job.externalId}:`, error);
              // Fall back to basic job data
            }
          }

          jobs.push(finalJob);

          // Stream the job if callback is provided
          if (config.onJobFound) {
            config.onJobFound(finalJob);
          }
        }

        await delay(config.rateLimit);
      } catch (error) {
        console.error(`[${SITE_ID}] Error scraping page ${page} for "${keyword}":`, error);
        break;
      }
    }
  }

  return jobs;
}

async function fetchJobDetails(job: Job, rateLimit: number): Promise<Job> {
  await delay(rateLimit);

  const html = await fetchPage(job.url);
  const $ = cheerio.load(html);

  // Get full description from job detail page
  const fullDescription = cleanText($('.jobpost-contents').text());

  // Try to extract skills from requirements section
  const skills: string[] = [];
  $('.jobpost-contents ul li').each((_, el) => {
    const skillText = cleanText($(el).text());
    if (skillText.length < 50) { // Short items are likely skills
      skills.push(skillText);
    }
  });

  // Get more accurate posted date if available
  const postedText = $('.job-details-info time').attr('datetime') ||
                     $('.jobpost-date').text();
  const postedAt = postedText ? parseRelativeDate(postedText) : job.postedAt;

  return {
    ...job,
    description: fullDescription || job.description,
    skills: skills.length > 0 ? skills : job.skills,
    postedAt: postedAt || job.postedAt,
  };
}

function buildSearchUrl(keyword: string, page: number): string {
  const params = new URLSearchParams({
    jobkeyword: keyword,
    page: String(page),
  });
  return `${BASE_URL}/jobseekers/jobsearch?${params}`;
}

function parseJobListings(html: string): Job[] {
  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  // Each job listing is in a .jobpost-cat-box container
  $('.jobpost-cat-box').each((_, element) => {
    const $el = $(element);

    // Find the job link inside the box
    const $link = $el.find('a[href*="/jobseekers/job/"]').first();
    const href = $link.attr('href') || '';
    if (!href) return;

    // Extract job ID from href (e.g., /jobseekers/job/1562090 or /jobseekers/job/Job-Title-1562090)
    const idMatch = href.match(/(\d+)$/);
    const externalId = idMatch ? idMatch[1] : '';
    if (!externalId) return;

    // Title is in h4 element
    const titleEl = $el.find('h4').first();
    const title = cleanText(titleEl.clone().children('span').remove().end().text());
    if (!title) return;

    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

    // Company/employer is in the paragraph before salary
    const companyText = $el.find('p.fs-13').first().text();
    const company = cleanText(companyText.split('•')[0]) || 'Unknown';

    // Salary is in dd.col element
    const salaryText = cleanText($el.find('dd.col').first().text());
    const salary = parseSalary(salaryText);

    // Description is in div.desc
    const description = cleanText($el.find('div.desc').text());

    // Date from em element
    const dateText = $el.find('em').text();
    const postedAt = parseRelativeDate(dateText);

    // Job type from badge span
    const jobTypeBadge = $el.find('h4 span.badge').text().toLowerCase();
    const jobType = jobTypeBadge.includes('full') ? 'full-time' :
                    jobTypeBadge.includes('part') ? 'part-time' :
                    jobTypeBadge.includes('freelance') ? 'freelance' : undefined;

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
      jobType,
      workArrangement: 'remote', // OnlineJobs.ph is primarily remote jobs
      postedAt,
    });
  });

  return jobs;
}

