import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seo = JSON.parse(await readFile(path.join(root, 'src/data/routeSeo.json'), 'utf8'));
const siteUrl = 'https://atscheck.tech';

const escapeXml = (unsafe) => {
  return String(unsafe)
    .replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
};

const keys = Object.keys(seo).filter((k) => k !== 'notFound');
const now = new Date().toUTCString();

const items = keys.map((key) => {
  const item = seo[key];
  const url = `${siteUrl}${item.path}`;
  return `    <item>
      <title>${escapeXml(item.heading || item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(item.description)}</description>
    </item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ATSCheck Resume Tools and Guides</title>
    <link>${siteUrl}</link>
    <description>Index of ATSCheck resume review tools, formatting guidance, and role-specific resume keyword pages. Entries are not dated articles.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

await writeFile(path.join(root, 'public/rss.xml'), rss);
console.log(`Generated public/rss.xml with ${keys.length} site-page entries.`);
