/**
 * POST /api/settings/suggest-keywords
 * DeepSeek suggests scrape keywords from the current user's profile.
 */

import { NextResponse } from 'next/server';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { suggestKeywordsFromProfile } from '@/lib/ai';
import { withUserRls } from '@/lib/rls';

export async function POST() {
  try {
    const user = await requireCurrentUser();

    const profile = await withUserRls(user.id, (tx) =>
      tx.userProfile.findUnique({ where: { userId: user.id } })
    );

    if (!profile || (!profile.title && !profile.summary && profile.skills === '[]')) {
      return NextResponse.json(
        {
          error:
            'Add a title, summary, or skills in Profile first (CV upload helps later).',
        },
        { status: 400 }
      );
    }

    const suggestion = await suggestKeywordsFromProfile({
      name: profile.name,
      title: profile.title || undefined,
      summary: profile.summary || undefined,
      skills: JSON.parse(profile.skills) as string[],
      experience: JSON.parse(profile.experience) as Array<{
        company: string;
        role: string;
        duration: string;
        highlights: string[];
      }>,
      education: profile.education || undefined,
    });

    return NextResponse.json(suggestion);
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[Settings] suggest-keywords error:', error);
    return NextResponse.json(
      { error: 'Failed to suggest keywords' },
      { status: 500 }
    );
  }
}
