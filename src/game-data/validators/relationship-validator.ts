import { RELATIONSHIP_TYPES, type EntityRelationship } from '../schema/relationship.ts';
import type { GameEntity } from '../schema/entity.ts';
import type { GameSource } from '../schema/source.ts';
import type { GameVersion } from '../schema/version.ts';
import type { ValidationIssue } from '../schema/validation.ts';

export const validateRelationships = (
  relationships: EntityRelationship[], entities: GameEntity[], sources: GameSource[], versions: GameVersion[] = [],
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const entityIds = new Set(entities.map((entity) => entity.id));
  const sourceIds = new Set(sources.map((source) => source.id));
  const versionIds = new Set(versions.map((version) => version.id));
  const ids = new Set<string>();
  const signatures = new Set<string>();
  for (const relationship of relationships) {
    if (ids.has(relationship.id)) issues.push({ severity: 'ERROR', code: 'DUPLICATE_RELATIONSHIP_ID', message: `Duplicate relationship ID: ${relationship.id}`, recordId: relationship.id });
    ids.add(relationship.id);
    if (!entityIds.has(relationship.fromEntityId) || !entityIds.has(relationship.toEntityId)) issues.push({ severity: 'ERROR', code: 'UNKNOWN_RELATIONSHIP_ENTITY', message: `${relationship.id} points to an unknown entity.`, recordId: relationship.id });
    if (relationship.fromEntityId === relationship.toEntityId) issues.push({ severity: 'ERROR', code: 'SELF_RELATIONSHIP', message: `${relationship.id} is self-referential.`, recordId: relationship.id });
    if (!RELATIONSHIP_TYPES.includes(relationship.type)) issues.push({ severity: 'ERROR', code: 'INVALID_RELATIONSHIP_TYPE', message: `${relationship.id} has an invalid type.`, recordId: relationship.id });
    const signature = `${relationship.fromEntityId}|${relationship.type}|${relationship.toEntityId}`;
    if (signatures.has(signature)) issues.push({ severity: 'ERROR', code: 'DUPLICATE_RELATIONSHIP', message: `Duplicate relationship: ${signature}`, recordId: relationship.id });
    signatures.add(signature);
    for (const sourceId of relationship.sourceIds) if (!sourceIds.has(sourceId)) issues.push({ severity: 'ERROR', code: 'UNKNOWN_RELATIONSHIP_SOURCE', message: `${relationship.id} references unknown source ${sourceId}.`, recordId: relationship.id });
    if (['VERIFIED', 'PARTIAL', 'DISPUTED', 'OUTDATED'].includes(relationship.status) && relationship.sourceIds.length === 0) issues.push({ severity: 'ERROR', code: 'RELATIONSHIP_WITHOUT_SOURCE', message: `${relationship.id} requires source evidence.`, recordId: relationship.id });
    if (relationship.status === 'DISPUTED' && (relationship.sourceIds.length < 2 || !relationship.notes)) issues.push({ severity: 'ERROR', code: 'INVALID_RELATIONSHIP_DISPUTE', message: `${relationship.id} requires multiple sources and conflict notes.`, recordId: relationship.id });
    if (relationship.status === 'OUTDATED' && !relationship.versionScope) issues.push({ severity: 'ERROR', code: 'OUTDATED_RELATIONSHIP_WITHOUT_VERSION', message: `${relationship.id} requires a versionScope.`, recordId: relationship.id });
    if (relationship.versionScope && !versionIds.has(relationship.versionScope)) issues.push({ severity: 'ERROR', code: 'UNKNOWN_RELATIONSHIP_VERSION', message: `${relationship.id} references unknown version ${relationship.versionScope}.`, recordId: relationship.id });
  }
  return issues;
};
