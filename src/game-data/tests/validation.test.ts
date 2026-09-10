import type { GameEntity } from '../schema/entity.ts';
import type { GameSource } from '../schema/source.ts';
import { evaluateToolEligibility } from '../selectors/tool-eligibility.ts';
import { evaluateDatabaseReadiness } from '../selectors/database-readiness.ts';
import { validateEntities } from '../validators/entity-validator.ts';
import { validateRelationships } from '../validators/relationship-validator.ts';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { allCaptureTasks } from '../evidence/capture-queue.ts';
import { calculateCaptureImpact } from '../evidence/impact.ts';
import { validateCaptureTasks, validateFieldStatusHistory, validateReviewedEvidence } from '../evidence/capture-validator.ts';
import { applyFieldUpgrade, applyRelationshipUpgrade, approveEvidence, createManualEvidenceSource, reviewEvidence } from '../evidence/evidence-review.ts';

const source: GameSource = {
  id: 'test-source', title: 'Test source', sourceTier: 'DIRECT_GAMEPLAY',
  url: 'https://example.com/evidence', accessedAt: '2026-09-09',
};

const validEntity = (): GameEntity => ({
  id: 'rice', slug: 'rice', name: 'Rice', entityType: 'ingredient', categoryId: 'ingredients',
  canonicalPageId: 'ingredient-rice', canonicalUrl: '/ingredients/rice/', status: 'PARTIAL',
  fields: { category: { value: 'ingredients', status: 'PARTIAL', sourceIds: ['test-source'], notes: 'Test evidence is partial.' } },
});

const expectError = (entities: GameEntity[], code: string) => {
  const issues = validateEntities(entities, [source], [{ id: 'test-version', label: 'Test version' }]);
  if (!issues.some((issue) => issue.severity === 'ERROR' && issue.code === code)) throw new Error(`Expected ${code}.`);
};

