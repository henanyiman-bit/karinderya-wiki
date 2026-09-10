import type { EntityType } from '../schema/common.ts';
import type { GameEntity } from '../schema/entity.ts';
import type { EntityRelationship } from '../schema/relationship.ts';
import { fieldDictionary, type FieldId } from '../schema/field.ts';

export type DatabaseReadinessStatus = 'READY' | 'PARTIAL' | 'NOT_READY';

export interface DatabaseReadiness {
  category: string;
  entityCount: number;
  confirmedEntityCount: number;
  verifiedFieldCount: number;
  verifiedOrPartialRatio: number;
  meaningfulComparableFields: string[];
  relationshipCount: number;
  relationshipCoverage: number;
  dataScore: number;
  overallScore: number;
  readyForDatabaseView: boolean;
  status: DatabaseReadinessStatus;
  reasons: string[];
}

export const evaluateDatabaseReadiness = (
  category: string,
  entityTypes: EntityType[],
  entities: GameEntity[],
  relationships: EntityRelationship[],
): DatabaseReadiness => {
  const candidates = entities.filter((entity) => entityTypes.includes(entity.entityType));
  const confirmedEntityCount = candidates.filter((entity) => entity.status === 'CONFIRMED').length;
  const usefulFields = (Object.keys(fieldDictionary) as FieldId[]).filter((fieldId) => {
    if (!fieldDictionary[fieldId].toolEligible) return false;
    return candidates.length >= 2 && candidates.filter((entity) => {
      const field = entity.fields[fieldId];
      return field?.value !== undefined && ['VERIFIED', 'PARTIAL'].includes(field.status);
    }).length === candidates.length;
  });
  const verifiedFieldCount = candidates.reduce((count, entity) => count +
    Object.values(entity.fields).filter((field) => field.status === 'VERIFIED').length, 0);
  const relatedIds = new Set(relationships.flatMap((item) => [item.fromEntityId, item.toEntityId]));
  const candidateIds = new Set(candidates.map((entity) => entity.id));
  const relationshipCount = relationships.filter((item) => candidateIds.has(item.fromEntityId) || candidateIds.has(item.toEntityId)).length;
  const relationshipCoverage = candidates.length === 0
    ? 0
    : candidates.filter((entity) => relatedIds.has(entity.id)).length / candidates.length;
  const entitiesWithTwoMeaningfulFields = candidates.filter((entity) =>
    Object.entries(entity.fields).filter(([fieldId, field]) =>
      fieldDictionary[fieldId as FieldId]?.toolEligible
      && field.value !== undefined
      && ['VERIFIED', 'PARTIAL'].includes(field.status),
    ).length >= 2,
  ).length;
  const readyForDatabaseView = candidates.length >= 5
    && entitiesWithTwoMeaningfulFields === candidates.length
    && usefulFields.length >= 2;
  const reasons: string[] = [];
  if (candidates.length < 5) reasons.push('Fewer than five valid entities are available.');
  if (entitiesWithTwoMeaningfulFields < candidates.length) reasons.push('Not every entity has two meaningful verified or partial fields.');
  if (usefulFields.length < 2) reasons.push('There are fewer than two consistently comparable fields.');
  if (relationshipCoverage === 0) reasons.push('No evidence-backed entity relationships are available.');
  const allFields = candidates.flatMap((entity) => Object.values(entity.fields));
  const verifiedOrPartialRatio = allFields.length === 0 ? 0
    : allFields.filter((field) => ['VERIFIED', 'PARTIAL'].includes(field.status)).length / allFields.length;
  const dataScore = Math.round((candidates.length === 0 ? 0 : entitiesWithTwoMeaningfulFields / candidates.length) * 12
    + Math.min(usefulFields.length / 2, 1) * 8);
  const entityScore = Math.round(Math.min(candidates.length / 5, 1) * 20);
  const relationshipScore = Math.round(relationshipCoverage * 20);
  return {
    category, entityCount: candidates.length, confirmedEntityCount, verifiedFieldCount,
    verifiedOrPartialRatio, meaningfulComparableFields: usefulFields, relationshipCount,
    relationshipCoverage, dataScore, overallScore: entityScore + dataScore + relationshipScore,
    readyForDatabaseView,
    status: readyForDatabaseView ? 'READY' : candidates.length > 0 ? 'PARTIAL' : 'NOT_READY', reasons,
  };
};
