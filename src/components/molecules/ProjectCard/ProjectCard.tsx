import React from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import { Card } from '../../atoms/Card/Card';

interface Tag {
  id: number;
  name: string;
}

interface ProjectCardProps {
  id: number;
  tags?: Tag[];
  showViewButton?: boolean;
  image?: string;
}

export const ProjectCard = ({ 
  id, 
  tags = [], 
  showViewButton = false,
  image
}: ProjectCardProps) => {
  return (
    <Card className="h-[300px] md:h-[386px] bg-[#292929] rounded-2xl relative overflow-hidden">
      <img 
        src={image} 
        alt={`Project ${id}`}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      
      {tags.length > 0 && (
        <div className="absolute top-3 left-3.5 flex flex-wrap gap-2 md:gap-3">
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

      {showViewButton && (
        <div className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-full flex items-center justify-center hover:bg-[#c0c0c0] transition-colors cursor-pointer">
          <div className="font-['Lato',Helvetica] font-normal text-[#151515] text-sm">
            VIEW
          </div>
        </div>
      )}
    </Card>
  );
};