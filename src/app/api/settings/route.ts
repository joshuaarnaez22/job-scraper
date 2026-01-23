/**
 * Settings API
 * GET /api/settings - Get search configuration
 * PUT /api/settings - Update search configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { defaultSearchConfig } from '@/config/search';

export async function GET() {
  try {
    let config = await prisma.searchConfig.findUnique({
      where: { id: 'default' },
    });

    // If no config exists, create one with defaults
    if (!config) {
      config = await prisma.searchConfig.create({
        data: {
          id: 'default',
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
        },
      });
    }

    // Parse JSON fields
    return NextResponse.json({
      ...config,
      keywords: JSON.parse(config.keywords),
      excludeKeywords: JSON.parse(config.excludeKeywords),
      enabledSites: JSON.parse(config.enabledSites),
      jobTypes: JSON.parse(config.jobTypes),
      experienceLevels: JSON.parse(config.experienceLevels),
      workArrangements: JSON.parse(config.workArrangements),
      excludeCompanies: JSON.parse(config.excludeCompanies),
      requiredSkills: JSON.parse(config.requiredSkills),
      preferredSkills: JSON.parse(config.preferredSkills),
    });
  } catch (error) {
    console.error('[API] Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Stringify JSON fields
    const data: Record<string, unknown> = {};

    const jsonFields = [
      'keywords',
      'excludeKeywords',
      'enabledSites',
      'jobTypes',
      'experienceLevels',
      'workArrangements',
      'excludeCompanies',
      'requiredSkills',
      'preferredSkills',
    ];

    const scalarFields = [
      'daysPosted',
      'salaryMin',
      'salaryMax',
      'salaryCurrency',
      'useAIMatching',
      'aiThreshold',
      'digestMode',
      'maxEmailsPerRun',
    ];

    for (const field of jsonFields) {
      if (body[field] !== undefined) {
        data[field] = JSON.stringify(body[field]);
      }
    }

    for (const field of scalarFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    const config = await prisma.searchConfig.upsert({
      where: { id: 'default' },
      update: data,
      create: {
        id: 'default',
        keywords: JSON.stringify(body.keywords || defaultSearchConfig.keywords),
        excludeKeywords: JSON.stringify(body.excludeKeywords || defaultSearchConfig.excludeKeywords),
        enabledSites: JSON.stringify(body.enabledSites || defaultSearchConfig.enabledSites),
        daysPosted: body.daysPosted ?? defaultSearchConfig.daysPosted,
        salaryMin: body.salaryMin ?? defaultSearchConfig.salaryMin,
        salaryMax: body.salaryMax ?? defaultSearchConfig.salaryMax,
        salaryCurrency: body.salaryCurrency || defaultSearchConfig.salaryCurrency,
        jobTypes: JSON.stringify(body.jobTypes || defaultSearchConfig.jobTypes),
        experienceLevels: JSON.stringify(body.experienceLevels || defaultSearchConfig.experienceLevels),
        workArrangements: JSON.stringify(body.workArrangements || defaultSearchConfig.workArrangements),
        excludeCompanies: JSON.stringify(body.excludeCompanies || defaultSearchConfig.excludeCompanies),
        requiredSkills: JSON.stringify(body.requiredSkills || defaultSearchConfig.requiredSkills),
        preferredSkills: JSON.stringify(body.preferredSkills || defaultSearchConfig.preferredSkills),
        useAIMatching: body.useAIMatching ?? defaultSearchConfig.useAIMatching,
        aiThreshold: body.aiThreshold ?? defaultSearchConfig.aiMatchThreshold,
        digestMode: body.digestMode ?? defaultSearchConfig.digestMode,
        maxEmailsPerRun: body.maxEmailsPerRun ?? defaultSearchConfig.maxEmailsPerRun,
      },
    });

    // Parse JSON fields for response
    return NextResponse.json({
      ...config,
      keywords: JSON.parse(config.keywords),
      excludeKeywords: JSON.parse(config.excludeKeywords),
      enabledSites: JSON.parse(config.enabledSites),
      jobTypes: JSON.parse(config.jobTypes),
      experienceLevels: JSON.parse(config.experienceLevels),
      workArrangements: JSON.parse(config.workArrangements),
      excludeCompanies: JSON.parse(config.excludeCompanies),
      requiredSkills: JSON.parse(config.requiredSkills),
      preferredSkills: JSON.parse(config.preferredSkills),
    });
  } catch (error) {
    console.error('[API] Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
