'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { projects, type Project } from '../data/projects';
import { ArrowUpRight, X, GithubLogo } from '@phosphor-icons/react';

const typeLabels: Record<string, { label: string; color: string }> = {
  real: { label: 'REAL PROJECT', color: '#3ea37c' },
  'open-source': { label: 'OPEN SOURCE', color: '#7a9fc1' },
  experiment: { label: 'EXPERIMENT', color: '#c17f3e' },
  'case-study': { label: 'CASE STUDY', color: '#9a9590' },
};

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduced = useReducedMotion();
  const typeInfo = typeLabels[project.type];

  return (
    <motion.div
      className="fixed inset-0 z-[500] bg-ink overflow-y-auto"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? {} : { opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative min-h-full px-6 md:px-10 xl:px-16 py-20">
        {/* Close */}
        <button
          className="fixed top-6 right-6 w-10 h-10 flex items-center justify-center border border-fine/20 hover:border-fine/50 transition-all"
          onClick={onClose}
          data-cursor="link"
          aria-label="Close project detail"
        >
          <X size={16} color="#9a9590" />
        </button>

        {/* Project number + type */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-warm/30 text-sm">PROJECT {project.number}</span>
          <span className="label-sm" style={{ color: typeInfo.color }}>{typeInfo.label}</span>
        </div>

        {/* Title */}
        <motion.h2
          className="display-xl text-paper mb-4"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {project.name}
        </motion.h2>
        <motion.p
          className="text-warm text-lg mb-16 max-w-xl"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {project.tagline}
        </motion.p>

        {/* Case study sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 flex flex-col gap-14">
            {[
              { label: 'THE PROJECT', content: project.description },
              { label: 'THE PROBLEM', content: project.problem },
              { label: 'THE APPROACH', content: project.approach },
              { label: 'WHAT BROKE', content: project.whatBroke },
            ].map(({ label, content }, i) => (
              <motion.div
                key={label}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              >
                <p className="label-sm text-warm opacity-40 mb-4">{label}</p>
                <p className="text-paper text-base leading-relaxed">{content}</p>
              </motion.div>
            ))}

            {/* What I learned */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="label-sm text-warm opacity-40 mb-4">WHAT I LEARNED</p>
              <ul className="flex flex-col gap-4">
                {project.learned.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-paper text-sm leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-20 flex flex-col gap-8">
              {/* Technologies */}
              <div>
                <p className="label-sm text-warm opacity-40 mb-4">STACK</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 border border-fine/25 text-warm/70 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="label-sm text-warm opacity-40 mb-2">CATEGORY</p>
                <p className="text-paper text-sm">{project.category}</p>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-paper text-sm hover:text-accent transition-colors group"
                    data-cursor="link"
                  >
                    <GithubLogo size={16} />
                    <span>View on GitHub</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Work() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  return (
    <section
      id="work"
      className="relative section-pad px-6 md:px-10 xl:px-16"
      aria-label="Projects and work"
    >
      {/* Section marker */}
      <div className="flex items-center gap-4 mb-16 md:mb-20">
        <span className="label-sm text-warm opacity-40">05</span>
        <div className="w-8 h-px bg-[#9a9590] opacity-30" />
        <span className="label-sm text-warm opacity-40">Things I Actually Built</span>
      </div>

      {/* Project list */}
      <div className="flex flex-col">
        {projects.map((project, i) => {
          const typeInfo = typeLabels[project.type];
          return (
            <motion.article
              key={project.id}
              className="group relative border-t border-fine/15 py-8 md:py-10"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="w-full text-left"
                onClick={() => setOpenProject(project)}
                data-cursor="open"
                aria-label={`Open ${project.name} project detail`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  {/* Number */}
                  <div className="md:col-span-1 hidden md:block">
                    <span className="font-mono text-warm/25 text-sm">{project.number}</span>
                  </div>

                  {/* Title + description */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label-sm" style={{ color: typeInfo.color }}>
                        {typeInfo.label}
                      </span>
                    </div>
                    <h3 className="text-paper text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-warm text-sm leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Category + tech */}
                  <div className="md:col-span-3 md:col-start-8">
                    <p className="label-sm text-warm opacity-40 mb-2">{project.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="text-warm/40 text-xs font-mono">{tech}</span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-warm/30 text-xs font-mono">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-1 md:col-start-12 flex md:justify-end">
                    <motion.div
                      className="w-8 h-8 flex items-center justify-center border border-fine/20 group-hover:border-accent/50 group-hover:text-accent transition-all duration-300"
                      whileHover={reduced ? {} : { rotate: 45 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ArrowUpRight size={14} />
                    </motion.div>
                  </div>
                </div>
              </button>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-accent"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.article>
          );
        })}

        {/* Last border */}
        <div className="border-t border-fine/15" />
      </div>

      {/* Project detail overlay */}
      <AnimatePresence>
        {openProject && (
          <ProjectDetail
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>

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
