import { useEffect, useState } from 'react'
import { useFontLoading } from './useFontLoading';

export interface AnimationProps {
  isLoaded?: boolean;
}

export const useAnimations = (minDelay = 300) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { fontsLoaded } = useFontLoading();

  useEffect(() => {
    if (window.scrollY > 0) window.scrollTo(0, 0);

    const criticalImages = [
      '/images/photo-Douglas.webp',
      '/images/pokemon-explorer.webp',
      '/images/project-clinic.webp',
      '/images/project-hsectechnology.webp',
      '/images/project-lawyers.webp',
      '/images/project-restaurant.webp',
      '/images/project-security.webp'
    ];

    const checkCriticalImages = () =>
      Promise.all(
        criticalImages.map(src => 
          new Promise<void>(resolve => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          })
        )
      );

    const waitMinimumTime = () =>
      new Promise(resolve => setTimeout(resolve, minDelay));

    const waitForFonts = () =>
      new Promise<void>(resolve => {
        if (fontsLoaded) {
          resolve();
        } else {
          const checkFonts = () => {
            if (fontsLoaded) {
              resolve();
            } else {
              setTimeout(checkFonts, 50);
            }
          };
          checkFonts();
        }
      });

    (async () => {
      try {
        // Esperar fuentes primero (más rápido)
        await waitForFonts();
        
        // Luego esperar el resto en paralelo
        await Promise.all([checkCriticalImages(), waitMinimumTime()]);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [minDelay, fontsLoaded]);

  return { isLoaded };
};
