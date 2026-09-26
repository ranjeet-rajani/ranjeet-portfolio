import { useState, useRef } from 'react';
import { ArrowRight, Code, CheckCircle, ExternalLink, Github } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCategory, ProjectItem } from '../types';
import { recordCtaClick } from '../utils/analyticsTracker';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.25'],
  });

  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categoryType === activeFilter;
  });

  // Simulated 20 regional velocity data points for the Power BI chart
  const territoryPoints = [
    82, 85, 88, 84, 89, 92, 90, 87, 86, 91, 89, 88, 85, 42, 86, 88, 89, 91, 87, 90
  ];

  // Staggered motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-12 lg:py-16 border-b border-[#1e293b]/70 bg-[#060e20]/40 relative overflow-hidden"
    >
      {/* Scroll-reveal dynamic progress line */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563eb] via-[#7bd0ff] to-[#4edea3] origin-left pointer-events-none opacity-85 z-10"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header & Filter Controls with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              <span className="font-mono text-xs font-semibold tracking-[0.08em] text-[#7bd0ff] uppercase">
                APPLIED ENTERPRISE SYSTEMS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
              Featured Analytics Projects
            </h2>
            <p className="text-sm text-[#8d90a0] max-w-2xl">
              Production-grade analytical platforms and enterprise ERP process mappings engineered to untangle commercial bottlenecks and identify profit anomalies.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-[#0f172a] p-1 rounded border border-[#1e293b] self-start md:self-auto" id="project-filter-tabs">
            <button
              onClick={() => setActiveFilter('all')}
              id="filter-tab-all"
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#2563eb] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                  : 'text-[#8d90a0] hover:text-white hover:bg-[#171f33]'
              }`}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('powerbi')}
              id="filter-tab-powerbi"
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                activeFilter === 'powerbi'
                  ? 'bg-[#2563eb] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                  : 'text-[#8d90a0] hover:text-white hover:bg-[#171f33]'
              }`}
            >
              Power BI & Analytics (2)
            </button>
            <button
              onClick={() => setActiveFilter('sap')}
              id="filter-tab-sap"
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                activeFilter === 'sap'
                  ? 'bg-[#2563eb] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                  : 'text-[#8d90a0] hover:text-white hover:bg-[#171f33]'
              }`}
            >
              SAP ERP & Processes (1)
            </button>
          </div>
        </motion.div>

        {/* 3-Column Projects Grid with Staggered Scroll-Reveal */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#0f172a] rounded border border-[#1e293b] hover:border-[#2563eb]/40 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div className="p-6">
                {/* Header Tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-[#8d90a0] uppercase">
                    {project.categoryTag}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      project.platformBadge.includes('Power BI')
                        ? 'bg-[#2563eb]/15 text-[#7bd0ff] border-[#2563eb]/30'
                        : project.platformBadge.includes('Capstone')
                        ? 'bg-[#00a572]/15 text-[#4edea3] border-[#00a572]/30'
                        : 'bg-[#6366f1]/15 text-[#a5b4fc] border-[#6366f1]/30'
                    }`}
                  >
                    {project.platformBadge}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-bold text-white font-heading mb-4 leading-snug">
                  {project.title}
                </h3>

                {/* Visual Graphic Representation */}
                <div className="bg-[#060e20] rounded border border-[#1e293b] p-3 mb-5">
                  {/* Chart 1: Territory Velocity Index */}
                  {project.visualType === 'chart' && (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                        <span className="text-[#8d90a0]">{project.highlightMetric}</span>
                        <span className="text-[#ffb4ab] font-semibold bg-[#93000a]/20 border border-[#ffb4ab]/30 px-1.5 py-0.5 rounded text-[10px]">
                          {project.highlightLabel}
                        </span>
                      </div>

                      {/* Interactive SVG Sparkline with Outlier Point */}
                      <div className="relative h-20 w-full mb-2">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Horizontal Baseline Grids */}
                          <line x1="0" y1="15" x2="200" y2="15" stroke="#1e293b" strokeDasharray="2,2" strokeWidth="0.8" />
                          <line x1="0" y1="45" x2="200" y2="45" stroke="#1e293b" strokeDasharray="2,2" strokeWidth="0.8" />

                          {/* Area Fill */}
                          <path
                            d="M 0 18 L 10 16 L 20 14 L 30 17 L 40 13 L 50 11 L 60 12 L 70 15 L 80 16 L 90 12 L 100 13 L 110 14 L 120 16 L 130 52 L 140 15 L 150 14 L 160 13 L 170 12 L 180 15 L 195 13 L 195 60 L 0 60 Z"
                            fill="url(#chartGrad)"
                          />

                          {/* Line */}
                          <path
                            d="M 0 18 L 10 16 L 20 14 L 30 17 L 40 13 L 50 11 L 60 12 L 70 15 L 80 16 L 90 12 L 100 13 L 110 14 L 120 16 L 130 52 L 140 15 L 150 14 L 160 13 L 170 12 L 180 15 L 195 13"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                          />

                          {/* Anomaly Outlier Dot Territory #14 */}
                          <circle cx="130" cy="52" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                          <circle cx="130" cy="52" r="7" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
                        </svg>

                        {/* Interactive Tooltip Overlay */}
                        {hoveredRegion !== null && (
                          <div className="absolute top-0 right-0 bg-[#131b2e] border border-[#2563eb] text-[10px] font-mono px-2 py-1 rounded text-white shadow-md">
                            Region #{hoveredRegion + 1}: {territoryPoints[hoveredRegion]}% Quota
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-[#1e293b]/60">
                        <span className="text-[#c3c6d7]">Primary Outlier: Territory #14</span>
                        <span className="text-[#ffb4ab] font-semibold">$1.31M Stockout Impact</span>
                      </div>
                    </div>
                  )}

                  {/* Chart 2: Cyclistic Bikeshare Duration Bar Chart */}
                  {project.visualType === 'bikeshare' && (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                        <span className="text-[#8d90a0]">{project.highlightMetric}</span>
                        <span className="text-[#4edea3] font-semibold bg-[#00a572]/20 border border-[#4edea3]/30 px-1.5 py-0.5 rounded text-[10px]">
                          {project.highlightLabel}
                        </span>
                      </div>

                      {/* Comparative Bars */}
                      <div className="space-y-2 mb-3">
                        <div>
                          <div className="flex justify-between text-[10px] font-mono text-[#c3c6d7] mb-0.5">
                            <span>Casual:</span>
                            <span className="font-semibold text-white">22.8m</span>
                          </div>
                          <div className="w-full bg-[#131b2e] rounded-sm h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-[#00a572] to-[#4edea3] h-full w-[95%] rounded-sm"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] font-mono text-[#c3c6d7] mb-0.5">
                            <span>Member:</span>
                            <span className="font-semibold text-white">12.1m</span>
                          </div>
                          <div className="w-full bg-[#131b2e] rounded-sm h-3 overflow-hidden">
                            <div className="bg-[#00759f] h-full w-[53%] rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono pt-1.5 border-t border-[#1e293b]/60 text-[#8d90a0]">
                        <span>Volume: 4,320,119 records</span>
                        <span className="text-[#7bd0ff]">Seasonality: 8x Shift</span>
                      </div>
                    </div>
                  )}

                  {/* Chart 3: SAP S/4HANA P2P Flow Visual */}
                  {project.visualType === 'sapFlow' && (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                        <span className="text-[#8d90a0]">{project.highlightMetric}</span>
                        <span className="text-[#4edea3] font-semibold bg-[#00a572]/20 border border-[#4edea3]/30 px-1.5 py-0.5 rounded text-[10px]">
                          {project.highlightLabel}
                        </span>
                      </div>

                      {/* Milestone Flow Boxes */}
                      <div className="grid grid-cols-4 gap-1.5 mb-3 text-center">
                        <div className="bg-[#171f33] border border-[#2563eb]/40 rounded p-1.5">
                          <div className="font-mono text-[9px] font-bold text-white">PR</div>
                          <div className="font-mono text-[7.5px] text-[#7bd0ff]">(ME51N)</div>
                        </div>
                        <div className="bg-[#171f33] border border-[#2563eb]/40 rounded p-1.5">
                          <div className="font-mono text-[9px] font-bold text-white">PO</div>
                          <div className="font-mono text-[7.5px] text-[#7bd0ff]">(ME21N)</div>
                        </div>
                        <div className="bg-[#171f33] border border-[#4edea3]/40 rounded p-1.5">
                          <div className="font-mono text-[9px] font-bold text-white">GR</div>
                          <div className="font-mono text-[7.5px] text-[#4edea3]">(MIGO)</div>
                        </div>
                        <div className="bg-[#171f33] border border-[#4edea3]/40 rounded p-1.5">
                          <div className="font-mono text-[9px] font-bold text-white">IR</div>
                          <div className="font-mono text-[7.5px] text-[#4edea3]">(MIRO)</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono pt-1.5 border-t border-[#1e293b]/60 text-[#8d90a0]">
                        <span>Client: IDES AG System 1000</span>
                        <span className="text-[#4edea3]">Cycle Reduced -18%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] text-[#c3c6d7] bg-[#171f33] border border-[#222a3d] px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bullets with Checkmarks */}
                <ul className="space-y-2.5 mb-6 text-xs text-[#8d90a0] leading-relaxed">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2563eb] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-6 pt-0 border-t border-[#1e293b]/60 flex items-center justify-between gap-3 mt-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordCtaClick('project', `Card Repo: ${project.title}`)}
                  className="px-3 py-1.5 text-xs font-mono text-[#c3c6d7] hover:text-white bg-[#131b2e] hover:bg-[#1e293b] border border-[#222a3d] hover:border-[#334155] rounded flex items-center gap-1.5 transition-colors"
                  title="View GitHub Repository (opens in new tab)"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{project.id === 'sap-p2p' ? 'Process Flow' : 'GitHub Repo'}</span>
                </a>

                <button
                  onClick={() => onSelectProject(project)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all shadow-sm ${
                    project.id === 'cyclistic'
                      ? 'bg-[#00a572] hover:bg-[#008f62] text-white'
                      : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white'
                  }`}
                >
                  <span>
                    {project.id === 'cyclistic'
                      ? 'R Notebook'
                      : project.id === 'sap-p2p'
                      ? 'Architecture Spec'
                      : 'Case Study'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
