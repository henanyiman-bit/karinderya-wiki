import type { APIRoute } from 'astro';

const routes = [
  '/', '/codes/', '/food/', '/recipes/', '/workers/', '/equipment/', '/guides/',
  '/updates/', '/about/', '/contact/', '/privacy-policy/', '/terms/', '/disclaimer/',
  '/grocery/', '/ingredients/', '/furniture/', '/furniture/tables/', '/furniture/chairs/',
  '/ingredients/rice/', '/ingredients/condiments/', '/ingredients/eggs/',
  '/ingredients/vegetables/', '/ingredients/bangus/', '/ingredients/pork/', '/ingredients/beef/',
  '/furniture/plank-table/', '/furniture/wood-table/', '/furniture/red-wooden-table/',
  '/decorations/', '/decorations/tiles/', '/equipment/stoves/', '/equipment/deluxe-stove/',
  '/equipment/basic-stove/', '/equipment/standard-stove/', '/equipment/chiller/',
  '/guides/beginner-guide/', '/guides/5-star-guide/',
  '/guides/co-op-guide/', '/guides/cooking-and-serving/', '/guides/how-to-hire-workers/',
  '/guides/restaurant-layout/', '/guides/upgrade-priority/',
  '/guides/counter-upgrades/', '/guides/choopy-mystery-box/',
  '/guides/how-to-sell-furniture/', '/guides/shop-restock/',
  '/updates/decorations-part-1/',
];

export const GET: APIRoute = ({ site }) => {
  const urls = routes
    .map((route) => `<url><loc>${new URL(route, site).href}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
