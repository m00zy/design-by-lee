import React, { useState, useEffect, useRef } from 'react';

/**
 * Carousel.jsx
 *
 * Minimalistic sliding carousel:
 *  - Clean design with matching background
 *  - Images slide while captions appear on image hover only
 *  - Slide + fade animations for smooth transitions
 *  - Initial fade-in for first image only
 *  - Reliable timing without ever getting stuck
 */
export default function Carousel({
  projects,
  autoDuration = 3000,         // how long each slide stays visible (ms)
  transitionDuration = 1500    // how long the slide animation takes (ms)
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const playTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);

  // Initial fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 300); // Small delay to ensure smooth initial render
    
    // Mark as initially loaded after the fade-in completes
    const initialLoadTimer = setTimeout(() => {
      setHasInitiallyLoaded(true);
    }, 1300); // 300ms delay + 1000ms fade-in duration
    
    return () => {
      clearTimeout(timer);
      clearTimeout(initialLoadTimer);
    };
  }, []);

  // wipe timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(playTimerRef.current);
      clearTimeout(transitionTimerRef.current);
    };
  }, []);

  // recursive timeout loop
  useEffect(() => {
    // nothing to do if there's only one slide, still loading, or hovered
    if (projects.length <= 1 || !hasLoaded || isHovered) return;

    // helper to advance one slide
    const play = () => {
      // start the CSS slide
      setIsTransitioning(true);

      // after animation, bump the index and schedule the next cycle
      transitionTimerRef.current = setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % projects.length);
        setIsTransitioning(false);

        // schedule next auto-advance
        playTimerRef.current = setTimeout(play, autoDuration);
      }, transitionDuration);
    };

    // initial kick-off
    playTimerRef.current = setTimeout(play, autoDuration);

    // cleanup before re-running (or unmount)
    return () => {
      clearTimeout(playTimerRef.current);
      clearTimeout(transitionTimerRef.current);
    };
  }, [
    projects.length,
    autoDuration,
    transitionDuration,
    hasLoaded,
    isHovered
  ]);

  if (!projects || projects.length === 0) return null;

  const nextIndex = (currentIndex + 1) % projects.length;
  const isFirstLoad = currentIndex === 0 && !isTransitioning && !hasInitiallyLoaded;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {/* Image area */}
      <div className="relative h-full">
        {/* current slide - image only */}
        <div
          className="absolute inset-0 flex items-start pt-16"
          style={{
            transform: `translateX(${isTransitioning ? '-100%' : '0%'})`,
            opacity: isTransitioning ? 0.05 : (isFirstLoad && !hasLoaded ? 0 : 1),
            transition: isTransitioning
              ? `transform ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity ${transitionDuration * 0.7}ms cubic-bezier(0.4, 0.0, 0.6, 1)`
              : isFirstLoad
              ? 'opacity 1000ms ease-in'
              : 'none'
          }}
        >
          <div className="w-full flex justify-end pr-[8%] pl-8">
            <div className="max-w-5xl">
              <div 
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].name}
                  className="w-full h-auto object-cover"
                />
                
                {/* Hover overlay with caption - only on image */}
                <div 
                  className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex items-end justify-start h-full p-8">
                    <div className="text-left text-white">
                      <h2 className="text-2xl font-light tracking-wide mb-2">
                        {projects[currentIndex].name}
                      </h2>
                      {projects[currentIndex].description && (
                        <p className="text-sm font-light leading-relaxed max-w-md opacity-90">
                          {projects[currentIndex].description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* next slide - image only */}
        <div
          className="absolute inset-0 flex items-start pt-16"
          style={{
            transform: `translateX(${isTransitioning ? '0%' : '100%'})`,
            opacity: isTransitioning ? 1 : 0.05,
            transition: isTransitioning
              ? `transform ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity ${transitionDuration * 0.9}ms cubic-bezier(0.2, 0.0, 0.2, 1)`
              : 'none'
          }}
        >
          <div className="w-full flex justify-end pr-[8%] pl-8">
            <div className="max-w-5xl">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={projects[nextIndex].image}
                  alt={projects[nextIndex].name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-6 left-8">
        <div className="flex items-center space-x-3 text-sm text-gray-500 font-light">
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <div className="w-12 h-px bg-gray-300 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gray-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
            />
          </div>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
