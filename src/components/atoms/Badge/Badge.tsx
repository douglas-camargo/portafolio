import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const BASE_CLASSES = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-normal';

export const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span className={`${BASE_CLASSES} ${className}`}>
      {children}
    </span>
  );
};