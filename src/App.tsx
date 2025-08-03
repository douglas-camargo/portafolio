import React from 'react';
import { Portfolio } from './components/templates/Portfolio/Portfolio';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageDetector } from './components/atoms/LanguageDetector/LanguageDetector';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LanguageDetector>
          <Portfolio />
        </LanguageDetector>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;