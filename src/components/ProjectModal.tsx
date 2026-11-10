import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'standOut' | 'techStack' | 'connect'>('overview');
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Body scroll lock & Focus management
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Zoom handling
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 25, 100);
      if (newZoom === 100) setPan({ x: 0, y: 0 }); // Reset pan if back to 100%
      return newZoom;
    });
  };
  const handleReset = () => {
    setZoom(100);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) handleZoomIn();
      else handleZoomOut();
    }
  };

  // Pan handling
  const handleDragStart = () => {
    if (zoom <= 100) return;
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || zoom <= 100 || !imageContainerRef.current || !imageRef.current) return;
    
    let movementX, movementY;

    if ('touches' in e) {
       // simple touch implementation, skipping precise movement calc for simplicity
       return; 
    } else {
       movementX = (e as React.MouseEvent).movementX;
       movementY = (e as React.MouseEvent).movementY;
    }

    setPan(prev => {
      let newX = prev.x + movementX;
      let newY = prev.y + movementY;

      // Calculate boundaries
      const containerRect = imageContainerRef.current!.getBoundingClientRect();
      // the actual displayed size of the image is container size * zoom / 100
      const scaledWidth = containerRect.width * (zoom / 100);
      const scaledHeight = containerRect.height * (zoom / 100);
      
      const maxX = (scaledWidth - containerRect.width) / 2;
      const maxY = (scaledHeight - containerRect.height) / 2;

      // Clamp pan
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      return { x: newX, y: newY };
    });
  };
  
  useEffect(() => {
    // If zoom changes, re-clamp the pan just in case
    if (zoom === 100) {
       setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div 
          className="relative w-full max-w-6xl max-h-[90vh] bg-[#1C1C21] rounded-[24px] shadow-[0_0_60px_rgba(0,0,0,0.8),_0_0_0_1px_rgba(230,199,120,0.16)] overflow-hidden flex flex-col md:flex-row z-10"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close Button (Mobile Absolute) */}
          <button 
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-[#E6C778]/20 text-white rounded-full transition-all"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Left Column: Image Viewer */}
          <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-[rgba(230,199,120,0.16)] bg-[#141418]">
            <div className="p-4 flex items-center gap-2 border-b border-[rgba(230,199,120,0.08)]">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-primary-400 tracking-wider">INSPECTION MODE: ACTIVE</span>
            </div>
            
            <div 
              className="flex-1 relative overflow-hidden bg-black/50 group"
              ref={imageContainerRef}
              onWheel={handleWheel}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onMouseMove={handleDrag}
              style={{ cursor: zoom > 100 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              {project.image ? (
                 <motion.img 
                  ref={imageRef}
                  src={project.image} 
                  alt={project.title}
                  draggable={false}
                  className="w-full h-full object-cover select-none"
                  animate={{ 
                    scale: zoom / 100,
                    x: pan.x,
                    y: pan.y
                  }}
                  transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="p-4 flex items-center justify-center gap-4 bg-[#1C1C21]/90 backdrop-blur-sm border-t border-[rgba(230,199,120,0.16)]">
              <button onClick={handleZoomOut} disabled={zoom <= 100} className="p-2 text-white/60 hover:text-white disabled:opacity-30 transition-colors">
                <ZoomOut size={18} />
              </button>
              <span className="text-sm font-mono text-white/80 w-12 text-center">{zoom}%</span>
              <button onClick={handleZoomIn} disabled={zoom >= 300} className="p-2 text-white/60 hover:text-white disabled:opacity-30 transition-colors">
                <ZoomIn size={18} />
              </button>
              <div className="w-px h-4 bg-white/10 mx-2"></div>
              <button onClick={handleReset} className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors uppercase tracking-wider px-2 py-1 rounded hover:bg-primary-500/10">
                Reset
              </button>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-1/2 flex flex-col bg-[#1C1C21] h-[50vh] md:h-auto">
            {/* Header (Desktop) */}
            <div className="hidden md:flex justify-between items-start p-8 pb-4">
              <h2 id="modal-title" className="text-2xl font-bold text-white pr-8 leading-tight">
                {project.title}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 hover:rotate-90 rounded-full transition-all duration-300 -mr-2 -mt-2"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="md:hidden p-6 pb-2">
               <h2 id="modal-title" className="text-xl font-bold text-white pr-8 leading-tight">
                {project.title}
              </h2>
            </div>

            {/* Tabs Navigation */}
            <div className="px-6 md:px-8 border-b border-[rgba(230,199,120,0.16)] overflow-x-auto hide-scrollbar">
              <div className="flex space-x-6 min-w-max" role="tablist">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'standOut', label: 'Stand Out' },
                  { id: 'techStack', label: 'Tech Stack' },
                  { id: 'connect', label: 'Connect' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 text-sm font-semibold transition-colors relative ${
                      activeTab === tab.id ? 'text-primary-400' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 styled-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Executive Summary</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {project.summary || project.description[0]}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {project.description.map((desc: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-primary-500 mt-1">•</span>
                              <span className="text-white/80 text-sm leading-relaxed">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Stand Out Tab */}
                  {activeTab === 'standOut' && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Why This Project Stands Out</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                          <h4 className="text-sm font-semibold text-primary-300 mb-2">Problem Solving</h4>
                          <p className="text-sm text-white/70 leading-relaxed">
                            {project.title.includes("Library") 
                              ? "Streamlined complex workflows (borrowing/returning) using automated Business Rules and UI Policies, significantly reducing manual overhead and ensuring data integrity."
                              : "Tackled network anomaly detection using robust Machine Learning models, effectively identifying malicious activities within large-scale datasets."}
                          </p>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                          <h4 className="text-sm font-semibold text-primary-300 mb-2">Technical Focus</h4>
                          <p className="text-sm text-white/70 leading-relaxed">
                            {project.title.includes("Library")
                              ? "Implemented strong role-based access control (ACLs) and structured data relationships across multiple tables within the ServiceNow Platform."
                              : "Leveraged SMOTE and advanced normalization techniques to overcome data imbalance, improving the accuracy and reliability of the classifiers."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Tab */}
                  {activeTab === 'techStack' && (
                    <div>
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Core Technologies</h3>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech: string) => (
                          <div 
                            key={tech} 
                            className="px-4 py-2 bg-[#24242A] border border-[rgba(230,199,120,0.2)] text-primary-300 text-sm font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(230,199,120,0.2)] hover:bg-[#2c2c34] transition-all duration-300 cursor-default"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Connect Tab */}
                  {activeTab === 'connect' && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Project Links</h3>
                      
                      <div className="flex flex-col gap-4">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#A88945] hover:opacity-95 text-[#0C0C0E] font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_rgba(230,199,120,0.25)]"
                          >
                            <span className="font-semibold text-sm tracking-wide">VIEW LIVE PROJECT</span>
                            <ExternalLink size={20} />
                          </a>
                        )}
                        
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-between p-4 bg-[#24242A] hover:bg-[#2c2c34] text-[#FAF7ED] border border-[rgba(230,199,120,0.2)] hover:border-[#E6C778]/40 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                          >
                            <span className="font-semibold text-sm tracking-wide">VIEW SOURCE CODE</span>
                            <FaGithub size={20} />
                          </a>
                        )}

                        {!project.link && !project.github && (
                           <div className="p-4 bg-white/5 border border-white/10 text-white/50 text-sm rounded-xl text-center">
                             No public links available for this project.
                           </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
