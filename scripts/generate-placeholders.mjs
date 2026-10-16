/**
 * Generates placeholder photos so the site runs before you add your own.
 * Run with: npm run placeholders
 * Safe to delete this file once you have real photographs.
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'src', 'assets', 'photos');
await mkdir(outDir, { recursive: true });

const placeholders = [
  { file: 'quiet-morning.jpg', w: 1600, h: 1067, from: '#dfe7ef', to: '#7f9bb8', label: 'Quiet Morning' },
  { file: 'coastal-fog.jpg', w: 1067, h: 1600, from: '#cfd8dd', to: '#7d8e99', label: 'Coastal Fog' },
  { file: 'desert-light.jpg', w: 1600, h: 1067, from: '#f4d3a7', to: '#c67b45', label: 'Desert Light' },
  { file: 'city-reflections.jpg', w: 1200, h: 1200, from: '#c9d3e6', to: '#5a6b91', label: 'City Reflections' },
  { file: 'alpine-dusk.jpg', w: 1600, h: 1067, from: '#f2c4c8', to: '#8a6b9c', label: 'Alpine Dusk' },
  { file: 'still-water.jpg', w: 1600, h: 1200, from: '#d7e6e2', to: '#6f9c97', label: 'Still Water' },
  { file: 'golden-fields.jpg', w: 1067, h: 1600, from: '#f6e0a8', to: '#c8913f', label: 'Golden Fields' },
  { file: 'midnight-street.jpg', w: 1600, h: 1067, from: '#3b3f59', to: '#12131f', label: 'Midnight Street' },
  { file: 'pine-ridge.jpg', w: 1067, h: 1600, from: '#c3d2c4', to: '#4f6e5a', label: 'Pine Ridge' },
  { file: 'harbor-blue.jpg', w: 1600, h: 1067, from: '#a9c9e0', to: '#2f5d84', label: 'Harbor Blue' },
];

for (const p of placeholders) {
  const fontSize = Math.round(Math.min(p.w, p.h) / 12);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${p.w}" height="${p.h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p.from}"/>
        <stop offset="1" stop-color="${p.to}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" fill="rgba(255,255,255,0.9)"
      font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}"
      font-weight="600" letter-spacing="2" text-anchor="middle" dominant-baseline="middle">
      ${p.label}
    </text>
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(join(outDir, p.file));
  console.log(`created ${p.file} (${p.w}x${p.h})`);
}

// Portrait placeholder for the About page.
const pw = 1100;
const ph = 1400;
const portraitSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}">
  <defs>
    <linearGradient id="p" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e3e6ea"/>
      <stop offset="1" stop-color="#9aa4b0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#p)"/>
  <circle cx="550" cy="560" r="210" fill="rgba(255,255,255,0.55)"/>
  <path d="M180 1400c0-230 166-380 370-380s370 150 370 380z" fill="rgba(255,255,255,0.55)"/>
  <text x="50%" y="1320" fill="rgba(40,45,55,0.65)" font-family="Helvetica, Arial, sans-serif"
    font-size="52" font-weight="600" letter-spacing="6" text-anchor="middle">PORTRAIT</text>
</svg>`;

await sharp(Buffer.from(portraitSvg)).jpeg({ quality: 82 }).toFile(
  join(here, '..', 'src', 'assets', 'portrait.jpg'),
);
console.log('created ../src/assets/portrait.jpg (About page)');

console.log(`\nDone — ${placeholders.length} placeholders written to src/assets/photos/`);
