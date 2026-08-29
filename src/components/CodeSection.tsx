'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { codeFragments } from '../data/education';

export function CodeSection() {
  const ref = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative section-pad px-6 md:px-10 xl:px-16 overflow-hidden"
      aria-label="Code samples — how I think"
    >
      {/* Background decorative code */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.025]"
          style={{ y }}
        >
          <pre className="font-mono text-xs text-paper leading-6 pt-8 pl-8 whitespace-pre-wrap">
            {codeFragments.map(f => f.code).join('\n\n# ──────────\n\n')}
          </pre>
        </motion.div>
      )}

      <div className="relative z-10">
        {/* Section marker */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="label-sm text-warm opacity-40">─</span>
          <div className="w-8 h-px bg-[#9a9590] opacity-30" />
          <span className="label-sm text-warm opacity-40">How I Think</span>
        </div>

        <p className="text-paper text-3xl md:text-5xl font-bold tracking-tight max-w-lg mb-12 md:mb-16 leading-tight">
          Code is<br />
          <span className="text-warm/50">communication,</span><br />
          not just instruction.
        </p>

        {/* Tab selectors */}
        <div className="flex gap-0 mb-0 border-b border-fine/20">
          {codeFragments.map((f, i) => (
            <button
              key={f.id}
              className={`px-5 py-3 text-xs font-mono transition-all duration-200 border-b-2 ${
                i === focused
                  ? 'text-paper border-accent'
                  : 'text-warm/40 border-transparent hover:text-warm/70'
              }`}
              onClick={() => setFocused(i)}
              data-cursor="open"
            >
              {`${String(i + 1).padStart(2, '0')}.py`}
            </button>
          ))}
        </div>

        {/* Code viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Code */}
          <div className="lg:col-span-8 bg-[#0f0e0c] border border-t-0 border-fine/10 overflow-x-auto">
            <div className="p-6 md:p-8">
              <p className="label-sm text-warm/30 mb-4">{codeFragments[focused].title}</p>
              <pre className="code-block text-paper/85 leading-7">
                <code>{codeFragments[focused].code}</code>
              </pre>
            </div>
          </div>

          {/* Annotation */}
          <div className="lg:col-span-4 border border-t-0 lg:border-l-0 border-fine/10 p-6 md:p-8 flex flex-col justify-center">
            <motion.div
              key={focused}
              initial={reduced ? {} : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-6 h-px bg-accent mb-4" />
              <p className="label-sm text-accent mb-3">{codeFragments[focused].annotation}</p>
              <p className="text-warm text-sm leading-relaxed">
                {codeFragments[focused].annotationText}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-warm/30 text-xs font-mono">
          // These are representative patterns, not production code.
        </p>
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
