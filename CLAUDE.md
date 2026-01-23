## Overview

Personal multi-site job scraper with email notifications. Scrapes 8 job boards, filters by advanced criteria, uses OpenAI for relevance scoring and AI-generated cover letters tailored to your experience.

**Stack:** Next.js 16, Tailwind v4, shadcn/ui, Neon (PostgreSQL)/Prisma, Cheerio, Resend, OpenAI (optional)

## Architecture

```
src/
├── app/
│   ├── api/cron/scrape/route.ts   → Main scrape endpoint (POST, protected)
│   ├── api/jobs/route.ts          → CRUD jobs
│   ├── api/settings/route.ts      → Search config
│   └── dashboard/page.tsx         → UI
├── components/ui/                 → shadcn/ui components
├── lib/
│   ├── scrapers/
│   │   ├── index.ts               → Orchestrator: runAllScrapers()
│   │   ├── base.ts                → Shared types & utilities (fetchPage, delay)
│   │   └── [site].ts              → Site-specific scraper functions
│   ├── filters.ts                 → applyFilters() pipeline
│   ├── email.ts                   → sendJobAlert()
│   ├── ai.ts                      → scoreJobRelevance(), generateCoverLetter()
│   └── db.ts                      → Prisma client
└── config/
    ├── search.ts                  → Keywords, filters, AI settings
    └── sites.ts                   → Per-site rate limits, URLs
```

## Supported Sites

| ID | Site | Method | Rate Limit | Status |
|----|------|--------|------------|--------|
| `onlinejobs` | OnlineJobs.ph | HTML | 2s | **Enabled** |
| `jobstreet` | Jobstreet PH | HTML | 2s | Disabled |
| `kalibrr` | Kalibrr | HTML | 2s | Disabled |
| `linkedin` | LinkedIn | HTML | 5s | Disabled |
| `indeed` | Indeed PH | HTML | 3s | Disabled |
| `weworkremotely` | WWR | HTML | 2s | Disabled |
| `remoteok` | RemoteOK | JSON API | 1s | Disabled |
| `upwork` | Upwork | RSS | 1s | Disabled |

> **Note:** Only OnlineJobs.ph is currently enabled. Other sites can be enabled in `src/config/sites.ts`.

## Database Models (Key Fields)

```
Job: id visibleexternalId, site, title, company, salary, salaryMin/Max, 
     salaryCurrency, jobType, experienceLevel, workArrangement, 
     skills, postedAt, status, aiScore
     @@unique([site, externalId])

SearchConfig: keywords, excludeKeywords, enabledSites, daysPosted,
              salaryMin/Max, jobTypes, experienceLevels, workArrangements,
              excludeCompanies, requiredSkills, useAIMatching, aiThreshold

SiteConfig: id, enabled, rateLimit, maxPages, lastScraped

UserProfile: id, name, title, summary, skills (JSON), experience (JSON),
             education, portfolioUrl, preferences (JSON)

GeneratedEmail: id, jobId, content, version, createdAt
                @relation Job
```

## Filter Pipeline

```typescript
applyFilters(jobs, config)
  .filterByDaysPosted()
  .filterBySalary()
  .filterByJobType()
  .filterByExperience()
  .filterByWorkArrangement()
  .excludeCompanies()
  .excludeKeywords()
  .requireSkills()
```

## Dashboard Features

- **URL-based filters** - All filters sync to URL for SEO and shareability
  - `/dashboard?site=onlinejobs&status=new&days=7`
- **Posted date filter** - Filters by `postedAt` (when job was posted, not added to DB)

## Critical Gotchas

1. **JSON fields** - Parse with `JSON.parse()` when reading from DB
2. **OnlineJobs full fetch** - Scraper fetches each job page for complete description
3. **Salary formats vary** - `₱25,000` vs `PHP 30k` vs `50000-80000 USD/yr`
4. **Date parsing varies** - "2 hours ago" vs "2024-01-15" vs "Jan 15"
5. **Unique constraint** - `site + externalId` prevents duplicates per site

## Quick Commands

```bash
# Dry run all sites
curl -X POST localhost:3000/api/cron/scrape \
  -H "Authorization: Bearer $CRON_SECRET" -d '{"dryRun":true}'

# Single site
curl -X POST "localhost:3000/api/cron/scrape?sites=remoteok" \
  -H "Authorization: Bearer $CRON_SECRET"

# Jobs with filters
curl "localhost:3000/api/jobs?site=onlinejobs&status=new&days=7"
```

## When Scraper Breaks

1. Visit site → Inspect HTML
2. Update selectors in `lib/scrapers/[site].ts`
3. Test: `?sites=sitename&dryRun=true`

---

📋 See **checklist.md** for step-by-step implementation guides.