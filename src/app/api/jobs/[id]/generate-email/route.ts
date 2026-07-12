/**
 * Cover Letter Generation API
 * POST /api/jobs/[id]/generate-email - Generate cover letter for a matched job
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateCoverLetter,
  type UserProfile,
  type WorkExperience,
  type CoverLetterPreferences,
} from '@/lib/ai';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { assertCoverLetterQuota, QuotaExceededError } from '@/lib/billing';
import { withUserRls } from '@/lib/rls';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireCurrentUser();
    const { id: jobId } = await params;
    const body = await request.json().catch(() => ({}));
    const regenerate = body.regenerate === true;

    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: 'Mistral API key not configured' },
        { status: 500 }
      );
    }

    try {
      await assertCoverLetterQuota(user);
    } catch (err) {
      if (err instanceof QuotaExceededError) {
        return NextResponse.json(
          {
            error: err.message,
            code: err.code,
            upgradeRequired: err.upgradeRequired,
          },
          { status: 402 }
        );
      }
      throw err;
    }

    return await withUserRls(user.id, async (tx) => {
      const userJob = await tx.userJob.findUnique({
        where: { userId_jobId: { userId: user.id, jobId } },
        include: { job: true },
      });

      if (!userJob) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }

      const job = userJob.job;

      const profileRecord = await tx.userProfile.findUnique({
        where: { userId: user.id },
      });

      if (!profileRecord || !profileRecord.name) {
        return NextResponse.json(
          { error: 'Please set up your profile first' },
          { status: 400 }
        );
      }

      const profile: UserProfile = {
        name: profileRecord.name,
        title: profileRecord.title || undefined,
        summary: profileRecord.summary || undefined,
        skills: JSON.parse(profileRecord.skills) as string[],
        experience: JSON.parse(profileRecord.experience) as WorkExperience[],
        education: profileRecord.education || undefined,
        portfolioUrl: profileRecord.portfolioUrl || undefined,
        linkedinUrl: profileRecord.linkedinUrl || undefined,
        preferences: JSON.parse(profileRecord.preferences) as CoverLetterPreferences,
      };

      const content = await generateCoverLetter(
        {
          externalId: job.externalId,
          site: job.site,
          title: job.title,
          company: job.company,
          salary: job.salary || undefined,
          description: job.description,
          url: job.url,
          skills: job.skills ? JSON.parse(job.skills) : undefined,
        },
        profile
      );

      const lastEmail = await tx.generatedEmail.findFirst({
        where: { userId: user.id, jobId },
        orderBy: { version: 'desc' },
      });

      const lastVersion = lastEmail?.version || 0;
      const newVersion = regenerate ? lastVersion + 1 : Math.max(1, lastVersion + 1);

      const generatedEmail = await tx.generatedEmail.create({
        data: {
          userId: user.id,
          jobId,
          content,
          version: newVersion,
        },
      });

      return NextResponse.json({
        id: generatedEmail.id,
        content: generatedEmail.content,
        version: generatedEmail.version,
        createdAt: generatedEmail.createdAt,
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireCurrentUser();
    const { id: jobId } = await params;

    return await withUserRls(user.id, async (tx) => {
      const emails = await tx.generatedEmail.findMany({
        where: { userId: user.id, jobId },
        orderBy: { version: 'desc' },
      });

      return NextResponse.json(emails);
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error fetching generated emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch generated emails' },
      { status: 500 }
    );
  }
}
