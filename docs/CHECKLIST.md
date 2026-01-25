# Checklist.md

> Step-by-step implementation guides and todos.

## 🚀 Initial Setup

### Required ✅
- [x] Clone repo
- [x] `npm install`
- [x] Copy `.env.example` → `.env.local`
- [x] Add `DATABASE_URL` (Neon PostgreSQL connection string)
- [x] Add `CRON_SECRET`
- [x] `npx prisma generate && npx prisma db push`
- [x] `npm run dev`

### For Email Notifications
- [ ] Add `RESEND_API_KEY` (from resend.com)
- [ ] Add `NOTIFICATION_EMAIL` (your email address)

### For AI Features (Optional)
- [ ] Add `OPENAI_API_KEY` (for job scoring & cover letters)

---

## ➕ Adding a New Job Site

### 1. Create scraper file
```bash
touch lib/scrapers/newsite.ts
```

### 2. Implement scraper
```typescript
// lib/scrapers/newsite.ts
import * as cheerio from 'cheerio';
import { Job, ScraperConfig, fetchPage, delay } from './base';

const SITE_ID = 'newsite';
const BASE_URL = 'https://newsite.com';

export async function scrapeNewSite(keywords: string[], config: ScraperConfig): Promise<Job[]> {
  const jobs: Job[] = [];
  for (const keyword of keywords) {
    const url = `${BASE_URL}/jobs?q=${encodeURIComponent(keyword)}`;
    const html = await fetchPage(url);
    jobs.push(...parseJobs(html));
    await delay(config.rateLimit);
  }
  return jobs;
}

function parseJobs(html: string): Job[] {
  const $ = cheerio.load(html);
  // TODO: Update selectors for actual site
  return $('.job-card').map((_, el) => ({
    externalId: $(el).attr('data-id') || '',
    site: SITE_ID,
    title: $(el).find('.title').text().trim(),
    company: $(el).find('.company').text().trim(),
    salary: $(el).find('.salary').text().trim(),
    description: $(el).find('.description').text().trim(),
    url: BASE_URL + $(el).find('a').attr('href'),
  })).get();
}
```

### 3. Register scraper
```typescript
// lib/scrapers/index.ts
import { scrapeNewSite } from './newsite';

export const scrapers = {
  // ...existing
  newsite: scrapeNewSite,
};
```

### 4. Add site config
```typescript
// config/sites.ts
newsite: {
  enabled: true,
  baseUrl: 'https://newsite.com',
  rateLimit: 2000,
  maxPages: 5,
},
```

### 5. Test
```bash
curl -X POST "localhost:3000/api/cron/scrape?sites=newsite&dryRun=true" \
  -H "Authorization: Bearer $CRON_SECRET"
```

---

## 🔧 Adding a New Filter

### 1. Update Prisma schema
```prisma
// prisma/schema.prisma - add to SearchConfig
newFilter  String?  // or Int, Boolean, etc.
```

### 2. Migrate database
```bash
npx prisma db push
```

### 3. Add filter logic
```typescript
// lib/filters.ts
function filterByNewFilter(job: Job, value: string | null): boolean {
  if (!value) return true;
  return job.someField === value;
}

// Add to pipeline
export function applyFilters(jobs: Job[], config: SearchConfig): Job[] {
  return jobs
    .filter(job => filterByNewFilter(job, config.newFilter))
    // ...existing filters
}
```

### 4. Add UI control
```tsx
// components/FilterPanel.tsx
<select value={config.newFilter} onChange={...}>
  <option value="">All</option>
  <option value="option1">Option 1</option>
</select>
```

### 5. Update API
```typescript
// app/api/settings/route.ts - add to validation/save
```

---

## 🐛 Fixing a Broken Scraper

### 1. Identify the issue
```bash
# Check logs
curl "localhost:3000/api/cron/scrape?sites=brokensite" \
  -H "Authorization: Bearer $CRON_SECRET"
```

### 2. Inspect current site HTML
- Open site in browser
- Right-click → Inspect
- Find job listing container and elements
- Note new class names / structure

### 3. Update selectors
```typescript
// lib/scrapers/brokensite.ts
// OLD:
$('.job-item').each(...)
// NEW:
$('[data-testid="job-card"]').each(...)
```

### 4. Test parsing
```bash
curl -X POST "localhost:3000/api/cron/scrape?sites=brokensite&dryRun=true" \
  -H "Authorization: Bearer $CRON_SECRET"
```

