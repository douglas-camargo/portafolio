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
    // Convertir el índice simple (0, 1, 2, etc.) al índice del carrusel infinito
    // El carrusel comienza en el índice totalSlides (que es el primer elemento real)
    const carouselIndex = totalSlides + index;
    setCurrentCarouselIndex(index);
    
    // Llamar a la función onGoToIndex del carrusel con el índice correcto
    // Esta función será pasada desde el componente Projects
    return carouselIndex;
  }, [totalSlides]);

  const getDotClasses = useCallback((index: number) => {
    const isActive = index === currentCarouselIndex;
    const baseClasses = 'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer';
    const activeClasses = theme === 'dark' ? 'bg-white w-[35px]' : 'bg-gray-800 w-[35px]';
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