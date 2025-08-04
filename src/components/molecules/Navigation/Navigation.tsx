import React, { memo, useCallback } from 'react';
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

const NAV_CLASSES = 'flex flex-col md:flex-row items-start md:items-center gap-1.5 md:gap-6';
const BUTTON_BASE_CLASSES = 'relative w-fit font-[\'Lato\',Helvetica] font-semibold text-xs tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-all duration-300 bg-transparent border-none';

export const Navigation = memo(({ items, onItemClick }: NavigationProps) => {
  const { theme } = useTheme();
  
  const getButtonClasses = useCallback((item: NavigationItem) => {
    if (item.active) {
      const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
      return `${BUTTON_BASE_CLASSES} ${textColor}`;
    } else {
      const textColor = theme === 'dark' ? 'text-[#4b4b4b] hover:text-white' : 'text-gray-600 hover:text-gray-800';
      return `${BUTTON_BASE_CLASSES} ${textColor}`;
    }
  }, [theme]);

  const getIndicatorClasses = `absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}`;

  const handleItemClick = useCallback((item: NavigationItem) => {
    if (item.id && onItemClick) {
      onItemClick(item.id);
    }
  }, [onItemClick]);

  return (
    <nav className={NAV_CLASSES}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleItemClick(item)}
          className={getButtonClasses(item)}
        >
          {item.label}
          {item.active && (
            <div className={getIndicatorClasses} />
          )}
        </button>
      ))}
    </nav>
  );
});

Navigation.displayName = 'Navigation';