import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Skeleton } from './Skeleton';

export const HeroSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const { currentLanguage } = useLanguage();
  
  const bgClass = theme === 'dark' ? 'bg-[#151515]' : 'bg-gray-50';

  return (
    <div className={`${bgClass} flex flex-row justify-center w-full min-h-screen transition-colors duration-300`}>
      <div className={`${bgClass} overflow-hidden w-full max-w-[1366px] relative`}>
        {/* Header Skeleton */}
        <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between py-4 px-4 md:px-20 backdrop-blur-sm border-b transition-colors duration-300 w-full max-w-[1366px] bg-white/95 dark:bg-[#151515]/95 border-gray-200 dark:border-white/10">
          {/* Code Button Skeleton */}
          {/* <div className="w-[106px] h-[34px] rounded-[23px] border-2 border-gray-800 dark:border-white bg-transparent flex items-center justify-center"> */}
          <div className="w-[106px] h-[34px] rounded-[8px] border-2 border-gray-800 dark:border-white bg-transparent flex items-center justify-center">
            <Skeleton width="w-12" height="h-4" rounded="none" />
          </div>
          
          {/* Mobile menu button and navigation container skeleton */}
          <div className="relative">
            <div className="md:hidden">
              <Skeleton width="w-6" height="h-6" />
            </div>
          </div>
          
          {/* Desktop Navigation Skeleton */}
          <div className="hidden md:flex space-x-6">
            <Skeleton width="w-20" height="h-4" />
            <Skeleton width="w-24" height="h-4" />
            <Skeleton width="w-20" height="h-4" />
            <Skeleton width="w-16" height="h-4" />
            <Skeleton width="w-20" height="h-4" />
          </div>
          
          {/* Theme and Language Switcher Skeleton */}
          <div className="flex items-center space-x-3">
            <Skeleton width="w-4" height="h-4" rounded="full" />
            <div className="flex items-center space-x-1">
              <Skeleton width="w-8" height="h-4" />
              <span className="text-gray-500 font-extrabold scale-x-150">/</span>
              <Skeleton width="w-8" height="h-4" />
            </div>
          </div>
        </header>

        {/* Hero Section Skeleton */}
        <section className="flex flex-col items-start px-4 md:px-20 py-8 lg:py-16 w-full relative mt-20">
          <div className="w-full flex flex-col lg:flex-row items-start gap-8 mb-5 lg:mb-0">
            {/* Right side - Image (order-first lg:order-last) */}
            <div className="flex-shrink-0 w-full lg:w-[514px] h-[300px] sm:h-[400px] md:h-[500px] relative order-first lg:order-last">
              <Skeleton width="w-full" height="h-full" rounded="xl" />
            </div>

            {/* Left side - Text content */}
            <div className="flex-1 max-w-full lg:max-w-[670px] text-center lg:text-left space-y-6">
              <Skeleton width="w-64" height="h-8" />
              <div className="space-y-4">
                <Skeleton width="w-full" height="h-16" />
                <Skeleton width="w-3/4" height="h-16" />
              </div>
              <div className="space-y-3">
                <Skeleton width="w-full" height="h-4" />
                <Skeleton width="w-5/6" height="h-4" />
                <Skeleton width="w-4/5" height="h-4" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Skeleton width="w-full sm:w-52" height="h-12" rounded="lg" />
            <Skeleton width="w-full sm:w-52" height="h-12" rounded="lg" />
          </div>
        </section>
      </div>
    </div>
  );
};
