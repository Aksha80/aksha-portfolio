import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { User, Award, MapPin, CheckCircle2, Users, Sparkles, BookOpen } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20"
        >
          <div className="kicker-pill mb-4">
            <Sparkles size={13} />
            <span>01 // About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
            Engineering Scalable Systems <br className="hidden sm:inline" />
            <span className="text-gradient">With Purpose & Leadership</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Who I Am Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 h-full"
          >
            <div className="glass-card p-8 md:p-10 rounded-[32px] h-full flex flex-col justify-between relative overflow-hidden border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-xl group">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#E6C778]/10 to-[#A88945]/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
              
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#A88945] via-[#E6C778] to-[#FAF7ED] flex items-center justify-center text-[#0C0C0E] mb-6 shadow-lg shadow-[#E6C778]/20">
                  <User size={26} />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                  Who I Am
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-6">
                  Software Engineer & Solution Builder
                </p>

                <p className="text-text-secondary leading-relaxed text-base md:text-lg mb-8 font-normal">
                  {portfolioData.about}
                </p>

                {/* Key Pillars */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 font-semibold text-xs">
                    ⚡ Scalable Systems
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 font-semibold text-xs">
                    🤝 Empathetic Leader
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 font-semibold text-xs">
                    🎯 Detail Oriented
                  </span>
                </div>
              </div>

              {/* Location & Status Card Footer */}
              <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-text-secondary text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary-500" size={18} />
                  <span className="font-semibold text-text-primary">Based in {portfolioData.location}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Open to Opportunities
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Certifications & Leadership */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Certifications Showcase */}
            <div className="glass-card p-8 md:p-9 rounded-[32px] border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/15 text-primary-500 flex items-center justify-center shadow-sm">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                      Industry Certifications
                    </h3>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Verified Technical Credentials
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 font-bold text-xs">
                  6+ Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {portfolioData.certifications.map((cert, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/75 dark:bg-[#1C1C21] border border-white/90 dark:border-[rgba(230,199,120,0.16)] hover:border-primary-500/35 hover:bg-white dark:hover:bg-[#24242A] transition-all shadow-sm flex items-start gap-3 group"
                  >
                    <CheckCircle2 size={16} className="text-primary-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership & Activities */}
            <div className="glass-card p-8 md:p-9 rounded-[32px] border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/15 text-primary-500 flex items-center justify-center shadow-sm">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                      Leadership & Initiatives
                    </h3>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Coordinating Events & Community Impact
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs">
                  Active Leader
                </span>
              </div>

              <div className="space-y-3.5">
                {portfolioData.leadership.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-white/75 dark:bg-[#1C1C21] border border-white/90 dark:border-[rgba(230,199,120,0.16)] hover:border-primary-500/35 hover:bg-white dark:hover:bg-[#24242A] transition-all shadow-sm flex items-start gap-3.5 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <BookOpen size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-text-primary group-hover:text-primary-500 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
