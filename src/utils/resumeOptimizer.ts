import type { ResumeData } from '../data/resumeSamples';

export interface SafeOptimizationResult {
  resume: ResumeData;
  changedBullets: number;
  removedPlaceholderBullets: number;
  cleanedPassiveBullets: number;
  cleanedSkillsCount: number;
}

const PLACEHOLDER_MARKER = /\[(?:[^\]]*\badd\s+(?:a\s+)?verified result\b[^\]]*|\s*[XYZ]\s*|\s*key outcome\s*)\]/i;
const PLACEHOLDER_MARKERS_GLOBAL = /\s*\[(?:[^\]]*\badd\s+(?:a\s+)?verified result\b[^\]]*|\s*[XYZ]\s*|\s*key outcome\s*)\]\s*/gi;
const PLACEHOLDER_CLAUSE_START = /\s*(?:[,;—–]\s*)?(?:reducing|improving|increasing|processing|saving)\b/i;

const GERUND_TO_PAST: Record<string, string> = {
  building: 'Built',
  developing: 'Developed',
  designing: 'Designed',
  implementing: 'Implemented',
  managing: 'Managed',
  creating: 'Created',
  leading: 'Led',
  spearheading: 'Spearheaded',
  architecting: 'Architected',
  maintaining: 'Maintained',
  optimizing: 'Optimized',
  testing: 'Tested',
  automating: 'Automated',
  deploying: 'Deployed',
  configuring: 'Configured',
  migrating: 'Migrated',
  refactoring: 'Refactored',
  coordinating: 'Coordinated',
  analyzing: 'Analyzed',
  authoring: 'Authored',
  writing: 'Authored',
  integrating: 'Integrated',
  resolving: 'Resolved',
  handling: 'Handled',
  executing: 'Executed',
  improving: 'Improved',
  conducting: 'Conducted'
};

const BASE_TO_PAST: Record<string, string> = {
  build: 'Built',
  develop: 'Developed',
  design: 'Designed',
  implement: 'Implemented',
  manage: 'Managed',
  create: 'Created',
  lead: 'Led',
  spearhead: 'Spearheaded',
  architect: 'Architected',
  maintain: 'Maintained',
  optimize: 'Optimized',
  test: 'Tested',
  automate: 'Automated',
  deploy: 'Deployed',
  configure: 'Configured',
  migrate: 'Migrated',
  refactor: 'Refactored',
  coordinate: 'Coordinated',
  analyze: 'Analyzed',
  write: 'Authored',
  integrate: 'Integrated'
};

const PASSIVE_GERUND_PATTERN = /^(?:responsible for|tasked with|worked on|helped with|helped in|assisted in|assisted with|involved in)\s+(?:the\s+)?([a-z]+ing)(?:\s+and\s+([a-z]+ing))?\b/i;
const PASSIVE_BASE_PATTERN = /^(?:helped to|tasked to|assisted to)\s+([a-z]+)(?:\s+and\s+([a-z]+))?\b/i;
const PASSIVE_NOUN_PATTERN = /^responsible for (?:the\s+)?(?:design and implementation|architecture and design|development and deployment)\s+of\b/i;
const PASSIVE_SIMPLE_RESPONSIBLE = /^responsible for (?:the\s+)?/i;
const FILLER_START_PATTERN = /^(?:hardworking|results[ -]driven|team[ -]player|fast[ -]learner|self[ -]starter|go[ -]getter)[,\s]+/i;

function optimizeBullet(bullet: string): { text: string; removedPlaceholder: boolean; cleanedPassive: boolean } {
  let text = bullet.trim();
  let cleanedPassive = false;

  // Strip leading bullet characters
  text = text.replace(/^[-*•o~+]\s*/, '').trim();

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

  // Remove leftover bracket placeholders
  text = text.replace(PLACEHOLDER_MARKERS_GLOBAL, ' ');

  // Clean passive openings to strong active voice
  if (PASSIVE_GERUND_PATTERN.test(text)) {
    text = text.replace(PASSIVE_GERUND_PATTERN, (_match, g1, g2) => {
      cleanedPassive = true;
      const p1 = GERUND_TO_PAST[g1.toLowerCase()] || (g1.charAt(0).toUpperCase() + g1.slice(1));
      if (g2) {
        const p2 = (GERUND_TO_PAST[g2.toLowerCase()] || g2).toLowerCase();
        return `${p1} and ${p2}`;
      }
      return p1;
    });
  } else if (PASSIVE_BASE_PATTERN.test(text)) {
    text = text.replace(PASSIVE_BASE_PATTERN, (_match, g1, g2) => {
      cleanedPassive = true;
      const p1 = BASE_TO_PAST[g1.toLowerCase()] || (g1.charAt(0).toUpperCase() + g1.slice(1));
      if (g2) {
        const p2 = (BASE_TO_PAST[g2.toLowerCase()] || g2).toLowerCase();
        return `${p1} and ${p2}`;
      }
      return p1;
    });
  } else if (PASSIVE_NOUN_PATTERN.test(text)) {
    cleanedPassive = true;
    text = text.replace(PASSIVE_NOUN_PATTERN, 'Designed and implemented');
  } else if (PASSIVE_SIMPLE_RESPONSIBLE.test(text)) {
    cleanedPassive = true;
    text = text.replace(PASSIVE_SIMPLE_RESPONSIBLE, '');
  }

  // Strip harsh filler adjectives at start of bullet
  if (FILLER_START_PATTERN.test(text)) {
    text = text.replace(FILLER_START_PATTERN, '');
  }

  // Whitespace and punctuation formatting
  text = text
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/[,;:]+\s*$/, '')
    .trim();

  if (text) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
    if (!/[.!?]$/.test(text)) text += '.';
  }

  return { text, removedPlaceholder, cleanedPassive };
}

/** Standardize bullet punctuation, clean passive openers and skills without adding fake facts. */
export function safelyOptimizeResume(resume: ResumeData): SafeOptimizationResult {
  let changedBullets = 0;
  let removedPlaceholderBullets = 0;
  let cleanedPassiveBullets = 0;

  const optimizeList = (bullets: string[]) => bullets.map((bullet) => {
    const result = optimizeBullet(bullet);
    if (result.text !== bullet) changedBullets++;
    if (result.removedPlaceholder) removedPlaceholderBullets++;
    if (result.cleanedPassive) cleanedPassiveBullets++;
    return result.text;
  });

  // Clean and deduplicate skills (case-insensitive deduplication)
  let cleanedSkillsCount = 0;
  const seenSkills = new Set<string>();
  const cleanedSkills: string[] = [];

  for (const s of resume.skills || []) {
    const trimmed = s.trim().replace(/^[-*•]\s*/, '');
    if (!trimmed) continue;
    const lower = trimmed.toLowerCase();
    if (!seenSkills.has(lower)) {
      seenSkills.add(lower);
      cleanedSkills.push(trimmed);
    } else {
      cleanedSkillsCount++;
    }
  }

  // Clean summary
  let cleanedSummary = resume.summary;
  if (cleanedSummary) {
    cleanedSummary = cleanedSummary
      .replace(/\s{2,}/g, ' ')
      .replace(/^(?:hardworking|results[ -]driven|team[ -]player)[,\s]+/i, '')
      .trim();
  }

  return {
    resume: {
      ...resume,
      skills: cleanedSkills,
      summary: cleanedSummary,
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
    removedPlaceholderBullets,
    cleanedPassiveBullets,
    cleanedSkillsCount
  };
}

