import type { ImageMetadata } from 'astro';

export interface PhotoEntry {
  /** Filename inside `src/assets/photos/`, e.g. "quiet-morning.jpg". */
  file: string;
  /** Shown in the gallery + lightbox. */
  title: string;
  /** ISO date (YYYY-MM-DD). Used for sorting (newest first) and display. */
  date: string;
  /** Describe the image for screen readers and SEO. */
  alt: string;
  /** Optional place the photo was taken. */
  location?: string;
}

export interface Photo extends Omit<PhotoEntry, 'file'> {
  src: ImageMetadata;
}

/**
 * Add a photo:
 *   1. Drop the file into `src/assets/photos/`
 *   2. Add an entry below (newest first is applied automatically)
 */
export const photoEntries: PhotoEntry[] = [
  {
    file: '08.08.26_(06.51.28).jpg',
    title: 'Summer\'s palace',
    date: '2026-08-08',
    alt: 'View over Kunming Lake at midday',
    location: 'Beijing, China',
  },
  {
    file: '08.08.26_(09.23.05).jpg',
    title: 'Sneak Peek',
    date: '2026-08-08',
    alt: 'Peeking through window shades at Jade Peak Pagoda in the distance',
    location: 'Beijing, China',
  },
  {
    file: '08.08.26_(09.35.32).jpg',
    title: 'Fancy rooftops',
    date: '2026-08-08',
    alt: 'Rooftops Composition',
    location: 'Beijing, China',
  },
  {
    file: '09.08.26_(08.01.49).jpg',
    title: 'Great Wall',
    date: '2026-08-09',
    alt: 'A gate at the Great Wall',
    location: 'Beijing, China',
  },
  {
    file: '09.08.26_(08.14.26).jpg',
    title: 'B&W landscape',
    date: '2026-08-14',
    alt: 'b&w landscape of mountain ridge',
    location: 'Beijing, China',
  },
  {
    file: '15.07.26_(11.34.42).jpg',
    title: 'Prague Street Shot',
    date: '2026-07-15',
    alt: 'A shot of a street view in Prague, Lesser Town',
    location: 'Prague, Czech Republic',
  },
  {
    file: '15.07.26_(11.35.08).jpg',
    title: 'Marijuana Pub',
    date: '2026-07-15',
    alt: 'Pub with Marijuana writing at the storefront',
    location: 'Prague, Czech Republic',
  },
  {
    file: '15.07.26_(14.13.50).jpg',
    title: 'Prague Castle in the distance',
    date: '2026-07-15',
    alt: 'Shot from Lesser Town looking up at Prague Castle in the distance',
    location: 'Prague, Czech Republic',
  },
  {
    file: '16.07.26_(12.48.32).jpg',
    title: 'Golden Light inside St. Vitus Cathedral',
    date: '2026-07-16',
    alt: 'Golden Light shining through the glass panels at high altar inside St. Vitus Cathedral',
    location: 'Prague, Czech Republic',
  },
  {
    file: '23.07.26_(19.27.20).jpg',
    title: 'Davos Cityscape',
    date: '2026-07-23',
    alt: 'A sunset over Davos Town',
    location: 'Davos, Switzerland',
  },
];

// Eagerly import every image in the photos folder so Astro can optimise them.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

function resolveImage(file: string): ImageMetadata {
  const key = Object.keys(images).find((path) => path.endsWith(`/${file}`));
  if (!key) {
    throw new Error(
      `Photo "${file}" was listed in src/data/photos.ts but not found in src/assets/photos/.`,
    );
  }
  return images[key]!.default;
}

/** All photos, newest first. */
export const photos: Photo[] = photoEntries
  .map(({ file, ...meta }) => ({ ...meta, src: resolveImage(file) }))
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
