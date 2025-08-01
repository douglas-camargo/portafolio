import React from 'react';

interface NavigationItem {
  label: string;
  active: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation = ({ items }: NavigationProps) => {
  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center gap-1.5 md:gap-6">
      {items.map((item, index) => (
        <a
          key={index}
          href="#"
          className={`relative w-fit font-['Lato',Helvetica] font-semibold ${
            item.active ? 'text-white' : 'text-[#4b4b4b]'
          } text-xs tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer hover:text-white transition-colors`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};