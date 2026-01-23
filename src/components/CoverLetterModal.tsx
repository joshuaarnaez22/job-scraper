'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { JobData } from './JobCard';

interface CoverLetterModalProps {
  job: JobData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CoverLetterModal({ job, isOpen, onClose }: CoverLetterModalProps) {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateCoverLetter = async (regenerate = false) => {
    if (!job) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`/api/jobs/${job.id}/generate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regenerate }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate cover letter');
      }

      const data = await response.json();
      setContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setContent('');
    setIsEditing(false);
    setError(null);
    setCopied(false);
    onClose();
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 border-4 border-foreground bg-card !rounded-none">
        <DialogHeader className="px-4 py-3 border-b-4 border-foreground bg-primary text-primary-foreground">
          <DialogTitle className="font-retro text-sm">
            {`> COVER LETTER`}
          </DialogTitle>
          <div className="text-xs mt-1 opacity-80 truncate">
            {job.title} @ {job.company}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {error && (
            <div className="m-4 bg-destructive/20 border-2 border-destructive p-3 text-sm">
              <p className="font-retro text-[10px] text-destructive mb-1">ERROR:</p>
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {!content && !isGenerating && !error && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
              <div className="font-retro text-4xl mb-4 text-primary animate-pulse">{`[?]`}</div>
              <h3 className="font-retro text-sm mb-2">GENERATE LETTER</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
                Create a personalized cover letter using your profile data.
              </p>
              <button
                onClick={() => generateCoverLetter(false)}
                className="retro-btn px-6 py-3 bg-primary text-primary-foreground font-retro text-xs"
              >
                START
              </button>
            </div>
          )}

          {isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
              <div className="font-retro text-2xl mb-4 animate-pulse">
                <span className="inline-block animate-bounce">{`[`}</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>{`=`}</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>{`=`}</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>{`=`}</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>{`]`}</span>
              </div>
              <p className="font-retro text-xs text-muted-foreground">GENERATING...</p>
            </div>
          )}

          {content && !isGenerating && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto p-4">
                {isEditing ? (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full min-h-[300px] px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary resize-none"
                  />
                ) : (
                  <div className="p-3 bg-muted/30 border-2 border-dashed border-foreground/20 text-sm leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                )}
              </div>

              <div className="border-t-4 border-foreground px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="retro-btn px-3 py-1.5 bg-secondary text-xs"
                  >
                    {isEditing ? 'VIEW' : 'EDIT'}
                  </button>
                  <button
                    onClick={() => generateCoverLetter(true)}
                    disabled={isGenerating}
                    className="retro-btn px-3 py-1.5 bg-secondary text-xs disabled:opacity-50"
                  >
                    REDO
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className={`retro-btn px-3 py-1.5 text-xs ${
                      copied ? 'bg-[#6bcb77] text-[#1a1a2e]' : 'bg-secondary'
                    }`}
                  >
                    {copied ? 'COPIED!' : 'COPY'}
                  </button>
                  <button
                    onClick={handleClose}
                    className="retro-btn px-3 py-1.5 bg-primary text-primary-foreground text-xs"
                  >
                    DONE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
