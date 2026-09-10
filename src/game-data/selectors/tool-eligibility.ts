import type { GameEntity } from '../schema/entity.ts';
import type { EntityRelationship, RelationshipType } from '../schema/relationship.ts';
import type { AdvisorRule, ToolCandidate, ToolEvaluation } from '../schema/tool.ts';
import { getEntitiesByType } from './entities.ts';

export const evaluateToolEligibility = (
  tool: ToolCandidate,
  entities: GameEntity[],
  relationships: EntityRelationship[],
): ToolEvaluation => {
  const totalScore = tool.demandScore + tool.dataScore + tool.logicScore
    + tool.utilityScore + tool.maintenanceScore;
  const reasons: string[] = [];
  const hasEntityTypes = tool.requiredEntityTypes.every((type) => getEntitiesByType(entities, type).length > 0);
  const hasFields = tool.requiredFields.every((fieldId) => entities.some((entity) => {
    const field = entity.fields[fieldId as keyof typeof entity.fields];
    return field?.value !== undefined && ['VERIFIED', 'PARTIAL'].includes(field.status);
  }));
  const hasRelationships = (tool.requiredRelationships ?? []).every((type) =>
    relationships.some((relationship) => relationship.type === type && ['VERIFIED', 'PARTIAL'].includes(relationship.status)),
  );
  if (!hasEntityTypes) reasons.push('Required entity types are missing.');
  if (!hasFields) reasons.push('Required verified fields are missing.');
  if (!hasRelationships) reasons.push('Required verified relationships are missing.');
  if (tool.dataScore < 12) reasons.push('Data score is below 12.');
  if (tool.logicScore < 12) reasons.push('Logic score is below 12.');
  const publicReady = totalScore >= 80 && tool.dataScore >= 12 && tool.logicScore >= 12
    && hasEntityTypes && hasFields && hasRelationships;
  const eligibility = publicReady ? 'PUBLIC_READY'
    : totalScore >= 60 && hasEntityTypes && hasFields && hasRelationships ? 'PROTOTYPE'
    : !hasEntityTypes || !hasFields || !hasRelationships || tool.requiresFormula || tool.requiresRuleSet ? 'HOLD'
    : 'REJECT';
  return { toolId: tool.id, totalScore, eligibility, reasons };
};

export const getExecutableAdvisorRules = (rules: AdvisorRule[]) =>
  rules.filter((rule) => rule.status === 'VERIFIED');

export interface ComparisonEvaluation {
  status: 'READY_FOR_PROTOTYPE' | 'NOT_READY';
  qualifyingEntityIds: string[];
  comparableFieldIds: string[];
  reasons: string[];
}

export const evaluateComparisonReadiness = (
  entityType: GameEntity['entityType'],
  fieldIds: string[],
  entities: GameEntity[],
): ComparisonEvaluation => {
  const candidates = entities.filter((entity) => entity.entityType === entityType);
  const qualifyingEntityIds = candidates.filter((entity) => fieldIds.filter((fieldId) => {
    const field = entity.fields[fieldId as keyof typeof entity.fields];
    return field?.value !== undefined && ['VERIFIED', 'PARTIAL'].includes(field.status);
  }).length >= 2).map((entity) => entity.id);
  const comparableFieldIds = fieldIds.filter((fieldId) => candidates.filter((entity) => {
    const field = entity.fields[fieldId as keyof typeof entity.fields];
    return field?.value !== undefined && ['VERIFIED', 'PARTIAL'].includes(field.status);
  }).length >= 2);
  const ready = qualifyingEntityIds.length >= 2 && comparableFieldIds.length >= 2;
  return {
    status: ready ? 'READY_FOR_PROTOTYPE' : 'NOT_READY',
    qualifyingEntityIds, comparableFieldIds,
    reasons: ready ? [] : ['At least two entities need at least two shared meaningful verified or partial fields.'],
  };
};
