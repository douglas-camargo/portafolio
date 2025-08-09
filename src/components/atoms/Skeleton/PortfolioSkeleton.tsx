import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Skeleton } from './Skeleton';

export const PortfolioSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  const bgClass = theme === 'dark' ? 'bg-[#151515]' : 'bg-gray-50';

  return (
    <div className={`${bgClass} flex flex-row justify-center w-full min-h-screen transition-colors duration-300`}>
      <div className={`${bgClass} overflow-hidden w-full max-w-[1366px] relative`}>
        {/* Header Skeleton */}
        <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-start justify-between py-4 px-4 md:px-20 backdrop-blur-sm border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#151515]/95">
          <Skeleton width="w-16" height="h-4" />
          <div className="hidden md:flex space-x-6">
            <Skeleton width="w-20" height="h-4" />
            <Skeleton width="w-24" height="h-4" />
            <Skeleton width="w-20" height="h-4" />
            <Skeleton width="w-16" height="h-4" />
            <Skeleton width="w-20" height="h-4" />
          </div>
          <div className="flex space-x-3">
            <Skeleton width="w-4" height="h-4" rounded="full" />
            <div className="flex space-x-1">
              <Skeleton width="w-8" height="h-4" />
              <Skeleton width="w-8" height="h-4" />
            </div>
          </div>
        </header>

        {/* Hero Section Skeleton */}
        <section className="flex flex-col items-start px-4 md:px-20 py-8 lg:py-16 w-full relative mt-20">
          <div className="w-full flex flex-col lg:flex-row items-start gap-8 mb-5 lg:mb-14">
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

        {/* Projects Section Skeleton */}
        <section className="w-full py-8 lg:py-12 relative px-4 md:px-20">
          <Skeleton width="w-48" height="h-8" className="mb-8" />
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="space-y-4">
                  <Skeleton width="w-full" height="h-64" rounded="2xl" />
                  <div className="space-y-3">
                    <Skeleton width="w-3/4" height="h-4" />
                    <div className="flex gap-2">
                      <Skeleton width="w-16" height="h-6" rounded="lg" />
                      <Skeleton width="w-20" height="h-6" rounded="lg" />
                      <Skeleton width="w-18" height="h-6" rounded="lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} width="w-3" height="h-3" rounded="full" />
              ))}
            </div>
          </div>
        </section>

        {/* Education Section Skeleton */}
        <section className="w-full py-8 lg:py-12 px-4 md:px-20">
          <Skeleton width="w-32" height="h-8" className="mb-8" />
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="md:col-span-1"></div>
              <div className="md:col-span-1">
                <div className="space-y-3">
                  <Skeleton width="w-full" height="h-4" />
                  <Skeleton width="w-3/4" height="h-4" />
                  <Skeleton width="w-4/5" height="h-4" />
                  <Skeleton width="w-2/3" height="h-4" />
                </div>
              </div>
            </div>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-4">
                <Skeleton width="w-full" height="h-px" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="md:col-span-1">
                    <Skeleton width="w-32" height="h-4" />
                  </div>
                  <div className="md:col-span-1">
                    <div className="space-y-2">
                      <Skeleton width="w-3/4" height="h-4" />
                      <Skeleton width="w-2/3" height="h-4" />
                      <Skeleton width="w-1/2" height="h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section Skeleton */}
        <section className="w-full py-8 lg:py-16 px-4 md:px-20">
          <Skeleton width="w-full" height="h-32" className="mb-8" />
          <div className="space-y-8">
            <Skeleton width="w-48" height="h-8" />
            <div className="space-y-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="space-y-4">
                  <Skeleton width="w-full" height="h-px" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="md:col-span-1">
                      <Skeleton width="w-32" height="h-4" />
                    </div>
                    <div className="md:col-span-1">
                      <div className="space-y-4">
                        <Skeleton width="w-3/4" height="h-4" />
                        <Skeleton width="w-2/3" height="h-4" />
                        <Skeleton width="w-4/5" height="h-4" />
                        <Skeleton width="w-1/2" height="h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section Skeleton */}
        <section className="w-full py-8 lg:py-16 px-4 md:px-20">
          <div className="flex flex-col items-center space-y-8">
            <Skeleton width="w-32" height="h-4" />
            <Skeleton width="w-96 max-w-full" height="h-16" />
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full gap-8">
              <div className="flex flex-col space-y-2">
                <Skeleton width="w-20" height="h-4" />
                <Skeleton width="w-32" height="h-4" />
              </div>
              <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton key={item} width="w-24" height="h-8" rounded="full" />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton width="w-20" height="h-4" />
                <Skeleton width="w-4" height="h-4" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
