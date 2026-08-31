# Google integration setup

Google integrations are disabled when their environment variables are empty. Copy `.env.example` to an ignored environment file for local configuration, or set the same variables in the production hosting environment.

## Public and private configuration

Every `PUBLIC_*` value can be exposed in generated HTML or browser JavaScript. Use this prefix only for public identifiers such as an AdSense publisher ID, ad slot ID, GA4 Measurement ID, or Search Console verification token.

Private API credentials must remain server-side, use non-`PUBLIC_` names, never be embedded in HTML or returned to browser JavaScript, and never be committed to GitHub. Possible future names include:

```dotenv
GAME_DATA_API_KEY=
PRIVATE_API_TOKEN=
```

These private examples are documentation only; no external API is currently implemented.

## Connect Google AdSense

1. Obtain the approved publisher ID and, for manual units, the Google-provided slot IDs.
2. Set `PUBLIC_ADSENSE_CLIENT_ID` and the applicable `PUBLIC_ADSENSE_SLOT_*` variables.
3. Review privacy and consent requirements for every target region before enabling ads, especially the EEA and UK where applicable.
4. Deploy and confirm that the AdSense library is loaded once and configured units render without layout problems.
5. After approval, publish the exact Google-provided `ads.txt` record at `https://karinderya.ymmyi.wiki/ads.txt`.

Do not create an `ads.txt` record until Google supplies the real publisher information.

## Enable Google Analytics 4

1. Obtain the GA4 Measurement ID.
2. Review privacy, consent, and retention requirements for the target regions.
3. Set `PUBLIC_GA_MEASUREMENT_ID` in the deployment environment.
4. Deploy and verify collection using Google Analytics diagnostics or Realtime reporting.

Analytics is not enabled by default.

## Verify Google Search Console

1. Obtain the HTML meta verification token.
2. Set `PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Deploy and complete ownership verification in Search Console.
4. Submit `https://karinderya.ymmyi.wiki/sitemap.xml`.

## Consent readiness TODO

Before enabling AdSense or Analytics for real visitors, review the current Google policies and applicable privacy/consent law for the target regions. Add a functioning consent solution only when it is actually required and connected to the configured services; do not add a cosmetic cookie banner that does nothing.
