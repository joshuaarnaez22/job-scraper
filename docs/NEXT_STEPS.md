# Next Steps

Source roadmap: [`SAAS_ROADMAP.md`](./SAAS_ROADMAP.md)

## Done (local — commit/push pending)

- **Phase 2a** — Settings UI + Suggest from profile
- **CV → profile** — `unpdf` + DeepSeek fill Basic Info
- **Routes** — `/dashboard`, `/dashboard/profile`, `/dashboard/settings`

Pushed earlier: Phase 0–1, Inngest, R2 bucket wiring (`aba25d5`).

## Recommended next

**Commit + push** the Phase 2a / CV / routes work, then:

| Order | Work | Why |
|-------|------|-----|
| **2b** | Stripe Checkout + Customer Portal + plan quotas | Monetization |
| **3** | Marketing landing + pricing | Acquisition |
| Later | Suggest keywords from CV text (not only profile fields) | Better scrape targeting |
| Later | Re-enable RemoteOK / Upwork | Broader catalog |
| Later | Inngest Cloud (drop `INNGEST_DEV` in prod) | Durable production queue |

## Quick verify before 2b

1. `/dashboard/profile` — upload CV → fields fill
2. `/dashboard/settings` — Suggest from profile → Save
3. Run scrape → relevant OnlineJobs only
