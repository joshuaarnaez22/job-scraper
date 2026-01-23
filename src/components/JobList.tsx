'use client';

import { JobCard, type JobData } from './JobCard';

interface JobListProps {
  jobs: JobData[];
  onStatusChange?: (id: string, status: string) => void;
  onGenerateCoverLetter?: (job: JobData) => void;
  isLoading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="pixel-border bg-card p-4 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="h-5 bg-muted w-3/4 mb-2" />
          <div className="h-4 bg-muted w-1/2" />
        </div>
        <div className="w-20">
          <div className="h-3 bg-muted w-full mb-1" />
          <div className="h-4 bg-muted w-full border-2 border-foreground/20" />
        </div>
      </div>

      {/* Salary */}
      <div className="h-6 bg-muted w-24 mb-3" />

      {/* Tags */}
      <div className="flex gap-2 mb-3">
        <div className="h-5 bg-muted w-16" />
        <div className="h-5 bg-muted w-20" />
        <div className="h-5 bg-muted w-14" />
      </div>

      {/* Description */}
      <div className="p-2 bg-muted/50 border-l-4 border-foreground/20 mb-3">
        <div className="space-y-2">
          <div className="h-3 bg-muted w-full" />
          <div className="h-3 bg-muted w-4/5" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-foreground/20">
        <div className="flex gap-2">
          <div className="h-5 bg-muted w-12" />
          <div className="h-4 bg-muted w-16" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 bg-muted w-20" />
          <div className="h-7 bg-muted w-16" />
          <div className="h-7 bg-muted w-14" />
        </div>
      </div>
    </div>
  );
}

export function JobList({
  jobs,
  onStatusChange,
  onGenerateCoverLetter,
  isLoading,
}: JobListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="pixel-border bg-card p-8 text-center">
        <div className="font-retro text-4xl mb-4 text-muted-foreground">:(</div>
        <h3 className="font-retro text-sm mb-2">NO JOBS FOUND</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or run a new scrape.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onStatusChange={onStatusChange}
          onGenerateCoverLetter={onGenerateCoverLetter}
        />
      ))}
    </div>
  );
}
