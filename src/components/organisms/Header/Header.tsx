import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '../../molecules/Navigation/Navigation';
import { useTheme } from '../../../contexts/ThemeContext';
import { Moon, Sun } from '../../icons';
import { Button } from '../../atoms/Button/Button';
import { useHeader } from '../../../hooks/useHeader';
import { useHeaderClasses } from '../../../hooks/useHeaderClasses';
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

  const {
    headerClasses,
    mobileMenuButtonClasses,
    mobileMenuClasses,
    themeToggleClasses,
    getLanguageButtonClasses,
    mobileMenuButtonSpanClasses
  } = useHeaderClasses({ theme, activeSection, currentLanguage, isMenuOpen });

  const getLanguageIndicatorClasses = (language: string) => {
    const isActive = currentLanguage === language;
    const baseClasses = 'absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300';
    return isActive 
      ? `${baseClasses} ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}`
      : `${baseClasses} opacity-0`;
  };

  return (
    <header className={headerClasses}>
      {/* Left side */}
      <div className="flex items-center">
        <Button
          variant="outline"
          size="sm"
          className="rounded-[23px] w-[106px]"
          onClick={() => window.open('https://github.com/douglas-camargo/portafolio', '_blank')}
        >
          {t('code')}
        </Button>
      </div>

      {/* Center - Desktop Navigation / Mobile menu button */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <Navigation items={navItems} onItemClick={scrollToSection} />
      </div>

      {/* Mobile menu button - centered */}
      <div className="relative md:hidden flex items-center justify-center flex-1">
        <button 
          className={mobileMenuButtonClasses}
          onClick={toggleMenu}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={mobileMenuButtonSpanClasses.top}></span>
            <span className={mobileMenuButtonSpanClasses.middle}></span>
            <span className={mobileMenuButtonSpanClasses.bottom}></span>
          </div>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={mobileMenuClasses}>
            <Navigation items={navItems} onItemClick={scrollToSection} />
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3 font-['Lato',Helvetica] font-semibold text-xs tracking-[0] leading-[normal]">
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
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleLanguageChange('en')}
            className={getLanguageButtonClasses('en')}
          >
            {t('language.en')}
            <div className={getLanguageIndicatorClasses('en')} />
          </button>
          <span className="text-gray-500 font-extrabold scale-x-150">/</span>
          <button
            onClick={() => handleLanguageChange('es')}
            className={getLanguageButtonClasses('es')}
          >
            {t('language.es')}
            <div className={getLanguageIndicatorClasses('es')} />
          </button>
        </div>
      </div>
    </header>
  );
};
