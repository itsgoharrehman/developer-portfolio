'use client';
import { motion, useReducedMotion } from 'motion/react';

export function HumanSection() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative section-pad px-6 md:px-10 xl:px-16 bg-[#f5f3ef]"
      aria-label="The person behind the engineer"
    >
      {/* This section breaks from the dark theme intentionally — one authorized theme switch */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-3">
          <motion.p
            className="label-sm text-[#9a9590] opacity-60 mb-12"
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Before the code
          </motion.p>

          <motion.h2
            className="text-[#0a0908] text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-none mb-16"
            initial={reduced ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            BEFORE I'M A<br />
            <span className="text-[#9a9590]">DEVELOPER,</span><br />
            I'M A PERSON WHO<br />
            LIKES FIGURING<br />
            THINGS OUT.
          </motion.h2>

          <motion.div
            className="max-w-md"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#3a3530] text-lg leading-relaxed mb-6">
              I'm from Faisalabad. I study software engineering because I find it genuinely interesting —
              not because I planned a career path. I like systems that are honest about what they do.
              I like code that reads clearly. I like problems that require real thinking.
            </p>
            <p className="text-[#9a9590] text-base leading-relaxed">
              Outside of software, I'm still figuring things out. That's the honest version.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
