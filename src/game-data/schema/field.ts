import type { EntityType, VerificationStatus } from './common.ts';

export type FieldDataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'entity-ref'
  | 'entity-ref-list';

export interface VerifiedValue<T = string | number | boolean | string[]> {
  value?: T;
  unit?: string;
  status: VerificationStatus;
  sourceIds: string[];
  versionScope?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface FieldDefinition {
  id: string;
  label: string;
  dataType: FieldDataType;
  allowedUnits?: string[];
  entityTypes: EntityType[];
  toolEligible: boolean;
}

const allEntityTypes: EntityType[] = [
  'ingredient', 'equipment', 'furniture', 'worker',
  'dish', 'recipe', 'decoration', 'upgrade',
];

export const fieldDictionary = {
  name: { id: 'name', label: 'Name', dataType: 'string', entityTypes: allEntityTypes, toolEligible: false },
  category: { id: 'category', label: 'Category', dataType: 'string', entityTypes: allEntityTypes, toolEligible: true },
  cost: { id: 'cost', label: 'Cost', dataType: 'number', allowedUnits: ['cash', 'robux'], entityTypes: ['equipment', 'furniture', 'ingredient'], toolEligible: true },
  sellValue: { id: 'sellValue', label: 'Sell Value', dataType: 'number', allowedUnits: ['cash'], entityTypes: ['equipment', 'furniture'], toolEligible: true },
  cookingTime: { id: 'cookingTime', label: 'Cooking Time', dataType: 'number', allowedUnits: ['seconds'], entityTypes: ['equipment', 'dish', 'recipe'], toolEligible: true },
  capacity: { id: 'capacity', label: 'Capacity', dataType: 'number', allowedUnits: ['items', 'orders', 'seats'], entityTypes: ['equipment', 'furniture', 'worker'], toolEligible: true },
  slots: { id: 'slots', label: 'Slots', dataType: 'number', allowedUnits: ['slots'], entityTypes: ['equipment', 'furniture'], toolEligible: true },
  effect: { id: 'effect', label: 'Effect', dataType: 'string', entityTypes: allEntityTypes, toolEligible: true },
  unlockRequirement: { id: 'unlockRequirement', label: 'Unlock Requirement', dataType: 'string', entityTypes: allEntityTypes, toolEligible: true },
  ingredientRelation: { id: 'ingredientRelation', label: 'Ingredient Relation', dataType: 'entity-ref-list', entityTypes: ['dish', 'recipe'], toolEligible: true },
  recipeRelation: { id: 'recipeRelation', label: 'Recipe Relation', dataType: 'entity-ref-list', entityTypes: ['ingredient', 'dish'], toolEligible: true },
  equipmentRelation: { id: 'equipmentRelation', label: 'Equipment Relation', dataType: 'entity-ref-list', entityTypes: ['ingredient', 'dish', 'recipe'], toolEligible: true },
  workerRelation: { id: 'workerRelation', label: 'Worker Relation', dataType: 'entity-ref-list', entityTypes: ['equipment', 'dish', 'recipe'], toolEligible: true },
  versionAvailability: { id: 'versionAvailability', label: 'Version Availability', dataType: 'string', entityTypes: allEntityTypes, toolEligible: false },
} as const satisfies Record<string, FieldDefinition>;

export type FieldId = keyof typeof fieldDictionary;
