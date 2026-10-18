import { SKILL_DEFINITIONS, isSkillInText } from './atsKeywordMatcher';

export interface ExtractedPdfResult {
  text: string;
  isScanned: boolean;
  pageCount: number;
}

/**
 * Extracts plain text from DOCX binary by decompressing the ZIP archive and parsing 'word/document.xml'.
 * Supports both uncompressed and DEFLATE-compressed streams via native DecompressionStream.
 */
async function extractTextFromDocx(buffer: ArrayBuffer): Promise<string> {
  const MAX_DOCX_XML_BYTES = 5 * 1024 * 1024;
  try {
    const view = new DataView(buffer);
    const decoder = new TextDecoder('utf-8');

    // 1. Locate End of Central Directory (EOCD) to reliably find all zip entries
    let eocdOffset = -1;
    for (let i = buffer.byteLength - 22; i >= Math.max(0, buffer.byteLength - 65557); i--) {
      if (view.getUint32(i, true) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }

    let docXmlEntry: { offset: number; compSize: number; uncompressedSize: number; method: number } | null = null;

    if (eocdOffset !== -1) {
      const cdOffset = view.getUint32(eocdOffset + 16, true);
      const totalEntries = view.getUint16(eocdOffset + 10, true);
      let curr = cdOffset;

      for (let i = 0; i < totalEntries && curr < buffer.byteLength - 46; i++) {
        if (view.getUint32(curr, true) !== 0x02014b50) break;
        const method = view.getUint16(curr + 10, true);
        const compSize = view.getUint32(curr + 20, true);
        const uncompressedSize = view.getUint32(curr + 24, true);
        const fnLen = view.getUint16(curr + 28, true);
        const extraLen = view.getUint16(curr + 30, true);
        const commentLen = view.getUint16(curr + 32, true);
        const localHeaderOffset = view.getUint32(curr + 42, true);

        const fileNameBytes = new Uint8Array(buffer, curr + 46, fnLen);
        const fileName = decoder.decode(fileNameBytes);

        if (fileName === 'word/document.xml') {
          if (localHeaderOffset + 30 > buffer.byteLength) return '';
          const localFnLen = view.getUint16(localHeaderOffset + 26, true);
          const localExtraLen = view.getUint16(localHeaderOffset + 28, true);
          const dataOffset = localHeaderOffset + 30 + localFnLen + localExtraLen;
          docXmlEntry = { offset: dataOffset, compSize, uncompressedSize, method };
          break;
        }

        curr += 46 + fnLen + extraLen + commentLen;
      }
    }

    // 2. Fallback: Sequential scan of local file headers
    if (!docXmlEntry) {
      let offset = 0;
      while (offset < buffer.byteLength - 30) {
        if (view.getUint32(offset, true) === 0x04034b50) {
          const method = view.getUint16(offset + 8, true);
          const compSize = view.getUint32(offset + 18, true);
          const uncompressedSize = view.getUint32(offset + 22, true);
          const fnLen = view.getUint16(offset + 26, true);
          const extraLen = view.getUint16(offset + 28, true);
          const fn = decoder.decode(new Uint8Array(buffer, offset + 30, fnLen));
          const dataOffset = offset + 30 + fnLen + extraLen;
          if (fn === 'word/document.xml') {
            docXmlEntry = { offset: dataOffset, compSize, uncompressedSize, method };
            break;
          }
          offset = dataOffset + compSize;
        } else {
          offset++;
        }
      }
    }

    if (docXmlEntry) {
      if (docXmlEntry.uncompressedSize > MAX_DOCX_XML_BYTES ||
          docXmlEntry.offset < 0 || docXmlEntry.compSize < 0 ||
          docXmlEntry.offset + docXmlEntry.compSize > buffer.byteLength) return '';
      const slice = new Uint8Array(buffer, docXmlEntry.offset, docXmlEntry.compSize);
      let xmlContent = '';

      if (docXmlEntry.method === 0) {
        xmlContent = decoder.decode(slice);
      } else if (docXmlEntry.method === 8) {
        if (typeof DecompressionStream !== 'undefined') {
          const ds = new DecompressionStream('deflate-raw');
          const writer = ds.writable.getWriter();
          const writePromise = writer.write(slice).then(() => writer.close());
          const reader = ds.readable.getReader();
          const chunks: Uint8Array[] = [];
          let totalBytes = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            totalBytes += value.byteLength;
            if (totalBytes > MAX_DOCX_XML_BYTES) {
              await reader.cancel();
              throw new Error('DOCX document XML exceeds the extraction limit');
            }
            chunks.push(value);
          }
          await writePromise;
          const output = new Uint8Array(totalBytes);
          let outputOffset = 0;
          for (const chunk of chunks) {
            output.set(chunk, outputOffset);
            outputOffset += chunk.byteLength;
          }
          xmlContent = decoder.decode(output);
        }
      }

      if (xmlContent) {
        // Extract paragraph-by-paragraph text nodes to preserve spacing
        const paragraphs = xmlContent.match(/<w:p[\s>].*?<\/w:p>/gs) || [xmlContent];
        const lines: string[] = [];
        for (const p of paragraphs) {
          const textMatches = [...p.matchAll(/<w:t[^>]*>([^<]+)<\/w:t>/g)].map((m) => m[1]);
          const line = textMatches.join('').trim();
          if (line) lines.push(line);
        }
        if (lines.length > 0) {
          return lines.join('\n');
        }
      }
    }
  } catch (e) {
    console.warn('DOCX ZIP extraction error:', e);
  }
  return '';
}

