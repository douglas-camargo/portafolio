import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../atoms/Button/Button';

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

  const [internalIndex, setInternalIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [hoveredButton, setHoveredButton] = useState<'prev' | 'next' | null>(null);

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const duplicatedChildren = [...childrenArray, ...childrenArray, ...childrenArray];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else if (window.innerWidth < 1536) {
        setScreenSize('desktop');
      } else {
        setScreenSize('2xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = ['mobile', 'tablet'].includes(screenSize);

  const updateIndex = (newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    let adjustedIndex = newIndex;
    if (newIndex < 0) {
      adjustedIndex = totalItems * 2 - 1;
    } else if (newIndex >= totalItems * 3) {
      adjustedIndex = totalItems;
    }
    
    if (externalIndex !== undefined) {
      onGoToIndex?.(adjustedIndex);
    } else {
      setInternalIndex(adjustedIndex);
    }
    onIndexChange?.(adjustedIndex % totalItems);
  };

  const goToNext = () => updateIndex(currentIndex + 1);
  const goToPrevious = () => updateIndex(currentIndex - 1);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    setDragOffset(diff);
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart) return;
    
    setIsDragging(false);
    setDragOffset(0);
    
    const diff = touchStart - e.changedTouches[0].clientX;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setTouchStart(null);
  };

  useEffect(() => {
    if (totalItems > 0) {
      let timeoutId: NodeJS.Timeout;
      
      if (currentIndex >= totalItems * 2) {
        timeoutId = setTimeout(() => {
          setIsTransitioning(false);
          const resetIndex = totalItems;
          if (externalIndex !== undefined) {
            onGoToIndex?.(resetIndex);
          } else {
            setInternalIndex(resetIndex);
          }
          onIndexChange?.(resetIndex % totalItems);
        }, 700);
      } else if (currentIndex < totalItems) {
        timeoutId = setTimeout(() => {
          setIsTransitioning(false);
          const resetIndex = totalItems + (currentIndex % totalItems);
          if (externalIndex !== undefined) {
            onGoToIndex?.(resetIndex);
          } else {
            setInternalIndex(resetIndex);
          }
          onIndexChange?.(resetIndex % totalItems);
        }, 700);
      } else {
        timeoutId = setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
      }

      return () => clearTimeout(timeoutId);
    } else {
      setIsTransitioning(false);
    }
  }, [currentIndex, totalItems, externalIndex, onGoToIndex, onIndexChange]);

  const getTransformValue = () => {
    const percentage = isMobile ? 100 : (screenSize === '2xl' ? 60.05 : 57);
    const baseTransform = currentIndex * percentage;
    
    if (isMobile && isDragging && dragOffset !== 0) {
      const dragPercentage = (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100;
      return baseTransform + dragPercentage;
    }
    
    return baseTransform;
  };

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
                    transform: isActive 
                      ? 'scale(1)'
                      : isAdjacent
                      ? 'scale(0.95)'
                      : 'scale(0.9)',
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
