import React from 'react';

interface SeparatorProps {
  className?: string;
}

const BASE_CLASSES = 'border-0 h-px bg-gray-300';

export const Separator = ({ className = '' }: SeparatorProps) => {
  return <hr className={`${BASE_CLASSES} ${className}`} />;
};