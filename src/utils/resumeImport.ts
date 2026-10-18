import type { ResumeData, ResumeExperience, ResumeProject } from '../data/resumeSamples';
import { extractTextFromPdfFile, parseResumeText, type ExtractedPdfResult } from './pdfParser';

export interface PreparedResumeImport {
  extracted: ExtractedPdfResult;
  resume: ResumeData | null;
}

/** Extract and conservatively map uploaded content into the editor's resume model. */
export async function prepareResumeImport(file: File): Promise<PreparedResumeImport> {
  const extracted = await extractTextFromPdfFile(file);
  if (!extracted.text.trim()) return { extracted, resume: null };

  const parsed = parseResumeText(extracted.text, { ocr: extracted.usedOcr === true });
  const projects: ResumeProject[] = (parsed.projects || []).map((project, index) => ({
    id: `proj-uploaded-${index + 1}`,
    name: project.name,
    role: project.role || '',
    technologies: project.technologies,
    startDate: project.startDate,
    endDate: project.endDate,
    bullets: project.bullets || []
  }));
  const experienceBullets = parsed.experienceBullets || [];
  const experience: ResumeExperience[] = experienceBullets.length > 0 ? [{
    id: 'exp-uploaded-1',
    role: '',
    company: '',
    location: parsed.location || '',
    startDate: '',
    endDate: '',
    bullets: experienceBullets
  }] : [];
  const classifiedBullets = new Set([
    ...experienceBullets,
    ...projects.flatMap((project) => project.bullets)
  ]);
  const unclassifiedBullets = (parsed.bullets || []).filter((bullet) => !classifiedBullets.has(bullet));

  const resume: ResumeData = {
    id: `uploaded-${Date.now()}`,
    fullName: parsed.fullName || '',
    jobTitle: parsed.jobTitle || '',
    email: parsed.email || '',
    phone: parsed.phone || '',
    location: parsed.location || '',
    linkedin: parsed.linkedin || '',
    portfolio: parsed.portfolio || '',
    summary: parsed.summary || (!extracted.usedOcr && unclassifiedBullets.length > 0
      ? `Extracted bullets to review and move to the correct section:\n${unclassifiedBullets.map((bullet) => `• ${bullet}`).join('\n')}`
      : ''),
    skills: parsed.skills?.length ? parsed.skills : [],
    experience,
    projects,
    education: parsed.education || []
  };

  return { extracted, resume };
}
