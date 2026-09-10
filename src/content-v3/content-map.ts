import registryData from '../data/pageRegistry.json';
import type { V3ContentRecord } from './types';

type IntentSeed = { primaryKeyword: string; primaryIntent: string; responsibility: string; risk: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; secondary: string[] };

export const intentSeeds: Record<string, IntentSeed> = {
  home:{primaryKeyword:'Karinderya Wiki',primaryIntent:'Find a central English wiki for the Roblox game.',responsibility:'Brand portal and route to major systems.',risk:'LOW',secondary:['Karinderya Roblox wiki','Karinderya guide']},
  codes:{primaryKeyword:'Karinderya codes',primaryIntent:'Find current code strings and redemption help.',responsibility:'Time-sensitive code desk; separate official listing, redemption result and historical rewards.',risk:'CRITICAL',secondary:['Karinderya codes not working','how to redeem codes in Karinderya']},
  food:{primaryKeyword:'Karinderya food',primaryIntent:'Understand the food/menu information layer.',responsibility:'Food system and food directory; not recipe mechanics or grocery acquisition.',risk:'MEDIUM',secondary:['Karinderya food list','Karinderya menu']},
  recipes:{primaryKeyword:'Karinderya recipes',primaryIntent:'Understand recipes and discover confirmed recipe entries.',responsibility:'Recipe system and confirmed recipe directory; not generic food or ingredient acquisition.',risk:'HIGH',secondary:['Karinderya recipe guide','Karinderya cooking recipes']},
  workers:{primaryKeyword:'Karinderya workers',primaryIntent:'Understand the Worker system.',responsibility:'Worker system overview and confirmed worker categories; hiring steps belong to the guide.',risk:'HIGH',secondary:['Karinderya worker','Karinderya contracts']},
  equipment:{primaryKeyword:'Karinderya equipment',primaryIntent:'Browse restaurant equipment systems.',responsibility:'Equipment hub linking confirmed equipment directories and entities.',risk:'MEDIUM',secondary:['Karinderya equipment guide','Karinderya restaurant equipment']},
  guides:{primaryKeyword:'Karinderya guides',primaryIntent:'Browse task-focused player guides.',responsibility:'Guide directory only; individual tasks belong to guide articles.',risk:'LOW',secondary:['Karinderya guide','Karinderya gameplay guides']},
  updates:{primaryKeyword:'Karinderya updates',primaryIntent:'Find a dated update history.',responsibility:'Chronological update directory with creator-supported facts and explicit date scope.',risk:'CRITICAL',secondary:['Karinderya update','Karinderya new update']},
  about:{primaryKeyword:'Karinderya Wiki about',primaryIntent:'Understand the site and its independence.',responsibility:'Site identity and editorial scope.',risk:'LOW',secondary:['about Karinderya Wiki']},
  contact:{primaryKeyword:'contact Karinderya Wiki',primaryIntent:'Contact the independent wiki.',responsibility:'Site contact route only.',risk:'LOW',secondary:[]},
  'privacy-policy':{primaryKeyword:'Karinderya Wiki privacy policy',primaryIntent:'Read site privacy terms.',responsibility:'Privacy policy.',risk:'LOW',secondary:[]},
  terms:{primaryKeyword:'Karinderya Wiki terms',primaryIntent:'Read site terms.',responsibility:'Terms of use.',risk:'LOW',secondary:[]},
  disclaimer:{primaryKeyword:'Karinderya Wiki disclaimer',primaryIntent:'Read independence and accuracy disclaimer.',responsibility:'Site disclaimer.',risk:'LOW',secondary:[]},
  grocery:{primaryKeyword:'Karinderya grocery',primaryIntent:'Understand how ingredients are obtained or managed through Grocery.',responsibility:'Grocery acquisition/management system; not ingredient definitions or recipes.',risk:'HIGH',secondary:['Karinderya grocery guide','Karinderya ingredient shop']},
  ingredients:{primaryKeyword:'Karinderya ingredients',primaryIntent:'Browse confirmed ingredients.',responsibility:'Ingredient directory and system overview; no recipe or purchase-price duplication.',risk:'HIGH',secondary:['Karinderya ingredient list','Karinderya ingredients guide']},
  furniture:{primaryKeyword:'Karinderya furniture',primaryIntent:'Browse confirmed furniture categories.',responsibility:'Furniture hub; layouts belong to guides and exact items to entities.',risk:'HIGH',secondary:['Karinderya furniture guide','Karinderya tables and chairs']},
  'furniture-tables':{primaryKeyword:'Karinderya tables',primaryIntent:'Browse confirmed table entries.',responsibility:'Table directory only.',risk:'HIGH',secondary:['Karinderya table list']},
  'furniture-chairs':{primaryKeyword:'Karinderya chairs',primaryIntent:'Browse confirmed chair entries.',responsibility:'Chair directory only; suppress unverified family names.',risk:'HIGH',secondary:['Karinderya chair list']},
  'ingredient-rice':{primaryKeyword:'Karinderya rice',primaryIntent:'Identify Rice and its verified uses.',responsibility:'Rice entity.',risk:'HIGH',secondary:['rice in Karinderya']},
  'ingredient-condiments':{primaryKeyword:'Karinderya condiments',primaryIntent:'Identify Condiments and verified uses.',responsibility:'Condiments entity.',risk:'HIGH',secondary:['condiments in Karinderya']},
  'ingredient-eggs':{primaryKeyword:'Karinderya eggs',primaryIntent:'Identify Eggs and verified uses.',responsibility:'Eggs entity.',risk:'HIGH',secondary:['eggs in Karinderya']},
  'ingredient-vegetables':{primaryKeyword:'Karinderya vegetables',primaryIntent:'Identify Vegetables and verified uses.',responsibility:'Vegetables entity.',risk:'HIGH',secondary:['vegetables in Karinderya']},
  'ingredient-bangus':{primaryKeyword:'Karinderya bangus',primaryIntent:'Identify Bangus and verified uses.',responsibility:'Bangus entity.',risk:'HIGH',secondary:['bangus in Karinderya']},
  'ingredient-pork':{primaryKeyword:'Karinderya pork',primaryIntent:'Identify Pork and verified uses.',responsibility:'Pork entity.',risk:'HIGH',secondary:['pork in Karinderya']},
  'ingredient-beef':{primaryKeyword:'Karinderya beef',primaryIntent:'Identify Beef and verified uses.',responsibility:'Beef entity.',risk:'HIGH',secondary:['beef in Karinderya']},
  'furniture-plank-table':{primaryKeyword:'Karinderya Plank Table',primaryIntent:'Identify the Plank Table entity.',responsibility:'Plank Table entity; only verified acquisition/use facts.',risk:'HIGH',secondary:['Plank Table Karinderya']},
  'furniture-wood-table':{primaryKeyword:'Karinderya Wood Table',primaryIntent:'Identify the Wood Table entity.',responsibility:'Wood Table entity; only verified acquisition/use facts.',risk:'HIGH',secondary:['Wood Table Karinderya']},
  'furniture-red-wooden-table':{primaryKeyword:'Karinderya Red Wooden Table',primaryIntent:'Identify the Red Wooden Table entity.',responsibility:'Red Wooden Table entity; only verified acquisition/use facts.',risk:'HIGH',secondary:['Red Wooden Table Karinderya']},
  decorations:{primaryKeyword:'Karinderya decorations',primaryIntent:'Understand confirmed restaurant customization systems.',responsibility:'Decoration hub; no unverified effects, prices or item counts.',risk:'CRITICAL',secondary:['Karinderya customization','Karinderya decor']},
  'decorations-tiles':{primaryKeyword:'Karinderya tiles',primaryIntent:'Understand the confirmed Tiles feature.',responsibility:'Tiles entity/directory; no unverified catalog, price or bonus claims.',risk:'CRITICAL',secondary:['Karinderya floor tiles']},
  'equipment-stoves':{primaryKeyword:'Karinderya stoves',primaryIntent:'Browse confirmed stove entries.',responsibility:'Stove directory; entity details remain on child pages.',risk:'HIGH',secondary:['Karinderya stove list']},
  'equipment-deluxe-stove':{primaryKeyword:'Karinderya Deluxe Stove',primaryIntent:'Understand the Deluxe Stove entity.',responsibility:'Deluxe Stove facts and verified acquisition routes.',risk:'HIGH',secondary:['how to get Deluxe Stove Karinderya']},
  'equipment-basic-stove':{primaryKeyword:'Karinderya Basic Stove',primaryIntent:'Understand the Basic Stove entity.',responsibility:'Basic Stove facts.',risk:'HIGH',secondary:['Basic Stove Karinderya']},
  'equipment-standard-stove':{primaryKeyword:'Karinderya Standard Stove',primaryIntent:'Understand the Standard Stove entity.',responsibility:'Standard Stove facts.',risk:'HIGH',secondary:['Standard Stove Karinderya']},
  'equipment-chiller':{primaryKeyword:'Karinderya Chiller',primaryIntent:'Determine what the Chiller is and how it works.',responsibility:'Chiller entity; publish only creator/game-supported function and acquisition.',risk:'CRITICAL',secondary:['Chiller Karinderya','how to get Chiller Karinderya']},
  'guides-beginner-guide':{primaryKeyword:'Karinderya beginner guide',primaryIntent:'Complete the first playable restaurant loop.',responsibility:'Beginner onboarding; not detailed system databases.',risk:'MEDIUM',secondary:['how to play Karinderya','Karinderya tutorial']},
  'guides-5-star-guide':{primaryKeyword:'how to get 5 stars in Karinderya',primaryIntent:'Understand and improve restaurant rating.',responsibility:'Rating task guide only after rating mechanics are verified.',risk:'CRITICAL',secondary:['Karinderya 5 star guide','Karinderya restaurant rating']},
  'guides-co-op-guide':{primaryKeyword:'Karinderya co-op guide',primaryIntent:'Coordinate restaurant work with other players.',responsibility:'Co-op roles and coordination.',risk:'MEDIUM',secondary:['how to play Karinderya with friends']},
  'guides-cooking-and-serving':{primaryKeyword:'how to cook and serve in Karinderya',primaryIntent:'Complete the order-to-serving workflow.',responsibility:'Cooking and serving task flow; recipes remain in the recipe hub.',risk:'HIGH',secondary:['Karinderya cooking guide','Karinderya serving guide']},
  'guides-how-to-hire-workers':{primaryKeyword:'how to hire workers in Karinderya',primaryIntent:'Find and complete the worker-hiring task.',responsibility:'Hiring steps and current interface; worker system belongs to hub.',risk:'CRITICAL',secondary:['Karinderya worker location','Karinderya Manual Assign']},
  'guides-restaurant-layout':{primaryKeyword:'Karinderya restaurant layout guide',primaryIntent:'Plan a usable restaurant layout.',responsibility:'Layout principles without hidden bonus claims.',risk:'MEDIUM',secondary:['Karinderya layout','Karinderya restaurant design']},
  'guides-upgrade-priority':{primaryKeyword:'Karinderya upgrade priority',primaryIntent:'Choose the next improvement from visible bottlenecks.',responsibility:'Decision framework, not a fixed tier list.',risk:'HIGH',secondary:['what to upgrade first in Karinderya']},
  'guides-counter-upgrades':{primaryKeyword:'Karinderya counter upgrade',primaryIntent:'Understand and use the counter customization feature.',responsibility:'Counter task guide; no price, tier or effect assumptions.',risk:'CRITICAL',secondary:['Karinderya counter','how to change counter Karinderya']},
  'guides-choopy-mystery-box':{primaryKeyword:'Karinderya Choopy',primaryIntent:'Understand and use the Choopy interaction.',responsibility:'Choopy task guide with dated scope and no unsupported reward odds.',risk:'CRITICAL',secondary:['Karinderya Mystery Box','how to use Choopy Karinderya']},
  'guides-how-to-sell-furniture':{primaryKeyword:'how to sell furniture in Karinderya',primaryIntent:'Determine whether and how unwanted furniture can be sold or managed.',responsibility:'Answer capability first; never invent a sell path to preserve the URL.',risk:'CRITICAL',secondary:['can you sell furniture in Karinderya','manage furniture Karinderya']},
  'guides-shop-restock':{primaryKeyword:'Karinderya shop restock',primaryIntent:'Understand shop availability and restock behavior.',responsibility:'Restock guide using version-scoped evidence.',risk:'CRITICAL',secondary:['when does the shop restock in Karinderya']},
  'updates-decorations-part-1':{primaryKeyword:'Karinderya Decorations Part 1 update',primaryIntent:'Read the dated record of the Decorations Part 1 change.',responsibility:'Claim-by-claim historical update article.',risk:'CRITICAL',secondary:['Karinderya Decorations update','DECOPART1 update']},
};

