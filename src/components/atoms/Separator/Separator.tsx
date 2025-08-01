import React from 'react';

interface SeparatorProps {
  className?: string;
}

export const Separator = ({ className = '' }: SeparatorProps) => {
  return <hr className={`border-0 h-px bg-gray-300 ${className}`} />;
};