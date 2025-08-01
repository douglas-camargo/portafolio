import React from 'react';
import { Carousel } from '../../molecules/Carousel/Carousel';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';

export const Projects = () => {
  const projects = [
    {
      id: 1,
      tags: [
        { id: 1, name: 'REACT' },
        { id: 2, name: 'TAILWIND' },
      ],
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      showViewButton: true,
    },
    {
      id: 2,
      tags: [
        { id: 1, name: 'HTML5' },
        { id: 2, name: 'JAVASCRIPT' },
        { id: 3, name: 'BOOTSTRAP' },
      ],
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      showViewButton: true,
    },
    {
      id: 3,
      tags: [
        { id: 1, name: 'VUE.JS' },
        { id: 2, name: 'CSS3' },
      ],
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      showViewButton: true,
    },
    {
      id: 4,
      tags: [
        { id: 1, name: 'NODE.JS' },
        { id: 2, name: 'EXPRESS' },
      ],
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      showViewButton: true,
    },
  ];

  return (
    <section className="w-full py-12 relative px-4 md:px-20">
      <div className="font-['Lato',Helvetica] font-extralight text-white text-2xl md:text-4xl tracking-[0] leading-[normal] whitespace-nowrap mb-8">
        PROJECTS COMPLET
      </div>

      <Carousel className="w-full">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            tags={project.tags}
            image={project.image}
            showViewButton={project.showViewButton}
          />
        ))}
      </Carousel>

      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};