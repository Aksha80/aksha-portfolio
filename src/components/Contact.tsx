import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { Mail, MapPin, Phone, Sparkles, Copy, Check, Clock, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const presetTopics = [
  {
    label: "💼 Role / Job Offer",
    message: "Hello Aksha, I reviewed your portfolio and would like to discuss a job / software engineering opportunity with you."
  },
  {
    label: "⚙️ ServiceNow Project",
    message: "Hello Aksha, I would like to collaborate with you on a ServiceNow development / automation project."
  },
  {
    label: "💻 Web / Software Project",
    message: "Hello Aksha, I have a development project and would like to discuss working together."
  },
  {
    label: "👋 General Inquiry",
    message: "Hello Aksha, I came across your portfolio and wanted to connect with you!"
  }
];

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const defaultMsg = "Hello Aksha, I came across your portfolio and would like to discuss an opportunity or project with you.";
  const [message, setMessage] = useState(defaultMsg);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const cleanPhone = portfolioData.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleTopicSelect = (topicLabel: string, topicMsg: string) => {
    setSelectedTopic(topicLabel);
    setMessage(topicMsg);
  };

  return (
    <section id="contact" className="py-24 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 md:mb-18 text-center"
        >
          <div className="kicker-pill mb-3 mx-auto">
            <Sparkles size={13} />
            <span>06 // Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
            Let's Connect & <span className="text-gradient">Collaborate</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-base md:text-lg mt-3 font-normal">
            Directly connect with me on WhatsApp for software engineering opportunities, ServiceNow projects, and client inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct Contact Channels */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Phone & Direct WhatsApp Card */}
            <div className="glass-card p-6 md:p-7 rounded-[28px] border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-lg relative group transition-all duration-300 hover:border-primary-500/35">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-primary-500/15 rounded-2xl flex items-center justify-center text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={22} />
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello Aksha, I am contacting you from your portfolio.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    title="Direct WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(portfolioData.phone, 'phone')}
                    className="p-2 rounded-xl bg-white/70 dark:bg-[#1C1C21] hover:bg-white dark:hover:bg-[#24242A] border border-white/90 dark:border-[rgba(230,199,120,0.16)] text-text-muted hover:text-primary-500 transition-all text-xs font-semibold flex items-center gap-1.5"
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copiedPhone ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Direct Phone & WhatsApp</h3>
              <a 
                href={`tel:${portfolioData.phone}`} 
                className="text-base sm:text-lg font-bold text-text-primary hover:text-primary-500 transition-colors block"
              >
                {portfolioData.phone}
              </a>
            </div>

            {/* Email Card */}
            <div className="glass-card p-6 md:p-7 rounded-[28px] border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-lg relative group transition-all duration-300 hover:border-primary-500/35">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-primary-500/15 rounded-2xl flex items-center justify-center text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.email, 'email')}
                  className="p-2 rounded-xl bg-white/70 dark:bg-[#1C1C21] hover:bg-white dark:hover:bg-[#24242A] border border-white/90 dark:border-[rgba(230,199,120,0.16)] text-text-muted hover:text-primary-500 transition-all text-xs font-semibold flex items-center gap-1.5"
                  title="Copy email"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Direct Email</h3>
              <a 
                href={`mailto:${portfolioData.email}`} 
                className="text-base sm:text-lg font-bold text-text-primary hover:text-primary-500 transition-colors block break-all"
              >
                {portfolioData.email}
              </a>
            </div>

            {/* Location & Timezone Card */}
            <div className="glass-card p-6 md:p-7 rounded-[28px] border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-lg relative group transition-all duration-300 hover:border-primary-500/35">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-primary-500/15 rounded-2xl flex items-center justify-center text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={22} />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#1C1C21] border border-white dark:border-[rgba(230,199,120,0.16)] text-xs font-semibold text-text-secondary">
                  <Clock size={12} className="text-primary-500" />
                  <span>IST (UTC+5:30)</span>
                </div>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Location</h3>
              <p className="text-base sm:text-lg font-bold text-text-primary">
                {portfolioData.location}
              </p>
            </div>

            {/* Social & Coding Profiles Card */}
            <div className="glass-card p-6 md:p-7 rounded-[28px] border border-white/90 dark:border-[rgba(230,199,120,0.16)] shadow-lg relative group transition-all duration-300 hover:border-primary-500/35">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Online Profiles</h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 dark:bg-[#1C1C21] hover:bg-white dark:hover:bg-[#24242A] border border-white/90 dark:border-[rgba(230,199,120,0.16)] text-xs font-semibold text-text-primary hover:scale-105 transition-all shadow-sm cursor-pointer"
                >
                  <FaGithub size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={portfolioData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 dark:bg-[#1C1C21] hover:bg-white dark:hover:bg-[#24242A] border border-white/90 dark:border-[rgba(230,199,120,0.16)] text-xs font-semibold text-text-primary hover:text-[#0A66C2] dark:hover:text-[#E6C778] hover:scale-105 transition-all shadow-sm cursor-pointer"
                >
                  <FaLinkedin size={15} />
                  <span>LinkedIn</span>
                </a>
                {portfolioData.socials.leetcode && (
                  <a
                    href={portfolioData.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LeetCode Profile"
                    title="LeetCode Profile"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 dark:bg-[#1C1C21] hover:bg-white dark:hover:bg-[#24242A] border border-white/90 dark:border-[rgba(230,199,120,0.16)] text-xs font-semibold text-text-primary hover:text-[#FFA116] hover:scale-105 transition-all shadow-sm cursor-pointer"
                  >
                    <SiLeetcode size={14} />
                    <span>LeetCode</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct WhatsApp Connection Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-7 sm:p-9 md:p-10 rounded-[32px] border border-white/95 dark:border-[rgba(230,199,120,0.16)] shadow-xl flex flex-col gap-5 relative overflow-hidden">
              
              {/* Subtle WhatsApp Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#25D366]/10 rounded-full blur-[70px] pointer-events-none" />
              
              {/* Header with status badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight flex items-center gap-2.5">
                    <span>Direct WhatsApp Chat</span>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#25D366]/15 text-[#25D366]">
                      <WhatsAppIcon className="w-5 h-5 fill-current" />
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm font-normal text-text-secondary mt-1">
                    Clients can message me directly on WhatsApp with pre-filled inquiries.
                  </p>
                </div>

                <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Fast Response</span>
                </div>
              </div>

              {/* Quick Topic Chips */}
              <div className="space-y-2 relative z-10">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                  Select Quick Topic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {presetTopics.map((topic, i) => {
                    const isSelected = selectedTopic === topic.label;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleTopicSelect(topic.label, topic.message)}
                        className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between ${
                          isSelected 
                            ? 'bg-primary-500/15 text-primary-600 dark:text-primary-300 border-primary-500/40 shadow-sm'
                            : 'bg-white/60 dark:bg-[#141418] hover:bg-white/90 dark:hover:bg-[#1C1C21] text-text-secondary hover:text-text-primary border-white/90 dark:border-white/10'
                        }`}
                      >
                        <span>{topic.label}</span>
                        {isSelected && <Check size={13} className="text-primary-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* WhatsApp Message Preview / Edit Box */}
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <label htmlFor="wa-message" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Message Preview
                  </label>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Ready to send
                  </span>
                </div>
                
                <textarea 
                  id="wa-message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setSelectedTopic(null);
                  }}
                  rows={3}
                  className="w-full bg-white/70 dark:bg-[#141418] border border-white/90 dark:border-[rgba(230,199,120,0.16)] rounded-2xl p-4 text-text-primary text-sm focus:outline-none focus:bg-white dark:focus:bg-[#1C1C21] focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 shadow-sm transition-all resize-none leading-relaxed"
                  placeholder="Type your WhatsApp message..."
                />
              </div>

              {/* Primary Direct WhatsApp Button */}
              <div className="relative z-10 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#20BD5A] to-[#128C7E] hover:opacity-95 text-white font-extrabold text-sm sm:text-base tracking-wide transition-all flex items-center justify-center gap-3 shadow-[0_12px_30px_-5px_rgba(37,211,102,0.38)] hover:shadow-[0_18px_35px_-5px_rgba(37,211,102,0.52)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Connect on WhatsApp Directly</span>
                  <ExternalLink size={17} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Subtext info */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted mt-3 px-1 gap-1.5">
                  <span className="flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-500" />
                    <span>Direct text to <strong>{portfolioData.phone}</strong></span>
                  </span>
                  <span className="text-[11px] text-text-muted font-medium">Opens WhatsApp App or Web</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
