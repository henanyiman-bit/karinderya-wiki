import type { GameEntity } from '../schema/entity.ts';
import { ingredientEntities } from './ingredients.ts';
import { equipmentEntities } from './equipment.ts';
import { furnitureEntities } from './furniture.ts';
import { workerEntities } from './workers.ts';
import { dishEntities } from './dishes.ts';
import { recipeEntities } from './recipes.ts';
import { decorationEntities } from './decorations.ts';
import { upgradeEntities } from './upgrades.ts';

export const gameEntities: GameEntity[] = [
  ...ingredientEntities,
  ...equipmentEntities,
  ...furnitureEntities,
  ...workerEntities,
  ...dishEntities,
  ...recipeEntities,
  ...decorationEntities,
  ...upgradeEntities,
];
