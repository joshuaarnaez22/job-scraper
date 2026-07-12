'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SettingsForm, type SearchSettingsData } from '@/components/SettingsForm';

export default function DashboardSettingsPage() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      return res.json() as Promise<
        SearchSettingsData & {
          updatedAt?: string;
          planLimits?: {
            maxSites: number;
            aiMatching: boolean;
            label: string;
          };
        }
      >;
    },
  });

  const saveSettingsMutation = useMutation({
    mutationFn: async (data: SearchSettingsData) => {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save settings');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="pixel-border bg-card p-4">
          <h1 className="font-retro text-lg">{`> SETTINGS`}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Keywords, sites, filters, and AI matching
          </p>
        </div>
        {isLoading && (
          <div className="pixel-border bg-card p-8 text-center font-retro text-xs">
            LOADING…
          </div>
        )}
        {settings && (
          <SettingsForm
            key={settings.updatedAt || 'settings'}
            planLimits={settings.planLimits}
            initialData={{
              keywords: settings.keywords ?? [],
              excludeKeywords: settings.excludeKeywords ?? [],
              enabledSites: settings.enabledSites ?? [],
              daysPosted: settings.daysPosted ?? null,
              salaryMin: settings.salaryMin ?? null,
              salaryMax: settings.salaryMax ?? null,
              salaryCurrency: settings.salaryCurrency ?? 'PHP',
              jobTypes: settings.jobTypes ?? [],
              experienceLevels: settings.experienceLevels ?? [],
              workArrangements: settings.workArrangements ?? [],
              excludeCompanies: settings.excludeCompanies ?? [],
              requiredSkills: settings.requiredSkills ?? [],
              preferredSkills: settings.preferredSkills ?? [],
              useAIMatching: Boolean(settings.useAIMatching),
              aiThreshold:
                typeof settings.aiThreshold === 'number'
                  ? settings.aiThreshold
                  : 0.7,
              digestMode: Boolean(settings.digestMode),
              maxEmailsPerRun: settings.maxEmailsPerRun ?? 10,
            }}
            onSave={async (data) => {
              await saveSettingsMutation.mutateAsync(data);
            }}
          />
        )}
      </div>
    </div>
  );
}
