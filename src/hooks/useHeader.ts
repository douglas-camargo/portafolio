import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

interface UseHeaderProps {
  onIndexChange?: (index: number) => void;
}

export const useHeader = ({ onIndexChange }: UseHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const sections = ['about', 'portfolio', 'education', 'skills', 'contacts'];
  
    const handleScroll = () => {
      let maxVisibleRatio = 0;
      let currentActiveSection = activeSection;
  
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
  
          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, windowHeight);
          const visibleHeight = Math.max(visibleBottom - visibleTop, 0);
  
          const ratio = visibleHeight / rect.height;
  
          if (ratio > maxVisibleRatio && ratio > 0.3) {
            maxVisibleRatio = ratio;
            currentActiveSection = sectionId;
          }
        }
      });
  
      setActiveSection(currentActiveSection);
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleLanguageChange = useCallback((language: string) => {
    changeLanguage(language);
  }, [changeLanguage]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura aproximada del header fijo
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    
    // Cerrar el menú móvil si está abierto
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    activeSection,
    currentLanguage,
    handleLanguageChange,
    scrollToSection,
    toggleMenu
  };
}; 