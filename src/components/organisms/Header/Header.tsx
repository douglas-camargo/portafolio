import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '../../molecules/Navigation/Navigation';
import { useTheme } from '../../../contexts/ThemeContext';
import { Moon, Sun } from '../../icons';
import { useHeader } from '../../../hooks/useHeader';
import { getNavItems } from './headerData';

export const Header = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  const {
    isMenuOpen,
    activeSection,
    currentLanguage,
    handleLanguageChange,
    scrollToSection,
    toggleMenu
  } = useHeader({});

  const navItems = getNavItems(t).map(item => ({
    ...item,
    active: activeSection === item.id
  }));

  const headerClasses = `fixed top-0 left-0 right-0 z-50 flex w-full items-start justify-between py-4 px-4 md:px-20 ${theme === 'dark' ? 'bg-[#151515]/95' : 'bg-white/95'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} transition-colors duration-300`;

  const aboutButtonClasses = `relative mt-[-1.00px] font-['Lato',Helvetica] font-semibold text-xs tracking-[0] leading-[normal] cursor-pointer transition-colors bg-transparent border-none ${
    activeSection === 'about' 
      ? theme === 'dark' ? 'text-white' : 'text-gray-800'
      : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
  }`;

  const mobileMenuButtonClasses = `md:hidden ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`;

  const mobileMenuClasses = `absolute top-full left-0 right-0 p-4 md:hidden z-50 ${theme === 'dark' ? 'bg-[#151515]' : 'bg-white border-t border-gray-200'}`;

  const themeToggleClasses = `rounded transition-colors hover:bg-opacity-20 ${theme === 'dark' ? 'text-white hover:bg-white' : 'text-gray-800 hover:bg-gray-200'}`;

  const getLanguageButtonClasses = (language: string) => {
    const isActive = currentLanguage === language;
    return `px-2 rounded transition-colors ${
      isActive 
        ? theme === 'dark' ? 'text-white bg-white bg-opacity-20' : 'text-gray-800 bg-gray-200'
        : theme === 'dark' ? 'text-[#6d6d6d] hover:text-white' : 'text-gray-600 hover:text-gray-800'
    }`;
  };

  return (
    <header className={headerClasses}>
      <button 
        onClick={() => scrollToSection('about')}
        className={aboutButtonClasses}
      >
        {t('about')}
      </button>

      {/* Mobile menu button */}
      <button 
        className={mobileMenuButtonClasses}
        onClick={toggleMenu}
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
        <div className={mobileMenuClasses}>
          <Navigation items={navItems} onItemClick={scrollToSection} />
        </div>
      )}

      {/* Theme and Language Switcher */}
      <div className="flex items-start space-x-3 font-['Lato',Helvetica] font-semibold text-xs tracking-[0] leading-[normal]">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={themeToggleClasses}
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
            className={getLanguageButtonClasses('en')}
          >
            {t('language.en')}
          </button>
          <button
            onClick={() => handleLanguageChange('es')}
            className={getLanguageButtonClasses('es')}
          >
            {t('language.es')}
          </button>
        </div>
      </div>
    </header>
  );
};