import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Header } from '../../organisms/Header/Header';
import { Hero } from '../../organisms/Hero/Hero';
import { Projects } from '../../organisms/Projects/Projects';
import { Education } from '../../organisms/Education/Education';
import { Skills } from '../../organisms/Skills/Skills';
import { Contact } from '../../organisms/Contact/Contact';

const TRANSITION_CLASSES = 'transition-colors duration-300';

export const Portfolio = () => {
  const { theme } = useTheme();
  
  const bgClass = theme === 'dark' ? 'bg-[#151515]' : 'bg-gray-50';
  const themeClasses = `${bgClass} ${TRANSITION_CLASSES}`;
  
  return (
    <div className={`${themeClasses} flex flex-row justify-center w-full min-h-screen`}>
      <div className={`${themeClasses} overflow-hidden w-full max-w-[1366px] relative`}>
        <Header />
        <Hero />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </div>
    </div>
  );
};