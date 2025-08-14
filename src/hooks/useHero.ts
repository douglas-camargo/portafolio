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
    
    // Crear un enlace temporal y hacer clic en él para descargar
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `CV_Alexander_Suarez_${currentLanguage === 'es' ? 'ES' : 'EN'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [i18n.language]);

  return {
    handleDownloadCV
  };
}; 