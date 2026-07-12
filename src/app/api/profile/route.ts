/**
 * Profile API
 * GET /api/profile - Get current user's profile
 * PUT /api/profile - Update current user's profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { withUserRls } from '@/lib/rls';

const defaultPreferences = {
  tone: 'professional',
  length: 'medium',
  customInstructions: '',
};

export async function GET() {
  try {
    const user = await requireCurrentUser();

    return await withUserRls(user.id, async (tx) => {
      const profile = await tx.userProfile.findUnique({
        where: { userId: user.id },
      });

      if (!profile) {
        return NextResponse.json({
          id: null,
          userId: user.id,
          name: '',
          title: '',
          summary: '',
          skills: [],
          experience: [],
          education: '',
          portfolioUrl: '',
          linkedinUrl: '',
          preferences: defaultPreferences,
          cvFileName: null,
          cvContentType: null,
          cvSizeBytes: null,
          cvUploadedAt: null,
          hasCv: false,
        });
      }

      return NextResponse.json({
        ...profile,
        skills: JSON.parse(profile.skills),
        experience: JSON.parse(profile.experience),
        preferences: JSON.parse(profile.preferences),
        hasCv: Boolean(profile.cvKey),
        // Never expose raw storage key to the client
        cvKey: undefined,
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const data = {
      name: body.name,
      title: body.title || null,
      summary: body.summary || null,
      skills: JSON.stringify(body.skills || []),
      experience: JSON.stringify(body.experience || []),
      education: body.education || null,
      portfolioUrl: body.portfolioUrl || null,
      linkedinUrl: body.linkedinUrl || null,
      preferences: JSON.stringify(body.preferences || defaultPreferences),
    };

    return await withUserRls(user.id, async (tx) => {
      const profile = await tx.userProfile.upsert({
        where: { userId: user.id },
        update: data,
        create: {
          userId: user.id,
          ...data,
        },
      });

      return NextResponse.json({
        ...profile,
        skills: JSON.parse(profile.skills),
        experience: JSON.parse(profile.experience),
        preferences: JSON.parse(profile.preferences),
        hasCv: Boolean(profile.cvKey),
        cvKey: undefined,
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
