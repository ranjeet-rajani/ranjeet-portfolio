import { useRef } from 'react';
import { Check } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';

export default function ExperienceSection() {
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

  // Staggered motion variants for career milestones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 38, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
            <span className="font-mono text-xs font-semibold tracking-[0.08em] text-[#7bd0ff] uppercase">
              LEADERSHIP TRACK RECORD
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
            Commercial Leadership & Operational Milestones
          </h2>
          <p className="text-sm text-[#8d90a0] max-w-3xl">
            Chronological professional experience overseeing high-velocity sales divisions, nationwide pharmaceutical launches, and quantitative quota engineering.
          </p>
        </motion.div>

        {/* Experience Milestone Cards with Staggered Scroll Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-[#0f172a] rounded border border-[#1e293b] p-6 lg:p-8 hover:border-[#2563eb]/40 transition-all duration-200 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Metadata & Role */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 font-mono text-xs mb-3">
                    <span className="text-[#7bd0ff] font-semibold">{exp.period}</span>
                    <span className="text-[#434655]">•</span>
                    <span className="bg-[#171f33] text-[#c3c6d7] border border-[#222a3d] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading mb-1.5">
                    {exp.company}
                  </h3>

                  <h4 className="text-sm font-semibold text-[#b4c5ff] font-heading mb-4">
                    {exp.role}
                  </h4>

                  {/* Highlight Badges */}
                  <div className="flex flex-wrap gap-2">
                    {exp.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`font-mono text-[10px] font-semibold px-2 py-1 rounded border ${
                          idx === 0
                            ? 'bg-[#00a572]/15 text-[#4edea3] border-[#00a572]/30'
                            : 'bg-[#171f33] text-[#c3c6d7] border-[#222a3d]'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Operational Bullets */}
                <div className="lg:col-span-7">
                  <div className="space-y-3.5 border-t lg:border-t-0 lg:border-l border-[#1e293b] pt-4 lg:pt-0 lg:pl-6">
                    {exp.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#00a572]/15 border border-[#00a572]/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#4edea3]" />
                        </div>
                        <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
