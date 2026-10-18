import type { ResumeData } from '../data/resumeSamples';

export interface SafeOptimizationResult {
  resume: ResumeData;
  changedBullets: number;
  removedPlaceholderBullets: number;
}

const PLACEHOLDER_MARKER = /\[(?:[^\]]*\badd\s+(?:a\s+)?verified result\b[^\]]*|\s*[XYZ]\s*|\s*key outcome\s*)\]/i;
const PLACEHOLDER_MARKERS_GLOBAL = /\s*\[(?:[^\]]*\badd\s+(?:a\s+)?verified result\b[^\]]*|\s*[XYZ]\s*|\s*key outcome\s*)\]\s*/gi;
const PLACEHOLDER_CLAUSE_START = /\s*(?:[,;—–]\s*)?(?:reducing|improving|increasing|processing|saving)\b/i;

function optimizeBullet(bullet: string): { text: string; removedPlaceholder: boolean } {
  let text = bullet.trim();
  const removedPlaceholder = PLACEHOLDER_MARKER.test(text);

  // Remove only a trailing metric clause when its claimed value is a template token.
  // Never alter a numeric result the résumé owner actually supplied.
  const clausePattern = new RegExp(PLACEHOLDER_CLAUSE_START.source, 'gi');
  let clauseMatch: RegExpExecArray | null;
  while ((clauseMatch = clausePattern.exec(text)) !== null) {
    const suffix = text.slice(clauseMatch.index);
    if (PLACEHOLDER_MARKER.test(suffix)) {
      text = text.slice(0, clauseMatch.index).trim();
      break;
    }
  }

  text = text.replace(PLACEHOLDER_MARKERS_GLOBAL, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/[,;:]+\s*$/, '')
    .trim();

  if (text) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
    if (!/[.!?]$/.test(text)) text += '.';
  }

  return { text, removedPlaceholder };
}

/** Remove explicit template placeholders and standardize bullet punctuation without adding résumé facts. */
export function safelyOptimizeResume(resume: ResumeData): SafeOptimizationResult {
  let changedBullets = 0;
  let removedPlaceholderBullets = 0;
  const optimizeList = (bullets: string[]) => bullets.map((bullet) => {
    const result = optimizeBullet(bullet);
    if (result.text !== bullet) changedBullets++;
    if (result.removedPlaceholder) removedPlaceholderBullets++;
    return result.text;
  });

  return {
    resume: {
      ...resume,
      experience: resume.experience.map((experience) => ({
        ...experience,
        bullets: optimizeList(experience.bullets)
      })),
      projects: resume.projects?.map((project) => ({
        ...project,
        bullets: optimizeList(project.bullets)
      }))
    },
    changedBullets,
    removedPlaceholderBullets
  };
}
