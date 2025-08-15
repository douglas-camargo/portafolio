import { useEffect, useCallback } from 'react';

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const useModal = ({ isOpen, onClose }: UseModalProps) => {

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
    return `relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-xl shadow-2xl transition-all duration-300 flex flex-col bg-popover border border-border`;
  }, []);

  const getHeaderClasses = useCallback(() => {
    return `flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0`;
  }, []);

  const getTitleClasses = useCallback(() => {
    return `text-lg sm:text-xl md:text-2xl font-semibold text-popover-foreground`;
  }, []);

  const getCloseButtonClasses = useCallback(() => {
    return `p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground`;
  }, []);

  return {
    getModalClasses,
    getHeaderClasses,
    getTitleClasses,
    getCloseButtonClasses
  };
};