export const runValidationTests = () => {
  if (validateEntities([validEntity()], [source], []).some((issue) => issue.severity === 'ERROR')) throw new Error('Valid schema test failed.');
  expectError([validEntity(), validEntity()], 'DUPLICATE_ENTITY_ID');
  const missingSource = validEntity();
  missingSource.fields.category = { value: 'ingredients', status: 'VERIFIED', sourceIds: ['missing'] };
  expectError([missingSource], 'UNKNOWN_SOURCE');
  const unknown = validEntity();
  unknown.status = 'UNKNOWN';
  unknown.fields.category = { status: 'UNKNOWN', sourceIds: [] };
  if (validateEntities([unknown], [source], []).some((issue) => issue.severity === 'ERROR')) throw new Error('UNKNOWN without value should be valid.');
  const disputed = validEntity();
  disputed.status = 'DISPUTED';
  disputed.fields.category = { value: 'ingredients', status: 'DISPUTED', sourceIds: ['test-source', 'test-source-2'], notes: 'Sources conflict.' };
  const source2 = { ...source, id: 'test-source-2' };
  if (validateEntities([disputed], [source, source2], []).some((issue) => issue.severity === 'ERROR')) throw new Error('Valid DISPUTED field should pass.');
  const collision = { ...validEntity(), id: 'rice-two', slug: 'rice-two' };
  expectError([validEntity(), collision], 'CANONICAL_COLLISION');
  const evaluation = evaluateToolEligibility({
    id: 'high-score-low-data', name: 'High score, low data', requiredEntityTypes: ['ingredient'],
    requiredFields: [], requiresFormula: false, requiresRuleSet: false,
    demandScore: 20, dataScore: 11, logicScore: 20, utilityScore: 20, maintenanceScore: 20,
  }, [validEntity()], []);
  if (evaluation.totalScore <= 80 || evaluation.eligibility === 'PUBLIC_READY') throw new Error('Data-score gate test failed.');

  const partialWithoutSource = validEntity();
  partialWithoutSource.fields.category = { value: 'ingredients', status: 'PARTIAL', sourceIds: [], notes: 'Missing source.' };
  expectError([partialWithoutSource], 'PARTIAL_WITHOUT_SOURCE');

  const inconsistentEntity = validEntity();
  inconsistentEntity.status = 'CONFIRMED';
  expectError([inconsistentEntity], 'CONFIRMED_ENTITY_WITHOUT_VERIFIED_FIELD');

  const relation = { id: 'test-relation', fromEntityId: 'rice', toEntityId: 'rice-two', type: 'USED_IN' as const, status: 'PARTIAL' as const, sourceIds: [] };
  const second = { ...validEntity(), id: 'rice-two', slug: 'rice-two', canonicalPageId: 'ingredient-eggs', canonicalUrl: '/ingredients/eggs/' };
  const relationIssues = validateRelationships([relation], [validEntity(), second], [source], [{ id: 'test-version', label: 'Test' }]);
  if (!relationIssues.some((issue) => issue.code === 'RELATIONSHIP_WITHOUT_SOURCE')) throw new Error('Relationship source validation failed.');

  const badVersionRelation = { ...relation, sourceIds: ['test-source'], versionScope: 'missing-version' };
  const versionIssues = validateRelationships([badVersionRelation], [validEntity(), second], [source], [{ id: 'test-version', label: 'Test' }]);
  if (!versionIssues.some((issue) => issue.code === 'UNKNOWN_RELATIONSHIP_VERSION')) throw new Error('Relationship version validation failed.');

  const readyFixtures = Array.from({ length: 5 }, (_, index) => ({
    ...validEntity(), id: `fixture-${index}`, slug: `fixture-${index}`,
    canonicalPageId: ['ingredient-rice','ingredient-eggs','ingredient-vegetables','ingredient-bangus','ingredient-pork'][index],
    canonicalUrl: ['/ingredients/rice/','/ingredients/eggs/','/ingredients/vegetables/','/ingredients/bangus/','/ingredients/pork/'][index],
    fields: {
      category: { value: 'ingredients', status: 'VERIFIED' as const, sourceIds: ['test-source'] },
      effect: { value: 'TEST ONLY', status: 'VERIFIED' as const, sourceIds: ['test-source'] },
    },
    status: 'CONFIRMED' as const,
  }));
  const readyRelations = readyFixtures.slice(1).map((entity, index) => ({
    id: `fixture-relation-${index}`, fromEntityId: readyFixtures[0].id, toEntityId: entity.id,
    type: 'RELATED_TO' as const, status: 'VERIFIED' as const, sourceIds: ['test-source'],
  }));
  const readiness = evaluateDatabaseReadiness('TEST ONLY', ['ingredient'], readyFixtures, readyRelations);
  if (!readiness.readyForDatabaseView || readiness.dataScore < 12) throw new Error('Database readiness fixture failed.');

  const toolReady = evaluateToolEligibility({
    id: 'test-tool', name: 'TEST ONLY', requiredEntityTypes: ['ingredient'], requiredFields: ['category', 'effect'],
    requiredRelationships: ['RELATED_TO'], requiresFormula: false, requiresRuleSet: false,
    demandScore: 20, dataScore: 20, logicScore: 20, utilityScore: 20, maintenanceScore: 20,
  }, readyFixtures, readyRelations);
  if (toolReady.eligibility !== 'PUBLIC_READY') throw new Error('Tool relationship readiness fixture failed.');

  const captureIssues = validateCaptureTasks(allCaptureTasks, [
    validEntity(),
    ...['eggs','vegetables','bangus','pork','beef','condiments'].map((id) => ({ ...validEntity(), id, slug:id, canonicalPageId:`ingredient-${id}`, canonicalUrl:`/ingredients/${id}/` })),
    ...['basic-stove','standard-stove','deluxe-stove','chiller'].map((id) => ({ ...validEntity(), id, slug:id, entityType:'equipment' as const, canonicalPageId:`equipment-${id}`, canonicalUrl:`/equipment/${id}/` })),
    ...['plank-table','wood-table','red-wooden-table'].map((id) => ({ ...validEntity(), id, slug:id, entityType:'furniture' as const, canonicalPageId:`furniture-${id}`, canonicalUrl:`/furniture/${id}/` })),
  ]);
  if (captureIssues.length) throw new Error(`Capture queue validation failed: ${JSON.stringify(captureIssues)}`);
  const duplicateCapture = validateCaptureTasks([allCaptureTasks[0], allCaptureTasks[0]], [validEntity()]);
  if (!duplicateCapture.some((issue) => issue.code === 'DUPLICATE_CAPTURE_TASK_ID')) throw new Error('Capture task ID uniqueness test failed.');
  const badEntityCapture = validateCaptureTasks([{ ...allCaptureTasks[0], id:'bad-entity', entityId:'missing', candidateEntityIds:[] }], [validEntity()]);
  if (!badEntityCapture.some((issue) => issue.code === 'UNKNOWN_CAPTURE_ENTITY')) throw new Error('Capture entity validation test failed.');
  const badFieldCapture = validateCaptureTasks([{ ...allCaptureTasks[0], id:'bad-field', fieldIds:['missing-field' as never], candidateEntityIds:[] }], [validEntity()]);
  if (!badFieldCapture.some((issue) => issue.code === 'UNKNOWN_CAPTURE_FIELD')) throw new Error('Capture field validation test failed.');
  const reviewIssues = validateReviewedEvidence({ id:'review', captureTaskId:'task', reviewer:'human', reviewedAt:'2026-09-09', status:'READABLE', readableFields:['name'], candidateRelationships:[], notes:'Readable test.' });
  if (!reviewIssues.some((issue) => issue.code === 'REVIEWED_EVIDENCE_WITHOUT_SOURCE')) throw new Error('Reviewed evidence source gate test failed.');
  const historyIssues = validateFieldStatusHistory({ entityId:'rice', fieldId:'name', oldStatus:'UNKNOWN', newStatus:'VERIFIED', sourceIds:[], changedAt:'2026-09-09', reason:'Test.' });
  if (!historyIssues.some((issue) => issue.code === 'FIELD_HISTORY_WITHOUT_SOURCE')) throw new Error('Field history source test failed.');
  const readinessBeforeImpact = evaluateDatabaseReadiness('TEST ONLY', ['ingredient'], readyFixtures, readyRelations);
  calculateCaptureImpact(allCaptureTasks[0]);
  const readinessAfterImpact = evaluateDatabaseReadiness('TEST ONLY', ['ingredient'], readyFixtures, readyRelations);
  if (JSON.stringify(readinessBeforeImpact) !== JSON.stringify(readinessAfterImpact)) throw new Error('Evidence impact changed actual readiness.');

  const manualInput = { id:'manual-test', fileId:'internal-test-file', capturedAt:'2026-09-10', gameVersionScope:'test-version', entityId:'rice', visibleText:['Rice','Grocery'], candidateFields:['name' as const], candidateRelationships:[], reviewNotes:'TEST ONLY' };
  const readableReview = reviewEvidence(allCaptureTasks[0], manualInput, { id:'review-readable', reviewer:'human-reviewer', reviewedAt:'2026-09-10', status:'READABLE', readableFields:['name'], candidateRelationships:[], notes:'TEST ONLY readable UI.' });
  const manualSource = createManualEvidenceSource(manualInput, readableReview, 'manual-test-source', 'TEST ONLY manual evidence');
  if (manualSource.url || !manualSource.notes?.includes('internal-test-file')) throw new Error('Manual evidence source privacy test failed.');
  const approval = approveEvidence(readableReview, manualSource, 'human-approver', '2026-09-10');
  const upgraded = applyFieldUpgrade([validEntity()], approval, { entityId:'rice', fieldId:'name', value:'Rice', status:'VERIFIED', sourceIds:['manual-test-source'], versionScope:'test-version', reason:'TEST ONLY readable label.' }, '2026-09-10', new Set(['test-version']));
  if (upgraded.entities[0].fields.name?.status !== 'VERIFIED' || upgraded.fieldHistory.oldStatus !== 'UNKNOWN' || upgraded.fieldHistory.newStatus !== 'VERIFIED') throw new Error('Field upgrade/history test failed.');
  const unknownEntity = { ...validEntity(), status:'UNKNOWN' as const, fields:{ name:{ status:'UNKNOWN' as const, sourceIds:[] } } };
  const upgradedUnknown = applyFieldUpgrade([unknownEntity], approval, { entityId:'rice', fieldId:'name', value:'Rice', status:'PARTIAL', sourceIds:['manual-test-source'], versionScope:'test-version', reason:'TEST ONLY readable label.' }, '2026-09-10', new Set(['test-version']));
  if (upgradedUnknown.entities[0].status !== 'PARTIAL' || upgradedUnknown.entityHistory.length !== 1) throw new Error('Entity upgrade/history test failed.');
  const appliedRelations = applyRelationshipUpgrade([], approval, { relationship:{ id:'manual-test-relation', fromEntityId:'rice', toEntityId:'rice-two', type:'USED_IN', status:'PARTIAL', sourceIds:['manual-test-source'], versionScope:'test-version' }, reason:'TEST ONLY relationship.' });
  if (appliedRelations.length !== 1) throw new Error('Relationship upgrade test failed.');
  let approvalRejected = false;
  try { approveEvidence({ ...readableReview, status:'UNREADABLE' }, manualSource, 'human', '2026-09-10'); } catch { approvalRejected = true; }
  if (!approvalRejected) throw new Error('Approval gate test failed.');
  let versionRejected = false;
  try { applyFieldUpgrade([validEntity()], approval, { entityId:'rice', fieldId:'name', value:'Rice', status:'VERIFIED', sourceIds:['manual-test-source'], versionScope:'missing-version', reason:'TEST ONLY.' }, '2026-09-10', new Set(['test-version'])); } catch { versionRejected = true; }
  if (!versionRejected) throw new Error('Evidence version gate test failed.');

  const srcRoot = join(process.cwd(), 'src');
  const walk = (directory: string): string[] => readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
  const productionImports = walk(srcRoot)
    .filter((path) => !relative(srcRoot, path).replaceAll('\\', '/').startsWith('game-data/'))
    .filter((path) => /game-data/.test(readFileSync(path, 'utf8')));
  if (productionImports.length > 0) throw new Error(`Production imports game-data: ${productionImports.join(', ')}`);
};