### 5. Verify in database
```bash
npx prisma studio
# Check Job table for new entries
```

---

## 📧 Customizing Email Template

### Location
```
lib/email.ts → formatJobEmail()
```

### Template structure
```typescript
function formatJobEmail(jobs: Job[]): string {
  return `
    <h2>🔔 ${jobs.length} New Jobs Found</h2>
    ${jobs.map(job => `
      <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee;">
        <h3><a href="${job.url}">${job.title}</a></h3>
        <p><strong>${job.company}</strong> • ${job.salary || 'Salary not listed'}</p>
        <p>${job.site} • ${job.jobType || ''} • ${job.workArrangement || ''}</p>
        ${job.aiScore ? `<p>AI Match: ${Math.round(job.aiScore * 100)}%</p>` : ''}
      </div>
    `).join('')}
  `;
}
```

---

## ⏰ Setting Up Cron

### Option A: Vercel Cron
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/scrape",
    "schedule": "0 8,14,20 * * *"
  }]
}
```

### Option B: GitHub Actions
```yaml
# .github/workflows/scrape.yml
name: Scrape Jobs
on:
  schedule:
    - cron: '0 8,14,20 * * *'
jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST ${{ secrets.APP_URL }}/api/cron/scrape \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

### Option C: cron-job.org
1. Go to cron-job.org
2. Create free account
3. Add job: `POST https://your-app.vercel.app/api/cron/scrape`
4. Header: `Authorization: Bearer your-secret`
5. Schedule: 3x daily

---

## ✉️ AI Cover Letter Generator (Implemented)

### 1. Add UserProfile model to Prisma ✅
```prisma
// prisma/schema.prisma - DONE
model UserProfile { ... }
model GeneratedEmail { ... }
```

### 2. Create profile API ✅
```typescript
// src/app/api/profile/route.ts - DONE
// GET - fetch user profile
// PUT - update user profile (name, skills, experience, preferences)
```

### 3. Create cover letter generation API ✅
```typescript
// src/app/api/jobs/[id]/generate-email/route.ts - DONE
// POST - generate new cover letter for job
// Request: { regenerate?: boolean }
// Response: { content: string, version: number }
```

### 4. Implement AI generation function ✅
```typescript
// src/lib/ai.ts - DONE
// generateCoverLetter() - Creates tailored cover letter
// improveCoverLetter() - Refines based on feedback
```

### 5. Build UI components ✅
```tsx
// src/components/ProfileForm.tsx - DONE
// src/components/CoverLetterModal.tsx - DONE (includes preview)
```

### 6. Add to JobCard ✅
```tsx
// src/components/JobCard.tsx - DONE
// onGenerateCoverLetter prop integrated
```

### 7. Test the flow
```bash
# 1. Save profile
curl -X PUT localhost:3000/api/profile -d '{
  "name": "John Doe",
  "skills": ["React", "TypeScript"],
  "experience": [{"company": "Acme", "role": "Dev"}]
}'

# 2. Generate cover letter for a job
curl -X POST localhost:3000/api/jobs/abc123/generate-email
```

---

## 🔴 Real-time Streaming Scraper ✅

### Features (Implemented)
- [x] SSE endpoint `/api/cron/scrape/stream` streams jobs as they're found
- [x] Jobs appear 1-by-1 in UI modal during scrape
- [x] "Fetch Full Details" toggle - OFF is faster (listing data only), ON fetches each job page
- [x] Live stats: NEW / DUPES / FILTERED / TOTAL counts update in real-time
- [x] Auto-scroll job feed as new jobs arrive
- [x] Clickable job links in results
- [x] ScrapeStatusModal component (src/components/ScrapeStatusModal.tsx)

### How It Works
1. User clicks "RUN SCRAPE" → opens modal with options
2. Toggle "Fetch Full Details" (default: OFF for speed)
3. Select date range filter
4. Click "START SCRAPE"
5. Modal connects to SSE stream
6. Jobs stream in real-time as they're found & saved to DB
7. Stats update live (new/duplicates/filtered)
8. On complete, shows summary with clickable job links

### API Events
| Event | Data |
|-------|------|
| `start` | `{ keywords, sites, fetchFullDetails }` |
| `site-start` | `{ site }` |
| `job` | Full job object (new job saved) |
| `job-filtered` | `{ externalId, title, reason }` |
| `job-duplicate` | `{ externalId, title }` |
| `site-complete` | `{ site }` |
| `complete` | `{ totalFound, newJobs, filtered }` |
| `error` | `{ message }` |

