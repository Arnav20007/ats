/**
 * Résumé and target-job skill term comparison
 * 
 * Features:
 * - Word boundary safe matching (e.g. 'Go' never matches 'Google' or 'good')
 * - Full alias & synonym dictionary (e.g. 'Postgres' matches 'PostgreSQL', 'CI/CD' matches 'CI/CD Pipelines')
 * - Symbol safe regex (C++, C#, .NET, Node.js)
 * - Section tracking (knows if keyword was found in Skills, Experience, or Summary)
 * - Deduplication (repeating a keyword 10 times in resume counts as 1 unique match)
 */

export interface SkillDefinition {
  canonical: string;
  aliases: string[];
  category: 'languages' | 'frameworks' | 'backend' | 'cloud' | 'data' | 'architecture' | 'practices' | 'business';
}

export const SKILL_DEFINITIONS: SkillDefinition[] = [
  // Programming Languages
  { canonical: 'TypeScript', aliases: ['typescript', 'ts'], category: 'languages' },
  { canonical: 'JavaScript', aliases: ['javascript', 'js', 'ecmascript'], category: 'languages' },
  { canonical: 'Go', aliases: ['go', 'golang'], category: 'languages' },
  { canonical: 'Python', aliases: ['python', 'python3', 'py'], category: 'languages' },
  { canonical: 'Java', aliases: ['java', 'jdk', 'jvm'], category: 'languages' },
  { canonical: 'C++', aliases: ['c++', 'cpp'], category: 'languages' },
  { canonical: 'C#', aliases: ['c#', 'csharp', 'c-sharp'], category: 'languages' },
  { canonical: 'Rust', aliases: ['rust'], category: 'languages' },
  { canonical: 'SQL', aliases: ['sql', 't-sql', 'pl/sql'], category: 'languages' },

  // Frontend & Frameworks
  { canonical: 'React', aliases: ['react', 'react.js', 'reactjs'], category: 'frameworks' },
  { canonical: 'Next.js', aliases: ['next.js', 'nextjs', 'next'], category: 'frameworks' },
  { canonical: 'Vue', aliases: ['vue', 'vue.js', 'vuejs'], category: 'frameworks' },
  { canonical: 'Angular', aliases: ['angular', 'angularjs'], category: 'frameworks' },
  { canonical: 'Tailwind CSS', aliases: ['tailwind css', 'tailwind'], category: 'frameworks' },

  // Backend & Runtime
  { canonical: 'Node.js', aliases: ['node.js', 'nodejs', 'node'], category: 'backend' },
  { canonical: 'REST APIs', aliases: ['rest apis', 'rest api', 'restful api', 'restful apis', 'restful'], category: 'backend' },
  { canonical: 'GraphQL', aliases: ['graphql', 'apollo graphql'], category: 'backend' },
  { canonical: 'WebSockets', aliases: ['websockets', 'websocket'], category: 'backend' },

  // Databases & Streaming
  { canonical: 'PostgreSQL', aliases: ['postgresql', 'postgres', 'psql'], category: 'data' },
  { canonical: 'MySQL', aliases: ['mysql'], category: 'data' },
  { canonical: 'MongoDB', aliases: ['mongodb', 'mongo'], category: 'data' },
  { canonical: 'Redis', aliases: ['redis', 'redis cache'], category: 'data' },
  { canonical: 'Kafka', aliases: ['kafka', 'apache kafka'], category: 'data' },
  { canonical: 'Vector Databases', aliases: ['vector databases', 'vector db', 'pinecone', 'milvus', 'weaviate'], category: 'data' },

  // Cloud & DevOps
  { canonical: 'Docker', aliases: ['docker', 'dockerfile', 'containerization', 'containers'], category: 'cloud' },
  { canonical: 'Kubernetes', aliases: ['kubernetes', 'k8s'], category: 'cloud' },
  { canonical: 'AWS', aliases: ['aws', 'amazon web services', 'ecs', 's3', 'rds', 'lambda', 'ec2'], category: 'cloud' },
  { canonical: 'Google Cloud', aliases: ['google cloud', 'gcp', 'google cloud platform'], category: 'cloud' },
  { canonical: 'Azure', aliases: ['azure', 'microsoft azure'], category: 'cloud' },
  { canonical: 'CI/CD Pipelines', aliases: ['ci/cd pipelines', 'ci/cd', 'continuous integration', 'continuous delivery', 'github actions', 'gitlab ci', 'jenkins'], category: 'cloud' },

  // Architecture & Engineering Concepts
  { canonical: 'Distributed Systems', aliases: ['distributed systems', 'distributed computing', 'distributed architecture'], category: 'architecture' },
  { canonical: 'Microservices', aliases: ['microservices', 'microservice', 'micro-services', 'microservice architecture'], category: 'architecture' },
  { canonical: 'System Architecture', aliases: ['system architecture', 'software architecture', 'system design', 'technical architecture'], category: 'architecture' },
  { canonical: 'Performance Optimization', aliases: ['performance optimization', 'latency optimization', 'latency reduction', 'query optimization'], category: 'architecture' },
  { canonical: 'Security', aliases: ['security', 'cybersecurity', 'owasp', 'authentication', 'oauth', 'jwt'], category: 'architecture' },

  // AI & Emerging Tech
  { canonical: 'PyTorch', aliases: ['pytorch', 'torch'], category: 'architecture' },
  { canonical: 'LLMs', aliases: ['llms', 'llm', 'large language models'], category: 'architecture' },
  { canonical: 'RAG', aliases: ['rag', 'retrieval-augmented generation'], category: 'architecture' },

  // Methodologies
  { canonical: 'Agile', aliases: ['agile', 'scrum', 'kanban', 'sprint planning'], category: 'practices' },
  { canonical: 'Unit Testing', aliases: ['unit testing', 'test driven development', 'tdd', 'jest', 'vitest'], category: 'practices' },
  { canonical: 'Git', aliases: ['git', 'github', 'gitlab'], category: 'practices' },
  { canonical: 'Linux', aliases: ['linux', 'unix', 'ubuntu', 'bash'], category: 'practices' },
  { canonical: 'Mentoring', aliases: ['mentoring', 'mentorship', 'engineering leadership', 'code reviews'], category: 'practices' },

  // Business & Finance
  { canonical: 'FP&A', aliases: ['fp&a', 'financial planning and analysis', 'financial modeling'], category: 'business' },
  { canonical: 'P&L Management', aliases: ['p&l management', 'p&l', 'profit and loss'], category: 'business' },
  { canonical: 'EBITDA', aliases: ['ebitda', 'ebitda optimization'], category: 'business' },
];

