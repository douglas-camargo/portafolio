import { useEffect, useState } from 'react';

export const useFontLoading = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Verificar si las fuentes ya están cargadas
    const checkFontsLoaded = () => {
      if ('fonts' in document) {
        // Usar Font Loading API si está disponible
        const fontLoadPromise = Promise.all([
          document.fonts.load('400 16px Lato'),
          document.fonts.load('700 16px Lato'),
          document.fonts.load('400 16px Oswald'),
          document.fonts.load('600 16px Oswald')
        ]);

        // Timeout de seguridad más corto (500ms)
        const timeoutPromise = new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 500);
        });

        // Usar la primera que se complete
        Promise.race([fontLoadPromise, timeoutPromise])
          .then(() => {
            setFontsLoaded(true);
          })
          .catch(() => {
            // Fallback final si todo falla
            setTimeout(() => setFontsLoaded(true), 300);
          });
      } else {
        // Fallback para navegadores que no soportan Font Loading API
        // Timeout más corto ya que no hay API
        setTimeout(() => setFontsLoaded(true), 300);
      }
    };

    // Verificar si el DOM está listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkFontsLoaded);
    } else {
      checkFontsLoaded();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', checkFontsLoaded);
    };
  }, []);

  return { fontsLoaded };
};
