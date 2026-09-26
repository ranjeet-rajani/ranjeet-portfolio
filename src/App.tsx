import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MetricsSection from './components/MetricsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RecruiterInterestBadge from './components/RecruiterInterestBadge';
import {
  ResumeModal,
  ScheduleModal,
  ProjectDetailModal,
  MetricDetailModal,
  ProfilePhotoModal,
  CertificateModal,
} from './components/Modals';
import { ProjectItem, KpiMetric, ThemeMode } from './types';
import { PERSONAL_INFO } from './data/portfolioData';
import { Check } from 'lucide-react';
import { recordCtaClick } from './utils/analyticsTracker';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [profilePhotoOpen, setProfilePhotoOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<KpiMetric | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenResume = (source = 'Resume Modal') => {
    recordCtaClick('resume', `Resume Viewed / Download (${source})`);
    setResumeOpen(true);
  };

  const handleOpenSchedule = (source = 'Schedule Modal') => {
    recordCtaClick('schedule', `Schedule Inquiry (${source})`);
    setScheduleOpen(true);
  };

  const handleSelectMetric = (metric: KpiMetric) => {
    recordCtaClick('metric', `Audited KPI: ${metric.title}`);
    setSelectedMetric(metric);
  };

  const handleSelectProject = (project: ProjectItem) => {
    recordCtaClick('project', `System Deep-Dive: ${project.title}`);
    setSelectedProject(project);
  };

  // Persistent Theme state ('dark' | 'financial-white')
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem('rkr_theme');
      if (savedTheme === 'financial-white' || savedTheme === 'dark') {
        return savedTheme as ThemeMode;
      }
    } catch {
      // Ignore
    }
    return 'dark';
  });

  // Sync theme attribute and class with documentElement
  useEffect(() => {
    try {
      localStorage.setItem('rkr_theme', theme);
    } catch {
      // Ignore
    }
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'financial-white') {
      document.documentElement.classList.add('financial-white');
    } else {
      document.documentElement.classList.remove('financial-white');
    }
  }, [theme]);

  const handleToggleTheme = (newTheme?: ThemeMode) => {
    const targetTheme: ThemeMode = newTheme || (theme === 'dark' ? 'financial-white' : 'dark');
    setTheme(targetTheme);
    showToast(
      targetTheme === 'financial-white'
        ? 'Financial White mode enabled (Wall Street High-Contrast)'
        : 'Professional Dark mode enabled'
    );
  };

  // Persistent Profile Picture state
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('rkr_profile_avatar');
      if (stored && !stored.includes('unsplash.com')) {
        return stored;
      }
      return PERSONAL_INFO.avatarUrl;
    } catch {
      return PERSONAL_INFO.avatarUrl;
    }
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateAvatar = (newUrl: string) => {
    setAvatarUrl(newUrl);
    try {
      localStorage.setItem('rkr_profile_avatar', newUrl);
    } catch {
      // Ignore localStorage errors (e.g. quota limit on huge images)
    }
    showToast('Profile picture updated successfully!');
  };

  const handleResetAvatar = () => {
    setAvatarUrl(PERSONAL_INFO.avatarUrl);
    try {
      localStorage.removeItem('rkr_profile_avatar');
    } catch {
      // Ignore
    }
    showToast('Profile picture reset to default portrait.');
  };

  return (
    <motion.div
      id="app-root-container"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-body selection:bg-[#2563eb] selection:text-white relative"
    >
      {/* Sticky Navigation Header */}
      <Navbar
        avatarUrl={avatarUrl}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => handleOpenResume('Navigation')}
        onOpenSchedule={() => handleOpenSchedule('Navigation')}
        onOpenProfilePhoto={() => setProfilePhotoOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="w-full">
        {/* Professional Portfolio Dossier Hero */}
        <HeroSection
          avatarUrl={avatarUrl}
          onOpenResume={() => handleOpenResume('Hero Section')}
          onOpenSchedule={() => handleOpenSchedule('Hero Section')}
          onOpenProfilePhoto={() => setProfilePhotoOpen(true)}
          onUpdateAvatar={handleUpdateAvatar}
          onShowToast={showToast}
        />

        {/* Section 1: Audited Operational Impact & Performance Benchmarks */}
        <MetricsSection onSelectMetric={handleSelectMetric} />

        {/* Section 2: Applied Enterprise Systems - Featured Projects */}
        <ProjectsSection onSelectProject={handleSelectProject} />

        {/* Section 3: Leadership Track Record - Commercial Leadership & Milestones */}
        <ExperienceSection />

        {/* Section 4: Technical, ERP & Commercial Competency Matrix */}
        <SkillsSection />

        {/* Section 5: Academic & Professional Verification */}
        <EducationSection onOpenCertificate={() => setCertificateOpen(true)} />

        {/* Section 6: Commercial Leadership & Inquiries */}
        <ContactSection
          avatarUrl={avatarUrl}
          onOpenResume={() => handleOpenResume('Contact Section')}
          onOpenSchedule={() => handleOpenSchedule('Contact Section')}
          onOpenProfilePhoto={() => setProfilePhotoOpen(true)}
          onShowToast={showToast}
        />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Admin-only Recruiter Telemetry (Hidden from visitors) */}
      <RecruiterInterestBadge />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onShowToast={showToast}
      />

      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        onShowToast={showToast}
      />

      <ScheduleModal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        onShowToast={showToast}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <MetricDetailModal
        metric={selectedMetric}
        onClose={() => setSelectedMetric(null)}
      />

      <ProfilePhotoModal
        isOpen={profilePhotoOpen}
        avatarUrl={avatarUrl}
        onClose={() => setProfilePhotoOpen(false)}
        onUpdateAvatar={handleUpdateAvatar}
        onResetAvatar={handleResetAvatar}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] border border-[#2563eb] text-white px-4 py-2.5 rounded shadow-2xl flex items-center gap-2 font-mono text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-4 h-4 rounded-full bg-[#00a572] flex items-center justify-center text-white">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </motion.div>
  );
}
