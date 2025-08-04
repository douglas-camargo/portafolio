import React, { useState, useEffect } from 'react';
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
  const [internalIndex, setInternalIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<'prev' | 'next' | null>(null);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setScreenSize('mobile-small');
      } else if (window.innerWidth < 600) {
        setScreenSize('mobile-medium');
      } else if (window.innerWidth < 768) {
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
  
  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  
  const updateIndex = (newIndex: number) => {
    if (externalIndex !== undefined) {
      onGoToIndex?.(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    updateIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    updateIndex(newIndex);
  };

  const isMobile = screenSize === 'mobile-small' || screenSize === 'mobile-medium' || screenSize === 'mobile' || screenSize === 'tablet';

  const duplicatedChildren = isMobile ? childrenArray : [...childrenArray, ...childrenArray, ...childrenArray];

  const getTransformValue = () => {
    if (isMobile) {
      // Para móviles y tablets, cada slide ocupa 100% del ancho
      return currentIndex * 100;
    } else {
      // Para desktop, usamos el sistema de triplicado
      const translatePercentage = screenSize === '2xl' ? 60.05 : 57;
      return (currentIndex + totalItems) * translatePercentage;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div 
          className={`flex transition-transform duration-300 ease-in-out ${
            isMobile ? 'gap-0' : 'gap-0.5'
          }`}
          style={{ 
            transform: `translateX(-${getTransformValue()}%)` 
          }}
        >
          {duplicatedChildren.map((child, index) => {
            const originalIndex = isMobile ? index : index % totalItems;
            const isLeftPosition = originalIndex === currentIndex;

            if (React.isValidElement(child)) {
              return (
                <div 
                  key={index} 
                  className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${
                    isMobile ? 'w-full' : 
                    screenSize === 'desktop' ? 'w-[calc(55%-1px)] mr-5' :
                    'w-[calc(60%-1px)]'
                  } ${
                    originalIndex === currentIndex && hoveredImageIndex === index ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredImageIndex(index)}
                  onMouseLeave={() => setHoveredImageIndex(null)}
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

      <Button
        variant="secondary"
        size="lg"
        className={`absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] z-10 left-2 sm:left-3 md:left-2 lg:left-4 transition-transform duration-300 ease-in-out ${
          hoveredButton === 'prev' ? 'scale-110' : 'scale-100'
        }`}
        borderRadius="rounded-full"
        onClick={goToPrevious}
        onMouseEnter={() => setHoveredButton('prev')}
        onMouseLeave={() => setHoveredButton(null)}
      >
      <span className="pb-0.5">←</span>
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className={`absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] z-10 right-2 transition-transform duration-300 ease-in-out ${
          hoveredButton === 'next' ? 'scale-110' : 'scale-100'
        }`}
        borderRadius="rounded-full"
        onClick={goToNext}
        onMouseEnter={() => setHoveredButton('next')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        →
      </Button>
    </div>
  );
};