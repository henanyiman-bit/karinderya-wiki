import type { NavigationGroupConfig } from '../schemas/navigation';

export const navigationConfig = [
  {
    id: 'header-brand',
    items: [{ pageId: 'home' }],
  },
  {
    id: 'header-primary',
    items: [
      { pageId: 'home', label: 'Wiki' },
      { pageId: 'codes', label: 'Codes' },
      { pageId: 'food', label: 'Food' },
      { pageId: 'recipes', label: 'Recipes' },
      { pageId: 'workers', label: 'Workers' },
      { pageId: 'equipment' },
      { pageId: 'guides' },
      { pageId: 'updates', label: 'Updates' },
    ],
  },
  {
    id: 'footer-primary',
    items: [
      { pageId: 'about' },
      { pageId: 'contact' },
      { pageId: 'privacy-policy', label: 'Privacy' },
      { pageId: 'terms', label: 'Terms' },
      { pageId: 'disclaimer' },
    ],
  },
] satisfies readonly NavigationGroupConfig[];
