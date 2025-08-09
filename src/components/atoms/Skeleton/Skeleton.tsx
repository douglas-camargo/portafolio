import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  animate = true,
}) => {
  const { theme } = useTheme();
  
  const baseClasses = `${width} ${height}`;
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };
  
  const bgClasses = theme === 'dark' 
    ? 'bg-gray-700' 
    : 'bg-gray-200';
  
  const animateClasses = animate ? 'skeleton-pulse' : '';
  
  const classes = `${baseClasses} ${roundedClasses[rounded]} ${bgClasses} ${animateClasses} ${className}`.trim();

  return <div className={classes} />;
};
