import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '../../molecules/Navigation/Navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { Moon, Sun } from '../../icons';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { label: t('portfolio'), active: activeSection === 'portfolio', id: 'portfolio' },
    { label: t('education'), active: activeSection === 'education', id: 'education' },
    { label: t('skills'), active: activeSection === 'skills', id: 'skills' },
    { label: t('contacts'), active: activeSection === 'contacts', id: 'contacts' },
  ];

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
  }, []);
  


  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
  };

  const scrollToSection = (sectionId: string) => {
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
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex w-full items-start justify-between py-4 px-4 md:px-20 ${theme === 'dark' ? 'bg-[#151515]/95' : 'bg-white/95'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} transition-colors duration-300`}>
        <button 
          onClick={() => scrollToSection('about')}
          className={`relative mt-[-1.00px] font-['Lato',Helvetica] font-semibold text-xs tracking-[0] leading-[normal] cursor-pointer transition-colors bg-transparent border-none ${
            activeSection === 'about' 
              ? theme === 'dark' ? 'text-white' : 'text-gray-800'
              : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t('about')}
        </button>

      {/* Mobile menu button */}
      <button 
        className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation items={navItems} onItemClick={scrollToSection} />
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 right-0 p-4 md:hidden z-50 ${theme === 'dark' ? 'bg-[#151515]' : 'bg-white border-t border-gray-200'}`}>
          <Navigation items={navItems} onItemClick={scrollToSection} />
        </div>
      )}

      {/* Theme and Language Switcher */}
      <div className="flex items-start space-x-3 font-['Lato',Helvetica] font-semibold text-xs tracking-[0] leading-[normal]">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`rounded transition-colors hover:bg-opacity-20 ${theme === 'dark' ? 'text-white hover:bg-white' : 'text-gray-800 hover:bg-gray-200'}`}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>
        
        {/* Language Switcher */}
        <div className="flex items-start space-x-1">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-2 rounded transition-colors ${
              currentLanguage === 'en' 
                ? theme === 'dark' ? 'text-white bg-white bg-opacity-20' : 'text-gray-800 bg-gray-200'
                : theme === 'dark' ? 'text-[#6d6d6d] hover:text-white' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t('language.en')}
          </button>
          <span className={theme === 'dark' ? 'text-[#6d6d6d]' : 'text-gray-600'}>/</span>
          <button
            onClick={() => handleLanguageChange('es')}
            className={`px-2 rounded transition-colors ${
              currentLanguage === 'es' 
                ? theme === 'dark' ? 'text-white bg-white bg-opacity-20' : 'text-gray-800 bg-gray-200'
                : theme === 'dark' ? 'text-[#6d6d6d] hover:text-white' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t('language.es')}
          </button>
        </div>
      </div>
    </header>
  );
};