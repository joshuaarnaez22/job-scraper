# Next Steps — Phase 0 Sprint Checklist

Source roadmap: [`SAAS_ROADMAP.md`](./SAAS_ROADMAP.md)

## Goal

Authenticated multi-user app: each Clerk user has isolated config/profile/matches; Postgres RLS blocks cross-user reads; AI uses DeepSeek + Mistral.

## Setup after pull

1. Add Clerk keys to `.env.local` (see `.env.example`)
2. Add `DEEPSEEK_API_KEY` / `MISTRAL_API_KEY` (optional until you use AI)
3. Reset schema (personal DB — wipe is supported when leaving singleton `"default"` rows):

```bash
npx tsx prisma/wipe-schema.ts   # DROP SCHEMA public — destroys all data
npx prisma db push
npm run db:rls                  # apply FORCE RLS policies
npm run dev
```

4. Sign up at `/sign-up` → lands on `/dashboard` with seeded SearchConfig + UserProfile

## Checklist

- [x] Clerk (`@clerk/nextjs`), middleware, `/sign-in` `/sign-up`, `ClerkProvider`
- [x] Schema: `User`, `UserJob`, user-scoped `SearchConfig` / `UserProfile`, `Subscription` stub
- [x] Global `Job` catalog (no per-user status on Job)
- [x] `prisma/sql/rls.sql` + `withUserRls` / `withServiceRls`
- [x] Optional `DATABASE_URL_SERVICE` documented
- [x] APIs scoped: jobs, settings, profile, generate-email
- [x] Cron uses service RLS; creates catalog jobs + per-user `UserJob` matches
- [x] Stream scrape requires Clerk; matches jobs to current user
- [x] DeepSeek scoring + Mistral cover letters
- [x] Dashboard `UserButton`
- [x] `.env.example` / checklist / README updated

## Done when (verify manually)

- Unauthenticated `GET /api/jobs` → 401 (or Clerk redirect)
- Two Clerk users cannot see each other’s matches/settings
- Cover letter works with `MISTRAL_API_KEY`
- Scoring path checks `DEEPSEEK_API_KEY`
- `curl` cron with `CRON_SECRET` still works

## Not in this sprint

Inngest scraper revamp, Stripe paywall, marketing landing, settings UI polish → Phases 1–3 in the roadmap.
