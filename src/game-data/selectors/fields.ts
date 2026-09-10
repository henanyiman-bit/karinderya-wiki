import { fieldDictionary, type FieldId, type VerifiedValue } from '../schema/field.ts';
import type { GameEntity } from '../schema/entity.ts';

export const isDisplayableValue = (field: VerifiedValue | undefined) =>
  field?.value !== undefined && ['VERIFIED', 'PARTIAL', 'DISPUTED'].includes(field.status);

export const getDisplayableFields = (entity: GameEntity) =>
  Object.entries(entity.fields)
    .filter((entry): entry is [FieldId, VerifiedValue] => isDisplayableValue(entry[1]))
    .map(([fieldId, field]) => ({ definition: fieldDictionary[fieldId], field }));
