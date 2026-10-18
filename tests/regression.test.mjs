import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { deflateRawSync } from 'node:zlib';

const vite = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error'
});
const load = (id) => vite.ssrLoadModule(id);
const [{ prepareResumeImport }, { analyzeAtsKeywords }, { generateDeepAuditReport }, { createContactMailto, createContactCopyText }, { BLANK_STARTER_RESUME }, { extractTextFromPdfFile }, { default: App }, { renderToString }, { createElement }] = await Promise.all([
  load('/src/utils/resumeImport.ts'),
  load('/src/utils/atsKeywordMatcher.ts'),
  load('/src/utils/deepAuditAnalyzer.ts'),
  load('/src/utils/contactDraft.ts'),
  load('/src/data/resumeSamples.ts'),
  load('/src/utils/pdfParser.ts'),
  load('/src/App.tsx'),
  import('react-dom/server'),
  import('react')
]);

after(async () => vite.close());

function makeMinimalPdf(lines) {
  const escaped = lines.map((line) => `(${line.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')}) Tj`).join(' 0 -18 Td ');
  const stream = `BT /F1 12 Tf 72 720 Td ${escaped} ET`;
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const [index, body] of objects.entries()) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function makePdfWithoutPageText() {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>',
    '<< /Title (Alex Rivera Software Engineer alex@example.com React Python Experience Education Skills) >>'
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const [index, body] of objects.entries()) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 4 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function makeMinimalDocx(xml) {
  const name = Buffer.from('word/document.xml');
  const data = deflateRawSync(Buffer.from(xml));
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(8, 8);
  local.writeUInt32LE(data.length, 18);
  local.writeUInt32LE(Buffer.byteLength(xml), 22);
  local.writeUInt16LE(name.length, 26);
  const localEntry = Buffer.concat([local, name, data]);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(8, 10);
  central.writeUInt32LE(data.length, 20);
  central.writeUInt32LE(Buffer.byteLength(xml), 24);
  central.writeUInt16LE(name.length, 28);
  const centralEntry = Buffer.concat([central, name]);

  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(1, 8);
  end.writeUInt16LE(1, 10);
  end.writeUInt32LE(centralEntry.length, 12);
  end.writeUInt32LE(localEntry.length, 16);
  return Buffer.concat([localEntry, centralEntry, end]);
}

test('static route render includes real page content for each indexable route', () => {
  const routes = [
    ['/', 'Resume Checker'], ['/guide', 'Prepare a Clear Résumé for Applicant Tracking Systems'],
    ['/about', 'About ToolForge'], ['/contact', 'Contact &amp; Support'],
    ['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use'],
    ['/keywords', 'Top ATS Keywords for Software Engineers'],
    ['/keywords/product-manager', 'Essential ATS Keywords for Product Managers'],
    ['/unknown-route', 'Page not found']
  ];
  for (const [path, heading] of routes) {
    const html = renderToString(createElement(App, { initialPath: path }));
    assert.match(html, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `${path} should render ${heading}`);
    assert.match(html, /<h1\b/, `${path} should have a primary heading`);
    assert.match(html, /<button type="button" aria-label="ToolForge home"/, 'brand navigation should be keyboard-operable');
    if (path === '/contact') {
      assert.match(html, /<label for="contact-email"/, 'contact email field should have a visible label');
      assert.match(html, /<input id="contact-email" type="email" required=""/, 'contact email should use native required email validation');
      assert.match(html, /<label for="contact-message"/, 'contact message field should have a visible label');
      assert.match(html, /<textarea id="contact-message" required=""/, 'contact message should be required');
    }
  }
});

