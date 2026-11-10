import { portfolioData } from '../data';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 border-t border-white/80 dark:border-[rgba(230,199,120,0.16)] bg-background-cream/80 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Copy */}
        <div className="text-center md:text-left">
          <a href="#" className="inline-flex items-center gap-2 text-xl font-bold text-text-primary tracking-tight mb-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#A88945] via-[#E6C778] to-[#FAF7ED] flex items-center justify-center text-[#0C0C0E] text-xs font-bold shadow-sm shadow-[#E6C778]/20">
              A
            </span>
            <span>AKSHA<span className="text-primary-500">.</span></span>
          </a>
          <p className="text-text-secondary text-xs sm:text-sm font-normal">
            Designed & crafted with precision for high-impact software engineering.
          </p>
          <p className="text-text-muted text-xs mt-1">
            © {CURRENT_YEAR} {portfolioData.name}. All rights reserved.
          </p>
        </div>

        {/* Quick Links & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <a 
              href={portfolioData.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              title="GitHub Profile"
              className="w-10 h-10 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-text-primary hover:scale-110 transition-all shadow-sm cursor-pointer"
            >
              <FaGithub size={18} />
            </a>
            <a 
              href={portfolioData.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              title="LinkedIn Profile"
              className="w-10 h-10 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-[#0A66C2] dark:hover:text-[#E6C778] hover:scale-110 transition-all shadow-sm cursor-pointer"
            >
              <FaLinkedin size={18} />
            </a>
            {portfolioData.socials.leetcode && (
              <a 
                href={portfolioData.socials.leetcode} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LeetCode"
                title="LeetCode Profile"
                className="w-10 h-10 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-[#FFA116] hover:scale-110 transition-all shadow-sm cursor-pointer"
              >
                <SiLeetcode size={16} />
              </a>
            )}
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] hover:bg-white dark:hover:bg-[#1C1C21] hover:border-[#E6C778]/40 text-text-secondary hover:text-primary-500 transition-all text-xs font-semibold shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
