import type { GameEntity } from '../schema/entity.ts';
import type { EntityRelationship } from '../schema/relationship.ts';
import type { GameSource } from '../schema/source.ts';
import type { ToolCandidate } from '../schema/tool.ts';
import type { GameVersion } from '../schema/version.ts';
import { GameDataValidationError, type ValidationIssue, type ValidationResult } from '../schema/validation.ts';
import { validateEntities } from './entity-validator.ts';
import { validateRelationships } from './relationship-validator.ts';
import { validateSources } from './source-validator.ts';
import { validateToolCandidates } from './tool-validator.ts';
import type { GameSystem, SystemObservation } from '../schema/system.ts';
import { validateSystems } from './system-validator.ts';

export interface GameDataSet {
  entities: GameEntity[];
  sources: GameSource[];
  versions: GameVersion[];
  relationships: EntityRelationship[];
  tools: ToolCandidate[];
  systems?: GameSystem[];
  observations?: SystemObservation[];
}

export const validateGameData = (data: GameDataSet, throwOnError = true): ValidationResult => {
  const issues: ValidationIssue[] = [
    ...validateSources(data.sources),
    ...validateEntities(data.entities, data.sources, data.versions),
    ...validateRelationships(data.relationships, data.entities, data.sources, data.versions),
    ...validateToolCandidates(data.tools),
    ...validateSystems(data.systems ?? [], data.observations ?? [], data.sources, data.versions),
  ];
  const errors = issues.filter((issue) => issue.severity === 'ERROR');
  const warnings = issues.filter((issue) => issue.severity === 'WARNING');
  if (throwOnError && errors.length > 0) throw new GameDataValidationError(errors);
  return { valid: errors.length === 0, errors, warnings };
};
