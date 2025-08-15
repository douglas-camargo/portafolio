import React, { useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
  duration?: number;
}

export const AlertModal: React.FC<AlertModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  message, 
  duration = 3000
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  const getAlertClasses = () => {
    const baseClasses = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] max-w-sm w-[calc(100%-2rem)] sm:w-full sm:max-w-sm rounded-lg shadow-lg border p-4 transition-all duration-300';
    
    if (type === 'success') {
      return `${baseClasses} ${
        theme === 'dark' 
          ? 'bg-green-800 border-green-500 text-green-300' 
          : 'bg-green-200 border-green-500 text-green-800'
      }`;
    } else {
      return `${baseClasses} ${
        theme === 'dark' 
          ? 'bg-red-800 border-red-500 text-red-300' 
          : 'bg-red-200 border-red-500 text-red-800'
      }`;
    }
  };

  const getIconClasses = () => {
    return `w-5 h-5 mr-3 flex-shrink-0 ${
      type === 'success' 
        ? (theme === 'dark' ? 'text-green-300' : 'text-green-700')
        : (theme === 'dark' ? 'text-red-300' : 'text-red-700')
    }`;
  };

  return (
    <div className={getAlertClasses()}>
      <div className="flex items-start">
        {type === 'success' ? (
          <svg className={getIconClasses()} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className={getIconClasses()} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
                 <button
           onClick={onClose}
           className={`ml-3 p-1 rounded-lg hover:bg-opacity-20 transition-colors ${
             type === 'success'
               ? (theme === 'dark' ? 'hover:bg-green-300' : 'hover:bg-green-700')
               : (theme === 'dark' ? 'hover:bg-red-300' : 'hover:bg-red-700')
           }`}
         >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
