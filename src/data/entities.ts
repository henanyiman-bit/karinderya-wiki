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
    description: 'Review the publicly observed Karinderya Rice pack and price without unverified yield or recipe claims.',
    intro: 'A sourced ingredient profile for the Rice listing seen in public grocery documentation.',
    overview: 'Rice appears as a purchasable grocery ingredient and in publicly observed customer orders. This page records only the visible package and price information.',
    status: 'Community Verified',
    statusNotes: 'The 25kg label and price are supported by more than one retained public gameplay or community reference.',
    observedData: [{ label: 'Observed pack', value: '25kg' }, { label: 'Observed price', value: '₱200' }],
    known: ['A public grocery listing shows a 25kg Rice pack.', 'The retained sources show an observed price of ₱200.', 'Rice appears by name in documented customer tickets.'],
    unknown: ingredientUnknowns,
    sourceIds: ['codex-menu', 'wiki-menu', 'wiki-money'],
  },
  {
    slug: 'condiments',
    title: 'Karinderya Condiments',
    description: 'Review the publicly observed Karinderya Condiments price while pack size, yield, and restocking remain unknown.',
    intro: 'A cautious profile of the Condiments grocery listing and its evidence limits.',
    overview: 'Condiments are shown as a grocery ingredient and appear by name in two observed customer tickets. A complete recipe role is not inferred from those tickets.',
    status: 'Community Verified',
    statusNotes: 'The listing and price are supported by multiple retained public gameplay or community references.',
    observedData: [{ label: 'Observed price', value: '₱135' }, { label: 'Observed pack size', value: 'To be verified' }],
    known: ['The observed grocery price is ₱135.', 'Condiments appear by name in documented customer orders.'],
    unknown: ingredientUnknowns,
    sourceIds: ['codex-menu', 'wiki-menu', 'wiki-money'],
  },
  {
    slug: 'eggs',
    title: 'Karinderya Eggs',
    description: 'Review the community-documented Karinderya Eggs listing without inventing yields, restock times, or recipes.',
    intro: 'A source-limited ingredient profile for the reported Eggs grocery listing.',
    overview: 'Eggs appear in community grocery documentation and in one observed customer order. The retained evidence does not establish a complete dish recipe.',
    status: 'Reported',
    statusNotes: 'The exact price is repeated within one community publisher’s documentation and is not independently confirmed.',
    observedData: [{ label: 'Reported price', value: '₱120 / dozen' }],
    known: ['Community documentation lists Eggs at ₱120 per dozen.', 'Egg appears by name in one documented customer order.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-menu', 'wiki-money'],
  },
  {
    slug: 'vegetables',
    title: 'Karinderya Vegetables',
    description: 'Review the community-documented Karinderya Vegetables price and the information still requiring verification.',
    intro: 'A conservative reference for the reported Vegetables grocery listing.',
    overview: 'Vegetables are listed in retained community grocery documentation. No specific recipe, serving yield, or profit relationship is assigned here.',
    status: 'Reported',
    statusNotes: 'The exact value comes from one community publisher’s documentation and is not independently confirmed.',
    observedData: [{ label: 'Reported price', value: '₱90/kg' }],
    known: ['Community documentation lists Vegetables at ₱90 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
  {
    slug: 'bangus',
    title: 'Karinderya Bangus',
    description: 'Review the community-documented Karinderya Bangus price without unverified recipe or yield claims.',
    intro: 'A source-limited profile for the reported Bangus grocery listing.',
    overview: 'Bangus appears in retained community grocery documentation. Its exact in-game uses and output per purchase are not established by the sources used here.',
    status: 'Reported',
    statusNotes: 'The exact value is community documented but not independently confirmed.',
    observedData: [{ label: 'Reported price', value: '₱130/kg' }],
    known: ['Community documentation lists Bangus at ₱130 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
  {
    slug: 'pork',
    title: 'Karinderya Pork',
    description: 'Review the community-documented Karinderya Pork price and clearly separated unknown gameplay details.',
    intro: 'A cautious ingredient profile for the reported Pork grocery listing.',
    overview: 'Pork appears in retained community grocery documentation. Real-world culinary assumptions are not used to infer in-game recipes or profit.',
    status: 'Reported',
    statusNotes: 'The exact value is community documented but not independently confirmed.',
    observedData: [{ label: 'Reported price', value: '₱410/kg' }],
    known: ['Community documentation lists Pork at ₱410 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
  {
    slug: 'beef',
    title: 'Karinderya Beef',
    description: 'Review the community-documented Karinderya Beef price without inventing recipes, yields, or profit data.',
    intro: 'A conservative ingredient profile for the reported Beef grocery listing.',
    overview: 'Beef appears in retained community grocery documentation. The available evidence does not prove where it is used or how many servings a purchase provides.',
    status: 'Reported',
    statusNotes: 'The exact value is community documented but not independently confirmed.',
    observedData: [{ label: 'Reported price', value: '₱585/kg' }],
    known: ['Community documentation lists Beef at ₱585 per kilogram.'],
    unknown: ingredientUnknowns,
    sourceIds: ['wiki-money'],
  },
];

export const tableEntities: EntityRecord[] = [
  {
    slug: 'plank-table',
    title: 'Karinderya Plank Table',
    description: 'Review the observed Karinderya Plank Table purchase and resale prices with cautious resale interpretation.',
    intro: 'A sourced furniture profile for one publicly documented Plank Table transaction.',
    overview: 'The Plank Table is part of the documented table progression. One public example records both its purchase and resale values.',
    status: 'Reported',
    statusNotes: 'The transaction is documented by one retained community guide and is not independently confirmed.',
    observedData: [{ label: 'Observed purchase price', value: '₱130' }, { label: 'Observed resale value', value: '₱26' }, { label: 'Observed recovery', value: 'Approximately 20%' }],
    known: ['The observed purchase price is ₱130.', 'The observed resale value is ₱26.', 'For this example, ₱26 is 20% of ₱130.'],
    unknown: ['Whether the current price remains unchanged.', 'Whether every furniture item uses the same resale ratio.', 'Exact item-specific tip or customer-retention effects.'],
    sourceIds: ['wiki-furniture'],
    note: 'The 20% figure describes this observed transaction only. It is not a universal furniture resale formula.',
  },
  {
    slug: 'wood-table',
    title: 'Karinderya Wood Table',
    description: 'Review the observed Karinderya Wood Table purchase and resale prices without assuming a universal formula.',
    intro: 'A sourced furniture profile for one publicly documented Wood Table transaction.',
    overview: 'The Wood Table is part of the documented table progression. One public example records its purchase and resale values.',
    status: 'Reported',
    statusNotes: 'The transaction is documented by one retained community guide and is not independently confirmed.',
    observedData: [{ label: 'Observed purchase price', value: '₱365' }, { label: 'Observed resale value', value: '₱73' }, { label: 'Observed recovery', value: 'Approximately 20%' }],
    known: ['The observed purchase price is ₱365.', 'The observed resale value is ₱73.', 'For this example, ₱73 is 20% of ₱365.'],
    unknown: ['Whether the current price remains unchanged.', 'Whether every furniture item uses the same resale ratio.', 'Exact item-specific tip or customer-retention effects.'],
    sourceIds: ['wiki-furniture'],
    note: 'The 20% figure describes this observed transaction only. It is not a universal furniture resale formula.',
  },
  {
    slug: 'red-wooden-table',
    title: 'Karinderya Red Wooden Table',
    description: 'Review the observed Karinderya Red Wooden Table purchase price and unresolved resale information.',
    intro: 'A cautious furniture profile for the publicly documented Red Wooden Table listing.',
    overview: 'The Red Wooden Table appears in the documented furniture progression with a retained Cash-price observation.',
    status: 'Reported',
    statusNotes: 'The price appears in one retained community guide and is not independently confirmed.',
    observedData: [{ label: 'Observed purchase price', value: '₱415' }, { label: 'Observed resale value', value: 'To be verified' }],
    known: ['The observed purchase price is ₱415.', 'Red Wooden is one of the documented furniture families.'],
    unknown: ['Observed resale value.', 'Whether the current purchase price remains unchanged.', 'Exact item-specific tip or customer-retention effects.'],
    sourceIds: ['wiki-furniture'],
  },
];
