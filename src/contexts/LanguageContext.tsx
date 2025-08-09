import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  hasDetected: boolean;
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

  useEffect(() => {
    const detectLanguage = async () => {
      if (hasDetected) return;
      
      try {
        const { detectUserCountry } = await import('../services/countryDetection');
        const countryInfo = await detectUserCountry();
        
        if (countryInfo.language !== currentLanguage) {
          i18n.changeLanguage(countryInfo.language);
          setCurrentLanguage(countryInfo.language);
        }
        setHasDetected(true);
      } catch (error) {
        setHasDetected(true);
      }
    };

    detectLanguage();
  }, [i18n, currentLanguage, hasDetected]);

  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, hasDetected }}>
      {children}
    </LanguageContext.Provider>
  );
}; 