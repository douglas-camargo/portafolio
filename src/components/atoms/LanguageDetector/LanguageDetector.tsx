import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface LanguageDetectorProps {
  children: React.ReactNode;
}

export const LanguageDetector: React.FC<LanguageDetectorProps> = ({ children }) => {
  return <>{children}</>;
}; 