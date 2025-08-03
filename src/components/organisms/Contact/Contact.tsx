import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../atoms/Button/Button';
import { ArrowUp } from '../../icons';

export const Contact = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  const contactInfo = {
    email: 'ALEXANDERS@GMAIL.COM',
    phone: '+58 424 1232755',
  };

  const handleWhatsAppContact = () => {
    const numero = '584241232755';
    const mensaje = 'Hola!%20me%20interesa%20tu%20trabajo%20como%20desarrollador.';
    
    const versionPc = 'https://web.whatsapp.com/send?';
    const versionMobile = 'https://api.whatsapp.com/send?';
    
    // Función simple para detectar si es móvil
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    const url = isMobile() 
      ? `${versionMobile}phone=${numero}&text=${mensaje}` 
      : `${versionPc}phone=${numero}&text=${mensaje}`;
    
    window.open(url, '_blank');
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    
    // Ejecutar la función correspondiente según el botón
    switch (buttonName) {
      case 'WHATSAPP':
        handleWhatsAppContact();
        break;
      case 'GITHUB':
        window.open('https://github.com/douglas-camargo', '_blank');
        break;
      case 'LINKEDIN':
        window.open('https://www.linkedin.com/in/douglas-camargo-4858a5178/', '_blank');
        break;
      case 'GMAIL':
        window.open('mailto:alexanders@gmail.com', '_blank');
        break;
      default:
        break;
    }
  };

  const socialLinks = [
    { name: 'WHATSAPP' },
    { name: 'GITHUB' },
    { name: 'LINKEDIN' },
    { name: 'GMAIL' },
  ];

  return (
    <section id="contacts" className="w-full py-16 px-4 md:px-20">
      <div className="flex flex-col items-center">
        <div className={`font-['Lato',Helvetica] font-normal text-xs mb-5 ${theme === 'dark' ? 'text-[#676767]' : 'text-gray-600'}`}>
          {t('contact.getInTouch')}
        </div>

        <h2 className={`font-['Oswald',Helvetica] font-medium text-2xl md:text-4xl lg:text-[64px] leading-tight md:leading-[120px] mb-8 md:mb-16 text-center ${theme === 'dark' ? 'text-[#555555]' : 'text-gray-700'}`}>
          {contactInfo.email}
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <div className="flex flex-col -mt-0.5">
            <div className={`font-['Lato',Helvetica] font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-[#555555]' : 'text-gray-700'}`}>
              {t('contact.phone')}
            </div>
            <div className={`font-['Lato',Helvetica] font-normal text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {contactInfo.phone}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            {socialLinks.map((link, index) => (
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
            onClick={() => {
              const element = document.getElementById('portfolio');
              if (element) {
                const headerHeight = 80;
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="flex items-center cursor-pointer justify-center md:justify-start bg-transparent border-none -mt-0.5"
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