/**
 * Escapes regex special characters safely
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks if a specific alias exists in the text with rigorous boundary checks.
 * Prevents false positives like 'Go' in 'good' or 'C' in 'cloud'.
 */
export function checkAliasMatch(text: string, alias: string): boolean {
  const cleanAlias = alias.trim().toLowerCase();
  if (!cleanAlias) return false;

  // Short language handles: Go, R, C
  if (cleanAlias === 'go') {
    const goRegex = /(?:^|[\s,;:(/])go(?:[\s,;:)./?!]|$)/i;
    const golangRegex = /\bgolang\b/i;
    return (goRegex.test(text) && !/\bgo-to-market\b/i.test(text)) || golangRegex.test(text);
  }

  if (cleanAlias === 'c++') {
    const cppRegex = /(?:^|[^a-zA-Z0-9])c\+\+(?:[^a-zA-Z0-9]|$)/i;
    return cppRegex.test(text);
  }

  if (cleanAlias === 'c#') {
    const csRegex = /(?:^|[^a-zA-Z0-9])c#(?:[^a-zA-Z0-9]|$)/i;
    return csRegex.test(text);
  }

  if (cleanAlias === '.net') {
    const dotnetRegex = /(?:^|[^a-zA-Z0-9])\.net(?:[^a-zA-Z0-9]|$)/i;
    return dotnetRegex.test(text);
  }

  if (cleanAlias === 'sql') {
    return /\bsql\b/i.test(text);
  }

  if (cleanAlias === 'r') {
    return /(?:^|[\s,;:(/])r(?:[\s,;:)./?!]|$)/i.test(text);
  }

  // Multi-word aliases (e.g. "ci/cd pipelines", "distributed systems")
  const escaped = escapeRegex(cleanAlias);
  const boundaryRegex = new RegExp(`(?:^|[^a-zA-Z0-9])${escaped}(?:[^a-zA-Z0-9]|$)`, 'i');
  return boundaryRegex.test(text);
}

/**
 * Checks if a SkillDefinition is present in a given text block
 */
