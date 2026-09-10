import type { EntityRelationship } from '../schema/relationship.ts';

// Navigation proximity is not treated as a gameplay relationship. Add records only
// after the relation itself has evidence.
export const entityRelationships: EntityRelationship[] = [];
