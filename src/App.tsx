import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for anchor navigation links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, { offset: -70, duration: 1.3 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderComplete(true);
    setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 150);
  }, []);

  return (
    <div 
      className={`relative min-h-screen bg-background-cream text-text-primary font-sans overflow-x-hidden selection:bg-primary-500/20 selection:text-primary-600 ${!preloaderComplete ? 'h-screen overflow-hidden' : ''}`}
    >
      {/* Live Interactive Custom Cursor with Smooth Trail & Spotlight */}
      <CustomCursor />

      {!preloaderComplete && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Simple, Smooth Interactive Background Animation */}
      <BackgroundAnimation />


      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
