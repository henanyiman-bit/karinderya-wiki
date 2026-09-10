import type { GameSource } from '../schema/source.ts';
import type { GameSystem, SystemObservation } from '../schema/system.ts';
import type { ValidationIssue } from '../schema/validation.ts';
import type { GameVersion } from '../schema/version.ts';

export const validateSystems = (
  systems: GameSystem[],
  observations: SystemObservation[],
  sources: GameSource[],
  versions: GameVersion[],
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const systemIds = new Set(systems.map((item) => item.id));
  const sourceIds = new Set(sources.map((item) => item.id));
  const versionIds = new Set(versions.map((item) => item.id));
  const observationIds = new Set<string>();

  for (const system of systems) {
    if (system.sourceIds.length === 0) issues.push({ severity:'ERROR', code:'SYSTEM_WITHOUT_SOURCE', message:`${system.id} has no source.`, recordId:system.id });
    for (const sourceId of system.sourceIds) if (!sourceIds.has(sourceId)) issues.push({ severity:'ERROR', code:'SYSTEM_UNKNOWN_SOURCE', message:`${system.id} references unknown source ${sourceId}.`, recordId:system.id });
  }

  for (const observation of observations) {
    if (observationIds.has(observation.id)) issues.push({ severity:'ERROR', code:'DUPLICATE_OBSERVATION', message:`Duplicate observation ${observation.id}.`, recordId:observation.id });
    observationIds.add(observation.id);
    if (!systemIds.has(observation.systemId)) issues.push({ severity:'ERROR', code:'OBSERVATION_UNKNOWN_SYSTEM', message:`${observation.id} references unknown system ${observation.systemId}.`, recordId:observation.id });
    if (!versionIds.has(observation.versionScope)) issues.push({ severity:'ERROR', code:'OBSERVATION_UNKNOWN_VERSION', message:`${observation.id} references unknown version ${observation.versionScope}.`, recordId:observation.id });
    if (observation.sourceIds.length === 0) issues.push({ severity:'ERROR', code:'OBSERVATION_WITHOUT_SOURCE', message:`${observation.id} has no source.`, recordId:observation.id });
    for (const sourceId of observation.sourceIds) if (!sourceIds.has(sourceId)) issues.push({ severity:'ERROR', code:'OBSERVATION_UNKNOWN_SOURCE', message:`${observation.id} references unknown source ${sourceId}.`, recordId:observation.id });
  }

  return issues;
};