/**
 * Fallback binary text extractor for PDF stream objects.
 * Guarantees instant text extraction even if PDF.js or worker fails.
 */
function extractTextFromBinaryPdf(buffer: ArrayBuffer): string {
  try {
    const bytes = new Uint8Array(buffer);
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const raw = decoder.decode(bytes);

    const textPieces: string[] = [];
    // Extract strings from Tj operators: (text) Tj
    const tjRegex = /\(([^()]{1,300})\)\s*Tj/g;
    let match;
    while ((match = tjRegex.exec(raw)) !== null) {
      const clean = match[1].replace(/\\[nrtbf\\()]/g, ' ').trim();
      if (clean.length > 1) {
        textPieces.push(clean);
      }
    }

    // Extract strings from TJ array operators: [ (text) 10 (more) ] TJ
    const tjArrayRegex = /\[([^\[\]]{1,600})\]\s*TJ/g;
    while ((match = tjArrayRegex.exec(raw)) !== null) {
      const inner = match[1];
      const strMatches = inner.match(/\(([^()]+)\)/g);
      if (strMatches) {
        const line = strMatches
          .map((s) => s.slice(1, -1).replace(/\\[nrtbf\\()]/g, ' ').trim())
          .filter(Boolean)
          .join(' ');
        if (line.length > 1) {
          textPieces.push(line);
        }
      }
    }

    if (textPieces.length > 3) {
      return textPieces.join('\n');
    }

    // Filter printable text segments
    const cleanSegments = raw.match(/[A-Za-z0-9@.,:;\-_/#+]{3,}(?:\s+[A-Za-z0-9@.,:;\-_/#+]{2,})+/g);
    if (cleanSegments && cleanSegments.length > 5) {
      return cleanSegments.slice(0, 300).join('\n');
    }
  } catch (e) {
    console.warn('Binary PDF extraction error:', e);
  }
  return '';
}

/**
 * Extracts all readable text from a binary PDF, DOCX, or TXT file client-side.
 * Limits processing time and page count, then falls back to binary parsing.
 */
export async function extractTextFromPdfFile(file: File): Promise<ExtractedPdfResult> {
  const lowerName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  // 1. Plain text or Markdown
  if (fileType.includes('text') || lowerName.endsWith('.txt') || lowerName.endsWith('.md')) {
    const raw = await file.text();
    return {
      text: raw,
      isScanned: raw.trim().length === 0,
      pageCount: 1
    };
  }

  const arrayBuffer = await file.arrayBuffer();

  // 2. DOCX Word Documents
  if (lowerName.endsWith('.docx') || fileType.includes('wordprocessingml')) {
    const docxText = await extractTextFromDocx(arrayBuffer);
    if (docxText.length > 20) {
      return {
        text: docxText,
        isScanned: false,
        pageCount: 1
      };
    }
  }

  // 3. Primary PDF.js with a bounded 10-second timeout
  try {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const parsePromise = (async () => {
      const pdf = await loadingTask.promise;
      if (pdf.numPages > 100) throw new Error('PDF exceeds the 100-page extraction limit');
      let fullText = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ');
        fullText += pageText + '\n\n';
      }

      return {
        text: fullText.trim(),
        numPages: pdf.numPages
      };
    })();

    const timeoutPromise = new Promise<{ text: string; numPages: number }>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('PDF.js parse timeout')), 10000);
    });

    let parsed: { text: string; numPages: number };
    try {
      parsed = await Promise.race([parsePromise, timeoutPromise]);
    } catch (error) {
      await loadingTask.destroy().catch(() => undefined);
      throw error;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
    const { text, numPages } = parsed;
    await loadingTask.destroy().catch(() => undefined);

    if (text.length > 20) {
      return {
        text,
        isScanned: false,
        pageCount: numPages
      };
    } else {
      // PDF has pages but no text items -> Scanned image PDF
      return {
        text: '',
        isScanned: true,
        pageCount: numPages
      };
    }
  } catch (pdfErr) {
    console.warn('PDF.js worker or timeout fallback engaged:', pdfErr);
  }

  // 4. Resilient Fallback: Binary PDF stream extraction
  const binaryText = extractTextFromBinaryPdf(arrayBuffer);
  if (binaryText.length > 20) {
    return {
      text: binaryText,
      isScanned: false,
      pageCount: 1
    };
  }

  // 5. Raw Text Decoder Fallback
  try {
    const rawFallback = await file.text();
    const clean = rawFallback.replace(/[^\x20-\x7E\n]/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean.length > 30) {
      return {
        text: clean,
        isScanned: false,
        pageCount: 1
      };
    }
  } catch {
    // Ignore fallback failure
  }

  // If literally zero text can be extracted from the file
  return {
    text: '',
    isScanned: true,
    pageCount: 1
  };
}

