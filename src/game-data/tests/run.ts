import { gameEntities } from '../entities/index.ts';
import { entityRelationships } from '../relationships/index.ts';
import { createGameDataAudit } from '../reports/audit.ts';
import { gameSources } from '../sources/index.ts';
import { toolCandidates } from '../tools/candidates.ts';
import { validateGameData } from '../validators/index.ts';
import { gameVersions } from '../versions/index.ts';
import { gameSystems, systemObservations } from '../systems/index.ts';
import { runValidationTests } from './validation.test.ts';

runValidationTests();
const validation = validateGameData({
  entities: gameEntities,
  sources: gameSources,
  versions: gameVersions,
  relationships: entityRelationships,
  tools: toolCandidates,
  systems: gameSystems,
  observations: systemObservations,
});

console.log(JSON.stringify({ validation, audit: createGameDataAudit(gameEntities, gameSources, entityRelationships, toolCandidates) }, null, 2));
