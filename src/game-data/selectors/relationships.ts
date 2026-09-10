import type { EntityRelationship, RelationshipType } from '../schema/relationship.ts';

export const getRelationshipsForEntity = (
  relationships: EntityRelationship[],
  entityId: string,
  type?: RelationshipType,
) => relationships.filter((relationship) =>
  (relationship.fromEntityId === entityId || relationship.toEntityId === entityId)
  && (!type || relationship.type === type),
);
