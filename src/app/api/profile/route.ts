/**
 * Profile API
 * GET /api/profile - Get user profile
 * PUT /api/profile - Update user profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id: 'default' },
    });

    // If no profile exists, return empty template
    if (!profile) {
      return NextResponse.json({
        id: 'default',
        name: '',
        title: '',
        summary: '',
        skills: [],
        experience: [],
        education: '',
        portfolioUrl: '',
        linkedinUrl: '',
        preferences: {
          tone: 'professional',
          length: 'medium',
          customInstructions: '',
        },
      });
    }

    // Parse JSON fields
    return NextResponse.json({
      ...profile,
      skills: JSON.parse(profile.skills),
      experience: JSON.parse(profile.experience),
      preferences: JSON.parse(profile.preferences),
    });
  } catch (error) {
    console.error('[API] Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
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
      preferences: JSON.stringify(body.preferences || {
        tone: 'professional',
        length: 'medium',
        customInstructions: '',
      }),
    };

    const profile = await prisma.userProfile.upsert({
      where: { id: 'default' },
      update: data,
      create: {
        id: 'default',
        ...data,
      },
    });

    // Parse JSON fields for response
    return NextResponse.json({
      ...profile,
      skills: JSON.parse(profile.skills),
      experience: JSON.parse(profile.experience),
      preferences: JSON.parse(profile.preferences),
    });
  } catch (error) {
    console.error('[API] Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
