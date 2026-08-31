/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ADSENSE_CLIENT_ID?: string;
  readonly PUBLIC_ADSENSE_SLOT_TOP?: string;
  readonly PUBLIC_ADSENSE_SLOT_CONTENT_1?: string;
  readonly PUBLIC_ADSENSE_SLOT_CONTENT_2?: string;
  readonly PUBLIC_ADSENSE_SLOT_BOTTOM?: string;
  readonly PUBLIC_ADSENSE_SLOT_SIDEBAR?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
