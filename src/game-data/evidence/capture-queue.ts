import type { CaptureTask, VideoEvidenceTask } from './capture-types.ts';

export const captureQueue: CaptureTask[] = [
  {
    id: 'capture-grocery-full-list', priority: 'P0', entityId: 'rice',
    candidateEntityIds: ['rice','eggs','vegetables','bangus','pork','beef','condiments'], entityType: 'ingredient',
    fieldIds: ['name','category','cost','versionAvailability'], relationshipIds: [], relationshipTypes: ['OBTAINED_FROM'],
    evidenceTarget: 'Current Grocery item list in one continuous game session',
    requiredVisual: ['Open Grocery menu and capture it from top to bottom','Keep the Grocery or Shop heading visible','Capture every visible item name','Include price, pack size, and availability only when the UI shows them clearly'],
    suggestedSourceType: 'SCREENSHOT', status: 'OPEN', reviewStatus: 'UNREVIEWED',
    notes: 'Highest-impact identity capture. It may confirm entity presence and common visible fields; it cannot prove hidden restock rules.',
  },
  {
    id: 'capture-menu-recipe-list', priority: 'P0', entityId: 'rice', entityType: 'ingredient',
    candidateEntityIds: [], fieldIds: ['name','ingredientRelation','recipeRelation'], relationshipIds: [], relationshipTypes: ['USED_IN','REQUIRES','CREATES'],
    evidenceTarget: 'Current Menu or Recipe UI with recipe, requirements, and output context',
    requiredVisual: ['Open the Menu or Recipe screen','Capture the screen heading and selected entry together','Show the recipe or dish name','Show ingredient requirements and output in the same frame when possible','Capture every page from top to bottom'],
    suggestedSourceType: 'SCREENSHOT', status: 'OPEN', reviewStatus: 'UNREVIEWED',
    notes: 'A food name alone does not establish whether it is a recipe or dish.',
  },
  {
    id: 'capture-stove-common-fields', priority: 'P0', entityId: 'basic-stove',
    candidateEntityIds: ['basic-stove','standard-stove','deluxe-stove'], entityType: 'equipment',
    fieldIds: ['name','category','cost','cookingTime','capacity','slots','effect','unlockRequirement'], relationshipIds: [],
    evidenceTarget: 'At least two stoves shown in the same Shop or placement UI',
    requiredVisual: ['Open the stove Shop or placement category','Capture Basic, Standard, and Deluxe Stove entries','Keep identical field labels visible for at least two stoves','Include cost, cooking time, capacity, slots, effect, or unlock only when directly displayed'],
    suggestedSourceType: 'SCREENSHOT', status: 'OPEN', reviewStatus: 'UNREVIEWED',
  },
  {
    id: 'capture-furniture-placement', priority: 'P1', entityId: 'plank-table',
    candidateEntityIds: ['plank-table','wood-table','red-wooden-table'], entityType: 'furniture',
    fieldIds: ['name','category','versionAvailability'], relationshipIds: [],
    evidenceTarget: 'Furniture or placement UI showing exact table and chair names',
    requiredVisual: ['Open Furniture placement or Shop UI','Capture the Tables section and all readable table names','Capture the Chairs section and all readable chair names','Keep category headings visible'],
    suggestedSourceType: 'SCREENSHOT', status: 'OPEN', reviewStatus: 'UNREVIEWED',
  },
  {
    id: 'capture-chiller-ui', priority: 'P1', entityId: 'chiller', entityType: 'equipment',
    fieldIds: ['name','category','effect','versionAvailability'], relationshipIds: [],
    evidenceTarget: 'Current Chiller interaction, Shop, or placement UI',
    requiredVisual: ['Show the Chiller name','Keep the Equipment or placement context visible','Capture any function text or interaction prompt','Capture acquisition context if directly visible'],
    suggestedSourceType: 'SCREENSHOT', status: 'OPEN', reviewStatus: 'UNREVIEWED',
    notes: 'An icon or name cannot establish function by itself.',
  },
  {
    id: 'capture-worker-hire-ui', priority: 'P1', entityId: null, candidateEntityIds: [], entityType: 'worker',
    fieldIds: ['name','category','effect','versionAvailability'], relationshipIds: [],
    evidenceTarget: 'Hire, Worker list, or Contract UI showing enumerable worker names or types',
    requiredVisual: ['Open the Hire or Worker menu','Capture the menu heading and full visible list','Show Contract context when present','Capture named worker types only when clearly readable'],
    suggestedSourceType: 'SCREENSHOT', status: 'OPEN', reviewStatus: 'UNREVIEWED',
    notes: 'A generic Worker label is not enough to create a worker entity.',
  },
];

export const videoEvidenceTasks: VideoEvidenceTask[] = [
  {
    id:'capture-video-challs-grocery', priority:'P0', entityId:'rice', candidateEntityIds:['rice','eggs','vegetables','bangus','pork','beef','condiments'], entityType:'ingredient',
    fieldIds:['name','category','cost','versionAvailability'], relationshipIds:[], evidenceTarget:'Grocery UI sequence in CHALLS gameplay',
    requiredVisual:['Capture readable Grocery heading and item rows from the same version'], suggestedSourceType:'VIDEO_FRAME',
    sourceUrl:'https://www.youtube.com/watch?v=oPA7wdbRvb0', timestamp:{start:'02:24',end:'02:55'}, status:'FRAME_NEEDED', reviewStatus:'UNREVIEWED',
    targetEntity:'ingredients', targetField:'name', expectedUI:'Grocery or Shop list with readable rows', captureNeeded:true,
  },
  {
    id:'capture-video-challs-stoves', priority:'P0', entityId:'basic-stove', candidateEntityIds:['basic-stove','standard-stove','deluxe-stove'], entityType:'equipment',
    fieldIds:['name','category','cost','cookingTime','capacity','slots','effect','unlockRequirement'], relationshipIds:[], evidenceTarget:'Stove Shop or placement UI in CHALLS gameplay',
    requiredVisual:['Capture two or more stove entries with the same visible field labels'], suggestedSourceType:'VIDEO_FRAME',
    sourceUrl:'https://www.youtube.com/watch?v=oPA7wdbRvb0', timestamp:{start:'04:54',end:'05:35'}, status:'FRAME_NEEDED', reviewStatus:'UNREVIEWED',
    targetEntity:'stoves', targetField:'cost', expectedUI:'Stove list or details with common attributes', captureNeeded:true,
  },
  {
    id:'capture-video-berlian-menu', priority:'P0', entityId:'rice', entityType:'ingredient', fieldIds:['name','ingredientRelation','recipeRelation'], relationshipIds:[], relationshipTypes:['USED_IN','REQUIRES','CREATES'],
    evidenceTarget:'Menu or service UI in Berlian kecil gameplay', requiredVisual:['Capture screen heading, selected food entry, requirements, and output context'], suggestedSourceType:'VIDEO_FRAME',
    sourceUrl:'https://www.youtube.com/watch?v=C1UrKqbemlM', timestamp:{start:'01:24',end:'01:40'}, status:'FRAME_NEEDED', reviewStatus:'UNREVIEWED',
    targetEntity:'recipes', targetField:'ingredientRelation', expectedUI:'Menu, order, or recipe detail UI', captureNeeded:true,
  },
];

export const allCaptureTasks: CaptureTask[] = [...captureQueue, ...videoEvidenceTasks];
