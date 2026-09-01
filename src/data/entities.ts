import type { VerificationStatus } from '../components/VerificationStatus.astro';
import type { SourceId } from './sources';
import type { ResponsiveImageAsset } from './images';
import { entityImages } from './images';

export interface EntityRecord {
  slug: string;
  title: string;
  description: string;
  intro: string;
  overview: string;
  status: VerificationStatus;
  statusNotes: string;
  observedData: { label: string; value: string }[];
  known: string[];
  unknown: string[];
  sourceIds: SourceId[];
  note?: string;
  heroImage?: ResponsiveImageAsset;
  howToGet?: string[];
  howToUse?: string[];
  tips?: string[];
}

const ingredientUnknowns = [
  'Exact restock timing and server-specific refresh behavior.',
  'Servings or recipe yield per purchase.',
  'Stock limits and precise recipe usage.',
  'Profit contribution for any customer order.',
];

const grocerySteps = (ingredient: string) => [
  `Visit the Grocery and find ${ingredient} in the available ingredient stock.`,
  'Review the current in-game listing before completing the purchase.',
];

const ingredientTips = [
  'Use the Ingredients directory when you need to move between individual ingredient entries.',
  'Check the Recipes guide for the wider connection between ingredients and cooking.',
  'Use the Food guide to follow the restaurant workflow from preparation into service.',
];