export interface ParsedProjectItem {
  id: string;
  name: string;
  role?: string;
  link?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface ParsedResumeFields {
  fullName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  summary?: string;
  skills?: string[];
  bullets?: string[];
  experienceBullets?: string[];
  projects?: ParsedProjectItem[];
  education?: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    year: string;
  }>;
}

/**
 * Heuristically parses structured fields from extracted text using safe word boundaries.
 */
export function parseResumeText(rawText: string): ParsedResumeFields {
  const result: ParsedResumeFields = {};
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length > 0) {
    // 1. Candidate Full Name: first line with realistic name structure
    const candidateName = lines.find((l) =>
      l.length > 2 &&
      l.length < 35 &&
      !l.includes('@') &&
      !l.includes('http') &&
      !/(?:resume|curriculum|vitae|page|github|linkedin|phone|email)/i.test(l)
    );
    if (candidateName) {
      result.fullName = candidateName;
    }

    // 2. Candidate Job Title
    const titleRegex = /(?:software engineer|full stack|frontend|backend|devops|cloud|data scientist|machine learning|ai engineer|product manager|tech lead|engineering manager|system architect|security engineer|developer|consultant|analyst|qa engineer)/i;
    const candidateTitle = lines.slice(0, 10).find((l) =>
      l !== candidateName &&
      titleRegex.test(l) &&
      l.length < 60 &&
      !l.includes('@')
    );
    if (candidateTitle) {
      result.jobTitle = candidateTitle;
    }
  }

  // 3. Email extraction
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.email = emailMatch[0];
  }

  // 4. Phone extraction
  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    result.phone = phoneMatch[0];
  }

  // 5. Location extraction
  const locMatch = rawText.match(/\b([A-Z][a-zA-Z\s]+,\s*(?:[A-Z]{2}|[A-Z][a-zA-Z\s]+))\b/);
  if (locMatch && !locMatch[1].toLowerCase().includes('university') && !locMatch[1].toLowerCase().includes('college')) {
    result.location = locMatch[1].trim();
  }

  // 6. LinkedIn & Portfolio
  const linkedinMatch = rawText.match(/(?:linkedin\.com\/in\/[\w-]+|linkedin\.com\/[\w-]+)/i);
  if (linkedinMatch) {
    result.linkedin = linkedinMatch[0];
  }
  const portfolioMatch = rawText.match(/(?:github\.com\/[\w-]+|[\w-]+\.(?:dev|io|me|tech))\b/i);
  if (portfolioMatch) {
    result.portfolio = portfolioMatch[0];
  }

  // 7. Professional Summary / Profile paragraph
  let foundSummary = '';
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^(?:summary|professional summary|profile|about me|executive summary|objective)\b/i.test(l)) {
      const nextLines = lines.slice(i + 1, i + 4).filter(
        (nl) => !/^(?:experience|skills|education|work|employment|projects)\b/i.test(nl) && nl.length > 20
      );
      if (nextLines.length > 0) {
        foundSummary = nextLines.join(' ');
        break;
      }
    }
  }
  if (!foundSummary) {
    // If no header, find the first substantive narrative paragraph (>70 chars) in the top 15 lines
    const earlyParagraph = lines.slice(0, 15).find((l) =>
      l.length > 70 &&
      !l.startsWith('•') &&
      !l.startsWith('-') &&
      !l.includes('@') &&
      !/^(?:experience|skills|education)\b/i.test(l)
    );
    if (earlyParagraph) {
      foundSummary = earlyParagraph;
    }
  }
  if (foundSummary) {
    result.summary = foundSummary;
  }

  // 8. Detected skills using rigorous word boundary dictionary
  const matchedSkills = SKILL_DEFINITIONS
    .filter((skill) => isSkillInText(skill, rawText))
    .map((skill) => skill.canonical);

  if (matchedSkills.length > 0) {
    result.skills = Array.from(new Set(matchedSkills)).slice(0, 18);
  }

  // 9. Extract bullets (lines starting with bullet marks or action verbs)
  const bulletLines = lines.filter((l) =>
    /^(?:[•\-\*▪▫‣–—]\s*|(?:improved|led|built|developed|created|managed|engineered|designed|architected|spearheaded|orchestrated|automated|scaled|delivered|implemented|reduced|increased)\b)/i.test(l) &&
    l.length > 20 &&
    l.length < 500
  );
  if (bulletLines.length > 0) {
    result.bullets = bulletLines.map((b) => b.replace(/^[•\-\*▪▫‣–—]\s*/, '').trim());
  }

  const experienceHeading = /^(?:professional\s+)?(?:work\s+)?experience$|^employment(?:\s+history)?$/i;
  const sectionHeading = /^(?:summary|profile|objective|skills|technical\s+skills|projects|technical\s+projects|education|certifications|awards|languages|interests|activities|publications|references|volunteer(?:\s+experience)?)$/i;
  const experienceStart = lines.findIndex((line) => experienceHeading.test(line));
  if (experienceStart >= 0) {
    const experienceSectionLines: string[] = [];
    for (let i = experienceStart + 1; i < lines.length && !sectionHeading.test(lines[i]); i++) {
      experienceSectionLines.push(lines[i]);
    }
    result.experienceBullets = experienceSectionLines
      .filter((line) => /^(?:[•\-\*▪▫‣–—]\s*|(?:improved|led|built|developed|created|managed|engineered|designed|architected|spearheaded|orchestrated|automated|scaled|delivered|implemented|reduced|increased)\b)/i.test(line) && line.length > 20 && line.length < 500)
      .map((line) => line.replace(/^[•\-\*▪▫‣–—]\s*/, '').trim());
  }

  // 10. Education & Fresher / Student Detection
  let eduDegree = '';
  let eduSchool = '';
  let eduYear = '';
  let eduIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/(?:b\.?s\.?|b\.?tech|b\.?e\.?|m\.?s\.?|m\.?tech|bachelor|master|ph\.?d|undergraduate)\b/i.test(l) && l.length < 120) {
      eduDegree = l;
      eduIdx = i;
      break;
    }
  }

  if (eduIdx >= 0) {
    // Check adjacent lines for school name and graduation year
    for (let j = Math.max(0, eduIdx - 2); j <= Math.min(lines.length - 1, eduIdx + 3); j++) {
      const adjacent = lines[j];
      if (j !== eduIdx && /(?:university|college|institute|school|academy|campus|iit|nit|bits)\b/i.test(adjacent) && adjacent.length < 120) {
        eduSchool = adjacent;
      }
      const yearMatch = adjacent.match(/(?:(?:\d{2}\/)?20\d{2}\s*[-–—]\s*(?:(?:\d{2}\/)?20\d{2}|present)|20\d{2})/i);
      if (yearMatch) {
        eduYear = yearMatch[0];
      }
    }

    result.education = [
      {
        id: 'edu-extracted-1',
        degree: eduDegree,
        school: eduSchool,
        location: result.location || '',
        year: eduYear
      }
    ];
  }

  // 11. Projects Extraction
  const projectsList: ParsedProjectItem[] = [];
  let inProjectsSection = false;
  let currentProject: ParsedProjectItem | null = null;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^(?:key\s+|technical\s+|academic\s+|personal\s+)?projects\b/i.test(l) && l.length < 40) {
      inProjectsSection = true;
      continue;
    }

    if (inProjectsSection) {
      // Check for exit into another major section
      if (/^(?:experience|work\s+experience|employment|education|skills|certifications|awards|languages|interests)\b/i.test(l) && l.length < 40) {
        if (currentProject && currentProject.bullets.length > 0) {
          projectsList.push(currentProject);
          currentProject = null;
        }
        inProjectsSection = false;
        continue;
      }

      // Check if line is a bullet
      const isBullet = /^[•\-\*▪▫‣–—]/.test(l) || /^(?:developed|built|designed|implemented|created|architected|automated)\b/i.test(l);

      if (isBullet) {
        const cleanBullet = l.replace(/^[•\-\*▪▫‣–—]\s*/, '').trim();
        if (cleanBullet.length > 15) {
          if (!currentProject) {
            currentProject = {
              id: `proj-${Date.now()}-${projectsList.length + 1}`,
              name: '',
              bullets: []
            };
          }
          currentProject.bullets.push(cleanBullet);
        }
      } else if (l.length > 3 && l.length < 80 && !l.includes('@') && !l.includes('http')) {
        // Potential Project Title line (e.g. "MoodMate", "PDFlex - PDF Utility Platform", "Material Code Standardization System")
        if (currentProject && currentProject.bullets.length > 0) {
          projectsList.push(currentProject);
        }
        currentProject = {
          id: `proj-${Date.now()}-${projectsList.length + 1}`,
          name: l,
          bullets: []
        };
      }
    }
  }

  if (currentProject && currentProject.bullets.length > 0) {
    projectsList.push(currentProject);
  }

  if (projectsList.length > 0) {
    result.projects = projectsList;
  }

  return result;
}
