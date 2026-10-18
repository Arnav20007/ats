import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const vite = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error'
});
const load = (id) => vite.ssrLoadModule(id);
const [{ extractTextFromPdfFile, parseResumeText }, { analyzeAtsKeywords }, { generateDeepAuditReport }, { createContactMailto, createContactCopyText }, { BLANK_STARTER_RESUME }, { default: App }, { renderToString }, { createElement }] = await Promise.all([
  load('/src/utils/pdfParser.ts'),
  load('/src/utils/atsKeywordMatcher.ts'),
  load('/src/utils/deepAuditAnalyzer.ts'),
  load('/src/utils/contactDraft.ts'),
  load('/src/data/resumeSamples.ts'),
  load('/src/App.tsx'),
  import('react-dom/server'),
  import('react')
]);

after(async () => vite.close());

test('static route render includes real page content for each indexable route', () => {
  const routes = [
    ['/', 'Resume Checker'], ['/guide', 'Prepare a Clear Résumé for Applicant Tracking Systems'],
    ['/about', 'About ToolForge'], ['/contact', 'Contact &amp; Support'],
    ['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use'],
    ['/unknown-route', 'Page not found']
  ];
  for (const [path, heading] of routes) {
    const html = renderToString(createElement(App, { initialPath: path }));
    assert.match(html, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `${path} should render ${heading}`);
  }
});

test('plain-text file import keeps provided text and reports an empty file as scanned', async () => {
  const content = 'Alex Rivera\nSoftware Engineer\nReact and TypeScript';
  const result = await extractTextFromPdfFile(new File([content], 'resume.txt', { type: 'text/plain' }));
  assert.equal(result.text, content);
  assert.equal(result.isScanned, false);
  assert.equal(result.pageCount, 1);

  const empty = await extractTextFromPdfFile(new File(['  '], 'empty.txt', { type: 'text/plain' }));
  assert.equal(empty.isScanned, true);
});

test('resume parsing does not invent work history, education, or dates', () => {
  const parsed = parseResumeText('Alex Rivera\nSoftware Engineer\nReact, TypeScript, Node.js');
  assert.equal(parsed.fullName, 'Alex Rivera');
  assert.equal(parsed.jobTitle, 'Software Engineer');
  assert.equal('experience' in parsed, false);
  assert.equal('education' in parsed, false);
  assert.equal('dates' in parsed, false);
});

test('keyword matching returns an empty scope when a job description has no recognized terms', () => {
  const result = analyzeAtsKeywords('A collaborative role with meaningful opportunities.', {
    fullName: '', jobTitle: '', summary: '', skills: [], experienceBullets: []
  });
  assert.equal(result.totalJdKeywords, 0);
  assert.equal(result.matchedKeywords.length, 0);
  assert.equal(result.matchRate, 0);
});

test('audit report preserves unavailable checks as null or explicitly not assessed', () => {
  const report = generateDeepAuditReport({ ...BLANK_STARTER_RESUME, experience: [], education: [], skills: [] }, '');
  assert.equal(report.categories.discrimination.score, null);
  assert.equal(report.categories.seniority.score, null);
  assert.equal(report.categories.seniority.scopeOwnership.ownershipLevel, 'Not assessed');
  assert.equal(report.categories.tailoring.matchedCount + report.categories.tailoring.missingCount, 0);
});

test('contact draft preserves entered details and safely encodes mailto parameters', () => {
  const input = { name: 'A & B', email: 'alex@example.com', subject: 'Bug', message: 'Line one & line two' };
  const url = createContactMailto(input);
  assert.ok(url.startsWith('mailto:hello@toolforge.app?'));
  assert.ok(url.includes(encodeURIComponent('[ToolForge Bug] from A & B')));
  assert.ok(url.includes(encodeURIComponent('Line one & line two')));
  assert.match(createContactCopyText(input), /alex@example\.com/);
  assert.match(createContactCopyText(input), /Line one & line two/);
});
