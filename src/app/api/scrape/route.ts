/**
 * Authenticated scrape enqueue (dashboard)
 * POST /api/scrape — queue Inngest job for current user's sites
 * GET  /api/scrape — recent scrape status for polling
 */

import { NextRequest, NextResponse } from 'next/server';
import { filterEnabledSiteIds, getEnabledSiteIds } from '@/config/sites';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { inngest } from '@/inngest/client';
import { withServiceRls, withUserRls } from '@/lib/rls';
import { runFullScrapePipeline } from '@/lib/scrape-pipeline';

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    const body = await request.json().catch(() => ({}));
    const daysPosted =
      body.daysPosted !== undefined && body.daysPosted !== null
        ? Number(body.daysPosted)
        : null;
    const sync = body.sync === true;

    const config = await withUserRls(user.id, (tx) =>
      tx.searchConfig.findUnique({ where: { userId: user.id } })
    );

    const requestedSites = config
      ? (JSON.parse(config.enabledSites) as string[])
      : getEnabledSiteIds();
    const sites = filterEnabledSiteIds(requestedSites);
    const keywords = config
      ? (JSON.parse(config.keywords) as string[])
      : undefined;

    const payload = {
      sites: sites.length > 0 ? sites : getEnabledSiteIds(),
      keywords,
      daysPosted,
      onlyUserId: user.id,
      source: 'dashboard' as const,
    };

    if (sync) {
      const result = await runFullScrapePipeline(payload);
      return NextResponse.json({ queued: false, ...result });
    }

    try {
      const { ids } = await inngest.send({
        name: 'scrape/requested',
        data: payload,
      });
      return NextResponse.json({
        queued: true,
        eventIds: ids,
        enqueuedAt: new Date().toISOString(),
      });
    } catch (enqueueError) {
      console.warn('[Scrape] Inngest enqueue failed, sync fallback:', enqueueError);
      const result = await runFullScrapePipeline(payload);
      return NextResponse.json({ queued: false, fallback: true, ...result });
    }
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[Scrape] enqueue error:', error);
    return NextResponse.json({ error: 'Failed to enqueue scrape' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireCurrentUser();
    const sinceParam = request.nextUrl.searchParams.get('since');
    const since = sinceParam
      ? new Date(sinceParam)
      : new Date(Date.now() - 15 * 60 * 1000);

    const logs = await withServiceRls((tx) =>
      tx.scrapeLog.findMany({
        where: { startedAt: { gte: since } },
        orderBy: { startedAt: 'desc' },
        take: 20,
      })
    );

    const totalNew = logs.reduce((sum, l) => sum + l.newJobs, 0);
    const hasError = logs.some((l) => l.status === 'error');
    const complete = logs.length > 0;

    return NextResponse.json({
      complete,
      hasError,
      newJobs: totalNew,
      logs: logs.map((l) => ({
        site: l.site,
        status: l.status,
        jobsFound: l.jobsFound,
        newJobs: l.newJobs,
        error: l.error,
        startedAt: l.startedAt,
      })),
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to load status' }, { status: 500 });
  }
}
