export interface ResponsiveImageAsset {
  alt: string;
  fallback: string;
  width: number;
  height: number;
  webp: Array<{
    src: string;
    width: number;
  }>;
}

const portraitHero = (folder: string, filename: string, alt: string): ResponsiveImageAsset => ({
  alt,
  fallback: `/images/${folder}/${filename}.png`,
  width: 1122,
  height: 1402,
  webp: [
    { src: `/images/${folder}/${filename}-480.webp`, width: 480 },
    { src: `/images/${folder}/${filename}-768.webp`, width: 768 },
    { src: `/images/${folder}/${filename}.webp`, width: 1122 },
  ],
});

const entityPortrait = (folder: string, filename: string, alt: string): ResponsiveImageAsset => ({
  alt,
  fallback: `/images/${folder}/${filename}.png`,
  width: 1086,
  height: 1448,
  webp: [
    { src: `/images/${folder}/${filename}-480.webp`, width: 480 },
    { src: `/images/${folder}/${filename}-768.webp`, width: 768 },
    { src: `/images/${folder}/${filename}.webp`, width: 1086 },
  ],
});

export const siteImages = {
  homeHero: {
    alt: 'Karinderya restaurant counter with dishes and wiki guide signage',
    fallback: '/images/site/home-hero.png',
    width: 1672,
    height: 941,
    webp: [
      { src: '/images/site/home-hero-640.webp', width: 640 },
      { src: '/images/site/home-hero-1024.webp', width: 1024 },
      { src: '/images/site/home-hero.webp', width: 1672 },
    ],
  },
  codesHero: portraitHero('codes', 'codes-hero', 'Karinderya character presenting the codes and rewards guide'),
  workersHero: portraitHero('workers', 'workers-hero', 'Karinderya restaurant workers gathered behind the counter'),
  ingredientsHero: portraitHero('ingredients', 'ingredients-hero', 'Karinderya character surrounded by documented cooking ingredients'),
  foodHero: portraitHero('food', 'food-recipes-hero', 'Karinderya food and recipe dishes displayed around a restaurant counter'),
  equipmentHero: portraitHero('equipment', 'equipment-hero', 'Karinderya kitchen equipment and cooking stations'),
  furnitureHero: portraitHero('furniture', 'furniture-hero', 'Karinderya restaurant furniture and dining area'),
  decorationsHero: portraitHero('decorations', 'decorations-hero', 'Decorated Karinderya restaurant interior with plants and counters'),
  beginnerGuideHero: portraitHero('guides', 'beginner-guide-hero', 'Karinderya beginner guide scene with a restaurant character and task boards'),
  updatesHero: portraitHero('updates', 'updates-hero', 'Karinderya update board displayed beside prepared dishes'),
} satisfies Record<string, ResponsiveImageAsset>;

export const entityImages = {
  rice: entityPortrait('ingredients', 'rice', 'Rice ingredient entry for Karinderya'),
  condiments: entityPortrait('ingredients', 'condiments', 'Condiments ingredient entry for Karinderya'),
  eggs: entityPortrait('ingredients', 'eggs', 'Eggs ingredient entry for Karinderya'),
  vegetables: entityPortrait('ingredients', 'vegetables', 'Vegetables ingredient entry for Karinderya'),
  bangus: entityPortrait('ingredients', 'bangus', 'Bangus ingredient entry for Karinderya'),
  pork: entityPortrait('ingredients', 'pork', 'Pork ingredient entry for Karinderya'),
  beef: entityPortrait('ingredients', 'beef', 'Beef ingredient entry for Karinderya'),
  basicStove: entityPortrait('equipment', 'basic-stove', 'Basic Stove equipment entry for Karinderya'),
  standardStove: entityPortrait('equipment', 'standard-stove', 'Standard Stove equipment entry for Karinderya'),
  deluxeStove: entityPortrait('equipment', 'deluxe-stove', 'Deluxe Stove equipment entry for Karinderya'),
} satisfies Record<string, ResponsiveImageAsset>;
