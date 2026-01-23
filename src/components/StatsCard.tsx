'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
}

export function StatsCard({ title, value, description, icon, color = 'primary' }: StatsCardProps) {
  const colorClasses: Record<string, string> = {
    primary: 'border-primary bg-primary/10',
    green: 'border-[#6bcb77] bg-[#6bcb77]/10',
    yellow: 'border-[#ffd93d] bg-[#ffd93d]/10',
    red: 'border-[#ff6b6b] bg-[#ff6b6b]/10',
    cyan: 'border-[#4ecdc4] bg-[#4ecdc4]/10',
  };

  return (
    <div className={`pixel-border bg-card p-4 ${colorClasses[color] || colorClasses.primary}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-retro text-muted-foreground uppercase">{title}</p>
          <p className="text-2xl font-retro mt-2">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

interface StatsOverviewProps {
  stats: {
    totalJobs: number;
    newJobs: number;
    appliedJobs: number;
    sitesEnabled: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total"
        value={stats.totalJobs}
        description="All jobs"
        color="primary"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        }
      />
      <StatsCard
        title="New"
        value={stats.newJobs}
        description="Unread"
        color="cyan"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        }
      />
      <StatsCard
        title="Applied"
        value={stats.appliedJobs}
        description="Sent"
        color="green"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        }
      />
      <StatsCard
        title="Sites"
        value={stats.sitesEnabled}
        description="Active"
        color="yellow"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        }
      />
    </div>
  );
}
