import type { CaptureImpactRecord, CaptureTask, EvidenceImpact } from './capture-types.ts';

const impactFrom = (value: number, highAt: number): EvidenceImpact => value >= highAt ? 'HIGH' : value > 0 ? 'MEDIUM' : 'LOW';

export const calculateCaptureImpact = (task: CaptureTask): CaptureImpactRecord => {
  const entitiesAffected = new Set([...(task.entityId ? [task.entityId] : []), ...(task.candidateEntityIds ?? [])]).size;
  const fieldsAffected = task.fieldIds.length;
  const relationshipsAffected = (task.relationshipTypes?.length ?? 0) + task.relationshipIds.length;
  return {
    taskId: task.id,
    entitiesAffected,
    fieldsAffected,
    relationshipsAffected,
    databaseImpact: impactFrom(entitiesAffected + fieldsAffected + relationshipsAffected, 8),
    toolImpact: impactFrom(fieldsAffected + relationshipsAffected, 5),
    priority: task.priority,
    rationale: relationshipsAffected > 0 ? 'May unlock entities, fields, and user-value relationships after review.' : 'May upgrade entity identity and shared comparison fields after review.',
  };
};

const impactRank = { HIGH:3, MEDIUM:2, LOW:1 } as const;
const priorityRank = { P0:3, P1:2, P2:1 } as const;
export const rankCaptureTasksByImpact = (tasks: CaptureTask[]) => tasks.map(calculateCaptureImpact).sort((a,b) =>
  impactRank[b.databaseImpact] - impactRank[a.databaseImpact]
  || impactRank[b.toolImpact] - impactRank[a.toolImpact]
  || priorityRank[b.priority] - priorityRank[a.priority]
  || b.entitiesAffected - a.entitiesAffected
  || b.relationshipsAffected - a.relationshipsAffected,
);
