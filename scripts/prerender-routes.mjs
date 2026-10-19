import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'dist');
const seo = JSON.parse(await readFile(path.join(root, 'src/data/routeSeo.json'), 'utf8'));
const baseHtml = await readFile(path.join(outputDir, 'index.html'), 'utf8');
const siteUrl = 'https://toolforge-ats.vercel.app';
await mkdir(outputDir, { recursive: true });
const vite = await createServer({
  configFile: path.join(root, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error'
});
let App;
try {
  ({ default: App } = await vite.ssrLoadModule('/src/App.tsx'));
  const renderPage = (pathname) => renderToString(createElement(App, { initialPath: pathname }))
    .replace(/<link rel="preload"[^>]*\/>/g, '');

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const setMeta = (html, attribute, key, value) => {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(`(<meta\\s+${attribute}="${escapedKey}"\\s+content=")[^"]*("\\s*/?>)`, 'i');
  if (!expression.test(html)) throw new Error(`Missing metadata tag: ${key}`);
  return html.replace(expression, `$1${escapeHtml(value)}$2`);
};

const pageSchema = (page) => {
  if (page.path === '/about') {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${siteUrl}/about#webpage`,
      name: page.title,
      description: page.description,
      url: `${siteUrl}/about`,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: {
        '@type': 'Person',
        name: 'Arnav Singh',
        jobTitle: 'Founder & Full Stack Software Engineer',
        url: `${siteUrl}/about`,
        sameAs: [
          'https://github.com/Arnav20007',
          'https://github.com/Arnav20007/ats'
        ]
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: page.heading, item: `${siteUrl}/about` }
        ]
      }
    };
  }

  if (page.path.startsWith('/keywords/')) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      '@id': `${siteUrl}${page.path}#webpage`,
      name: page.title,
      description: page.description,
      url: `${siteUrl}${page.path}`,
      isPartOf: { '@id': `${siteUrl}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Role Keywords', item: `${siteUrl}/keywords` },
          { '@type': 'ListItem', position: 3, name: page.heading, item: `${siteUrl}${page.path}` }
        ]
      }
    };
  }

  if (page.path === '/keywords') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/keywords#webpage`,
      name: page.title,
      description: page.description,
      url: `${siteUrl}/keywords`,
      isPartOf: { '@id': `${siteUrl}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: page.heading, item: `${siteUrl}/keywords` }
        ]
      }
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}${page.path}#webpage`,
    name: page.title,
    description: page.description,
    url: `${siteUrl}${page.path}`,
    isPartOf: { '@id': `${siteUrl}/#website` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.heading, item: `${siteUrl}${page.path}` }
      ]
    }
  };
};

const makePage = (page, bodyMarkup, isNotFound = false) => {
  const canonicalUrl = `${siteUrl}${page.path}`;
  let html = baseHtml.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, 'name', 'title', page.title);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', canonicalUrl || siteUrl);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:url', canonicalUrl || siteUrl);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/i,
    isNotFound ? '' : `<link rel="canonical" href="${canonicalUrl}" />`);
  html = setMeta(html, 'name', 'robots', isNotFound ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  if (isNotFound) {
    html = html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, '');
  } else if (page.path !== '/') {
    html = html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json" id="toolforge-route-schema">${JSON.stringify(pageSchema(page))}</script>`);
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyMarkup}</div>`);
  if (html.includes('<div id="root"></div>')) {
    throw new Error(`Generated route has no rendered root content: ${page.path || '404'}`);
  }
  return html;
};

// Top-level informational and tool pages
for (const key of ['guide', 'about', 'contact', 'privacy', 'terms', 'keywords', 'templates', 'builder', 'checker']) {
  await writeFile(path.join(outputDir, `${key}.html`), makePage(seo[key], renderPage(seo[key].path)));
}

// Role-specific programmatic keywords pages
const keywordsDir = path.join(outputDir, 'keywords');
await mkdir(keywordsDir, { recursive: true });

const roleKeys = Object.keys(seo).filter((k) => k.startsWith('keywords_'));
for (const seoKey of roleKeys) {
  const subPath = seo[seoKey].path.replace('/keywords/', '');
  const fileName = `${subPath}.html`;
  await writeFile(path.join(keywordsDir, fileName), makePage(seo[seoKey], renderPage(seo[seoKey].path)));
}

await writeFile(path.join(outputDir, 'index.html'), makePage(seo.home, renderPage('/')));
await writeFile(path.join(outputDir, '404.html'), makePage(seo.notFound, renderPage('/not-found'), true));
console.log('Generated route-specific HTML content, metadata, and 404 page for all standard & keyword routes.');
} finally {
  await vite.close();
}
