export interface KpiMetric {
  id: string;
  category: string;
  value: string;
  title: string;
  description: string;
  tags: string[];
  badge?: string;
  iconType: 'growth' | 'percent' | 'team' | 'database';
  details?: {
    methodology: string;
    auditScope: string;
    dataPoints: string[];
    keyDeliverables: string[];
  };
}

export type ProjectCategory = 'all' | 'powerbi' | 'sap';

export interface ProjectItem {
  id: string;
  title: string;
  categoryTag: string;
  platformBadge: string;
  categoryType: 'powerbi' | 'sap';
  highlightMetric: string;
  highlightLabel: string;
  techStack: string[];
  bullets: string[];
  githubUrl?: string;
  caseStudyAvailable: boolean;
  visualType: 'chart' | 'bikeshare' | 'sapFlow';
  deepDive: {
    businessContext: string;
    architectureOverview: string;
    technicalHighlights: string[];
    codeSnippet?: {
      language: string;
      title: string;
      code: string;
    };
    results: string[];
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  duration: string;
  company: string;
  role: string;
  badges: string[];
  bullets: string[];
}

export interface SkillPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'analytics' | 'erp' | 'commercial';
  skills: string[];
  masteryLabel: string;
  masteryValue: string;
  percent: number;
  accentColor: string;
}

export interface EducationItem {
  id: string;
  locationCategory: string;
  degree: string;
  institution: string;
  description: string;
  footerLeft: string;
  footerRight: string;
  iconType: 'grad' | 'cert' | 'trend';
  badgeColor?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export type ThemeMode = 'dark' | 'financial-white';

export type CtaActionType = 'schedule' | 'resume' | 'contact' | 'email' | 'phone' | 'project' | 'metric' | 'social';

export interface CtaLogEntry {
  id: string;
  type: CtaActionType;
  label: string;
  timestamp: number;
}

export interface RecruiterAnalyticsState {
  totalClicks: number;
  byType: {
    schedule: number;
    resume: number;
    contact: number;
    email: number;
    phone: number;
    project: number;
    metric: number;
    social: number;
  };
  events: CtaLogEntry[];
  lastUpdated: number;
}
