import registryJson from '../../data/pageRegistry.json' with { type: 'json' };
import { ENTITY_TYPES, ISO_DATE_PATTERN } from '../schema/common.ts';
import type { GameEntity } from '../schema/entity.ts';
import { fieldDictionary, type FieldId, type VerifiedValue } from '../schema/field.ts';
import type { GameSource } from '../schema/source.ts';
import type { GameVersion } from '../schema/version.ts';
import type { ValidationIssue } from '../schema/validation.ts';

const registryPages = registryJson.pages as Array<{ id: string; path: string }>;

const validateValueType = (fieldId: FieldId, field: VerifiedValue, entity: GameEntity, issues: ValidationIssue[]) => {
  if (field.value === undefined) return;
  const definition = fieldDictionary[fieldId];
  const valid = definition.dataType === 'number' ? typeof field.value === 'number'
    : definition.dataType === 'boolean' ? typeof field.value === 'boolean'
    : definition.dataType === 'entity-ref-list' ? Array.isArray(field.value) && field.value.every((value) => typeof value === 'string')
    : typeof field.value === 'string';
  if (!valid) issues.push({ severity: 'ERROR', code: 'INVALID_FIELD_TYPE', message: `${entity.id}.${fieldId} does not match ${definition.dataType}.`, recordId: entity.id });
};

