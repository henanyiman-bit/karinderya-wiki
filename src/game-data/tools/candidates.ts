import type { AdvisorRule, ToolCandidate } from '../schema/tool.ts';

export const toolCandidates: ToolCandidate[] = [
  { id: 'recipe-finder', name: 'Recipe Finder', requiredEntityTypes: ['ingredient', 'recipe'], requiredFields: ['ingredientRelation'], requiredRelationships: ['REQUIRES', 'CREATES'], requiresFormula: false, requiresRuleSet: true, demandScore: 13, dataScore: 0, logicScore: 3, utilityScore: 17, maintenanceScore: 8 },
  { id: 'ingredient-finder', name: 'Ingredient Finder', requiredEntityTypes: ['ingredient', 'recipe'], requiredFields: ['recipeRelation'], requiredRelationships: ['USED_IN'], requiresFormula: false, requiresRuleSet: true, demandScore: 10, dataScore: 1, logicScore: 3, utilityScore: 10, maintenanceScore: 10 },
  { id: 'bottleneck-advisor', name: 'Bottleneck Advisor', requiredEntityTypes: ['equipment', 'worker', 'furniture'], requiredFields: ['capacity'], requiredRelationships: ['USED_WITH'], requiresFormula: false, requiresRuleSet: true, demandScore: 18, dataScore: 3, logicScore: 4, utilityScore: 17, maintenanceScore: 12 },
  { id: 'equipment-comparison', name: 'Equipment Comparison', requiredEntityTypes: ['equipment'], requiredFields: ['cost', 'capacity'], requiresFormula: false, requiresRuleSet: false, demandScore: 17, dataScore: 3, logicScore: 13, utilityScore: 18, maintenanceScore: 14 },
  { id: 'stove-comparison', name: 'Stove Comparison', requiredEntityTypes: ['equipment'], requiredFields: ['cost', 'capacity', 'cookingTime'], requiresFormula: false, requiresRuleSet: false, demandScore: 11, dataScore: 0, logicScore: 12, utilityScore: 13, maintenanceScore: 10 },
  { id: 'profit-calculator', name: 'Profit Calculator', requiredEntityTypes: ['dish', 'ingredient', 'recipe'], requiredFields: ['cost', 'cookingTime'], requiredRelationships: ['REQUIRES', 'CREATES'], requiresFormula: true, requiresRuleSet: true, demandScore: 18, dataScore: 0, logicScore: 0, utilityScore: 18, maintenanceScore: 8 },
  { id: 'upgrade-roi', name: 'Upgrade ROI', requiredEntityTypes: ['equipment', 'upgrade'], requiredFields: ['cost', 'capacity', 'cookingTime'], requiredRelationships: ['UPGRADES_TO'], requiresFormula: true, requiresRuleSet: true, demandScore: 16, dataScore: 0, logicScore: 0, utilityScore: 16, maintenanceScore: 6 },
  { id: 'upgrade-planner', name: 'Upgrade Planner', requiredEntityTypes: ['equipment', 'furniture', 'upgrade'], requiredFields: ['cost', 'effect'], requiredRelationships: ['UPGRADES_TO'], requiresFormula: false, requiresRuleSet: true, demandScore: 14, dataScore: 0, logicScore: 2, utilityScore: 15, maintenanceScore: 8 },
  { id: 'restaurant-planner', name: 'Restaurant Planner', requiredEntityTypes: ['equipment', 'furniture', 'worker'], requiredFields: ['capacity', 'slots'], requiredRelationships: ['USED_WITH'], requiresFormula: false, requiresRuleSet: true, demandScore: 17, dataScore: 1, logicScore: 2, utilityScore: 17, maintenanceScore: 8 },
  { id: 'layout-planner', name: 'Layout Planner', requiredEntityTypes: ['equipment', 'furniture'], requiredFields: ['capacity', 'slots'], requiredRelationships: ['USED_WITH'], requiresFormula: false, requiresRuleSet: true, demandScore: 12, dataScore: 0, logicScore: 2, utilityScore: 14, maintenanceScore: 8 },
  { id: 'code-checker', name: 'Code Checker', requiredEntityTypes: [], requiredFields: [], requiresFormula: false, requiresRuleSet: true, demandScore: 12, dataScore: 0, logicScore: 1, utilityScore: 8, maintenanceScore: 2 },
  { id: 'progress-checklist', name: 'Progress Checklist', requiredEntityTypes: ['upgrade'], requiredFields: ['unlockRequirement'], requiredRelationships: ['UPGRADES_TO'], requiresFormula: false, requiresRuleSet: true, demandScore: 9, dataScore: 0, logicScore: 1, utilityScore: 11, maintenanceScore: 8 },
  { id: 'furniture-planner', name: 'Furniture Planner', requiredEntityTypes: ['furniture'], requiredFields: ['capacity', 'slots'], requiredRelationships: ['USED_WITH'], requiresFormula: false, requiresRuleSet: true, demandScore: 9, dataScore: 0, logicScore: 1, utilityScore: 10, maintenanceScore: 8 },
  { id: 'worker-planner', name: 'Worker Planner', requiredEntityTypes: ['worker'], requiredFields: ['capacity', 'effect'], requiredRelationships: ['SERVED_BY'], requiresFormula: false, requiresRuleSet: true, demandScore: 9, dataScore: 0, logicScore: 1, utilityScore: 10, maintenanceScore: 8 },
];

// No rule is executable until its observable signals and recommendation are verified.
export const advisorRules: AdvisorRule[] = [
  {
    id: 'possible-kitchen-bottleneck',
    conditions: [
      { signal: 'pendingOrders', operator: 'GREATER_THAN', expectedValue: 0 },
      { signal: 'emptySeats', operator: 'GREATER_THAN', expectedValue: 0 },
    ],
    resultType: 'KITCHEN',
    recommendation: 'Review the kitchen workflow before changing other restaurant areas.',
    status: 'UNKNOWN',
    sourceIds: [],
  },
];

export const profitCalculatorRequiredData = [
  'dishRevenue', 'ingredientCost', 'ingredientQuantity', 'yield',
  'cookingTime', 'modifierRules', 'revenueFormula', 'profitFormula',
] as const;

export const upgradeRoiRequiredData = [
  'currentEquipmentCost', 'targetEquipmentCost', 'throughputDifference',
  'timeDifference', 'capacityDifference', 'revenueImpact', 'paybackFormula', 'modifierRules',
] as const;
