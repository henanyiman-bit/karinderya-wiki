export type GameSystemId =
  | 'menu-unlock-system'
  | 'stove-upgrade-system'
  | 'furniture-upgrade-system';

export interface GameSystem {
  id: GameSystemId;
  name: string;
  summary: string;
  sourceIds: string[];
  status: 'PARTIAL';
}

export type ObservationConfidence = 'OBSERVED_VERIFIED' | 'PARTIALLY_OBSERVED';

export interface SystemObservation {
  id: string;
  systemId: GameSystemId;
  statement: string;
  confidence: ObservationConfidence;
  sourceIds: string[];
  versionScope: string;
  observedAt: string;
  scope: 'DATED_UI_OBSERVATION';
  numericValue?: number;
  unit?: string;
  notes?: string;
}
