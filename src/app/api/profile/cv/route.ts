/**
 * CV upload — Cloudflare R2
 * POST /api/profile/cv          — presign upload
 * PUT  /api/profile/cv          — finalize after client PUT to R2
 * GET  /api/profile/cv          — presigned download URL
 * DELETE /api/profile/cv        — remove object + clear profile fields
 */

import { NextRequest, NextResponse } from 'next/server';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { withUserRls } from '@/lib/rls';
import {
  assertValidCvUpload,
  buildCvObjectKey,
  createCvDownloadUrl,
  createCvUploadUrl,
  deleteCvObject,
  isR2Configured,
} from '@/lib/r2';

export async function GET() {
  try {
    const user = await requireCurrentUser();
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'Cloudflare R2 is not configured' },
        { status: 503 }
      );
    }

    return await withUserRls(user.id, async (tx) => {
      const profile = await tx.userProfile.findUnique({
        where: { userId: user.id },
        select: {
          cvKey: true,
          cvFileName: true,
          cvContentType: true,
          cvSizeBytes: true,
          cvUploadedAt: true,
        },
      });

      if (!profile?.cvKey) {
        return NextResponse.json({ cv: null });
      }

      const downloadUrl = await createCvDownloadUrl(profile.cvKey);
      return NextResponse.json({
        cv: {
          fileName: profile.cvFileName,
          contentType: profile.cvContentType,
          sizeBytes: profile.cvSizeBytes,
          uploadedAt: profile.cvUploadedAt,
          downloadUrl,
        },
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[CV] GET error:', error);
    return NextResponse.json({ error: 'Failed to get CV' }, { status: 500 });
  }
}

/** Create a presigned PUT URL for uploading a CV to R2 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    if (!isR2Configured()) {
      return NextResponse.json(
        {
          error:
            'Cloudflare R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    try {
      assertValidCvUpload({
        fileName: body.fileName,
        contentType: body.contentType,
        size: Number(body.size),
      });
    } catch (validationError) {
      return NextResponse.json(
        {
          error:
            validationError instanceof Error
              ? validationError.message
              : 'Invalid upload',
        },
        { status: 400 }
      );
    }

    const key = buildCvObjectKey(user.id, body.fileName);
    const uploadUrl = await createCvUploadUrl({
      key,
      contentType: body.contentType,
    });

    return NextResponse.json({
      uploadUrl,
      key,
      contentType: body.contentType,
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[CV] POST presign error:', error);
    return NextResponse.json({ error: 'Failed to start upload' }, { status: 500 });
  }
}

/** Persist CV metadata after a successful R2 upload */
export async function PUT(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'Cloudflare R2 is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    try {
      assertValidCvUpload({
        fileName: body.fileName,
        contentType: body.contentType,
        size: Number(body.size),
      });
    } catch (validationError) {
      return NextResponse.json(
        {
          error:
            validationError instanceof Error
              ? validationError.message
              : 'Invalid upload',
        },
        { status: 400 }
      );
    }

    if (!body.key || typeof body.key !== 'string') {
      return NextResponse.json({ error: 'key is required' }, { status: 400 });
    }

    // Ensure key is scoped to this user
    if (!body.key.startsWith(`cvs/${user.id}/`)) {
      return NextResponse.json({ error: 'Invalid object key' }, { status: 400 });
    }

    return await withUserRls(user.id, async (tx) => {
      const existing = await tx.userProfile.findUnique({
        where: { userId: user.id },
        select: { cvKey: true },
      });

      const oldKey = existing?.cvKey;
      if (oldKey && oldKey !== body.key) {
        try {
          await deleteCvObject(oldKey);
        } catch (err) {
          console.warn('[CV] Failed to delete previous CV object:', err);
        }
      }

      const data = {
        cvKey: body.key as string,
        cvFileName: body.fileName as string,
        cvContentType: body.contentType as string,
        cvSizeBytes: Number(body.size),
        cvUploadedAt: new Date(),
      };

      const profile = await tx.userProfile.upsert({
        where: { userId: user.id },
        update: data,
        create: {
          userId: user.id,
          name: '',
          skills: '[]',
          experience: '[]',
          preferences: JSON.stringify({
            tone: 'professional',
            length: 'medium',
            customInstructions: '',
          }),
          ...data,
        },
      });

      return NextResponse.json({
        cvKey: profile.cvKey,
        cvFileName: profile.cvFileName,
        cvContentType: profile.cvContentType,
        cvSizeBytes: profile.cvSizeBytes,
        cvUploadedAt: profile.cvUploadedAt,
      });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[CV] PUT complete error:', error);
    return NextResponse.json({ error: 'Failed to save CV' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await requireCurrentUser();

    return await withUserRls(user.id, async (tx) => {
      const profile = await tx.userProfile.findUnique({
        where: { userId: user.id },
        select: { cvKey: true },
      });

      if (profile?.cvKey && isR2Configured()) {
        try {
          await deleteCvObject(profile.cvKey);
        } catch (err) {
          console.warn('[CV] R2 delete failed:', err);
        }
      }

      if (profile) {
        await tx.userProfile.update({
          where: { userId: user.id },
          data: {
            cvKey: null,
            cvFileName: null,
            cvContentType: null,
            cvSizeBytes: null,
            cvUploadedAt: null,
          },
        });
      }

      return NextResponse.json({ ok: true });
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[CV] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete CV' }, { status: 500 });
  }
}
