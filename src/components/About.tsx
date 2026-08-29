'use client';
import { motion, useReducedMotion } from 'motion/react';
import { personal } from '../data/personal';

const bioWords = personal.bio.split(/\s+/);

export function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative section-pad px-6 md:px-10 xl:px-16"
      aria-label="About Gohar Rehman"
    >
      {/* Section marker */}
      <div className="flex items-center gap-4 mb-16 md:mb-24">
        <span className="label-sm text-warm opacity-40">01</span>
        <div className="w-8 h-px bg-[#9a9590] opacity-30" />
        <span className="label-sm text-warm opacity-40">Who I Am</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
        {/* Left: animated word-scatter bio */}
        <div className="lg:col-span-7">
          {/* Large editorial paragraph with word animation */}
          <div className="mb-12">
            <p className="text-paper text-2xl md:text-3xl xl:text-4xl font-semibold leading-[1.2] tracking-tight max-w-2xl">
              {bioWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em] mb-[0.1em]"
                  initial={reduced ? {} : { opacity: 0.15, y: 12 }}
                  whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Extended bio */}
          <motion.p
            className="text-warm text-base md:text-lg leading-relaxed max-w-lg font-light"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {personal.bioExtended}
          </motion.p>
        </div>

        {/* Right: trait fragments */}
        <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
          <div className="flex flex-col gap-8">
            {[
              { label: 'APPROACH', value: 'Understand the problem before writing code.' },
              { label: 'STRENGTH', value: 'Turning complex requirements into simple systems.' },
              { label: 'INTEREST', value: 'The invisible infrastructure that makes products work.' },
              { label: 'CURRENTLY', value: 'Backend engineering student. Still becoming.' },
            ].map((trait, i) => (
              <motion.div
                key={trait.label}
                initial={reduced ? {} : { opacity: 0, x: 20 }}
                whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="label-sm text-warm opacity-40 mb-2">{trait.label}</p>
                <p className="text-paper text-sm leading-relaxed">{trait.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider line */}
      <motion.div
        className="mt-20 md:mt-32 h-px bg-[#e2ddd7] opacity-20"
        initial={reduced ? {} : { scaleX: 0, originX: 0 }}
        whileInView={reduced ? {} : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </section>
  );
}
