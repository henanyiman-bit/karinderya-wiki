export interface PageSEO {
  title: string;
  h1: string;
  description: string;
  canonicalPath: string;
  indexable: boolean;
  ogType: 'website' | 'article';
  ogImageKey: string | null;
}
