'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { skills, skillCenter } from '../data/skills';

const categoryColors: Record<string, string> = {
  core: '#c17f3e',
  framework: '#7a9fc1',
  database: '#3ea37c',
  infra: '#9a9590',
  language: '#e2ddd7',
  ai: '#c17f5a',
};

const familiarityLabels: Record<string, string> = {
  learning: 'Still learning',
  comfortable: 'Comfortable',
  confident: 'Confident with this',
};

export function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedSkill = skills.find(s => s.id === selected);
  const hoveredSkill = skills.find(s => s.id === hovered);

  // Determine which skills to highlight based on hover
  const highlightedIds = hovered
    ? [hovered, ...(hoveredSkill?.relatedTo ?? [])]
    : selected
    ? [selected, ...(selectedSkill?.relatedTo ?? [])]
    : null;

  return (
    <section
      id="skills"
      className="relative section-pad px-6 md:px-10 xl:px-16"
      aria-label="Skills and technologies"
    >
      {/* Section marker */}
      <div className="flex items-center gap-4 mb-16 md:mb-20">
        <span className="label-sm text-warm opacity-40">04</span>
        <div className="w-8 h-px bg-[#9a9590] opacity-30" />
        <span className="label-sm text-warm opacity-40">What I Work With</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: skill map */}
        <div className="lg:col-span-7">
          {/* Center node */}
          <div className="mb-12">
            <motion.div
              className="inline-block mb-6 px-5 py-3 border border-fine/30 rounded-none"
              whileHover={reduced ? {} : { borderColor: 'rgba(193,127,62,0.5)' }}
            >
              <p className="font-mono text-xs text-accent tracking-widest whitespace-pre-line leading-relaxed">
                {skillCenter.label}
              </p>
            </motion.div>
          </div>

          {/* Skill nodes — typography-based map */}
          <div ref={containerRef} className="relative">
            {/* Category groups */}
            {['language', 'framework', 'database', 'infra', 'ai'].map((category) => {
              const categorySkills = skills.filter(s => s.category === category);
              const labels: Record<string, string> = {
                language: 'LANGUAGES',
                framework: 'FRAMEWORKS',
                database: 'DATABASES',
                infra: 'INFRASTRUCTURE',
                ai: 'AI / ML',
              };
              return (
                <div key={category} className="mb-8 border-t border-fine/15 pt-6">
                  <p className="label-sm mb-4" style={{ color: categoryColors[category], opacity: 0.6 }}>
                    {labels[category]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => {
                      const isHighlighted = highlightedIds ? highlightedIds.includes(skill.id) : null;
                      const isDimmed = highlightedIds !== null && !isHighlighted;
                      const isSelected = selected === skill.id;

                      return (
                        <motion.button
                          key={skill.id}
                          className="px-4 py-2 text-sm font-semibold tracking-tight border transition-all duration-200"
                          style={{
                            borderColor: isSelected
                              ? categoryColors[skill.category]
                              : 'rgba(226,221,215,0.2)',
                            color: isDimmed ? '#9a9590' : isSelected ? '#f5f3ef' : '#c8c4be',
                            opacity: isDimmed ? 0.3 : 1,
                            backgroundColor: isSelected
                              ? `${categoryColors[skill.category]}18`
                              : 'transparent',
                          }}
                          animate={{
                            scale: isHighlighted && !isSelected ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setSelected(selected === skill.id ? null : skill.id)}
                          onHoverStart={() => setHovered(skill.id)}
                          onHoverEnd={() => setHovered(null)}
                          data-cursor="open"
                          aria-pressed={isSelected}
                          aria-label={`${skill.label} — ${skill.description}`}
                        >
                          {skill.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instruction */}
          <p className="label-sm text-warm opacity-30 mt-6">
            Click any skill to learn more about how I use it
          </p>
        </div>

        {/* Right: skill detail panel */}
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.id}
                  initial={reduced ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="w-8 h-px mb-6"
                    style={{ background: categoryColors[selectedSkill.category] }}
                  />
                  <h3 className="text-paper text-2xl font-bold tracking-tight mb-3">
                    {selectedSkill.label}
                  </h3>
                  <p className="text-warm text-sm leading-relaxed mb-6">
                    {selectedSkill.description}
                  </p>

                  <div className="mb-4">
                    <p className="label-sm text-warm opacity-40 mb-2">FAMILIARITY</p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: categoryColors[selectedSkill.category] }}
                    >
                      {familiarityLabels[selectedSkill.familiarity]}
                    </p>
                  </div>

                  {selectedSkill.relatedTo.length > 0 && (
                    <div>
                      <p className="label-sm text-warm opacity-40 mb-3">OFTEN USED WITH</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkill.relatedTo.map(rid => {
                          const r = skills.find(s => s.id === rid);
                          if (!r) return null;
                          return (
                            <button
                              key={rid}
                              className="px-3 py-1.5 border border-fine/20 text-warm/60 text-xs font-mono hover:text-warm transition-colors"
                              onClick={() => setSelected(rid)}
                            >
                              {r.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    className="mt-8 label-sm text-warm opacity-40 hover:opacity-70 transition-opacity"
                    onClick={() => setSelected(null)}
                  >
                    ← Clear
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={reduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? {} : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-warm/30 text-sm leading-relaxed">
                    Select a skill to see how I use it and what it connects to.
                  </p>
                  <p className="text-warm/20 text-xs mt-3 leading-relaxed">
                    No proficiency percentages here — just honest context.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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
