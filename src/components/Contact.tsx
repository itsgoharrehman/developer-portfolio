'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { personal } from '../data/personal';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowUpRight, CheckCircle } from '@phosphor-icons/react';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();
  const emailRef = useRef<HTMLButtonElement>(null);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(personal.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${personal.contact.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-[100dvh] flex flex-col justify-between section-pad px-6 md:px-10 xl:px-16"
      aria-label="Contact Gohar Rehman"
    >
      {/* Top */}
      <div className="flex items-center gap-4">
        <span className="label-sm text-warm opacity-40">07</span>
        <div className="w-8 h-px bg-[#9a9590] opacity-30" />
        <span className="label-sm text-warm opacity-40">Contact</span>
      </div>

      {/* Center: main message */}
      <div className="flex flex-col gap-10">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-warm/40 text-base mb-6">Have an interesting problem?</p>
          <h2 className="display-xl text-paper leading-none mb-6">
            LET'S BUILD<br />
            <span className="text-warm/30">SOMETHING.</span>
          </h2>
        </motion.div>

        {/* Stretchy email button */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            ref={emailRef}
            className="group relative block w-full text-left py-6 border-t border-b border-fine/20 hover:border-fine/50 transition-all duration-300"
            onClick={handleEmailClick}
            data-cursor="copy"
            aria-label={`Copy email address: ${personal.contact.email}`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="display-md text-paper group-hover:tracking-[0.02em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                {personal.contact.email}
              </span>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    className="flex items-center gap-2 text-accent flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle size={18} weight="fill" />
                    <span className="label-sm">COPIED</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    className="flex items-center gap-2 text-warm/40 group-hover:text-paper flex-shrink-0 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <EnvelopeSimple size={18} />
                    <span className="label-sm hidden md:inline">CLICK TO COPY</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex flex-wrap gap-6 md:gap-10"
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {[
            {
              label: 'GitHub',
              href: personal.contact.github,
              icon: <GithubLogo size={16} />,
            },
            {
              label: 'LinkedIn',
              href: personal.contact.linkedin,
              icon: <LinkedinLogo size={16} />,
            },
            {
              label: 'Resume',
              href: personal.contact.resume,
              icon: <ArrowUpRight size={16} />,
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-warm/50 hover:text-paper transition-colors duration-200 group"
              data-cursor="link"
            >
              {link.icon}
              <span className="label-sm">{link.label.toUpperCase()}</span>
              <ArrowUpRight
                size={12}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-1"
              />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-t border-fine/15 pt-8"
        initial={reduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div>
          <p className="text-paper font-bold tracking-tight text-lg">{personal.name}</p>
          <p className="label-sm text-warm opacity-40 mt-1">Software Engineer · Backend / Systems</p>
        </div>
        <p className="label-sm text-warm opacity-25">
          © {new Date().getFullYear()} · Built with care
        </p>
      </motion.div>
    </section>
  );
}
