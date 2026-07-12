# Next Steps

Source roadmap: [`SAAS_ROADMAP.md`](./SAAS_ROADMAP.md)

## Done

- **Phase 0–1** — Clerk, multi-tenant, Inngest, R2 CV
- **Phase 2a** — Settings UI, CV→profile, dashboard routes
- **Phase 2b** — Stripe Checkout + Portal + sync + plan quotas (local, uncommitted)

## Stripe local checklist

- [x] JobScout test products/prices + keys in `.env.local`
- [x] `npm run stripe:listen` (uses JobScout key from env)
- [x] Post-checkout `/api/billing/sync` so plan updates without webhook
- [ ] Confirm paid plan shows after upgrade + **REFRESH PLAN**
- [ ] Restart `stripe:listen` on JobScout account if you want live webhooks too

## Next

| Order | Work |
|-------|------|
| **Now** | Commit + push Phase 2b |
| **3** | Marketing landing + pricing |
| Later | Suggest keywords from CV text; re-enable RemoteOK/Upwork |
| Later | Inngest Cloud for production |
