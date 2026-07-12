# Next Steps

Source roadmap: [`SAAS_ROADMAP.md`](./SAAS_ROADMAP.md)

## Done

- **Phase 0** — Clerk auth, multi-tenant schema, RLS, DeepSeek + Mistral
- **Phase 1** — Inngest scrape queue, shared catalog pipeline, OnlineJobs-first testing
- **Relevance** — keyword cap + title gate; tighter defaults
- **CV storage** — Cloudflare R2 (`jobscout-cvs`) + Profile upload UI

## Recommended next (Phase 2a)

**Settings UI + profile→keywords** — highest leverage before paywall.

1. Settings page: edit keywords, exclude list, sites, days posted, salary, AI threshold
2. Button: **Suggest keywords from profile/CV** → `suggestKeywordsFromProfile()` (parse CV text from R2 later)
3. Save to `SearchConfig` so scrapes stay narrow and relevant
4. Optional: enable AI matching toggle with DeepSeek scoring

## Then

| Order | Work | Why |
|-------|------|-----|
| **2b** | Stripe Checkout + quotas (scrapes / cover letters / AI) | Monetization |
| **3** | Marketing landing + pricing | Acquisition |
| Later | Re-enable RemoteOK / Upwork; digests per user email | Catalog breadth |
| Later | Deploy Inngest Cloud + unset `INNGEST_DEV` | Production queue |

## Local checklist before 2a

```bash
npm run dev
npm run inngest:dev
```

- [ ] Profile → upload CV works
- [ ] Run scrape → only `onlinejobs`, relevant titles
- [ ] Digest email arrives at your Resend-verified address

## Suggested start

Implement **Phase 2a Settings UI** with “Suggest from profile” wired to DeepSeek. Say the word and we’ll build it.
