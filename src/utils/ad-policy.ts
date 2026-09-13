export const MAX_ADS_PER_PAGE = 3 as const;
export const MAX_HOMEPAGE_ADS = 2 as const;

export type AdCount = 0 | 1 | 2 | 3;

export function normalizeAdCount(value: number | undefined, fallback: AdCount): AdCount {
  if (value === undefined) return fallback;
  if (!Number.isInteger(value) || value < 0 || value > MAX_ADS_PER_PAGE) {
    throw new Error(`Ad count must be an integer between 0 and ${MAX_ADS_PER_PAGE}.`);
  }
  return value as AdCount;
}
