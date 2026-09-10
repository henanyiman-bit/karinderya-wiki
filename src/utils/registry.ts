import registryData from '../data/pageRegistry.json';
import {
  pageTypes,
  type PageRegistryEntry,
  type PageRegistryFile,
  type PageType,
} from '../schemas/page';

const productionSite = 'https://karinderya.ymmyi.wiki';
const pageTypeSet = new Set<string>(pageTypes);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isCanonicalPath = (path: string) =>
  path === '/' || (path.startsWith('/') && path.endsWith('/') && !path.includes('?') && !path.includes('#'));

const assertString = (value: unknown, field: string, pageId?: string): asserts value is string => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid page registry field "${field}"${pageId ? ` for "${pageId}"` : ''}.`);
  }
};

const assertPage = (value: unknown, index: number): asserts value is PageRegistryEntry => {
  if (!isRecord(value)) throw new Error(`Invalid page registry entry at index ${index}.`);

  assertString(value.id, 'id');
  const pageId = value.id;
  assertString(value.path, 'path', pageId);
  assertString(value.pageType, 'pageType', pageId);
  assertString(value.contentKey, 'contentKey', pageId);

  if (!isCanonicalPath(value.path)) throw new Error(`Invalid canonical path for "${pageId}".`);
  if (!pageTypeSet.has(value.pageType)) throw new Error(`Invalid page type for "${pageId}".`);
  if (value.parentId !== null && typeof value.parentId !== 'string') throw new Error(`Invalid parentId for "${pageId}".`);
  if (typeof value.indexable !== 'boolean') throw new Error(`Invalid indexable flag for "${pageId}".`);
  if (typeof value.includeInSitemap !== 'boolean') throw new Error(`Invalid sitemap flag for "${pageId}".`);
  if (typeof value.searchable !== 'boolean') throw new Error(`Invalid searchable flag for "${pageId}".`);
  if (typeof value.navigationPriority !== 'number' || !Number.isFinite(value.navigationPriority)) {
    throw new Error(`Invalid navigation priority for "${pageId}".`);
  }
  if (!Array.isArray(value.legacyPaths) || !value.legacyPaths.every((path) => typeof path === 'string' && isCanonicalPath(path))) {
    throw new Error(`Invalid legacy paths for "${pageId}".`);
  }
  if (!isRecord(value.seo)) throw new Error(`Invalid SEO metadata for "${pageId}".`);

  assertString(value.seo.title, 'seo.title', pageId);
  assertString(value.seo.h1, 'seo.h1', pageId);
  assertString(value.seo.description, 'seo.description', pageId);
  if (value.seo.ogType !== 'website' && value.seo.ogType !== 'article') {
    throw new Error(`Invalid ogType for "${pageId}".`);
  }
  if (value.seo.ogImageKey !== null && typeof value.seo.ogImageKey !== 'string') {
    throw new Error(`Invalid ogImageKey for "${pageId}".`);
  }
};

export const validatePageRegistry = (value: unknown): PageRegistryFile => {
  if (!isRecord(value)) throw new Error('Page registry must be an object.');
  if (value.site !== productionSite) throw new Error('Page registry must use the production site URL.');
  if (value.trailingSlash !== 'always') throw new Error('Page registry must use trailing slashes.');
  if (!Array.isArray(value.pages)) throw new Error('Page registry pages must be an array.');

  value.pages.forEach(assertPage);

  const pages = value.pages as PageRegistryEntry[];
  const ids = new Set<string>();
  const paths = new Set<string>();
  const titles = new Set<string>();

  for (const page of pages) {
    if (ids.has(page.id)) throw new Error(`Duplicate page registry id "${page.id}".`);
    if (paths.has(page.path)) throw new Error(`Duplicate page registry path "${page.path}".`);
    if (titles.has(page.seo.title)) throw new Error(`Duplicate page registry title "${page.seo.title}".`);
    if (!page.indexable && page.includeInSitemap) throw new Error(`Noindex page "${page.id}" cannot be included in the sitemap.`);
    ids.add(page.id);
    paths.add(page.path);
    titles.add(page.seo.title);
  }

  for (const page of pages) {
    if (page.parentId === page.id) {
      throw new Error(`Page registry entry "${page.id}" cannot reference itself as its parent.`);
    }
    if (page.parentId !== null && !ids.has(page.parentId)) {
      throw new Error(`Unknown parentId "${page.parentId}" for "${page.id}".`);
    }
  }

  const pagesById = new Map(pages.map((page) => [page.id, page]));

  for (const page of pages) {
    const visited = new Set<string>();
    const hierarchy = [];
    let current: PageRegistryEntry | undefined = page;

    while (current) {
      if (visited.has(current.id)) {
        hierarchy.push(current.id);
        throw new Error(`Circular page registry hierarchy detected: ${hierarchy.join(' -> ')}.`);
      }

      visited.add(current.id);
      hierarchy.push(current.id);
      current = current.parentId === null ? undefined : pagesById.get(current.parentId);
    }
  }

  return value as unknown as PageRegistryFile;
};

export const pageRegistry = validatePageRegistry(registryData);
export const pages = pageRegistry.pages as readonly PageRegistryEntry[];

const pagesById = new Map(pages.map((page) => [page.id, page]));
const pagesByPath = new Map(pages.map((page) => [page.path, page]));

export const getPageById = (id: string) => pagesById.get(id);
export const getPageByPath = (path: string) => pagesByPath.get(path);
export const getIndexablePages = () => pages.filter((page) => page.indexable);
export const getSitemapPages = () => pages.filter((page) => page.indexable && page.includeInSitemap);
export const getSearchablePages = () => pages.filter((page) => page.indexable && page.searchable);
export const getChildren = (parentId: string) => pages.filter((page) => page.parentId === parentId);
export const isPageType = (value: string): value is PageType => pageTypeSet.has(value);
