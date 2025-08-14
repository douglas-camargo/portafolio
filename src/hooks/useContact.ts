import { useState, useCallback } from 'react';

export const useContact = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleWhatsAppContact = useCallback(() => {
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
  }, []);

  const handleButtonClick = useCallback((buttonName: string) => {
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
        window.open('mailto:douglas.ca.dev@gmail.com', '_blank');
        break;
      default:
        break;
    }
  }, [handleWhatsAppContact]);

  const handleButtonMouseDown = useCallback((buttonName: string) => {
    setActiveButton(buttonName);
  }, []);

  const handleButtonMouseUp = useCallback(() => {
    setActiveButton(null);
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    setActiveButton(null);
  }, []);

  const handleBackToTop = useCallback(() => {
    const element = document.getElementById('about');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    activeButton,
    handleButtonClick,
    handleButtonMouseDown,
    handleButtonMouseUp,
    handleButtonMouseLeave,
    handleBackToTop
  };
}; 