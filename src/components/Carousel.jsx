import { useState, useEffect, useCallback, useMemo } from 'react';

function Carousel({ images = [], onImageClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Helper function to get image source
  const getImageSrc = useCallback((image) => {
    if (typeof image === 'string') return image;
    return image.images?.[0] || image.src || image;
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsResizing(true);
        setIsMobile(newIsMobile);
        setTimeout(() => setIsResizing(false), 100);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleImageClick = useCallback((imageId) => {
    onImageClick?.(imageId);
  }, [onImageClick]);

  if (!images?.length) return null;

  const SIZES = {
    base: isMobile ? { width: 340, height: 536 } : { width: 'clamp(160px, 12vw, 240px)', height: 'clamp(252px, 18.9vw, 378px)' }
  };
  
  const ANIMATION = {
    duration: 500,
    hoverScale: 1.125,
    shiftDistance: 20,
    blurAmount: 4,
    verticalOffset: 84
  };

  // Centralized transition strings
  const baseTransition = `${ANIMATION.duration}ms ease-out`;
  const TRANSITIONS = {
    opacity: `opacity ${baseTransition}`,
    transform: `transform ${baseTransition}`,
    filter: `filter ${baseTransition}`,
    background: `background-color ${baseTransition}`,
    transformAndFilter: `transform ${baseTransition}, filter ${baseTransition}`,
    opacityAndTransform: `opacity ${baseTransition}, transform ${baseTransition}`
  };

  useEffect(() => {
    const criticalImages = images.slice(0, 3);
    criticalImages.forEach((image) => {
      const img = new Image();
      img.src = getImageSrc(image);
    });

    const prefetchImages = images.slice(3, 6);
    prefetchImages.forEach((image) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = getImageSrc(image);
      link.as = 'image';
      document.head.appendChild(link);
    });

    return () => {
      const prefetchLinks = document.querySelectorAll('link[rel="prefetch"][as="image"]');
      prefetchLinks.forEach(link => {
        if (prefetchImages.some(img => getImageSrc(img) === link.href)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [images]);

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
    <div className={`w-full flex items-center ${isMobile ? 'h-auto' : 'h-auto md:h-[800px] md:overflow-hidden'}`}>
      <div 
        className={`flex items-center justify-center w-full ${
          isMobile ? 'flex-col' : 'flex-row items-start'
        }`} 
        style={{ 
          gap: '24px',
          transform: isMobile ? 'none' : 'translateY(0)'
        }}
      >
        {images.map((image, index) => {
          const state = imageStates[index];
          
          return (
            <div
              key={image.id || index}
              className={`project-card relative cursor-pointer ${
                state.isHovered ? 'z-20' : state.isOtherHovered ? 'opacity-70' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleImageClick(image.id)}
              style={{
                width: SIZES.base.width,
                height: SIZES.base.height,
                flexShrink: 0,
                zIndex: state.isHovered ? 20 : 10 - index,
                willChange: 'transform, opacity',
                transition: TRANSITIONS.opacity
              }}
            >
              <div 
                className="w-full h-full bg-white shadow-lg overflow-hidden"
                style={{
                  transform: `scale(${state.isHovered ? ANIMATION.hoverScale : 1}) translateX(${state.shouldShiftLeft ? -ANIMATION.shiftDistance : state.shouldShiftRight ? ANIMATION.shiftDistance : 0}px) translateY(${isMobile ? 0 : (state.isEven ? ANIMATION.verticalOffset : -ANIMATION.verticalOffset)}px)`,
                  transformOrigin: 'center',
                  filter: `blur(${state.isOtherHovered ? ANIMATION.blurAmount : 0}px)`,
                  willChange: 'transform, filter',
                  transition: isResizing ? 'none' : TRANSITIONS.transformAndFilter
                }}
              >
                <img
                  src={getImageSrc(image)}
                  alt={image.alt || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: image.objectPosition || 'center' }}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  width={image.width}
                  height={image.height}
                />
                
                {image.title && (
                  <div 
                    className="absolute inset-0 flex items-end"
                    style={{ 
                      backgroundColor: `rgba(0,0,0,${state.isHovered && !isMobile ? 0.2 : 0})`,
                      willChange: 'background-color',
                      transition: TRANSITIONS.background
                    }}
                  >
                    <div 
                      className="p-4 text-white"
                      style={{
                        opacity: state.isHovered && !isMobile ? 1 : 0,
                        transform: `translateY(${state.isHovered && !isMobile ? 0 : 10}px)`,
                        width: SIZES.base.width,
                        willChange: 'opacity, transform',
                        transition: TRANSITIONS.opacityAndTransform
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