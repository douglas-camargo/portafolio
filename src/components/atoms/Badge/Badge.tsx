import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-normal ${className}`}>
      {children}
    </span>
  );
};