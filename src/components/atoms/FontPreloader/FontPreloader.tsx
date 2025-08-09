import { useEffect } from 'react';

export const FontPreloader = () => {
  useEffect(() => {
    // Precargar fuentes críticas
    const preloadFonts = async () => {
      if ('fonts' in document) {
        try {
          await Promise.all([
            document.fonts.load('400 16px Lato'),
            document.fonts.load('700 16px Lato'),
            document.fonts.load('400 16px Oswald'),
            document.fonts.load('600 16px Oswald')
          ]);
          
          // Marcar como cargadas
          document.documentElement.classList.add('fonts-loaded');
        } catch (error) {
          console.warn('Error loading fonts:', error);
          // Fallback
          setTimeout(() => {
            document.documentElement.classList.add('fonts-loaded');
          }, 1000);
        }
      } else {
        // Fallback para navegadores sin Font Loading API
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded');
        }, 1000);
      }
    };

    preloadFonts();
  }, []);

  return null; // Este componente no renderiza nada
};