export const ingredientEntities: EntityRecord[] = [
  {
    slug: 'rice',
    title: 'Karinderya Rice',
    description: 'Explore Rice in Karinderya and learn how this ingredient connects with grocery planning, recipes, cooking, and food service.',
    intro: 'Rice is an ingredient entry connected with the wider grocery, recipe, cooking, and food systems in Karinderya.',
    overview: 'The Rice page provides a focused starting point for understanding this ingredient without duplicating the broader Recipes or Food directories.',
    status: 'Community Verified',
    statusNotes: '',
    observedData: [{ label: 'Category', value: 'Ingredient' }],
    known: ['Rice belongs to the Ingredients directory.', 'Its wider context is covered by the Grocery, Recipes, and Food guides.'],
    unknown: [],
    sourceIds: ['codex-menu', 'wiki-menu', 'wiki-money'],
    heroImage: entityImages.rice,
    howToUse: ['Use this entry as a reference while moving between ingredient and recipe information.', 'Continue to the Recipes guide for cooking context or the Food guide for service context.'],
    tips: ingredientTips,
  },
  {
    slug: 'condiments',
    title: 'Karinderya Condiments',
    description: 'Explore Condiments in Karinderya and learn how this ingredient category connects with grocery planning, recipes, cooking, and food service.',
    intro: 'Condiments are an ingredient entry connected with the wider grocery, recipe, cooking, and food systems in Karinderya.',
    overview: 'The Condiments page provides an ingredient-focused reference while keeping broader cooking and service information in their dedicated guides.',
    status: 'Community Verified',
    statusNotes: '',
    observedData: [{ label: 'Category', value: 'Ingredient' }],
    known: ['Condiments belong to the Ingredients directory.', 'Their wider context is covered by the Grocery, Recipes, and Food guides.'],
    unknown: [],
    sourceIds: ['codex-menu', 'wiki-menu', 'wiki-money'],
    heroImage: entityImages.condiments,
    howToUse: ['Use this entry as a reference while moving between ingredient and recipe information.', 'Continue to the Recipes guide for cooking context or the Food guide for service context.'],
    tips: ingredientTips,
  },
  {
    slug: 'eggs',
    title: 'Karinderya Eggs',
    description: 'Explore Eggs in Karinderya and learn how this ingredient connects with grocery planning, recipes, cooking, and food service.',
    intro: 'Eggs are an ingredient entry connected with the wider grocery, recipe, cooking, and food systems in Karinderya.',
    overview: 'The Eggs page provides a focused ingredient reference and links into the Wiki sections that explain preparation and restaurant service.',
    status: 'Reported',
    statusNotes: '',
    observedData: [{ label: 'Category', value: 'Ingredient' }],
    known: ['Eggs belong to the Ingredients directory.', 'Their wider context is covered by the Grocery, Recipes, and Food guides.'],
    unknown: [],
    sourceIds: ['wiki-menu', 'wiki-money'],
    heroImage: entityImages.eggs,
    howToUse: ['Use this entry as a reference while moving between ingredient and recipe information.', 'Continue to the Recipes guide for cooking context or the Food guide for service context.'],
    tips: ingredientTips,
  },
  {
    slug: 'vegetables',
    title: 'Karinderya Vegetables',
    description: 'Explore Vegetables in Karinderya and learn how this ingredient category connects with grocery planning, recipes, cooking, and food service.',
    intro: 'Vegetables are an ingredient entry connected with the wider grocery, recipe, cooking, and food systems in Karinderya.',
    overview: 'The Vegetables page provides a focused ingredient reference while directing broader cooking and service questions to their category guides.',
    status: 'Reported',
    statusNotes: '',
    observedData: [{ label: 'Category', value: 'Ingredient' }],
    known: ['Vegetables belong to the Ingredients directory.', 'Their wider context is covered by the Grocery, Recipes, and Food guides.'],
    unknown: [],
    sourceIds: ['wiki-money'],
    heroImage: entityImages.vegetables,
    howToUse: ['Use this entry as a reference while moving between ingredient and recipe information.', 'Continue to the Recipes guide for cooking context or the Food guide for service context.'],
    tips: ingredientTips,
  },
  {
    slug: 'bangus',
    title: 'Karinderya Bangus',
    description: 'Explore Bangus in Karinderya and learn how this ingredient connects with grocery planning, recipes, cooking, and food service.',
    intro: 'Bangus is an ingredient entry connected with the wider grocery, recipe, cooking, and food systems in Karinderya.',
    overview: 'The Bangus page provides a focused ingredient reference and a path into the Wiki guides for recipes, food, and preparation.',
    status: 'Reported',
    statusNotes: '',
    observedData: [{ label: 'Category', value: 'Ingredient' }],
    known: ['Bangus belongs to the Ingredients directory.', 'Its wider context is covered by the Grocery, Recipes, and Food guides.'],
    unknown: [],
    sourceIds: ['wiki-money'],
    heroImage: entityImages.bangus,
    howToUse: ['Use this entry as a reference while moving between ingredient and recipe information.', 'Continue to the Recipes guide for cooking context or the Food guide for service context.'],
    tips: ingredientTips,
  },
  {
    slug: 'pork',
    title: 'Karinderya Pork',
    description: 'Explore Pork in Karinderya and learn how this ingredient connects with grocery planning, recipes, cooking, and food service.',
    intro: 'Pork is an ingredient entry connected with the wider grocery, recipe, cooking, and food systems in Karinderya.',
    overview: 'The Pork page provides a focused ingredient reference and connects readers with the Wiki sections for recipes and restaurant service.',
    status: 'Reported',
    statusNotes: '',
    observedData: [{ label: 'Category', value: 'Ingredient' }],
    known: ['Pork belongs to the Ingredients directory.', 'Its wider context is covered by the Grocery, Recipes, and Food guides.'],
    unknown: [],
    sourceIds: ['wiki-money'],
    heroImage: entityImages.pork,
    howToUse: ['Use this entry as a reference while moving between ingredient and recipe information.', 'Continue to the Recipes guide for cooking context or the Food guide for service context.'],
    tips: ingredientTips,
  },
  {
    slug: 'beef',
    title: 'Karinderya Beef',
    description: 'Explore Beef in Karinderya and learn how this ingredient connects with grocery planning, recipes, cooking, and food service.',
    intro: 'Beef is an ingredient entry connected with the wider grocery, recipe, cooking, and food systems in Karinderya.',
    overview: 'The Beef page provides a focused ingredient reference and links into the broader cooking and restaurant workflow guides.',
    status: 'Reported',
    statusNotes: '',
    observedData: [{ label: 'Category', value: 'Ingredient' }],
    known: ['Beef belongs to the Ingredients directory.', 'Its wider context is covered by the Grocery, Recipes, and Food guides.'],
    unknown: [],
    sourceIds: ['wiki-money'],
    heroImage: entityImages.beef,
    howToUse: ['Use this entry as a reference while moving between ingredient and recipe information.', 'Continue to the Recipes guide for cooking context or the Food guide for service context.'],
    tips: ingredientTips,
  },
];

