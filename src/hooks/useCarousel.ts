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
  }, [isTransitioning, totalItems, externalIndex, onGoToIndex, onIndexChange]);

  const goToNext = useCallback(() => updateIndex(currentIndex + 1), [updateIndex, currentIndex]);
  const goToPrevious = useCallback(() => updateIndex(currentIndex - 1), [updateIndex, currentIndex]);

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

  const getTransformValue = useCallback(() => {
    const percentage = isMobile ? 100 : (screenSize === '2xl' ? 60.05 : 57);
    const baseTransform = currentIndex * percentage;
    
    if (isMobile && isDragging && dragOffset !== 0) {
      const dragPercentage = (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100;
      return baseTransform + dragPercentage;
    }
    
    return baseTransform;
  }, [isMobile, screenSize, currentIndex, isDragging, dragOffset]);

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