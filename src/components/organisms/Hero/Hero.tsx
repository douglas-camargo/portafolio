import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../atoms/Button/Button';
import { Card, CardContent } from '../../atoms/Card/Card';

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const handleDownloadCV = () => {
    const currentLanguage = i18n.language;
    let downloadUrl = '';
    
    if (currentLanguage === 'es') {
      downloadUrl = 'https://drive.google.com/uc?export=download&id=1M3zII4aGkgSoF9_a6x3TEx-FYViPnxgw';
    } else {
      downloadUrl = 'https://drive.google.com/uc?export=download&id=1mEQcgVAv3zH1OhNMAxS_SPzBR9Th1E4d';
    }
    
    // Crear un enlace temporal y hacer clic en él para descargar
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `CV_Alexander_Suarez_${currentLanguage === 'es' ? 'ES' : 'EN'}.pdf`;
    // link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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



  return (
    <section id="about" className="flex flex-col items-start px-4 md:px-20 py-8 md:py-16 w-full relative mt-20">
      <div className={`font-['Lato',Helvetica] font-extralight text-lg md:text-4xl tracking-[0] leading-normal mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {t('hero.title')}
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start gap-8 mb-14">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-full lg:max-w-[670px]">
          <h1 className={`font-['Oswald',Helvetica] font-medium text-4xl md:text-6xl lg:text-9xl tracking-[0] leading-tight md:leading-[120px] mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t('hero.name').split(' ')[0]}
            <br />
            {t('hero.name').split(' ')[1]}
          </h1>

          <Card className="bg-transparent border-0 mb-8">
            <CardContent className="p-0 md:p-3.5">
              <p className={`font-['Lato',Helvetica] font-semibold text-sm leading-normal ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                {t('hero.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Image */}
        <div className="flex-shrink-0 w-full lg:w-[514px] h-[300px] md:h-[386px] relative order-first lg:order-last">
          <div className="relative h-full rounded-[20px] overflow-hidden">
            <img
              className="absolute w-full h-full object-cover rounded-[20px]"
              alt="Profile photo"
              src="https://images.pexels.com/photos/1606609/pexels-photo-1606609.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <div className="w-full rounded-[20px] bg-gradient-to-r from-[#151515] via-[#313131]/50 to-transparent absolute h-full top-0 left-0" />
          </div>
        </div>
      </div>

      {/* Buttons - moved outside the flex container */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 md:px-0">
        <Button className="w-full sm:w-52" onClick={handleWhatsAppContact}>
          {t('hero.contactMe')}
        </Button>

        <Button variant="outline" className="w-full sm:w-52" onClick={handleDownloadCV}>
          {t('hero.downloadCV')}
        </Button>
      </div>
    </section>
  );
};