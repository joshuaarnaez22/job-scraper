/**
 * Jobs API
 * GET /api/jobs - List the current user's matched jobs
 */

import { NextRequest, NextResponse } from 'next/server';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { withUserRls } from '@/lib/rls';

export async function GET(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    const { searchParams } = new URL(request.url);

    const site = searchParams.get('site');
    const status = searchParams.get('status');
    const days = searchParams.get('days');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

    const jobWhere: Record<string, unknown> = {};
    if (site) jobWhere.site = site;
    if (days) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(days));
      jobWhere.postedAt = { gte: daysAgo };
    }
    if (search) {
      jobWhere.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const userJobWhere: Record<string, unknown> = {
      userId: user.id,
      ...(status ? { status } : {}),
      ...(Object.keys(jobWhere).length > 0 ? { job: jobWhere } : {}),
    };

    const orderBy =
      sortBy === 'postedAt' || sortBy === 'createdAt' || sortBy === 'aiScore'
        ? sortBy === 'aiScore'
          ? { aiScore: sortOrder }
          : sortBy === 'postedAt'
            ? { job: { postedAt: sortOrder } }
            : { createdAt: sortOrder }
        : { createdAt: sortOrder };

    return await withUserRls(user.id, async (tx) => {
      const total = await tx.userJob.count({ where: userJobWhere });

      const userJobs = await tx.userJob.findMany({
        where: userJobWhere,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          job: {
            include: {
              generatedEmails: {
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' },
                take: 1,
              },
            },
          },
        },
      });

      const jobs = userJobs.map((uj) => ({
        ...uj.job,
        status: uj.status,
        aiScore: uj.aiScore,
        aiSummary: uj.aiSummary,
        userJobId: uj.id,
        matchedAt: uj.createdAt,
        generatedEmails: uj.job.generatedEmails,
      }));

      return NextResponse.json({
        jobs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
