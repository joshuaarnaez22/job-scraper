/**
 * Default search configuration
 * These values are used as defaults and can be overridden in the database
 */

export interface SearchConfig {
  // Keywords & Search
  keywords: string[];
  excludeKeywords: string[];

  // Job Sites to Scrape
  enabledSites: string[];

  // Date Filter
  daysPosted: number | null;  // Only jobs from last N days (null for any)

  // Salary Filters
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: 'PHP' | 'USD' | 'EUR';

  // Job Type
  jobTypes: string[];

  // Experience Level
  experienceLevels: string[];

  // Work Arrangement
  workArrangements: string[];

  // Company Filters
  excludeCompanies: string[];

  // Skills
  requiredSkills: string[];
  preferredSkills: string[];

  // AI Matching
  useAIMatching: boolean;
  aiMatchThreshold: number;  // 0-1, jobs scoring above this are included

  // Notification Settings
  notifyOnlyNew: boolean;
  digestMode: boolean;       // true = one email with all jobs
  maxEmailsPerRun: number;
}

export const defaultSearchConfig: SearchConfig = {
  // Keywords & Search — keep few; each one triggers a full site search
  keywords: [
    'react developer',
    'next.js',
    'typescript frontend',
  ],
  excludeKeywords: [
    'virtual assistant',
    'data entry',
    'customer service',
    '10+ years',
    'principal architect',
  ],

  // Job Sites to Scrape (intersected with sites.ts enabled flags)
  enabledSites: [
    'onlinejobs',
  ],

  // Date Filter
  daysPosted: 7,

  // Salary Filters
  salaryMin: 30000,
  salaryMax: null,
  salaryCurrency: 'PHP',

  // Job Type
  jobTypes: [
    'full-time',
    'part-time',
    'contract',
    'freelance',
  ],

  // Experience Level
  experienceLevels: [
    'entry',
    'mid',
  ],

  // Work Arrangement
  workArrangements: [
    'remote',
    'hybrid',
  ],

  // Company Filters
  excludeCompanies: [],

  // Skills
  requiredSkills: [],
  preferredSkills: [
    'react',
    'typescript',
    'node.js',
    'next.js',
    'tailwind',
  ],

  // AI Matching
  useAIMatching: false,
  aiMatchThreshold: 0.7,

  // Notification Settings
  notifyOnlyNew: true,
  digestMode: true,
  maxEmailsPerRun: 10,
};

// Common skills for extraction
export const KNOWN_SKILLS = [
  // Frontend
  'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt',
  'javascript', 'typescript', 'html', 'css', 'sass', 'less',
  'tailwind', 'bootstrap', 'material-ui', 'chakra-ui',
  'redux', 'mobx', 'zustand', 'jotai',
  'webpack', 'vite', 'rollup', 'parcel',

  // Backend
  'node.js', 'express', 'fastify', 'nest.js', 'hono',
  'python', 'django', 'flask', 'fastapi',
  'java', 'spring', 'spring boot',
  'go', 'golang', 'rust', 'c#', '.net',
  'php', 'laravel', 'symfony',
  'ruby', 'rails',

  // Database
  'postgresql', 'mysql', 'mongodb', 'redis',
  'prisma', 'drizzle', 'typeorm', 'sequelize',
  'supabase', 'firebase', 'dynamodb',

  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'vercel', 'netlify',
  'docker', 'kubernetes', 'terraform',
  'ci/cd', 'github actions', 'jenkins',

  // Other
  'graphql', 'rest api', 'websocket',
  'git', 'agile', 'scrum',
  'figma', 'sketch',
];
