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
  
  // Usar índice externo si se proporciona, sino usar el interno
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

  // Calcular el porcentaje de traslación basado en el tamaño de pantalla
  const getTranslatePercentage = () => {
    if (screenSize === 'mobile') {
      return 102.5; // 1 imagen por vista en móvil y tablet
    } else if (screenSize === 'tablet') {
      return 101.25;
    } else if (screenSize === 'desktop') {
      return 55; // Ajustado para que la imagen se vea completa incluyendo el gap
    } else {
      return 60; // Ajustado para que la imagen se vea completa incluyendo el gap
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div 
          className={`flex transition-transform duration-300 ease-in-out ${
            screenSize === 'mobile' || screenSize === 'tablet' ? 'gap-2' : 'gap-0.5'
          }`} // gap-0.5 = 2px para lg y superiores, gap-2 = 8px para móvil y tablet
          style={{ 
            transform: `translateX(-${currentIndex * getTranslatePercentage()}%)` 
          }}
        >
          {childrenArray.map((child, index) => {
            // Determinar si esta imagen está en la posición izquierda
            const isLeftPosition = index === currentIndex;

            if (React.isValidElement(child)) {
              return (
                <div 
                  key={index} 
                  className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${
                    screenSize === 'mobile' || screenSize === 'tablet' ? 'w-full' : 
                    screenSize === 'desktop' ? 'w-[calc(55%-1px)]' : // Ajustar por el gap de 2px
                    'w-[calc(60%-1px)]' // Ajustar por el gap de 2px
                  } ${
                    hoveredImageIndex === index ? 'scale-105' : 'scale-100'
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
            // If not a valid ReactElement, just render as is
            return child;
          })}
        </div>
      </div>

      <Button
        variant="secondary"
        size="lg"
        className={`absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] z-10 left-2 transition-transform duration-300 ease-in-out ${
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