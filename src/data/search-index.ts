import { getPageById, getSearchablePages } from '../utils/registry';
import { searchMetadata } from './search-metadata';

export interface SearchEntry {
  title: string;
  description: string;
  url: string;
  category?: string;
  keywords: string[];
  priority?: number;
}

const searchablePages = getSearchablePages();
const metadataByPageId = new Map<string, (typeof searchMetadata)[number]>();

for (const metadata of searchMetadata) {
  if (metadataByPageId.has(metadata.pageId)) {
    throw new Error(`Duplicate search metadata for pageId "${metadata.pageId}".`);
  }

  const page = getPageById(metadata.pageId);

  if (!page) {
    throw new Error(`Search metadata references unknown pageId "${metadata.pageId}".`);
  }

  if (!page.searchable) {
    throw new Error(`Search metadata cannot include non-searchable page "${metadata.pageId}".`);
  }

  metadataByPageId.set(metadata.pageId, metadata);
}

for (const page of searchablePages) {
  if (!metadataByPageId.has(page.id)) {
    throw new Error(`Searchable page "${page.id}" is missing search metadata.`);
  }
}

if (metadataByPageId.size !== searchablePages.length) {
  throw new Error('Search metadata count does not match the searchable page registry count.');
}

const metadataOrder = new Map(searchMetadata.map((metadata, index) => [metadata.pageId, index]));
const orderedSearchablePages = [...searchablePages].sort(
  (left, right) => metadataOrder.get(left.id)! - metadataOrder.get(right.id)!,
);

export const searchIndex: SearchEntry[] = orderedSearchablePages.map((page) => {
  const metadata = metadataByPageId.get(page.id)!;

  return {
    title: metadata.title ?? page.seo.h1,
    description: metadata.description ?? page.seo.description,
    url: page.path,
    category: metadata.category,
    keywords: [...metadata.keywords],
    priority: page.navigationPriority,
  };
});

const searchUrls = searchIndex.map((entry) => entry.url);
const duplicateUrls = searchUrls.filter((url, index) => searchUrls.indexOf(url) !== index);

if (duplicateUrls.length > 0) {
  throw new Error(`Duplicate search index URLs: ${[...new Set(duplicateUrls)].join(', ')}.`);
}

for (const [index, entry] of searchIndex.entries()) {
  const registryPage = orderedSearchablePages[index];

  if (entry.url !== registryPage.path) {
    throw new Error(`Search index URL does not match Registry path for "${registryPage.id}".`);
  }
}

if (searchIndex.length !== searchablePages.length) {
  throw new Error('Search index count does not match the searchable page registry count.');
}
