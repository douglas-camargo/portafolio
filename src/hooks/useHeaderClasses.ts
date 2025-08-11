import { useMemo } from 'react';

interface UseHeaderClassesProps {
  theme: string;
  activeSection: string;
  currentLanguage: string;
  isMenuOpen: boolean;
}

export const useHeaderClasses = ({ theme, activeSection, currentLanguage, isMenuOpen }: UseHeaderClassesProps) => {
  const headerClasses = useMemo(() => {
    return `header-base ${theme === 'dark' ? 'header-dark' : 'header-light'}`;
  }, [theme]);



  const mobileMenuButtonClasses = useMemo(() => {
    return `mobile-menu-button-base ${theme === 'dark' ? 'mobile-menu-button-dark' : 'mobile-menu-button-light'}`;
  }, [theme]);

  const mobileMenuClasses = useMemo(() => {
    return `mobile-menu-base ${theme === 'dark' ? 'mobile-menu-dark' : 'mobile-menu-light'}`;
  }, [theme]);

  const themeToggleClasses = useMemo(() => {
    return `theme-toggle-base ${theme === 'dark' ? 'theme-toggle-dark' : 'theme-toggle-light'}`;
  }, [theme]);

  const getLanguageButtonClasses = useMemo(() => {
    return (language: string) => {
      const isActive = currentLanguage === language;
      const baseClasses = 'language-button-base';
      const activeClasses = isActive 
        ? (theme === 'dark' ? 'language-button-active-dark' : 'language-button-active-light')
        : (theme === 'dark' ? 'language-button-inactive-dark' : 'language-button-inactive-light');
      
      return `${baseClasses} ${activeClasses}`;
    };
  }, [theme, currentLanguage]);

  const mobileMenuButtonSpanClasses = useMemo(() => {
    const baseClasses = 'mobile-menu-span-base';
    return {
      top: `${baseClasses} ${isMenuOpen ? 'mobile-menu-span-top-open' : 'mobile-menu-span-top-closed'}`,
      middle: `${baseClasses} my-0.5 ${isMenuOpen ? 'mobile-menu-span-middle-open' : 'mobile-menu-span-middle-closed'}`,
      bottom: `${baseClasses} ${isMenuOpen ? 'mobile-menu-span-bottom-open' : 'mobile-menu-span-bottom-closed'}`
    };
  }, [isMenuOpen]);

  return {
    headerClasses,
    mobileMenuButtonClasses,
    mobileMenuClasses,
    themeToggleClasses,
    getLanguageButtonClasses,
    mobileMenuButtonSpanClasses
  };
};
