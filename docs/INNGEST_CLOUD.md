# Inngest Cloud

Local vs production:

| Env | `INNGEST_DEV` | Keys | Runner |
|-----|---------------|------|--------|
| Local | `1` | optional | `npm run inngest:dev` |
| Vercel / Cloud | **unset** | `INNGEST_EVENT_KEY` + `INNGEST_SIGNING_KEY` | Inngest Cloud |

## One-time setup

1. Open [Inngest for Vercel](https://vercel.com/marketplace/inngest) → connect this project  
   (or paste Event Key + Signing Key into Vercel env manually).
2. Ensure **Production** env has:
   - `INNGEST_EVENT_KEY`
   - `INNGEST_SIGNING_KEY`
   - **no** `INNGEST_DEV`
3. Deploy. Inngest syncs via `GET/PUT /api/inngest`.
4. In [app.inngest.com](https://app.inngest.com) confirm app **jobscout** shows function `scrape-requested`.

## Schedules

- **Inngest cron:** `TZ=Asia/Manila 0 8 * * *` on `scrape-requested`
- **Vercel cron:** `vercel.json` → `POST /api/cron/scrape` (also enqueues the same event)

Either is enough; keeping both is fine (concurrency limit 1).

## Verify

```bash
# After deploy (no INNGEST_DEV on Vercel):
curl -X POST "https://YOUR_DOMAIN/api/cron/scrape" \
  -H "Authorization: Bearer $CRON_SECRET"
# Expect: { "queued": true, "mode": "cloud", ... }
```

Dashboard **RUN SCRAPE** should also return `"mode":"cloud"`.
