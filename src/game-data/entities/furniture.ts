import { createInventoryEntity } from './helpers.ts';

const table = (id: string, name: string, status: 'PARTIAL' | 'UNKNOWN' = 'UNKNOWN', sourceIds: string[] = []) => createInventoryEntity({
  id, slug: id, name, entityType: 'furniture', categoryId: 'tables',
  canonicalPageId: `furniture-${id}`, canonicalUrl: `/furniture/${id}/`, status,
  sourceIds,
  notes: status === 'PARTIAL'
    ? 'A dated public Furniture Shop frame supports the table category, while the exact current label and gameplay properties remain under review.'
    : 'The name currently has secondary discovery evidence only and requires current game or creator confirmation.',
  relatedGuidePageIds: ['guides-restaurant-layout'],
});

export const furnitureEntities = [
  table('plank-table', 'Plank Table'),
  table('wood-table', 'Wood Table'),
  table('red-wooden-table', 'Red Wooden Table', 'PARTIAL', ['public-gameplay-furniture-shop-ui-2026-09-02']),
] as const;
