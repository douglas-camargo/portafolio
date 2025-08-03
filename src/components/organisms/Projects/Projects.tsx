import React, { useState, useMemo, useCallback, use } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Carousel } from '../../molecules/Carousel/Carousel';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';


export const Projects = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  const projects = useMemo(() => [
    {
      id: 1,
      tags: [
        { id: 1, name: 'REACT' },
        { id: 2, name: 'JAVASCRIPT' },
        { id: 3, name: 'TAILWINDCSS' },
      ],
      image: '/images/project-restaurant.webp',
      showViewButton: true,
      githubUrl: 'https://github.com/douglas-camargo/lading_restaurant',
      pageUrl: 'https://restaurant-black-alpha.vercel.app/',
    },
    {
      id: 2,
      tags: [
        { id: 1, name: 'NEXT.JS' },
        { id: 3, name: 'JAVASCRIPT' },
        { id: 2, name: 'TAILWINDCSS' },
      ],
      image: '/images/pokemon-explorer.webp',
      showViewButton: true,
      githubUrl: 'https://github.com/douglas-camargo/Pokemon-explorer',
      pageUrl: 'https://pokemon-explorer-seven.vercel.app/',
    },
    {
      id: 3,
      tags: [
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'JAVASCRIPT' },
      ],
      image: '/images/hsectechnology.webp',
      showViewButton: true,
      githubUrl: '', // Sin botón CODE
      pageUrl: 'https://hsectechnology.com/index.html',
    },
    {
      id: 4,
      tags: [
        { id: 1, name: 'NEXT.JS' },
        { id: 2, name: 'JAVASCRIPT' },
        { id: 3, name: 'CSS' },
      ],
      image: '/images/proyecto-seguridad.webp',
      showViewButton: true,
      githubUrl: '', // Sin botón CODE
      pageUrl: 'https://quizzical-wozniak-484579.netlify.app/',
    },
  ], []);

  const totalSlides = projects.length; // 1 proyecto por vista

  const handleCarouselIndexChange = useCallback((index: number) => {
    setCurrentCarouselIndex(index);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentCarouselIndex(index);
  }, []);

  return (
    <section id="portfolio" className="w-full py-12 relative px-4 md:px-20">
      <div className={`font-['Lato',Helvetica] font-extralight text-2xl md:text-4xl tracking-[0] leading-[normal] whitespace-nowrap mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {t('projects.title')}
      </div>

      <Carousel 
        className="w-full"
        currentIndex={currentCarouselIndex}
        onIndexChange={handleCarouselIndexChange}
        onGoToIndex={goToSlide}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            tags={project.tags}
            image={project.image}
            showViewButton={project.showViewButton}
            githubUrl={project.githubUrl}
            pageUrl={project.pageUrl}
          />
        ))}
      </Carousel>

      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentCarouselIndex 
                  ? `w-8 ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}`
                  : `w-2 ${theme === 'dark' ? 'bg-white/50' : 'bg-gray-400'}`
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};