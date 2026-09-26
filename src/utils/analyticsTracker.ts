import { CtaActionType, CtaLogEntry, RecruiterAnalyticsState } from '../types';

const STORAGE_KEY = 'rkr_recruiter_analytics';

const INITIAL_STATE: RecruiterAnalyticsState = {
  totalClicks: 0,
  byType: {
    schedule: 0,
    resume: 0,
    contact: 0,
    email: 0,
    phone: 0,
    project: 0,
    metric: 0,
    social: 0,
  },
  events: [],
  lastUpdated: Date.now(),
};

/**
 * Retrieves the stored recruiter analytics state from localStorage safely.
 */
export function getStoredAnalytics(): RecruiterAnalyticsState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      totalClicks: typeof parsed.totalClicks === 'number' ? parsed.totalClicks : 0,
      byType: {
        schedule: parsed.byType?.schedule || 0,
        resume: parsed.byType?.resume || 0,
        contact: parsed.byType?.contact || 0,
        email: parsed.byType?.email || 0,
        phone: parsed.byType?.phone || 0,
        project: parsed.byType?.project || 0,
        metric: parsed.byType?.metric || 0,
        social: parsed.byType?.social || 0,
      },
      events: Array.isArray(parsed.events) ? parsed.events : [],
      lastUpdated: parsed.lastUpdated || Date.now(),
    };
  } catch {
    return INITIAL_STATE;
  }
}

/**
 * Records a CTA click, persists it in localStorage, and broadcasts an update event.
 */
export function recordCtaClick(type: CtaActionType, label: string): RecruiterAnalyticsState {
  if (typeof window === 'undefined') return INITIAL_STATE;

  const current = getStoredAnalytics();
  const newEvent: CtaLogEntry = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type,
    label,
    timestamp: Date.now(),
  };

  const updatedState: RecruiterAnalyticsState = {
    totalClicks: current.totalClicks + 1,
    byType: {
      ...current.byType,
      [type]: (current.byType[type] || 0) + 1,
    },
    // Keep the most recent 40 events to prevent unbounded growth
    events: [newEvent, ...current.events].slice(0, 40),
    lastUpdated: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    // Dispatch custom event for real-time reactivity across components
    window.dispatchEvent(
      new CustomEvent('rkr_cta_tracked', {
        detail: {
          state: updatedState,
          lastEvent: newEvent,
        },
      })
    );
  } catch (err) {
    console.warn('Failed to save recruiter analytics to localStorage', err);
  }

  return updatedState;
}

/**
 * Resets the stored analytics to zero.
 */
export function resetStoredAnalytics(): RecruiterAnalyticsState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent('rkr_cta_tracked', {
        detail: {
          state: INITIAL_STATE,
        },
      })
    );
  } catch (err) {
    console.warn('Failed to reset recruiter analytics', err);
  }
  return INITIAL_STATE;
}

export interface RecruiterInterestTier {
  level: 'Passive' | 'Exploring' | 'High Intent' | 'Professional Shortlist';
  badgeTitle: string;
  badgePillText: string;
  dotColor: string;
  badgeBorderColor: string;
  badgeBgColor: string;
  textColor: string;
  description: string;
}

/**
 * Derives recruiter engagement tier and visual styling based on recorded CTA clicks.
 */
export function computeRecruiterInterestTier(state: RecruiterAnalyticsState): RecruiterInterestTier {
  const count = state.totalClicks;
  // Key high-intent conversions: schedule + resume + contact
  const highIntentClicks = (state.byType.schedule || 0) + (state.byType.resume || 0) + (state.byType.contact || 0);

  if (count >= 5 || highIntentClicks >= 3) {
    return {
      level: 'Professional Shortlist',
      badgeTitle: 'Professional Shortlist Intent',
      badgePillText: `Shortlist Intent (${count} CTAs)`,
      dotColor: 'bg-[#4edea3]',
      badgeBorderColor: 'border-[#10b981]/50 hover:border-[#10b981]',
      badgeBgColor: 'bg-[#10b981]/10',
      textColor: 'text-[#4edea3]',
      description: 'Multiple high-conversion inquiries logged (Schedule / Resume / Contact).',
    };
  }

  if (count >= 3 || highIntentClicks >= 2) {
    return {
      level: 'High Intent',
      badgeTitle: 'High Recruiter Intent',
      badgePillText: `High Intent (${count} CTAs)`,
      dotColor: 'bg-amber-400',
      badgeBorderColor: 'border-amber-500/50 hover:border-amber-400',
      badgeBgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      description: 'Significant interest detected with direct scheduling or credential verification.',
    };
  }

  if (count >= 1) {
    return {
      level: 'Exploring',
      badgeTitle: 'Active Exploration',
      badgePillText: `Active Interest (${count} CTA${count > 1 ? 's' : ''})`,
      dotColor: 'bg-[#7bd0ff]',
      badgeBorderColor: 'border-[#2563eb]/50 hover:border-[#7bd0ff]',
      badgeBgColor: 'bg-[#2563eb]/10',
      textColor: 'text-[#7bd0ff]',
      description: 'Recruiter engaged with portfolio discovery actions.',
    };
  }

  return {
    level: 'Passive',
    badgeTitle: 'Passive Evaluation',
    badgePillText: 'Recruiter Interest: Active',
    dotColor: 'bg-[#64748b]',
    badgeBorderColor: 'border-[#222a3d] hover:border-[#334155]',
    badgeBgColor: 'bg-[#131b2e]',
    textColor: 'text-[#8d90a0]',
    description: 'Awaiting primary call-to-action interactions.',
  };
}
