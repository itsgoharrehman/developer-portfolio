'use client';
import { motion, useReducedMotion } from 'motion/react';
import { education } from '../data/education';

export function Education() {
  const reduced = useReducedMotion();
  const years = Array.from(
    { length: education.period.end - education.period.start + 1 },
    (_, i) => education.period.start + i
  );

  return (
    <section
      className="relative section-pad-sm px-6 md:px-10 xl:px-16"
      aria-label="Education"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: details */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-10">
            <span className="label-sm text-warm opacity-40">─</span>
            <div className="w-8 h-px bg-[#9a9590] opacity-30" />
            <span className="label-sm text-warm opacity-40">Education</span>
          </div>

          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-paper text-2xl md:text-3xl font-bold tracking-tight mb-2">
              {education.degree}
            </h2>
            <p className="text-warm text-base mb-1">{education.institution}</p>
            <p className="label-sm text-warm opacity-40 mb-8">
              {education.period.start} — {education.period.end}
            </p>

            <p className="text-warm/70 text-sm leading-relaxed mb-8 max-w-sm">
              {education.description}
            </p>

            {/* Relevant courses */}
            <div>
              <p className="label-sm text-warm opacity-40 mb-4">RELEVANT COURSES</p>
              <div className="flex flex-col gap-2">
                {education.relevantCourses.map((course, i) => (
                  <motion.p
                    key={course}
                    className="text-warm/60 text-sm"
                    initial={reduced ? {} : { opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.3 }}
                  >
                    {course}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: enormous year counter */}
        <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            {years.map((year, i) => {
              const isCurrent = year === education.current;
              return (
                <motion.div
                  key={year}
                  className="flex items-center gap-6"
                  initial={reduced ? {} : { opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                >
                  <span
                    className="font-bold tracking-tight transition-all duration-500"
                    style={{
                      fontSize: isCurrent ? 'clamp(3rem, 8vw, 7rem)' : 'clamp(1.5rem, 4vw, 3.5rem)',
                      color: isCurrent ? '#f5f3ef' : '#9a9590',
                      opacity: isCurrent ? 1 : 0.25,
                      lineHeight: 1,
                    }}
                  >
                    {year}
                  </span>
                  {isCurrent && (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="label-sm text-accent">NOW</span>
                    </motion.div>
                  )}
                  {year < education.current && (
                    <span className="font-mono text-warm/25 text-xs">✓</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider */}
      <motion.div
        className="mt-20 h-px bg-[#e2ddd7] opacity-20"
        initial={reduced ? {} : { scaleX: 0, originX: 0 }}
        whileInView={reduced ? {} : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
    </section>
  );
}
