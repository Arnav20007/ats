import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seo = JSON.parse(await readFile(path.join(root, 'src/data/routeSeo.json'), 'utf8'));
const siteUrl = 'https://atscheck.tech';

const keys = Object.keys(seo).filter((k) => k !== 'notFound');
const today = new Date().toISOString().split('T')[0];

const urlEntries = keys.map((key) => {
  const item = seo[key];
  const url = `${siteUrl}${item.path}`;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

await writeFile(path.join(root, 'public/sitemap.xml'), sitemap, 'utf8');
console.log(`Generated public/sitemap.xml with ${keys.length} URLs (lastmod: ${today}).`);
