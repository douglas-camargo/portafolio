import React from 'react';
import { Portfolio } from './components/templates/Portfolio/Portfolio';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageDetector } from './components/atoms/LanguageDetector/LanguageDetector';
import { FontPreloader } from './components/atoms/FontPreloader/FontPreloader';
import { WhatsAppButton } from './components/atoms/WhatsAppButton/WhatsAppButton';

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LanguageDetector>
          <FontPreloader />
          <Portfolio />
          <WhatsAppButton />
        </LanguageDetector>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;