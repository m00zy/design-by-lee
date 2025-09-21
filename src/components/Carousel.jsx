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

  // Preload critical images for faster loading
  useEffect(() => {
    // Preload first 3 images for instant display
    const criticalImages = images.slice(0, 3);
    criticalImages.forEach((image) => {
      const img = new Image();
      img.src = image.src || image;
    });

    // Prefetch next batch of images for smoother scrolling
    const prefetchImages = images.slice(3, 6);
    prefetchImages.forEach((image) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = image.src || image;
      link.as = 'image';
      document.head.appendChild(link);
    });

    // Cleanup prefetch links on unmount
    return () => {
      const prefetchLinks = document.querySelectorAll('link[rel="prefetch"][as="image"]');
      prefetchLinks.forEach(link => {
        if (prefetchImages.some(img => (img.src || img) === link.href)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [images]);

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
    <div className={`w-full flex items-center ${isMobile ? 'h-auto' : 'h-auto md:h-[800px] md:overflow-hidden'}`}>
      <div 
        className={`flex items-center justify-center w-full ${
          isMobile ? 'flex-col' : 'flex-row items-start'
        }`} 
        style={{ gap: '24px' }}
      >
        {images.map((image, index) => {
          const state = imageStates[index];
          
          return (
            <div
              key={image.id || index}
              className={`project-card relative cursor-pointer ${
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
                willChange: 'transform, opacity',
                transition: 'opacity 500ms ease-out'
              }}
            >
              <div 
                className="w-full h-full bg-white shadow-lg overflow-hidden"
                style={{
                  transform: `scale(${state.isHovered ? ANIMATION.hoverScale : 1}) translateX(${state.shouldShiftLeft ? -ANIMATION.shiftDistance : state.shouldShiftRight ? ANIMATION.shiftDistance : 0}px)`,
                  transformOrigin: 'center',
                  filter: `blur(${state.isOtherHovered ? ANIMATION.blurAmount : 0}px)`,
                  willChange: 'transform, filter',
                  transition: 'transform 500ms ease-out, filter 500ms ease-out'
                }}
              >
                <img
                  src={image.src || image}
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
                      transition: 'background-color 500ms ease-out'
                    }}
                  >
                    <div 
                      className="p-4 text-white"
                      style={{
                        opacity: state.isHovered && !isMobile ? 1 : 0,
                        transform: `translateY(${state.isHovered && !isMobile ? 0 : 10}px)`,
                        width: SIZES.base.width,
                        maxWidth: SIZES.base.width,
                        willChange: 'opacity, transform',
                        transition: 'opacity 500ms ease-out, transform 500ms ease-out'
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