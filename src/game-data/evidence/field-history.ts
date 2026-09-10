import type { EntityStatusHistory, FieldStatusHistory } from './capture-types.ts';

export const fieldStatusHistory: FieldStatusHistory[] = [
  {
    entityId: 'rice', fieldId: 'cost', oldStatus: 'UNKNOWN', newStatus: 'PARTIAL',
    sourceIds: ['public-gameplay-grocery-ui-2026-08-24'], changedAt: '2026-09-10',
    reason: 'Readable dated public gameplay UI shows 25kg Rice with a 200 Cash value.',
  },
  {
    entityId: 'condiments', fieldId: 'cost', oldStatus: 'UNKNOWN', newStatus: 'PARTIAL',
    sourceIds: ['public-gameplay-grocery-ui-2026-08-24'], changedAt: '2026-09-10',
    reason: 'Readable dated public gameplay UI shows Condiments with a 135 Cash value.',
  },
  {
    entityId: 'red-wooden-table', fieldId: 'category', oldStatus: 'UNKNOWN', newStatus: 'PARTIAL',
    sourceIds: ['public-gameplay-furniture-shop-ui-2026-09-02'], changedAt: '2026-09-10',
    reason: 'Readable dated public Furniture Shop UI places a red wooden table entry in the Tables category; translated labeling prevents a stronger name claim.',
  },
];
export const entityStatusHistory: EntityStatusHistory[] = [];

export const appendFieldHistory = (history: FieldStatusHistory[], entry: FieldStatusHistory) => [...history, entry];
export const appendEntityHistory = (history: EntityStatusHistory[], entry: EntityStatusHistory) => [...history, entry];
