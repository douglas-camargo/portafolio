import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Carousel } from '../../molecules/Carousel/Carousel';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import { useProjects } from '../../../hooks/useProjects';
import { AnimationProps } from '../../../hooks/useAnimations';
import { PROJECTS_DATA } from './projectsData';

export const Projects: React.FC<Partial<AnimationProps>> = ({ isLoaded }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const {
    currentCarouselIndex,
    totalSlides,
    handleCarouselIndexChange,
    goToSlide,
    getDotClasses
  } = useProjects();

  const titleClasses = `font-['Lato',Helvetica] font-light text-2xl md:text-4xl tracking-[0] leading-[normal] whitespace-nowrap mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`;

  return (
    <section id="portfolio" className="w-full py-8 lg:py-12 relative px-4 md:px-20">
      <div className={titleClasses}>
        {t('projects.title')}
      </div>

      <div>
        <Carousel 
          className="w-full"
          currentIndex={currentCarouselIndex}
          onIndexChange={handleCarouselIndexChange}
          onGoToIndex={goToSlide}
        >
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              tags={project.tags}
              image={project.image}
              showViewButton={index === currentCarouselIndex}
              githubUrl={project.githubUrl}
              pageUrl={project.pageUrl}
              backendUrl={project.backendUrl}
              showFrontendBackendLabels={project.showFrontendBackendLabels}
              hasAnimation={index === currentCarouselIndex}
            />
          ))}
        </Carousel>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={getDotClasses(index)}
              >
                {/* Dot */}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};