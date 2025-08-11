export interface ContactInfo {
  email: string;
  phone: string;
}

export interface SocialLink {
  name: string;
}

export const CONTACT_INFO: ContactInfo = {
  email: 'DOUGLAS.CA.DEV@GMAIL.COM',
  phone: '+58 424 1232755',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'WHATSAPP' },
  { name: 'GITHUB' },
  { name: 'LINKEDIN' },
  { name: 'GMAIL' },
];
