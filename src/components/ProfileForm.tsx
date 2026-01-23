'use client';

import { useState } from 'react';

export interface UserProfileData {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  experience: WorkExperience[];
  education: string;
  portfolioUrl: string;
  linkedinUrl: string;
  preferences: {
    tone: 'professional' | 'casual' | 'enthusiastic';
    length: 'short' | 'medium' | 'long';
    customInstructions: string;
  };
}

interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

interface ProfileFormProps {
  initialData?: UserProfileData;
  onSave: (data: UserProfileData) => Promise<void>;
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfileData>(
    initialData || {
      name: '',
      title: '',
      summary: '',
      skills: [],
      experience: [],
      education: '',
      portfolioUrl: '',
      linkedinUrl: '',
      preferences: {
        tone: 'professional',
        length: 'medium',
        customInstructions: '',
      },
    }
  );

  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [
        ...profile.experience,
        { company: '', role: '', duration: '', highlights: [] },
      ],
    });
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string | string[]) => {
    const updated = [...profile.experience];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, experience: updated });
  };

  const removeExperience = (index: number) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onSave(profile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="pixel-border bg-card p-4">
        <h3 className="font-retro text-xs mb-4 pb-2 border-b-2 border-dashed border-foreground/20">
          BASIC INFO
        </h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-retro text-muted-foreground block mb-2">NAME *</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] font-retro text-muted-foreground block mb-2">TITLE</label>
              <input
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                placeholder="Frontend Developer"
                className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-retro text-muted-foreground block mb-2">SUMMARY</label>
            <textarea
              value={profile.summary}
              onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
              placeholder="Brief overview..."
              rows={3}
              className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-retro text-muted-foreground block mb-2">PORTFOLIO</label>
              <input
                type="url"
                value={profile.portfolioUrl}
                onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] font-retro text-muted-foreground block mb-2">LINKEDIN</label>
              <input
                type="url"
                value={profile.linkedinUrl}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-retro text-muted-foreground block mb-2">EDUCATION</label>
            <input
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
              placeholder="BS Computer Science"
              className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="pixel-border bg-card p-4">
        <h3 className="font-retro text-xs mb-4 pb-2 border-b-2 border-dashed border-foreground/20">
          SKILLS
        </h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill..."
              className="flex-1 px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="retro-btn px-4 py-2 bg-secondary text-xs"
            >
              ADD
            </button>
          </div>
          {profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="px-2 py-1 bg-primary/20 border border-primary text-xs hover:bg-destructive hover:border-destructive hover:text-white transition-colors"
                >
                  {skill} [X]
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No skills added yet</p>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="pixel-border bg-card p-4">
        <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-dashed border-foreground/20">
          <h3 className="font-retro text-xs">EXPERIENCE</h3>
          <button
            type="button"
            onClick={addExperience}
            className="retro-btn px-3 py-1 bg-secondary text-[10px]"
          >
            + ADD
          </button>
        </div>
        <div className="space-y-4">
          {profile.experience.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No experience added yet
            </p>
          ) : (
            profile.experience.map((exp, index) => (
              <div key={index} className="border-2 border-dashed border-foreground/20 p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-retro text-muted-foreground">#{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-xs text-destructive hover:underline font-retro"
                  >
                    [DEL]
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder="Company"
                    className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    value={exp.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    placeholder="Role"
                    className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <input
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  placeholder="Duration (e.g., Jan 2022 - Present)"
                  className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary"
                />
                <textarea
                  value={exp.highlights.join('\n')}
                  onChange={(e) =>
                    updateExperience(index, 'highlights', e.target.value.split('\n').filter(Boolean))
                  }
                  placeholder="Key achievements (one per line)"
                  rows={2}
                  className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Preferences */}
      <div className="pixel-border bg-card p-4">
        <h3 className="font-retro text-xs mb-4 pb-2 border-b-2 border-dashed border-foreground/20">
          COVER LETTER PREFS
        </h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-retro text-muted-foreground block mb-2">TONE</label>
              <select
                value={profile.preferences.tone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      tone: e.target.value as 'professional' | 'casual' | 'enthusiastic',
                    },
                  })
                }
                className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none"
              >
                <option value="professional">PROFESSIONAL</option>
                <option value="casual">CASUAL</option>
                <option value="enthusiastic">ENTHUSIASTIC</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-retro text-muted-foreground block mb-2">LENGTH</label>
              <select
                value={profile.preferences.length}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      length: e.target.value as 'short' | 'medium' | 'long',
                    },
                  })
                }
                className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none"
              >
                <option value="short">SHORT</option>
                <option value="medium">MEDIUM</option>
                <option value="long">LONG</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-retro text-muted-foreground block mb-2">CUSTOM INSTRUCTIONS</label>
            <textarea
              value={profile.preferences.customInstructions}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    customInstructions: e.target.value,
                  },
                })
              }
              placeholder="Special instructions..."
              rows={2}
              className="w-full px-3 py-2 border-2 border-foreground bg-background text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-4">
        {saveSuccess && (
          <span className="text-sm text-[#6bcb77] font-retro">SAVED!</span>
        )}
        <button
          type="submit"
          disabled={isSaving}
          className="retro-btn px-6 py-2 bg-primary text-primary-foreground font-retro text-xs disabled:opacity-50"
        >
          {isSaving ? 'SAVING...' : 'SAVE PROFILE'}
        </button>
      </div>
    </form>
  );
}
