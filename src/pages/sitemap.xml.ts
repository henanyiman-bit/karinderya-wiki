import type { APIRoute } from 'astro';
import { getSitemapPages, pageRegistry } from '../utils/registry';

const productionOrigin = 'https://karinderya.ymmyi.wiki';
const sitemapPages = getSitemapPages();
const sitemapPaths = sitemapPages.map((page) => page.path);
const duplicatePaths = sitemapPaths.filter((path, index) => sitemapPaths.indexOf(path) !== index);

if (pageRegistry.site !== productionOrigin) {
  throw new Error(`Sitemap must use the production origin "${productionOrigin}".`);
}

if (duplicatePaths.length > 0) {
  throw new Error(`Duplicate sitemap paths: ${[...new Set(duplicatePaths)].join(', ')}.`);
}

for (const page of sitemapPages) {
  if (!page.indexable || !page.includeInSitemap) {
    throw new Error(`Invalid sitemap page "${page.id}".`);
  }

  if (page.path !== '/' && !page.path.endsWith('/')) {
    throw new Error(`Sitemap path "${page.path}" must use a trailing slash.`);
  }
}

export const GET: APIRoute = () => {
  const urls = sitemapPaths
    .map((path) => `<url><loc>${new URL(path, productionOrigin).href}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
