import { NextRequest, NextResponse } from 'next/server';
import { inngest } from '@/inngest/client';
import { assertInngestCloudReady, isInngestDevMode } from '@/lib/inngest-env';
import { runFullScrapePipeline } from '@/lib/scrape-pipeline';

export const maxDuration = 300;

function isCronAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const referer = request.headers.get('referer') || '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const isInternalRequest = referer.startsWith(appUrl);

  return (
    !cronSecret ||
    authHeader === `Bearer ${cronSecret}` ||
    isVercelCron ||
    isInternalRequest
  );
}

export async function POST(request: NextRequest) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const sitesParam = searchParams.get('sites');
    const dryRun = searchParams.get('dryRun') === 'true';
    const daysPostedParam = searchParams.get('daysPosted');
    const sync = searchParams.get('sync') === 'true';

    const payload = {
      sites: sitesParam ? sitesParam.split(',') : undefined,
      dryRun,
      daysPosted: daysPostedParam ? parseInt(daysPostedParam) : null,
      source: 'cron' as const,
    };

    // Explicit sync / dry-run: run in-process (useful for local testing)
    if (sync || dryRun) {
      const result = await runFullScrapePipeline(payload);
      return NextResponse.json(result);
    }

    try {
      const { ids } = await inngest.send({
        name: 'scrape/requested',
        data: payload,
      });

      return NextResponse.json({
        queued: true,
        eventIds: ids,
        mode: isInngestDevMode() ? 'dev' : 'cloud',
        message: isInngestDevMode()
          ? 'Scrape enqueued via Inngest Dev Server'
          : 'Scrape enqueued via Inngest Cloud',
      });
    } catch (enqueueError) {
      console.warn(
        '[Cron] Inngest enqueue failed, running sync fallback:',
        enqueueError
      );
      const cloud = assertInngestCloudReady();
      const result = await runFullScrapePipeline(payload);
      return NextResponse.json({
        queued: false,
        fallback: true,
        inngestHint: cloud.ok ? undefined : cloud.reason,
        ...result,
      });
    }
  } catch (error) {
    console.error('[Cron] Scrape error:', error);
    return NextResponse.json(
      { error: 'Scrape failed', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
