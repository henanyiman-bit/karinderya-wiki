import { createInventoryEntity } from './helpers.ts';

const ingredient = (id: string, name: string, status: 'PARTIAL' | 'UNKNOWN', sourceIds: string[] = []) =>
  createInventoryEntity({
    id, slug: id, name, entityType: 'ingredient', categoryId: 'ingredients',
    canonicalPageId: `ingredient-${id}`, canonicalUrl: `/ingredients/${id}/`, status, sourceIds,
    notes: status === 'PARTIAL'
      ? 'The name and Grocery association appear in dated interface evidence; current gameplay details remain unverified.'
      : 'The canonical page already exists, but current independent evidence has not yet confirmed the game data.',
    relatedGuidePageIds: ['guides-cooking-and-serving'],
  });

export const ingredientEntities = [
  {
    ...ingredient('rice', 'Rice', 'PARTIAL', ['gameplay-grocery-capture-2026-09-02', 'public-gameplay-grocery-ui-2026-08-24']),
    fields: {
      ...ingredient('rice', 'Rice', 'PARTIAL', ['gameplay-grocery-capture-2026-09-02', 'public-gameplay-grocery-ui-2026-08-24']).fields,
      cost: { value: 200, unit: 'cash', status: 'PARTIAL', sourceIds: ['public-gameplay-grocery-ui-2026-08-24'], versionScope: 'observed-2026-08-24', verifiedAt: '2026-09-10', notes: 'A clear dated Grocery UI frame displays 25kg Rice at 200 Cash. This is not a current-version guarantee.' },
    },
  },
  {
    ...ingredient('condiments', 'Condiments', 'PARTIAL', ['gameplay-grocery-capture-2026-09-02', 'public-gameplay-grocery-ui-2026-08-24']),
    fields: {
      ...ingredient('condiments', 'Condiments', 'PARTIAL', ['gameplay-grocery-capture-2026-09-02', 'public-gameplay-grocery-ui-2026-08-24']).fields,
      cost: { value: 135, unit: 'cash', status: 'PARTIAL', sourceIds: ['public-gameplay-grocery-ui-2026-08-24'], versionScope: 'observed-2026-08-24', verifiedAt: '2026-09-10', notes: 'A clear dated Grocery UI frame displays Condiments at 135 Cash. This is not a current-version guarantee.' },
    },
  },
  ingredient('eggs', 'Eggs', 'UNKNOWN'),
  ingredient('vegetables', 'Vegetables', 'UNKNOWN'),
  ingredient('bangus', 'Bangus', 'UNKNOWN'),
  ingredient('pork', 'Pork', 'UNKNOWN'),
  ingredient('beef', 'Beef', 'UNKNOWN'),
] as const;
