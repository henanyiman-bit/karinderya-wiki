import type { CaptureStatus } from './capture-types.ts';

const transitions: Record<CaptureStatus, CaptureStatus[]> = {
  OPEN: ['SOURCE_FOUND', 'FRAME_CAPTURED', 'REJECTED'],
  SOURCE_FOUND: ['FRAME_NEEDED', 'FRAME_CAPTURED', 'REJECTED'],
  FRAME_NEEDED: ['FRAME_CAPTURED', 'REJECTED'],
  FRAME_CAPTURED: ['REVIEWED', 'REJECTED'],
  REVIEWED: ['CLOSED', 'REJECTED'],
  REJECTED: [],
  CLOSED: [],
};

export const canTransitionCaptureStatus = (from: CaptureStatus, to: CaptureStatus) => transitions[from].includes(to);

export const transitionCaptureStatus = (from: CaptureStatus, to: CaptureStatus): CaptureStatus => {
  if (!canTransitionCaptureStatus(from, to)) throw new Error(`Invalid capture status transition: ${from} -> ${to}`);
  return to;
};
