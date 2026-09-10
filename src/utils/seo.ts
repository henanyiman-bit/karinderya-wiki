import type { PageSEO } from '../schemas/seo';
import { getPageById } from './registry';

export const getPageSEO = (pageId: string): PageSEO => {
  const page = getPageById(pageId);

  if (!page) {
    throw new Error(`Unknown page registry id "${pageId}".`);
  }

  return {
    title: page.seo.title,
    h1: page.seo.h1,
    description: page.seo.description,
    canonicalPath: page.path,
    indexable: page.indexable,
    ogType: page.seo.ogType,
    ogImageKey: page.seo.ogImageKey,
  };
};
