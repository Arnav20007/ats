import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemap = await readFile(path.join(root, 'public/sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const key = 'c7b39f4e81a24d5b912e731408cf51ad';
const payload = {
  host: 'atscheck.tech',
  key,
  keyLocation: `https://atscheck.tech/${key}.txt`,
  urlList: urls
};

console.log(`Submitting ${urls.length} URLs to IndexNow...`);
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });
  console.log(`IndexNow response status: ${res.status} ${res.statusText}`);
  if (res.status === 200 || res.status === 202) {
    console.log('Successfully submitted all URLs to IndexNow (Bing, Copilot, Yandex, Seznam)!');
  } else {
    const text = await res.text();
    console.log('Response body:', text);
  }
} catch (err) {
  console.error('Failed to submit to IndexNow:', err);
}
