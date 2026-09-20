export const ADSTERRA = {
  native: {
    script: 'https://harryinspectionlucy.com/8f46fc5471982f65cf6699c9c8c7f570/invoke.js',
    containerId: 'container-8f46fc5471982f65cf6699c9c8c7f570'
  },
  banners: {
    desktop: {
      key: '1cedd62e0b7e30a8b9a19134ca4b86db',
      width: 728,
      height: 90,
      script: 'https://harryinspectionlucy.com/1cedd62e0b7e30a8b9a19134ca4b86db/invoke.js'
    },
    rectangle: {
      key: '61ccf78324875a71dd5e818673cd405a',
      width: 300,
      height: 250,
      script: 'https://harryinspectionlucy.com/61ccf78324875a71dd5e818673cd405a/invoke.js'
    },
    mobile: {
      key: '8a62b62c6204f4852d7ec286320bc5a7',
      width: 320,
      height: 50,
      script: 'https://harryinspectionlucy.com/8a62b62c6204f4852d7ec286320bc5a7/invoke.js'
    }
  }
} as const;

export const AD_SLOTS = {
  'home-top': { enabled: true, type: 'responsive' },
  'home-mid': { enabled: true, type: 'native' },
  'home-bottom': { enabled: true, type: 'bottom' },
  'article-top': { enabled: true, type: 'responsive' },
  'article-toc': { enabled: true, type: 'native' },
  'article-mid': { enabled: true, type: 'native' },
  'article-bottom': { enabled: true, type: 'bottom' }
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;
