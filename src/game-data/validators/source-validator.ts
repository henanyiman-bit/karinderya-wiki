import { ISO_DATE_PATTERN } from '../schema/common.ts';
import { SOURCE_TIERS, type GameSource } from '../schema/source.ts';
import type { ValidationIssue } from '../schema/validation.ts';

export const validateSources = (sources: GameSource[]): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  for (const source of sources) {
    if (ids.has(source.id)) issues.push({ severity: 'ERROR', code: 'DUPLICATE_SOURCE_ID', message: `Duplicate source ID: ${source.id}`, recordId: source.id });
    ids.add(source.id);
    if (!SOURCE_TIERS.includes(source.sourceTier)) issues.push({ severity: 'ERROR', code: 'INVALID_SOURCE_TIER', message: `Invalid source tier for ${source.id}.`, recordId: source.id });
    if (source.accessedAt && !ISO_DATE_PATTERN.test(source.accessedAt)) issues.push({ severity: 'ERROR', code: 'INVALID_ACCESS_DATE', message: `Invalid accessedAt date for ${source.id}.`, recordId: source.id });
    if (source.url) {
      try {
        const url = new URL(source.url);
        if (url.protocol !== 'https:') throw new Error('HTTPS required');
      } catch {
        issues.push({ severity: 'ERROR', code: 'INVALID_SOURCE_URL', message: `Invalid HTTPS source URL for ${source.id}.`, recordId: source.id });
      }
    }
  }
  return issues;
};
