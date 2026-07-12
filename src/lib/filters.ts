/**
 * Job Filter Pipeline
 * Filters jobs based on search configuration
 */

import type { Job } from './scrapers/base';

export interface FilterConfig {
  // Date Filter
  daysPosted?: number | null;

  // Salary Filters
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string;

  // Job Filters
  jobTypes?: string[];
  experienceLevels?: string[];
  workArrangements?: string[];

  // Exclusions
  excludeCompanies?: string[];
  excludeKeywords?: string[];

  // Skills
  requiredSkills?: string[];

  /** Scrape / match keywords — job should relate to at least one */
  keywords?: string[];
  /** If true (default when keywords set), require a keyword hit in the title */
  requireKeywordInTitle?: boolean;
}

/**
 * Apply all filters to a list of jobs
 */
export function applyFilters(jobs: Job[], config: FilterConfig): Job[] {
  return jobs
    .filter((job) => filterByDaysPosted(job, config.daysPosted))
    .filter((job) => filterBySalary(job, config))
    .filter((job) => filterByJobType(job, config.jobTypes))
    .filter((job) => filterByExperience(job, config.experienceLevels))
    .filter((job) => filterByWorkArrangement(job, config.workArrangements))
    .filter((job) => !isExcludedCompany(job, config.excludeCompanies))
    .filter((job) => !containsExcludedKeywords(job, config.excludeKeywords))
    .filter((job) => hasRequiredSkills(job, config.requiredSkills))
    .filter((job) => matchesScrapeKeywords(job, config));
}

/**
 * Keep only jobs that clearly relate to scrape keywords (cuts OnlineJobs noise).
 * Prefer title matches — listing pages often dump unrelated roles into keyword search.
 */
export function matchesScrapeKeywords(
  job: Job,
  config: Pick<FilterConfig, 'keywords' | 'requireKeywordInTitle'>
): boolean {
  const keywords = config.keywords;
  if (!keywords || keywords.length === 0) return true;

  const titleOnly = config.requireKeywordInTitle !== false;
  const title = job.title.toLowerCase();
  const haystack = titleOnly
    ? title
    : `${title} ${job.description || ''}`.toLowerCase();

  return keywords.some((keyword) => keywordMatchesText(keyword, haystack));
}

function keywordMatchesText(keyword: string, text: string): boolean {
  const normalized = keyword.toLowerCase().trim();
  if (!normalized) return false;
  if (text.includes(normalized)) return true;

  // Multi-word: require every meaningful token (len > 2)
  const tokens = normalized.split(/\s+/).filter((t) => t.length > 2);
  if (tokens.length <= 1) return false;
  return tokens.every((t) => text.includes(t));
}

/**
 * Prefer fewer, more specific queries — each keyword is a full site search.
 */
export function selectScrapeKeywords(keywords: string[], max = 3): string[] {
  const unique = [
    ...new Set(keywords.map((k) => k.trim()).filter(Boolean)),
  ];
  return unique
    .sort((a, b) => b.length - a.length || a.localeCompare(b))
    .slice(0, max);
}

/**
 * Filter by days since posted
 */
function filterByDaysPosted(job: Job, daysPosted?: number | null): boolean {
  if (!daysPosted || !job.postedAt) return true;

  const now = new Date();
  const jobDate = new Date(job.postedAt);
  const diffMs = now.getTime() - jobDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays <= daysPosted;
}

/**
 * Filter by salary range
 */
function filterBySalary(job: Job, config: FilterConfig): boolean {
  const { salaryMin, salaryMax, salaryCurrency } = config;

  // No salary filters set
  if (!salaryMin && !salaryMax) return true;

  // Job has no salary info - include it (don't filter out)
  if (!job.salaryMin && !job.salaryMax) return true;

  // Currency mismatch - skip filter
  if (salaryCurrency && job.salaryCurrency && job.salaryCurrency !== salaryCurrency) {
    // TODO: Currency conversion
    return true;
  }

  // Check minimum salary
  if (salaryMin && job.salaryMax && job.salaryMax < salaryMin) {
    return false;
  }

  // Check maximum salary
  if (salaryMax && job.salaryMin && job.salaryMin > salaryMax) {
    return false;
  }

  return true;
}

