'use client';

import { useMemo, useState } from 'react';
import { getAllSiteIds, getSiteConfig } from '@/config/sites';

export type SearchSettingsData = {
  keywords: string[];
  excludeKeywords: string[];
  enabledSites: string[];
  daysPosted: number | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  jobTypes: string[];
  experienceLevels: string[];
  workArrangements: string[];
  excludeCompanies: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  useAIMatching: boolean;
  aiThreshold: number;
  digestMode: boolean;
  maxEmailsPerRun: number;
};

type SettingsFormProps = {
  initialData: SearchSettingsData;
  onSave: (data: SearchSettingsData) => Promise<void>;
  planLimits?: {
    maxSites: number;
    aiMatching: boolean;
    label: string;
  };
};

const JOB_TYPE_OPTIONS = ['full-time', 'part-time', 'contract', 'freelance'];
const EXPERIENCE_OPTIONS = ['entry', 'mid', 'senior'];
const ARRANGEMENT_OPTIONS = ['remote', 'hybrid', 'onsite'];

function TagEditor({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (!v || values.includes(v)) return;
    onChange([...values, v]);
    setDraft('');
  };

  return (
    <div>
      <label className="text-[10px] font-retro text-muted-foreground block mb-2">
        {label}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="retro-btn px-3 py-2 bg-secondary border-2 border-foreground font-retro text-[10px]"
        >
          ADD
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.length === 0 && (
          <span className="text-xs text-muted-foreground">None</span>
        )}
        {values.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(values.filter((x) => x !== v))}
            className="px-2 py-1 border-2 border-foreground bg-muted text-xs hover:bg-destructive hover:text-white"
            title="Remove"
          >
            {v} ×
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-retro text-muted-foreground block mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() =>
                onChange(
                  checked ? values.filter((v) => v !== opt) : [...values, opt]
                )
              }
              className={`px-3 py-1.5 border-2 font-retro text-[10px] ${
                checked
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary border-foreground/30'
              }`}
            >
              {opt.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SettingsForm({
  initialData,
  onSave,
  planLimits,
}: SettingsFormProps) {
  const [settings, setSettings] = useState<SearchSettingsData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [suggestBusy, setSuggestBusy] = useState(false);
  const [suggestNote, setSuggestNote] = useState<string | null>(null);
  const maxSites = planLimits?.maxSites ?? 99;
  const aiAllowed = planLimits?.aiMatching ?? true;
  const [error, setError] = useState<string | null>(null);

  const siteOptions = useMemo(
    () =>
      getAllSiteIds().map((id) => {
        const cfg = getSiteConfig(id)!;
        return {
          id,
          name: cfg.name,
          globallyEnabled: cfg.enabled,
        };
      }),
    []
  );

  const patch = <K extends keyof SearchSettingsData>(
    key: K,
    value: SearchSettingsData[K]
  ) => setSettings((s) => ({ ...s, [key]: value }));

  const handleSuggest = async () => {
    setSuggestBusy(true);
    setSuggestNote(null);
    setError(null);
    try {
      const res = await fetch('/api/settings/suggest-keywords', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Suggest failed');

      setSettings((s) => ({
        ...s,
        keywords: data.keywords?.length ? data.keywords : s.keywords,
        excludeKeywords: [
          ...new Set([
            ...s.excludeKeywords,
            ...((data.excludeKeywords as string[]) || []),
          ]),
        ],
      }));
      setSuggestNote(data.rationale || 'Keywords updated from your profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Suggest failed');
    } finally {
      setSuggestBusy(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      await onSave(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Keywords */}
      <div className="pixel-border bg-card p-4 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b-2 border-dashed border-foreground/20">
          <h3 className="font-retro text-xs">SCRAPE KEYWORDS</h3>
          <button
            type="button"
            disabled={suggestBusy}
            onClick={handleSuggest}
            className="retro-btn px-3 py-1.5 bg-accent text-accent-foreground font-retro text-[10px]"
          >
            {suggestBusy ? 'THINKING…' : 'SUGGEST FROM PROFILE'}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Each keyword is a separate board search (max 3 used per run). Prefer
          specific phrases like “react developer”.
        </p>
        <TagEditor
          label="KEYWORDS"
          values={settings.keywords}
          onChange={(v) => patch('keywords', v)}
          placeholder="e.g. next.js developer"
        />
        <TagEditor
          label="EXCLUDE KEYWORDS"
          values={settings.excludeKeywords}
          onChange={(v) => patch('excludeKeywords', v)}
          placeholder="e.g. virtual assistant"
        />
        {suggestNote && (
          <p className="text-xs text-green-700">{suggestNote}</p>
        )}
      </div>

      {/* Sites */}
      <div className="pixel-border bg-card p-4 space-y-4">
        <h3 className="font-retro text-xs mb-2 pb-2 border-b-2 border-dashed border-foreground/20">
          SITES
        </h3>
        {planLimits && (
          <p className="text-xs text-muted-foreground">
            {planLimits.label} plan: up to {maxSites} site
            {maxSites === 1 ? '' : 's'}.{' '}
            <a href="/dashboard/billing" className="underline">
              Upgrade
            </a>
          </p>
        )}
        <div className="space-y-2">
          {siteOptions.map((site) => {
            const checked = settings.enabledSites.includes(site.id);
            const locked = !site.globallyEnabled;
            const atCap =
              !checked && settings.enabledSites.length >= maxSites;
            const disabled = locked || atCap;
            return (
              <label
                key={site.id}
                className={`flex items-center justify-between gap-3 border-2 px-3 py-2 ${
                  disabled
                    ? 'border-foreground/20 opacity-50'
                    : 'border-foreground'
                }`}
              >
                <span className="text-sm">
                  {site.name}
                  {locked && (
                    <span className="ml-2 text-[10px] font-retro text-muted-foreground">
                      OFF IN SITES.TS
                    </span>
                  )}
                  {!locked && atCap && (
                    <span className="ml-2 text-[10px] font-retro text-muted-foreground">
                      PLAN LIMIT
                    </span>
                  )}
                </span>
                <input
                  type="checkbox"
                  disabled={disabled && !checked}
                  checked={checked && !locked}
                  onChange={() => {
                    if (locked) return;
                    if (checked) {
                      patch(
                        'enabledSites',
                        settings.enabledSites.filter((id) => id !== site.id)
                      );
                      return;
                    }
                    if (atCap) return;
                    patch('enabledSites', [
                      ...settings.enabledSites,
                      site.id,
                    ]);
                  }}
                  className="h-4 w-4"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="pixel-border bg-card p-4 space-y-4">
        <h3 className="font-retro text-xs mb-2 pb-2 border-b-2 border-dashed border-foreground/20">
          FILTERS
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[10px] font-retro text-muted-foreground block mb-2">
              DAYS POSTED
            </label>
            <input
              type="number"
              min={1}
              value={settings.daysPosted ?? ''}
              onChange={(e) =>
                patch(
                  'daysPosted',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
              placeholder="Any"
              className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-retro text-muted-foreground block mb-2">
              CURRENCY
            </label>
            <select
              value={settings.salaryCurrency}
              onChange={(e) => patch('salaryCurrency', e.target.value)}
              className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm"
            >
              <option value="PHP">PHP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-retro text-muted-foreground block mb-2">
              SALARY MIN
            </label>
            <input
              type="number"
              min={0}
              value={settings.salaryMin ?? ''}
              onChange={(e) =>
                patch(
                  'salaryMin',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
              className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-retro text-muted-foreground block mb-2">
              SALARY MAX
            </label>
            <input
              type="number"
              min={0}
              value={settings.salaryMax ?? ''}
              onChange={(e) =>
                patch(
                  'salaryMax',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
              className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm"
            />
          </div>
        </div>

        <CheckboxGroup
          label="JOB TYPES"
          options={JOB_TYPE_OPTIONS}
          values={settings.jobTypes}
          onChange={(v) => patch('jobTypes', v)}
        />
        <CheckboxGroup
          label="EXPERIENCE"
          options={EXPERIENCE_OPTIONS}
          values={settings.experienceLevels}
          onChange={(v) => patch('experienceLevels', v)}
        />
        <CheckboxGroup
          label="WORK ARRANGEMENT"
          options={ARRANGEMENT_OPTIONS}
          values={settings.workArrangements}
          onChange={(v) => patch('workArrangements', v)}
        />

        <TagEditor
          label="EXCLUDE COMPANIES"
          values={settings.excludeCompanies}
          onChange={(v) => patch('excludeCompanies', v)}
        />
        <TagEditor
          label="REQUIRED SKILLS"
          values={settings.requiredSkills}
          onChange={(v) => patch('requiredSkills', v)}
        />
        <TagEditor
          label="PREFERRED SKILLS"
          values={settings.preferredSkills}
          onChange={(v) => patch('preferredSkills', v)}
        />
      </div>

      {/* AI + notifications */}
      <div className="pixel-border bg-card p-4 space-y-4">
        <h3 className="font-retro text-xs mb-2 pb-2 border-b-2 border-dashed border-foreground/20">
          AI & ALERTS
        </h3>
        <label
          className={`flex items-center justify-between gap-3 border-2 px-3 py-2 ${
            aiAllowed ? 'border-foreground' : 'border-foreground/20 opacity-60'
          }`}
        >
          <span className="text-sm">
            Use AI matching (DeepSeek)
            {!aiAllowed && (
              <span className="ml-2 text-[10px] font-retro text-muted-foreground">
                PRO+
              </span>
            )}
          </span>
          <input
            type="checkbox"
            disabled={!aiAllowed}
            checked={settings.useAIMatching && aiAllowed}
            onChange={(e) => {
              if (!aiAllowed) return;
              patch('useAIMatching', e.target.checked);
            }}
            className="h-4 w-4"
          />
        </label>
        {!aiAllowed && (
          <p className="text-xs text-muted-foreground">
            AI matching is a Pro feature.{' '}
            <a href="/dashboard/billing" className="underline">
              Upgrade
            </a>
          </p>
        )}
        <div>
          <label className="text-[10px] font-retro text-muted-foreground block mb-2">
            AI THRESHOLD ({settings.aiThreshold.toFixed(2)})
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.aiThreshold}
            onChange={(e) => patch('aiThreshold', Number(e.target.value))}
            className="w-full"
            disabled={!settings.useAIMatching}
          />
        </div>
        <label className="flex items-center justify-between gap-3 border-2 border-foreground px-3 py-2">
          <span className="text-sm">Digest mode (one email)</span>
          <input
            type="checkbox"
            checked={settings.digestMode}
            onChange={(e) => patch('digestMode', e.target.checked)}
            className="h-4 w-4"
          />
        </label>
        <div>
          <label className="text-[10px] font-retro text-muted-foreground block mb-2">
            MAX JOBS PER DIGEST
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={settings.maxEmailsPerRun}
            onChange={(e) => patch('maxEmailsPerRun', Number(e.target.value))}
            className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm"
          />
        </div>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="retro-btn px-6 py-3 bg-primary text-primary-foreground font-retro text-xs"
        >
          {isSaving ? 'SAVING…' : 'SAVE SETTINGS'}
        </button>
        {saveSuccess && (
          <span className="text-xs text-green-700 font-retro">SAVED</span>
        )}
      </div>
    </form>
  );
}
