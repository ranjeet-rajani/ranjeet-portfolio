export interface SocialLinks {
  linkedin: string;
  github: string;
  kaggle: string;
}

export const DEFAULT_SOCIALS: SocialLinks = {
  linkedin: "https://www.linkedin.com/in/ranjeet-rajani/",
  github: "https://github.com/ranjeet-rajani",
  kaggle: "https://www.kaggle.com/ranjeetkumarrajani"
};

const SOCIALS_STORAGE_KEY = 'rkr_social_links';

/**
 * Retrieves the current social links from localStorage or defaults.
 */
export function getSocialLinks(): SocialLinks {
  if (typeof window === 'undefined') return DEFAULT_SOCIALS;
  try {
    const raw = localStorage.getItem(SOCIALS_STORAGE_KEY);
    if (!raw) return DEFAULT_SOCIALS;
    const parsed = JSON.parse(raw);
    return {
      linkedin: parsed.linkedin?.trim() || DEFAULT_SOCIALS.linkedin,
      github: parsed.github?.trim() || DEFAULT_SOCIALS.github,
      kaggle: parsed.kaggle?.trim() || DEFAULT_SOCIALS.kaggle,
    };
  } catch {
    return DEFAULT_SOCIALS;
  }
}

/**
 * Saves updated social links and dispatches a change event.
 */
export function saveSocialLinks(links: Partial<SocialLinks>): SocialLinks {
  const current = getSocialLinks();
  const updated: SocialLinks = {
    linkedin: links.linkedin ? links.linkedin.trim() : current.linkedin,
    github: links.github ? links.github.trim() : current.github,
    kaggle: links.kaggle ? links.kaggle.trim() : current.kaggle,
  };

  try {
    localStorage.setItem(SOCIALS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('rkr_socials_updated', {
        detail: { socials: updated }
      })
    );
  } catch (e) {
    console.warn('Failed to save custom socials to localStorage', e);
  }

  return updated;
}

/**
 * Resets social links back to verified defaults.
 */
export function resetSocialLinks(): SocialLinks {
  try {
    localStorage.removeItem(SOCIALS_STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent('rkr_socials_updated', {
        detail: { socials: DEFAULT_SOCIALS }
      })
    );
  } catch (e) {
    console.warn('Failed to reset socials', e);
  }
  return DEFAULT_SOCIALS;
}
