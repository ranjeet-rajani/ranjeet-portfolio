import { useState, useRef, useEffect } from 'react';
import { Download, Printer, Mail, Phone, Calendar, MapPin, Briefcase, Check, Copy, Camera, UploadCloud, Maximize2, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { recordCtaClick } from '../utils/analyticsTracker';
import { getSocialLinks, SocialLinks } from '../utils/socialsManager';

interface HeroSectionProps {
  avatarUrl: string;
  onOpenResume: () => void;
  onOpenSchedule: () => void;
  onOpenProfilePhoto: () => void;
  onUpdateAvatar: (newUrl: string) => void;
  onShowToast: (msg: string) => void;
}

export default function HeroSection({
  avatarUrl,
  onOpenResume,
  onOpenSchedule,
  onOpenProfilePhoto,
  onUpdateAvatar,
  onShowToast,
}: HeroSectionProps) {
  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin=true');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [socials, setSocials] = useState<SocialLinks>(getSocialLinks);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    const actionType = label.toLowerCase().includes('email') ? 'email' : 'phone';
    recordCtaClick(actionType, `Copied ${label}`);
    onShowToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        onShowToast('Image size exceeds 5MB limit. Please select a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImgError(false);
          onUpdateAvatar(result);
          onShowToast('Profile picture uploaded and updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="overview" className="pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16 border-b border-[#1e293b]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Operational Status Ribbon */}
        <div
          id="hero-status-ribbon"
          className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] sm:text-xs font-mono tracking-wider text-[#8d90a0] mb-8 pb-4 border-b border-[#1e293b]/50"
        >
          {/* Location Tag */}
          <div className="inline-flex items-center gap-1.5 text-[#c3c6d7]">
            <MapPin className="w-3.5 h-3.5 text-[#7bd0ff]" />
            <span>{PERSONAL_INFO.location}</span>
          </div>

          {/* Competency Domains */}
          <div className="inline-flex items-center gap-1.5 text-[#c3c6d7]">
            <Briefcase className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>{PERSONAL_INFO.domains}</span>
          </div>
        </div>

        {/* Main Dossier Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left / Center Text Column */}
          <div className="lg:col-span-8 xl:col-span-8">
            {/* Dossier Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              <span className="font-mono text-xs font-medium tracking-[0.12em] text-[#7bd0ff] uppercase">
                PROFESSIONAL PORTFOLIO
              </span>
            </div>

            {/* Candidate Name */}
            <h1
              id="professional-candidate-name"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.1] mb-4 font-heading"
            >
              {PERSONAL_INFO.name}
            </h1>

            {/* Strategic Subtitle */}
            <h2
              id="professional-candidate-title"
              className="text-lg sm:text-xl lg:text-[1.375rem] font-semibold text-[#b4c5ff] leading-relaxed mb-6 font-heading"
            >
              {PERSONAL_INFO.title}
            </h2>

            {/* Bio Narrative */}
            <p
              id="professional-candidate-bio"
              className="text-[#c3c6d7] text-base sm:text-lg leading-relaxed max-w-4xl mb-8 font-body font-normal"
            >
              {PERSONAL_INFO.bio}
            </p>

            {/* Action Bar & Quick Contact Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4" id="hero-actions-row">
              {/* Direct Download Resume Button */}
              <a
                href="/Ranjeet_Kumar_Rajani_Resume.pdf"
                download="Ranjeet_Kumar_Rajani_Resume.pdf"
                onClick={() => recordCtaClick('resume', 'Direct PDF Download (Hero)')}
                id="hero-download-resume-btn"
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              {/* View / Print Resume (Secondary Option) */}
              <button
                type="button"
                onClick={onOpenResume}
                id="hero-view-resume-btn"
                className="px-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#c3c6d7] hover:text-white bg-[#171f33] hover:bg-[#1f293d] border border-[#334155] rounded transition-all flex items-center gap-1.5 cursor-pointer"
                title="Preview, print, or copy resume text"
              >
                <Printer className="w-3.5 h-3.5 text-[#7bd0ff]" />
                <span>Preview / Print</span>
              </button>

              {/* Email Pill with Copy & Action */}
              <div className="inline-flex items-center rounded border border-[#334155] bg-[#171f33] hover:border-[#64748b] transition-all">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => recordCtaClick('email', 'Direct Email Link Clicked')}
                  className="px-3.5 py-2.5 text-xs sm:text-sm text-[#dae2fd] hover:text-white flex items-center gap-2"
                  id="hero-email-link"
                >
                  <Mail className="w-3.5 h-3.5 text-[#7bd0ff]" />
                  <span className="font-mono text-xs">{PERSONAL_INFO.email}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="px-2 py-2.5 text-[#8d90a0] hover:text-white border-l border-[#334155]/60 hover:bg-[#222a3d] transition-colors"
                  title="Copy email to clipboard"
                  id="copy-email-btn"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-3.5 h-3.5 text-[#4edea3]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Phone Pill with Copy & Action */}
              <div className="inline-flex items-center rounded border border-[#334155] bg-[#171f33] hover:border-[#64748b] transition-all">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => recordCtaClick('phone', 'Direct Phone Dial Clicked')}
                  className="px-3.5 py-2.5 text-xs sm:text-sm text-[#dae2fd] hover:text-white flex items-center gap-2"
                  id="hero-phone-link"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4edea3]" />
                  <span className="font-mono text-xs">{PERSONAL_INFO.phone}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="px-2 py-2.5 text-[#8d90a0] hover:text-white border-l border-[#334155]/60 hover:bg-[#222a3d] transition-colors"
                  title="Copy phone to clipboard"
                  id="copy-phone-btn"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-[#4edea3]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Social Media Verified Links */}
              <div className="flex items-center gap-1.5" id="hero-social-links">
                {/* LinkedIn */}
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="social-linkedin-btn"
                  onClick={() => recordCtaClick('social', 'Hero: Visited LinkedIn Profile')}
                  title="View LinkedIn Profile (opens in new tab)"
                  className="w-9 h-9 rounded bg-[#171f33] border border-[#334155] hover:border-[#2563eb] hover:bg-[#1d4ed8]/20 text-[#7bd0ff] hover:text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* GitHub */}
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="social-github-btn"
                  onClick={() => recordCtaClick('social', 'Hero: Visited GitHub Profile')}
                  title="View GitHub Repositories (opens in new tab)"
                  className="w-9 h-9 rounded bg-[#171f33] border border-[#334155] hover:border-[#2563eb] hover:bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <Github className="w-4 h-4" />
                </a>

                {/* Kaggle */}
                <a
                  href={socials.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="social-kaggle-btn"
                  onClick={() => recordCtaClick('social', 'Hero: Visited Kaggle Profile')}
                  title="View Kaggle Datasets & Notebooks (opens in new tab)"
                  className="w-9 h-9 rounded bg-[#171f33] border border-[#334155] hover:border-[#20beff] hover:bg-[#20beff]/10 text-[#38bdf8] hover:text-white flex items-center justify-center font-mono text-xs font-black transition-all shadow-xs"
                >
                  <span className="tracking-tighter font-extrabold text-[13px] italic">k</span>
                </a>
              </div>

              {/* Schedule Discovery Call Button */}
              <button
                onClick={onOpenSchedule}
                id="hero-schedule-call-btn"
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#4edea3] border border-[#00a572] bg-[#00a572]/10 hover:bg-[#00a572]/20 rounded shadow-[0_0_16px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-[#4edea3]" />
                <span>Schedule Discovery Call</span>
              </button>
            </div>
          </div>

          {/* Right Column: Professional Portrait & Verified Profile Card */}
          <div className="lg:col-span-4 xl:col-span-4 w-full flex justify-center lg:justify-end">
            <div
              id="hero-professional-portrait-card"
              className="w-full max-w-sm bg-[#0f172a]/95 border border-[#2563eb]/40 rounded-xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative group backdrop-blur-md transition-all duration-300 hover:border-[#2563eb]/70"
            >
              {/* Card Header Status */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-[#4edea3] uppercase font-semibold">
                    PROFILE
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#171f33] text-[#7bd0ff] border border-[#2563eb]/30">
                  {PERSONAL_INFO.initials}
                </span>
              </div>

              {/* Image Frame with Enlarge and Change Overlays */}
              <div className="relative aspect-square sm:aspect-[4/4.5] w-full rounded-lg overflow-hidden bg-[#060e20] border border-[#334155]/60 shadow-inner group/img">
                {!imgError ? (
                  <img
                    id="hero-professional-photo"
                    src={avatarUrl}
                    alt={`${PERSONAL_INFO.name} - Professional Portrait`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#0b1326] p-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#171f33] border border-[#2563eb]/50 flex items-center justify-center font-mono text-2xl font-bold text-[#7bd0ff] mb-2 shadow-lg">
                      {PERSONAL_INFO.initials}
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {PERSONAL_INFO.name}
                    </span>
                    <span className="text-[11px] text-[#8d90a0] mt-1 font-mono">
                      Portrait Available
                    </span>
                  </div>
                )}

                {/* Subtle Gradient Shadow Vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-black/10 pointer-events-none" />

                {/* Quick Action Overlay on Hover - Admin only */}
                {isAdmin && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <button
                      onClick={onOpenProfilePhoto}
                      id="hero-enlarge-portrait-btn"
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded shadow-lg flex items-center gap-1.5 transition-transform active:scale-95"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View & Manage Photo</span>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      id="hero-quick-upload-btn"
                      className="px-3.5 py-1.5 text-xs font-medium text-[#dae2fd] hover:text-white bg-[#171f33]/90 hover:bg-[#222a3d] border border-[#334155] rounded flex items-center gap-1.5 transition-transform active:scale-95"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-[#4edea3]" />
                      <span>Upload Your Photo</span>
                    </button>
                  </div>
                )}

                {/* Small Camera Button in corner - Admin only */}
                {isAdmin && (
                  <button
                    onClick={onOpenProfilePhoto}
                    id="hero-camera-action-corner-btn"
                    title="Update profile picture"
                    className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-[#0b1326]/90 border border-[#2563eb]/60 text-[#7bd0ff] hover:text-white hover:bg-[#2563eb] transition-all shadow-md focus:outline-none"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Hidden File Input for Direct Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="hero-file-upload-input"
              />

              {/* Candidate Info Strip below photo */}
              <div className="mt-3.5 pt-3 border-t border-[#1e293b]/70 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-white text-sm">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#4edea3] bg-[#00a572]/10 border border-[#00a572]/30 px-1.5 py-0.5 rounded">
                    15+ Years Experience
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#8d90a0] truncate">
                  {PERSONAL_INFO.domains}
                </p>

                {/* Quick actions row - Admin only */}
                {isAdmin && (
                  <div className="pt-2 flex items-center justify-between text-[11px]">
                    <button
                      onClick={onOpenProfilePhoto}
                      className="text-[#7bd0ff] hover:text-white hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>Change picture</span>
                      <Camera className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#8d90a0] hover:text-[#4edea3] flex items-center gap-1 font-mono transition-colors"
                    >
                      <UploadCloud className="w-3 h-3" />
                      <span>Upload file</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
