import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data';
import { Code2, Layout, Database, Cpu, Terminal, Sparkles } from 'lucide-react';
import techProgrammingImg from '../assets/tech_programming.jpg';
import techFrontendImg from '../assets/tech_frontend.jpg';
import techDatabaseImg from '../assets/tech_database.jpg';
import techCoreConceptsImg from '../assets/tech_core_concepts.jpg';
import techToolsImg from '../assets/tech_tools.jpg';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Programming",
    icon: Code2,
    skills: portfolioData.skills.programming,
    desc: "Programming languages and fundamental development skills used to build reliable software solutions.",
    image: techProgrammingImg
  },
  {
    title: "Scripting & Frontend",
    icon: Layout,
    skills: portfolioData.skills.scripting,
    desc: "Technologies used to create responsive, interactive and engaging user interfaces.",
    image: techFrontendImg
  },
  {
    title: "Databases",
    icon: Database,
    skills: portfolioData.skills.databases,
    desc: "Database fundamentals and structured data management.",
    image: techDatabaseImg
  },
  {
    title: "Core Concepts",
    icon: Cpu,
    skills: portfolioData.skills.core,
    desc: "Core computer science concepts that support efficient and scalable software development.",
    image: techCoreConceptsImg
  },
  {
    title: "Tools & Platforms",
    icon: Terminal,
    skills: portfolioData.skills.tools,
    desc: "Tools and platforms used throughout my development workflow.",
    image: techToolsImg
  }
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      
      if (!track || !section) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // Horizontal Scroll Animation
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
             // Update progress line
             const progress = self.progress;
             if (progressDotRef.current) {
                progressDotRef.current.style.left = `${progress * 100}%`;
             }
          }
        }
      });

      // Subtle depth effect for cards during scroll
      const cards = gsap.utils.toArray('.skill-card-container');
      cards.forEach((card: any) => {
        gsap.to(card, {
          rotateY: 2,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left center",
            end: "right center",
            scrub: true,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle tilt: max 2deg X, 3deg Y
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 3;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className={`skills-section relative ${isReducedMotion ? 'py-20' : 'h-screen flex flex-col justify-center'} overflow-hidden bg-background-cream`}
    >
      {/* Subtle Background Glows specifically for Skills Section */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-25">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E6C778]/10 dark:bg-[#E6C778]/08 rounded-full blur-[110px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A88945]/10 dark:bg-[#A88945]/06 rounded-full blur-[110px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E6C778]/08 dark:bg-[#E6C778]/05 rounded-full blur-[110px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 mb-8 md:mb-12">
        <div className="kicker-pill mb-3">
          <Sparkles size={13} />
          <span>03 // Skills & Technologies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
          Technical <span className="text-gradient">Arsenal</span>
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mt-2 font-normal">
          Core languages, frameworks, structured databases, and developer workflows.
        </p>

        {/* Progress Line */}
        {!isReducedMotion && (
          <div className="relative w-full max-w-md h-[3px] bg-primary-500/15 mt-6 rounded-full hidden md:block" ref={progressLineRef}>
            <div 
              ref={progressDotRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#A88945] to-[#E6C778] shadow-[0_0_12px_rgba(230,199,120,0.5)]"
              style={{ left: '0%' }}
            ></div>
          </div>
        )}
      </div>

      <div 
        ref={trackRef} 
        className={`skills-track relative z-10 flex ${isReducedMotion ? 'flex-col gap-8 px-6' : 'flex-nowrap pl-6 md:pl-12 pr-[10vw]'} w-max`}
      >
        {skillCategories.map((category, idx) => (
          <div 
            key={category.title}
            className={`skill-card-container flex-shrink-0 ${isReducedMotion ? 'w-full' : 'w-[85vw] sm:w-[420px] md:w-[470px] lg:w-[520px] mr-8 md:mr-12'}`}
          >
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`w-full ${isReducedMotion ? 'h-auto' : 'h-[500px] md:h-[580px]'} bg-white/85 dark:bg-[#1C1C21] backdrop-blur-[24px] border border-white/95 dark:border-[rgba(230,199,120,0.16)] rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-8 md:p-10 flex flex-col relative overflow-hidden group transition-all duration-500 hover:bg-white dark:hover:bg-[#24242A] hover:border-primary-500/35 dark:hover:border-[#E6C778]/40 hover:shadow-[0_35px_75px_-15px_rgba(230,199,120,0.15)]`}
            >
              {/* Large Subtle Number */}
              <div className="absolute top-4 right-6 text-[120px] font-extrabold leading-none text-primary-500/[0.04] dark:text-primary-400/[0.08] select-none z-0 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4">
                0{idx + 1}
              </div>

              {/* Card Top Meta */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#A88945] via-[#E6C778] to-[#FAF7ED] flex items-center justify-center text-[#0C0C0E] shadow-lg shadow-[#E6C778]/20">
                  <category.icon size={26} />
                </div>
                <span className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full bg-primary-500/10 dark:bg-primary-500/20 border border-primary-500/20 dark:border-primary-400/30">
                  CATEGORY 0{idx + 1}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-3 tracking-tight">
                  {category.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 font-normal">
                  {category.desc}
                </p>

                {/* Skills Tags with colored dots */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {category.skills.map((skill: string) => (
                    <span 
                      key={skill}
                      className="px-3.5 py-2 rounded-xl bg-background-cream/70 dark:bg-[#24242A] border border-white/90 dark:border-[rgba(230,199,120,0.16)] text-text-primary font-semibold text-xs md:text-sm shadow-sm flex items-center gap-2 group-hover:bg-white dark:group-hover:bg-[#1C1C21] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI 3D Visual Artwork for each Tech Card */}
              <div className="w-full h-44 md:h-52 mt-auto rounded-2xl overflow-hidden relative group/img shadow-md border border-white/80 dark:border-[rgba(230,199,120,0.16)] bg-black/10">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 pointer-events-none">
                  <Sparkles size={11} className="text-primary-400" />
                  <span>Domain Architecture</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
