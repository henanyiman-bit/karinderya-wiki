import type { EntityType } from '../schema/common.ts';
import type { GameEntity } from '../schema/entity.ts';

export const getEntityById = (entities: GameEntity[], id: string) =>
  entities.find((entity) => entity.id === id);

export const getEntitiesByType = (entities: GameEntity[], entityType: EntityType) =>
  entities.filter((entity) => entity.entityType === entityType);

export const getEntitiesByCategory = (entities: GameEntity[], categoryId: string) =>
  entities.filter((entity) => entity.categoryId === categoryId);
