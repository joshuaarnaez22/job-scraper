/**
 * POST /api/profile/cv/parse
 * Download CV from R2 → extract text → DeepSeek → fill UserProfile
 *
 * Body (optional): { apply?: boolean } — default true, save to DB
 */

import { NextRequest, NextResponse } from 'next/server';
import { extractProfileFromCvText } from '@/lib/ai';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { extractTextFromCv } from '@/lib/cv-parse';
import { getCvObjectBuffer, isR2Configured } from '@/lib/r2';
import { withUserRls } from '@/lib/rls';

export const maxDuration = 60;
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'Cloudflare R2 is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const apply = body.apply !== false;

    const profileMeta = await withUserRls(user.id, (tx) =>
      tx.userProfile.findUnique({
        where: { userId: user.id },
        select: {
          cvKey: true,
          cvFileName: true,
          cvContentType: true,
          preferences: true,
        },
      })
    );

    if (!profileMeta?.cvKey) {
      return NextResponse.json(
        { error: 'Upload a CV first' },
        { status: 400 }
      );
    }

    const { body: fileBuffer, contentType } = await getCvObjectBuffer(
      profileMeta.cvKey
    );

    const text = await extractTextFromCv({
      buffer: fileBuffer,
      contentType: contentType || profileMeta.cvContentType,
      fileName: profileMeta.cvFileName,
    });

    if (text.length < 40) {
      return NextResponse.json(
        {
          error:
            'Could not extract enough text from the CV. Try a text-based PDF or DOCX.',
        },
        { status: 422 }
      );
    }

    const parsed = await extractProfileFromCvText(text);

    if (!apply) {
      return NextResponse.json({ parsed, applied: false });
    }

    const preferences =
      profileMeta.preferences ||
      JSON.stringify({
        tone: 'professional',
        length: 'medium',
        customInstructions: '',
      });

    const saved = await withUserRls(user.id, async (tx) => {
      return tx.userProfile.upsert({
        where: { userId: user.id },
        update: {
          name: parsed.name,
          title: parsed.title || null,
          summary: parsed.summary || null,
          skills: JSON.stringify(parsed.skills),
          experience: JSON.stringify(parsed.experience),
          education: parsed.education || null,
          portfolioUrl: parsed.portfolioUrl || null,
          linkedinUrl: parsed.linkedinUrl || null,
        },
        create: {
          userId: user.id,
          name: parsed.name || '',
          title: parsed.title || null,
          summary: parsed.summary || null,
          skills: JSON.stringify(parsed.skills),
          experience: JSON.stringify(parsed.experience),
          education: parsed.education || null,
          portfolioUrl: parsed.portfolioUrl || null,
          linkedinUrl: parsed.linkedinUrl || null,
          preferences,
          cvKey: profileMeta.cvKey,
          cvFileName: profileMeta.cvFileName,
          cvContentType: profileMeta.cvContentType,
        },
      });
    });

    return NextResponse.json({
      applied: true,
      parsed,
      profile: {
        ...saved,
        skills: JSON.parse(saved.skills),
        experience: JSON.parse(saved.experience),
        preferences: JSON.parse(saved.preferences),
        hasCv: Boolean(saved.cvKey),
        cvKey: undefined,
      },
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[CV] parse error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to parse CV',
      },
      { status: 500 }
    );
  }
}
