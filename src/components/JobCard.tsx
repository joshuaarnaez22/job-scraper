'use client';

import { useState } from 'react';

export interface JobData {
  id: string;
  externalId: string;
  site: string;
  title: string;
  company: string;
  salary?: string | null;
  description: string;
  url: string;
  jobType?: string | null;
  experienceLevel?: string | null;
  workArrangement?: string | null;
  location?: string | null;
  postedAt?: string | null;
  status: string;
  aiScore?: number | null;
  aiSummary?: string | null;
  createdAt: string;
  generatedEmails?: { content: string; version: number }[];
}

interface JobCardProps {
  job: JobData;
  onStatusChange?: (id: string, status: string) => void;
  onGenerateCoverLetter?: (job: JobData) => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'NEW', color: 'bg-[#4ecdc4] text-[#1a1a2e]' },
  viewed: { label: 'VIEWED', color: 'bg-[#ffd93d] text-[#1a1a2e]' },
  applied: { label: 'APPLIED', color: 'bg-[#6bcb77] text-[#1a1a2e]' },
  hidden: { label: 'HIDDEN', color: 'bg-muted text-muted-foreground' },
  expired: { label: 'EXPIRED', color: 'bg-[#ff6b6b] text-white' },
};

export function JobCard({ job, onStatusChange, onGenerateCoverLetter }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '???';
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'TODAY';
    if (days === 1) return '1D AGO';
    if (days < 7) return `${days}D AGO`;
    if (days < 30) return `${Math.floor(days / 7)}W AGO`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  };

  const truncateDescription = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const status = statusConfig[job.status] || statusConfig.new;

  return (
    <div className="pixel-border bg-card p-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-retro text-sm leading-relaxed hover:text-primary transition-colors line-clamp-2"
            onClick={() => onStatusChange?.(job.id, 'viewed')}
          >
            {job.title}
          </a>
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {job.company} {job.location && `// ${job.location}`}
          </p>
        </div>

        {/* AI Score - XP Bar Style */}
        {job.aiScore !== null && job.aiScore !== undefined && (
          <div className="flex-shrink-0 w-20">
            <div className="text-[10px] font-retro text-center mb-1">MATCH</div>
            <div className="h-4 bg-muted border-2 border-foreground relative">
              <div
                className="h-full transition-all"
                style={{
                  width: `${job.aiScore * 100}%`,
                  backgroundColor: job.aiScore >= 0.7 ? '#6bcb77' : job.aiScore >= 0.4 ? '#ffd93d' : '#ff6b6b',
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-retro">
                {Math.round(job.aiScore * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Salary */}
      {job.salary && (
        <div className="inline-block px-2 py-1 bg-[#6bcb77]/20 border border-[#6bcb77] text-[#6bcb77] text-xs font-medium mb-3">
          {job.salary}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-2 py-0.5 bg-primary/20 border border-primary text-xs uppercase">
          {job.site}
        </span>
        {job.jobType && (
          <span className="px-2 py-0.5 bg-secondary border border-foreground/20 text-xs uppercase">
            {job.jobType}
          </span>
        )}
        {job.workArrangement && (
          <span className="px-2 py-0.5 bg-secondary border border-foreground/20 text-xs uppercase">
            {job.workArrangement}
          </span>
        )}
      </div>

      {/* Description */}
      {job.description && (
        <div className="mb-3 p-2 bg-muted/50 border-l-4 border-foreground/20">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isExpanded ? job.description : truncateDescription(job.description)}
          </p>
          {job.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:underline mt-1 font-retro"
            >
              [{isExpanded ? 'LESS' : 'MORE'}]
            </button>
          )}
        </div>
      )}

      {/* AI Summary */}
      {job.aiSummary && (
        <div className="mb-3 p-2 bg-primary/5 border border-primary/20 border-dashed">
          <p className="text-[10px] font-retro text-primary mb-1">AI SUMMARY:</p>
          <p className="text-sm text-muted-foreground">{job.aiSummary}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t-2 border-dashed border-foreground/20">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 text-[10px] font-retro ${status.color}`}>
            {status.label}
          </span>
          <span className="text-xs text-muted-foreground font-retro">
            {formatDate(job.postedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={job.status}
            onChange={(e) => onStatusChange?.(job.id, e.target.value)}
            className="text-xs border-2 border-foreground px-2 py-1 bg-card cursor-pointer focus:outline-none font-retro"
          >
            <option value="new">NEW</option>
            <option value="viewed">VIEWED</option>
            <option value="applied">APPLIED</option>
            <option value="hidden">HIDDEN</option>
            <option value="expired">EXPIRED</option>
          </select>

          <button
            onClick={() => onGenerateCoverLetter?.(job)}
            className="retro-btn px-3 py-1 bg-secondary text-xs"
          >
            LETTER
          </button>

          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-btn px-3 py-1 bg-primary text-primary-foreground text-xs"
          >
            VIEW
          </a>
        </div>
      </div>
    </div>
  );
}
