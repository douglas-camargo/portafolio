import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../../atoms/Badge/Badge';

interface Tag {
  id: number;
  name: string;
}

interface ProjectCardProps {
  key: number;
  id: number;
  tags?: Tag[];
  showViewButton?: boolean;
  image?: string;
  githubUrl?: string;
  pageUrl?: string;
  isLeftPosition?: boolean;
  currentIndex?: number;
}

export const ProjectCard = ({ 
  key,
  id, 
  tags = [], 
  showViewButton = false,
  image,
  githubUrl,
  pageUrl,
  isLeftPosition = false,
  currentIndex
}: ProjectCardProps) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isViewButtonHovered, setIsViewButtonHovered] = useState(false);

  return (
    <div 
      className="
        w-full aspect-square
        sm:aspect-[4/3]
        md:aspect-[5/4] md:max-w-[500px]
        lg:aspect-[600/386] lg:max-w-[600px]
        xl:max-w-[700px]
        2xl:max-w-[700px]
        bg-[#292929] rounded-3xl relative overflow-hidden cursor-pointer mx-auto
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={image} 
        alt={`Project ${id}`}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      
      {tags.length > 0 && (
        <div className={`absolute top-3 left-3.5 flex flex-wrap gap-2 md:gap-3 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {tags.map((tag) => (
            <span key={tag.id}>
              <Badge
                className="h-[22px] rounded-[11px] border border-solid border-white bg-black/30 text-white text-xs"
              >
                {tag.name}
              </Badge>
            </span>
          ))}
        </div>
      )}

      {showViewButton && isLeftPosition && (
        <div 
          className={`
            absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[136px] md:h-[136px] 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            bg-[#d9d9d9] rounded-full flex items-center justify-center 
            transition-all duration-300 cursor-pointer ${
              isViewButtonHovered ? 'scale-110 bg-[#c0c0c0]' : 'scale-100'
            }
          `}
          onMouseEnter={() => setIsViewButtonHovered(true)}
          onMouseLeave={() => setIsViewButtonHovered(false)}
          onClick={() => {
            if (githubUrl) {
              window.open(githubUrl, '_blank');
            } else if (pageUrl) {
              window.open(pageUrl, '_blank');
            }
          }}
        >
          <div className="font-['Lato',Helvetica] font-normal text-[#151515] text-xs sm:text-sm">
            {t('projects.view')}
          </div>
        </div>
      )}

      {/* Botones CODE y PAGE en la parte inferior derecha */}
      <div className={`absolute bottom-3 right-3.5 flex gap-2 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        {githubUrl && (
          <button 
            className="text-gray-800 bg-gray-200 text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-semibold"
            onClick={() => githubUrl && window.open(githubUrl, '_blank')}
          >
            CODE
          </button>
        )}
        <button 
          className="text-gray-800 bg-gray-200 text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-semibold"
          onClick={() => pageUrl && window.open(pageUrl, '_blank')}
        >
          PAGE
        </button>
      </div>
    </div>
  );
};