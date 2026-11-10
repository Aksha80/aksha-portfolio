import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ExternalLink, FolderGit2, ArrowLeft } from 'lucide-react';
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Reset state when project changes
  useEffect(() => {
    setActiveTab('overview');
    setZoom(100);
    setPan({ x: 0, y: 0 });
    setImgLoaded(false);
    setImgError(false);
    if (mobileScrollRef.current) mobileScrollRef.current.scrollTop = 0;
    if (desktopScrollRef.current) desktopScrollRef.current.scrollTop = 0;
  }, [project?.id]);

  // Lock background page scroll & handle Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Tab switching with scroll position reset
  const handleTabChange = (tabId: 'overview' | 'standOut' | 'techStack' | 'connect') => {
    setActiveTab(tabId);
    
    // On mobile, if user has scrolled past tabs into content, scroll back to tabs
    if (mobileScrollRef.current && tabsRef.current) {
      if (mobileScrollRef.current.scrollTop > tabsRef.current.offsetTop) {
        mobileScrollRef.current.scrollTo({
          top: tabsRef.current.offsetTop,
          behavior: 'smooth'
        });
      }
    }
    
    // On desktop, scroll content back to top
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Zoom handling
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 25, 100);
      if (newZoom === 100) setPan({ x: 0, y: 0 });
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

  // Pan boundary clamp helper
  const updatePan = (movementX: number, movementY: number) => {
    if (!imageContainerRef.current) return;
    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const scaledWidth = containerRect.width * (zoom / 100);
    const scaledHeight = containerRect.height * (zoom / 100);
    
    const maxX = Math.max(0, (scaledWidth - containerRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - containerRect.height) / 2);

    setPan(prev => {
      const newX = Math.max(-maxX, Math.min(maxX, prev.x + movementX));
      const newY = Math.max(-maxY, Math.min(maxY, prev.y + movementY));
      return { x: newX, y: newY };
    });
  };

  // Mouse pan handlers
  const handleDragStart = (e: React.MouseEvent) => {
    if (zoom <= 100) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 100) return;
    updatePan(e.movementX, e.movementY);
  };

  // Touch pan handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 100 || e.touches.length !== 1) return;
    setIsDragging(true);
    lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 100 || !lastTouchRef.current || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - lastTouchRef.current.x;
    const deltaY = currentY - lastTouchRef.current.y;
    lastTouchRef.current = { x: currentX, y: currentY };

    updatePan(deltaX, deltaY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTouchRef.current = null;
  };

  useEffect(() => {
    if (zoom === 100) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  // Shared Image Viewport
  const renderImageViewport = (heightClass: string) => (
    <div 
      className={`${heightClass} w-full relative overflow-hidden bg-black/60 flex items-center justify-center group select-none ${
        zoom > 100 ? (isDragging ? 'cursor-grabbing touch-none' : 'cursor-grab touch-none') : 'cursor-default touch-pan-y'
      }`}
      ref={imageContainerRef}
      onWheel={handleWheel}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onMouseMove={handleDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {!imgLoaded && !imgError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#141418] z-10">
          <div className="w-8 h-8 rounded-full border-2 border-primary-500/20 border-t-primary-500 animate-spin" />
          <span className="text-xs text-white/40 tracking-wider">Loading preview...</span>
        </div>
      )}

      {imgError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#141418]">
          <FolderGit2 className="text-primary-500/50 mb-2" size={36} />
          <span className="text-sm font-semibold text-white/80">{project.title}</span>
          <span className="text-xs text-white/40 mt-1">Preview image unavailable</span>
        </div>
      ) : (
        <motion.img 
          ref={imageRef}
          src={project.image} 
          alt={project.title}
          draggable={false}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            const fallback = `/${project.id === 'library-management' ? 'library_management.jpg' : 'intrusion_detection.jpg'}`;
            if (imageRef.current && !imageRef.current.src.endsWith(fallback)) {
              imageRef.current.src = fallback;
            } else {
              setImgError(true);
            }
          }}
          className={`w-full h-full object-contain md:object-cover select-none pointer-events-none transition-opacity duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          animate={{ 
            scale: zoom / 100,
            x: pan.x,
            y: pan.y
          }}
          transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
        />
      )}
    </div>
  );

  // Shared Zoom Controls Bar
  const renderZoomControls = () => (
    <div className="p-3 sm:p-4 flex items-center justify-center gap-3 sm:gap-4 bg-[#1C1C21]/95 backdrop-blur-sm border-t border-[rgba(230,199,120,0.16)] shrink-0">
      <button 
        type="button"
        onClick={handleZoomOut} 
        disabled={zoom <= 100} 
        className="p-1.5 sm:p-2 text-white/60 hover:text-white disabled:opacity-30 transition-colors active:scale-95 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Zoom out"
      >
        <ZoomOut size={18} />
      </button>
      <span className="text-xs sm:text-sm font-mono text-white/80 w-12 text-center select-none">{zoom}%</span>
      <button 
        type="button"
        onClick={handleZoomIn} 
        disabled={zoom >= 300} 
        className="p-1.5 sm:p-2 text-white/60 hover:text-white disabled:opacity-30 transition-colors active:scale-95 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Zoom in"
      >
        <ZoomIn size={18} />
      </button>
      <div className="w-px h-4 bg-white/10 mx-1 sm:mx-2"></div>
      <button 
        type="button"
        onClick={handleReset} 
        className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors uppercase tracking-wider px-2.5 py-1 rounded hover:bg-primary-500/10 active:scale-95 cursor-pointer"
      >
        Reset
      </button>
    </div>
  );

  // Shared Navigation Tabs Bar
  const renderTabsList = () => (
    <div className="flex items-center gap-2 sm:gap-6 min-w-max pr-6" role="tablist" aria-label="Project details sections">
      {[
        { id: 'overview', label: 'Overview' },
        { id: 'standOut', label: 'Stand Out' },
        { id: 'techStack', label: 'Tech Stack' },
        { id: 'connect', label: 'Connect' }
      ].map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          onClick={() => handleTabChange(tab.id as any)}
          className={`py-3.5 sm:py-4 px-3 sm:px-1 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer touch-manipulation select-none ${
            activeTab === tab.id ? 'text-primary-400 font-bold' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 pointer-events-none rounded-full"
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            />
          )}
        </button>
      ))}
    </div>
  );

  // Shared Tab Content Components
  const renderTabContent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="space-y-6 sm:space-y-8"
      >
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Executive Summary</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {project.summary || project.description[0]}
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Key Features</h3>
              <ul className="space-y-3">
                {project.description.map((desc: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1 font-bold shrink-0">•</span>
                    <span className="text-white/80 text-sm sm:text-base leading-relaxed">{desc}</span>
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
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold text-primary-300 mb-2">Problem Solving</h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {project.title.includes("Library") 
                    ? "Streamlined complex workflows (borrowing/returning) using automated Business Rules and UI Policies, significantly reducing manual overhead and ensuring data integrity."
                    : "Tackled network anomaly detection using robust Machine Learning models, effectively identifying malicious activities within large-scale datasets."}
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold text-primary-300 mb-2">Technical Focus</h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
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
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {project.technologies.map((tech: string) => (
                <div 
                  key={tech} 
                  className="px-4 py-2 bg-[#24242A] border border-[rgba(230,199,120,0.2)] text-primary-300 text-xs sm:text-sm font-medium rounded-full hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(230,199,120,0.2)] hover:bg-[#2c2c34] transition-all duration-300 cursor-default"
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
            
            <div className="flex flex-col gap-3 sm:gap-4">
              {project.link && project.link !== "#" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#A88945] hover:opacity-95 text-[#0C0C0E] font-bold rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-[0_4px_20px_rgba(230,199,120,0.25)]"
                >
                  <span className="font-semibold text-xs sm:text-sm tracking-wide">VIEW LIVE PROJECT</span>
                  <ExternalLink size={18} />
                </a>
              )}
              
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-[#24242A] hover:bg-[#2c2c34] text-[#FAF7ED] border border-[rgba(230,199,120,0.2)] hover:border-[#E6C778]/40 rounded-xl transition-all duration-300 hover:scale-[1.01]"
                >
                  <span className="font-semibold text-xs sm:text-sm tracking-wide">VIEW SOURCE CODE</span>
                  <FaGithub size={18} />
                </a>
              )}

              {(!project.link || project.link === "#") && !project.github && (
                <div className="p-4 sm:p-5 bg-white/5 border border-white/10 text-white/60 text-xs sm:text-sm rounded-xl text-center leading-relaxed">
                  Enterprise internal application on ServiceNow. Live demo and repository are restricted to organization members.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Back to Projects Action */}
        <div className="pt-8 border-t border-[rgba(230,199,120,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#A88945] text-[#0C0C0E] font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 active:scale-95 shadow-md shadow-[#E6C778]/20 cursor-pointer touch-manipulation"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </button>
          <span className="text-xs text-white/40 font-medium">
            End of project details
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center md:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop for Desktop */}
      <div 
        className="hidden md:block fixed inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container:
          - Mobile (< md): Full screen 100dvh, flex-col, overflow-hidden
          - Desktop (>= md): Centered luxury modal 88vh, max-w-6xl, flex-row
      */}
      <motion.div 
        className="fixed inset-0 md:relative md:inset-auto w-full md:max-w-6xl h-full md:h-[88vh] md:max-h-[88vh] bg-[#1C1C21] md:rounded-[26px] shadow-none md:shadow-[0_0_60px_rgba(0,0,0,0.85),_0_0_0_1px_rgba(230,199,120,0.18)] flex flex-col md:flex-row overflow-hidden z-10"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >

        {/* ======================================================== */}
        {/* MOBILE VIEW (Full height 100dvh, pinned header, scrollable body) */}
        {/* ======================================================== */}
        <div className="flex md:hidden flex-col h-full w-full bg-[#1C1C21] overflow-hidden">
          {/* Top Fixed Mobile Header: ALWAYS visible, above everything */}
          <header className="flex items-center justify-between px-4 py-3 bg-[#141418] border-b border-[rgba(230,199,120,0.16)] shrink-0 z-30 shadow-md">
            <button 
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#E6C778]/20 text-[#FAF7ED] border border-white/15 text-xs font-bold transition-all active:scale-95 cursor-pointer touch-manipulation"
              aria-label="Back to projects"
            >
              <ArrowLeft size={16} className="text-primary-400" />
              <span>Back</span>
            </button>

            {/* Brand Logo in Modal Header */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#A88945] via-[#E6C778] to-[#FAF7ED] flex items-center justify-center text-[#0C0C0E] font-bold text-xs shadow-sm">
                A
              </div>
              <span className="text-sm font-bold tracking-tight text-text-primary">
                AKSHA<span className="text-primary-500">.</span>
              </span>
            </div>

            <button 
              type="button"
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-95 cursor-pointer touch-manipulation"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </header>

          {/* Main Mobile Vertical Scroll Container (data-lenis-prevent ensures native touch scroll) */}
          <div 
            ref={mobileScrollRef}
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto styled-scrollbar overscroll-contain flex flex-col"
          >
            {/* 2. Image Viewport on Mobile */}
            <div className="shrink-0 bg-[#141418] border-b border-[rgba(230,199,120,0.16)]">
              {renderImageViewport('h-48 xs:h-56 sm:h-64')}
              {/* 3. Image Zoom Controls */}
              {renderZoomControls()}
            </div>

            {/* 4. Project Title and Category on Mobile */}
            <div className="px-5 pt-4 pb-3 bg-[#1C1C21] shrink-0">
              <span className="text-[10px] font-bold text-primary-500/90 uppercase tracking-widest block mb-1">
                {project.category || project.platform}
              </span>
              <h2 id="modal-title-mobile" className="text-xl font-bold text-white leading-snug">
                {project.title}
              </h2>
            </div>

            {/* 5. Sticky Navigation Tabs on Mobile */}
            <div 
              ref={tabsRef}
              className="sticky top-0 z-20 px-4 bg-[#1C1C21]/98 backdrop-blur-md border-y border-[rgba(230,199,120,0.16)] overflow-x-auto min-w-0 overscroll-x-contain touch-pan-x styled-scrollbar shrink-0 shadow-sm"
            >
              {renderTabsList()}
            </div>

            {/* 6. Scrollable Project Details Content */}
            <div 
              id={`tabpanel-mobile-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="px-5 pt-6 pb-32 flex-1"
            >
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (Preserved 2-column layout unchanged)       */}
        {/* ======================================================== */}
        <div className="hidden md:flex flex-row w-full h-full overflow-hidden">
          {/* Left Column: Image Viewer */}
          <div className="w-1/2 flex flex-col border-r border-[rgba(230,199,120,0.16)] bg-[#141418] h-full">
            <div className="p-4 flex items-center justify-between border-b border-[rgba(230,199,120,0.08)] bg-[#141418]/90 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-primary-400 tracking-wider">INSPECTION MODE: ACTIVE</span>
              </div>
            </div>
            
            <div className="flex-1 relative overflow-hidden bg-black/60">
              {renderImageViewport('h-full min-h-[420px]')}
            </div>

            {renderZoomControls()}
          </div>

          {/* Right Column: Content */}
          <div className="w-1/2 flex flex-col bg-[#1C1C21] h-full min-w-0 overflow-hidden">
            {/* Desktop Header */}
            <div className="flex justify-between items-start p-8 pb-4 shrink-0 border-b border-white/5">
              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors mb-2 cursor-pointer group/back"
                >
                  <ArrowLeft size={14} className="group-hover/back:-translate-x-0.5 transition-transform" />
                  <span>Back to Projects</span>
                </button>
                <span className="text-xs font-bold text-primary-500/90 uppercase tracking-widest block mb-1">
                  {project.category || project.platform}
                </span>
                <h2 id="modal-title" className="text-2xl font-bold text-white pr-8 leading-tight">
                  {project.title}
                </h2>
              </div>
              <button 
                type="button"
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 hover:rotate-90 rounded-full transition-all duration-300 -mr-2 -mt-2 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Desktop Tabs Navigation */}
            <div className="px-8 border-b border-[rgba(230,199,120,0.16)] overflow-x-auto min-w-0 styled-scrollbar shrink-0">
              {renderTabsList()}
            </div>

            {/* Desktop Tab Content (Independent scroll) */}
            <div 
              ref={desktopScrollRef}
              data-lenis-prevent
              id={`tabpanel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="p-8 overflow-y-auto flex-1 styled-scrollbar pb-12"
            >
              {renderTabContent()}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
