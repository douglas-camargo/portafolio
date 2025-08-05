import React from 'react';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export const CardContent = ({ children, className = '', padding }: CardContentProps) => {
  return (
    <div className={`${className} ${padding ? padding : 'p-6'}`}>
      {children}
    </div>
  );
}; 