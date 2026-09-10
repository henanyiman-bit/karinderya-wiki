export const pageTypes = [
  'homepage',
  'category',
  'directory',
  'entity',
  'guide',
  'update',
  'policy',
  'information',
] as const;

export type PageType = (typeof pageTypes)[number];

export interface PageSeoMetadata {
  title: string;
  h1: string;
  description: string;
  ogType: 'website' | 'article';
  ogImageKey: string | null;
}

export interface PageRegistryEntry {
  id: string;
  path: string;
  pageType: PageType;
  contentKey: string;
  parentId: string | null;
  indexable: boolean;
  includeInSitemap: boolean;
  searchable: boolean;
  navigationPriority: number;
  legacyPaths: string[];
  seo: PageSeoMetadata;
}

export interface PageRegistryFile {
  site: string;
  trailingSlash: 'always';
  pages: PageRegistryEntry[];
}
