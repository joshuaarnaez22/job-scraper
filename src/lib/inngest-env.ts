/**
 * Inngest environment helpers
 *
 * Local: set INNGEST_DEV=1 and run `npm run inngest:dev`
 * Cloud/prod: unset INNGEST_DEV; set INNGEST_EVENT_KEY + INNGEST_SIGNING_KEY
 *   (Vercel Marketplace integration can inject these automatically)
 */

export function isInngestDevMode(): boolean {
  const v = process.env.INNGEST_DEV;
  return v === '1' || v === 'true';
}

export function assertInngestCloudReady(): { ok: true } | { ok: false; reason: string } {
  if (isInngestDevMode()) {
    return {
      ok: false,
      reason:
        'INNGEST_DEV is set — SDK targets the local Dev Server, not Inngest Cloud.',
    };
  }
  if (!process.env.INNGEST_EVENT_KEY) {
    return { ok: false, reason: 'INNGEST_EVENT_KEY is missing' };
  }
  if (!process.env.INNGEST_SIGNING_KEY) {
    return { ok: false, reason: 'INNGEST_SIGNING_KEY is missing' };
  }
  return { ok: true };
}
