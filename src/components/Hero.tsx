'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { personal } from '../data/personal';

function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const h = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, [x, y]);
  return { x, y };
}



export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { x, y } = useMousePosition();
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Parallax layers driven by mouse
  const vw = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const vh = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  const layer1X = useSpring(useTransform(x, [0, vw * 2], [-12, 12]), { stiffness: 60, damping: 30 });
  const layer1Y = useSpring(useTransform(y, [0, vh * 2], [-8, 8]), { stiffness: 60, damping: 30 });
  const layer2X = useSpring(useTransform(x, [0, vw * 2], [18, -18]), { stiffness: 40, damping: 25 });
  const layer2Y = useSpring(useTransform(y, [0, vh * 2], [12, -12]), { stiffness: 40, damping: 25 });

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden"
      aria-label="Hero — Gohar Rehman, Software Engineer"
    >
      {/* Background abstract texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            x: reduced ? 0 : layer1X,
            y: reduced ? 0 : layer1Y,
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 30% 40%, #c17f3e 0%, transparent 70%),
              radial-gradient(ellipse 50% 80% at 80% 70%, #f5f3ef 0%, transparent 60%)
            `,
          }}
        />
        {/* Architectural fine lines */}
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          style={{ x: reduced ? 0 : layer2X, y: reduced ? 0 : layer2Y }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-[#f5f3ef]"
              style={{
                left: `${15 + i * 14}%`,
                top: 0,
                bottom: 0,
                width: '1px',
                opacity: 0.4 - i * 0.04,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-10 xl:px-16">
        {/* Number/status */}
        <motion.div
          className="flex items-center gap-4 mb-8 md:mb-12"
          initial={reduced ? {} : { opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="label-sm text-warm opacity-50">Portfolio</span>
          <span className="block w-8 h-px bg-[#9a9590] opacity-40" />
          <span className="label-sm text-warm opacity-50">2025</span>
        </motion.div>

        {/* Name — enormous typographic display */}
        <div className="mb-6 md:mb-8 overflow-hidden">
          <div className="display-2xl text-paper leading-[0.88] tracking-[-0.045em]">
            {/* GOHAR line */}
            <div className="overflow-hidden">
              <motion.div
                initial={reduced ? {} : { y: '105%', opacity: 0 }}
                animate={loaded ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                GOHAR
              </motion.div>
            </div>
            {/* REHMAN line — slightly displaced */}
            <div className="overflow-hidden">
              <motion.div
                className="md:ml-[8vw]"
                initial={reduced ? {} : { y: '105%', opacity: 0 }}
                animate={loaded ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-paper">REHMAN</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom row: role + tagline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Role */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-md text-warm mb-1">Software Engineer</p>
            <p className="label-sm text-warm opacity-60">Backend · APIs · Systems</p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-warm text-base md:text-lg max-w-xs md:max-w-sm leading-relaxed md:text-right font-light"
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {personal.tagline}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-3 mt-12 md:mt-16"
          initial={reduced ? {} : { opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-[#9a9590]/30 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-warm"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="label-sm text-warm opacity-40">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
