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
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const [internalIndex, setInternalIndex] = useState(totalItems); // inicio en el grupo del medio
  const [isTransitioning, setIsTransitioning] = useState(false); // inicia sin transición en curso
  const [screenSize, setScreenSize] = useState('desktop');
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<'prev' | 'next' | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

  const duplicatedChildren = [...childrenArray, ...childrenArray, ...childrenArray];

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

  const isMobile = ['mobile-small', 'mobile-medium', 'mobile', 'tablet'].includes(screenSize);

  const updateIndex = (newIndex: number, direction: 'left' | 'right') => {
    if (isTransitioning) return; // evitar múltiples clics rápidos
    
    setSlideDirection(direction);
    setIsTransitioning(true);
    
    if (externalIndex !== undefined) {
      onGoToIndex?.(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex % totalItems); // para los dots
  };

  const goToNext = () => {
    updateIndex(currentIndex + 1, 'right');
  };

  const goToPrevious = () => {
    updateIndex(currentIndex - 1, 'left');
  };

  useEffect(() => {
    if (!isMobile && totalItems > 0) {
      let timeoutId: NodeJS.Timeout;
      
      if (currentIndex >= totalItems * 2) {
        // hacia adelante (derecha) - reset al inicio
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
        // hacia atrás (izquierda) - reset al final
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
        // estado normal - solo habilitar clics
        timeoutId = setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
      }

      return () => clearTimeout(timeoutId);
    } else {
      setIsTransitioning(false); // en mobile no aplica esto
    }
  }, [currentIndex, totalItems, externalIndex, onGoToIndex, onIndexChange, isMobile]);

  const getTransformValue = () => {
    const percentage = isMobile ? 100 : (screenSize === '2xl' ? 60.05 : 57);
    return currentIndex * percentage;
  };

  const getSlideAnimation = () => {
    // Usar la misma curva de easing para ambas direcciones
    return 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
  };

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div 
          className={`flex ${isMobile ? 'gap-0' : 'gap-0.5'}`}
          style={{ 
            transform: `translateX(-${getTransformValue()}%)`,
            transition: isTransitioning ? getSlideAnimation() : 'none',
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
                  } ${
                    isActive && hoveredImageIndex === index 
                      ? 'scale-105' 
                      : isActive
                      ? 'scale-100'
                      : isAdjacent
                      ? 'scale-95 opacity-80'
                      : 'scale-90 opacity-60'
                  }`}
                  onMouseEnter={() => setHoveredImageIndex(index)}
                  onMouseLeave={() => setHoveredImageIndex(null)}
                  style={{
                    transform: isActive 
                      ? `scale(${hoveredImageIndex === index ? 1.05 : 1}) ${hoveredImageIndex === index ? 'translateY(-3px)' : 'translateY(0)'}`
                      : isAdjacent
                      ? `scale(0.95)`
                      : `scale(0.9)`,
                    transition: isActive 
                      ? `all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
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
