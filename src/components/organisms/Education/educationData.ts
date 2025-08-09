import { TFunction } from 'i18next';

export interface CourseDetail {
  name: string;
  url: string;
}

export interface EducationItem {
  title: string;
  details: string | string[] | CourseDetail[];
}

export const getEducationData = (t: TFunction): EducationItem[] => [
  {
    title: t('educationSection.university'),
    details: 'Universidad Marítima del Caribe',
  },
  {
    title: t('educationSection.completedCourses'),
    details: [
      {
        name: 'HTML',
        url: 'https://drive.google.com/uc?export=download&id=1G09EVEgH5BuWSwhB_jXobm9mWWrVYlwt'
      },
      {
        name: 'CSS',
        url: 'https://drive.google.com/uc?export=download&id=1axLMsaHMJcLTirp28rt_eXtqwaKtEz4h'
      },
      {
        name: 'JavaScript',
        url: 'https://drive.google.com/uc?export=download&id=1bhfojPhLedd2nsir8hFpQbHpPg0xHvUu'
      },
      {
        name: 'React.js',
        url: 'https://drive.google.com/uc?export=download&id=1OKRXfgaB1FHof9wvzKnMwZRuCiOdZwcJ'
      },
      {
        name: 'Git',
        url: 'https://drive.google.com/uc?export=download&id=1s2jUfC3QAXWHAgkPiw_aSnqde4g1dAza'
      },
    ],
  },
  {
    title: t('educationSection.selfEducation'),
    details: [
      'Next.js',
      'Tailwind CSS',
      'Bootstrap',
      'TypeScript',
    ],
  },
  {
    title: t('educationSection.languages'),
    details: t('educationSection.languagesDetails'),
  },
];
