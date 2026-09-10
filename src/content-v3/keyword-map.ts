import { intentSeeds } from './content-map';
import type { KeywordRecord } from './types';
import registryData from '../data/pageRegistry.json';

const pageById = new Map(registryData.pages.map((page) => [page.id, page]));

// The first 47 records are the URL-level primary map. Evidence is INFERRED unless
// the exact query was observed in the 2026-09-09 search-result review.
const serpObserved = new Set([
  'Karinderya Wiki','Karinderya codes','Karinderya beginner guide','Karinderya workers',
  'how to hire workers in Karinderya','Karinderya equipment','Karinderya stoves',
  'Karinderya Deluxe Stove','Karinderya ingredients','Karinderya decorations',
  'Karinderya Choopy','how to sell furniture in Karinderya','Karinderya updates',
  'Karinderya shop restock','how to get 5 stars in Karinderya',
  'Karinderya co-op guide','Karinderya restaurant layout guide','Karinderya tables',
]);

export const pageKeywordMap: KeywordRecord[] = Object.entries(intentSeeds).map(([pageId, seed]) => {
  const page = pageById.get(pageId);
  if (!page) throw new Error(`Keyword map references unknown pageId: ${pageId}`);
  const source = serpObserved.has(seed.primaryKeyword) ? 'SERP_VERIFIED' : 'INFERRED';
  return {
    keyword: seed.primaryKeyword,
    normalizedKeyword: seed.primaryKeyword.toLocaleLowerCase(),
    searchIntent: seed.primaryKeyword.startsWith('how ') || seed.primaryKeyword.startsWith('what ') ? 'how-to' : page.pageType === 'entity' ? 'entity' : pageId.startsWith('updates') ? 'update' : pageId === 'home' ? 'brand' : 'informational',
    topic: page.contentKey,
    entityOrSystem: page.pageType,
    source,
    evidence: source === 'SERP_VERIFIED' ? 'A matching or near-matching query/result pattern appeared in the live web search review on 2026-09-09.' : 'Mapped from current IA and user task intent; external demand not independently established.',
    currentPageId: pageId,
    recommendedPageId: pageId,
    recommendedUrl: page.path,
    newPageRequired: false,
    serpCompetition: source === 'SERP_VERIFIED' ? 'MEDIUM' : 'UNKNOWN',
    difficulty: 'UNKNOWN',
    priority: seed.risk === 'CRITICAL' ? 'P1' : page.navigationPriority >= 70 ? 'P2' : 'P3',
    contentRequirement: seed.responsibility,
    verificationRequirement: seed.risk === 'CRITICAL' || seed.risk === 'HIGH' ? 'Claim-level source review required before production rewrite.' : 'Confirm material facts; no unsupported mechanics.',
  };
});

export const researchKeywords: KeywordRecord[] = [
  ['Karinderya codes not working','problem-solving','codes','codes','SERP_VERIFIED','/codes/','P1','Explain rejection causes without claiming current status.'],
  ['how to redeem codes in Karinderya','how-to','codes','codes','SERP_VERIFIED','/codes/','P1','Document the current redemption UI from game/creator evidence.'],
  ['Karinderya BRGYPERMIT','navigational','codes','codes','SERP_VERIFIED','/codes/','P1','Current official listing; reward requires independent evidence.'],
  ['Karinderya 100KCCU','navigational','codes','codes','SERP_VERIFIED','/codes/','P1','Current official listing; reward requires independent evidence.'],
  ['Karinderya DECOPART1','navigational','codes','codes','SERP_VERIFIED','/codes/','P1','Current official listing; community reward reports conflict.'],
  ['how to use Choopy in Karinderya','how-to','decorations','Choopy','SERP_VERIFIED','/guides/choopy-mystery-box/','P1','Needs current in-game task capture.'],
  ['where is Choopy delivery in Karinderya','problem-solving','decorations','Choopy','SERP_VERIFIED','/guides/choopy-mystery-box/','P1','Dated gameplay evidence exists; verify current UI.'],
  ['Karinderya Dishwasher','entity','equipment','Dishwasher','SERP_VERIFIED','/updates/decorations-part-1/','P2','Candidate only after official/game confirmation and enough content.'],
  ['Karinderya Table Tops','entity','decorations','Table Tops','SERP_VERIFIED','/updates/decorations-part-1/','P2','Candidate only after terminology and function are confirmed.'],
  ['can you sell furniture in Karinderya','problem-solving','furniture','sell furniture','SERP_VERIFIED','/guides/how-to-sell-furniture/','P1','Must answer capability before steps.'],
  ['Karinderya worker location','problem-solving','workers','Worker','SERP_VERIFIED','/guides/how-to-hire-workers/','P1','Version-sensitive; dated gameplay and live UI needed.'],
  ['Karinderya Manual Assign','informational','workers','Manual Assign','SERP_VERIFIED','/guides/how-to-hire-workers/','P2','Needs exact UI wording and behavior evidence.'],
  ['Karinderya restaurant rating','informational','rating','rating system','INFERRED','/guides/5-star-guide/','P2','Do not publish formulas without creator/game evidence.'],
  ['Karinderya order system','informational','orders','order system','INFERRED','/guides/cooking-and-serving/','P2','Potential new-page candidate only if SERP demand and source depth are found.'],
  ['Karinderya customer system','informational','customers','customer system','INFERRED','/guides/cooking-and-serving/','P3','Likely secondary intent until demand and mechanics are confirmed.'],
  ['Karinderya best money method','how-to','economy','profit','INFERRED','/guides/upgrade-priority/','IGNORE','Unsupported best/fastest framing; do not create a thin page.'],
  ['Karinderya fastest upgrade','how-to','upgrades','progression','INFERRED','/guides/upgrade-priority/','IGNORE','Use a decision framework, not a fixed ranking.'],
];

export const keywordMap = [...pageKeywordMap, ...researchKeywords.map(([keyword, searchIntent, topic, entityOrSystem, source, recommendedUrl, priority, contentRequirement]) => ({
  keyword, normalizedKeyword: keyword.toLowerCase(), searchIntent, topic, entityOrSystem, source,
  evidence: source === 'SERP_VERIFIED' ? 'Observed in live search results or result-page question coverage on 2026-09-09.' : 'Research seed only; demand not externally verified.',
  recommendedUrl, newPageRequired: false, serpCompetition: source === 'SERP_VERIFIED' ? 'MEDIUM' : 'UNKNOWN', difficulty:'UNKNOWN', priority,
  contentRequirement, verificationRequirement:'Confirm game existence and material mechanics before production use.',
} as KeywordRecord))];

export const externalKeywordResearchQueue = [
  'Autocomplete/PAA: Karinderya codes, workers, Choopy, decorations, chiller, recipes, furniture',
  'Google Trends: compare Karinderya codes / wiki / guide / update (no data claimed yet)',
  'Paid keyword tool: search volume, KD, CPC and clicks for every P1/P2 query',
  'YouTube search: locate dated gameplay captures for Choopy, Chiller, Furniture selling, Chairs and Counter customization',
  'Roblox/Discord: capture creator-owned patch notes and current redemption outcomes',
];
