import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data';
import { Briefcase, Sparkles, Calendar, CheckCircle2, Cloud } from 'lucide-react';
import awsArchitectureImage from '../assets/aws_cloud_architecture.jpg';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Background Watermark Parallax
      gsap.to(".experience-watermark", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. Experience Items Animation
      const items = gsap.utils.toArray('.experience-item');
      items.forEach((item: any) => {
        const image = item.querySelector('.experience-image-container');
        const card = item.querySelector('.experience-card');
        const marker = item.querySelector('.experience-marker');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        // Reveal timeline marker
        tl.fromTo(marker, 
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Reveal image
        tl.fromTo(image,
          { opacity: 0, y: 80, scale: 0.9, rotateX: 8 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.1, ease: "power3.out" },
          "-=0.2"
        );

        // Reveal overlapping card
        tl.fromTo(card,
          { opacity: 0, y: 60, x: 40 },
          { opacity: 1, y: 0, x: 0, duration: 1.0, ease: "power3.out" },
          "-=0.85"
        );

        // 3. Foreground Parallax (Subtle vertical movement on scroll)
        gsap.to(image, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
        
        gsap.to(card, {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, target: HTMLElement) => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle tilt: max 3deg X, 4deg Y
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 4;
    
    gsap.to(target, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1200
    });
  };

  const handleMouseLeave = (target: HTMLElement) => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    gsap.to(target, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-background-cream">
      
      {/* Huge Background Watermark */}
      <h2 className="experience-watermark absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,20vw,22rem)] font-extrabold text-primary-500 opacity-[0.035] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter">
        AWS CLOUD
      </h2>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-20 md:mb-28">
          <div className="kicker-pill mb-3">
            <Sparkles size={13} />
            <span>04 // Work Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
            Industry <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mt-2 font-normal">
            Real-world cloud architecture, infrastructure workflows, and hands-on deployment.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Experience Flow */}
          <div className="relative border-l-2 border-primary-500/20 ml-2 md:ml-6 pb-8">
            {portfolioData.experience.map((exp, idx) => (
              <div 
                key={idx}
                className="experience-item relative pl-8 md:pl-16 mb-24 lg:mb-40"
              >
                {/* Timeline Marker */}
                <div className="experience-marker absolute -left-[17px] md:-left-[21px] top-12 md:top-1/2 md:-translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-[#1C1C21] border-[3px] border-primary-500 flex items-center justify-center shadow-[0_0_20px_rgba(230,199,120,0.35)] z-30">
                  <Briefcase className="text-primary-500 w-4 h-4 md:w-5 md:h-5" />
                </div>
                
                {/* Overlapping Composition Container */}
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0 mt-8 lg:mt-0">
                  
                  {/* AWS Cloud Image Area */}
                  <div 
                    className="experience-image-container relative w-full lg:w-[65%] h-[340px] sm:h-[460px] lg:h-[550px] rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border-4 border-white/80 dark:border-[rgba(230,199,120,0.16)] z-10 bg-primary-500/5 group"
                    style={{ transformStyle: 'preserve-3d' }}
                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/75 via-[#0C0C0E]/15 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(230,199,120,0.15)] z-20 pointer-events-none rounded-[28px]"></div>
                    
                    {/* Complete AWS Cloud Architecture Picture */}
                    <img 
                      src={awsArchitectureImage} 
                      alt={`${exp.company} - ${exp.title}`} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    
                    {/* Corner badge on image */}
                    <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                      <Cloud size={16} className="text-primary-400" />
                      <span>AWS Cloud Infrastructure & Compute Architecture</span>
                    </div>
                  </div>
                  
                  {/* Overlapping Info Card */}
                  <div 
                    className="experience-card relative lg:absolute lg:-right-4 lg:bottom-10 w-full lg:w-[52%] p-8 md:p-10 rounded-[32px] bg-white/90 dark:bg-[#1C1C21]/95 backdrop-blur-[28px] border border-white/95 dark:border-[rgba(230,199,120,0.16)] shadow-[0_35px_85px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_35px_85px_-15px_rgba(0,0,0,0.7)] z-20"
                  >
                    {/* Company Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-500/15 to-[#A88945]/10 border border-primary-500/25 dark:border-primary-400/30 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider">
                        <Cloud size={14} className="text-primary-500" />
                        <span>{exp.company}</span>
                      </div>
                      
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 font-bold text-xs border border-primary-500/20 dark:border-primary-400/30">
                        <Calendar size={12} />
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary leading-tight mb-4">
                      {exp.title}
                    </h3>
                    
                    <ul className="space-y-3.5 mb-6">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex gap-3 text-text-secondary text-sm md:text-base leading-relaxed font-normal">
                          <CheckCircle2 className="text-primary-500 mt-1 flex-shrink-0 w-4 h-4" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Domain Focus Chips */}
                    <div className="pt-4 border-t border-border-subtle flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-background-cream/80 dark:bg-[#24242A] border border-border-subtle text-[11px] font-bold text-text-secondary">
                        AWS Cloud Foundations
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-background-cream/80 dark:bg-[#24242A] border border-border-subtle text-[11px] font-bold text-text-secondary">
                        Architecture & Services
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-background-cream/80 dark:bg-[#24242A] border border-border-subtle text-[11px] font-bold text-text-secondary">
                        Deployment Models
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
