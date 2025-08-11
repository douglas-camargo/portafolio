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
        url: 'https://drive.google.com/file/d/1G09EVEgH5BuWSwhB_jXobm9mWWrVYlwt/preview'
      },
      {
        name: 'CSS',
        url: 'https://drive.google.com/file/d/1axLMsaHMJcLTirp28rt_eXtqwaKtEz4h/preview'
      },
      {
        name: 'JavaScript',
        url: 'https://drive.google.com/file/d/1bhfojPhLedd2nsir8hFpQbHpPg0xHvUu/preview'
      },
      {
        name: 'React.js',
        url: 'https://drive.google.com/file/d/1OKRXfgaB1FHof9wvzKnMwZRuCiOdZwcJ/preview'
      },
      {
        name: 'Git',
        url: 'https://drive.google.com/file/d/1s2jUfC3QAXWHAgkPiw_aSnqde4g1dAza/preview'
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
