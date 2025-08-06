import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCarouselProps {
  totalItems: number;
  onIndexChange?: (index: number) => void;
  currentIndex?: number;
  onGoToIndex?: (index: number) => void;
}

export const useCarousel = ({ 
  totalItems, 
  onIndexChange, 
  currentIndex: externalIndex, 
  onGoToIndex 
}: UseCarouselProps) => {
  const [internalIndex, setInternalIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [hoveredButton, setHoveredButton] = useState<'prev' | 'next' | null>(null);
  const [infiniteIndex, setInfiniteIndex] = useState(totalItems);

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

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

  const updateIndex = useCallback((newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Si el índice es negativo, calcular el equivalente positivo
    if (newIndex < 0) {
      // Calcular cuántos ciclos completos hacia atrás ha hecho
      const cyclesBack = Math.ceil(Math.abs(newIndex) / totalItems);
      
      // Si ha completado 5 ciclos hacia atrás, reiniciar al último elemento
      if (cyclesBack >= 6) {
        const resetIndex = totalItems + totalItems - 1; // Último elemento
        
        setInfiniteIndex(resetIndex);
        
        if (externalIndex !== undefined) {
          onGoToIndex?.(resetIndex);
        } else {
          setInternalIndex(resetIndex);
        }
        onIndexChange?.(totalItems - 1); // Último elemento
      } else {
        // Calcular el índice equivalente en el rango positivo
        const adjustedIndex = totalItems * 5 + newIndex;
        
        setInfiniteIndex(adjustedIndex);
        
        const realIndex = ((newIndex % totalItems) + totalItems) % totalItems;
        
        if (externalIndex !== undefined) {
          onGoToIndex?.(adjustedIndex);
        } else {
          setInternalIndex(adjustedIndex);
        }
        onIndexChange?.(realIndex);
      }
    } else {
      // Calcular cuántos ciclos completos ha hecho hacia adelante
      const cyclesCompleted = Math.floor(newIndex / totalItems);
      
      // Si ha completado 5 ciclos, reiniciar al primer elemento
      if (cyclesCompleted >= 5) {
        const resetIndex = totalItems; // Reiniciar al primer elemento
        
        setInfiniteIndex(resetIndex);
        
        if (externalIndex !== undefined) {
          onGoToIndex?.(resetIndex);
        } else {
          setInternalIndex(resetIndex);
        }
        onIndexChange?.(0); // Primer elemento
      } else {
        // Usar el índice normal para los primeros 5 ciclos
        setInfiniteIndex(newIndex);
        
        // Calcular el índice real para las callbacks
        const realIndex = ((newIndex % totalItems) + totalItems) % totalItems;
        
        if (externalIndex !== undefined) {
          onGoToIndex?.(newIndex);
        } else {
          setInternalIndex(newIndex);
        }
        onIndexChange?.(realIndex);
      }
    }
    
    // Limpiar la transición después de la animación
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, totalItems, externalIndex, onGoToIndex, onIndexChange]);

  const goToNext = useCallback(() => updateIndex(infiniteIndex + 1), [updateIndex, infiniteIndex]);
  const goToPrevious = useCallback(() => updateIndex(infiniteIndex - 1), [updateIndex, infiniteIndex]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  }, [isMobile]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isMobile || !touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    setDragOffset(diff);
    e.preventDefault();
  }, [isMobile, touchStart]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
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
  }, [isMobile, touchStart, goToNext, goToPrevious]);

  const getTransformValue = useCallback(() => {
    let percentage;
    
    if (isMobile) {
      percentage = 100;
    } else if (screenSize === 'desktop') {
      percentage = 55.2;
    } else if (screenSize === '2xl') {
      percentage = 60.15;
    } else {
      percentage = 60.08; // Default para otros casos
    }
    
    const baseTransform = infiniteIndex * percentage;
    let finalTransform = baseTransform;
    
    // Aplicar drag en móvil
    if (isMobile && isDragging && dragOffset !== 0) {
      const dragPercentage = (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100;
      finalTransform += dragPercentage;
    }
    
    return finalTransform;
  }, [isMobile, screenSize, infiniteIndex, isDragging, dragOffset]);

  return {
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
  };
};