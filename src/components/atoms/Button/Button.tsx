import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  borderRadius?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const BASE_CLASSES = 'font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center justify-center';

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm h-[34px]',
  md: 'px-6 py-3 text-base h-[46px]',
  lg: 'px-8 py-4 text-lg h-[61px]'
} as const;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  borderRadius = '',
  onClick,
  onMouseEnter,
  onMouseLeave
}: ButtonProps) => {
  const { theme } = useTheme();
  
  const variantClasses = {
    primary: 'bg-[#d9d9d9] text-[#151515] hover:bg-[#c0c0c0]',
    secondary: 'bg-[#d9d9d9] text-black hover:bg-[#c9c9c9]',
    outline: theme === 'dark' 
      ? 'border-2 border-white text-white hover:bg-white/10'
      : 'border-2 border-gray-800 text-gray-800 hover:bg-gray-800/10'
  };
  
  const buttonClasses = `${variantClasses[variant]} ${SIZE_CLASSES[size]} ${className} ${BASE_CLASSES} ${borderRadius || 'rounded-lg'}`;
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};