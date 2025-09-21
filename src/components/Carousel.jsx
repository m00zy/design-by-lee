import { useState, useEffect } from 'react';

function Carousel({ images = [], onImageClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!images?.length) return null;

  const SIZES = {
    base: isMobile ? { width: 340, height: 536 } : { width: 'clamp(160px, 12vw, 240px)', height: 'clamp(252px, 18.9vw, 378px)' },
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
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full" style={{ gap: '24px' }}>
        {images.map((image, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && !isHovered;
          const isEven = index % 2 === 0;
          const shouldShiftLeft = hoveredIndex !== null && index < hoveredIndex;
          const shouldShiftRight = hoveredIndex !== null && index > hoveredIndex;
          
          return (
            <div
              key={image.id || index}
              className={`project-card relative transition-all duration-500 ease-out cursor-pointer ${
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
                className="w-full h-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-out"
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
                    className="absolute inset-0 flex items-end transition-all duration-500 ease-out"
                    style={{ backgroundColor: `rgba(0,0,0,${isHovered || isMobile ? 0.2 : 0})` }}
                  >
                    <div 
                      className="p-4 text-white transition-all duration-500 ease-out"
                      style={{
                        opacity: isHovered || isMobile ? 1 : 0,
                        transform: `translateY(${isHovered || isMobile ? 0 : 10}px)`,
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