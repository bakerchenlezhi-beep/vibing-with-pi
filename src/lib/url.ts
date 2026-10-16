/**
 * Helpers for working with Astro's configured `base` path so the site works
 * both at a domain root ("/") and under a sub-path ("/repo") on GitHub Pages.
 */

/** `import.meta.env.BASE_URL` without a trailing slash, e.g. "" or "/repo". */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an asset path with the base path, e.g. `withBase('favicon.svg')`. */
export function withBase(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Link to a site page with a trailing slash, e.g. `pageUrl('about')` → `/repo/about/`. */
export function pageUrl(path = ''): string {
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  return clean ? `${base}/${clean}/` : `${base}/`;
}

/** Absolute path of the site home, respecting the base path. */
export function homeUrl(): string {
  return `${base}/`;
}
