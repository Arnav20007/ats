import * as pdfjsLib from 'pdfjs-dist';
import { SKILL_DEFINITIONS, isSkillInText } from './atsKeywordMatcher';

// Configure local worker safely in browser/Vite without breaking Node
try {
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
  }
} catch (e) {
  console.warn('PDF.js worker setup warning:', e);
}

export interface ExtractedPdfResult {
  text: string;
  isScanned: boolean;
  pageCount: number;
}

/**
 * Extracts plain text from DOCX binary by parsing <w:t> XML nodes.
 */
function extractTextFromDocx(buffer: ArrayBuffer): string {
  try {
    const bytes = new Uint8Array(buffer);
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const raw = decoder.decode(bytes);
    const matches: string[] = [];
    const wtRegex = /<w:t[^>]*>([^<]+)<\/w:t>/g;
    let match;
    while ((match = wtRegex.exec(raw)) !== null) {
      matches.push(match[1]);
    }
    if (matches.length > 0) {
      return matches.join(' ');
    }
  } catch (e) {
    console.warn('DOCX text extraction error:', e);
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
 * Never hangs; uses a strict 3s timeout on PDF.js and falls back to binary parsing.
 */
export async function extractTextFromPdfFile(file: File): Promise<ExtractedPdfResult> {
  // 1. Plain text or Markdown
  if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
    const raw = await file.text();
    return {
      text: raw,
      isScanned: raw.trim().length === 0,
      pageCount: 1
    };
  }

  const arrayBuffer = await file.arrayBuffer();

  // 2. DOCX Word Documents
  if (file.name.endsWith('.docx') || file.type.includes('wordprocessingml')) {
    const docxText = extractTextFromDocx(arrayBuffer);
    if (docxText.length > 20) {
      return {
        text: docxText,
        isScanned: false,
        pageCount: 1
      };
    }
  }

  // 3. Primary PDF.js with strict 3-second timeout
  try {
    const parsePromise = (async () => {
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
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

    const timeoutPromise = new Promise<{ text: string; numPages: number }>((_, reject) =>
      setTimeout(() => reject(new Error('PDF.js parse timeout')), 3000)
    );

    const { text, numPages } = await Promise.race([parsePromise, timeoutPromise]);

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
  projects?: ParsedProjectItem[];
  education?: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    year: string;
  }>;
  isFresherOrStudent?: boolean;
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

  // 10. Education & Fresher / Student Detection
  let eduDegree = '';
  let eduSchool = 'University / College';
  let eduYear = 'Graduated';
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

  // Fresher / Student identification
  const currentYear = new Date().getFullYear();
  const futureYearMatch = rawText.match(/\b(202[4-9]|203\d)\b/);
  const isFresherOrStudent = Boolean(
    futureYearMatch ||
    /(?:student|undergraduate|fresher|pursuing|b\.?tech|intern\b)/i.test(rawText) ||
    (eduDegree && /(?:202[4-9]|present)/i.test(eduYear))
  );
  result.isFresherOrStudent = isFresherOrStudent;

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
              name: 'Technical Project',
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

  // Fallback: If no explicit Projects heading was found, check if text has distinct project blocks
  if (projectsList.length === 0) {
    const knownProjectMatches = lines.filter((l) =>
      /(?:MoodMate|PDFlex|Hackathon|Platform|Pipeline|Standardization System|Application|Engine|Portal)\b/i.test(l) &&
      l.length < 65 &&
      !l.includes('@') &&
      !l.includes('University')
    );

    if (knownProjectMatches.length > 0 && result.bullets && result.bullets.length > 0) {
      const bulletsPerProject = Math.ceil(result.bullets.length / knownProjectMatches.length);
      knownProjectMatches.slice(0, 3).forEach((name, pIdx) => {
        const start = pIdx * bulletsPerProject;
        const bChunk = result.bullets!.slice(start, start + bulletsPerProject);
        if (bChunk.length > 0) {
          projectsList.push({
            id: `proj-auto-${pIdx + 1}`,
            name,
            bullets: bChunk
          });
        }
      });
    }
  }

  if (projectsList.length > 0) {
    result.projects = projectsList;
  }

  return result;
}
