import { useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useEducation = () => {
  const { theme } = useTheme();

  const handleCertificateClick = useCallback((url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  }, []);

  const getCertificateButtonClasses = useCallback(() => {
    return `px-3 py-1 text-xs font-semibold rounded-md transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
    }`;
  }, [theme]);

  const getSeparatorClasses = useCallback(() => {
    return `w-full ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`;
  }, [theme]);

  return {
    handleCertificateClick,
    getCertificateButtonClasses,
    getSeparatorClasses
  };
};