test('plain-text import runs extraction and maps only explicitly supported resume details', async () => {
  const content = 'Alex Rivera\nSoftware Engineer\nalex@example.com\nSkills\nReact and TypeScript\nExperience\n• Built a dashboard used by 40 teams';
  const result = await prepareResumeImport(new File([content], 'resume.txt', { type: 'text/plain' }));
  assert.equal(result.extracted.text, content);
  assert.equal(result.extracted.isScanned, false);
  assert.equal(result.extracted.pageCount, 1);
  assert.equal(result.resume.fullName, 'Alex Rivera');
  assert.equal(result.resume.jobTitle, 'Software Engineer');
  assert.equal(result.resume.email, 'alex@example.com');
  assert.equal(result.resume.experience.length, 1);
  assert.equal(result.resume.experience[0].bullets[0], 'Built a dashboard used by 40 teams');
  assert.equal(result.resume.experience[0].role, '');
  assert.equal(result.resume.experience[0].startDate, '');
  assert.equal(result.resume.education.length, 0);

  const degree = await prepareResumeImport(new File([
    'Alex Rivera\nSoftware Engineer\nBachelor of Science in Computer Science\nExample University\n2022'
  ], 'degree.txt', { type: 'text/plain' }));
  assert.equal(degree.resume.education.length, 1);
  assert.equal(degree.resume.education[0].degree, 'Bachelor of Science in Computer Science');

  const empty = await prepareResumeImport(new File(['  '], 'empty.txt', { type: 'text/plain' }));
  assert.equal(empty.extracted.isScanned, true);
  assert.equal(empty.resume, null);
});

test('PDF and DOCX imports extract text and preserve supported resume fields', async () => {
  const pdf = makeMinimalPdf([
    'Jordan Rivera', 'Software Engineer', 'jordan@example.com',
    'Built dependable data services for product teams'
  ]);
  const pdfResult = await prepareResumeImport(new File([pdf], 'resume.pdf', { type: 'application/pdf' }));
  assert.match(pdfResult.extracted.text, /Jordan Rivera/);
  assert.equal(pdfResult.resume.fullName, 'Jordan Rivera');
  assert.equal(pdfResult.resume.email, 'jordan@example.com');

  const structuredPdf = makeMinimalPdf([
    'Jordan Rivera', 'Software Engineer', 'jordan@example.com', 'Skills', 'React and Python',
    'Experience', '• Built a data service used by 40 customers', 'Education',
    'Bachelor of Science in Computer Science', 'Example University', '2023'
  ]);
  const structuredResult = await prepareResumeImport(new File([structuredPdf], 'structured-resume.pdf', { type: 'application/pdf' }));
  assert.equal(structuredResult.resume?.jobTitle, 'Software Engineer');
  assert.ok(structuredResult.resume?.skills.includes('React'));
  assert.ok(structuredResult.resume?.skills.includes('Python'));
  assert.equal(structuredResult.resume?.experience[0]?.bullets[0], 'Built a data service used by 40 customers');
  assert.equal(structuredResult.resume?.education[0]?.degree, 'Bachelor of Science in Computer Science');

  const xml = '<w:document xmlns:w="urn:word"><w:body><w:p><w:r><w:t>Jordan Rivera</w:t></w:r></w:p><w:p><w:r><w:t>Software Engineer</w:t></w:r></w:p><w:p><w:r><w:t>jordan@example.com</w:t></w:r></w:p><w:p><w:r><w:t>Built dependable data services for product teams</w:t></w:r></w:p></w:body></w:document>';
  const docx = makeMinimalDocx(xml);
  const docxResult = await prepareResumeImport(new File([docx], 'resume.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
  assert.match(docxResult.extracted.text, /Jordan Rivera/);
  assert.equal(docxResult.resume.fullName, 'Jordan Rivera');
  assert.equal(docxResult.resume.email, 'jordan@example.com');
});

test('PDFs with no page text are detected as unreadable instead of parsing binary metadata', async () => {
  const file = new File([makePdfWithoutPageText()], 'image-only-resume.pdf', { type: 'application/pdf' });
  const extracted = await extractTextFromPdfFile(file);
  const prepared = await prepareResumeImport(file);

  assert.equal(extracted.text, '');
  assert.equal(extracted.isScanned, true);
  assert.equal(prepared.resume, null);
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
  assert.equal(report.categories.content.score, null, 'no detected bullets must not receive a perfect content score');
  assert.match(report.categories.content.bulletsConsistency.periodConsistency, /Not assessed/);
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
