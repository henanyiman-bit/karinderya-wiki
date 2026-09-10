export type LegacyMigrationStatus = 'NEEDS_REVERIFY' | 'DO_NOT_MIGRATE' | 'REVIEW_STRUCTURE_ONLY';

export interface LegacyCandidate {
  sourceFile: string;
  oldFieldFamily: string;
  migrationStatus: LegacyMigrationStatus;
  reason: string;
}

// This list intentionally records locations and field families, not the old values.
export const legacyMigrationReview: LegacyCandidate[] = [
  { sourceFile: 'src/data/codes.ts', oldFieldFamily: 'code status and rewards', migrationStatus: 'NEEDS_REVERIFY', reason: 'Codes and rewards are time-sensitive and require current official or direct evidence.' },
  { sourceFile: 'src/data/sources.ts', oldFieldFamily: 'legacy source labels and claims', migrationStatus: 'REVIEW_STRUCTURE_ONLY', reason: 'Old source records do not automatically satisfy the new field-level evidence rules.' },
  { sourceFile: 'src/data/entities.ts', oldFieldFamily: 'prices, pack sizes, acquisition and effects', migrationStatus: 'DO_NOT_MIGRATE', reason: 'Exact values and mechanics have not been independently re-verified.' },
  { sourceFile: 'src/pages/**/*.astro', oldFieldFamily: 'hard-coded gameplay facts', migrationStatus: 'NEEDS_REVERIFY', reason: 'Published prose is not evidence for itself and must be mapped back to sources.' },
  { sourceFile: 'src/content-v3/research/*', oldFieldFamily: 'research claims', migrationStatus: 'NEEDS_REVERIFY', reason: 'Research notes may seed review but must pass the new schema and source rules.' },
];