export const validateEntities = (
  entities: GameEntity[], sources: GameSource[], versions: GameVersion[],
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const sourceIds = new Set(sources.map((source) => source.id));
  const versionIds = new Set(versions.map((version) => version.id));
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const canonicalUrls = new Set<string>();
  const canonicalPageIds = new Set<string>();

  for (const entity of entities) {
    if (ids.has(entity.id)) issues.push({ severity: 'ERROR', code: 'DUPLICATE_ENTITY_ID', message: `Duplicate entity ID: ${entity.id}`, recordId: entity.id });
    if (slugs.has(entity.slug)) issues.push({ severity: 'ERROR', code: 'DUPLICATE_ENTITY_SLUG', message: `Duplicate entity slug: ${entity.slug}`, recordId: entity.id });
    if (canonicalUrls.has(entity.canonicalUrl)) issues.push({ severity: 'ERROR', code: 'CANONICAL_COLLISION', message: `Duplicate canonical URL: ${entity.canonicalUrl}`, recordId: entity.id });
    if (canonicalPageIds.has(entity.canonicalPageId)) issues.push({ severity: 'ERROR', code: 'CANONICAL_PAGE_COLLISION', message: `Multiple entities use pageId ${entity.canonicalPageId}.`, recordId: entity.id });
    ids.add(entity.id); slugs.add(entity.slug); canonicalUrls.add(entity.canonicalUrl); canonicalPageIds.add(entity.canonicalPageId);
    if (!ENTITY_TYPES.includes(entity.entityType)) issues.push({ severity: 'ERROR', code: 'INVALID_ENTITY_TYPE', message: `Invalid entity type for ${entity.id}.`, recordId: entity.id });
    const page = registryPages.find((item) => item.id === entity.canonicalPageId);
    if (!page) issues.push({ severity: 'ERROR', code: 'UNKNOWN_CANONICAL_PAGE', message: `Unknown canonical pageId ${entity.canonicalPageId}.`, recordId: entity.id });
    else if (page.path !== entity.canonicalUrl) issues.push({ severity: 'ERROR', code: 'CANONICAL_PATH_MISMATCH', message: `${entity.id} URL differs from Registry path.`, recordId: entity.id });
    if (!entity.summary) issues.push({ severity: 'WARNING', code: 'MISSING_SUMMARY', message: `${entity.id} has no summary.`, recordId: entity.id });
    if (entity.lastVerifiedAt && !ISO_DATE_PATTERN.test(entity.lastVerifiedAt)) issues.push({ severity: 'ERROR', code: 'INVALID_VERIFIED_DATE', message: `Invalid lastVerifiedAt for ${entity.id}.`, recordId: entity.id });

    for (const [rawFieldId, field] of Object.entries(entity.fields)) {
      const fieldId = rawFieldId as FieldId;
      const definition = fieldDictionary[fieldId];
      if (!definition) {
        issues.push({ severity: 'ERROR', code: 'UNKNOWN_FIELD', message: `Unknown field ${rawFieldId} on ${entity.id}.`, recordId: entity.id });
        continue;
      }
      if (!definition.entityTypes.includes(entity.entityType)) issues.push({ severity: 'ERROR', code: 'FIELD_NOT_ALLOWED', message: `${fieldId} is not allowed on ${entity.entityType}.`, recordId: entity.id });
      validateValueType(fieldId, field, entity, issues);
      if (field.unit && !definition.allowedUnits?.includes(field.unit)) issues.push({ severity: 'ERROR', code: 'INVALID_UNIT', message: `Invalid unit ${field.unit} for ${entity.id}.${fieldId}.`, recordId: entity.id });
      if (field.status === 'UNKNOWN' && field.value !== undefined) issues.push({ severity: 'ERROR', code: 'UNKNOWN_HAS_VALUE', message: `UNKNOWN field ${entity.id}.${fieldId} must not contain a value.`, recordId: entity.id });
      if (field.status === 'VERIFIED' && field.sourceIds.length === 0) issues.push({ severity: 'ERROR', code: 'VERIFIED_WITHOUT_SOURCE', message: `VERIFIED field ${entity.id}.${fieldId} requires a source.`, recordId: entity.id });
      if (field.status === 'PARTIAL' && field.sourceIds.length === 0) issues.push({ severity: 'ERROR', code: 'PARTIAL_WITHOUT_SOURCE', message: `PARTIAL field ${entity.id}.${fieldId} requires a source.`, recordId: entity.id });
      if (field.status === 'PARTIAL' && !field.notes) issues.push({ severity: 'WARNING', code: 'PARTIAL_WITHOUT_NOTES', message: `PARTIAL field ${entity.id}.${fieldId} should explain its limits.`, recordId: entity.id });
      if (field.status === 'DISPUTED' && (field.sourceIds.length < 2 || !field.notes)) issues.push({ severity: 'ERROR', code: 'INVALID_DISPUTE', message: `DISPUTED field ${entity.id}.${fieldId} requires at least two sources and notes.`, recordId: entity.id });
      if (field.status === 'OUTDATED' && !field.versionScope) issues.push({ severity: 'ERROR', code: 'OUTDATED_WITHOUT_VERSION', message: `OUTDATED field ${entity.id}.${fieldId} requires a versionScope.`, recordId: entity.id });
      for (const sourceId of field.sourceIds) if (!sourceIds.has(sourceId)) issues.push({ severity: 'ERROR', code: 'UNKNOWN_SOURCE', message: `${entity.id}.${fieldId} references unknown source ${sourceId}.`, recordId: entity.id });
      if (field.versionScope && !versionIds.has(field.versionScope)) issues.push({ severity: 'ERROR', code: 'UNKNOWN_VERSION', message: `${entity.id}.${fieldId} references unknown version ${field.versionScope}.`, recordId: entity.id });
    }
    const supportedFields = Object.values(entity.fields).filter((field) => field.value !== undefined && ['VERIFIED', 'PARTIAL'].includes(field.status));
    const verifiedFields = Object.values(entity.fields).filter((field) => field.value !== undefined && field.status === 'VERIFIED');
    if (entity.status === 'PARTIAL' && supportedFields.length === 0) issues.push({ severity: 'ERROR', code: 'PARTIAL_ENTITY_WITHOUT_EVIDENCE', message: `PARTIAL entity ${entity.id} requires a supported field.`, recordId: entity.id });
    if (entity.status === 'CONFIRMED' && verifiedFields.length === 0) issues.push({ severity: 'ERROR', code: 'CONFIRMED_ENTITY_WITHOUT_VERIFIED_FIELD', message: `CONFIRMED entity ${entity.id} requires a VERIFIED field.`, recordId: entity.id });
    if (entity.status === 'UNKNOWN' && supportedFields.length > 0) issues.push({ severity: 'ERROR', code: 'UNKNOWN_ENTITY_HAS_SUPPORTED_FIELD', message: `UNKNOWN entity ${entity.id} cannot contain supported values without status review.`, recordId: entity.id });
  }
  return issues;
};
