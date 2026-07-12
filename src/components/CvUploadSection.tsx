'use client';

import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type CvMeta = {
  hasCv?: boolean;
  cvFileName?: string | null;
  cvContentType?: string | null;
  cvSizeBytes?: number | null;
  cvUploadedAt?: string | null;
};

export function CvUploadSection({ profile }: { profile?: CvMeta | null }) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const hasCv = Boolean(profile?.hasCv && profile?.cvFileName);

  const fillFromCv = async () => {
    const res = await fetch('/api/profile/cv/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apply: true }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to fill profile from CV');
    }
    await queryClient.invalidateQueries({ queryKey: ['profile'] });
    return data;
  };

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    setOk(null);
    try {
      const contentType =
        file.type ||
        (file.name.toLowerCase().endsWith('.pdf')
          ? 'application/pdf'
          : file.name.toLowerCase().endsWith('.docx')
            ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            : 'application/msword');

      const presignRes = await fetch('/api/profile/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType,
          size: file.size,
        }),
      });
      const presign = await presignRes.json();
      if (!presignRes.ok) {
        throw new Error(presign.error || 'Failed to start upload');
      }

      const putRes = await fetch(presign.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': presign.contentType },
      });
      if (!putRes.ok) {
        throw new Error(`Upload to storage failed (${putRes.status})`);
      }

      const completeRes = await fetch('/api/profile/cv', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: presign.key,
          fileName: file.name,
          contentType: presign.contentType,
          size: file.size,
        }),
      });
      const complete = await completeRes.json();
      if (!completeRes.ok) {
        throw new Error(complete.error || 'Failed to save CV metadata');
      }

      setOk('CV uploaded — filling Basic Info…');
      await queryClient.invalidateQueries({ queryKey: ['profile'] });

      try {
        await fillFromCv();
        setOk('CV uploaded and Basic Info filled. Review and Save.');
      } catch (parseErr) {
        setOk('CV uploaded');
        setError(
          parseErr instanceof Error
            ? `Upload OK, but fill failed: ${parseErr.message}`
            : 'Upload OK, but could not fill profile from CV'
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/profile/cv');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get download link');
      if (!data.cv?.downloadUrl) throw new Error('No CV on file');
      window.open(data.cv.downloadUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setBusy(false);
    }
  };

  const fillProfile = async () => {
    setBusy(true);
    setError(null);
    setOk(null);
    try {
      await fillFromCv();
      setOk('Basic Info filled from CV. Review and Save if needed.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fill failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!confirm('Remove stored CV?')) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/profile/cv', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      setOk('CV removed');
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pixel-border bg-card p-4">
      <h3 className="font-retro text-xs mb-4 pb-2 border-b-2 border-dashed border-foreground/20">
        CV / RESUME
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        PDF or DOCX (max 5MB) on Cloudflare R2. After upload we extract text with
        AI and fill Basic Info / skills / experience.
      </p>

      {hasCv ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            <div className="font-medium">{profile?.cvFileName}</div>
            <div className="text-xs text-muted-foreground">
              {profile?.cvSizeBytes
                ? `${(profile.cvSizeBytes / 1024).toFixed(0)} KB`
                : ''}
              {profile?.cvUploadedAt
                ? ` · ${new Date(profile.cvUploadedAt).toLocaleDateString()}`
                : ''}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={fillProfile}
              className="retro-btn px-3 py-1.5 bg-accent text-accent-foreground font-retro text-[10px]"
            >
              {busy ? '…' : 'FILL PROFILE'}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={download}
              className="retro-btn px-3 py-1.5 bg-secondary border-2 border-foreground font-retro text-[10px]"
            >
              DOWNLOAD
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="retro-btn px-3 py-1.5 bg-primary text-primary-foreground font-retro text-[10px]"
            >
              REPLACE
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={remove}
              className="retro-btn px-3 py-1.5 bg-destructive text-white font-retro text-[10px]"
            >
              REMOVE
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="retro-btn px-4 py-2 bg-accent text-accent-foreground font-retro text-xs"
        >
          {busy ? 'WORKING…' : 'UPLOAD CV'}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />

      {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      {ok && <p className="mt-3 text-xs text-green-700">{ok}</p>}
    </div>
  );
}
