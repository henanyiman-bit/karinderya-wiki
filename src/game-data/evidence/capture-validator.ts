import type { GameEntity } from '../schema/entity.ts';
import { fieldDictionary } from '../schema/field.ts';
import type { CaptureTask, EvidenceReview, FieldStatusHistory } from './capture-types.ts';

export interface CaptureValidationIssue { code: string; taskId?: string; message: string }

export const validateCaptureTasks = (tasks: CaptureTask[], entities: GameEntity[]): CaptureValidationIssue[] => {
  const issues: CaptureValidationIssue[] = [];
  const ids = new Set<string>();
  const entityIds = new Set(entities.map((entity) => entity.id));
  for (const task of tasks) {
    if (ids.has(task.id)) issues.push({ code:'DUPLICATE_CAPTURE_TASK_ID', taskId:task.id, message:`Duplicate capture task ID: ${task.id}` });
    ids.add(task.id);
    if (task.entityId && !entityIds.has(task.entityId)) issues.push({ code:'UNKNOWN_CAPTURE_ENTITY', taskId:task.id, message:`Unknown entity: ${task.entityId}` });
    for (const id of task.candidateEntityIds ?? []) if (!entityIds.has(id)) issues.push({ code:'UNKNOWN_CAPTURE_ENTITY', taskId:task.id, message:`Unknown candidate entity: ${id}` });
    for (const fieldId of task.fieldIds) if (!(fieldId in fieldDictionary)) issues.push({ code:'UNKNOWN_CAPTURE_FIELD', taskId:task.id, message:`Unknown field: ${fieldId}` });
    if (!task.evidenceTarget.trim() || task.requiredVisual.length === 0) issues.push({ code:'VAGUE_CAPTURE_TASK', taskId:task.id, message:'Capture task needs a specific target and required visuals.' });
  }
  return issues;
};

export const validateReviewedEvidence = (review: EvidenceReview): CaptureValidationIssue[] => {
  if (review.status === 'READABLE' && !review.sourceId) return [{ code:'REVIEWED_EVIDENCE_WITHOUT_SOURCE', message:'Readable reviewed evidence requires a SourceRecord.' }];
  return [];
};

export const validateFieldStatusHistory = (history: FieldStatusHistory): CaptureValidationIssue[] => {
  const issues: CaptureValidationIssue[] = [];
  if (history.oldStatus === history.newStatus) issues.push({ code:'UNCHANGED_FIELD_HISTORY', message:'History must represent a status change.' });
  if (['VERIFIED','PARTIAL'].includes(history.newStatus) && history.sourceIds.length === 0) issues.push({ code:'FIELD_HISTORY_WITHOUT_SOURCE', message:'Supported status history requires a source.' });
  if (!history.reason.trim()) issues.push({ code:'FIELD_HISTORY_WITHOUT_REASON', message:'History requires a reason.' });
  return issues;
};
