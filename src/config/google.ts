const clean = (value: string | undefined) => value?.trim() ?? '';

const adsenseClientId = clean(import.meta.env.PUBLIC_ADSENSE_CLIENT_ID);

export const adsenseSlots = Object.freeze({
  top: clean(import.meta.env.PUBLIC_ADSENSE_SLOT_TOP),
  'content-1': clean(import.meta.env.PUBLIC_ADSENSE_SLOT_CONTENT_1),
  'content-2': clean(import.meta.env.PUBLIC_ADSENSE_SLOT_CONTENT_2),
  bottom: clean(import.meta.env.PUBLIC_ADSENSE_SLOT_BOTTOM),
  'desktop-sidebar': clean(import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR),
});

export type AdPlacement = keyof typeof adsenseSlots;

const hasConfiguredAdSlot = Object.values(adsenseSlots).some(Boolean);
const gaMeasurementId = clean(import.meta.env.PUBLIC_GA_MEASUREMENT_ID);
const siteVerification = clean(import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION);

export const googleIntegrations = Object.freeze({
  adsense: Object.freeze({
    clientId: adsenseClientId,
    enabled: Boolean(adsenseClientId && hasConfiguredAdSlot),
  }),
  analytics: Object.freeze({
    measurementId: gaMeasurementId,
    enabled: Boolean(gaMeasurementId),
  }),
  searchConsole: Object.freeze({
    verificationToken: siteVerification,
    enabled: Boolean(siteVerification),
  }),
});
