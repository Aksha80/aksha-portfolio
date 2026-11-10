import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    // If it has already completed, do not run again
    if (isCompletedRef.current) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      isCompletedRef.current = true;
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          isCompletedRef.current = true;
          if (onCompleteRef.current) onCompleteRef.current();
          // Remove preloader container entirely
          if (containerRef.current) {
            gsap.set(containerRef.current, { display: "none" });
          }
        }
      });

      // Start Sequence
      
      // 1. AKSHA Branding Appears
      tl.addLabel("brandMark", "+=0.2")
        .fromTo(".preloader-logo", 
          { opacity: 0, scale: 0.92, y: 15 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 
          "brandMark"
        );

      // 2. Ripples
      tl.addLabel("ripples", "+=0.1")
        .fromTo(".ripple-1", { scale: 0.7, opacity: 0 }, { scale: 1.4, opacity: 0.5, duration: 2, ease: "power2.out" }, "ripples")
        .fromTo(".ripple-2", { scale: 0.7, opacity: 0 }, { scale: 1.8, opacity: 0.2, duration: 2, ease: "power2.out" }, "ripples+=0.2")
        .fromTo(".ripple-3", { scale: 0.7, opacity: 0 }, { scale: 2.2, opacity: 0.1, duration: 2, ease: "power2.out" }, "ripples+=0.4");

      // 3. Photo Reveal
      tl.addLabel("photo", "-=1.5")
        .fromTo(".preloader-photo", 
          { opacity: 0, scale: 0.75, y: 20 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 
          "photo"
        );

      // 4. Name
      tl.addLabel("name", "-=0.3")
        .fromTo(".brand-name",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "name"
        );

      // 5. Title
      tl.addLabel("title", "-=0.2")
        .fromTo(".brand-title",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "title"
        );

      // 6. Loading Bar Reveal
      tl.addLabel("bar", "-=0.2")
        .fromTo(".loading-container", 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "bar"
        );

      // 7. Loading Progress
      const progressObj = { value: 0 };
      tl.addLabel("loading", "+=0.1")
        // Fill bar scale
        .to(".progress-fill", { scaleX: 1, duration: 1.4, ease: "power1.inOut" }, "loading")
        // Number update
        .to(progressObj, {
          value: 100,
          duration: 1.4,
          ease: "power1.inOut",
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = `${Math.round(progressObj.value)}%`;
            }
          },
          onComplete: () => {
            if (textRef.current) {
              textRef.current.textContent = "READY";
            }
          }
        }, "loading");

      // 8. Preloader Exit (Wipe Panels)
      tl.addLabel("exit", "+=0.3")
        // Fade out inner content
        .to(".preloader-content", {
           opacity: 0,
           duration: 0.4,
           ease: "power2.inOut"
        }, "exit")
        // 3 Vertical Panels slide up smoothly to reveal portfolio
        .to(".preloader-panel", {
           yPercent: -100,
           duration: 1.2,
           stagger: 0.12,
           ease: "expo.inOut"
        }, "exit+=0.1")
        // Fade out container just in case
        .to(containerRef.current, {
           opacity: 0,
           duration: 0.5
        }, "exit+=1.0");

    }, containerRef); // Scope to container

    return () => {
      if (!isCompletedRef.current) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-transparent pointer-events-auto">
      
      {/* 3 Vertical Panels that cover the screen */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <div className="preloader-panel relative w-1/3 h-full bg-[#1E1B17] dark:bg-[#0C0C0E]"></div>
        <div className="preloader-panel relative w-1/3 h-full bg-[#242019] dark:bg-[#141418]"></div>
        <div className="preloader-panel relative w-1/3 h-full bg-[#2A261F] dark:bg-[#1C1C21]"></div>
        
        {/* Subtle animated ambient gradients over the panels */}
        <div className="preloader-panel absolute inset-0 z-10 pointer-events-none opacity-60">
          <div className="absolute top-[15%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#E6C778]/10 dark:bg-[#E6C778]/10 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-[#A88945]/10 dark:bg-[#A88945]/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="preloader-content relative z-20 flex flex-col items-center justify-center w-full text-center px-6">
        
        {/* AKSHA Branding */}
        <h1 className="preloader-logo text-3xl md:text-4xl font-extrabold tracking-[4px] text-[#FAF7ED] dark:text-[#FAF7ED] mb-6 md:mb-8">
          AKSHA<span className="text-primary-500">.</span>
        </h1>

        {/* Full Circle Photo & Ripples */}
        <div className="relative flex flex-col items-center justify-center mb-10 md:mb-12">
          
          {/* Ripples */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="ripple-1 absolute w-[100%] h-[100%] rounded-full border border-primary-500/30 bg-transparent"></div>
            <div className="ripple-2 absolute w-[100%] h-[100%] rounded-full border border-primary-500/15 bg-transparent"></div>
            <div className="ripple-3 absolute w-[100%] h-[100%] rounded-full border border-primary-500/5 bg-transparent"></div>
          </div>
          
          {/* Circular Photo */}
          <div className="preloader-photo relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full p-[3px] bg-[#2A261F] dark:bg-[#1C1C21] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-primary-500/40 z-10 flex items-center justify-center">
            
            {/* Inner frame/glow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(230,199,120,0.2)] pointer-events-none z-20"></div>
            
            <img 
              src="/profile.jpg" 
              alt="Aksha Dadala" 
              className="w-full h-full object-cover object-[center_20%] rounded-full relative z-10"
            />
          </div>
        </div>

        {/* Brand Text below Photo */}
        <div className="flex flex-col items-center gap-3 mb-10 md:mb-12">
          <h2 className="brand-name text-3xl sm:text-4xl md:text-5xl font-black text-[#FAF7ED] dark:text-[#FAF7ED] tracking-wider drop-shadow-sm">
            AKSHA DADALA
          </h2>
          <div className="brand-title inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#24242A] dark:bg-[#24242A] border border-[rgba(230,199,120,0.25)] dark:border-[rgba(230,199,120,0.25)] text-[#E6C778] dark:text-[#E6C778] font-extrabold text-xs sm:text-sm tracking-[0.22em] uppercase shadow-sm backdrop-blur-md">
            <span>Software Engineer & Developer</span>
          </div>
        </div>

        {/* Loading Bar Section */}
        <div className="loading-container flex flex-col items-center w-full">
          <div className="flex items-center gap-4 w-full max-w-[80vw] md:max-w-[400px]">
            {/* Bar */}
            <div className="flex-1 h-[8px] md:h-[10px] bg-white/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="progress-fill h-full w-full bg-gradient-to-r from-[#A88945] via-[#E6C778] to-[#FAF7ED] origin-left scale-x-0 rounded-full"></div>
            </div>
            {/* Percentage */}
            <div ref={numberRef} className="progress-number font-mono text-sm md:text-base font-bold text-[#E6C778] dark:text-[#E6C778] w-12 text-right">
              0%
            </div>
          </div>

          {/* Loading Text */}
          <div ref={textRef} className="loading-text mt-5 text-[11px] md:text-xs font-bold tracking-[0.3em] text-[#E6C778]/90 dark:text-[#E6C778]/90 uppercase animate-pulse">
            LOADING...
          </div>
        </div>

      </div>
    </div>
  );
}
