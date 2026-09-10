import { allCaptureTasks } from './capture-queue.ts';

export const evidenceIntakeRound5 = {
  checkedAt: '2026-09-10',
  mode: 'MODE_B' as const,
  result: 'NO_NEW_EVIDENCE' as const,
  discoveredFiles: [],
  reviews: [],
  approvals: [],
  fieldUpgrades: [],
  entityUpgrades: [],
  relationshipUpgrades: [],
  queue: {
    total: allCaptureTasks.length,
    open: allCaptureTasks.filter((task) => task.status === 'OPEN').length,
    frameNeeded: allCaptureTasks.filter((task) => task.status === 'FRAME_NEEDED').length,
    frameCaptured: allCaptureTasks.filter((task) => task.status === 'FRAME_CAPTURED').length,
    reviewed: allCaptureTasks.filter((task) => task.status === 'REVIEWED').length,
  },
  notes: [
    'The project scan found only pre-existing public site artwork dated 2026-09-01.',
    'No ManualEvidenceInput, new screenshot, video frame, or FRAME_CAPTURED task was present.',
    'No entity, field, relationship, source, or history record was changed.',
  ],
} as const;
