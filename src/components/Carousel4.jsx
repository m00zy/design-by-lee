import React, { useState } from 'react';

export default function Carousel4({ images = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!images?.length) return null;

  const sizes = { base: [240, 378], hover: [270, 425.25] };

  return (
    <div className="w-full overflow-hidden flex items-center" style={{ height: '800px' }}>
      <div className="flex items-start justify-center w-full" style={{ gap: '12px' }}>
        {images.map((image, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && !isHovered;
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={index}
              className={`relative transition-all duration-500 ease-out cursor-pointer ${
                isHovered ? 'z-20' : isOtherHovered ? 'opacity-70' : 'opacity-100'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: sizes.base[0],
                height: sizes.base[1],
                marginTop: isEven ? 120 : 0,
                flexShrink: 0,
                zIndex: isHovered ? 20 : 10 - index
              }}
            >
              <div 
                className="absolute inset-0 bg-white shadow-lg overflow-hidden transition-all duration-500 ease-out"
                style={{
                  width: isHovered ? sizes.hover[0] : sizes.base[0],
                  height: isHovered ? sizes.hover[1] : sizes.base[1],
                  transform: `scale(${isHovered ? 1.05 : 1})`,
                  transformOrigin: 'top left',
                  filter: `blur(${isOtherHovered ? 4 : 0}px)`
                }}
              >
                <img
                  src={image.src || image}
                  alt={image.alt || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {image.title && (
                  <div 
                    className="absolute inset-0 flex items-end transition-all duration-500 ease-out"
                    style={{ backgroundColor: `rgba(0,0,0,${isHovered ? 0.2 : 0})` }}
                  >
                    <div 
                      className="p-4 text-white transition-all duration-500 ease-out"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: `translateY(${isHovered ? 0 : 10}px)`,
                        width: sizes.base[0],
                        maxWidth: sizes.base[0]
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