export const tableEntities: EntityRecord[] = [
  {
    slug: 'plank-table',
    title: 'Karinderya Plank Table',
    description: 'Learn how the Karinderya Plank Table fits into the Tables directory, dining area, and restaurant layout.',
    intro: 'A table entry for organizing the Karinderya dining area.',
    overview: 'The Plank Table is a Furniture entry in the Tables directory and can be used as part of the restaurant dining area.',
    status: 'Reported',
    statusNotes: 'The entity name is retained in the Furniture directory.',
    observedData: [{ label: 'Category', value: 'Table' }, { label: 'Area', value: 'Dining area' }],
    known: ['Plank Table belongs to the Tables category.', 'It is used as part of the restaurant dining area.'],
    unknown: [],
    sourceIds: ['wiki-furniture'],
    howToUse: ['Use the Plank Table as part of a clearly defined dining area.', 'Position it with the surrounding customer space and regular movement paths in mind.'],
    tips: ['Keep dining and work areas easy to distinguish.', 'Observe how the surrounding space is used after adjusting the table arrangement.'],
  },
  {
    slug: 'wood-table',
    title: 'Karinderya Wood Table',
    description: 'Learn how the Karinderya Wood Table fits into the Tables directory, dining area, and restaurant layout.',
    intro: 'A table entry for organizing the Karinderya dining area.',
    overview: 'The Wood Table is a Furniture entry in the Tables directory and can be used as part of the restaurant dining area.',
    status: 'Reported',
    statusNotes: 'The entity name is retained in the Furniture directory.',
    observedData: [{ label: 'Category', value: 'Table' }, { label: 'Area', value: 'Dining area' }],
    known: ['Wood Table belongs to the Tables category.', 'It is used as part of the restaurant dining area.'],
    unknown: [],
    sourceIds: ['wiki-furniture'],
    howToUse: ['Use the Wood Table as part of a clearly defined dining area.', 'Position it with the surrounding customer space and regular movement paths in mind.'],
    tips: ['Plan table placement alongside the rest of the dining-area layout.', 'Observe how the surrounding space is used after adjusting the table arrangement.'],
  },
  {
    slug: 'red-wooden-table',
    title: 'Karinderya Red Wooden Table',
    description: 'Learn how the Karinderya Red Wooden Table fits into the Tables directory, dining area, and restaurant layout.',
    intro: 'A table entry for organizing the Karinderya dining area.',
    overview: 'The Red Wooden Table is a Furniture entry in the Tables directory and can be used as part of the restaurant dining area.',
    status: 'Reported',
    statusNotes: 'The entity name is retained in the Furniture directory.',
    observedData: [{ label: 'Category', value: 'Table' }, { label: 'Area', value: 'Dining area' }],
    known: ['Red Wooden Table belongs to the Tables category.', 'It is used as part of the restaurant dining area.'],
    unknown: [],
    sourceIds: ['wiki-furniture'],
    howToUse: ['Use the Red Wooden Table as part of a clearly defined dining area.', 'Position it with the surrounding customer space and regular movement paths in mind.'],
    tips: ['Keep table placement connected with the wider dining-area plan.', 'Observe how the surrounding space is used after adjusting the table arrangement.'],
  },
];
