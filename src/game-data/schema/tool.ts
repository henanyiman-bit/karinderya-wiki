import type { EntityType, VerificationStatus } from './common.ts';
import type { RelationshipType } from './relationship.ts';

export interface ToolCandidate {
  id: string;
  name: string;
  requiredEntityTypes: EntityType[];
  requiredFields: string[];
  requiredRelationships?: RelationshipType[];
  requiresFormula: boolean;
  requiresRuleSet: boolean;
  demandScore: number;
  dataScore: number;
  logicScore: number;
  utilityScore: number;
  maintenanceScore: number;
}
export type ToolEligibility = 'PUBLIC_READY' | 'PROTOTYPE' | 'HOLD' | 'REJECT';

export interface ToolEvaluation {
  toolId: string;
  totalScore: number;
  eligibility: ToolEligibility;
  reasons: string[];
}

export type AdvisorResultType = 'KITCHEN' | 'SEATING' | 'SERVICE' | 'CAPACITY' | 'BALANCED';

export interface AdvisorCondition {
  signal: string;
  operator: 'IS' | 'IS_NOT' | 'GREATER_THAN' | 'LESS_THAN';
  expectedValue: string | number | boolean;
}

export interface AdvisorRule {
  id: string;
  conditions: AdvisorCondition[];
  resultType: AdvisorResultType;
  recommendation: string;
  status: Extract<VerificationStatus, 'VERIFIED' | 'PARTIAL' | 'UNKNOWN'>;
  sourceIds: string[];
  versionScope?: string;
}
