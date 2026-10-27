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
      <pubDate>${now}</pubDate>
    </item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ATSCheck Career &amp; ATS Resume Checklists</title>
    <link>${siteUrl}</link>
    <description>Free in-browser ATS resume checker, role keywords, Google X-Y-Z formulas, and campus placement guides.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

await writeFile(path.join(root, 'public/rss.xml'), rss);
console.log(`Generated public/rss.xml with ${keys.length} items for fast search engine freshness indexing.`);
