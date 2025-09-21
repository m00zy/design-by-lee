import { useState, useEffect } from 'react';

function Carousel({ images = [], onImageClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        // Viewport is changing between mobile and desktop
        setIsResizing(true);
        setIsMobile(newIsMobile);
        // Re-enable transitions after layout settles
        setTimeout(() => setIsResizing(false), 150);
      }
    };
    
    // Set initial state
    setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  useEffect(() => {
    // Small delay to prevent initial load animation on mobile
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!images?.length) return null;

  const SIZES = {
    base: isMobile ? { width: 340, height: 536 } : { width: 240, height: 378 },
    hover: isMobile ? { width: 382.5, height: 603 } : { width: 270, height: 425.25 }
  };
  
  const ANIMATION = {
    duration: 500,
    hoverScale: 1.125,
    shiftDistance: 30,
    blurAmount: 4,
    offsetTop: 120
  };

  return (
    <div className="w-full flex items-center h-auto md:h-[800px] md:overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full pb-8 md:pb-0" style={{ gap: '24px' }}>
        {images.map((image, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && !isHovered;
          const isEven = index % 2 === 0;
          const shouldShiftLeft = hoveredIndex !== null && index < hoveredIndex;
          const shouldShiftRight = hoveredIndex !== null && index > hoveredIndex;
          
          return (
            <div
              key={image.id || index}
              className={`project-card relative cursor-pointer ${
                (!isMobile || hasLoaded) && !isResizing ? 'transition-all duration-500 ease-out' : ''
              } ${
                isResizing ? 'no-transition' : ''
              } ${
                isHovered ? 'z-20' : isOtherHovered ? 'opacity-70' : 'opacity-100'
              }`}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              onClick={() => onImageClick?.(image.id)}
              style={{
                width: SIZES.base.width,
                height: SIZES.base.height,
                flexShrink: 0,
                zIndex: isHovered ? 20 : 10 - index
              }}
            >
              <div 
                className={`w-full h-full bg-white shadow-lg overflow-hidden ${
                  (!isMobile || hasLoaded) && !isResizing ? 'transition-all duration-500 ease-out' : ''
                }`}
                style={{
                  transform: `scale(${isHovered ? ANIMATION.hoverScale : 1}) translateX(${shouldShiftLeft ? -ANIMATION.shiftDistance : shouldShiftRight ? ANIMATION.shiftDistance : 0}px)`,
                  transformOrigin: 'center',
                  filter: `blur(${isOtherHovered ? ANIMATION.blurAmount : 0}px)`
                }}
              >
                <img
                  src={image.src || image}
                  alt={image.alt || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: image.objectPosition || 'center' }}
                />
                
                {image.title && (
                  <div 
                    className={`absolute inset-0 flex items-end ${
                      (!isMobile || hasLoaded) && !isResizing ? 'transition-all duration-500 ease-out' : ''
                    }`}
                    style={{ backgroundColor: `rgba(0,0,0,${isHovered ? 0.2 : 0})` }}
                  >
                    <div 
                      className={`p-4 text-white ${
                        (!isMobile || hasLoaded) && !isResizing ? 'transition-all duration-500 ease-out' : ''
                      }`}
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: `translateY(${isHovered ? 0 : 10}px)`,
                        width: SIZES.base.width,
                        maxWidth: SIZES.base.width
                      }}
                    >
                      <h3 className="text-sm font-light tracking-wide mb-1">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="text-xs opacity-90 font-light line-clamp-3">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;