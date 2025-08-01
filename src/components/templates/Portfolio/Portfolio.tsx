import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Hero } from '../../organisms/Hero/Hero';
import { Projects } from '../../organisms/Projects/Projects';
import { Education } from '../../organisms/Education/Education';
import { Skills } from '../../organisms/Skills/Skills';
import { Contact } from '../../organisms/Contact/Contact';

export const Portfolio = () => {
  return (
    <div className="bg-[#151515] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#151515] overflow-hidden w-full max-w-[1366px] relative">
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