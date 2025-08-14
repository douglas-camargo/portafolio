import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../atoms/Card/Card';
import { CardContent } from '../../atoms/CardContent/CardContent';
import { Separator } from '../../atoms/Separator/Separator';
import { AnimationProps } from '../../../hooks/useAnimations';
import { TECH_ICONS, getSkillCategories } from './skillsData';
import { useSkills } from '../../../hooks/useSkills';

export const Skills: React.FC<Partial<AnimationProps>> = ({ isLoaded }) => {
  const { t } = useTranslation();
  
  const {
    getTitleClasses,
    getSubtitleClasses,
    getTechIconClasses,
    getTechNameClasses,
    getSeparatorClasses,
    getCategoryTitleClasses,
    getSkillNameClasses
  } = useSkills();

  const skillCategories = getSkillCategories(t);

  return (
    <section id="skills" className="w-full py-8 lg:py-16 px-4 md:px-20">
      <div>
        <h1 className={getTitleClasses()}>
          {t('skillsContent.title')}
        </h1>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h2 className={getSubtitleClasses()}>
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
              {[...TECH_ICONS, ...TECH_ICONS].map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center space-y-2 flex-shrink-0 px-10"
                >
                  <img
                    className={getTechIconClasses(tech.name)}
                    alt={tech.name}
                    src={tech.icon}
                    loading="lazy"
                  />
                  <span className={getTechNameClasses()}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="bg-transparent border-none">
          <CardContent className="bg-transparent" padding="px-0 py-6">
            {skillCategories.map((category, index) => (
              <div key={index} className="mb-8 md:mb-4">
                <Separator className={`w-full mb-4 ${getSeparatorClasses()}`} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="md:col-span-1">
                    <span className={getCategoryTitleClasses()}>
                      {category.title}
                    </span>
                  </div>
                  <div className="md:col-span-1 flex flex-col space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <React.Fragment key={skillIndex}>
                        <span className={getSkillNameClasses()}>
                          {skill.name}
                        </span>
                        {skillIndex < category.skills.length - 1 && (
                          <Separator className={getSeparatorClasses()} />
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
