import { useEffect, useState } from 'react'
import { useFontLoading } from './useFontLoading';
import { useLanguage } from '../contexts/LanguageContext';

export interface AnimationProps {
  isLoaded?: boolean;
}

export const useAnimations = (minDelay = 500) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { fontsLoaded } = useFontLoading();
  const { hasDetected } = useLanguage();

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

    const waitForLanguageDetection = () =>
      new Promise<void>(resolve => {
        if (hasDetected) {
          resolve();
        } else {
          const checkLanguage = () => {
            if (hasDetected) {
              resolve();
            } else {
              setTimeout(checkLanguage, 50);
            }
          };
          checkLanguage();
        }
      });

    (async () => {
      try {
        // Esperar todo en paralelo para máxima eficiencia
        await Promise.all([
          waitForFonts(),
          waitForLanguageDetection(),
          checkCriticalImages(),
          waitMinimumTime()
        ]);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [minDelay, fontsLoaded, hasDetected]);

  return { isLoaded };
};
