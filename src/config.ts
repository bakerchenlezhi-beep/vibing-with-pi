/**
 * Site-wide settings. Edit these to make the site yours.
 */

/** Where contact-form fallbacks and mail links should be sent. */
const email = 'hello@example.com';

export const site = {
  /** Your name or studio name (shown in the header and hero). */
  name: 'Your Name',
  /** Browser tab / SEO title. */
  title: 'Your Name · Photography',
  /** Used for SEO + social previews. */
  description: 'A personal photography portfolio — light, land, and quiet moments.',
  /** Short line under your name on the homepage. */
  tagline: 'Photographs of light, land, and quiet moments.',
  /** Public contact address. */
  email,

  /**
   * Main navigation. `href` is a path relative to the site base
   * ('' = the home page, 'about' = /about/, etc.).
   */
  nav: [
    { label: 'Work', href: '' },
    { label: 'About', href: 'about' },
    { label: 'Contact', href: 'contact' },
  ],

  /** Links shown in the footer, alongside the copyright. */
  links: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'Email', url: `mailto:${email}` },
  ],

  /** Contact page settings. */
  contact: {
    introduction:
      "I'd love to hear from you — commissions, prints, licensing, or just a friendly hello.",
    /**
     * Optional form endpoint that accepts a POST (e.g. a free Formspree form:
     * "https://formspree.io/f/your-id"). Leave empty to fall back to opening
     * the visitor's email client with the message pre-filled.
     */
    endpoint: '',
  },
};
