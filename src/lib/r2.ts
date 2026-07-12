/**
 * Cloudflare R2 (S3-compatible) helpers for private CV storage
 *
 * Env:
 *   R2_ACCOUNT_ID
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME
 *   R2_PUBLIC_BASE_URL (optional — not used for private CVs)
 */

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const CV_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const CV_ALLOWED_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME
  );
}

function getR2Client(): S3Client {
  if (!isR2Configured()) {
    throw new Error('Cloudflare R2 is not configured');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

function bucket(): string {
  return process.env.R2_BUCKET_NAME!;
}

export function buildCvObjectKey(userId: string, fileName: string): string {
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
  return `cvs/${userId}/${Date.now()}-${safe}`;
}

export async function createCvUploadUrl(options: {
  key: string;
  contentType: string;
  expiresIn?: number;
}): Promise<string> {
  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: bucket(),
    Key: options.key,
    ContentType: options.contentType,
  });
  return getSignedUrl(client, command, {
    expiresIn: options.expiresIn ?? 600,
  });
}

export async function createCvDownloadUrl(
  key: string,
  expiresIn = 600
): Promise<string> {
  const client = getR2Client();
  const command = new GetObjectCommand({
    Bucket: bucket(),
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn });
}

export async function deleteCvObject(key: string): Promise<void> {
  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket(),
      Key: key,
    })
  );
}

export function assertValidCvUpload(meta: {
  fileName: string;
  contentType: string;
  size: number;
}): void {
  if (!meta.fileName?.trim()) {
    throw new Error('fileName is required');
  }
  if (!CV_ALLOWED_TYPES.has(meta.contentType)) {
    throw new Error('Only PDF or Word documents are allowed');
  }
  if (!Number.isFinite(meta.size) || meta.size <= 0 || meta.size > CV_MAX_BYTES) {
    throw new Error(`File must be between 1 byte and ${CV_MAX_BYTES / (1024 * 1024)}MB`);
  }
}
