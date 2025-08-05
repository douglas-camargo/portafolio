import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { useCarousel } from '../../../hooks/useCarousel';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  onIndexChange?: (index: number) => void;
  currentIndex?: number;
  onGoToIndex?: (index: number) => void;
}

export const Carousel = ({ 
  children, 
  className = '', 
  onIndexChange,
  currentIndex: externalIndex,
  onGoToIndex 
}: CarouselProps) => {
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const {
    currentIndex,
    isTransitioning,
    screenSize,
    isMobile,
    hoveredButton,
    setHoveredButton,
    carouselRef,
    goToNext,
    goToPrevious,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getTransformValue,
    isDragging
  } = useCarousel({
    totalItems,
    onIndexChange,
    currentIndex: externalIndex,
    onGoToIndex
  });

  const duplicatedChildren = [...childrenArray, ...childrenArray, ...childrenArray];

  return (
    <div className={`relative ${className}`}>
      <div 
        className="overflow-hidden"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
      >
        <div 
          className={`flex ${isMobile ? 'gap-0' : 'gap-0.5'}`}
          style={{ 
            transform: `translateX(-${getTransformValue()}%)`,
            transition: isTransitioning && !isDragging ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            willChange: 'transform',
          }}
        >
          {duplicatedChildren.map((child, index) => {
            const originalIndex = index % totalItems;
            const isLeftPosition = originalIndex === currentIndex % totalItems;
            const isActive = originalIndex === currentIndex % totalItems;
            const isAdjacent = Math.abs(originalIndex - (currentIndex % totalItems)) === 1;

            if (React.isValidElement(child)) {
              return (
                <div 
                  key={index}
                  className={`flex-shrink-0 ${
                    isMobile 
                      ? 'w-full' 
                      : screenSize === 'desktop' 
                        ? 'w-[calc(55%-1px)] mr-5' 
                        : 'w-[calc(60%-1px)]'
                  }`}
                  style={{
                    transform: 'scale(1)',
                    transition: isActive 
                      ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      : 'none',
                    filter: isActive ? 'none' : 'brightness(0.8)',
                    opacity: isActive ? 1 : isAdjacent ? 0.8 : 0.6,
                  }}
                >
                  {React.cloneElement(child, { 
                    ...(child.props && typeof child.type !== 'string' ? { isLeftPosition, currentIndex } : {})
                  })}
                </div>
              );
            }
            return child;
          })}
        </div>
      </div>

      {/* Botón IZQUIERDA */}
      <Button
        variant="secondary"
        size="lg"
        className={`absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] z-10 left-2 sm:left-3 md:left-2 lg:left-4 transition-all duration-300 ease-out cursor-pointer ${
          hoveredButton === 'prev' ? 'scale-110 shadow-lg' : 'scale-100 shadow-md'
        }`}
        borderRadius="rounded-full"
        onClick={goToPrevious}
        onMouseEnter={() => setHoveredButton('prev')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <span className="transition-transform duration-200 ease-out transform group-hover:-translate-x-0.5">
          ←
        </span>
      </Button>

      {/* Botón DERECHA */}
      <Button
        variant="secondary"
        size="lg"
        className={`absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] z-10 right-2 transition-all duration-300 ease-out cursor-pointer ${
          hoveredButton === 'next' ? 'scale-110 shadow-lg' : 'scale-100 shadow-md'
        }`}
        borderRadius="rounded-full"
        onClick={goToNext}
        onMouseEnter={() => setHoveredButton('next')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <span className="transition-transform duration-200 ease-out transform group-hover:translate-x-0.5">
          →
        </span>
      </Button>
    </div>
  );
};
