import { useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const useModal = ({ isOpen, onClose }: UseModalProps) => {
  const { theme } = useTheme();

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  const getModalClasses = useCallback(() => {
    return `relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-xl shadow-2xl transition-all duration-300 flex flex-col ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`;
  }, [theme]);

  const getHeaderClasses = useCallback(() => {
    return `flex items-center justify-between p-4 sm:p-6 border-b flex-shrink-0 ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    }`;
  }, [theme]);

  const getTitleClasses = useCallback(() => {
    return `text-lg sm:text-xl md:text-2xl font-semibold ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`;
  }, [theme]);

  const getCloseButtonClasses = useCallback(() => {
    return `p-2 rounded-lg hover:bg-opacity-10 transition-colors ${
      theme === 'dark' 
        ? 'text-gray-400 hover:bg-gray-400' 
        : 'text-gray-500 hover:bg-gray-500'
    }`;
  }, [theme]);

  return {
    getModalClasses,
    getHeaderClasses,
    getTitleClasses,
    getCloseButtonClasses
  };
};
