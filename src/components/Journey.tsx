'use client';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { journey } from '../data/journey';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const eraColors: Record<string, string> = {
  early: '#c17f3e22',
  learning: '#3e6bc122',
  backend: '#3ea37c22',
  current: '#c17f3e40',
};

const eraTextColors: Record<string, string> = {
  early: '#9a9590',
  learning: '#7a9fc1',
  backend: '#3ea37c',
  current: '#c17f3e',
};

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const distance = trackRef.current!.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  // Mobile: vertical fallback
  const MobileJourney = () => (
    <div className="flex flex-col gap-12 px-6 py-16">
      {journey.map((stage) => (
        <motion.div
          key={stage.id}
          className="border-t border-fine/20 pt-8"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="label-sm" style={{ color: eraTextColors[stage.era] }}>{stage.year}</span>
            <span className="label-sm text-warm opacity-30">→</span>
            <span className="label-sm text-warm opacity-50">{stage.era.toUpperCase()}</span>
          </div>
          <h3 className="text-paper text-2xl font-bold tracking-tight mb-3">{stage.title}</h3>
          <p className="text-warm text-sm italic mb-4">{stage.subtitle}</p>
          <p className="text-warm/70 text-sm leading-relaxed mb-4">{stage.what}</p>
          <div className="flex flex-col gap-2">
            <div>
              <span className="label-sm text-warm opacity-40">DIFFICULT: </span>
              <span className="text-warm/60 text-xs">{stage.difficult}</span>
            </div>
            <div>
              <span className="label-sm text-warm opacity-40">LEARNED: </span>
              <span className="text-warm/60 text-xs">{stage.learned}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section
      id="journey"
      ref={ref}
      className="relative overflow-hidden"
      aria-label="Gohar Rehman's development journey"
    >
      {/* Section header — visible before horizontal scroll begins */}
      <div className="absolute top-8 left-6 md:left-10 z-20 flex items-center gap-4">
        <span className="label-sm text-warm opacity-40">03</span>
        <div className="w-8 h-px bg-[#9a9590] opacity-30" />
        <span className="label-sm text-warm opacity-40">How I Got Here</span>
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="hidden md:block">
        <div
          ref={trackRef}
          className="flex h-[100dvh] items-center"
          style={{ width: `${journey.length * 42}vw` }}
        >
          {/* Intro panel */}
          <div className="w-[35vw] flex-shrink-0 h-full flex flex-col justify-end px-10 xl:px-16 pb-20">
            <p className="label-sm text-warm opacity-40 mb-4">A PROGRESSION</p>
            <p className="text-paper text-4xl xl:text-5xl font-bold tracking-tight leading-tight max-w-xs">
              From curious<br />to engineering.
            </p>
            <p className="text-warm text-sm mt-6 max-w-xs leading-relaxed">
              Drag or scroll to move through each stage of the journey.
            </p>
          </div>

          {/* Journey stages */}
          {journey.map((stage) => (
            <div
              key={stage.id}
              className="relative w-[38vw] xl:w-[36vw] flex-shrink-0 h-full flex flex-col justify-center px-10 xl:px-12"
              style={{
                background: `linear-gradient(135deg, ${eraColors[stage.era]} 0%, transparent 60%)`,
              }}
            >
              {/* Stage number */}
              <div className="absolute top-8 right-10">
                <span
                  className="font-mono text-[7rem] font-bold leading-none opacity-[0.04] select-none"
                  style={{ color: eraTextColors[stage.era] }}
                >
                  {String(journey.indexOf(stage) + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Border */}
              <div
                className="absolute left-0 top-[15%] bottom-[15%] w-px opacity-20"
                style={{ background: eraTextColors[stage.era] }}
              />

              <div className="max-w-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="label-sm"
                    style={{ color: eraTextColors[stage.era] }}
                  >
                    {stage.year}
                  </span>
                  <span className="label-sm text-warm opacity-30">ERA: {stage.era.toUpperCase()}</span>
                </div>

                <h3 className="text-paper text-3xl xl:text-4xl font-bold tracking-tight mb-3">
                  {stage.title}
                </h3>
                <p className="text-warm text-sm italic mb-8">{stage.subtitle}</p>

                <p className="text-paper/80 text-sm leading-relaxed mb-6">{stage.what}</p>

                <div className="border-t border-fine/20 pt-5 flex flex-col gap-3">
                  <div>
                    <p className="label-sm text-warm opacity-35 mb-1">WHAT WAS DIFFICULT</p>
                    <p className="text-warm/60 text-xs leading-relaxed">{stage.difficult}</p>
                  </div>
                  <div>
                    <p className="label-sm text-warm opacity-35 mb-1">WHAT I LEARNED</p>
                    <p className="text-warm/60 text-xs leading-relaxed">{stage.learned}</p>
                  </div>
                  <div>
                    <p className="label-sm text-warm opacity-35 mb-1">WHAT CAME NEXT</p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: eraTextColors[stage.era] }}
                    >
                      {stage.next}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End panel */}
          <div className="w-[25vw] flex-shrink-0 h-full flex flex-col justify-center px-10">
            <p className="label-sm text-warm opacity-40 mb-4">WHERE I AM NOW</p>
            <p className="text-paper text-2xl font-bold tracking-tight leading-tight max-w-xs">
              Still becoming the engineer I want to be.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="md:hidden">
        <div className="pt-16">
          <MobileJourney />
        </div>
      </div>
    </section>
  );
}
