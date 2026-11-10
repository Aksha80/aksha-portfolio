import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { portfolioData } from '../data';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-[#0C0C0E]/90 backdrop-blur-[24px] border-b border-white/80 dark:border-[rgba(230,199,120,0.16)] py-3.5 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6)]' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand */}
        <a href="#" className="group flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#A88945] via-[#E6C778] to-[#FAF7ED] flex items-center justify-center text-[#0C0C0E] font-bold text-base shadow-md shadow-[#E6C778]/25 group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-text-primary group-hover:text-primary-500 transition-colors">
              AKSHA<span className="text-primary-500">.</span>
            </span>
            <span className="text-[10px] font-semibold text-text-muted tracking-widest uppercase -mt-1 hidden sm:block">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav - Floating Glass Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-white/65 dark:bg-[#141418]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-sm">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-white/90 dark:hover:bg-white/10 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action, Theme Toggle & Status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Open to Work
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          <a 
            href={portfolioData.resume || "/Aksha_Dadala_Resume.pdf"} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#A88945] hover:opacity-95 text-[#0C0C0E] font-semibold text-xs lg:text-sm transition-all shadow-[0_4px_18px_rgba(230,199,120,0.25)] hover:shadow-[0_6px_25px_rgba(230,199,120,0.4)] hover:-translate-y-0.5"
          >
            <FileText size={15} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Toggle & Quick Theme Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle className="w-9 h-9" />
          <button 
            className="p-2 rounded-xl bg-white/80 dark:bg-[#1C1C21] border border-white/90 dark:border-[rgba(230,199,120,0.16)] text-text-primary shadow-sm" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#0C0C0E]/98 backdrop-blur-[24px] border-b border-white/80 dark:border-[rgba(230,199,120,0.16)] flex flex-col items-center py-8 gap-5 md:hidden shadow-2xl"
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open to Work & Internships
            </div>

            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-text-secondary hover:text-primary-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={portfolioData.resume || "/Aksha_Dadala_Resume.pdf"} 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-2 px-6 py-3 mt-3 rounded-full bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#A88945] text-[#0C0C0E] font-semibold text-sm shadow-[0_4px_18px_rgba(230,199,120,0.25)]"
            >
              <FileText size={16} />
              View Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
