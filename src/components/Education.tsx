import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data';
import { GraduationCap, BookOpen, Medal, Sparkles, Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading appearance animation (triggers early & smoothly)
      gsap.fromTo('.education-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.education-header',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Timeline central connecting line progress (snappy scrub)
      if (timelineRef.current) {
        gsap.fromTo('.education-timeline-progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 85%',
              end: 'bottom 80%',
              scrub: 0.2
            }
          }
        );
      }

      // 3. Each Education Item scroll-triggered entrance animation (triggers right away on scroll)
      const items = gsap.utils.toArray<HTMLElement>('.education-item');
      items.forEach((item, idx) => {
        const marker = item.querySelector('.education-marker');
        const card = item.querySelector('.education-card');
        const isEven = idx % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 93%', // triggers immediately as the item enters the lower viewport edge
            toggleActions: 'play none none reverse'
          }
        });

        // Milestone marker icon pops in snappily
        if (marker) {
          tl.fromTo(marker,
            { scale: 0.3, opacity: 0, rotate: -30 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.35, ease: 'back.out(1.7)' },
            0
          );
        }

        // Card glides in simultaneously with zero delay and crisp response
        if (card) {
          const isMobile = window.innerWidth < 768;
          const xOffset = isMobile ? 25 : (isEven ? -35 : 35);

          tl.fromTo(card,
            {
              opacity: 0,
              y: 20,
              x: xOffset,
              scale: 0.97
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.45,
              ease: 'power2.out'
            },
            0 // Starts simultaneously with marker
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const education = portfolioData.education;
  const icons = [GraduationCap, BookOpen, Medal];

  return (
    <section id="education" ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[25%] left-[5%] w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[25%] right-[5%] w-[450px] h-[450px] bg-[#A88945]/08 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="education-header text-center mb-10 md:mb-12">
          <div className="kicker-pill mb-3 mx-auto">
            <Sparkles size={13} />
            <span>02 // Academic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
            Educational <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mt-3 font-normal">
            Strong computer science foundation, consistently high academic rank, and technical dedication.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Central Line Background */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-border-subtle rounded-full" />
          
          {/* Central Line Animated Foreground */}
          <div 
            className="education-timeline-progress absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-primary-500 rounded-full shadow-[0_0_15px_rgba(230,199,120,0.45)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />

          <div className="space-y-6 md:space-y-7">
            {education.map((edu, idx) => (
              <EducationCard 
                key={idx} 
                edu={edu} 
                idx={idx} 
                totalItems={education.length} 
                Icon={icons[idx % icons.length]} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu, idx, totalItems, Icon }: any) {
  const isEven = idx % 2 === 0;

  return (
    <div className="education-item relative flex flex-col md:flex-row items-center w-full group">
      
      {/* Node on the timeline with pop entrance transition */}
      <div 
        className="education-marker absolute left-6 md:left-1/2 -ml-4 w-8 h-8 rounded-full border-2 border-primary-500 bg-[#1C1C21] text-primary-500 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(230,199,120,0.45)] group-hover:scale-110 transition-transform duration-300"
      >
        <Icon size={14} />
      </div>

      {/* Card Content with scroll appearance transition */}
      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:ml-auto md:text-left'}`}>
        <div
          className="education-card glass-card p-5 sm:p-6 md:p-6 rounded-[22px] relative border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-xl transition-all duration-300 hover:border-primary-500/35 hover:shadow-[0_20px_50px_rgba(230,199,120,0.12)] hover:-translate-y-1"
        >
          {/* Progress Indicator */}
          <div className={`text-primary-600 dark:text-primary-400 font-mono font-bold tracking-widest text-xs uppercase mb-2.5 flex items-center gap-2 ${isEven ? 'md:justify-end justify-start' : 'justify-start'}`}>
             {!isEven && <span className="w-5 h-px bg-primary-500/40 hidden md:block"></span>}
             <span className="w-5 h-px bg-primary-500/40 block md:hidden"></span>
             <span>Milestone {String(idx + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}</span>
             {isEven && <span className="w-5 h-px bg-primary-500/40 hidden md:block"></span>}
          </div>

          <div className="space-y-2.5">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary leading-snug">
              {edu.degree}
            </h3>
            
            <div className={`flex flex-col gap-1 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
              <span className="text-primary-600 dark:text-primary-400 font-bold text-sm sm:text-base flex items-center gap-2">
                <GraduationCap size={16} className="text-primary-500" />
                {edu.institution}
              </span>
              
              <span className="inline-flex items-center gap-1.5 text-text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-white/5 border border-white/90 dark:border-white/10">
                <Calendar size={12} className="text-text-muted" />
                {edu.duration}
              </span>
            </div>

            {/* Score Highlight Badge */}
            <div className={`pt-1 flex ${isEven ? 'md:justify-end justify-start' : 'justify-start'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r from-primary-500/10 via-primary-500/15 to-primary-600/10 border border-primary-500/30 dark:border-primary-400/40 text-primary-700 dark:text-primary-300 font-bold text-xs sm:text-sm shadow-sm">
                <Award size={14} className="text-primary-600 dark:text-primary-400" />
                <span>{edu.score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
