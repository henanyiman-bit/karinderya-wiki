import type { VerificationStatus } from '../components/VerificationStatus.astro';
import type { SourceId } from './sources';

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
}

const ingredientUnknowns = [
  'Exact restock timing and server-specific refresh behavior.',
  'Servings or recipe yield per purchase.',
  'Stock limits and precise recipe usage.',
  'Profit contribution for any customer order.',
];

export const ingredientEntities: EntityRecord[] = [
  {
    slug: 'rice',
    title: 'Karinderya Rice',
    description: 'Learn about the Karinderya Rice pack, its grocery price, and related customer orders.',
    intro: 'A grocery ingredient profile for Rice.',
    overview: 'Rice is a purchasable grocery ingredient that also appears in customer orders.',
    status: 'Community Verified',
    statusNotes: 'The 25kg label and price are supported by more than one retained public gameplay or community reference.',
    observedData: [{ label: 'Pack', value: '25kg' }, { label: 'Price', value: '₱200' }],
    known: ['Rice is sold as a 25kg pack.', 'The listed price is ₱200.', 'Rice appears by name in customer orders.'],
    unknown: ingredientUnknowns,
    sourceIds: ['codex-menu', 'wiki-menu', 'wiki-money'],
  },
  {
    slug: 'condiments',
    title: 'Karinderya Condiments',
    description: 'Learn about Karinderya Condiments, their grocery price, and related customer orders.',
    intro: 'A grocery ingredient profile for Condiments.',
    overview: 'Condiments are a grocery ingredient used in customer orders.',
    status: 'Community Verified',
    statusNotes: 'The listing and price are supported by multiple retained public gameplay or community references.',
    observedData: [{ label: 'Price', value: '₱135' }, { label: 'Pack size', value: 'To be verified' }],
    known: ['The grocery price is ₱135.', 'Condiments appear by name in customer orders.'],
    unknown: ingredientUnknowns,
    sourceIds: ['codex-menu', 'wiki-menu', 'wiki-money'],
  },
  {
    slug: 'eggs',
    title: 'Karinderya Eggs',
    description: 'Learn about Karinderya Eggs, their grocery price, and related customer orders.',
    intro: 'A grocery ingredient profile for Eggs.',
    overview: 'Eggs are sold at the Grocery and appear in customer orders.',
    status: 'Reported',
    statusNotes: 'The exact price is repeated within one community publisher’s documentation and is not independently confirmed.',
    observedData: [{ label: 'Price', value: '₱120 / dozen' }],
    known: ['Eggs are listed at ₱120 per dozen.', 'Egg appears by name in a customer order.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-menu', 'wiki-money'],
  },
  {
    slug: 'vegetables',
    title: 'Karinderya Vegetables',
    description: 'Learn about Karinderya Vegetables and their grocery price.',
    intro: 'A grocery ingredient profile for Vegetables.',
    overview: 'Vegetables are available as a grocery ingredient.',
    status: 'Reported',
    statusNotes: 'The exact value comes from one community publisher’s documentation and is not independently confirmed.',
    observedData: [{ label: 'Price', value: '₱90/kg' }],
    known: ['Vegetables are listed at ₱90 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
  {
    slug: 'bangus',
    title: 'Karinderya Bangus',
    description: 'Learn about Karinderya Bangus and its grocery price.',
    intro: 'A grocery ingredient profile for Bangus.',
    overview: 'Bangus is available as a grocery ingredient.',
    status: 'Reported',
    statusNotes: 'The exact value is community documented but not independently confirmed.',
    observedData: [{ label: 'Price', value: '₱130/kg' }],
    known: ['Bangus is listed at ₱130 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
  {
    slug: 'pork',
    title: 'Karinderya Pork',
    description: 'Learn about Karinderya Pork and its grocery price.',
    intro: 'A grocery ingredient profile for Pork.',
    overview: 'Pork is available as a grocery ingredient.',
    status: 'Reported',
    statusNotes: 'The exact value is community documented but not independently confirmed.',
    observedData: [{ label: 'Price', value: '₱410/kg' }],
    known: ['Pork is listed at ₱410 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
  {
    slug: 'beef',
    title: 'Karinderya Beef',
    description: 'Learn about Karinderya Beef and its grocery price.',
    intro: 'A grocery ingredient profile for Beef.',
    overview: 'Beef is available as a grocery ingredient.',
    status: 'Reported',
    statusNotes: 'The exact value is community documented but not independently confirmed.',
    observedData: [{ label: 'Price', value: '₱585/kg' }],
    known: ['Beef is listed at ₱585 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
];

export const tableEntities: EntityRecord[] = [
  {
    slug: 'plank-table',
    title: 'Karinderya Plank Table',
    description: 'Learn about the Karinderya Plank Table, including its purchase and resale values.',
    intro: 'A furniture profile for the Plank Table.',
    overview: 'The Plank Table is part of the table progression and can be purchased or resold.',
    status: 'Reported',
    statusNotes: 'The transaction is documented by one retained community guide and is not independently confirmed.',
    observedData: [{ label: 'Buy price', value: '₱130' }, { label: 'Resale value', value: '₱26' }, { label: 'Resale ratio', value: 'Approximately 20%' }],
    known: ['The purchase price is ₱130.', 'The resale value is ₱26.', 'For this table, ₱26 is 20% of ₱130.'],
    unknown: ['Whether the current price remains unchanged.', 'Whether every furniture item uses the same resale ratio.', 'Exact item-specific tip or customer-retention effects.'],
    sourceIds: ['wiki-furniture'],
    note: 'The 20% figure describes this observed transaction only. It is not a universal furniture resale formula.',
  },
  {
    slug: 'wood-table',
    title: 'Karinderya Wood Table',
    description: 'Learn about the Karinderya Wood Table, including its purchase and resale values.',
    intro: 'A furniture profile for the Wood Table.',
    overview: 'The Wood Table is part of the table progression and can be purchased or resold.',
    status: 'Reported',
    statusNotes: 'The transaction is documented by one retained community guide and is not independently confirmed.',
    observedData: [{ label: 'Buy price', value: '₱365' }, { label: 'Resale value', value: '₱73' }, { label: 'Resale ratio', value: 'Approximately 20%' }],
    known: ['The purchase price is ₱365.', 'The resale value is ₱73.', 'For this table, ₱73 is 20% of ₱365.'],
    unknown: ['Whether the current price remains unchanged.', 'Whether every furniture item uses the same resale ratio.', 'Exact item-specific tip or customer-retention effects.'],
    sourceIds: ['wiki-furniture'],
    note: 'The 20% figure describes this observed transaction only. It is not a universal furniture resale formula.',
  },
  {
    slug: 'red-wooden-table',
    title: 'Karinderya Red Wooden Table',
    description: 'Learn about the Karinderya Red Wooden Table and its place in furniture progression.',
    intro: 'A furniture profile for the Red Wooden Table.',
    overview: 'The Red Wooden Table is part of the table progression and is available for Cash.',
    status: 'Reported',
    statusNotes: 'The price appears in one retained community guide and is not independently confirmed.',
    observedData: [{ label: 'Buy price', value: '₱415' }, { label: 'Resale value', value: 'To be verified' }],
    known: ['The purchase price is ₱415.', 'Red Wooden is one of the available furniture families.'],
    unknown: ['Observed resale value.', 'Whether the current purchase price remains unchanged.', 'Exact item-specific tip or customer-retention effects.'],
    sourceIds: ['wiki-furniture'],
  },
];
