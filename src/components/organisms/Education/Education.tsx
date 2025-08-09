import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Separator } from '../../atoms/Separator/Separator';
import { AnimationProps } from '../../../hooks/useAnimations';
import { getEducationData } from './educationData';

export const Education: React.FC<Partial<AnimationProps>> = ({ isLoaded }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const educationData = getEducationData(t);

  return (
    <section id="education" className="w-full py-8 lg:py-12 px-4 md:px-20">
      <div>
        <h2 className={`font-light text-2xl md:text-4xl mb-4 md:mb-6 font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {t('educationSection.title')}
        </h2>
      </div>

      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="md:col-span-1"></div>
          <div className="md:col-span-1">
            <p className={`font-medium text-lg md:text-2xl font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              {t('educationSection.description')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        {educationData.map((item, index) => (
          <div key={index} className="w-full mb-8 md:mb-4">
            <Separator className={`w-full h-px my-4 ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <p className={`font-semibold text-xs font-['Lato',Helvetica] mb-4 md:mb-0 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  {item.title}
                </p>
              </div>

              <div className="md:col-span-1">
                {Array.isArray(item.details) ? (
                  <div className="space-y-4">
                    {item.details.map((detail, detailIndex) => (
                      <React.Fragment key={detailIndex}>
                        {typeof detail === 'string' ? (
                          <p className={`font-normal text-xs font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                            {detail}
                          </p>
                        ) : (
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = detail.url;
                              link.target = '_blank';
                              link.rel = 'noopener noreferrer';
                              link.click();
                            }}
                            className={`font-normal text-xs font-['Lato',Helvetica] text-blue-500 hover:text-blue-600 underline ${theme === 'dark' ? 'hover:text-blue-400' : ''}`}
                          >
                            {detail.name}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p className={`font-normal text-xs font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
