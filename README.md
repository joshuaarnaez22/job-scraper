# Remote Jobs Scraper

A personal job monitoring tool that automatically scrapes multiple job boards for new listings and sends email notifications when matching jobs are found.

Built with Next.js 16, Tailwind CSS v4, shadcn/ui, and optionally OpenAI for intelligent job matching.

## Features

- 🔍 **Multi-Site Scraping** - Monitors multiple job boards simultaneously
- 📧 **Email Notifications** - Get notified when new matching jobs are found
- 🤖 **AI-Powered Matching** (Optional) - Use OpenAI to score job relevance
- ✉️ **AI Cover Letter Generator** - Generate tailored application emails based on job + your experience
- 📊 **Dashboard** - View and manage scraped jobs from all sources
- ⏰ **Scheduled Runs** - Configure to run 3x daily via cron
- 🗄️ **Duplicate Detection** - PostgreSQL database tracks seen jobs across all sites
- ⚙️ **Advanced Filters** - Days posted, salary, job type, experience level, and more

## Supported Job Sites

| Site | Status | Notes |
|------|--------|-------|
| [OnlineJobs.ph](https://www.onlinejobs.ph) | ✅ Supported | Primary - PH remote jobs |
| [Jobstreet PH](https://www.jobstreet.com.ph) | ✅ Supported | Large PH job board |
| [Kalibrr](https://www.kalibrr.com) | ✅ Supported | PH tech-focused |
| [LinkedIn Jobs](https://www.linkedin.com/jobs) | ✅ Supported | Requires careful rate limiting |
| [Indeed PH](https://ph.indeed.com) | ✅ Supported | Global job board |
| [We Work Remotely](https://weworkremotely.com) | ✅ Supported | Remote-first jobs |
| [RemoteOK](https://remoteok.com) | ✅ Supported | Remote tech jobs |
| [Upwork](https://www.upwork.com) | 🔶 Partial | Freelance - RSS feed only |

> **Adding new sites:** See [Adding a New Job Site](#adding-a-new-job-site) section

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Neon (PostgreSQL) with Prisma ORM
- **Scraping**: Cheerio (HTML parsing)
- **Email**: Resend
- **AI** (Optional): OpenAI GPT-4
- **Scheduling**: Vercel Cron / GitHub Actions / cron-job.org

## Prerequisites

- Node.js 18+
- npm or pnpm
- Resend API key (free tier: 100 emails/day)
- OpenAI API key (optional, for AI matching)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/onlinejobs-scraper.git
   cd onlinejobs-scraper
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:

   ```env
   # Email (Resend)
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   NOTIFICATION_EMAIL=your@email.com

   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

   # AI — DeepSeek (scoring) + Mistral (cover letters)
   DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxx
   MISTRAL_API_KEY=xxxxxxxxxxxxx

   # Cron Security
   CRON_SECRET=your-secret-key-here

   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
   ```

4. **Initialize the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Search Settings

Edit your job search preferences in the dashboard or directly in `config/search.ts`:

```typescript
export const searchConfig = {
  // Keywords & Search
  keywords: ['react', 'nextjs', 'frontend developer', 'typescript'],
  excludeKeywords: ['senior', 'lead', '10+ years'],
  
  // Job Sites to Scrape
  enabledSites: [
    'onlinejobs',
    'jobstreet',
    'kalibrr',
    'linkedin',
    'indeed',
    'weworkremotely',
    'remoteok',
  ],
  
  // Advanced Filters
  filters: {
    // Date Posted
    daysPosted: 7,              // Only jobs from last N days (1, 3, 7, 14, 30, null for any)
    
    // Salary
    salaryMin: 30000,           // Minimum salary (PHP/month or USD/year depending on site)
    salaryMax: 150000,          // Maximum salary (null for no limit)
    salaryCurrency: 'PHP',      // PHP, USD, EUR
    
    // Job Type
    jobTypes: [                 // Include these job types
      'full-time',
      'part-time',
      'contract',
      'freelance',
    ],
    
    // Experience Level
    experienceLevels: [         // Include these levels
      'entry',
      'mid',
      'senior',                 // Remove if you want to exclude senior roles
    ],
    
    // Work Arrangement
    workArrangement: [
      'remote',
      'hybrid',
      // 'onsite',              // Uncomment to include onsite jobs
    ],
    
    // Company Filters
    excludeCompanies: [         // Block specific companies
      'Acme Corp',
    ],
    companySize: [              // Preferred company sizes
      'startup',
      'small',
      'medium',
      'large',
    ],
    
    // Skills/Tags (site-dependent)
    requiredSkills: [],         // Must have ALL these skills
    preferredSkills: [          // Nice to have (boosts AI score)
      'react',
      'typescript',
      'node.js',
    ],
  },
  
  // AI Matching
  useAIMatching: true,
  aiMatchThreshold: 0.7,        // 0-1, jobs scoring above this are included
  
  // Notification Settings
  notifyOnlyNew: true,          // Only notify for jobs not seen before
  digestMode: false,            // true = one email with all jobs, false = individual emails
  maxEmailsPerRun: 10,          // Prevent email spam
};
```

### Site-Specific Configuration

Some sites have unique settings in `config/sites.ts`:

```typescript
export const siteConfigs = {
  onlinejobs: {
    enabled: true,
    baseUrl: 'https://www.onlinejobs.ph',
    rateLimit: 2000,            // ms between requests
    maxPages: 5,
    // Site-specific filters
    categories: ['web-development', 'software-development'],
  },
  
  linkedin: {
    enabled: true,
    baseUrl: 'https://www.linkedin.com/jobs',
    rateLimit: 5000,            // LinkedIn is strict
    maxPages: 3,
    geoId: '103121230',         // Philippines
    useEasyApplyOnly: false,
  },
  
  jobstreet: {
    enabled: true,
    baseUrl: 'https://www.jobstreet.com.ph',
    rateLimit: 2000,
    maxPages: 5,
  },
  
  // ... other sites
};
```

### Scheduling

#### Option 1: Vercel Cron (Recommended for Vercel deployments)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/scrape",
      "schedule": "0 8,14,20 * * *"
    }
  ]
}
```

#### Option 2: GitHub Actions

Create `.github/workflows/scrape.yml`:

```yaml
name: Scrape Jobs
on:
  schedule:
    - cron: '0 8,14,20 * * *'  # 8am, 2pm, 8pm UTC
  workflow_dispatch:

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger scrape
        run: |
          curl -X POST ${{ secrets.APP_URL }}/api/cron/scrape \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

#### Option 3: External Cron Service

Use [cron-job.org](https://cron-job.org) or similar to hit:

```
POST https://your-app.vercel.app/api/cron/scrape
Header: Authorization: Bearer your-secret-key
```

## Project Structure

```
job-scraper/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── cron/
│   │   │   │   └── scrape/route.ts    # Cron endpoint
│   │   │   ├── jobs/route.ts          # Jobs CRUD API
│   │   │   └── settings/route.ts      # Settings API
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Main dashboard
│   │   ├── layout.tsx
│   │   └── page.tsx                   # Landing/redirect
│   ├── components/
│   │   └── ui/                        # shadcn/ui components
│   ├── lib/
│   │   ├── db.ts                      # Prisma client
│   │   ├── email.ts                   # Email notifications
│   │   ├── ai.ts                      # OpenAI integration
│   │   ├── utils.ts                   # shadcn/ui utilities
│   │   └── scrapers/                  # Multi-site scraper modules
│   │       ├── index.ts               # Scraper registry & orchestrator
│   │       ├── base.ts                # Shared types & utilities
│   │       ├── onlinejobs.ts          # OnlineJobs.ph scraper
│   │       ├── jobstreet.ts           # Jobstreet scraper
│   │       ├── kalibrr.ts             # Kalibrr scraper
│   │       ├── linkedin.ts            # LinkedIn scraper
│   │       ├── indeed.ts              # Indeed scraper
│   │       ├── weworkremotely.ts      # WWR scraper
│   │       └── remoteok.ts            # RemoteOK scraper
│   └── config/
│       ├── search.ts                  # Search configuration
│       └── sites.ts                   # Site-specific configs
├── prisma/
│   └── schema.prisma                  # Database schema
├── .env.example
├── .env.local
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cron/scrape` | Trigger job scraping (protected) |
| GET | `/api/jobs` | List all scraped jobs |
| GET | `/api/jobs?status=new` | Filter jobs by status |
| PATCH | `/api/jobs/[id]` | Update job status |
| GET | `/api/settings` | Get search settings |
| PUT | `/api/settings` | Update search settings |

## Database Schema

```prisma
model Job {
  id              String    @id @default(cuid())
  externalId      String    // Original job ID from source site
  site            String    // onlinejobs, jobstreet, linkedin, etc.
  title           String
  company         String
  salary          String?
  salaryMin       Int?      // Parsed minimum salary
  salaryMax       Int?      // Parsed maximum salary
  salaryCurrency  String?   // PHP, USD, EUR
  description     String
  url             String
  jobType         String?   // full-time, part-time, contract, freelance
  experienceLevel String?   // entry, mid, senior
  workArrangement String?   // remote, hybrid, onsite
  skills          String?   // JSON array of skills/tags
  location        String?
  postedAt        DateTime?
  scrapedAt       DateTime  @default(now())
  status          String    @default("new")  // new, viewed, applied, hidden, expired
  aiScore         Float?    // OpenAI relevance score
  aiSummary       String?   // AI-generated summary
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  generatedEmails GeneratedEmail[]

  @@unique([site, externalId])  // Prevent duplicates per site
  @@index([site])
  @@index([status])
  @@index([postedAt])
}

model SearchConfig {
  id                String   @id @default("default")
  keywords          String   // JSON array
  excludeKeywords   String   // JSON array
  enabledSites      String   // JSON array of enabled site IDs
  
  // Advanced Filters (stored as JSON)
  daysPosted        Int?     // Filter by days since posted
  salaryMin         Int?
  salaryMax         Int?
  salaryCurrency    String   @default("PHP")
  jobTypes          String   // JSON array
  experienceLevels  String   // JSON array
  workArrangements  String   // JSON array
  excludeCompanies  String   // JSON array
  requiredSkills    String   // JSON array
  preferredSkills   String   // JSON array
  
  // AI & Notifications
  useAIMatching     Boolean  @default(false)
  aiThreshold       Float    @default(0.7)
  digestMode        Boolean  @default(false)
  maxEmailsPerRun   Int      @default(10)
  
  updatedAt         DateTime @updatedAt
}

model ScrapeLog {
  id          String    @id @default(cuid())
  site        String    // Which site was scraped
  startedAt   DateTime  @default(now())
  endedAt     DateTime?
  jobsFound   Int       @default(0)
  newJobs     Int       @default(0)
  filtered    Int       @default(0)  // Jobs filtered out
  status      String    // success, error, partial
  error       String?
  duration    Int?      // Duration in ms
}

model SiteConfig {
  id          String   @id  // onlinejobs, jobstreet, etc.
  enabled     Boolean  @default(true)
  rateLimit   Int      @default(2000)  // ms between requests
  maxPages    Int      @default(5)
  lastScraped DateTime?
  settings    String?  // JSON for site-specific settings
  updatedAt   DateTime @updatedAt
}

model UserProfile {
  id              String   @id @default("default")
  name            String
  title           String?
  summary         String?  // Professional summary/bio
  skills          String   // JSON array of skills
  experience      String   // JSON array of work experience
  education       String?
  portfolioUrl    String?
  linkedinUrl     String?
  preferences     String   // JSON: tone, length, custom instructions
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model GeneratedEmail {
  id          String   @id @default(cuid())
  jobId       String
  job         Job      @relation(fields: [jobId], references: [id])
  content     String   // Generated email content
  version     Int      @default(1)  // Track regenerations
  createdAt   DateTime @default(now())
}
```

## Email Notifications

When new matching jobs are found, you'll receive an email with:

- Job title and company
- Salary range (if available)
- AI relevance score (if enabled)
- Direct link to the job posting
- Quick summary of the job description

## AI Cover Letter Generator

Generate personalized application emails tailored to specific jobs:

1. **Save Your Experience** - Add your skills, work history, and achievements to your profile
2. **Select a Job** - Click "Generate Cover Letter" on any job card
3. **AI Tailoring** - OpenAI analyzes the job description and your experience to create a personalized email
4. **Edit & Refine** - Review, edit, and regenerate until satisfied
5. **Copy or Send** - Copy to clipboard or send directly (if email integration enabled)

### Experience Profile

Your experience is stored in the database and can be updated anytime:

```typescript
// Example experience profile
{
  name: "John Doe",
  title: "Frontend Developer",
  summary: "3 years of experience building React applications...",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  experience: [
    {
      company: "Acme Corp",
      role: "Frontend Developer",
      duration: "2022-2024",
      highlights: ["Built dashboard used by 10k users", "Reduced load time by 40%"]
    }
  ],
  education: "BS Computer Science",
  preferences: {
    tone: "professional",       // professional, casual, enthusiastic
    length: "medium",           // short, medium, long
    includePortfolio: true,
    portfolioUrl: "https://..."
  }
}
```

## Development

```bash
# Run development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Test scraping locally
npm run scrape

# Reset database
npx prisma db push --force-reset
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Self-hosted

1. Build the project: `npm run build`
2. Set up a process manager (PM2)
3. Configure reverse proxy (Nginx)
4. Set up system cron for scheduling

## Legal Disclaimer

This tool is for **personal use only**. Please:

- Respect each site's Terms of Service
- Don't overload servers (rate limiting is built-in)
- Don't use for commercial purposes
- Don't redistribute scraped data

## Adding a New Job Site

To add support for a new job board:

1. **Create a new scraper file** in `lib/scrapers/`:

```typescript
// lib/scrapers/newsite.ts
import * as cheerio from 'cheerio';
import { Job, ScraperConfig, fetchPage, delay } from './base';

const SITE_ID = 'newsite';
const SITE_NAME = 'New Site';
const BASE_URL = 'https://newsite.com';

export async function scrapeNewSite(keywords: string[], config: ScraperConfig): Promise<Job[]> {
  const jobs: Job[] = [];

  for (const keyword of keywords) {
    const url = buildSearchUrl(keyword);
    const html = await fetchPage(url);
    const pageJobs = parseJobListings(html);
    jobs.push(...pageJobs);

    await delay(config.rateLimit);
  }

  return jobs;
}

function buildSearchUrl(keyword: string): string {
  const params = new URLSearchParams({ q: keyword });
  return `${BASE_URL}/jobs?${params}`;
}

function parseJobListings(html: string): Job[] {
  const $ = cheerio.load(html);
  const jobs: Job[] = [];

  $('.job-listing').each((_, el) => {
    jobs.push({
      externalId: $(el).data('id') as string,
      site: SITE_ID,
      title: $(el).find('.job-title').text().trim(),
      company: $(el).find('.company').text().trim(),
      // ... map other fields
    });
  });

  return jobs;
}
```

2. **Register the scraper** in `lib/scrapers/index.ts`:

```typescript
import { scrapeNewSite } from './newsite';

export const scrapers = {
  // ... existing scrapers
  newsite: scrapeNewSite,
};
```

3. **Add site config** in `config/sites.ts`:

```typescript
export const siteConfigs = {
  // ... existing configs
  newsite: {
    enabled: true,
    baseUrl: 'https://newsite.com',
    rateLimit: 2000,
    maxPages: 5,
  },
};
```

4. **Update types** if needed in `types/index.ts`

## Troubleshooting

### Common Issues

**Scraping returns no jobs**
- Check if OnlineJobs.ph has changed their HTML structure
- Verify your search keywords are valid
- Check the scrape logs in the dashboard

**Emails not sending**
- Verify your Resend API key
- Check if you've exceeded the free tier limit
- Ensure NOTIFICATION_EMAIL is correct

**AI matching not working**
- Verify OpenAI API key is valid
- Check if you have API credits
- Ensure `useAIMatching` is enabled in settings

## Contributing

This is a personal project, but suggestions are welcome! Open an issue for bugs or feature requests.

## License

MIT License - Use freely for personal projects.

---

Built with ❤️ for job seekers