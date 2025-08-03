import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateLanguageFromCountry } from '../i18n';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [hasDetected, setHasDetected] = useState(false);

  // Detectar el idioma por defecto solo una vez al cargar
  useEffect(() => {
    const detectLanguage = async () => {
      if (hasDetected) return; // Solo detectar una vez
      
      try {
        // Importar la función de detección de país
        const { detectUserCountry } = await import('../services/countryDetection');
        const countryInfo = await detectUserCountry();
        
        // Cambiar el idioma directamente basado en el país detectado
        if (countryInfo.language !== currentLanguage) {
          i18n.changeLanguage(countryInfo.language);
          setCurrentLanguage(countryInfo.language);
        }
        setHasDetected(true); // Marcar como detectado
      } catch (error) {
        // Silenciosamente usar inglés por defecto
        setHasDetected(true);
      }
    };

    detectLanguage();
  }, [i18n, currentLanguage, hasDetected]);

  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  }, [i18n]);

  const contextValue = useMemo(() => ({
    currentLanguage,
    changeLanguage
  }), [currentLanguage, changeLanguage]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}; 