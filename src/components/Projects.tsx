import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { ExternalLink, FolderGit2, Sparkles, ZoomIn, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { ProjectModal } from './ProjectModal';

function ProjectCard({ project, index, onOpen }: { project: any, index: number, onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass-card h-full rounded-[32px] p-8 md:p-10 relative overflow-hidden group transform-gpu border border-white/95 dark:border-[rgba(230,199,120,0.16)] shadow-xl hover:shadow-2xl transition-all"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#E6C778]/0 to-[#A88945]/0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:from-[#E6C778]/10 group-hover:to-[#A88945]/5 pointer-events-none rounded-[32px]"
          style={{ transform: "translateZ(-10px)" }}
        />

        <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(30px)" }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#A88945] via-[#E6C778] to-[#FAF7ED] flex items-center justify-center text-[#0C0C0E] shadow-lg shadow-[#E6C778]/20">
            <FolderGit2 size={26} />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-primary-500/10 dark:bg-primary-500/20 border border-primary-500/25 dark:border-primary-400/30 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider">
              {project.category || project.platform}
            </span>
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub Repository"
                className="w-9 h-9 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-text-primary hover:scale-110 transition-all"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Live Link"
                className="w-9 h-9 rounded-full glass border border-white/90 dark:border-[rgba(230,199,120,0.16)] flex items-center justify-center text-text-secondary hover:text-primary-500 hover:scale-110 transition-all"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="flex-1 flex flex-col">
          <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2 group-hover:text-primary-500 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-primary-500 font-bold text-xs uppercase tracking-wider mb-6">
            Platform: {project.platform}
          </p>
          
          <ul className="space-y-3 mb-8">
            {project.description.map((desc: string, i: number) => (
              <li key={i} className="flex gap-3 text-text-secondary text-sm md:text-base leading-relaxed font-normal">
                <CheckCircle2 size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-6" style={{ transform: "translateZ(20px)" }}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="text-xs font-semibold px-3 py-1.5 bg-white/80 dark:bg-[#24242A] rounded-xl text-text-primary border border-white dark:border-[rgba(230,199,120,0.16)] shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                {tech}
              </span>
            ))}
          </div>
          
          <button 
            onClick={onOpen}
            className="w-full py-4 px-6 bg-gradient-to-r from-primary-500/10 via-primary-500/20 to-primary-500/10 hover:from-[#A88945] hover:to-[#E6C778] text-primary-500 hover:text-[#0C0C0E] border border-[rgba(230,199,120,0.3)] hover:border-transparent rounded-2xl font-bold tracking-wider text-xs uppercase transition-all duration-300 shadow-sm hover:shadow-[0_10px_25px_-5px_rgba(230,199,120,0.35)] flex items-center justify-center gap-2 group/btn"
          >
            <ZoomIn size={16} className="group-hover/btn:scale-110 transition-transform" />
            <span>Explore Case Study & Architecture</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-28 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20 text-center md:text-left"
        >
          <div className="kicker-pill mb-3">
            <Sparkles size={13} />
            <span>05 // Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mt-2 font-normal">
            Enterprise application development, machine learning evaluations, and custom automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {portfolioData.projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} onOpen={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
