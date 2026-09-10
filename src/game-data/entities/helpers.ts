import type { GameEntity } from '../schema/entity.ts';

interface EntitySeed {
  id: string;
  slug: string;
  name: string;
  entityType: GameEntity['entityType'];
  categoryId: string;
  canonicalPageId: string;
  canonicalUrl: string;
  status: GameEntity['status'];
  sourceIds?: string[];
  notes: string;
  relatedGuidePageIds?: string[];
}

export const createInventoryEntity = (seed: EntitySeed): GameEntity => ({
  ...seed,
  summary: `${seed.name} is retained as an existing canonical wiki entity while its game data is re-verified.`,
  fields: {
    category: seed.status === 'PARTIAL'
      ? {
          value: seed.categoryId,
          status: 'PARTIAL',
          sourceIds: seed.sourceIds ?? [],
          versionScope: 'observed-2026-09-09',
          verifiedAt: '2026-09-09',
          notes: seed.notes,
        }
      : {
          status: 'UNKNOWN',
          sourceIds: [],
          notes: seed.notes,
        },
    cost: { status: 'UNKNOWN', sourceIds: [] },
    effect: { status: 'UNKNOWN', sourceIds: [] },
  },
  relatedGuidePageIds: seed.relatedGuidePageIds ?? [],
  lastVerifiedAt: seed.status === 'PARTIAL' ? '2026-09-09' : undefined,
});
