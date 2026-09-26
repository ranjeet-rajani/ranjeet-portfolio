import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Briefcase,
  Award,
  Cpu,
  GraduationCap,
  Send,
  Download,
  Printer,
  Menu,
  X,
  User,
  Sun,
  Moon,
  Linkedin,
  Github,
  Calendar,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { recordCtaClick } from '../utils/analyticsTracker';
import { getSocialLinks, SocialLinks } from '../utils/socialsManager';

interface NavbarProps {
  avatarUrl: string;
  theme: ThemeMode;
  onToggleTheme: (newTheme?: ThemeMode) => void;
  onOpenResume: () => void;
  onOpenSchedule: () => void;
  onOpenProfilePhoto?: () => void;
}

export default function Navbar({
  avatarUrl,
  theme,
  onToggleTheme,
  onOpenResume,
  onOpenSchedule,
  onOpenProfilePhoto,
}: NavbarProps) {
  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin=true');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [socials, setSocials] = useState<SocialLinks>(getSocialLinks);
  const navScrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['overview', 'metrics', 'projects', 'experience', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure active pill is always visible in the horizontal navigator ribbon on mobile/tablets
  useEffect(() => {
    if (navScrollRef.current) {
      const activeEl = navScrollRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
      if (activeEl) {
        const container = navScrollRef.current;
        const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  const navLinks = [
    { label: 'Overview', href: '#overview', id: 'overview', icon: LayoutDashboard, badge: 'Profile' },
    { label: 'Key Metrics', href: '#metrics', id: 'metrics', icon: BarChart3, badge: 'Impact' },
    { label: 'Featured Projects', href: '#projects', id: 'projects', icon: Briefcase, badge: 'Case Studies' },
    { label: 'Leadership & Experience', href: '#experience', id: 'experience', icon: Award, badge: 'Career' },
    { label: 'Skills & Tools', href: '#skills', id: 'skills', icon: Cpu, badge: 'Competencies' },
    { label: 'Education', href: '#education', id: 'education', icon: GraduationCap, badge: 'Credentials' },
    { label: 'Contact', href: '#contact', id: 'contact', icon: Send, badge: 'Discovery' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeader = document.getElementById('main-nav-header');
      const headerHeight = navHeader ? navHeader.getBoundingClientRect().height : 100;
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
      setActiveSection(targetId);
      recordCtaClick('project', `Jump to ${targetId}`);
    }
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0b1326]/95 backdrop-blur-md border-b border-[#1e293b] shadow-xl shadow-black/40'
          : 'bg-[#0b1326]/85 backdrop-blur-sm border-b border-[#1e293b]/60'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12">
        {/* Row 1: Brand & Top Utilities */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo & Name */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#overview');
            }}
            className="flex items-center gap-3 group text-left focus:outline-none"
            id="brand-logo-link"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#131b2e] border border-[#2563eb]/40 flex items-center justify-center font-mono font-bold text-xs tracking-wider text-[#7bd0ff] shadow-[0_0_12px_rgba(37,99,235,0.25)] group-hover:border-[#2563eb] transition-colors shrink-0">
              {PERSONAL_INFO.initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-white uppercase group-hover:text-[#b4c5ff] transition-colors truncate">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#8d90a0] uppercase truncate">
                {PERSONAL_INFO.tagline}
              </span>
            </div>
          </a>

          {/* Header Controls: Quick CTAs & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3" id="header-controls">
            {/* Desktop Direct Download Resume Button */}
            <a
              href="/Ranjeet_Kumar_Rajani_Resume.pdf"
              download="Ranjeet_Kumar_Rajani_Resume.pdf"
              onClick={() => recordCtaClick('resume', 'Direct PDF Download (Navbar Desktop)')}
              id="header-download-resume-btn"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors cursor-pointer shadow-sm"
              title="Download official resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            {/* Quick Action Email Contact Link */}
            <a
              href="mailto:ranjeetkumarrajanii@gmail.com?subject=Commercial%20Analytics%20Inquiry%20%E2%80%94%20Ranjeet%20Kumar%20Rajani"
              onClick={() => recordCtaClick('schedule', 'Clicked Header Contact/Schedule')}
              id="header-schedule-call-btn"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold text-[#4edea3] bg-[#00a572]/10 border border-[#00a572]/40 hover:bg-[#00a572]/20 hover:border-[#00a572] transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span>Contact / Schedule</span>
            </a>

            {/* Theme Switcher */}
            <button
              type="button"
              onClick={() => onToggleTheme()}
              id="header-theme-toggle-btn"
              title={theme === 'dark' ? 'Switch to Financial White Mode' : 'Switch to Dark Mode'}
              className="p-1.5 sm:p-2 rounded-md bg-[#171f33] border border-[#334155] hover:border-[#64748b] text-[#dae2fd] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#eab308]" />
              ) : (
                <Moon className="w-4 h-4 text-[#2563eb]" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="xl:hidden p-1.5 sm:p-2 text-[#dae2fd] hover:text-white hover:bg-[#171f33] rounded border border-[#334155] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Row 2: Always-Visible Top Section Navigator Ribbon */}
        <div className="py-2 border-t border-[#1e293b]/60 flex items-center gap-2 sm:gap-3" id="top-section-navigator-container">
          <nav
            id="top-section-navigator"
            ref={navScrollRef}
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 w-full"
            aria-label="Section Jump Navigator"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  data-section={link.id}
                  onClick={() => handleNavClick(link.href)}
                  id={`jump-nav-${link.id}`}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#2563eb] text-white shadow-[0_0_14px_rgba(37,99,235,0.4)] border border-[#3b82f6]'
                      : 'bg-[#131b2e] hover:bg-[#1a2744] text-[#c3c6d7] hover:text-white border border-[#222a3d] hover:border-[#3b82f6]/50'
                  }`}
                  title={`Jump to ${link.label}`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#7bd0ff]'}`} />
                  <span className="whitespace-nowrap tracking-tight font-medium">{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0b1326] border-b border-[#1e293b] px-4 py-4 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Mobile Theme Switcher Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#131b2e] border border-[#1e293b] mb-2">
            <div className="flex items-center gap-2">
              {theme === 'financial-white' ? (
                <Sun className="w-4 h-4 text-[#eab308]" />
              ) : (
                <Moon className="w-4 h-4 text-[#7bd0ff]" />
              )}
              <span className="text-xs font-mono text-[#dae2fd]">
                {theme === 'financial-white' ? 'Financial White' : 'Professional Dark'}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#0b1326] p-0.5 rounded-md border border-[#334155]">
              <button
                type="button"
                onClick={() => onToggleTheme('dark')}
                className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                  theme === 'dark' ? 'bg-[#2563eb] text-white font-bold' : 'text-[#8d90a0]'
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => onToggleTheme('financial-white')}
                className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                  theme === 'financial-white' ? 'bg-white text-[#0f172a] font-bold shadow-xs' : 'text-[#8d90a0]'
                }`}
              >
                Financial White
              </button>
            </div>
          </div>

          {/* Mobile Profile Card */}
          <div
            onClick={() => {
              if (isAdmin) {
                setMobileMenuOpen(false);
                onOpenProfilePhoto?.();
              }
            }}
            className={`flex items-center gap-3 p-2.5 rounded-lg bg-[#131b2e] border border-[#2563eb]/30 mb-2 ${
              isAdmin ? 'cursor-pointer hover:border-[#2563eb]' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#2563eb]/50 bg-[#060e20] shrink-0">
              {!avatarLoadError ? (
                <img
                  src={avatarUrl}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <User className="w-5 h-5 m-auto text-[#7bd0ff]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate font-heading">{PERSONAL_INFO.name}</div>
              <div className="text-[10px] text-[#7bd0ff] font-mono truncate">
                {isAdmin ? 'Tap to view / change photo' : PERSONAL_INFO.title}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className={`w-full text-left px-3 py-2 text-sm rounded ${
                  activeSection === link.id
                    ? 'text-white bg-[#171f33] font-semibold border-l-2 border-[#2563eb]'
                    : 'text-[#c3c6d7] hover:bg-[#131b2e]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1e293b] flex flex-col gap-2">
            {/* Social Links Row */}
            <div className="flex items-center justify-center gap-2 pb-1" id="mobile-social-links">
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  recordCtaClick('social', 'MobileNav: Visited LinkedIn Profile');
                }}
                className="flex-1 py-1.5 px-2 bg-[#171f33] border border-[#222a3d] rounded text-center text-xs font-mono text-[#7bd0ff] hover:text-white flex items-center justify-center gap-1"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  recordCtaClick('social', 'MobileNav: Visited GitHub Profile');
                }}
                className="flex-1 py-1.5 px-2 bg-[#171f33] border border-[#222a3d] rounded text-center text-xs font-mono text-[#dae2fd] hover:text-white flex items-center justify-center gap-1"
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={socials.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  recordCtaClick('social', 'MobileNav: Visited Kaggle Profile');
                }}
                className="flex-1 py-1.5 px-2 bg-[#171f33] border border-[#222a3d] rounded text-center text-xs font-mono text-[#38bdf8] hover:text-white flex items-center justify-center gap-1"
                title="Kaggle Profile"
              >
                <span className="font-bold italic text-xs">k</span>
                <span>Kaggle</span>
              </a>
            </div>

            <a
              href="/Ranjeet_Kumar_Rajani_Resume.pdf"
              download="Ranjeet_Kumar_Rajani_Resume.pdf"
              onClick={() => {
                setMobileMenuOpen(false);
                recordCtaClick('resume', 'Direct PDF Download (Navbar Mobile)');
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-[#2563eb] rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2 text-xs font-mono text-[#c3c6d7] bg-[#171f33] border border-[#334155] rounded flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#7bd0ff]" />
              <span>Preview / Print Resume</span>
            </button>
            <a
              href="mailto:ranjeetkumarrajanii@gmail.com?subject=Commercial%20Analytics%20Inquiry%20%E2%80%94%20Ranjeet%20Kumar%20Rajani"
              onClick={() => {
                setMobileMenuOpen(false);
                recordCtaClick('schedule', 'Clicked Mobile Contact/Schedule');
              }}
              className="w-full py-2 text-xs font-semibold text-[#4edea3] border border-[#00a572] bg-[#00a572]/10 rounded flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#4edea3]" />
              <span>Contact / Schedule Call</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