/**
 * Filter by job type (full-time, part-time, etc.)
 */
function filterByJobType(job: Job, jobTypes?: string[]): boolean {
  if (!jobTypes || jobTypes.length === 0) return true;
  if (!job.jobType) return true; // Include jobs without type info

  return jobTypes.some((type) =>
    job.jobType?.toLowerCase().includes(type.toLowerCase())
  );
}

/**
 * Filter by experience level
 */
function filterByExperience(job: Job, experienceLevels?: string[]): boolean {
  if (!experienceLevels || experienceLevels.length === 0) return true;
  if (!job.experienceLevel) return true; // Include jobs without level info

  return experienceLevels.some((level) =>
    job.experienceLevel?.toLowerCase().includes(level.toLowerCase())
  );
}

/**
 * Filter by work arrangement (remote, hybrid, onsite)
 */
function filterByWorkArrangement(job: Job, arrangements?: string[]): boolean {
  if (!arrangements || arrangements.length === 0) return true;
  if (!job.workArrangement) return true; // Include jobs without arrangement info

  return arrangements.some((arr) =>
    job.workArrangement?.toLowerCase().includes(arr.toLowerCase())
  );
}

/**
 * Check if company is in exclusion list
 */
function isExcludedCompany(job: Job, excludeCompanies?: string[]): boolean {
  if (!excludeCompanies || excludeCompanies.length === 0) return false;

  const companyLower = job.company.toLowerCase();
  return excludeCompanies.some((excluded) =>
    companyLower.includes(excluded.toLowerCase())
  );
}

/**
 * Check if job contains excluded keywords
 */
function containsExcludedKeywords(job: Job, excludeKeywords?: string[]): boolean {
  if (!excludeKeywords || excludeKeywords.length === 0) return false;

  const searchText = `${job.title} ${job.description}`.toLowerCase();
  return excludeKeywords.some((keyword) =>
    searchText.includes(keyword.toLowerCase())
  );
}

/**
 * Check if job has all required skills
 */
function hasRequiredSkills(job: Job, requiredSkills?: string[]): boolean {
  if (!requiredSkills || requiredSkills.length === 0) return true;

  const jobSkills = job.skills?.map((s) => s.toLowerCase()) || [];
  const searchText = `${job.title} ${job.description}`.toLowerCase();

  return requiredSkills.every((skill) => {
    const skillLower = skill.toLowerCase();
    return jobSkills.includes(skillLower) || searchText.includes(skillLower);
  });
}

/**
 * Calculate match score based on preferred skills
 */
export function calculateSkillMatchScore(job: Job, preferredSkills: string[]): number {
  if (!preferredSkills || preferredSkills.length === 0) return 0;

  const jobSkills = job.skills?.map((s) => s.toLowerCase()) || [];
  const searchText = `${job.title} ${job.description}`.toLowerCase();

  const matchedSkills = preferredSkills.filter((skill) => {
    const skillLower = skill.toLowerCase();
    return jobSkills.includes(skillLower) || searchText.includes(skillLower);
  });

  return matchedSkills.length / preferredSkills.length;
}

/**
 * Sort jobs by relevance
 */
export function sortByRelevance(
  jobs: Job[],
  preferredSkills: string[],
  useAiScore: boolean = false
): Job[] {
  return [...jobs].sort((a, b) => {
    // Prioritize AI score if available
    if (useAiScore && a.aiScore !== undefined && b.aiScore !== undefined) {
      return b.aiScore - a.aiScore;
    }

    // Fall back to skill match score
    const scoreA = calculateSkillMatchScore(a, preferredSkills);
    const scoreB = calculateSkillMatchScore(b, preferredSkills);

    if (scoreB !== scoreA) return scoreB - scoreA;

    // Then by date (newer first)
    const dateA = a.postedAt ? new Date(a.postedAt).getTime() : 0;
    const dateB = b.postedAt ? new Date(b.postedAt).getTime() : 0;
    return dateB - dateA;
  });
}
