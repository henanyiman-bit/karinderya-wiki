import { createInventoryEntity } from './helpers.ts';

const stove = (id: string, name: string) => createInventoryEntity({
  id, slug: id, name, entityType: 'equipment', categoryId: 'stoves',
  canonicalPageId: `equipment-${id}`, canonicalUrl: `/equipment/${id}/`, status: 'PARTIAL',
  sourceIds: ['gameplay-placement-capture-2026-08-29'],
  notes: 'The name and stove grouping appear in dated placement evidence; performance and acquisition fields remain unknown.',
  relatedGuidePageIds: ['guides-cooking-and-serving'],
});

export const equipmentEntities = [
  stove('basic-stove', 'Basic Stove'),
  stove('standard-stove', 'Standard Stove'),
  stove('deluxe-stove', 'Deluxe Stove'),
  createInventoryEntity({
    id: 'chiller', slug: 'chiller', name: 'Chiller', entityType: 'equipment', categoryId: 'equipment',
    canonicalPageId: 'equipment-chiller', canonicalUrl: '/equipment/chiller/', status: 'UNKNOWN',
    notes: 'A secondary report is insufficient to confirm current existence or function; retain as a re-verification candidate only.',
    relatedGuidePageIds: ['guides-cooking-and-serving'],
  }),
] as const;
