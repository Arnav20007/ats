import { SKILL_DEFINITIONS, isSkillInText } from './atsKeywordMatcher';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

export interface ExtractedPdfResult {
  text: string;
  isScanned: boolean;
  pageCount: number;
  usedOcr?: boolean;
  ocrConfidence?: number;
  error?: string;
}

const MAX_OCR_PAGES = 10;

async function runBrowserOcr(pdf: any): Promise<{ text: string; confidence: number }> {
  if (typeof document === 'undefined') {
    throw new Error('Browser canvas is required for OCR');
  }
  if (pdf.numPages > MAX_OCR_PAGES) {
    throw new Error(`OCR is limited to ${MAX_OCR_PAGES} pages per file. Upload a text-selectable PDF or split the file.`);
  }

  const { createWorker } = await import('tesseract.js');
  const assetRoot = new URL('/ocr/', document.baseURI).toString();
  const worker = await createWorker('eng', 1, {
    workerPath: new URL('worker.min.js', assetRoot).toString(),
    corePath: new URL('core/', assetRoot).toString(),
    langPath: new URL('tessdata', assetRoot).toString(),
    gzip: false,
    cachePath: 'toolforge-ocr-v1',
    workerBlobURL: false
  });

  const pageText: string[] = [];
  let confidenceTotal = 0;
  let confidenceWeight = 0;
  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = Math.min(3, 2400 / Math.max(baseViewport.width, baseViewport.height));
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext('2d', { alpha: false });
      if (!context) throw new Error('Could not prepare a canvas for OCR');

      await page.render({ canvasContext: context, viewport }).promise;
      const result = await worker.recognize(canvas);
      const text = result.data.text.trim();
      if (text) {
        pageText.push(text);
        confidenceTotal += result.data.confidence * text.length;
        confidenceWeight += text.length;
      }

      page.cleanup();
      canvas.width = 0;
      canvas.height = 0;
    }
  } finally {
    await worker.terminate();
  }

  return {
    text: pageText.join('\n\n').trim(),
    confidence: confidenceWeight ? Math.round(confidenceTotal / confidenceWeight) : 0
  };
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
 * Conservative fallback for plain, uncompressed PDF page streams only.
 * Scanning the whole binary for printable strings can turn metadata, font data,
 * or image bytes into false résumé text and produce misleading scores.
 */
