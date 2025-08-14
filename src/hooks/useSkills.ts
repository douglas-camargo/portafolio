import { useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useSkills = () => {
  const { theme } = useTheme();

  const getTitleClasses = useCallback(() => {
    return `leading-tight lg:!leading-[150px] font-medium xl:indent-[-5px] text-4xl md:text-6xl lg:text-9xl font-['Oswald',Helvetica] mb-3 ${
      theme === 'dark' ? 'text-white' : 'text-gray-800'
    }`;
  }, [theme]);

  const getSubtitleClasses = useCallback(() => {
    return `mb-6 font-light text-2xl md:text-4xl font-['Lato',Helvetica] ${
      theme === 'dark' ? 'text-white' : 'text-gray-800'
    }`;
  }, [theme]);

  const getTechIconClasses = useCallback((techName: string) => {
    return `w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 ${
      techName === 'GitHub' && theme === 'dark' ? 'bg-white rounded p-1' : ''
    }`;
  }, [theme]);

  const getTechNameClasses = useCallback(() => {
    return `text-xs text-center font-['Lato',Helvetica] ${
      theme === 'dark' ? 'text-white' : 'text-gray-700'
    }`;
  }, [theme]);

  const getSeparatorClasses = useCallback(() => {
    return `w-full ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`;
  }, [theme]);

  const getCategoryTitleClasses = useCallback(() => {
    return `font-semibold text-xs font-['Lato',Helvetica] mb-4 md:mb-0 ${
      theme === 'dark' ? 'text-white' : 'text-gray-700'
    }`;
  }, [theme]);

  const getSkillNameClasses = useCallback(() => {
    return `font-normal text-sm font-['Lato',Helvetica] ${
      theme === 'dark' ? 'text-white' : 'text-gray-700'
    }`;
  }, [theme]);

  return {
    getTitleClasses,
    getSubtitleClasses,
    getTechIconClasses,
    getTechNameClasses,
    getSeparatorClasses,
    getCategoryTitleClasses,
    getSkillNameClasses
  };
};
