import React, { useState } from 'react';
import { Button } from '../../atoms/Button/Button';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

export const Carousel = ({ children, className = '' }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / Math.min(3, totalItems))}%)` }}
        >
          {childrenArray.map((child, index) => (
            <div key={index} className="w-1/3 flex-shrink-0 px-2">
              {child}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="secondary"
        size="lg"
        className="absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] md:w-[61px] md:h-[61px] rounded-full z-10 left-2"
        onClick={goToPrevious}
      >
        ←
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="absolute top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] md:w-[61px] md:h-[61px] rounded-full z-10 right-2"
        onClick={goToNext}
      >
        →
      </Button>
    </div>
  );
};