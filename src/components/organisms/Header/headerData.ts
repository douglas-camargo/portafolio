export interface NavItem {
  id: string;
  label: string;
  href: string;
  active: boolean;
}

export const getNavItems = (t: any): NavItem[] => [
  {
    id: 'about',
    label: t('about'),
    href: '#about',
    active: false,
  },
  {
    id: 'portfolio',
    label: t('portfolio'),
    href: '#portfolio',
    active: false,
  },
  {
    id: 'education',
    label: t('education'),
    href: '#education',
    active: false,
  },
  {
    id: 'skills',
    label: t('skills'),
    href: '#skills',
    active: false,
  },
  {
    id: 'contacts',
    label: t('contacts'),
    href: '#contacts',
    active: false,
  },
];
