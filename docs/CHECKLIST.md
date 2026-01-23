# Checklist.md

> Step-by-step implementation guides and todos.

## 🚀 Initial Setup

- [ ] Clone repo
- [ ] `npm install`
- [ ] Copy `.env.example` → `.env.local`
- [ ] Add `RESEND_API_KEY`
- [ ] Add `NOTIFICATION_EMAIL`
- [ ] Add `CRON_SECRET` (generate: `openssl rand -base64 32`)
- [ ] (Optional) Add `OPENAI_API_KEY`
- [ ] Add `DATABASE_URL` (Neon PostgreSQL connection string)
- [ ] `npx prisma generate && npx prisma db push`
- [ ] `npm run dev`

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

## ✉️ AI Cover Letter Generator

### 1. Add UserProfile model to Prisma
```prisma
// prisma/schema.prisma
model UserProfile {
  id              String   @id @default("default")
  name            String
  title           String?
  summary         String?
  skills          String   // JSON array
  experience      String   // JSON array
  education       String?
  portfolioUrl    String?
  linkedinUrl     String?
  preferences     String   // JSON: { tone, length, customInstructions }
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model GeneratedEmail {
  id          String   @id @default(cuid())
  jobId       String
  job         Job      @relation(fields: [jobId], references: [id])
  content     String
  version     Int      @default(1)
  createdAt   DateTime @default(now())
}
```

### 2. Create profile API
```typescript
// src/app/api/profile/route.ts
// GET - fetch user profile
// PUT - update user profile (name, skills, experience, preferences)
```

### 3. Create cover letter generation API
```typescript
// src/app/api/jobs/[id]/generate-email/route.ts
import { generateCoverLetter } from '@/lib/ai';

// POST - generate new cover letter for job
// Request: { regenerate?: boolean }
// Response: { content: string, version: number }
```

### 4. Implement AI generation function
```typescript
// src/lib/ai.ts
export async function generateCoverLetter(
  job: Job,
  profile: UserProfile
): Promise<string> {
  const prompt = `
    Generate a professional cover letter/application email.

    JOB DETAILS:
    Title: ${job.title}
    Company: ${job.company}
    Description: ${job.description}

    CANDIDATE PROFILE:
    Name: ${profile.name}
    Title: ${profile.title}
    Summary: ${profile.summary}
    Skills: ${JSON.parse(profile.skills).join(', ')}
    Experience: ${profile.experience}

    PREFERENCES:
    Tone: ${prefs.tone}
    Length: ${prefs.length}
    ${prefs.customInstructions || ''}

    Write a compelling, personalized email that highlights relevant experience.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}
```

### 5. Build UI components
```tsx
// src/components/ProfileForm.tsx - Edit experience/skills
// src/components/CoverLetterModal.tsx - Generate/edit/copy email
// src/components/CoverLetterPreview.tsx - Display generated email
```

### 6. Add to JobCard
```tsx
// src/components/JobCard.tsx
<Button onClick={() => openCoverLetterModal(job)}>
  Generate Cover Letter
</Button>
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

## 🧪 Testing Checklist

- [ ] All scrapers return jobs (dry run)
- [ ] Duplicate jobs not re-added
- [ ] Filters exclude correctly
- [ ] Email sends with new jobs
- [ ] AI scoring works (if enabled)
- [ ] Dashboard displays jobs
- [ ] Status updates persist
- [ ] Cron triggers successfully
- [ ] User profile saves/updates correctly
- [ ] Cover letter generates with job + profile context
- [ ] Cover letter regeneration creates new version
- [ ] Generated emails saved to database

---

## 🚢 Deployment Checklist

- [ ] All env vars set in hosting platform
- [ ] Neon database accessible
- [ ] Cron configured
- [ ] Test scrape endpoint works
- [ ] Test email delivery
- [ ] Monitor first few automated runs