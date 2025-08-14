import { useState, useCallback } from 'react';
import { whatsappService } from '../services/whatsappService';

export const useContact = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleWhatsAppContact = useCallback(() => {
    whatsappService.openWhatsApp();
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