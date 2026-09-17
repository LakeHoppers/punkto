// The apex domain (punkto.fyi, no www) always 308-redirects here — every
// other part of the app already treats www as canonical (email links,
// Terms copy), so this must match or every sitemap/canonical/OG URL we
// declare sends crawlers through an extra redirect hop before the real page.
export const SITE_URL = "https://www.punkto.fyi";
