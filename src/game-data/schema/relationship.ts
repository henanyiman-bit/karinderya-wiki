import type { VerificationStatus } from './common.ts';

export const RELATIONSHIP_TYPES = [
  'REQUIRES', 'USED_IN', 'CREATES', 'BELONGS_TO', 'UPGRADES_TO',
  'RELATED_TO', 'SERVED_BY', 'USED_WITH', 'OBTAINED_FROM',
] as const;

export type RelationshipType = (typeof RELATIONSHIP_TYPES)[number];

export interface EntityRelationship {
  id: string;
  fromEntityId: string;
  toEntityId: string;
  type: RelationshipType;
  status: VerificationStatus;
  sourceIds: string[];
  versionScope?: string;
  notes?: string;
}