function extractTextFromBinaryPdf(buffer: ArrayBuffer): string {
  try {
    const bytes = new Uint8Array(buffer);
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const raw = decoder.decode(bytes);

    // A fallback regex cannot safely interpret compressed object or page streams.
    // Let PDF.js handle those in the browser; if it cannot, report no text instead.
    if (/\/(?:FlateDecode|DCTDecode|JPXDecode|JBIG2Decode|CCITTFaxDecode|ObjStm)\b/.test(raw)) return '';

    const textPieces: string[] = [];
    const streamRegex = /<<([\s\S]*?)>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let streamMatch: RegExpExecArray | null;
    while ((streamMatch = streamRegex.exec(raw)) !== null) {
      const dictionary = streamMatch[1];
      // Compressed streams require a real PDF parser. Never regex-scan their bytes.
      if (/\/Filter\b/.test(dictionary)) continue;
      const stream = streamMatch[2];
      const textOperator = /\(([^()]{1,1000})\)\s*Tj|\[([^\[\]]{1,4000})\]\s*TJ/g;
      let operatorMatch: RegExpExecArray | null;
      while ((operatorMatch = textOperator.exec(stream)) !== null) {
        const value = operatorMatch[1] ?? (operatorMatch[2]?.match(/\(([^()]*)\)/g) || [])
          .map((part) => part.slice(1, -1)).join(' ');
        const clean = value.replace(/\\([nrtbf\\()])/g, ' ').replace(/\s+/g, ' ').trim();
        if (clean.length > 1) textPieces.push(clean);
      }
    }

    const extracted = textPieces.join('\n').trim();
    return textPieces.length >= 2 && extracted.length > 20 ? extracted : '';
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
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const parsePromise = (async () => {
      const pdf = await loadingTask.promise;
      if (pdf.numPages > 100) throw new Error('PDF exceeds the 100-page extraction limit');
      let fullText = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageLines: string[] = [];
        let currentLine = '';
        let previousY: number | null = null;
        const flushLine = () => {
          if (currentLine.trim()) pageLines.push(currentLine.trim());
          currentLine = '';
        };

        for (const item of textContent.items as any[]) {
          if (!('str' in item) || !item.str) continue;
          const y = Array.isArray(item.transform) && Number.isFinite(item.transform[5])
            ? item.transform[5] as number
            : null;
          if (y !== null && previousY !== null && Math.abs(y - previousY) > 2) flushLine();
          if (currentLine) currentLine += ' ';
          currentLine += item.str;
          if (y !== null) previousY = y;
          if (item.hasEOL) flushLine();
        }
        flushLine();
        const pageText = pageLines.join('\n');
        fullText += pageText + '\n\n';
      }

      return {
        pdf,
        text: fullText.trim(),
        numPages: pdf.numPages
      };
    })();

    const timeoutPromise = new Promise<{ pdf: any; text: string; numPages: number }>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('PDF.js parse timeout')), 10000);
    });

    let parsed: { pdf: any; text: string; numPages: number };
    try {
      parsed = await Promise.race([parsePromise, timeoutPromise]);
    } catch (error) {
      await loadingTask.destroy().catch(() => undefined);
      throw error;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
    const { pdf, text, numPages } = parsed;

    if (text.length > 20) {
      await loadingTask.destroy().catch(() => undefined);
      return {
        text,
        isScanned: false,
        pageCount: numPages
      };
    } else {
      // A scan with no text layer still contains useful visual content. OCR it
      // locally in the browser before deciding the import is unreadable.
      try {
        const ocr = await runBrowserOcr(pdf);
        await loadingTask.destroy().catch(() => undefined);
        if (ocr.text.length > 40 && ocr.confidence >= 30) {
          return {
            text: ocr.text,
            isScanned: true,
            pageCount: numPages,
            usedOcr: true,
            ocrConfidence: ocr.confidence
          };
        }
        return {
          text: '',
          isScanned: true,
          pageCount: numPages,
          usedOcr: true,
          ocrConfidence: ocr.confidence,
          error: 'OCR could not read enough text clearly. Try a sharper scan or a text-selectable PDF.'
        };
      } catch (ocrError) {
        await loadingTask.destroy().catch(() => undefined);
        const error = ocrError instanceof Error ? ocrError.message : 'OCR could not read this PDF.';
        return { text: '', isScanned: true, pageCount: numPages, usedOcr: true, error };
      }
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

  // Never decode an entire PDF byte stream as text: compressed page data commonly
  // contains printable fragments that look like résumé content but are not text.
  // Report it as unreadable/scanned instead of assigning a misleading score.
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
export function parseResumeText(rawText: string, options: { ocr?: boolean } = {}): ParsedResumeFields {
  const result: ParsedResumeFields = {};
  let normalizedText = options.ocr
    ? rawText
        .replace(/&amp;/gi, '&')
        .replace(/^[¢©¤°·•\*\-~+>▪▫‣–—\u2022\u25cf\u25aa\u25ab\u25b8\u2013\u2014]\s*/gm, '• ')
        .replace(/^[oe0v]\s+(?=[A-Z])/gm, '• ')
        .replace(/^[oe]\s+(?=(?:implemented|developed|built|created|designed|automated|engineered|spearheaded|architected|led|managed|optimized|reduced|increased|tested|constructed|applied|handled)\b)/gim, '• ')
        .replace(/\bE\s+X\s+P\s+E\s+R\s+I\s+E\s+N\s+C\s+E\b/gi, 'EXPERIENCE')
        .replace(/\bP\s+R\s+O\s+J\s+E\s+C\s+T\s+S\b/gi, 'PROJECTS')
        .replace(/\bE\s+D\s+U\s+C\s+A\s+T\s+I\s+O\s+N\b/gi, 'EDUCATION')
        .replace(/\bS\s+K\s+I\s+L\s+L\s+S\b/gi, 'SKILLS')
        .replace(/\u00a0/g, ' ')
    : rawText;
  let lines = normalizedText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (options.ocr) {
    const merged: string[] = [];
    const isBullet = (line: string) => /^(?:[•\-*▪▫‣–—]\s*|(?:improved|led|built|developed|created|managed|engineered|designed|architected|spearheaded|orchestrated|automated|scaled|delivered|implemented|reduced|increased)\b)/i.test(line);
    const isSection = (line: string) => /^(?:professional\s+)?(?:summary|profile|objective|experience|work\s+experience|employment|skills|technical\s+skills|education|key\s+technical\s+projects|projects|certifications|awards|languages)\b/i.test(line);
    const isLikelyProjectTitle = (line: string) => line.length < 80 && (
      /\b(?:19|20)\d{2}\s*(?:[-–—]|to)\s*(?:(?:19|20)\d{2}|present)\b/i.test(line) ||
      /\|\s*(?:19|20)\d{2}\b/.test(line) ||
      (/^(?:[A-Z][\p{L}\d&+.#/-]*)(?:\s+[A-Z][\p{L}\d&+.#/-]*){1,7}$/u.test(line) && !/[.!?]$/.test(line))
    );
    for (const line of lines) {
      const previous = merged.at(-1);
      if (previous && isBullet(previous) && !isBullet(line) && !isSection(line) && !isLikelyProjectTitle(line)) {
        merged[merged.length - 1] = `${previous} ${line}`;
      } else {
        merged.push(line);
      }
    }
    lines = merged;
    normalizedText = lines.join('\n');
  } else {
    // PDF.js often splits a single visual bullet across multiple text lines.
    // Join lowercase continuation lines so the parser does not turn the tail
    // of a bullet into a project title or lose it from the imported bullet.
    const wrapped: string[] = [];
    const isBullet = (line: string) => /^(?:[•\-*▪▫‣–—]\s*|(?:improved|led|built|developed|created|managed|engineered|designed|architected|spearheaded|orchestrated|automated|scaled|delivered|implemented|reduced|increased|tested|constructed|applied|handled)\b)/i.test(line);
    const isSection = (line: string) => /^(?:(?:professional|work|technical|key|academic|personal)\s+)*(?:summary|profile|objective|experience|employment|skills|education|projects|certifications|achievements|awards|languages|interests|publications|references)\b/i.test(line);
    for (const line of lines) {
      const previous = wrapped.at(-1);
      const isWrappedContinuation = /^[a-z(\[]/.test(line) || !/[.!?]$/.test(previous || '');
      if (previous && isBullet(previous) && !isBullet(line) && !isSection(line) && isWrappedContinuation) {
        wrapped[wrapped.length - 1] = `${previous} ${line}`;
      } else {
        wrapped.push(line);
      }
    }
    lines = wrapped;
    normalizedText = lines.join('\n');
  }

  if (lines.length > 0) {
    // 1. Candidate Full Name: first line with realistic name structure
    const candidateName = lines.find((l) =>
      l.length > 2 &&
      l.length < 35 &&
      !l.includes('@') &&
      !l.includes('http') &&
      !/(?:resume|curriculum|vitae|page|github|linkedin|phone|email)/i.test(l) &&
      !/^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/.test(l) &&
      !(options.ocr && (l.match(/\d/g)?.length || 0) > l.length / 2)
    );
    if (candidateName) {
      result.fullName = candidateName;
    }

    // 2. Candidate Job Title
    const titleRegex = /(?:software engineer|full stack|frontend|backend|devops|cloud|data scientist|machine learning|ai engineer|product manager|tech lead|engineering manager|system architect|security engineer|developer|consultant|analyst|qa engineer)/i;
    const candidateTitle = lines.slice(0, 10).find((l) => {
      const headline = l.split('|', 1)[0].trim();
      const hasRecognizedRole = titleRegex.test(headline) || /\b(?:student|graduate|undergraduate|intern)\b/i.test(headline);
      return l !== candidateName &&
        ((options.ocr && /^([\w &.-]{3,40}):\s*(?:REST APIs|SQLite|JavaScript|Python|SQL)\b/i.test(l) && titleRegex.test(l.split(':', 1)[0])) ||
          (!l.includes(':') && !l.includes('&amp;') && l.split(/\s+/).length <= 12 && hasRecognizedRole)) &&
        l.length < 100 &&
        !l.includes('@');
    });
    if (candidateTitle) {
      result.jobTitle = options.ocr
        ? candidateTitle.split(':', 1)[0].trim()
        : candidateTitle.split('|', 1)[0].trim();
    }
  }

  // 3. Email extraction
  const emailMatch = normalizedText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.email = emailMatch[0];
  }

  // 4. Phone extraction
  const phoneMatch = normalizedText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    result.phone = phoneMatch[0];
  }

  // 5. Location extraction
  const locMatch = normalizedText.match(/\b([A-Z][a-zA-Z\s]+,\s*(?:[A-Z]{2}|[A-Z][a-zA-Z\s]+))\b/);
  if (locMatch && !locMatch[1].toLowerCase().includes('university') && !locMatch[1].toLowerCase().includes('college')) {
    result.location = locMatch[1].trim();
  }

  // 6. LinkedIn & Portfolio
  const linkedinMatch = normalizedText.match(/(?:linkedin\.com\/in\/[\w-]+|linkedin\.com\/[\w-]+)/i);
  if (linkedinMatch) {
    result.linkedin = linkedinMatch[0];
  }
  const portfolioMatch = normalizedText.match(/(?:github\.com\/[\w-]+|[\w-]+\.(?:dev|io|me|tech))\b/i);
  if (portfolioMatch) {
    result.portfolio = portfolioMatch[0];
  }

  // 7. Professional Summary / Profile paragraph
  let foundSummary = '';
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^(?:summary|professional summary|profile|about me|executive summary|objective)\b/i.test(l)) {
      const nextLines: string[] = [];
      for (const nl of lines.slice(i + 1, i + 4)) {
        if (/^(?:(?:technical|core|key|professional)\s+)*(?:experience|skills|education|work|employment|projects|competencies)\b/i.test(nl)) break;
        if (!/(?:university|college|b\.?tech|bachelor|master|\bGPA\b|\b20\d{2}\b)/i.test(nl) && nl.length > 20) nextLines.push(nl);
      }
      if (nextLines.length > 0) {
        foundSummary = nextLines.join(' ');
        break;
      }
    }
  }
  if (!foundSummary) {
    // If no header, find the first substantive narrative paragraph (>70 chars) in the top 15 lines
    const firstSection = lines.findIndex((l) => /^(?:(?:technical|core|key|professional)\s+)*(?:summary|profile|objective|experience|skills|education|projects|competencies)\b/i.test(l));
    const preSectionLines = lines.slice(0, firstSection >= 0 ? firstSection : 15);
    const earlyParagraph = preSectionLines.find((l) =>
      l.length > 70 &&
      !l.startsWith('•') &&
      !l.startsWith('-') &&
      !l.includes('@') &&
      !/^(?:(?:technical|core|key|professional)\s+)*(?:experience|skills|education|projects|competencies)\b/i.test(l) &&
      !/(?:university|college|b\.?tech|bachelor|master|\bGPA\b|\b20\d{2}\b)/i.test(l)
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
    .filter((skill) => isSkillInText(skill, normalizedText))
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

  const isSectionBoundary = (line: string): boolean => {
    if (line.length > 55 || /^[•\-\*▪▫‣–—]/.test(line) || /[.!?]$/.test(line)) return false;
    return /^(?:(?:professional|work|technical|key|academic|personal|relevant|core|selected)\s+)*(?:summary|profile|objective|skills|technical\s+skills|experience|work\s+experience|employment|work\s+history|history|internships|projects|technical\s+projects|key\s+projects|education|certifications|licenses|achievements|awards|honors|languages|interests|activities|extracurricular(?:\s+activities)?|leadership|publications|references|volunteer(?:\s+experience)?|coursework)(?:\s*[:&/].*)?$/i.test(line.trim());
  };

  const experienceHeading = /^(?:(?:professional|work|technical|relevant|industry|corporate|internship)\s+)*(?:experience|employment|work\s+history|history|internships|work\s+experiences)(?:\s*[:&/].*)?$/i;
  const experienceStart = lines.findIndex((line) => experienceHeading.test(line) && line.length < 55);
  if (experienceStart >= 0) {
    const experienceSectionLines: string[] = [];
    for (let i = experienceStart + 1; i < lines.length && !isSectionBoundary(lines[i]); i++) {
      experienceSectionLines.push(lines[i]);
    }
    result.experienceBullets = experienceSectionLines
      .filter((line) => /^(?:[•\-\*▪▫‣–—]\s*|(?:improved|led|built|developed|created|managed|engineered|designed|architected|spearheaded|orchestrated|automated|scaled|delivered|implemented|reduced|increased|tested|constructed|applied|handled|analyzed|collaborated|maintained|optimized)\b)/i.test(line) && line.length > 20 && line.length < 500)
      .map((line) => line.replace(/^[•\-\*▪▫‣–—]\s*/, '').trim());
  }

  // 10. Education & Fresher / Student Detection
  let eduDegree = '';
  let eduSchool = '';
  let eduYear = '';
  let eduLocation = '';
  let eduIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const hasDegree = /(?:^|[^a-z])(?:b\.?s\.?|b\.?tech|b\.?e\.?|m\.?s\.?|m\.?tech|bachelor|master|ph\.?d|undergraduate|diploma)(?:$|[^a-z])/i.test(l) && l.length < 140;
    const hasSchool = /(?:university|college|institute|school|academy|campus|iit|nit|bits|iiit)\b/i.test(l) && l.length < 140;

    if (hasDegree) {
      eduIdx = i;
      if (hasSchool) {
        // Line has both school and degree (e.g. "Example University — B.Tech in Computer Science | 2024-2028 GPA: 8.0")
        const parts = l.split(/\s*[—–|;]\s*|\s+-\s+/).map((p) => p.trim()).filter(Boolean);
        for (const part of parts) {
          if (/(?:university|college|institute|school|academy|campus|iit|nit|bits|iiit)\b/i.test(part) && !eduSchool) {
            eduSchool = part;
          } else if (/(?:b\.?s\.?|b\.?tech|b\.?e\.?|m\.?s\.?|m\.?tech|bachelor|master|ph\.?d|undergraduate|diploma)\b/i.test(part) && !eduDegree) {
            eduDegree = part;
          }
          const yMatch = part.match(/\b((?:19|20)\d{2}(?:\s*[-–—]\s*(?:(?:19|20)\d{2}|present))?)\b/i);
          if (yMatch && !eduYear) {
            eduYear = yMatch[1];
          }
        }
        if (!eduDegree) eduDegree = l;
      } else {
        eduDegree = l;
      }
      break;
    }
  }

  if (eduIdx >= 0 && !eduSchool) {
    // Check adjacent lines for school name and graduation year
    for (let j = Math.max(0, eduIdx - 2); j <= Math.min(lines.length - 1, eduIdx + 3); j++) {
      if (j === eduIdx) continue;
      const adjacent = lines[j];
      const isHeaderOrSkill = /^(?:skills|technical|projects|experience|summary|profile|location|email|phone)\b/i.test(adjacent);
      if (!adjacent.includes('@') && !isHeaderOrSkill && /(?:university|college|institute|school|academy|campus|iit|nit|bits|iiit)\b/i.test(adjacent) && adjacent.length < 120) {
        const cleanSchool = adjacent
          .split(/\s*[|]\s*/)[0]
          .replace(/^[•\-\*▪▫‣–—]\s*/, '')
          .replace(/,\s*(?:cgpa|gpa|grade).*$/i, '')
          .trim();
        eduSchool = cleanSchool;

        const locInLine = adjacent.match(/,\s*([A-Z][a-zA-Z\s]+,\s*(?:[A-Z]{2}|[A-Z][a-zA-Z\s]+))\b/);
        if (locInLine) {
          eduLocation = locInLine[1].trim();
        }
      }
      const yearMatch = adjacent.match(/(?:(?:\d{2}\/)?20\d{2}\s*[-–—]\s*(?:(?:\d{2}\/)?20\d{2}|present)|20\d{2})/i);
      if (yearMatch && !eduYear) {
        eduYear = yearMatch[0];
      }
    }
  }

  if (eduDegree) {
    const degreeYear = eduDegree.match(/\b((?:19|20)\d{2}(?:\s*[-–—]\s*(?:(?:19|20)\d{2}|present))?)\b/i);
    if (degreeYear && !eduYear) {
      eduYear = degreeYear[1];
    }
    eduDegree = eduDegree
      .replace(/\b(?:c?gpa\s*[:=]?\s*[\d.]+(?:\s*\/\s*[\d.]+)?)\b/gi, '')
      .replace(/\b(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|present)\b/gi, '')
      .replace(/\b(?:19|20)\d{2}\b/g, '')
      .replace(/[|—–-]\s*$/, '')
      .replace(/^\s*[|—–-]\s*/, '')
      .trim();

    result.education = [
      {
        id: 'edu-extracted-1',
        degree: eduDegree,
        school: eduSchool,
        location: eduLocation || result.location || '',
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
    if (/^(?:(?:key|technical|academic|personal|selected|software|major|featured|recent)\s+)*(?:projects|project\s+work|open\s+source\s+contributions)(?:\s*[:&/].*)?$/i.test(l) && l.length < 55) {
      inProjectsSection = true;
      continue;
    }

    if (inProjectsSection) {
      // Check for exit into another major section
      if (isSectionBoundary(l)) {
        if (currentProject && currentProject.bullets.length > 0) {
          projectsList.push(currentProject);
          currentProject = null;
        }
        inProjectsSection = false;
        continue;
      }

      // Check if line is a bullet
      const isBullet = /^[•\-*▪▫‣–—]/.test(l) || /^(?:developed|built|designed|implemented|created|architected|automated|engineered|spearheaded|optimized)\b/i.test(l);

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
      } else if (currentProject && currentProject.bullets.length === 0 && /\||\b(?:19|20)\d{2}\b/.test(l)) {
        const date = l.match(/\b((?:19|20)\d{2})(?:\s*[-–—]\s*((?:19|20)\d{2}|present))?\b/i);
        if (date) {
          currentProject.startDate = date[1];
          if (date[2]) currentProject.endDate = /^present$/i.test(date[2]) ? 'Present' : date[2];
        }
        currentProject.technologies = l.split('|').filter((part) => !/\b(?:19|20)\d{2}\b/.test(part)).join(',').trim();
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
        const date = l.match(/\b((?:19|20)\d{2})(?:\s*[-–—]\s*((?:19|20)\d{2}|present))?\b/i);
        if (date) {
          currentProject.startDate = date[1];
          if (date[2]) currentProject.endDate = /^present$/i.test(date[2]) ? 'Present' : date[2];
          currentProject.name = l.replace(date[0], '').replace(/[|,–—-]+\s*$/, '').trim() || l;
        }
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
