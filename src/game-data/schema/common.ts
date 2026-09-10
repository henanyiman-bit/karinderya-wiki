export const ENTITY_TYPES = [
  'ingredient',
  'equipment',
  'furniture',
  'worker',
  'dish',
  'recipe',
  'decoration',
  'upgrade',
] as const;

export type EntityType = (typeof ENTITY_TYPES)[number];

export const VERIFICATION_STATUSES = [
  'VERIFIED',
  'PARTIAL',
  'UNKNOWN',
  'DISPUTED',
  'OUTDATED',
] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];
export type EntityStatus = 'CONFIRMED' | VerificationStatus;

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
