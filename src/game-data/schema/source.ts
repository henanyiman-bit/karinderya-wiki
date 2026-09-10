export const SOURCE_TIERS = [
  'OFFICIAL_GAME',
  'OFFICIAL_UPDATE',
  'DIRECT_GAMEPLAY',
  'OFFICIAL_COMMUNITY',
  'TRUSTED_COMMUNITY',
  'SECONDARY',
  'UNVERIFIED',
] as const;

export type SourceTier = (typeof SOURCE_TIERS)[number];

export interface GameSource {
  id: string;
  title: string;
  sourceTier: SourceTier;
  url?: string;
  accessedAt?: string;
  versionScope?: string;
  notes?: string;
}
