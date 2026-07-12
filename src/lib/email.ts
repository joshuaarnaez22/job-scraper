/**
 * Email Notification System
 * Sends job alerts using Resend
 */

import { Resend } from 'resend';
import type { Job } from './scrapers/base';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface JobAlertOptions {
  jobs: Job[];
  to?: string;
  digestMode?: boolean;
  maxEmails?: number;
}

/**
 * Send a job alert email
 */
export async function sendJobAlert(options: JobAlertOptions): Promise<void> {
  const { jobs, digestMode = true, maxEmails = 10 } = options;
  const to = options.to || process.env.NOTIFICATION_EMAIL;

  if (!to) {
    console.warn('[Email] No recipient (NOTIFICATION_EMAIL / user email), skipping');
    return;
  }

  if (jobs.length === 0) {
    console.log('[Email] No jobs to send');
    return;
  }

  if (digestMode) {
    // Send all jobs in one email
    const limitedJobs = jobs.slice(0, maxEmails);
    await sendEmail({
      to,
      subject: `🔔 ${limitedJobs.length} New Job${limitedJobs.length > 1 ? 's' : ''} Found`,
      html: formatDigestEmail(limitedJobs),
    });
  } else {
    // Send individual emails (limited)
    const limitedJobs = jobs.slice(0, maxEmails);
    for (const job of limitedJobs) {
      await sendEmail({
        to,
        subject: `🔔 New Job: ${job.title} at ${job.company}`,
        html: formatSingleJobEmail(job),
      });
    }
  }
}

/**
 * Send an email via Resend
 */
async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const result = await resend.emails.send({
      from: 'JobScout <notifications@resend.dev>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (result.error) {
      console.warn('[Email] Resend rejected send:', result.error.message);
      return;
    }

    console.log('[Email] Sent:', result.data?.id ?? result);
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    // Don't fail the scrape pipeline on email errors
  }
}

/**
 * Format a digest email with multiple jobs
 */
function formatDigestEmail(jobs: Job[]): string {
  const jobCards = jobs.map(formatJobCard).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Jobs Found</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1a1a1a; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
        🔔 ${jobs.length} New Job${jobs.length > 1 ? 's' : ''} Found
      </h1>

      <p style="color: #666;">
        Here are the latest job listings matching your criteria:
      </p>

      ${jobCards}

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

      <p style="color: #999; font-size: 12px;">
        You're receiving this because you set up job alerts.
        <br>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #0066cc;">View all jobs in dashboard</a>
      </p>
    </body>
    </html>
  `;
}

/**
 * Format a single job email
 */
function formatSingleJobEmail(job: Job): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job: ${job.title}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1a1a1a;">
        🔔 New Job Match
      </h1>

      ${formatJobCard(job)}

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

      <p style="color: #999; font-size: 12px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #0066cc;">View all jobs in dashboard</a>
      </p>
    </body>
    </html>
  `;
}

/**
 * Format a single job card for emails
 */
function formatJobCard(job: Job): string {
  const salaryText = job.salary || 'Salary not listed';
  const aiScoreText = job.aiScore
    ? `<span style="background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 4px; font-size: 12px;">AI Match: ${Math.round(job.aiScore * 100)}%</span>`
    : '';

  const tags = [
    job.site,
    job.jobType,
    job.workArrangement,
    job.experienceLevel,
  ]
    .filter(Boolean)
    .map((tag) => `<span style="background: #f0f0f0; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 4px;">${tag}</span>`)
    .join('');

  const description = job.description
    ? `<p style="color: #666; font-size: 14px; margin: 10px 0;">${truncate(job.description, 200)}</p>`
    : '';

  return `
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 15px 0; background: #fff;">
      <h3 style="margin: 0 0 5px 0;">
        <a href="${job.url}" style="color: #0066cc; text-decoration: none;">${job.title}</a>
      </h3>

      <p style="margin: 5px 0; color: #333;">
        <strong>${job.company}</strong>
        ${job.location ? `• ${job.location}` : ''}
      </p>

      <p style="margin: 10px 0; color: #2e7d32; font-weight: 500;">
        ${salaryText}
      </p>

      ${description}

      <div style="margin-top: 15px;">
        ${tags}
        ${aiScoreText}
      </div>

      <div style="margin-top: 15px;">
        <a href="${job.url}" style="display: inline-block; background: #0066cc; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 14px;">
          View Job →
        </a>
      </div>
    </div>
  `;
}

/**
 * Truncate text to specified length
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Send a test email to verify configuration
 */
export async function sendTestEmail(): Promise<boolean> {
  const to = process.env.NOTIFICATION_EMAIL;

  if (!to) {
    console.error('[Email] NOTIFICATION_EMAIL not set');
    return false;
  }

  try {
    await sendEmail({
      to,
      subject: '✅ Job Scraper Email Test',
      html: `
        <h1>Email Configuration Working!</h1>
        <p>Your job scraper email notifications are set up correctly.</p>
        <p>You'll receive alerts when new matching jobs are found.</p>
      `,
    });
    return true;
  } catch {
    return false;
  }
}
