export const products = {
  'client-keeper': {
    id: 'client-keeper',
    name: 'Client Keeper CRM',
    slug: 'client-keeper-crm',
    tagline: 'Real Estate CRM Without the Tech Overwhelm',
    colors: {
      primary: '#300092',
      accent: '#7a36dd',
    },
  },
  'atticus': {
    id: 'atticus',
    name: 'Atticus',
    slug: 'atticus-social-media',
    tagline: 'Social media, simplified.',
    colors: {
      primary: '#2A6A8D',
      accent: '#FF6B35',
    },
  },
  'nicole': {
    id: 'nicole',
    name: 'Nicole',
    slug: 'nicole-websites',
    tagline: 'Beautiful websites for real estate agents',
    colors: {
      primary: '#1a1a1a',
      accent: '#666666',
    },
  },
} as const;

export type ProductId = keyof typeof products;
export type Product = typeof products[ProductId];
