'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Experience', href: '#experience', num: '02' },
  { label: 'Journey', href: '#journey', num: '03' },
  { label: 'Skills', href: '#skills', num: '04' },
  { label: 'Work', href: '#work', num: '05' },
  { label: 'Learning', href: '#learning', num: '06' },
  { label: 'Contact', href: '#contact', num: '07' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems.map(i => document.querySelector(i.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeItem = navItems.find(i => i.href === `#${activeSection}`);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-10 py-5 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <button
          className="label-sm text-paper opacity-90 hover:opacity-100 transition-opacity tracking-[0.22em]"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor="link"
        >
          GOHAR
        </button>

        {/* Center: active section indicator */}
        <div className="hidden md:flex items-center gap-2">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.num}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="label-sm text-warm opacity-60">{activeItem.num}</span>
                <span className="label-sm text-paper opacity-70">{activeItem.label.toUpperCase()}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side nav links + menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`label-sm transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? 'text-paper opacity-100'
                  : 'text-warm opacity-60 hover:opacity-90 hover:text-paper'
              }`}
              data-cursor="link"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="relative w-8 h-5 md:hidden flex flex-col justify-between"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-full h-px bg-paper"
            animate={menuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          />
          <motion.span
            className="block w-full h-px bg-paper"
            animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-full h-px bg-paper"
            animate={menuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          />
        </button>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-ink/95 backdrop-blur-lg flex flex-col justify-end p-8 pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  className="text-left py-4 border-t border-fine text-paper"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="label-sm text-warm mr-4">{item.num}</span>
                  <span className="text-2xl font-bold tracking-tight">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
