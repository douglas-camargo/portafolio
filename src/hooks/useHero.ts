import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useHero = () => {
  const { i18n } = useTranslation();

  const handleDownloadCV = useCallback(() => {
    const currentLanguage = i18n.language;
    let downloadUrl = '';
    
    if (currentLanguage === 'es') {
      downloadUrl = 'https://drive.google.com/uc?export=download&id=1M3zII4aGkgSoF9_a6x3TEx-FYViPnxgw';
    } else {
      downloadUrl = 'https://drive.google.com/uc?export=download&id=1mEQcgVAv3zH1OhNMAxS_SPzBR9Th1E4d';
    }
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `CV_Alexander_Suarez_${currentLanguage === 'es' ? 'ES' : 'EN'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [i18n.language]);

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

  return {
    handleDownloadCV,
    handleWhatsAppContact
  };
}; 