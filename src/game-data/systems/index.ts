import type { GameSystem, SystemObservation } from '../schema/system.ts';

export const gameSystems: GameSystem[] = [
  {
    id: 'menu-unlock-system',
    name: 'Menu Unlock System',
    summary: 'Dated UI evidence shows menu sections can have enabled and unlock-progress states.',
    sourceIds: ['public-gameplay-menu-ui-2026-08-24'],
    status: 'PARTIAL',
  },
  {
    id: 'stove-upgrade-system',
    name: 'Stove Upgrade System',
    summary: 'Dated shopkeeper dialogue links stove upgrades directionally with faster cooking.',
    sourceIds: ['public-gameplay-furniture-effects-ui-2026-09-02'],
    status: 'PARTIAL',
  },
  {
    id: 'furniture-upgrade-system',
    name: 'Furniture Upgrade System',
    summary: 'Dated shopkeeper dialogue links better tables and chairs with tip and run-away chances.',
    sourceIds: ['public-gameplay-furniture-effects-ui-2026-09-02'],
    status: 'PARTIAL',
  },
];

export const systemObservations: SystemObservation[] = [
  {
    id: 'menu-silog-unlock-observation-2026-08-24',
    systemId: 'menu-unlock-system',
    statement: 'The SILOG MEALS section displays “Serve 100 customers to unlock.” with progress at 21/100.',
    confidence: 'OBSERVED_VERIFIED',
    sourceIds: ['public-gameplay-menu-ui-2026-08-24'],
    versionScope: 'observed-2026-08-24',
    observedAt: '2026-08-24',
    scope: 'DATED_UI_OBSERVATION',
    numericValue: 100,
    unit: 'customers served',
    notes: 'This verifies what the dated frame displays, not a permanent current-version rule.',
  },
  {
    id: 'stove-upgrade-direction-observation-2026-09-02',
    systemId: 'stove-upgrade-system',
    statement: 'Shopkeeper dialogue states that upgrading a stove speeds up cooking time.',
    confidence: 'OBSERVED_VERIFIED',
    sourceIds: ['public-gameplay-furniture-effects-ui-2026-09-02'],
    versionScope: 'observed-2026-09-02',
    observedAt: '2026-09-02',
    scope: 'DATED_UI_OBSERVATION',
    notes: 'Directional system evidence only; it supplies no multiplier, duration, or entity-specific value.',
  },
  {
    id: 'furniture-upgrade-direction-observation-2026-09-02',
    systemId: 'furniture-upgrade-system',
    statement: 'Shopkeeper dialogue states that better tables and chairs increase tip chance and decrease run-away chance.',
    confidence: 'OBSERVED_VERIFIED',
    sourceIds: ['public-gameplay-furniture-effects-ui-2026-09-02'],
    versionScope: 'observed-2026-09-02',
    observedAt: '2026-09-02',
    scope: 'DATED_UI_OBSERVATION',
    notes: 'System-level evidence only; it is not assigned to any specific furniture entity.',
  },
];
