import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data';
import { ArrowRight, FileText, Sparkles, Cloud, Code } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useRef } from 'react';

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Info Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/90 shadow-[0_4px_16px_rgba(139,43,226,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-primary-600 flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary-500" />
              {portfolioData.role}
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-text-primary leading-[1.06]">
            Hi, I'm <br />
            <span className="text-gradient drop-shadow-sm">{portfolioData.name}</span>
          </h1>
          
          {/* Bio Description */}
          <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed font-normal">
            Computer Science engineer crafting scalable software solutions. Specializing in <span className="font-semibold text-text-primary">ServiceNow development</span>, <span className="font-semibold text-text-primary">Machine Learning</span>, and modern full-stack web applications.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg py-1">
            <div className="glass p-3.5 rounded-2xl flex flex-col border border-white/90">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Academics</span>
              <span className="text-lg font-bold text-text-primary mt-0.5">8.67 <span className="text-xs font-semibold text-primary-600">GPA</span></span>
            </div>
            <div className="glass p-3.5 rounded-2xl flex flex-col border border-white/90">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Certifications</span>
              <span className="text-lg font-bold text-text-primary mt-0.5">6+ <span className="text-xs font-semibold text-primary-600">Global</span></span>
            </div>
            <div className="glass p-3.5 rounded-2xl flex flex-col border border-white/90">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Focus</span>
              <span className="text-lg font-bold text-text-primary mt-0.5">Cloud & ML</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a 
              href="#projects" 
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#A88945] text-[#0C0C0E] font-semibold text-sm lg:text-base hover:opacity-95 transition-all shadow-[0_10px_30px_-5px_rgba(230,199,120,0.3)] hover:shadow-[0_15px_35px_-5px_rgba(230,199,120,0.45)] hover:-translate-y-0.5"
            >
              <span>View My Work</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={portfolioData.resume || "/Aksha_Dadala_Resume.pdf"} 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#A88945] text-[#0C0C0E] font-semibold text-sm lg:text-base hover:opacity-95 transition-all shadow-[0_10px_30px_-5px_rgba(230,199,120,0.3)] hover:shadow-[0_15px_35px_-5px_rgba(230,199,120,0.45)] hover:-translate-y-0.5"
            >
              <FileText size={18} className="group-hover:-translate-y-0.5 transition-transform text-[#0C0C0E]" />
              <span>View Resume</span>
            </a>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-4 mt-3 relative z-20">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Connect:</span>
            <div className="flex items-center gap-3">
              <a 
                href={portfolioData.socials.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                title="GitHub Profile"
                className="w-10 h-10 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-text-primary hover:scale-110 hover:shadow-md transition-all cursor-pointer"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href={portfolioData.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="w-10 h-10 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-[#0A66C2] dark:hover:text-[#E6C778] hover:scale-110 hover:shadow-md transition-all cursor-pointer"
              >
                <FaLinkedin size={20} />
              </a>
              {portfolioData.socials.leetcode && (
                <a 
                  href={portfolioData.socials.leetcode} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LeetCode"
                  title="LeetCode Profile"
                  className="w-10 h-10 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-[#FFA116] hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                >
                  <SiLeetcode size={18} />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Photo Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
        >
          {/* Floating animation wrapper */}
          <motion.div 
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-80 h-80 sm:w-96 sm:h-96"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            {/* Soft outer glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E6C778]/15 via-[#A88945]/15 to-[#E6C778]/10 rounded-[3rem] blur-2xl animate-pulse opacity-60 pointer-events-none"></div>
            
            {/* 3D tilt container */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full rounded-[3rem] p-1.5 bg-gradient-to-tr from-[#E6C778]/35 via-[rgba(230,199,120,0.16)] to-[#A88945]/35 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] overflow-hidden group"
            >
              {/* Animated Light sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 overflow-hidden rounded-[2.8rem]">
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-30deg] group-hover:animate-[sweep_1.5s_ease-in-out_infinite]"></div>
              </div>
              
              {/* Inner rim and Image */}
              <div className="w-full h-full rounded-[2.7rem] overflow-hidden bg-background-cream relative z-10 shadow-inner">
                <img 
                  src="/profile.jpg" 
                  alt={`Portrait of ${portfolioData.name}, Software Engineer`} 
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle light gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Floating Floating Pill 1 (Top-Left) */}
            <div className="absolute -top-3 -left-4 z-30 glass border border-white/95 dark:border-white/15 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 pointer-events-none">
              <div className="w-7 h-7 rounded-xl bg-primary-500/15 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <Code size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Expertise</span>
                <span className="text-xs font-bold text-text-primary">ServiceNow & Java</span>
              </div>
            </div>

            {/* Floating Pill 2 (Bottom-Right) */}
            <div className="absolute -bottom-3 -right-4 z-30 glass border border-white/95 dark:border-white/15 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 pointer-events-none">
              <div className="w-7 h-7 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Cloud size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Cloud Certified</span>
                <span className="text-xs font-bold text-text-primary">AWS & Google Cloud</span>
              </div>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
