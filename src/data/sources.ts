export const RESEARCH_CHECKED_DATE = 'August 31, 2026';

export type SourceType =
  | 'Official Roblox'
  | 'Creator-owned source'
  | 'Public gameplay evidence'
  | 'Community guide'
  | 'Community Wiki'
  | 'Video evidence';

export interface SourceRecord {
  id: string;
  sourceName: string;
  sourceType: SourceType;
  url: string;
  supports: string;
  checkedDate: string;
  notes?: string;
}

export const verificationDefinitions = {
  Official: 'Directly confirmed by Roblox or a creator-owned source.',
  'Community Verified': 'Supported by multiple independent public gameplay or community sources.',
  Reported: 'Present in a public source but not independently confirmed.',
  'To be verified': 'Evidence is incomplete, conflicting, or insufficient.',
} as const;

export const sourceCatalog = {
  'roblox-game': {
    id: 'roblox-game',
    sourceName: 'Karinderya! on Roblox',
    sourceType: 'Official Roblox',
    url: 'https://www.roblox.com/games/116497287371701/Karinderya',
    supports: 'Experience identity, SILOG attribution, the five-star goal, and code strings visible in the public description.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'The public description does not establish every reward, price, formula, or update detail.',
  },
  'codex-codes': {
    id: 'codex-codes',
    sourceName: 'Karinderya Codex — Codes',
    sourceType: 'Community Wiki',
    url: 'https://karinderiacodex.com/codes/all-codes/',
    supports: 'Public redemption captures and the documented rewards for the five listed codes.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'Community evidence; code availability can change without advance notice.',
  },
  'codex-menu': {
    id: 'codex-menu',
    sourceName: 'Karinderya Codex — Menu and Recipe Unlocks',
    sourceType: 'Community Wiki',
    url: 'https://karinderiacodex.com/recipes/menu-and-unlocks/',
    supports: 'Early menu labels, the first documented unlock, grocery categories, and the limits of current recipe evidence.',
    checkedDate: RESEARCH_CHECKED_DATE,
  },
  'destructoid-codes': {
    id: 'destructoid-codes',
    sourceName: 'Destructoid — Karinderya Codes',
    sourceType: 'Community guide',
    url: 'https://www.destructoid.com/karinderya-codes/',
    supports: 'Independent community reporting for 2MVISITS and BATINATAYOHA rewards and the shared furniture portion of 3MVISITS.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'Its reported 3MVISITS Cash amount conflicts with a newer redemption capture.',
  },
  'nerdschalk-codes': {
    id: 'nerdschalk-codes',
    sourceName: 'NerdsChalk — Karinderya Codes',
    sourceType: 'Community guide',
    url: 'https://nerdschalk.com/karinderya-codes/',
    supports: 'Independent community reporting for 2MVISITS and BATINATAYOHA rewards and the shared furniture portion of 3MVISITS.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'Its reported 3MVISITS Cash amount conflicts with a newer redemption capture.',
  },
  'wiki-menu': {
    id: 'wiki-menu',
    sourceName: 'Karinderya Wiki — Menu and Dishes',
    sourceType: 'Community Wiki',
    url: 'https://karinderyawiki.com/fil/menu/all-dishes',
    supports: 'Menu-group labels, reported customer thresholds, observed order contents, and ticket values.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'Later unlock thresholds remain community documented rather than creator-confirmed.',
  },
  'wiki-furniture': {
    id: 'wiki-furniture',
    sourceName: 'Karinderya Wiki — Furniture Guide',
    sourceType: 'Community guide',
    url: 'https://karinderyawiki.com/guides/furniture-guide',
    supports: 'Furniture families, selected table prices and resale examples, shop dialogue, and stove-tier descriptions.',
    checkedDate: RESEARCH_CHECKED_DATE,
  },
  'wiki-decorations': {
    id: 'wiki-decorations',
    sourceName: 'Karinderya Wiki — Decorations Guide',
    sourceType: 'Community guide',
    url: 'https://karinderyawiki.com/guides/decorations-guide',
    supports: 'Decorations Pt. 1 features, Tile listings, counter observations, and Choopy Mystery Box details.',
    checkedDate: RESEARCH_CHECKED_DATE,
  },
  'wiki-money': {
    id: 'wiki-money',
    sourceName: 'Karinderya Wiki — Cash Guide',
    sourceType: 'Community guide',
    url: 'https://karinderyawiki.com/fil/guides/how-to-make-money',
    supports: 'Community-documented grocery prices and the relationship between supplies, orders, and Cash.',
    checkedDate: RESEARCH_CHECKED_DATE,
  },
  'worker-guide': {
    id: 'worker-guide',
    sourceName: 'Karinderya Roblox Wiki — Worker Guide',
    sourceType: 'Community Wiki',
    url: 'https://karinderya-roblox.wiki/workers',
    supports: 'The observed General Worker offer, timed-contract wording, and the Manual Assign warning.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'Does not independently establish every Worker tier or permanent contract term.',
  },
  'worker-chiller': {
    id: 'worker-chiller',
    sourceName: 'Karinderya Roblox Wiki — Worker and Chiller Watch',
    sourceType: 'Community Wiki',
    url: 'https://karinderya-roblox.wiki/updates/worker-chiller',
    supports: 'Worker and Chiller update context, observed Worker interface details, and unresolved Chiller mechanics.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'Chiller pricing and mechanics remain reported or unconfirmed.',
  },
  'deluxe-guide': {
    id: 'deluxe-guide',
    sourceName: 'Karinderya Game Wiki — Deluxe Stove Guide',
    sourceType: 'Community guide',
    url: 'https://karinderyagame.wiki/guides/how-to-get-deluxe-stove/',
    supports: 'Basic, Standard, and Deluxe tier ordering and the absence of published cook-time multipliers.',
    checkedDate: RESEARCH_CHECKED_DATE,
  },
  'beginner-guide': {
    id: 'beginner-guide',
    sourceName: 'Karinderya Wiki — Beginner Guide',
    sourceType: 'Community guide',
    url: 'https://karinderyawiki.com/guides/beginners-guide',
    supports: 'Broad first-shift systems, menu progression, furniture, stoves, supplies, and the five-star objective.',
    checkedDate: RESEARCH_CHECKED_DATE,
    notes: 'Used for general system context, not as proof of an optimal or guaranteed progression route.',
  },
} satisfies Record<string, SourceRecord>;

export type SourceId = keyof typeof sourceCatalog;

export function getSources(ids: SourceId[]): SourceRecord[] {
  return ids.map((id) => sourceCatalog[id]);
}
