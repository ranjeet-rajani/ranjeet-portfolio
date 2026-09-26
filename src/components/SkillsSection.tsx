import { BarChart3, Server, Briefcase } from 'lucide-react';
import { SKILL_PILLARS } from '../data/portfolioData';

export default function SkillsSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'analytics':
        return <BarChart3 className="w-5 h-5 text-[#3b82f6]" />;
      case 'erp':
        return <Server className="w-5 h-5 text-[#38bdf8]" />;
      case 'commercial':
        return <Briefcase className="w-5 h-5 text-[#10b981]" />;
      default:
        return <BarChart3 className="w-5 h-5 text-[#3b82f6]" />;
    }
  };

  return (
    <section id="skills" className="py-12 lg:py-16 border-b border-[#1e293b]/70 bg-[#060e20]/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
            <span className="font-mono text-xs font-semibold tracking-[0.08em] text-[#7bd0ff] uppercase">
              SKILLSETS & TOOLING
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
            Technical, ERP & Commercial Competency Matrix
          </h2>
          <p className="text-sm text-[#8d90a0] max-w-3xl">
            A multi-disciplinary blend of quantitative data science, enterprise ERP execution, and high-stakes commercial governance.
          </p>
        </div>

        {/* 3-Column Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SKILL_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              id={`skill-pillar-${pillar.id}`}
              className="bg-[#0f172a] rounded border border-[#1e293b] p-6 flex flex-col justify-between hover:border-[#2563eb]/40 transition-all duration-200 shadow-sm"
            >
              <div>
                {/* Pillar Header with Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-[#171f33] border border-[#222a3d] flex items-center justify-center shrink-0">
                    {getIcon(pillar.iconType)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">
                      {pillar.title}
                    </h3>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8d90a0] uppercase">
                      {pillar.subtitle}
                    </span>
                  </div>
                </div>

                {/* Subtitle / Scope Narrative */}
                <p className="text-xs text-[#8d90a0] leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Skills Cloud Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {pillar.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`font-mono text-xs px-2.5 py-1 rounded border transition-colors ${
                        pillar.id === 'commercial'
                          ? 'bg-[#00a572]/10 text-[#4edea3] border-[#00a572]/30 hover:border-[#00a572]'
                          : pillar.id === 'erp'
                          ? 'bg-[#00759f]/10 text-[#7bd0ff] border-[#00759f]/30 hover:border-[#00759f]'
                          : 'bg-[#2563eb]/10 text-[#b4c5ff] border-[#2563eb]/30 hover:border-[#2563eb]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Progress / Competency Bar */}
              <div className="pt-4 border-t border-[#1e293b]/80">
                <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                  <span className="text-[#8d90a0] font-semibold tracking-wider uppercase">
                    {pillar.masteryLabel}
                  </span>
                  <span className="text-white font-bold">
                    {pillar.masteryValue}
                  </span>
                </div>

                <div className="w-full bg-[#171f33] h-2 rounded-full overflow-hidden border border-[#222a3d]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pillar.percent}%`,
                      backgroundColor: pillar.accentColor,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
