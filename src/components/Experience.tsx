'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { experiences } from '../data/experience';

export function Experience() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const exp = experiences[active];

  return (
    <section
      id="experience"
      className="relative section-pad px-6 md:px-10 xl:px-16"
      aria-label="Work Experience"
    >
      {/* Section marker */}
      <div className="flex items-center gap-4 mb-16 md:mb-20">
        <span className="label-sm text-warm opacity-40">02</span>
        <div className="w-8 h-px bg-[#9a9590] opacity-30" />
        <span className="label-sm text-warm opacity-40">Where I Have Been</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: timeline navigation */}
        <div className="lg:col-span-4">
          <div className="flex flex-col">
            {experiences.map((e, i) => (
              <button
                key={e.id}
                className={`text-left py-6 border-t border-fine group transition-all duration-300 ${
                  i === active ? 'border-[#e2ddd7]/50' : 'border-[#e2ddd7]/15'
                }`}
                onClick={() => setActive(i)}
                data-cursor="open"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={`label-sm mb-2 transition-all duration-300 ${
                        i === active ? 'text-accent opacity-100' : 'text-warm opacity-40'
                      }`}
                    >
                      {e.period}
                    </p>
                    <p
                      className={`font-semibold tracking-tight text-base md:text-lg transition-all duration-300 ${
                        i === active ? 'text-paper' : 'text-warm/60 group-hover:text-warm'
                      }`}
                    >
                      {e.role}
                    </p>
                    <p
                      className={`label-sm mt-1 transition-all duration-300 ${
                        i === active ? 'text-warm opacity-60' : 'text-warm opacity-30'
                      }`}
                    >
                      {e.company}
                    </p>
                  </div>

                  {/* Active indicator */}
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Progress line */}
                {i === active && (
                  <motion.div
                    className="mt-4 h-px bg-accent"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}

            {/* Placeholder */}
            <div className="py-6 border-t border-fine/15">
              <p className="label-sm text-warm opacity-20">More experience coming ↓</p>
            </div>
          </div>
        </div>

        {/* Right: active experience detail */}
        <div className="lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={exp.id}
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Role header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="label-sm text-accent">{exp.type.toUpperCase()}</span>
                </div>
                <h2 className="display-md text-paper mb-1">{exp.role}</h2>
                <p className="text-warm text-lg">{exp.company} · {exp.period}</p>
              </div>

              {/* Description */}
              <p className="text-warm text-base leading-relaxed max-w-lg mb-10">
                {exp.description}
              </p>

              {/* What I did */}
              <div className="mb-10">
                <p className="label-sm text-warm opacity-50 mb-4">RESPONSIBILITIES</p>
                <ul className="flex flex-col gap-3">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-paper text-sm leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What I learned */}
              <div className="mb-10">
                <p className="label-sm text-warm opacity-50 mb-4">WHAT I LEARNED</p>
                <ul className="flex flex-col gap-3">
                  {exp.learned.map((l, i) => (
                    <li key={i} className="flex items-start gap-3 text-warm text-sm leading-relaxed italic">
                      <span className="w-1 h-1 rounded-full bg-warm/40 mt-2 flex-shrink-0" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <p className="label-sm text-warm opacity-50 mb-4">TECHNOLOGIES</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 border border-fine/30 text-warm text-xs font-mono rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <motion.div
        className="mt-20 md:mt-32 h-px bg-[#e2ddd7] opacity-20"
        initial={reduced ? {} : { scaleX: 0, originX: 0 }}
        whileInView={reduced ? {} : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
    </section>
  );
}
