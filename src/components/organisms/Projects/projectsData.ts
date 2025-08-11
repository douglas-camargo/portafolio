export interface ProjectTag {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  tags: ProjectTag[];
  image: string;
  showViewButton: boolean;
  githubUrl: string;
  pageUrl: string;
  backendUrl: string;
  showFrontendBackendLabels: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    tags: [
      { id: 1, name: 'REACT' },
      { id: 2, name: 'JAVASCRIPT' },
      { id: 3, name: 'TAILWINDCSS' },
    ],
    image: '/images/project-project-restaurant-casa-del-sabor.webp',
    showViewButton: true,
    githubUrl: 'https://github.com/douglas-camargo/restaurante_casa_del_sabor',
    pageUrl: 'https://restaurante-casa-del-sabor.vercel.app/',
    backendUrl: '',
    showFrontendBackendLabels: false,
  },
  {
    id: 2,
    tags: [
      { id: 1, name: 'REACT' },
      { id: 2, name: 'JAVASCRIPT' },
      { id: 3, name: 'TAILWINDCSS' },
    ],
    image: '/images/project-restaurant.webp',
    showViewButton: true,
    githubUrl: 'https://github.com/douglas-camargo/lading_restaurant',
    pageUrl: 'https://restaurant-black-alpha.vercel.app/',
    backendUrl: '',
    showFrontendBackendLabels: false,
  },
  {
    id: 3,
    tags: [
      { id: 1, name: 'REACT' },
      { id: 2, name: 'TYPESCRIPT' },
      { id: 3, name: 'TAILWINDCSS' },
      { id: 4, name: 'EXPRESS' },
    ],
    image: '/images/project-clinic.webp',
    showViewButton: true,
    githubUrl: 'https://github.com/douglas-camargo/landing_clinic',
    pageUrl: 'https://landing-clinic.vercel.app/',
    backendUrl: 'https://github.com/douglas-camargo/backend_landing_clinica',
    showFrontendBackendLabels: true,
  },
  {
    id: 4,
    tags: [
      { id: 1, name: 'NEXT.JS' },
      { id: 3, name: 'JAVASCRIPT' },
      { id: 2, name: 'TAILWINDCSS' },
    ],
    image: '/images/pokemon-explorer.webp',
    showViewButton: false,
    githubUrl: 'https://github.com/douglas-camargo/Pokemon-explorer',
    pageUrl: 'https://pokemon-explorer-seven.vercel.app/',
    backendUrl: '',
    showFrontendBackendLabels: false,
  },
  {
    id: 5,
    tags: [
      { id: 1, name: 'REACT' },
      { id: 2, name: 'JAVASCRIPT' },
      { id: 3, name: 'TAILWINDCSS' },
    ],
    image: '/images/project-lawyers.webp',
    showViewButton: true,
    githubUrl: 'https://github.com/douglas-camargo/landing_lawyers',
    pageUrl: 'https://landing-lawyers.vercel.app/',
    backendUrl: '',
    showFrontendBackendLabels: false,
  },
  {
    id: 6,
    tags: [
      { id: 1, name: 'HTML' },
      { id: 2, name: 'CSS' },
      { id: 3, name: 'JAVASCRIPT' },
    ],
    image: '/images/project-hsectechnology.webp',
    showViewButton: false,
    githubUrl: '',
    pageUrl: 'https://hsectechnology.com/index.html',
    backendUrl: '',
    showFrontendBackendLabels: false,
  },
];
