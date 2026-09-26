import { useState, useEffect } from 'react';
import { ArrowUp, Linkedin, Github, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { getSocialLinks, SocialLinks } from '../utils/socialsManager';
import { recordCtaClick } from '../utils/analyticsTracker';

export default function Footer() {
  const [socials, setSocials] = useState<SocialLinks>(getSocialLinks);

  useEffect(() => {
    const handleSocialsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ socials: SocialLinks }>;
      if (customEvent.detail?.socials) {
        setSocials(customEvent.detail.socials);
      }
    };
    window.addEventListener('rkr_socials_updated', handleSocialsUpdate);
    return () => window.removeEventListener('rkr_socials_updated', handleSocialsUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1e293b] bg-[#0b1326] py-8 text-xs text-[#8d90a0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Signature */}
          <div className="flex flex-col text-center md:text-left">
            <span className="font-heading font-bold text-sm text-white tracking-wide">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[#8d90a0] text-[11px] mt-0.5">
              Commercial & Business Analyst | Pharmaceutical Commercial Operations Leader
            </span>
          </div>

          {/* Social Profiles Center/Right & Direct Resume Download */}
          <div className="flex flex-wrap items-center gap-2" id="footer-social-links">
            <a
              href="/Ranjeet_Kumar_Rajani_Resume.pdf"
              download="Ranjeet_Kumar_Rajani_Resume.pdf"
              onClick={() => recordCtaClick('resume', 'Footer: Direct PDF Download')}
              id="footer-download-resume-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all text-[11px] font-semibold shadow-sm cursor-pointer"
              title="Download official resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin-link"
              onClick={() => recordCtaClick('social', 'Footer: Visited LinkedIn Profile')}
              title="View LinkedIn Profile (opens in new tab)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131b2e] border border-[#222a3d] hover:border-[#2563eb] hover:bg-[#1e293b] text-[#7bd0ff] hover:text-white transition-all text-[11px] font-mono"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github-link"
              onClick={() => recordCtaClick('social', 'Footer: Visited GitHub Profile')}
              title="View GitHub Repositories (opens in new tab)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131b2e] border border-[#222a3d] hover:border-[#2563eb] hover:bg-[#1e293b] text-[#dae2fd] hover:text-white transition-all text-[11px] font-mono"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={socials.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-kaggle-link"
              onClick={() => recordCtaClick('social', 'Footer: Visited Kaggle Profile')}
              title="View Kaggle Datasets & Notebooks (opens in new tab)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131b2e] border border-[#222a3d] hover:border-[#38bdf8] hover:bg-[#1e293b] text-[#38bdf8] hover:text-white transition-all text-[11px] font-mono"
            >
              <span className="font-bold italic text-xs">k</span>
              <span>Kaggle</span>
            </a>
          </div>
        </div>

        {/* Bottom Utility Bar: Copyright + Back to Top */}
        <div className="pt-4 border-t border-[#1e293b]/60 flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#64748b]">
            © {new Date().getFullYear()} RANJEET KUMAR RAJANI
          </span>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded bg-[#131b2e] border border-[#222a3d] hover:border-[#2563eb] text-[#dae2fd] hover:text-white flex items-center justify-center transition-colors"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
