import React, { useState } from 'react';
import { Navigation } from '../../molecules/Navigation/Navigation';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'PORTFOLIO', active: true },
    { label: 'EDUCATION', active: false },
    { label: 'SKILLS', active: false },
    { label: 'CONTACTS', active: false },
  ];

  return (
    <header className="flex w-full items-start justify-between pt-4 pb-0 px-4 md:px-20 bg-transparent relative">
      <a 
        href="#" 
        className="relative mt-[-1.00px] font-['Lato',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal] cursor-pointer hover:text-gray-300 transition-colors"
      >
        ABOUT
      </a>

      {/* Mobile menu button */}
      <button 
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation items={navItems} />
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#151515] p-4 md:hidden z-50">
          <Navigation items={navItems} />
        </div>
      )}

      <div className="relative w-9 h-3.5 mt-[-1.00px] font-['Lato',Helvetica] font-semibold text-xs tracking-[0] leading-[normal] whitespace-nowrap">
        <span className="text-white">EN/</span>
        <span className="text-[#6d6d6d]">ES</span>
      </div>
    </header>
  );
};