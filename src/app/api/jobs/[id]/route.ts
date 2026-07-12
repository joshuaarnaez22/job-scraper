/**
 * Single Job API
 * GET /api/jobs/[id] - Get job details (must be matched to user)
 * PATCH /api/jobs/[id] - Update UserJob status / AI fields
 * DELETE /api/jobs/[id] - Remove UserJob match (does not delete catalog job)
 */

import { NextRequest, NextResponse } from 'next/server';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { withUserRls } from '@/lib/rls';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireCurrentUser();
    const { id } = await params;

    return await withUserRls(user.id, async (tx) => {
      const userJob = await tx.userJob.findUnique({
        where: {
          userId_jobId: { userId: user.id, jobId: id },
        },
        include: {
          job: {
            include: {
              generatedEmails: {
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' },
              },
            },
          },
        },
      });

      if (!userJob) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }

      return NextResponse.json({
        ...userJob.job,
        status: userJob.status,
        aiScore: userJob.aiScore,
        aiSummary: userJob.aiSummary,
        userJobId: userJob.id,
        generatedEmails: userJob.job.generatedEmails,
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error fetching job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireCurrentUser();
    const { id } = await params;
    const body = await request.json();

    const allowedFields = ['status', 'aiScore', 'aiSummary'] as const;
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    return await withUserRls(user.id, async (tx) => {
      const existing = await tx.userJob.findUnique({
        where: { userId_jobId: { userId: user.id, jobId: id } },
        include: { job: true },
      });

      if (!existing) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }

      const userJob = await tx.userJob.update({
        where: { id: existing.id },
        data: updates,
        include: { job: true },
      });

      return NextResponse.json({
        ...userJob.job,
        status: userJob.status,
        aiScore: userJob.aiScore,
        aiSummary: userJob.aiSummary,
        userJobId: userJob.id,
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireCurrentUser();
    const { id } = await params;

    return await withUserRls(user.id, async (tx) => {
      const existing = await tx.userJob.findUnique({
        where: { userId_jobId: { userId: user.id, jobId: id } },
      });

      if (!existing) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }

      await tx.userJob.delete({ where: { id: existing.id } });
      return NextResponse.json({ success: true });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
