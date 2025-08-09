import { TFunction } from 'i18next';

export interface TechIcon {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string }[];
}

export const TECH_ICONS: TechIcon[] = [
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
];

export const getSkillCategories = (t: TFunction): SkillCategory[] => [
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
