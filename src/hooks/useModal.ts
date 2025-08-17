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
    const baseClasses = 'relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-xl shadow-2xl transition-all duration-300 flex flex-col border';
    
    if (theme === 'dark') {
      return `${baseClasses} bg-[#151515] border-white/20`;
    } else {
      return `${baseClasses} bg-popover border-border`;
    }
  }, [theme]);

  const getHeaderClasses = useCallback(() => {
    const baseClasses = 'flex items-center justify-between p-4 sm:p-6 border-b flex-shrink-0';
    
    if (theme === 'dark') {
      return `${baseClasses} border-white/20`;
    } else {
      return `${baseClasses} border-border`;
    }
  }, [theme]);

  const getTitleClasses = useCallback(() => {
    const baseClasses = 'text-lg sm:text-xl md:text-2xl font-semibold';
    
    if (theme === 'dark') {
      return `${baseClasses} text-white`;
    } else {
      return `${baseClasses} text-popover-foreground`;
    }
  }, [theme]);

  const getCloseButtonClasses = useCallback(() => {
    const baseClasses = 'p-2 rounded-lg transition-colors';
    
    if (theme === 'dark') {
      return `${baseClasses} text-gray-400 hover:text-white hover:bg-white/10`;
    } else {
      return `${baseClasses} text-muted-foreground hover:text-foreground hover:bg-muted`;
    }
  }, [theme]);

  return {
    getModalClasses,
    getHeaderClasses,
    getTitleClasses,
    getCloseButtonClasses
  };
};
