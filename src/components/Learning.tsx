'use client';
import { motion, useReducedMotion } from 'motion/react';
import { learningAreas } from '../data/learning';

export function Learning() {
  const reduced = useReducedMotion();

  return (
    <section
      id="learning"
      className="relative section-pad px-6 md:px-10 xl:px-16"
      aria-label="Current learning areas"
    >
      {/* Section marker */}
      <div className="flex items-center gap-4 mb-16 md:mb-20">
        <span className="label-sm text-warm opacity-40">06</span>
        <div className="w-8 h-px bg-[#9a9590] opacity-30" />
        <span className="label-sm text-warm opacity-40">Things I'm Still Figuring Out</span>
      </div>

      {/* Header */}
      <div className="mb-16 md:mb-20">
        <p className="text-warm/40 label-sm mb-4">Honesty matters more than impressiveness.</p>
        <h2 className="display-lg text-paper max-w-xl leading-tight">
          I am still<br />
          <span className="text-warm/40">becoming</span><br />
          the engineer<br />
          I want to be.
        </h2>
      </div>

      {/* Learning areas */}
      <div className="flex flex-col">
        {learningAreas.map((area, i) => (
          <motion.details
            key={area.id}
            className="group border-t border-fine/15 py-6 cursor-pointer"
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <summary
              className="flex items-center justify-between list-none"
              data-cursor="open"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-warm/25 text-xs w-6">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-paper text-xl md:text-2xl font-bold tracking-tight group-open:text-accent transition-colors duration-300">
                  {area.topic}
                </h3>
              </div>
              <motion.span
                className="text-warm/40 text-sm font-mono flex-shrink-0"
                data-cursor="open"
              >
                <span className="hidden group-open:inline">−</span>
                <span className="inline group-open:hidden">+</span>
              </motion.span>
            </summary>

            <div className="mt-6 ml-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'WHAT I KNOW', content: area.know, opacity: 'text-paper/70' },
                { label: 'WHAT I\'M LEARNING', content: area.learning, opacity: 'text-paper/85' },
                { label: 'WHAT I\'M BUILDING TO UNDERSTAND IT', content: area.building, opacity: 'text-accent/80' },
              ].map(({ label, content, opacity }) => (
                <div key={label}>
                  <p className="label-sm text-warm/35 mb-3">{label}</p>
                  <p className={`text-sm leading-relaxed ${opacity}`}>{content}</p>
                </div>
              ))}
            </div>
          </motion.details>
        ))}
        <div className="border-t border-fine/15" />
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
