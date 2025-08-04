import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Card, CardContent } from '../../atoms/Card/Card';
import { Separator } from '../../atoms/Separator/Separator';

export const Skills = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const techIcons = useMemo(() => [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  ], []);

  const skillCategories = [
    {
      title: t('skillsContent.tools'),
      skills: [{ name: t('skillsContent.gitHubGit') }],
    },
    {
      title: t('skillsContent.language'),
      skills: [
        { name: t('skillsContent.html') },
        { name: t('skillsContent.css') },
        { name: t('skillsContent.javascriptES6') },
        { name: t('skillsContent.typescript') },
      ],
    },
    {
      title: t('skillsContent.frameworks'),
      skills: [
        { name: t('skillsContent.reactJS') },
        { name: t('skillsContent.redux') },
        { name: t('skillsContent.nextJS') },
        { name: t('skillsContent.bootstrap') },
        { name: t('skillsContent.tailwindCSS') },
      ],
    },
  ];

  return (
    <section id="skills" className="w-full py-16 px-4 md:px-20">
      <h1 className={`font-medium text-4xl md:text-6xl lg:text-9xl font-['Oswald',Helvetica] leading-tight md:leading-[120px] mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {t('skillsContent.title')}
      </h1>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h2 className={`mb-6 font-extralight text-2xl md:text-4xl font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t('skillsContent.technologies')}
          </h2>

          <div className="relative overflow-hidden mt-4 w-full">
            <div
              className="flex w-max animate-scrollTechnologies"
              style={{
                animation: 'scrollTechnologies 30s linear infinite',
              }}
            >
              {/* Duplicación para loop perfecto */}
              {[...techIcons, ...techIcons].map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center space-y-2 flex-shrink-0 px-10"
                >
                  <img
                    className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 ${
                      tech.name === 'GitHub' && theme === 'dark'
                        ? 'bg-white rounded p-1'
                        : ''
                    }`}
                    alt={tech.name}
                    src={tech.icon}
                    loading="lazy"
                  />
                  <span
                    className={`text-xs text-center font-['Lato',Helvetica] ${
                      theme === 'dark' ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="bg-transparent border-none">
          <CardContent className="p-0 bg-transparent">
            {skillCategories.map((category, index) => (
              <div key={index} className="mb-8 md:mb-4">
                <Separator className={`w-full mb-4 ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`} />
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <span className={`font-semibold text-xs font-['Lato',Helvetica] mb-4 md:mb-0 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                      {category.title}
                    </span>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <React.Fragment key={skillIndex}>
                        <span className={`font-normal text-sm font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                          {skill.name}
                        </span>
                        {skillIndex < category.skills.length - 1 && (
                          <Separator className={`w-full ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`} />
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
