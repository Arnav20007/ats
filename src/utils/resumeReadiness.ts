import type { ResumeData } from '../data/resumeSamples';
import { hasQuantifiableMetric } from './atsKeywordMatcher';

export interface ResumeReadinessCheck {
  id: string;
  title: string;
  detail: string;
  points: number;
  maxPoints: number;
}

const REVIEW_BULLET_PREFIX = 'Extracted bullets to review and move to the correct section:';
const ACTION_VERBS = new Set([
  'achieved', 'automated', 'built', 'created', 'designed', 'developed', 'delivered',
  'engineered', 'implemented', 'improved', 'increased', 'launched', 'led', 'managed',
  'optimized', 'reduced', 'streamlined', 'tested'
]);
const FILLER_PHRASES = /\b(?:responsible for|duties included|duties include|team player|hard[- ]working|results[- ]oriented|go[- ]getter)\b/gi;

function countWords(text: string): number {
  return (text.match(/\b[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*\b/gu) || []).length;
}

export function calculateResumeReadiness(resume: ResumeData): {
  score: number;
  wordCount: number;
  bulletCount: number;
  bulletsWithMetricsCount: number;
  actionVerbCount: number;
  checks: ResumeReadinessCheck[];
} {
  const isReviewBulletNote = resume.summary.startsWith(REVIEW_BULLET_PREFIX);
  const reviewBullets = isReviewBulletNote
    ? resume.summary.split('\n').filter((line) => /^[•\-*▪▫‣–—]\s*/.test(line)).map((line) => line.replace(/^[•\-*▪▫‣–—]\s*/, '').trim())
    : [];
  const bullets = [
    ...resume.experience.flatMap((entry) => entry.bullets),
    ...(resume.projects || []).flatMap((project) => project.bullets),
    ...reviewBullets
  ].filter(Boolean);
  const bulletsWithMetricsCount = bullets.filter(hasQuantifiableMetric).length;
  const actionVerbCount = new Set(
    bullets.map((bullet) => bullet.trim().match(/^(?:[•\-*▪▫‣–—]\s*)?([a-z]+)/i)?.[1]?.toLowerCase() || '')
      .filter((verb) => ACTION_VERBS.has(verb))
  ).size;
  const resumeText = [
    resume.fullName, resume.jobTitle, resume.email, resume.phone, resume.location,
    resume.linkedin, resume.portfolio,
    isReviewBulletNote ? resume.summary.replace(REVIEW_BULLET_PREFIX, '') : resume.summary,
    ...resume.skills,
    ...resume.experience.flatMap((entry) => [entry.role, entry.company, entry.location, entry.startDate, entry.endDate, ...entry.bullets]),
    ...(resume.projects || []).flatMap((project) => [project.name, project.role || '', project.technologies || '', project.startDate || '', project.endDate || '', ...project.bullets]),
    ...resume.education.flatMap((entry) => [entry.degree, entry.school, entry.location, entry.year])
  ].filter(Boolean).join(' ');
  const wordCount = countWords(resumeText);
  const sectionCount = Number(resume.experience.length > 0) + Number(resume.education.length > 0) + Number(resume.skills.length > 0);
  const contactPoints = (resume.email.trim() ? 10 : 0) + (resume.phone.trim().length > 7 ? 10 : 0);
  const sectionPoints = Math.round((sectionCount / 3) * 20);
  const lengthPoints = wordCount >= 250 && wordCount <= 1000 ? 10
    : wordCount >= 150 && wordCount < 250 || wordCount > 1000 && wordCount <= 1200 ? 7
      : wordCount >= 80 && wordCount < 150 || wordCount > 1200 && wordCount <= 1500 ? 4
        : 0;
  const bulletPoints = bullets.length >= 3 ? 10 : bullets.length > 0 ? 5 : 0;
  const metricPoints = bulletsWithMetricsCount >= 4 ? 15 : bulletsWithMetricsCount >= 2 ? 10 : bulletsWithMetricsCount === 1 ? 5 : 0;
  const actionPoints = actionVerbCount >= 6 ? 15 : actionVerbCount === 5 ? 14 : actionVerbCount === 4 ? 12 : actionVerbCount * 3;
  const fillerCount = Array.from(resumeText.matchAll(FILLER_PHRASES)).length;
  const fillerPoints = fillerCount === 0 ? 10 : fillerCount <= 2 ? 5 : 0;

  const checks: ResumeReadinessCheck[] = [
    { id: 'contact', title: 'Contact details', detail: `${resume.email.trim() ? 'Email found' : 'Email missing'} · ${resume.phone.trim().length > 7 ? 'phone found' : 'phone missing'}`, points: contactPoints, maxPoints: 20 },
    { id: 'headings', title: 'Standard section headings', detail: `${sectionCount} of 3: Experience, Education, Skills`, points: sectionPoints, maxPoints: 20 },
    { id: 'length', title: 'Résumé length', detail: `${wordCount} words`, points: lengthPoints, maxPoints: 10 },
    { id: 'bullets', title: 'Achievement bullets', detail: `${bullets.length} bullets detected`, points: bulletPoints, maxPoints: 10 },
    { id: 'metrics', title: 'Quantified results', detail: `${bulletsWithMetricsCount} bullet${bulletsWithMetricsCount === 1 ? '' : 's'} with measurable details`, points: metricPoints, maxPoints: 15 },
    { id: 'action-verbs', title: 'Strong action verbs', detail: `${actionVerbCount} distinct recognized action verbs`, points: actionPoints, maxPoints: 15 },
    { id: 'filler', title: 'Weak filler phrases', detail: fillerCount === 0 ? 'No flagged phrases found' : `${fillerCount} flagged phrase${fillerCount === 1 ? '' : 's'} found`, points: fillerPoints, maxPoints: 10 }
  ];

  return {
    score: checks.reduce((total, check) => total + check.points, 0),
    wordCount,
    bulletCount: bullets.length,
    bulletsWithMetricsCount,
    actionVerbCount,
    checks
  };
}
