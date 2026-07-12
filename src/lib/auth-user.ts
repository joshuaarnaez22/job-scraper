/**
 * Sync Clerk user → DB User and seed SearchConfig + UserProfile
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { defaultSearchConfig } from '@/config/search';
import { withServiceRls } from './rls';
import type { User } from '@/generated/prisma';

const emptyPreferences = JSON.stringify({
  tone: 'professional',
  length: 'medium',
  customInstructions: '',
});

function searchConfigFields() {
  return {
    keywords: JSON.stringify(defaultSearchConfig.keywords),
    excludeKeywords: JSON.stringify(defaultSearchConfig.excludeKeywords),
    enabledSites: JSON.stringify(defaultSearchConfig.enabledSites),
    daysPosted: defaultSearchConfig.daysPosted,
    salaryMin: defaultSearchConfig.salaryMin,
    salaryMax: defaultSearchConfig.salaryMax,
    salaryCurrency: defaultSearchConfig.salaryCurrency,
    jobTypes: JSON.stringify(defaultSearchConfig.jobTypes),
    experienceLevels: JSON.stringify(defaultSearchConfig.experienceLevels),
    workArrangements: JSON.stringify(defaultSearchConfig.workArrangements),
    excludeCompanies: JSON.stringify(defaultSearchConfig.excludeCompanies),
    requiredSkills: JSON.stringify(defaultSearchConfig.requiredSkills),
    preferredSkills: JSON.stringify(defaultSearchConfig.preferredSkills),
    useAIMatching: defaultSearchConfig.useAIMatching,
    aiThreshold: defaultSearchConfig.aiMatchThreshold,
    digestMode: defaultSearchConfig.digestMode,
    maxEmailsPerRun: defaultSearchConfig.maxEmailsPerRun,
  };
}

/**
 * Ensure the authenticated Clerk user exists in our DB with defaults.
 * Uses service RLS context so first-time inserts succeed.
 */
export async function ensureCurrentUser(): Promise<User | null> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    `${clerkId}@users.clerk`;

  return withServiceRls(async (tx) => {
    const existing = await tx.user.findUnique({
      where: { clerkId },
      include: { searchConfig: true, profile: true },
    });

    if (existing) {
      if (!existing.searchConfig) {
        await tx.searchConfig.create({
          data: { userId: existing.id, ...searchConfigFields() },
        });
      }
      if (!existing.profile) {
        await tx.userProfile.create({
          data: {
            userId: existing.id,
            name: clerkUser?.fullName || '',
            skills: '[]',
            experience: '[]',
            preferences: emptyPreferences,
          },
        });
      }
      if (existing.email !== email) {
        return tx.user.update({
          where: { id: existing.id },
          data: { email },
        });
      }
      const { searchConfig: _sc, profile: _p, ...user } = existing;
      return user;
    }

    return tx.user.create({
      data: {
        clerkId,
        email,
        plan: 'free',
        searchConfig: { create: searchConfigFields() },
        profile: {
          create: {
            name: clerkUser?.fullName || '',
            skills: '[]',
            experience: '[]',
            preferences: emptyPreferences,
          },
        },
        subscription: {
          create: {
            plan: 'free',
            status: 'inactive',
          },
        },
      },
    });
  });
}

export async function requireCurrentUser(): Promise<User> {
  const user = await ensureCurrentUser();
  if (!user) {
    throw new AuthRequiredError();
  }
  return user;
}

export class AuthRequiredError extends Error {
  constructor() {
    super('Authentication required');
    this.name = 'AuthRequiredError';
  }
}
