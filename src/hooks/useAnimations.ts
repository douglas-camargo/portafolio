import { useEffect, useState } from 'react';

export interface AnimationProps {
  isLoaded?: boolean;
}

export const useAnimations = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar que el contenido esté listo
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { isLoaded };
};
