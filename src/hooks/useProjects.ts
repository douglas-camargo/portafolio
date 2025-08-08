import { useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useProjects = () => {
  const { theme } = useTheme();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  const PROJECTS_DATA = [
    {
      id: 1,
      tags: [
        { id: 1, name: 'REACT' },
        { id: 2, name: 'JAVASCRIPT' },
        { id: 3, name: 'TAILWINDCSS' },
      ],
      image: '/images/project-restaurant.webp',
      showViewButton: true,
      githubUrl: 'https://github.com/douglas-camargo/lading_restaurant',
      pageUrl: 'https://restaurant-black-alpha.vercel.app/',
      backendUrl: '',
      showFrontendBackendLabels: false,
    },
    {
      id: 2,
      tags: [
        { id: 1, name: 'REACT' },
        { id: 2, name: 'TYPESCRIPT' },
        { id: 3, name: 'TAILWINDCSS' },
        { id: 4, name: 'EXPRESS' },
      ],
      image: '/images/project-clinic.webp',
      showViewButton: true,
      githubUrl: 'https://github.com/douglas-camargo/landing_clinic',
      pageUrl: 'https://landing-clinic.vercel.app/',
      backendUrl: 'https://github.com/douglas-camargo/backend_landing_clinica',
      showFrontendBackendLabels: true,
    },
    {
      id: 3,
      tags: [
        { id: 1, name: 'NEXT.JS' },
        { id: 3, name: 'JAVASCRIPT' },
        { id: 2, name: 'TAILWINDCSS' },
      ],
      image: '/images/pokemon-explorer.webp',
      showViewButton: false,
      githubUrl: 'https://github.com/douglas-camargo/Pokemon-explorer',
      pageUrl: 'https://pokemon-explorer-seven.vercel.app/',
      backendUrl: '',
      showFrontendBackendLabels: false,
    },
    {
      id: 4,
      tags: [
        { id: 1, name: 'REACT' },
        { id: 2, name: 'JAVASCRIPT' },
        { id: 3, name: 'TAILWINDCSS' },
      ],
      image: '/images/project-lawyers.webp',
      showViewButton: true,
      githubUrl: 'https://github.com/douglas-camargo/landing_lawyers',
      pageUrl: 'https://landing-lawyers.vercel.app/',
      backendUrl: '',
      showFrontendBackendLabels: false,
    },
    {
      id: 5,
      tags: [
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'JAVASCRIPT' },
      ],
      image: '/images/project-hsectechnology.webp',
      showViewButton: false,
      githubUrl: '',
      pageUrl: 'https://hsectechnology.com/index.html',
      backendUrl: '',
      showFrontendBackendLabels: false,
    },
    {
      id: 6,
      tags: [
        { id: 1, name: 'NEXT.JS' },
        { id: 2, name: 'JAVASCRIPT' },
        { id: 3, name: 'CSS' },
      ],
      image: '/images/project-security.webp',
      showViewButton: false,
      githubUrl: '',
      pageUrl: 'https://quizzical-wozniak-484579.netlify.app/',
      backendUrl: '',
      showFrontendBackendLabels: false,
    },
  ];
  
  const totalSlides = PROJECTS_DATA.length;

  const handleCarouselIndexChange = useCallback((index: number) => {
    setCurrentCarouselIndex(index);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentCarouselIndex(index);
  }, []);

  const getDotClasses = useCallback((index: number) => {
    const isActive = index === currentCarouselIndex;
    const baseClasses = 'h-1.5 rounded-full transition-all duration-300';
    
    if (isActive) {
      const bgColor = theme === 'dark' ? 'bg-white' : 'bg-gray-800';
      return `${baseClasses} w-8 ${bgColor}`;
    } else {
      const bgColor = theme === 'dark' ? 'bg-white/50' : 'bg-gray-400';
      return `${baseClasses} w-2 ${bgColor}`;
    }
  }, [currentCarouselIndex, theme]);

  return {
    PROJECTS_DATA,
    currentCarouselIndex,
    totalSlides,
    handleCarouselIndexChange,
    goToSlide,
    getDotClasses
  };
}; 