const indexablePages = registryData.pages.filter((page) => page.indexable);
const missingSeeds = indexablePages.filter((page) => !intentSeeds[page.id]);
if (missingSeeds.length) throw new Error(`Missing V3 intent seed: ${missingSeeds.map((page) => page.id).join(', ')}`);

const batch1ApprovedPageIds = new Set([
  'codes', 'updates-decorations-part-1', 'updates', 'guides-choopy-mystery-box',
  'decorations', 'decorations-tiles', 'guides-counter-upgrades', 'furniture-chairs',
  'guides-how-to-sell-furniture', 'equipment-chiller',
  'guides-how-to-hire-workers', 'guides-shop-restock', 'guides-5-star-guide',
  'guides-cooking-and-serving', 'equipment-basic-stove', 'equipment-standard-stove',
  'equipment-deluxe-stove', 'ingredient-rice', 'ingredient-eggs', 'ingredient-vegetables',
  'ingredient-bangus', 'ingredient-pork', 'ingredient-beef', 'ingredient-condiments',
  'furniture-plank-table', 'furniture-wood-table', 'furniture-red-wooden-table',
  'guides-beginner-guide', 'guides-upgrade-priority',
  'guides-co-op-guide', 'guides-restaurant-layout', 'guides',
  'equipment-stoves', 'furniture-tables',
]);

export const v3ContentMap: V3ContentRecord[] = indexablePages.map((page) => {
  const seed = intentSeeds[page.id];
  return {
    pageId: page.id,
    primaryIntent: seed.primaryIntent,
    secondaryIntents: seed.secondary,
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: seed.secondary,
    audience: ['Karinderya Roblox players'],
    contentResponsibility: seed.responsibility,
    supportedQuestions: [],
    summary: page.seo.description,
    sections: [],
    relatedPageIds: page.parentId ? [page.parentId] : [],
    claims: [],
    status: batch1ApprovedPageIds.has(page.id) ? 'APPROVED' : 'RESEARCH',
  };
});

export const contentByPageId = new Map(v3ContentMap.map((record) => [record.pageId, record]));
