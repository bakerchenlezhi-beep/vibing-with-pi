// @ts-check
import { defineConfig } from 'astro/config';

/**
 * GitHub Pages configuration.
 *
 * When deploying with GitHub Actions the `GITHUB_REPOSITORY` env var is set
 * automatically ("owner/repo"), so the correct `site` and `base` are derived
 * for you. For a custom domain, set SITE_URL and BASE_PATH (see README).
 *
 *   - User/organisation page  (owner.github.io)          -> base "/"
 *   - Project page            (owner.github.io/repo)     -> base "/repo"
 */
const repository = process.env.GITHUB_REPOSITORY; // "owner/repo"
const [owner, repo] = repository?.split('/') ?? [];
const isUserPage = repo?.toLowerCase().endsWith('.github.io');

const base = process.env.BASE_PATH ?? (repository && !isUserPage ? `/${repo}` : '/');
const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : undefined);

// https://astro.build/config
export default defineConfig({
  site,
  base,
  build: {
    format: 'directory',
  },
});
