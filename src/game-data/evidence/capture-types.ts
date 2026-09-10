import type { EntityType, VerificationStatus } from '../schema/common.ts';
import type { GameEntity } from '../schema/entity.ts';
import type { FieldId, VerifiedValue } from '../schema/field.ts';
import type { EntityRelationship, RelationshipType } from '../schema/relationship.ts';
import type { GameSource } from '../schema/source.ts';

export type CapturePriority = 'P0' | 'P1' | 'P2';
export type CaptureStatus = 'OPEN' | 'SOURCE_FOUND' | 'FRAME_NEEDED' | 'FRAME_CAPTURED' | 'REVIEWED' | 'REJECTED' | 'CLOSED';
export type EvidenceReviewStatus = 'UNREVIEWED' | 'READABLE' | 'PARTIALLY_READABLE' | 'UNREADABLE' | 'CONFLICTING';
export type EvidenceImpact = 'HIGH' | 'MEDIUM' | 'LOW';
export type EvidenceSourceType = 'SCREENSHOT' | 'VIDEO_FRAME' | 'SCREEN_RECORDING' | 'DIRECT_GAMEPLAY';

export interface CaptureTask {
  id: string;
  priority: CapturePriority;
  entityId: string | null;
  candidateEntityIds?: string[];
  entityType: EntityType;
  fieldIds: FieldId[];
  relationshipIds: string[];
  relationshipTypes?: RelationshipType[];
  evidenceTarget: string;
  requiredVisual: string[];
  suggestedSourceType: EvidenceSourceType;
  sourceUrl?: string;
  timestamp?: { start: string; end?: string };
  status: CaptureStatus;
  reviewStatus: EvidenceReviewStatus;
  notes?: string;
}

export interface VideoEvidenceTask extends CaptureTask {
  suggestedSourceType: 'VIDEO_FRAME';
  sourceUrl: string;
  timestamp: { start: string; end?: string };
  targetEntity: string;
  targetField: FieldId;
  expectedUI: string;
  captureNeeded: true;
}

export interface ManualEvidenceInput {
  id: string;
  fileId?: string;
  localPath?: string;
  capturedAt?: string;
  gameVersionScope?: string;
  entityId?: string;
  visibleText: string[];
  candidateFields: FieldId[];
  candidateRelationships: RelationshipType[];
  ocrCandidateText?: string[];
  reviewNotes?: string;
}

export interface EvidenceReview {
  id: string;
  captureTaskId: string;
  manualInputId?: string;
  reviewer: string;
  reviewedAt: string;
  status: EvidenceReviewStatus;
  sourceId?: string;
  readableFields: FieldId[];
  candidateRelationships: RelationshipType[];
  notes: string;
}

export interface FieldStatusHistory {
  entityId: string;
  fieldId: FieldId;
  oldStatus: VerificationStatus;
  newStatus: VerificationStatus;
  sourceIds: string[];
  changedAt: string;
  reason: string;
}

export interface EntityStatusHistory {
  entityId: string;
  oldStatus: GameEntity['status'];
  newStatus: GameEntity['status'];
  sourceIds: string[];
  changedAt: string;
  reason: string;
}

export interface FieldUpgradeProposal {
  entityId: string;
  fieldId: FieldId;
  value: VerifiedValue['value'];
  unit?: string;
  status: Extract<VerificationStatus, 'VERIFIED' | 'PARTIAL'>;
  sourceIds: string[];
  versionScope?: string;
  reason: string;
}

export interface RelationshipUpgradeProposal {
  relationship: EntityRelationship;
  reason: string;
}

export interface EvidenceApproval {
  review: EvidenceReview;
  approvedBy: string;
  approvedAt: string;
  source: GameSource;
}

export interface CaptureImpactRecord {
  taskId: string;
  entitiesAffected: number;
  fieldsAffected: number;
  relationshipsAffected: number;
  databaseImpact: EvidenceImpact;
  toolImpact: EvidenceImpact;
  priority: CapturePriority;
  rationale: string;
}
