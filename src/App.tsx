import { useEffect } from 'react';
import './index.css';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Journey } from './components/Journey';
import { Skills } from './components/Skills';
import { Work } from './components/Work';
import { CodeSection } from './components/CodeSection';
import { Learning } from './components/Learning';
import { Philosophy } from './components/Philosophy';
import { Education } from './components/Education';
import { HumanSection } from './components/HumanSection';
import { Contact } from './components/Contact';

// Smooth scrolling via Lenis
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Custom cursor — fixed overlay */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* 1. HERO — typographic assembly */}
        <Hero />

        {/* 2. ABOUT — word alignment story */}
        <About />

        {/* 3. EXPERIENCE — career journey */}
        <Experience />

        {/* 4. JOURNEY — horizontal camera travel */}
        <Journey />

        {/* 5. SKILLS — magnetic typography map */}
        <Skills />

        {/* 6. WORK — spatial project showcase */}
        <Work />

        {/* 7. CODE — editorial code depth of field */}
        <CodeSection />

        {/* 8. LEARNING — progressive completion */}
        <Learning />

        {/* 9. PHILOSOPHY — almost no motion */}
        <Philosophy />

        {/* 10. EDUCATION — chronological scaling */}
        <Education />

        {/* 11. HUMAN — editorial fade, white */}
        <HumanSection />

        {/* 12. CONTACT — typographic interaction */}
        <Contact />
      </main>
    </>
  );
}

export default App;
