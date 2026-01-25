/**
 * Base scraper types and utilities
 * Shared across all site-specific scrapers
 */

// ===========================================
// Types
// ===========================================

export interface Job {
  externalId: string;
  site: string;
  title: string;
  company: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  description: string;
  url: string;
  jobType?: string;        // full-time, part-time, contract, freelance
  experienceLevel?: string; // entry, mid, senior
  workArrangement?: string; // remote, hybrid, onsite
  skills?: string[];
  location?: string;
  postedAt?: Date;
  // AI fields (populated after scraping)
  aiScore?: number;
  aiSummary?: string;
}

export interface ScraperConfig {
  enabled: boolean;
  rateLimit: number;       // ms between requests
  maxPages: number;
  keywords: string[];
  fetchFullDetails?: boolean;  // Whether to fetch individual job pages for full description
  onJobFound?: (job: Job) => void;  // Callback for streaming - called when each job is found
  // Site-specific settings can be added via extension
  [key: string]: unknown;
}

export type ScraperFunction = (
  keywords: string[],
  config: ScraperConfig
) => Promise<Job[]>;

export interface ScraperResult {
  site: string;
  jobs: Job[];
  error?: string;
  duration: number;
}

// ===========================================
// HTTP Utilities
// ===========================================

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
};

export async function fetchPage(
  url: string,
  options: RequestInit = {}
): Promise<string> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.text();
}

export async function fetchJson<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// ===========================================
// Rate Limiting
// ===========================================

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ===========================================
// Salary Parsing
// ===========================================

interface ParsedSalary {
  min?: number;
  max?: number;
  currency: string;
}

const CURRENCY_PATTERNS: Record<string, RegExp> = {
  PHP: /(?:₱|PHP|Php|php)\s*/i,
  USD: /(?:\$|USD|Usd|usd)\s*/i,
  EUR: /(?:€|EUR|Eur|eur)\s*/i,
};

export function parseSalary(salaryText: string): ParsedSalary {
  if (!salaryText) {
    return { currency: 'PHP' };
  }

  // Detect currency
  let currency = 'PHP';
  for (const [curr, pattern] of Object.entries(CURRENCY_PATTERNS)) {
    if (pattern.test(salaryText)) {
      currency = curr;
      break;
    }
  }

  // Clean the string
  let cleaned = salaryText
    .replace(/[₱$€]/g, '')
    .replace(/PHP|USD|EUR/gi, '')
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Handle "k" suffix (e.g., "30k" -> "30000")
  cleaned = cleaned.replace(/(\d+)k/gi, (_, num) => String(Number(num) * 1000));

  // Extract numbers
  const numbers = cleaned.match(/\d+/g)?.map(Number) || [];

  if (numbers.length === 0) {
    return { currency };
  }

  if (numbers.length === 1) {
    return { min: numbers[0], max: numbers[0], currency };
  }

  // Assume first two numbers are min/max
  const [min, max] = numbers.slice(0, 2).sort((a, b) => a - b);
  return { min, max, currency };
}

// ===========================================
// Date Parsing
// ===========================================

export function parseRelativeDate(text: string): Date | undefined {
  if (!text) return undefined;

  const now = new Date();
  const lowered = text.toLowerCase().trim();

  // "just now", "today"
  if (lowered === 'just now' || lowered === 'today') {
    return now;
  }

  // "yesterday"
  if (lowered === 'yesterday') {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  // "X hours ago"
  const hoursMatch = lowered.match(/(\d+)\s*hours?\s*ago/);
  if (hoursMatch) {
    return new Date(now.getTime() - Number(hoursMatch[1]) * 60 * 60 * 1000);
  }

  // "X days ago"
  const daysMatch = lowered.match(/(\d+)\s*days?\s*ago/);
  if (daysMatch) {
    return new Date(now.getTime() - Number(daysMatch[1]) * 24 * 60 * 60 * 1000);
  }

  // "X weeks ago"
  const weeksMatch = lowered.match(/(\d+)\s*weeks?\s*ago/);
  if (weeksMatch) {
    return new Date(now.getTime() - Number(weeksMatch[1]) * 7 * 24 * 60 * 60 * 1000);
  }

  // "X months ago"
  const monthsMatch = lowered.match(/(\d+)\s*months?\s*ago/);
  if (monthsMatch) {
    return new Date(now.getTime() - Number(monthsMatch[1]) * 30 * 24 * 60 * 60 * 1000);
  }

  // Try parsing as ISO date or common formats
  const parsed = new Date(text);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  return undefined;
}

// ===========================================
// Text Utilities
// ===========================================

export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function extractSkills(text: string, knownSkills: string[]): string[] {
  const loweredText = text.toLowerCase();
  return knownSkills.filter((skill) =>
    loweredText.includes(skill.toLowerCase())
  );
}
