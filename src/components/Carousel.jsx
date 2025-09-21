import { useState, useEffect, useCallback, useMemo } from 'react';

function Carousel({ images = [], onImageClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback((index) => {
    if (!isMobile) setHoveredIndex(index);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) setHoveredIndex(null);
  }, [isMobile]);

  const handleImageClick = useCallback((imageId) => {
    onImageClick?.(imageId);
  }, [onImageClick]);

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

  // Memoize image calculations to prevent recalculation on every render
  const imageStates = useMemo(() => {
    return images.map((image, index) => ({
      isHovered: hoveredIndex === index,
      isOtherHovered: hoveredIndex !== null && hoveredIndex !== index,
      isEven: index % 2 === 0,
      shouldShiftLeft: hoveredIndex !== null && index < hoveredIndex,
      shouldShiftRight: hoveredIndex !== null && index > hoveredIndex,
    }));
  }, [hoveredIndex, images.length]);

  return (
    <div className="w-full flex items-center h-auto md:h-[800px] md:overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full" style={{ gap: '24px' }}>
        {images.map((image, index) => {
          const state = imageStates[index];
          
          return (
            <div
              key={image.id || index}
              className={`project-card relative transition-all duration-500 ease-out cursor-pointer ${
                state.isHovered ? 'z-20' : state.isOtherHovered ? 'opacity-70' : 'opacity-100'
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleImageClick(image.id)}
              style={{
                width: SIZES.base.width,
                height: SIZES.base.height,
                flexShrink: 0,
                zIndex: state.isHovered ? 20 : 10 - index,
                willChange: 'transform, opacity'
              }}
            >
              <div 
                className="w-full h-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-out"
                style={{
                  transform: `scale(${state.isHovered ? ANIMATION.hoverScale : 1}) translateX(${state.shouldShiftLeft ? -ANIMATION.shiftDistance : state.shouldShiftRight ? ANIMATION.shiftDistance : 0}px)`,
                  transformOrigin: 'center',
                  filter: `blur(${state.isOtherHovered ? ANIMATION.blurAmount : 0}px)`,
                  willChange: 'transform, filter'
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
                    style={{ 
                      backgroundColor: `rgba(0,0,0,${state.isHovered || isMobile ? 0.2 : 0})`,
                      willChange: 'background-color'
                    }}
                  >
                    <div 
                      className="p-4 text-white transition-all duration-500 ease-out"
                      style={{
                        opacity: state.isHovered || isMobile ? 1 : 0,
                        transform: `translateY(${state.isHovered || isMobile ? 0 : 10}px)`,
                        width: SIZES.base.width,
                        maxWidth: SIZES.base.width,
                        willChange: 'opacity, transform'
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