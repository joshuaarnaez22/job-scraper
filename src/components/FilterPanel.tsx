'use client';

import { useState } from 'react';

export interface FilterState {
  search: string;
  site: string;
  status: string;
  days: string;
  sortBy: string;
  sortOrder: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableSites: string[];
}

export function FilterPanel({ filters, onFilterChange, availableSites }: FilterPanelProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, search: localSearch });
  };

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setLocalSearch('');
    onFilterChange({
      search: '',
      site: '',
      status: '',
      days: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters =
    filters.search || filters.site || filters.status || filters.days;

  return (
    <div className="pixel-border bg-card p-5 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b-2 border-dashed border-foreground/20">
        <h3 className="font-retro text-xs">FILTERS</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-destructive font-retro"
          >
            [CLEAR]
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="text-[10px] font-retro text-muted-foreground block mb-2">SEARCH</label>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Job title..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="retro-btn px-3 py-2 bg-primary text-primary-foreground text-xs"
          >
            GO
          </button>
        </form>
      </div>

      {/* Site Filter */}
      <div>
        <label className="text-[10px] font-retro text-muted-foreground block mb-2">SITE</label>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => updateFilter('site', '')}
            className={`px-2 py-1 text-xs border-2 transition-colors ${
              filters.site === ''
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary border-foreground/20 hover:border-foreground'
            }`}
          >
            ALL
          </button>
          {availableSites.map((site) => (
            <button
              key={site}
              onClick={() => updateFilter('site', site)}
              className={`px-2 py-1 text-xs border-2 transition-colors uppercase ${
                filters.site === site
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary border-foreground/20 hover:border-foreground'
              }`}
            >
              {site}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="text-[10px] font-retro text-muted-foreground block mb-2">STATUS</label>
        <div className="flex flex-wrap gap-1">
          {[
            { value: '', label: 'ALL' },
            { value: 'new', label: 'NEW' },
            { value: 'viewed', label: 'VIEWED' },
            { value: 'applied', label: 'APPLIED' },
            { value: 'hidden', label: 'HIDDEN' },
          ].map(({ value, label }) => (
            <button
              key={value || 'all'}
              onClick={() => updateFilter('status', value)}
              className={`px-2 py-1 text-xs border-2 transition-colors ${
                filters.status === value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary border-foreground/20 hover:border-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Days Filter */}
      <div>
        <label className="text-[10px] font-retro text-muted-foreground block mb-2">POSTED</label>
        <div className="flex flex-wrap gap-1">
          {[
            { value: '', label: 'ANY' },
            { value: '1', label: '24H' },
            { value: '3', label: '3D' },
            { value: '7', label: '1W' },
            { value: '14', label: '2W' },
            { value: '30', label: '1M' },
          ].map(({ value, label }) => (
            <button
              key={value || 'any'}
              onClick={() => updateFilter('days', value)}
              className={`px-2 py-1 text-xs border-2 transition-colors ${
                filters.days === value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary border-foreground/20 hover:border-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="pt-4 border-t-2 border-dashed border-foreground/20">
        <label className="text-[10px] font-retro text-muted-foreground block mb-3">SORT BY</label>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="px-2 py-2 border-2 border-foreground bg-background text-xs focus:outline-none"
          >
            <option value="createdAt">ADDED</option>
            <option value="postedAt">POSTED</option>
            <option value="aiScore">AI SCORE</option>
            <option value="title">TITLE</option>
            <option value="company">COMPANY</option>
          </select>
          <select
            value={filters.sortOrder}
            onChange={(e) => updateFilter('sortOrder', e.target.value)}
            className="px-2 py-2 border-2 border-foreground bg-background text-xs focus:outline-none"
          >
            <option value="desc">NEWEST</option>
            <option value="asc">OLDEST</option>
          </select>
        </div>
      </div>
    </div>
  );
}
