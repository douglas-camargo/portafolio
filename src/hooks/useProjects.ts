import { useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { PROJECTS_DATA } from '../components/organisms/Projects/projectsData';

export const useProjects = () => {
  const { theme } = useTheme();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  const totalSlides = PROJECTS_DATA.length;

  const handleCarouselIndexChange = useCallback((index: number) => {
    setCurrentCarouselIndex(index);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentCarouselIndex(index);
  }, []);

  const getDotClasses = useCallback((index: number) => {
    const isActive = index === currentCarouselIndex;
    const baseClasses = 'w-3 h-3 rounded-full transition-all duration-300';
    const activeClasses = theme === 'dark' ? 'bg-white' : 'bg-gray-800';
    const inactiveClasses = theme === 'dark' ? 'bg-white/30 hover:bg-white/50' : 'bg-gray-300 hover:bg-gray-400';
    
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  }, [currentCarouselIndex, theme]);

  return {
    PROJECTS_DATA,
    currentCarouselIndex,
    totalSlides,
    handleCarouselIndexChange,
    goToSlide,
    getDotClasses,
  };
}; 