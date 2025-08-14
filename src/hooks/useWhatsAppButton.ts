import { useCallback } from 'react';

export const useWhatsAppButton = () => {
  const handleWhatsAppClick = useCallback(() => {
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

  return {
    handleWhatsAppClick
  };
};
