import { useState } from 'react';
import { GraduationCap, Award, TrendingUp, ExternalLink, CheckCircle2, Copy, Check } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

interface EducationSectionProps {
  onOpenCertificate?: () => void;
}

export default function EducationSection({ onOpenCertificate }: EducationSectionProps = {}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'grad':
        return <GraduationCap className="w-4 h-4 text-[#7bd0ff]" />;
      case 'cert':
        return <Award className="w-4 h-4 text-[#4edea3]" />;
      case 'trend':
        return <TrendingUp className="w-4 h-4 text-[#7bd0ff]" />;
      default:
        return <GraduationCap className="w-4 h-4 text-[#7bd0ff]" />;
    }
  };

  const handleCopyId = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="education" className="py-12 lg:py-16 border-b border-[#1e293b]/70 bg-[#0b1326]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
            <span className="font-mono text-xs font-semibold tracking-[0.08em] text-[#7bd0ff] uppercase">
              ACADEMIC & PROFESSIONAL VERIFICATION
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
            Education & Professional Certifications
          </h2>
          <p className="text-sm text-[#8d90a0] max-w-3xl">
            Verified credentials spanning advanced enterprise system configuration, quantitative econometric methodology, and professional data analytics.
          </p>
        </div>

        {/* 3-Column Credential Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {EDUCATION.map((item) => {
            const hasCredential = Boolean(item.credentialUrl);

            return (
              <div
                key={item.id}
                id={`education-card-${item.id}`}
                className={`bg-[#0f172a] rounded border p-6 flex flex-col justify-between transition-all duration-200 shadow-sm relative ${
                  hasCredential
                    ? 'border-[#00a572]/40 bg-gradient-to-b from-[#0f172a] to-[#0c1c24]'
                    : 'border-[#1e293b] hover:border-[#2563eb]/40'
                }`}
              >
                <div>
                  {/* Header Location / Category & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-[#8d90a0] uppercase flex items-center gap-1.5">
                      {hasCredential && <CheckCircle2 className="w-3 h-3 text-[#4edea3]" />}
                      {item.locationCategory}
                    </span>
                    <div className="w-6 h-6 rounded bg-[#171f33] border border-[#222a3d] flex items-center justify-center">
                      {getIcon(item.iconType)}
                    </div>
                  </div>

                  {/* Degree / Credential Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading mb-1.5 leading-snug">
                    {item.degree}
                  </h3>

                  {/* Institution */}
                  <div className="text-xs font-semibold text-[#b4c5ff] mb-3 flex items-center justify-between gap-2">
                    <span>{item.institution}</span>
                    {hasCredential && (
                      <span className="font-mono text-[10px] text-[#4edea3] bg-[#00a572]/15 px-2 py-0.5 rounded border border-[#00a572]/30 shrink-0">
                        100% VERIFIED
                      </span>
                    )}
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs text-[#8d90a0] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* If verifiable credential, render 1-click verification box */}
                  {hasCredential && item.credentialUrl && (
                    <div className="mb-5 p-3 rounded bg-[#0b1326]/80 border border-[#1e293b] space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#c3c6d7]">
                        <span className="text-[#8d90a0]">Credential ID:</span>
                        <div className="flex items-center gap-1.5">
                          <code className="text-[#4edea3] font-semibold">{item.credentialId}</code>
                          {item.credentialId && (
                            <button
                              type="button"
                              onClick={() => handleCopyId(item.id, item.credentialId!)}
                              className="text-[#8d90a0] hover:text-white p-0.5 transition-colors cursor-pointer"
                              title="Copy Credential ID"
                            >
                              {copiedId === item.id ? (
                                <Check className="w-3 h-3 text-[#4edea3]" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2.5 text-xs font-semibold text-white bg-[#00875a] hover:bg-[#00a572] rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                        >
                          <span>Verify Live</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>

                        {onOpenCertificate && (
                          <button
                            type="button"
                            onClick={onOpenCertificate}
                            className="py-2 px-2.5 text-xs font-semibold text-[#c3c6d7] hover:text-white bg-[#171f33] hover:bg-[#1e293b] border border-[#334155] rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                          >
                            <span>View Details</span>
                            <Award className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-4 border-t border-[#1e293b]/80 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#8d90a0] tracking-wider uppercase">
                    {item.footerLeft}
                  </span>
                  <span
                    className={`font-semibold tracking-wider uppercase px-2 py-0.5 rounded border ${
                      item.footerRight === 'VALIDATED'
                        ? 'bg-[#2563eb]/10 text-[#7bd0ff] border-[#2563eb]/30'
                        : item.footerRight === 'CERTIFIED'
                        ? 'bg-[#00a572]/10 text-[#4edea3] border-[#00a572]/30'
                        : 'bg-[#00759f]/10 text-[#7bd0ff] border-[#00759f]/30'
                    }`}
                  >
                    {item.footerRight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
