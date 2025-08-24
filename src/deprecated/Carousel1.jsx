import React, { useState, useEffect, useRef } from 'react';

// ─── Timing constants ───
// How long each slide remains centered (in ms)
const DISPLAY_DURATION = 3000;
// How long the sliding animation takes (in ms)
const TRANSITION_DURATION = 1500;
// ────────────────────────

function Carousel({ projects }) {
  // Clone the first slide at the end so we can loop seamlessly
  const extendedProjects = [...projects, projects[0]];
  const totalSlides = extendedProjects.length; // projects.length + 1

  // tracks which slide index we're on (0…projects.length)
  const [currentIndex, setCurrentIndex] = useState(0);
  // whether CSS transition is enabled (we disable it briefly when "snapping" back)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  // which real slide (0…projects.length-1) is being hovered, or null if no hover
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // We'll hold a ref both for our display timers and to detect "just‐snapped‐back"
  const timeoutRef = useRef(null);
  const justResetRef = useRef(false);

  const clearExistingTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Advance to next slide (animated unless we're on the clone)
  const advanceSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Whenever currentIndex or hoveredIndex changes, schedule (or clear) the next timeout
  useEffect(() => {
    // If we are hovering over any slide, do not auto-advance.
    if (hoveredIndex !== null) {
      clearExistingTimeout();
      return;
    }

    // Clear any existing timer immediately
    clearExistingTimeout();

    // 1) If we just snapped back from the clone to real 0, give it the remaining display time
    // since the clone already showed for TRANSITION_DURATION, we only need (DISPLAY_DURATION - TRANSITION_DURATION)
    if (justResetRef.current && currentIndex === 0) {
      timeoutRef.current = window.setTimeout(() => {
        justResetRef.current = false; // clear the "just reset" flag
        advanceSlide(); // move from the real 0 → 1 after DISPLAY_DURATION
      }, DISPLAY_DURATION - TRANSITION_DURATION); // Give remaining time since clone already displayed for TRANSITION_DURATION
      return;
    }

    // 2) If we're sitting on the cloned slide (index === projects.length), wait exactly TRANSITION_DURATION then snap back to 0
    if (currentIndex === projects.length) {
      timeoutRef.current = window.setTimeout(() => {
        // Turn OFF transition so the "snap" to index 0 is instantaneous
        setIsTransitionEnabled(false);
        setCurrentIndex(0);
        justResetRef.current = true; // mark that we "just reset" so next useEffect schedules DISPLAY_DURATION
      }, TRANSITION_DURATION);

      return;
    }

    // 3) Otherwise, we're on a "normal" real slide (index 0…projects.length-1), so schedule next advance after DISPLAY_DURATION
    timeoutRef.current = window.setTimeout(() => {
      advanceSlide();
    }, DISPLAY_DURATION);

    // Cleanup if this effect ever re-runs
    return () => clearExistingTimeout();
  }, [currentIndex, hoveredIndex, projects.length]);

  // After we disable transition to snap back, immediately re-enable it on the next animation frame
  useEffect(() => {
    if (!isTransitionEnabled) {
      const raf = requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitionEnabled]);

  // Hover handlers
  const handleMouseEnter = (realIdx) => {
    setHoveredIndex(realIdx);
    clearExistingTimeout();
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    // When hoveredIndex goes back to null, the same useEffect above will kick in and schedule the next timeout.
  };

  // Each slide's width is 100% / totalSlides (so container width = totalSlides * 100%)
  const slideWidth = 100 / totalSlides;
  const containerStyle = {
    width: `${totalSlides * 100}%`,
    transform: `translateX(-${currentIndex * slideWidth}%)`,
    transition: isTransitionEnabled
      ? `transform ${TRANSITION_DURATION}ms ease-in-out`
      : 'none',
  };

  return (
    // Here's the change: "border-l-[16px] border-r-[16px]" forces a 16px white stripe on each side.
    <div className="relative w-full h-5/6 overflow-hidden bg-black border-l-[55px] border-r-[50px] border-white">
      <div className="flex h-full" style={containerStyle}>
        {extendedProjects.map((project, idx) => {
          // realIdx = idx mod projects.length
          const realIdx = idx % projects.length;
          const isHovered = hoveredIndex === realIdx;
          const isFrosted = hoveredIndex !== null && hoveredIndex !== realIdx;

          return (
            <div
              key={`${project.name}-${idx}`}
              className="relative flex-shrink-0 h-full cursor-pointer"
              style={{ width: `${slideWidth}%` }}
              onMouseEnter={() => {
                // Only trigger hover on the "real" slides (0…projects.length-1)
                if (idx < projects.length) {
                  handleMouseEnter(realIdx);
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />

              {/* Dark overlay + title if real slide is hovered */}
              {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                  <h2 className="text-white text-4xl font-bold">
                    {project.name}
                  </h2>
                </div>
              )}

              {/* Frosted look on non-hovered slides whenever something is hovered */}
              {isFrosted && (
                <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel; 