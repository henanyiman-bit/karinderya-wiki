export const researchFreeze = {
  frozenAt: '2026-09-10',
  databaseState: 'RESEARCH_FROZEN_NOT_READY',
  toolState: 'RESEARCH_FROZEN_NOT_READY',
  reason: 'Current public evidence does not support a production database or tool without lowering verification thresholds.',
  reactivationTrigger: 'NEW_HIGH_VALUE_EVIDENCE',
  acceptedTriggers: [
    'New official game update or announcement',
    'New clear gameplay UI',
    'Menu and ingredients visible together',
    'At least two stoves with shared comparable fields',
    'A complete Grocery list',
    'New high-quality Tier 1 or Tier 2 evidence',
  ],
} as const;
