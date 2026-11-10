import { useTheme } from '../context/useTheme';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-10 h-10 rounded-full glass border border-white/80 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -60, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 60, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-[#E6C778] drop-shadow-[0_0_8px_rgba(230,199,120,0.6)]"
          >
            <Sun size={19} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 60, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 60, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-[#A88945] drop-shadow-[0_0_8px_rgba(168,137,69,0.3)]"
          >
            <Moon size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
