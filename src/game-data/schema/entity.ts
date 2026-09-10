import type { EntityStatus, EntityType } from './common.ts';
import type { FieldId, VerifiedValue } from './field.ts';

export interface GameEntity {
  id: string;
  slug: string;
  name: string;
  entityType: EntityType;
  categoryId?: string;
  aliases?: string[];
  canonicalPageId: string;
  canonicalUrl: string;
  summary?: string;
  fields: Partial<Record<FieldId, VerifiedValue>>;
  relatedEntityIds?: string[];
  relatedGuidePageIds?: string[];
  availableSince?: string;
  unavailableSince?: string;
  status: EntityStatus;
  lastVerifiedAt?: string;
}
