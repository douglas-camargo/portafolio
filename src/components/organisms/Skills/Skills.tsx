import React from 'react';
import { Card, CardContent } from '../../atoms/Card/Card';
import { Separator } from '../../atoms/Separator/Separator';

export const Skills = () => {
  const techIcons = [
    { 
      name: 'HTML5', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    { 
      name: 'CSS3', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    { 
      name: 'JavaScript', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    { 
      name: 'React', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    { 
      name: 'Python', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    { 
      name: 'Node.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    { 
      name: 'Git', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },
    { 
      name: 'GitHub', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    },
  ];

  const skillCategories = [
    {
      title: 'TOOLS',
      skills: [{ name: 'GitHub - Git' }],
    },
    {
      title: 'LANGUAGE',
      skills: [
        { name: 'HTML-HTML5' },
        { name: 'CSS' },
        { name: 'JavaScript- ecmascrpt6' },
        { name: 'ReactJS' },
      ],
    },
    {
      title: 'FRAMEWORKS',
      skills: [
        { name: 'Next.JS' },
        { name: 'Redux' },
      ],
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-20">
      <h1 className="font-medium text-4xl md:text-6xl lg:text-9xl text-white font-['Oswald',Helvetica] leading-tight md:leading-[120px] mb-6">
        HARD SKILLS
      </h1>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h2 className="font-extralight text-2xl md:text-4xl text-white font-['Lato',Helvetica]">
            TECHNOLOGIES
          </h2>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 mt-4">
            {techIcons.map((tech, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <img
                  className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"
                  alt={tech.name}
                  src={tech.icon}
                />
                <span className="text-white text-xs text-center font-['Lato',Helvetica]">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-transparent border-none">
          <CardContent className="p-0 bg-blue-800">
            {skillCategories.map((category, index) => (
              <div key={index} className="mb-8">
                <Separator className="w-full mb-4 bg-white/20" />
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <span className="font-normal text-xs text-white font-['Lato',Helvetica]">
                      {category.title}
                    </span>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <React.Fragment key={skillIndex}>
                        <span className="font-normal text-sm text-white font-['Lato',Helvetica]">
                          {skill.name}
                        </span>
                        {skillIndex < category.skills.length - 1 && (
                          <Separator className="w-full bg-white/20" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};