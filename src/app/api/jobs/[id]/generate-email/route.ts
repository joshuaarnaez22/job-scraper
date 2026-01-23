/**
 * Cover Letter Generation API
 * POST /api/jobs/[id]/generate-email - Generate cover letter for a job
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateCoverLetter, type UserProfile, type WorkExperience, type CoverLetterPreferences } from '@/lib/ai';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: jobId } = await params;
    const body = await request.json().catch(() => ({}));
    const regenerate = body.regenerate === true;

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Get the job
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        generatedEmails: {
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Get user profile
    const profileRecord = await prisma.userProfile.findUnique({
      where: { id: 'default' },
    });

    if (!profileRecord || !profileRecord.name) {
      return NextResponse.json(
        { error: 'Please set up your profile first' },
        { status: 400 }
      );
    }

    // Parse profile data
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

    // Generate cover letter
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

    // Calculate new version
    const lastVersion = job.generatedEmails[0]?.version || 0;
    const newVersion = regenerate ? lastVersion + 1 : 1;

    // Save to database
    const generatedEmail = await prisma.generatedEmail.create({
      data: {
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
  } catch (error) {
    console.error('[API] Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: jobId } = await params;

    const emails = await prisma.generatedEmail.findMany({
      where: { jobId },
      orderBy: { version: 'desc' },
    });

    return NextResponse.json(emails);
  } catch (error) {
    console.error('[API] Error fetching generated emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch generated emails' },
      { status: 500 }
    );
  }
}