export function isSkillInText(skill: SkillDefinition, text: string): boolean {
  if (checkAliasMatch(text, skill.canonical)) return true;
  return skill.aliases.some((alias) => checkAliasMatch(text, alias));
}

export interface MatchAnalysisResult {
  matchedKeywords: Array<{
    canonical: string;
    foundIn: ('skills' | 'experience' | 'summary' | 'title')[];
  }>;
  missingKeywords: Array<{
    canonical: string;
    category: string;
  }>;
  totalJdKeywords: number;
  matchRate: number; // 0 to 100
  scopeDescription: string;
}

/**
 * Heuristic keyword comparison
 * 
 * 1. Finds recognized skills from the supplied Job Description
 * 2. Scans across Skills, Experience bullets, Summary, and Title separately
 * 3. Deduplicates so repeating a keyword never inflates the score
 * 4. Returns transparent match counts and locations
 */
export function analyzeAtsKeywords(
  targetJd: string,
  resume: {
    fullName: string;
    jobTitle: string;
    summary: string;
    skills: string[];
    experienceBullets: string[];
  }
): MatchAnalysisResult {
  const jdText = targetJd || '';

  // 1. Identify which skills are requested in Job Description
  const requiredSkills = SKILL_DEFINITIONS.filter((skill) => isSkillInText(skill, jdText));

  const activeSkillsList = requiredSkills;

  const skillsText = resume.skills.join(' ');
  const expText = resume.experienceBullets.join(' ');
  const summaryText = resume.summary || '';
  const titleText = resume.jobTitle || '';

  const matchedKeywords: MatchAnalysisResult['matchedKeywords'] = [];
  const missingKeywords: MatchAnalysisResult['missingKeywords'] = [];

  for (const skill of activeSkillsList) {
    const locations: ('skills' | 'experience' | 'summary' | 'title')[] = [];

    if (isSkillInText(skill, skillsText)) locations.push('skills');
    if (isSkillInText(skill, expText)) locations.push('experience');
    if (isSkillInText(skill, summaryText)) locations.push('summary');
    if (isSkillInText(skill, titleText)) locations.push('title');

    if (locations.length > 0) {
      matchedKeywords.push({
        canonical: skill.canonical,
        foundIn: locations
      });
    } else {
      missingKeywords.push({
        canonical: skill.canonical,
        category: skill.category
      });
    }
  }

  const totalJdKeywords = activeSkillsList.length;
  const matchRate = Math.round((matchedKeywords.length / Math.max(1, totalJdKeywords)) * 100);

  return {
    matchedKeywords,
    missingKeywords,
    totalJdKeywords,
    matchRate,
    scopeDescription: 'Recognized skill terms compared across résumé skills, experience and project bullets, summary, and title. Other job-description phrases are not scored.'
  };
}

/**
 * Detects whether a bullet point contains measurable metrics (Google X-Y-Z formula)
 * Recognizes percentages, latency (ms), storage (GB/TB), currencies ($/€/£/₹),
 * scale numbers (65M+, 18,000, 3.5M DAU, 45,000 concurrent), multipliers (3x),
 * timeframes (72-hour, 2 weeks), and team sizes (team of 8, 18+ engineers).
 */
export const QUANTIFIABLE_METRIC_REGEX = /(?:\b\d+(\.\d+)?%|\b\d+\s*percent|[\$€£₹]\s*\d+([.,]\d+)?[kKmMbB]?|\b\d+([.,]\d+)?\s*(?:[kKmMbB]|[tTgGmMkK][bB])\+?|\b\d+x\b|\b\d+(\.\d+)?[\s-]*(?:ms|milliseconds|seconds|day|days|weeks|months|years)\b|\b\d+([.,]\d+)?\+?\s*(?:qps|rps|tps|dau|mau|records|requests|users|events|streams|cases|tests|variants|problems)\b|\b\d+([.,]\d+)?\+?\s+(?:(?:controlled|synthetic|unique|total|test|daily|monthly|active|concurrent|customer|vendor|business|production|dsa)\s+){0,3}(?:variants|problems|records|requests|users|events|streams|cases|tests|customers|transactions)\b|\b(?:team of \d+|\d+\+?\s*(?:engineers|developers|reports|members))\b|\b\d{1,3}(?:,\d{3})+\b)/i;

export function hasQuantifiableMetric(text: string): boolean {
  if (!text) return false;
  return QUANTIFIABLE_METRIC_REGEX.test(text);
}

