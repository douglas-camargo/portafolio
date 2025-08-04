import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-lg ${className ? className : 'bg-white'}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = '' }: CardContentProps) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};