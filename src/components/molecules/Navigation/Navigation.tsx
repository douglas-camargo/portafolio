import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface NavigationItem {
  label: string;
  active: boolean;
  id?: string;
}

interface NavigationProps {
  items: NavigationItem[];
  onItemClick?: (sectionId: string) => void;
}

export const Navigation = ({ items, onItemClick }: NavigationProps) => {
  const { theme } = useTheme();
  
  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center gap-1.5 md:gap-6">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => item.id && onItemClick?.(item.id)}
          className={`relative w-fit font-['Lato',Helvetica] font-semibold text-xs tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-all duration-300 bg-transparent border-none ${
            item.active 
              ? theme === 'dark' ? 'text-white' : 'text-gray-800'
              : theme === 'dark' ? 'text-[#4b4b4b] hover:text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {item.label}
          {item.active && (
            <div className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-800'
            }`} />
          )}
        </button>
      ))}
    </nav>
  );
};