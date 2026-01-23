/**
 * AI Integration
 * OpenAI-powered job matching and cover letter generation
 */

import OpenAI from 'openai';
import type { Job } from './scrapers/base';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ===========================================
// Job Matching
// ===========================================

export interface MatchingConfig {
  keywords: string[];
  preferredSkills: string[];
  excludeKeywords: string[];
  customCriteria?: string;
}

export interface JobScore {
  score: number;      // 0-1 relevance score
  summary: string;    // Brief summary of the job
  reasons: string[];  // Why it matched/didn't match
}

/**
 * Score a job's relevance using OpenAI
 */
export async function scoreJobRelevance(
  job: Job,
  config: MatchingConfig
): Promise<JobScore> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      score: 0,
      summary: '',
      reasons: ['OpenAI API key not configured'],
    };
  }

  const prompt = `
Analyze this job listing and score its relevance (0-1) for a candidate.

JOB:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description || 'No description provided'}
Salary: ${job.salary || 'Not specified'}
Type: ${job.jobType || 'Not specified'}
Arrangement: ${job.workArrangement || 'Not specified'}

CANDIDATE PREFERENCES:
Keywords: ${config.keywords.join(', ')}
Preferred Skills: ${config.preferredSkills.join(', ')}
Exclude if contains: ${config.excludeKeywords.join(', ')}
${config.customCriteria ? `Additional criteria: ${config.customCriteria}` : ''}

Respond in JSON format:
{
  "score": 0.0-1.0,
  "summary": "2-3 sentence summary of the job",
  "reasons": ["reason1", "reason2"]
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const result = JSON.parse(content) as JobScore;
    return {
      score: Math.max(0, Math.min(1, result.score)),
      summary: result.summary || '',
      reasons: result.reasons || [],
    };
  } catch (error) {
    console.error('[AI] Error scoring job:', error);
    return {
      score: 0,
      summary: '',
      reasons: [`Error: ${error instanceof Error ? error.message : 'Unknown error'}`],
    };
  }
}

/**
 * Batch score multiple jobs
 */
export async function scoreJobs(
  jobs: Job[],
  config: MatchingConfig,
  onProgress?: (completed: number, total: number) => void
): Promise<Map<string, JobScore>> {
  const results = new Map<string, JobScore>();

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const score = await scoreJobRelevance(job, config);
    results.set(job.externalId, score);

    if (onProgress) {
      onProgress(i + 1, jobs.length);
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  return results;
}

// ===========================================
// Cover Letter Generation
// ===========================================

export interface UserProfile {
  name: string;
  title?: string;
  summary?: string;
  skills: string[];
  experience: WorkExperience[];
  education?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  preferences: CoverLetterPreferences;
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface CoverLetterPreferences {
  tone: 'professional' | 'casual' | 'enthusiastic';
  length: 'short' | 'medium' | 'long';
  customInstructions?: string;
}

/**
 * Generate a tailored cover letter for a job
 */
export async function generateCoverLetter(
  job: Job,
  profile: UserProfile
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const lengthGuide = {
    short: '150-200 words',
    medium: '250-350 words',
    long: '400-500 words',
  };

  const toneGuide = {
    professional: 'formal and business-like',
    casual: 'friendly but professional',
    enthusiastic: 'energetic and passionate',
  };

  const experienceText = profile.experience
    .map((exp) => `
      - ${exp.role} at ${exp.company} (${exp.duration})
        ${exp.highlights.map((h) => `• ${h}`).join('\n        ')}
    `)
    .join('\n');

  const prompt = `
Generate a personalized cover letter/application email for this job.

JOB DETAILS:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description || 'No description available'}
${job.salary ? `Salary: ${job.salary}` : ''}
${job.skills?.length ? `Required Skills: ${job.skills.join(', ')}` : ''}

CANDIDATE PROFILE:
Name: ${profile.name}
${profile.title ? `Current Title: ${profile.title}` : ''}
${profile.summary ? `Summary: ${profile.summary}` : ''}
Skills: ${profile.skills.join(', ')}

Work Experience:
${experienceText}

${profile.education ? `Education: ${profile.education}` : ''}
${profile.portfolioUrl ? `Portfolio: ${profile.portfolioUrl}` : ''}
${profile.linkedinUrl ? `LinkedIn: ${profile.linkedinUrl}` : ''}

PREFERENCES:
- Tone: ${toneGuide[profile.preferences.tone]}
- Length: ${lengthGuide[profile.preferences.length]}
${profile.preferences.customInstructions ? `- Additional instructions: ${profile.preferences.customInstructions}` : ''}

Write a compelling, personalized cover letter that:
1. Opens with a strong hook mentioning the specific role and company
2. Highlights 2-3 most relevant experiences/skills that match the job
3. Shows genuine interest in the company/role
4. Includes a clear call to action
5. Maintains the requested tone throughout

Do not use generic phrases like "I am writing to express my interest" or "I believe I would be a great fit".
Make it specific to this job and candidate.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return content.trim();
  } catch (error) {
    console.error('[AI] Error generating cover letter:', error);
    throw error;
  }
}

/**
 * Improve an existing cover letter
 */
export async function improveCoverLetter(
  currentLetter: string,
  feedback: string
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
Improve this cover letter based on the feedback provided.

CURRENT COVER LETTER:
${currentLetter}

FEEDBACK/CHANGES REQUESTED:
${feedback}

Rewrite the cover letter incorporating the feedback while maintaining the overall structure and tone.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return content.trim();
  } catch (error) {
    console.error('[AI] Error improving cover letter:', error);
    throw error;
  }
}