---

## 🧪 Testing Checklist

> ⚠️ **No automated tests exist.** All testing must be done manually.

### Scraper Tests (Manual)
- [ ] All scrapers return jobs (dry run)
- [ ] Duplicate jobs not re-added (unique constraint works)
- [ ] Date parsing works for various formats
- [ ] Salary parsing extracts min/max/currency
- [x] Real-time streaming scraper shows jobs 1-by-1
- [x] Fetch Full Details toggle controls scraper behavior

### Filter Tests (Manual)
- [ ] Filters exclude correctly (days posted, salary, job type, etc.)
- [ ] Exclude keywords filter works
- [ ] Exclude companies filter works
- [ ] Required skills filter works

### Dashboard Tests (Manual)
- [ ] Dashboard displays jobs correctly
- [ ] Status updates persist (new → viewed → applied)
- [ ] URL-based filters sync correctly
- [ ] Pagination works
- [ ] Settings UI (currently WIP placeholder - API-only)

### Email & Notifications (Manual)
- [ ] Email sends with new jobs (Resend integration)
- [ ] Digest mode batches emails correctly

### AI Features (Manual)
- [ ] AI scoring works (if OPENAI_API_KEY set)
- [ ] AI threshold filtering works
- [ ] User profile saves/updates correctly
- [ ] Cover letter generates with job + profile context
- [ ] Cover letter regeneration creates new version
- [ ] Generated emails saved to database
- [ ] improveCoverLetter() works with feedback

### Cron & Deployment (Manual)
- [ ] Cron triggers successfully
- [ ] Authorization header validation works

---

## 🚢 Deployment Checklist

- [ ] All env vars set in hosting platform
  - [ ] `DATABASE_URL` (Neon PostgreSQL)
  - [ ] `RESEND_API_KEY`
  - [ ] `NOTIFICATION_EMAIL`
  - [ ] `CRON_SECRET`
  - [ ] `OPENAI_API_KEY` (optional)
- [ ] Run `npx prisma db push` on production database
- [ ] Neon database accessible from deployment platform
- [ ] Cron configured (Vercel/GitHub Actions/cron-job.org)
- [ ] Test scrape endpoint works with auth
- [ ] Test email delivery
- [ ] Monitor first few automated runs

---

## 🔴 Unimplemented Features

### Code Not Written
| Feature | Status | Notes |
|---------|--------|-------|
| Automated Tests | ❌ Not started | No `.test.ts` or `.spec.ts` files exist |
| Settings UI | ⚠️ WIP | Dashboard shows placeholder; API works |

### Setup Required (Code Complete)
| Feature | Status | Action Required |
|---------|--------|-----------------|
| Email Notifications | ✅ Code ready | Add `RESEND_API_KEY` + `NOTIFICATION_EMAIL` |
| AI Features | ✅ Code ready | Add `OPENAI_API_KEY` |

---

## 📋 Next Phase: Testing & Deployment

The core features are now implemented:
- ✅ Real-time Streaming Scraper
- ✅ AI Cover Letter Generator
- ✅ Job Filtering Pipeline
- ✅ Dashboard with URL-based filters
- ✅ Email notifications (code complete)
- ✅ User profile management
- ⚠️ Settings UI (WIP - API only)
- ❌ Automated tests

### Priority 1: Local Testing
1. Run a full scrape cycle with OnlineJobs.ph
2. Verify jobs appear in dashboard
3. Test status updates (new → viewed → applied)
4. Test cover letter generation flow

### Priority 2: Email Integration
1. Set up Resend API key
2. Test email sending with new jobs
3. Verify digest mode works

### Priority 3: AI Features (Optional)
1. Set up OpenAI API key
2. Test job relevance scoring
3. Test AI threshold filtering

### Priority 4: Build Settings UI
1. Create settings form component
2. Wire up to existing `/api/settings` endpoint
3. Replace "WIP" placeholder in dashboard

### Priority 5: Write Automated Tests
1. Unit tests for filter pipeline
2. Integration tests for scraper workflow
3. API route tests
4. Component tests (optional)

### Priority 6: Deployment (Later)
> Deferred until local testing is complete

1. Deploy to Vercel
2. Set up production database
3. Configure cron jobs
4. Monitor production scrapes