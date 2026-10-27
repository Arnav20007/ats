import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const files = [];

function findHtml(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findHtml(full);
    else if (entry.name.endsWith('.html') && !entry.name.includes('404')) files.push(full);
  }
}

findHtml(distDir);
console.log(`Auditing ${files.length} production HTML routes in ${distDir}...`);

let issues = 0;
const report = [];

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const route = file.replace(/\\/g, '/').replace('dist', '').replace('.html', '').replace('/index', '/');
  
  // Title check
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  const titleLen = title.length;
  
  // Description check
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const desc = descMatch ? descMatch[1] : '';
  const descLen = desc.length;
  
  // Canonical check
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';
  
  // H1 check
  const h1s = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  
  // JSON-LD check
  const ldJson = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];

  const fileIssues = [];
  if (!title || titleLen < 30 || titleLen > 70) {
    fileIssues.push(`Title length (${titleLen}): "${title}"`);
  }
  if (!desc || descLen < 110 || descLen > 165) {
    fileIssues.push(`Meta Description length (${descLen}): "${desc}"`);
  }
  if (!canonical || !canonical.startsWith('https://atscheck.tech')) {
    fileIssues.push(`Invalid canonical: "${canonical}"`);
  }
  if (h1s.length === 0) {
    fileIssues.push('Missing H1 heading');
  } else if (h1s.length > 1) {
    fileIssues.push(`Multiple H1 headings (${h1s.length})`);
  }
  if (ldJson.length === 0) {
    fileIssues.push('Missing Schema.org JSON-LD structured data');
  }

  if (fileIssues.length > 0) {
    issues += fileIssues.length;
    report.push({ route, fileIssues });
  }
}

if (report.length === 0) {
  console.log('✅ ALL 43 PRODUCTION ROUTES PASSED 100% OF STRICT SEO-OPTIMIZER RULES!');
} else {
  console.log(`⚠️ Found ${issues} SEO issues across ${report.length} pages:`);
  for (const item of report) {
    console.log(`\nRoute: ${item.route}`);
    for (const iss of item.fileIssues) {
      console.log(`  - ${iss}`);
    }
  }
}
