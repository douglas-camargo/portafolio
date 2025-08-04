import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getDefaultLanguage } from './services/countryDetection';

// Separar las traducciones para mejor mantenimiento
const enTranslations = {
  // Header
  about: 'ABOUT',
  portfolio: 'PORTFOLIO',
  education: 'EDUCATION',
  skills: 'SKILLS',
  contacts: 'CONTACTS',
  language: {
    en: 'EN',
    es: 'ES'
  },
  
  // Hero Section
  hero: {
    title: 'WEB DEVELOPER-FRONTEND',
    name: 'DOUGLAS CAMARGO',
    description: 'Programmer with over 4 years of experience in software and web application development. I have worked in the tech industry solving complex problems and improving efficiency through teamwork. My achievements include the creation and implementation of complex, large-scale systems. I seek technological challenges and projects that have a positive impact on society.',
    contactMe: 'CONTACT ME',
    downloadCV: 'DOWNLOAD CV'
  },
  
  // Projects Section
  projects: {
    title: 'PROJECTS COMPLETE',
    view: 'VIEW'
  },
  
  // Education Section
  educationSection: {
    title: 'EDUCATION',
    university: 'UNIVERSITY (2016-2024)',
    completedCourses: 'COMPLETED COURSES (2019-PRESENT)',
    selfEducation: 'SELF EDUCATION (2020-PRESENT)',
    languages: 'LANGUAGES',
    languagesDetails: 'Spanish-native / English-basic',
    description: 'I am a Computer Engineer and have complemented my education with certified courses focused on frontend development, including HTML, CSS, React.js, and version control with Git, through platforms such as EDteam and Google. In addition, I have gained practical knowledge in technologies like Next.js, Tailwind CSS, Bootstrap, and TypeScript through self-learning and hands-on project experience.'
  },
  
  // Skills Section
  skillsContent: {
    title: 'HARD SKILLS',
    technologies: 'TECHNOLOGIES',
    tools: 'TOOLS',
    language: 'LANGUAGE',
    frameworks: 'FRAMEWORKS',
    gitHubGit: 'GitHub - Git',
    html: 'HTML',
    css: 'CSS',
    javascriptES6: 'JavaScript (ES6)',
    typescript: 'TypeScript',
    reactJS: 'React.js',
    redux: 'Redux',
    nextJS: 'Next.js',
    bootstrap: 'Bootstrap',
    tailwindCSS: 'Tailwind CSS'
  },
  
  // Contact Section
  contact: {
    getInTouch: 'GET IN TOUCH',
    phone: 'PHONE',
    backToTop: 'Back to top'
  }
};

const esTranslations = {
  // Header
  about: 'ACERCA DE',
  portfolio: 'PORTAFOLIO',
  education: 'EDUCACIÓN',
  skills: 'HABILIDADES',
  contacts: 'CONTACTOS',
  language: {
    en: 'EN',
    es: 'ES'
  },
  
  // Hero Section
  hero: {
    title: 'DESARROLLADOR WEB-FRONTEND',
    name: 'DOUGLAS CAMARGO',
    description: 'Programador con más de 4 años de experiencia en desarrollo de software y aplicaciones web. He trabajado en la industria tecnológica resolviendo problemas complejos y mejorando la eficiencia mediante el trabajo en equipo. Mis logros incluyen la creación e implementación de sistemas complejos y a gran escala. Busco desafíos tecnológicos y proyectos con impacto positivo en la sociedad.',
    contactMe: 'CONTACTARME',
    downloadCV: 'DESCARGAR CV'
  },
  
  // Projects Section
  projects: {
    title: 'PROYECTOS COMPLETADOS',
    view: 'VER'
  },
  
  // Education Section
  educationSection: {
    title: 'EDUCACIÓN',
    university: 'UNIVERSIDAD (2016-2024)',
    completedCourses: 'CURSOS COMPLETADOS (2019-ACTUALIDAD)',
    selfEducation: 'AUTOEDUCACIÓN (2020-ACTUALIDAD)',
    languages: 'IDIOMAS',
    languagesDetails: 'Español-nativo / Inglés-básico',
    description: 'Soy Ingeniero en Informática y he complementado mi formación con diversos cursos certificados enfocados en el desarrollo frontend, incluyendo HTML, CSS, React.js y control de versiones con Git, a través de plataformas como EDteam y Google. Además, he adquirido conocimientos prácticos en tecnologías como Next.js, Tailwind CSS, Bootstrap y TypeScript mediante aprendizaje autodidacta y experiencia en proyectos reales.'
  },
  
  // Skills Section
  skillsContent: {
    title: 'HABILIDADES TÉCNICAS',
    technologies: 'TECNOLOGÍAS',
    tools: 'HERRAMIENTAS',
    language: 'LENGUAJE',
    frameworks: 'FRAMEWORKS',
    gitHubGit: 'GitHub - Git',
    html: 'HTML',
    css: 'CSS',
    javascriptES6: 'JavaScript (ES6)',
    typescript: 'TypeScript',
    reactJS: 'React.js',
    redux: 'Redux',
    nextJS: 'Next.js',
    bootstrap: 'Bootstrap',
    tailwindCSS: 'Tailwind CSS'
  },
  
  // Contact Section
  contact: {
    getInTouch: 'PONTE EN CONTACTO',
    phone: 'TELÉFONO',
    backToTop: 'Volver arriba'
  }
};

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations }
};

// Configuración optimizada de i18n
const i18nConfig = {
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage', 'cookie'],
  },
  react: {
    useSuspense: false,
  },
  // Optimizaciones de rendimiento
  preload: ['en', 'es'],
  ns: ['translation'],
  defaultNS: 'translation',
};

// Inicializar i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig);

// Función para actualizar el idioma después de la detección
export const updateLanguageFromCountry = async (): Promise<void> => {
  try {
    const defaultLanguage = await getDefaultLanguage();
    if (defaultLanguage !== i18n.language) {
      await i18n.changeLanguage(defaultLanguage);
    }
  } catch (error) {
    // Silenciosamente usar inglés por defecto
    console.warn('Error updating language from country detection:', error);
  }
};

export default i18n; 