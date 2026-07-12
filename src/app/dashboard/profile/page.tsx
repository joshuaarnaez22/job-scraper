'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfileForm, type UserProfileData } from '@/components/ProfileForm';

async function fetchProfile() {
  const response = await fetch('/api/profile');
  return response.json();
}

export default function DashboardProfilePage() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const saveProfileMutation = useMutation({
    mutationFn: async (data: UserProfileData) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <div className="pixel-border bg-card p-4 mb-6">
          <h1 className="font-retro text-lg">{`> PROFILE`}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your profile for cover letters
          </p>
        </div>
        {isLoading && (
          <div className="pixel-border bg-card p-8 text-center font-retro text-xs">
            LOADING…
          </div>
        )}
        {profile && (
          <ProfileForm
            key={`${profile.id || 'new'}-${profile.updatedAt || ''}-${profile.cvUploadedAt || ''}-${profile.name || ''}`}
            initialData={profile}
            onSave={async (data) => {
              await saveProfileMutation.mutateAsync(data);
            }}
          />
        )}
      </div>
    </div>
  );
}
