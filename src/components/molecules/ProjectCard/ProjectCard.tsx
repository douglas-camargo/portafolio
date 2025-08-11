import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../../atoms/Badge/Badge';
import { useProjectCard } from '../../../hooks/useProjectCard';

interface Tag {
  id: number;
  name: string;
}

interface ProjectCardProps {
  id: number;
  tags?: Tag[];
  showViewButton?: boolean;
  image?: string;
  githubUrl?: string;
  pageUrl?: string;
  backendUrl?: string;
  isLeftPosition?: boolean;
  hasAnimation?: boolean;
  showFrontendBackendLabels?: boolean;
}

const CARD_CLASSES = `
  w-full aspect-square
  sm:aspect-[4/3]
  md:aspect-[5/4] 
  lg:aspect-[600/386] lg:max-w-[600px]
  xl:max-w-[690px]
  2xl:max-w-[700px]
  bg-[#292929] rounded-3xl relative overflow-hidden 
`;

const BUTTON_CLASSES = 'text-gray-800 bg-gray-200 text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-semibold';

export const ProjectCard = ({ 
  id, 
  tags = [], 
  showViewButton = false,
  image,
  githubUrl,
  pageUrl,
  backendUrl,
  isLeftPosition = false,
  hasAnimation = false,
  showFrontendBackendLabels = false
}: ProjectCardProps) => {
  const { t } = useTranslation();
  
  const {
    isHovered,
    isViewButtonHovered,
    handleViewClick,
    handleCodeClick,
    handleBackendClick,
    handleMouseEnter,
    handleMouseLeave,
    handleViewButtonMouseEnter,
    handleViewButtonMouseLeave
  } = useProjectCard({ pageUrl, githubUrl, backendUrl });

  const cardClasses = `${CARD_CLASSES} ${hasAnimation && isHovered ? 'cursor-pointer' : ''}`.trim();
  const imageClasses = `w-full h-full object-cover transition-all duration-500 ease-in-out ${hasAnimation && isHovered ? 'scale-110' : 'scale-100'}`;
  const tagsClasses = `absolute top-3 left-5 md:left-3 lg:left-4 xl:left-7 2xl:left-2 flex flex-wrap gap-2 md:gap-3 transition-all duration-300 ml-1 lg:ml-2 ${hasAnimation && isHovered ? 'opacity-100' : 'opacity-0'}`;
  const buttonsClasses = `absolute bottom-3 right-3.5 flex gap-2 transition-opacity duration-300 ${hasAnimation && isHovered ? 'opacity-100' : 'opacity-0'}`;
  const viewButtonClasses = `absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[136px] md:h-[136px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isViewButtonHovered ? 'scale-110 bg-[#c0c0c0]' : 'scale-100'}`;

  return (
    <div 
      className={cardClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={image} 
        alt={`Project ${id}`}
        loading="lazy"
        className={imageClasses}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      
      {tags.length > 0 && (
        <div className={tagsClasses}>
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              className="h-[22px] rounded-[11px] border border-solid border-white bg-black/30 text-white text-xs"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      {showViewButton && isLeftPosition && (
        <div 
          className={viewButtonClasses}
          onMouseEnter={handleViewButtonMouseEnter}
          onMouseLeave={handleViewButtonMouseLeave}
          onClick={handleViewClick}
        >
          <div className="font-['Lato',Helvetica] font-normal text-[#151515] text-xs sm:text-sm">
            {t('projects.view')}
          </div>
        </div>
      )}

      <div className={buttonsClasses}>
        {githubUrl && (
          <button 
            className={BUTTON_CLASSES}
            onClick={handleCodeClick}
          >
            {showFrontendBackendLabels ? 'CODE FRONTEND' : 'CODE'}
          </button>
        )}
        {backendUrl && (
          <button 
            className={BUTTON_CLASSES}
            onClick={handleBackendClick}
          >
            {showFrontendBackendLabels ? 'CODE BACKEND' : 'BACKEND'}
          </button>
        )}
      </div>
    </div>
  );
};
