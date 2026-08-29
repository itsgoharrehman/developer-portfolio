'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorState = 'default' | 'view' | 'open' | 'drag' | 'copy' | 'link';

const labels: Record<CursorState, string> = {
  default: '',
  view: 'VIEW',
  open: 'OPEN',
  drag: 'DRAG',
  copy: 'COPY',
  link: '↗',
};

export function CustomCursor() {
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 400, damping: 35, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 35, mass: 0.3 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const handleElements = () => {
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        const cursorType = el.getAttribute('data-cursor') as CursorState;
        el.addEventListener('mouseenter', () => setState(cursorType));
        el.addEventListener('mouseleave', () => setState('default'));
      });
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    handleElements();

    const observer = new MutationObserver(handleElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      observer.disconnect();
    };
  }, [visible, cursorX, cursorY]);

  const isExpanded = state !== 'default';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          width: isExpanded ? 64 : 12,
          height: isExpanded ? 64 : 12,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.div
          className="rounded-full bg-[#f5f3ef] flex items-center justify-center overflow-hidden"
          style={{ width: '100%', height: '100%' }}
        >
          {isExpanded && (
            <motion.span
              className="label-sm text-[#0a0908] text-[0.55rem] font-medium"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              {labels[state]}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
