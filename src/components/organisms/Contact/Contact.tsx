import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../atoms/Button/Button';
import { ArrowUp } from '../../icons';
import { useContact } from '../../../hooks/useContact';
import { AnimationProps } from '../../../hooks/useAnimations';
import { CONTACT_INFO, SOCIAL_LINKS } from './contactData';

export const Contact: React.FC<Partial<AnimationProps>> = ({ isLoaded }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { activeButton, handleButtonClick, handleBackToTop } = useContact();

  return (
    <section id="contacts" className="w-full py-8 lg:py-16 px-4 md:px-20">
      <div className="flex flex-col items-center">
        <div className={`font-['Lato',Helvetica] font-normal text-xs mb-5 ${theme === 'dark' ? 'text-[#676767]' : 'text-gray-600'}`}>
          {t('contact.getInTouch')}
        </div>

        <h2 className={`font-['Oswald',Helvetica] font-medium text-2xl md:text-4xl lg:text-[64px] leading-tight md:leading-[120px] mb-8 md:mb-16 text-center ${theme === 'dark' ? 'text-[#555555]' : 'text-gray-700'}`}>
          {CONTACT_INFO.email}
        </h2>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full gap-8">
          <div className="flex flex-col -mt-0.5 text-center md:text-left">
            <div className={`font-['Lato',Helvetica] font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-[#555555]' : 'text-gray-700'}`}>
              {t('contact.phone')}
            </div>
            <div className={`font-['Lato',Helvetica] font-normal text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {CONTACT_INFO.phone}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            {SOCIAL_LINKS.map((link, index) => (
              <div key={index}>
                <Button
                  variant={activeButton === link.name ? 'secondary' : 'outline'}
                  size="sm"
                  className="rounded-[23px] w-full md:w-[106px]"
                  onClick={() => handleButtonClick(link.name)}
                >
                  {link.name}
                </Button>
              </div>
            ))}
          </div>

          <button 
            onClick={handleBackToTop}
            className="flex items-center cursor-pointer justify-center bg-transparent border-none -mt-0.5"
          >
            <span className={`font-['Lato',Helvetica] font-semibold text-sm mr-1 ${theme === 'dark' ? 'text-[#555555]' : 'text-gray-700'}`}>
              {t('contact.backToTop')}
            </span>
            <ArrowUp className={`w-[9px] h-[11px] ${theme === 'dark' ? 'text-[#555555]' : 'text-gray-700'}`} />
          </button>
        </div>
      </div>
    </section>
  );
};