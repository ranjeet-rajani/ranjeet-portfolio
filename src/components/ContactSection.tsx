import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Download, Printer, MapPin, Check, Copy, Linkedin, Github, QrCode, Smartphone, X } from 'lucide-react';
import QRCode from 'qrcode';
import { PERSONAL_INFO } from '../data/portfolioData';
import { recordCtaClick } from '../utils/analyticsTracker';
import { getSocialLinks, SocialLinks } from '../utils/socialsManager';

interface ContactSectionProps {
  avatarUrl?: string;
  onOpenResume: () => void;
  onOpenSchedule: () => void;
  onOpenProfilePhoto?: () => void;
  onShowToast: (msg: string) => void;
}

export default function ContactSection({
  avatarUrl,
  onOpenResume,
  onOpenSchedule,
  onOpenProfilePhoto,
  onShowToast,
}: ContactSectionProps) {
  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin=true');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [socials, setSocials] = useState<SocialLinks>(getSocialLinks);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Standard RFC 2426 vCard 3.0 format for iOS & Android
  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Rajani;Ranjeet;Kumar;;',
    'FN:Ranjeet Kumar Rajani',
    'ORG:Commercial & Sales Analytics',
    'TITLE:Commercial & Sales Analytics • Pharma Commercial Operations • Business Intelligence',
    `TEL;TYPE=CELL,VOICE:${PERSONAL_INFO.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${PERSONAL_INFO.email}`,
    'ADR;TYPE=WORK,POSTAL:;;Fairfield;IA;52556;USA',
    `URL:${PERSONAL_INFO.socials.linkedin}`,
    'NOTE:Pharmaceutical commercial leader with 15+ years experience. Power BI, SQL, R, SAP S/4HANA.',
    'END:VCARD',
  ].join('\r\n');

  useEffect(() => {
    QRCode.toDataURL(vCardContent, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 320,
      color: {
        dark: '#090d16',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate vCard QR Code:', err));
  }, [vCardContent]);

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

  const handleDownloadVCard = () => {
    recordCtaClick('contact', 'Downloaded vCard (.vcf)');
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ranjeet_Kumar_Rajani.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('vCard downloaded! Open file to save Ranjeet to contacts.');
  };

  const handleCopyAllContact = () => {
    const text = [
      `Name: ${PERSONAL_INFO.name}`,
      `Title: ${PERSONAL_INFO.title}`,
      `Phone: ${PERSONAL_INFO.phone}`,
      `Email: ${PERSONAL_INFO.email}`,
      `Location: ${PERSONAL_INFO.location}`,
      `LinkedIn: ${PERSONAL_INFO.socials.linkedin}`,
      `GitHub: ${PERSONAL_INFO.socials.github}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    recordCtaClick('contact', 'Copied All Contact Info');
    onShowToast('Full contact details copied to clipboard!');
  };

  return (
    <section id="contact" className="py-12 lg:py-16 bg-[#060e20]/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563eb]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              {/* Green Availability Badge with Avatar Preview */}
              <div className="flex items-center gap-3">
                {avatarUrl && (
                  isAdmin ? (
                    <button
                      onClick={onOpenProfilePhoto}
                      className="w-10 h-10 rounded-full overflow-hidden border border-[#2563eb]/50 shrink-0 hover:border-[#7bd0ff] transition-all cursor-pointer shadow-[0_0_12px_rgba(37,99,235,0.3)]"
                      title="Manage portrait"
                    >
                      <img
                        src={avatarUrl}
                        alt={PERSONAL_INFO.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ) : (
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#2563eb]/50 shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.3)]">
                      <img
                        src={avatarUrl}
                        alt={PERSONAL_INFO.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )
                )}
                <div className="inline-flex items-center gap-2 bg-[#060e20] px-3 py-1.5 rounded border border-[#10b981]/30 text-[#4edea3] text-xs font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  <span className="font-semibold tracking-wide uppercase">
                    AVAILABLE FOR US ROLES
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
                Ready to Accelerate Your Commercial Analytics & Operations
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#c3c6d7] leading-relaxed max-w-2xl">
                Actively seeking full-time US opportunities in Commercial Analytics, Business Operations, ERP Process Optimization, or Field Force Leadership. Open to on-site, hybrid, and remote engagements.
              </p>

              {/* Location & Authorization Details */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8d90a0] pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#7bd0ff]" />
                  <span>Fairfield, Iowa, United States</span>
                </div>
                <span>•</span>
                
              </div>

              {/* Inline Quick Contact Card (vCard QR) */}
              <div className="mt-6 pt-5 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#091122]/80 p-4 rounded-xl border border-[#2563eb]/20 shadow-inner">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {qrDataUrl ? (
                    <button
                      onClick={() => {
                        recordCtaClick('contact', 'Clicked Contact QR Thumbnail');
                        setShowQrModal(true);
                      }}
                      className="group/qr relative shrink-0 p-1 bg-white rounded-lg shadow-md hover:ring-2 hover:ring-[#2563eb] transition-all cursor-pointer"
                      title="Click to view full-size QR code"
                    >
                      <img
                        src={qrDataUrl}
                        alt="Ranjeet Kumar Rajani Contact QR Code"
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain rounded"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded opacity-0 group-hover/qr:opacity-100 flex items-center justify-center transition-opacity">
                        <QrCode className="w-5 h-5 text-white" />
                      </div>
                    </button>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-[#171f33] flex items-center justify-center text-[#7bd0ff] shrink-0 border border-[#2563eb]/30">
                      <QrCode className="w-8 h-8 animate-pulse" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-white text-xs sm:text-sm">
                        Quick Contact Saving (vCard QR)
                      </span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/40 font-semibold uppercase">
                        Mobile Camera Ready
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8d90a0] mt-0.5 leading-relaxed">
                      Scan code with your phone camera to add Ranjeet directly to your contacts (iOS & Android).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => {
                      recordCtaClick('contact', 'Clicked Enlarge QR Button');
                      setShowQrModal(true);
                    }}
                    className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-mono font-medium text-[#7bd0ff] hover:text-white bg-[#171f33] hover:bg-[#1f2a44] border border-[#2563eb]/40 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR</span>
                  </button>
                  <button
                    onClick={handleDownloadVCard}
                    className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save .vcf</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Action Center */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {/* Email Direct Button */}
              <div className="flex items-center rounded border border-[#334155] bg-[#171f33] hover:border-[#2563eb] transition-all">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => recordCtaClick('email', 'Direct Email Link Clicked')}
                  className="flex-1 px-4 py-3 text-xs sm:text-sm text-white font-mono flex items-center gap-2 truncate"
                  id="contact-email-link"
                >
                  <Mail className="w-4 h-4 text-[#7bd0ff] shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="px-3 py-3 text-[#8d90a0] hover:text-white border-l border-[#334155]/60 hover:bg-[#222a3d] transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-[#4edea3]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Direct Button */}
              <div className="flex items-center rounded border border-[#334155] bg-[#171f33] hover:border-[#00a572] transition-all">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => recordCtaClick('phone', 'Direct Phone Dial Clicked')}
                  className="flex-1 px-4 py-3 text-xs sm:text-sm text-white font-mono flex items-center gap-2"
                  id="contact-phone-link"
                >
                  <Phone className="w-4 h-4 text-[#4edea3] shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="px-3 py-3 text-[#8d90a0] hover:text-white border-l border-[#334155]/60 hover:bg-[#222a3d] transition-colors shrink-0"
                  title="Copy phone to clipboard"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-[#4edea3]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href="mailto:ranjeetkumarrajanii@gmail.com?subject=Commercial%20Analytics%20Inquiry%20%E2%80%94%20Ranjeet%20Kumar%20Rajani"
                  onClick={() => recordCtaClick('schedule', 'Clicked Contact Section Schedule Call')}
                  className="px-3 py-2.5 text-xs font-semibold text-[#4edea3] border border-[#00a572] bg-[#00a572]/15 hover:bg-[#00a572]/25 rounded flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Contact / Schedule</span>
                </a>

                <a
                  href="/Ranjeet_Kumar_Rajani_Resume.pdf"
                  download="Ranjeet_Kumar_Rajani_Resume.pdf"
                  onClick={() => recordCtaClick('resume', 'Direct PDF Download (Contact)')}
                  className="px-3 py-2.5 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* View / Print Resume Secondary Option */}
              <button
                type="button"
                onClick={onOpenResume}
                className="w-full py-2 px-3 rounded bg-[#131b2e] hover:bg-[#17223b] border border-[#222a3d] hover:border-[#334155] text-xs font-mono text-[#c3c6d7] hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                title="Preview resume text, print, or copy to clipboard"
              >
                <Printer className="w-3.5 h-3.5 text-[#7bd0ff]" />
                <span>View / Print Resume (Copy Text)</span>
              </button>

              {/* vCard QR Code Modal Opener Button */}
              <button
                onClick={() => {
                  recordCtaClick('contact', 'Clicked Action Center QR Button');
                  setShowQrModal(true);
                }}
                className="w-full py-2.5 px-3 rounded bg-[#131b2e] hover:bg-[#17223b] border border-[#2563eb]/40 hover:border-[#2563eb] text-xs font-medium text-[#dae2fd] hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <QrCode className="w-4 h-4 text-[#7bd0ff]" />
                <span>Save Contact via QR (vCard)</span>
              </button>

              {/* Social Link Badges */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#8d90a0]">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin-link"
                  onClick={() => recordCtaClick('social', 'Contact: Visited LinkedIn Profile')}
                  className="hover:text-[#7bd0ff] transition-colors flex items-center gap-1.5"
                  title="Open verified LinkedIn profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#7bd0ff]" />
                  <span>LINKEDIN ↗</span>
                </a>
                <span>•</span>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github-link"
                  onClick={() => recordCtaClick('social', 'Contact: Visited GitHub Profile')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                  title="Open verified GitHub profile"
                >
                  <Github className="w-3.5 h-3.5 text-[#c3c6d7]" />
                  <span>GITHUB ↗</span>
                </a>
                <span>•</span>
                <a
                  href={socials.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-kaggle-link"
                  onClick={() => recordCtaClick('social', 'Contact: Visited Kaggle Profile')}
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                  title="Open verified Kaggle profile"
                >
                  <span className="font-bold text-[#38bdf8] italic text-xs">k</span>
                  <span>KAGGLE ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Contact Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-[#0f172a] border border-[#2563eb]/40 rounded-xl shadow-2xl overflow-hidden my-8 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0b1326]">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#7bd0ff]" />
                <span className="font-heading font-bold text-sm text-white">
                  Quick Contact Saving • vCard
                </span>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1.5 text-[#8d90a0] hover:text-white rounded hover:bg-[#171f33] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 bg-[#0b1326]/90 text-[#dae2fd]">
              {/* QR Code Showcase Box */}
              <div className="flex flex-col items-center justify-center p-5 bg-[#091122] rounded-xl border border-[#1e293b]">
                <div className="p-3 bg-white rounded-xl shadow-[0_0_24px_rgba(37,99,235,0.25)] border-2 border-[#2563eb]/40 flex items-center justify-center">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Ranjeet Kumar Rajani vCard QR Code"
                      className="w-56 h-56 object-contain"
                    />
                  ) : (
                    <div className="w-56 h-56 flex items-center justify-center text-[#2563eb]">
                      <QrCode className="w-12 h-12 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Scan Instructions */}
                <div className="mt-4 flex items-center gap-2 text-center text-xs text-[#8d90a0] font-mono">
                  <Smartphone className="w-4 h-4 text-[#4edea3] shrink-0" />
                  <span>Scan with iOS Camera or Google Lens to save contact</span>
                </div>
              </div>

              {/* Contact Card Details Preview */}
              <div className="p-4 rounded-lg bg-[#0f172a] border border-[#1e293b] space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">
                      {PERSONAL_INFO.name}
                    </h4>
                    <p className="text-[11px] text-[#7bd0ff]">
                      Commercial & Sales Analytics
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#4edea3] bg-[#00a572]/15 border border-[#00a572]/30 px-2 py-0.5 rounded font-semibold">
                    vCard 3.0
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div>
                    <span className="text-[#8d90a0]">Phone:</span>{' '}
                    <span className="text-white">{PERSONAL_INFO.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#8d90a0]">Email:</span>{' '}
                    <span className="text-white truncate block">{PERSONAL_INFO.email}</span>
                  </div>
                  <div>
                    <span className="text-[#8d90a0]">Location:</span>{' '}
                    <span className="text-white">{PERSONAL_INFO.location}</span>
                  </div>
                  <div>
                    <span className="text-[#8d90a0]">Role:</span>{' '}
                    <span className="text-white">Commercial Analytics</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleDownloadVCard}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-[0.99]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download vCard File (.vcf)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyAllContact}
                    className="py-2 text-xs font-mono text-[#dae2fd] hover:text-white bg-[#171f33] hover:bg-[#20293f] border border-[#334155] rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#7bd0ff]" />
                    <span>Copy Info</span>
                  </button>

                  <button
                    onClick={() => setShowQrModal(false)}
                    className="py-2 text-xs font-mono text-[#8d90a0] hover:text-white bg-[#171f33] hover:bg-[#20293f] border border-[#334155] rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
