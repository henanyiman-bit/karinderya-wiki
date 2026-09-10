import type { GameEntity } from '../schema/entity.ts';
import type { EntityRelationship } from '../schema/relationship.ts';
import type { GameSource } from '../schema/source.ts';
import { evaluateDatabaseReadiness } from '../selectors/database-readiness.ts';
import type { CaptureTask, EntityStatusHistory, EvidenceApproval, EvidenceReview, FieldStatusHistory, FieldUpgradeProposal, ManualEvidenceInput, RelationshipUpgradeProposal } from './capture-types.ts';
import { validateReviewedEvidence } from './capture-validator.ts';

export const createManualEvidenceSource = (
  input: ManualEvidenceInput,
  review: EvidenceReview,
  sourceId: string,
  title: string,
): GameSource => {
  if (review.manualInputId !== input.id) throw new Error('Review does not belong to the supplied manual evidence input.');
  if (!['READABLE','PARTIALLY_READABLE'].includes(review.status)) throw new Error('Unreadable evidence cannot become a SourceRecord.');
  const reference = input.fileId ?? (input.localPath ? 'internal-local-file' : 'manual-evidence');
  return {
    id: sourceId,
    title,
    sourceTier: 'DIRECT_GAMEPLAY',
    accessedAt: review.reviewedAt,
    versionScope: input.gameVersionScope,
    notes: `User-provided Karinderya visual evidence; internal reference: ${reference}; review: ${review.status}. Local paths are not exposed as public URLs.`,
  };
};

export const reviewEvidence = (task: CaptureTask, input: ManualEvidenceInput, review: Omit<EvidenceReview, 'captureTaskId' | 'manualInputId'>): EvidenceReview => ({
  ...review, captureTaskId: task.id, manualInputId: input.id,
});

export const approveEvidence = (review: EvidenceReview, source: GameSource, approvedBy: string, approvedAt: string): EvidenceApproval => {
  const issues = validateReviewedEvidence({ ...review, sourceId: source.id });
  if (review.status !== 'READABLE' && review.status !== 'PARTIALLY_READABLE') throw new Error('Evidence requires an explicit readable human review before approval.');
  if (issues.length) throw new Error(issues.map((issue) => issue.message).join(' '));
  return { review: { ...review, sourceId: source.id }, source, approvedBy, approvedAt };
};

export const applyFieldUpgrade = (entities: GameEntity[], approval: EvidenceApproval, proposal: FieldUpgradeProposal, changedAt: string, knownVersionIds?: Set<string>) => {
  if (!proposal.sourceIds.includes(approval.source.id)) throw new Error('Field upgrade must cite the approved evidence source.');
  if (proposal.versionScope && knownVersionIds && !knownVersionIds.has(proposal.versionScope)) throw new Error(`Unknown version scope: ${proposal.versionScope}`);
  const entity = entities.find((item) => item.id === proposal.entityId);
  if (!entity) throw new Error(`Unknown entity: ${proposal.entityId}`);
  const oldStatus = entity.fields[proposal.fieldId]?.status ?? 'UNKNOWN';
  const updated: GameEntity[] = entities.map((item) => item.id !== proposal.entityId ? item : ({
    ...item,
    fields: { ...item.fields, [proposal.fieldId]: { value: proposal.value, unit: proposal.unit, status: proposal.status, sourceIds: proposal.sourceIds, versionScope: proposal.versionScope, verifiedAt: changedAt, notes: proposal.reason } },
    status: item.status === 'UNKNOWN' ? 'PARTIAL' : item.status,
  }));
  const fieldHistory: FieldStatusHistory = { entityId:proposal.entityId, fieldId:proposal.fieldId, oldStatus, newStatus:proposal.status, sourceIds:proposal.sourceIds, changedAt, reason:proposal.reason };
  const entityHistory: EntityStatusHistory[] = entity.status === 'UNKNOWN'
    ? [{ entityId:entity.id, oldStatus:'UNKNOWN', newStatus:'PARTIAL', sourceIds:proposal.sourceIds, changedAt, reason:'A supported field was approved.' }]
    : [];
  return { entities: updated, fieldHistory, entityHistory };
};

export const applyRelationshipUpgrade = (relationships: EntityRelationship[], approval: EvidenceApproval, proposal: RelationshipUpgradeProposal) => {
  if (!proposal.relationship.sourceIds.includes(approval.source.id)) throw new Error('Relationship upgrade must cite the approved evidence source.');
  if (relationships.some((item) => item.id === proposal.relationship.id)) throw new Error(`Duplicate relationship: ${proposal.relationship.id}`);
  return [...relationships, proposal.relationship];
};

export const recalculateReadiness = (category: string, entityTypes: GameEntity['entityType'][], entities: GameEntity[], relationships: EntityRelationship[]) =>
  evaluateDatabaseReadiness(category, entityTypes, entities, relationships);
