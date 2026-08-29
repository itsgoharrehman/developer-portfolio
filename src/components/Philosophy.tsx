'use client';
import { motion, useReducedMotion } from 'motion/react';
import { philosophyStatements } from '../data/learning';

export function Philosophy() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative section-pad px-6 md:px-10 xl:px-16"
      aria-label="Engineering philosophy"
    >
      {/* Almost no UI. Typography carries the scene. */}

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          {/* Giant statement */}
          <motion.p
            className="display-xl text-paper mb-20 md:mb-32 leading-none"
            initial={reduced ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            I LIKE BUILDING
            <br />
            <span className="text-warm/30">THINGS THAT</span>
            <br />
            ARE USEFUL.
          </motion.p>

          {/* Principles — appear one by one, very restrained */}
          <div className="flex flex-col gap-0">
            {philosophyStatements.map((statement, i) => (
              <motion.div
                key={statement}
                className="py-8 border-t border-fine/15 flex items-start gap-6"
                initial={reduced ? {} : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="font-mono text-warm/20 text-xs w-6 flex-shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-paper text-xl md:text-2xl font-semibold tracking-tight">
                  {statement}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-fine/15" />
          </div>
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
