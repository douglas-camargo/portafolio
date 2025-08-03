import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Header } from '../../organisms/Header/Header';
import { Hero } from '../../organisms/Hero/Hero';
import { Projects } from '../../organisms/Projects/Projects';
import { Education } from '../../organisms/Education/Education';
import { Skills } from '../../organisms/Skills/Skills';
import { Contact } from '../../organisms/Contact/Contact';

export const Portfolio = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-[#151515]' : 'bg-gray-50'} flex flex-row justify-center w-full min-h-screen transition-colors duration-300`}>
      <div className={`${theme === 'dark' ? 'bg-[#151515]' : 'bg-gray-50'} overflow-hidden w-full max-w-[1366px] relative transition-colors duration-300`}>
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