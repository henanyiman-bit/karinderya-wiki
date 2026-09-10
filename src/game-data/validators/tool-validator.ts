import type { ToolCandidate } from '../schema/tool.ts';
import type { ValidationIssue } from '../schema/validation.ts';

const scoreKeys = ['demandScore', 'dataScore', 'logicScore', 'utilityScore', 'maintenanceScore'] as const;

export const validateToolCandidates = (tools: ToolCandidate[]): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  for (const tool of tools) {
    if (ids.has(tool.id)) issues.push({ severity: 'ERROR', code: 'DUPLICATE_TOOL_ID', message: `Duplicate tool ID: ${tool.id}`, recordId: tool.id });
    ids.add(tool.id);
    for (const key of scoreKeys) if (tool[key] < 0 || tool[key] > 20) issues.push({ severity: 'ERROR', code: 'INVALID_TOOL_SCORE', message: `${tool.id}.${key} must be between 0 and 20.`, recordId: tool.id });
  }
  return issues;
};
