import { useRef } from 'react';
import { ArrowUpRight, Users, Database, TrendingUp } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { KPI_METRICS } from '../data/portfolioData';
import { KpiMetric } from '../types';

interface MetricsSectionProps {
  onSelectMetric: (metric: KpiMetric) => void;
}

export default function MetricsSection({ onSelectMetric }: MetricsSectionProps) {
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

  const getIcon = (type: string) => {
    switch (type) {
      case 'growth':
        return <ArrowUpRight className="w-4 h-4 text-[#7bd0ff]" />;
      case 'percent':
        return <TrendingUp className="w-4 h-4 text-[#4edea3]" />;
      case 'team':
        return <Users className="w-4 h-4 text-[#7bd0ff]" />;
      case 'database':
        return <Database className="w-4 h-4 text-[#7bd0ff]" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-[#7bd0ff]" />;
    }
  };

  // Staggered motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="py-12 lg:py-16 border-b border-[#1e293b]/70 bg-[#0b1326] relative overflow-hidden"
    >
      {/* Scroll-reveal dynamic progress line */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563eb] via-[#7bd0ff] to-[#4edea3] origin-left pointer-events-none opacity-85 z-10"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
            <span className="font-mono text-xs font-semibold tracking-[0.08em] text-[#8d90a0] uppercase">
              KEY PERFORMANCE BENCHMARKS • COMMERCIAL P&L FOOTPRINT
            </span>
          </div>
          <div className="font-mono text-xs text-[#7bd0ff] tracking-wider uppercase bg-[#131b2e] px-2.5 py-1 rounded border border-[#222a3d] self-start sm:self-auto">
            AUDITED OPERATIONAL IMPACT
          </div>
        </motion.div>

        {/* 4-Column KPI Grid with Staggered Scroll-Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {KPI_METRICS.map((kpi) => (
            <motion.div
              key={kpi.id}
              id={`kpi-card-${kpi.id}`}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => onSelectMetric(kpi)}
              className="group relative bg-[#0f172a] rounded border border-[#1e293b] p-6 hover:border-[#2563eb]/50 hover:bg-[#131b2e] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_24px_-6px_rgba(37,99,235,0.2)] flex flex-col justify-between"
            >
              <div>
                {/* Top Category Label & Icon / Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-[#8d90a0] uppercase group-hover:text-[#c3c6d7] transition-colors">
                    {kpi.category}
                  </span>

                  {kpi.badge ? (
                    <span className="font-mono text-[10px] font-semibold text-[#4edea3] bg-[#00a572]/15 border border-[#00a572]/40 px-1.5 py-0.5 rounded">
                      {kpi.badge}
                    </span>
                  ) : (
                    <div className="w-6 h-6 rounded bg-[#171f33] flex items-center justify-center border border-[#222a3d] group-hover:border-[#2563eb]/40 transition-colors">
                      {getIcon(kpi.iconType)}
                    </div>
                  )}
                </div>

                {/* Primary Metric Display */}
                <div className="mb-2">
                  <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#b4c5ff] transition-colors">
                    {kpi.value}
                  </span>
                </div>

                {/* Metric Title */}
                <h3 className="font-heading text-sm sm:text-base font-semibold text-[#dae2fd] mb-2">
                  {kpi.title}
                </h3>

                {/* Metric Narrative */}
                <p className="text-xs text-[#8d90a0] leading-relaxed mb-6">
                  {kpi.description}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-4 border-t border-[#1e293b]/70 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {kpi.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] tracking-wide text-[#7bd0ff] bg-[#171f33] px-2 py-0.5 rounded border border-[#222a3d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[9px] text-[#64748b] group-hover:text-[#7bd0ff] transition-colors">
                  VIEW AUDIT →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
