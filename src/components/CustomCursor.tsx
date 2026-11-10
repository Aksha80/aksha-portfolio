import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;

    if (!dot || !ring || !spotlight) return;

    // Quick setters for maximum 120fps performance
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' });

    const setSpotlightX = gsap.quickTo(spotlight, 'x', { duration: 0.45, ease: 'power2.out' });
    const setSpotlightY = gsap.quickTo(spotlight, 'y', { duration: 0.45, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX, clientY } = e;

      setDotX(clientX);
      setDotY(clientY);

      setRingX(clientX);
      setRingY(clientY);

      setSpotlightX(clientX);
      setSpotlightY(clientY);

      // Interactive card dynamic illumination: update --mouse-x and --mouse-y on hovered cards
      const target = e.target as HTMLElement | null;
      const card = target?.closest('.glass-card') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .clickable, .glass-card, [data-cursor="hover"]'
      );
      if (interactive) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .clickable, .glass-card, [data-cursor="hover"]'
      );
      if (interactive) {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveDoc = () => setIsVisible(false);
    const handleMouseEnterDoc = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    document.addEventListener('mouseenter', handleMouseEnterDoc);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      document.removeEventListener('mouseenter', handleMouseEnterDoc);
    };
  }, [isVisible]);

  return (
    <>
      {/* 1. Ambient Cursor Spotlight (Gently illuminates the dark surfaces across the whole portfolio) */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full pointer-events-none z-[40] transition-opacity duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(230, 199, 120, 0.045) 0%, rgba(168, 137, 69, 0.015) 45%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* 2. Fluid Trailing Ring / Interactive Aura */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] rounded-full transition-all duration-300 ease-out ${
          isHovered
            ? 'w-14 h-14 border-[1.5px] border-primary-500 bg-primary-500/10 shadow-[0_0_20px_rgba(230,199,120,0.35)] backdrop-blur-[1px]'
            : 'w-9 h-9 border border-primary-500/50 bg-primary-500/[0.03] shadow-[0_0_10px_rgba(230,199,120,0.15)]'
        } ${isClicked ? 'scale-75' : isHovered ? 'scale-110' : 'scale-100'}`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* 3. High-Precision Center Gold Pinpoint Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] rounded-full transition-transform duration-150 ease-out ${
          isHovered
            ? 'w-2 h-2 bg-primary-400 shadow-[0_0_12px_rgba(230,199,120,0.9)] scale-125'
            : 'w-2 h-2 bg-primary-500 shadow-[0_0_8px_rgba(230,199,120,0.6)] scale-100'
        } ${isClicked ? 'scale-50' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
