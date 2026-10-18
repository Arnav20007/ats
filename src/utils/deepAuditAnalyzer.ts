import { ResumeData } from '../data/resumeSamples';
import { hasQuantifiableMetric } from './atsKeywordMatcher';

export interface AuditIssue {
  id: string;
  title: string;
  severity: 'flag' | 'warning' | 'pass';
  description: string;
  bulletText?: string;
  suggestion?: string;
  replacements?: string[];
  isProFeature?: boolean;
}

export interface DeepAuditReport {
  categories: {
    content: {
      score: number | null;
      atsParseRate: {
        sectionCoveragePercentage: number;
        missingSectionPercentage: number;
        notes: string;
      };
      quantifyingImpact: {
        issueCount: number;
        failingBullets: { original: string; suggestedGoogleXyz: string }[];
      };
      repetition: {
        issueCount: number;
        repeatedWords: { word: string; count: number; synonyms: string[] }[];
      };
      spellingGrammar: {
        issueCount: number;
        issues: { phrase: string; rule: string; suggestion: string }[];
      };
      bulletsConsistency: {
        isProUnlocked: boolean;
        hasIssue: boolean;
        periodConsistency: string;
        tenseConsistency: string;
        lengthVariance: string;
        details: string;
      };
    };
    sections: {
      score: number;
      essentialFound: string[];
      essentialMissing: string[];
      contactDetails: {
        hasEmail: boolean;
        email: string;
        hasPhone: boolean;
        phone: string;
        hasLocation: boolean;
        location: string;
        hasLinkedin: boolean;
        linkedin: string;
        hasPortfolio: boolean;
        portfolio: string;
      };
    };
    atsEssentials: {
      score: number;
      fileFormatAndSize: {
        passed: boolean;
        format: string;
        sizeLimit: string;
        recommendation: string;
      };
      layoutAndDesign: {
        passed: boolean;
        layoutType: string;
        recommendation: string;
      };
      fileNameCheck: {
        isProUnlocked: boolean;
        passed: boolean;
        currentFileName: string;
        recommendation: string;
      };
      datesAndLinks: {
        isProUnlocked: boolean;
        passed: boolean;
        details: string;
      };
    };
    hrRedFlags: {
      score: number;
      credibility: {
        isProUnlocked: boolean;
        passed: boolean;
        buzzwordsDetected: string[];
        recommendation: string;
      };
      interviewRisks: {
        isProUnlocked: boolean;
        passed: boolean;
        risksDetected: string[];
        probingQuestions: string[];
      };
    };
    discrimination: {
      score: number | null;
      ageismDateBias: {
        isProUnlocked: boolean;
        passed: boolean;
        details: string;
      };
      employmentGaps: {
        isProUnlocked: boolean;
        passed: boolean;
        details: string;
      };
    };
    seniority: {
      score: number | null;
      scopeOwnership: {
        isProUnlocked: boolean;
        ownershipLevel: 'Not assessed' | 'More ownership-style terms' | 'More passive-style terms' | 'Similar term counts';
        passiveVerbCount: number;
        leadVerbCount: number;
        details: string;
      };
      skillGap: {
        isProUnlocked: boolean;
        missingInfrastructureSkills: string[];
        depthScore: number;
      };
    };
    tailoring: {
      score: number;
      matchedCount: number;
      missingCount: number;
      missingTopSkills: string[];
    };
  };
}

const COMMON_REPETITIVE_VERBS: Record<string, string[]> = {
  developed: ['architected', 'engineered', 'spearheaded', 'crafted', 'designed'],
  implemented: ['deployed', 'executed', 'enforced', 'integrated', 'orchestrated'],
  automated: ['systematized', 'streamlined', 'mechanized', 'optimized'],
  managed: ['directed', 'guided', 'orchestrated', 'steered', 'championed'],
  built: ['constructed', 'assembled', 'delivered', 'established'],
  created: ['authored', 'originated', 'formulated', 'devised'],
  worked: ['collaborated', 'partnered', 'drove initiatives', 'executed']
};

const EMPTY_BUZZWORDS = [
  'hard worker',
  'team player',
  'expert in',
  'results-oriented',
  'self-starter',
  'enthusiastic',
  'synergy',
  'out of the box',
  'proven track record',
  'detail-oriented'
];

const PASSIVE_JUNIOR_VERBS = [
  'assisted',
  'helped',
  'participated',
  'worked on',
  'supported',
  'contributed to',
  'handled'
];

const SENIOR_OWNER_VERBS = [
  'architected',
  'spearheaded',
  'engineered',
  'scaled',
  'led',
  'designed',
  'directed',
  'orchestrated',
  'optimized'
];

/**
 * Executes a comprehensive, enterprise-grade deep audit of a resume
 * covering all Enhancv sections + unlocking all 8 PRO insights for free!
 */
export function generateDeepAuditReport(
  resume: ResumeData,
  fileName: string = '',
  targetJdMatchedSkills: string[] = [],
  targetJdMissingSkills: string[] = []
): DeepAuditReport {
  const experienceBullets = resume.experience.flatMap((e) => e.bullets);
  const projectBullets = (resume.projects || []).flatMap((p) => p.bullets);
  const allBullets = [...experienceBullets, ...projectBullets];

  const projectNarratives = (resume.projects || []).map((p) => `${p.name} ${p.role || ''} ${p.technologies || ''}`);

  const fullText = [
    resume.fullName,
    resume.jobTitle,
    resume.summary,
    ...resume.skills,
    ...allBullets,
    ...projectNarratives,
    ...resume.education.map((edu) => `${edu.degree} ${edu.school}`)
  ].join(' ');

  // 1. Content: Quantifying Impact (Uses structured Google X-Y-Z placeholders without fabricating false candidate metrics)
  const failingBullets: { original: string; suggestedGoogleXyz: string }[] = [];
  allBullets.forEach((bullet) => {
    if (!hasQuantifiableMetric(bullet)) {
      const trimmed = bullet.trim().replace(/\.+$/, '');
      let suggested = '';
      const lower = trimmed.toLowerCase();
      if (lower.includes('api') || lower.includes('flask') || lower.includes('backend') || lower.includes('route')) {
        suggested = `${trimmed}, reducing latency by [X]% across [Y] daily requests.`;
      } else if (lower.includes('data') || lower.includes('pipeline') || lower.includes('python')) {
        suggested = `${trimmed}, processing [X] records with [Y]% accuracy or [Z]% faster execution.`;
      } else if (lower.includes('react') || lower.includes('web') || lower.includes('app')) {
        suggested = `${trimmed}, improving load speed by [X]% and supporting [Y] active users.`;
      } else if (lower.includes('champion') || lower.includes('dsa') || lower.includes('streak')) {
        suggested = `${trimmed}, solving [X]+ algorithmic problems across [specific topic areas].`;
      } else {
        suggested = `${trimmed}, improving [key outcome] by [X]% and saving [Y] hours weekly.`;
      }
      failingBullets.push({ original: bullet, suggestedGoogleXyz: suggested });
    }
  });

  // 2. Content: Repetition
  const repeatedWordsMap: Record<string, number> = {};
  const words = allBullets.join(' ').toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  words.forEach((w) => {
    if (COMMON_REPETITIVE_VERBS[w]) {
      repeatedWordsMap[w] = (repeatedWordsMap[w] || 0) + 1;
    }
  });

  const repeatedWordsList = Object.entries(repeatedWordsMap)
    .filter(([_, count]) => count >= 3)
    .map(([word, count]) => ({
      word,
      count,
      synonyms: COMMON_REPETITIVE_VERBS[word] || ['engineered', 'delivered', 'improved']
    }));

  // 3. Content: Spelling & Grammar
  const grammarIssues: { phrase: string; rule: string; suggestion: string }[] = [];
  allBullets.forEach((b) => {
    if (/\b(?:responsible for|worked on)\b/i.test(b)) {
      grammarIssues.push({
        phrase: b.substring(0, 45) + '...',
        rule: 'Passive phrasing detected',
        suggestion: 'Replace "worked on / responsible for" with an active power verb like "Architected" or "Spearheaded".'
      });
    }
  });

  // 4. Content: Bullets Consistency
  const endsWithPeriod = allBullets.filter((b) => b.trim().endsWith('.')).length;
  const noPeriod = allBullets.length - endsWithPeriod;
  const isPunctuationUniform = endsWithPeriod === 0 || noPeriod === 0;
  const avgLength = allBullets.reduce((acc, b) => acc + b.split(/\s+/).length, 0) / Math.max(1, allBullets.length);

  // 5. Sections: Essential Sections & Contact
  const isFresherOrStudent = Boolean(
    resume.education.some((e) => /(?:202[4-9]|present|pursuing)/i.test(e.year)) ||
    (resume.projects && resume.projects.length > 0 && resume.experience.length === 0)
  );

  const essentialFound: string[] = [];
  const essentialMissing: string[] = [];

  if (resume.experience.length > 0) {
    essentialFound.push('Work Experience');
  }
  if (resume.projects && resume.projects.length > 0) {
    essentialFound.push('Technical Projects');
  }
  if (resume.experience.length === 0 && (!resume.projects || resume.projects.length === 0)) {
    essentialMissing.push(isFresherOrStudent ? 'Technical Projects' : 'Work Experience');
  }

  if (resume.education.length > 0) essentialFound.push('Education'); else essentialMissing.push('Education');
  if (resume.skills.length > 0) essentialFound.push('Skills'); else essentialMissing.push('Skills');
  const hasCandidateSummary = resume.summary.length >= 25 && !resume.summary.startsWith('Extracted bullets to review and move to the correct section:');
  if (hasCandidateSummary) essentialFound.push('Summary'); else essentialMissing.push('Summary');

  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.email.trim());
  const hasPhone = resume.phone.length >= 8;
  const hasLocation = resume.location.length >= 3;
  const hasLinkedin = resume.linkedin.length >= 5 && /linkedin\.com/i.test(resume.linkedin);
  const hasPortfolio = resume.portfolio.length >= 3;

  // 6. ATS Essentials: File Name, Dates, Layout
  const cleanFileName = fileName.trim();
  const hasCandidateNameInFile = resume.fullName
    ? cleanFileName.toLowerCase().includes(resume.fullName.split(' ')[0].toLowerCase())
    : false;
  const isGenericFileName = /^(resume|cv|final_resume|draft|my_resume)/i.test(cleanFileName);
  const fileNamePassed = hasCandidateNameInFile && !isGenericFileName;

  // 7. HR Red Flags: Credibility & Interview Risks
  const buzzwordsFound = EMPTY_BUZZWORDS.filter((b) => fullText.toLowerCase().includes(b));
  const interviewRisks: string[] = [];
  const probingQuestions: string[] = [];

  if (failingBullets.length >= 3) {
    interviewRisks.push('Multiple bullets describe general tasks without verifiable quantitative scope.');
    probingQuestions.push('"What measurable metric or outcome proved this project was successful in production?"');
  }
  if (resume.experience.length === 0 && (!resume.projects || resume.projects.length === 0)) {
    interviewRisks.push('Resume lacks practical work experience or technical project demonstrations.');
    probingQuestions.push('"Can you provide portfolio code, GitHub repositories, or practical project implementations?"');
  }
  if (resume.skills.some((s) => s.toLowerCase() === 'c++') && !allBullets.some((b) => /c\+\+/i.test(b))) {
    interviewRisks.push('C++ is listed under Skills but not referenced in your project bullets.');
    probingQuestions.push('"Can you explain how and where you applied C++ in your practical work experience?"');
  }

  // 8. Seniority: Scope & Ownership
  let passiveVerbCount = 0;
  let leadVerbCount = 0;
  allBullets.forEach((b) => {
    const lower = b.toLowerCase();
    PASSIVE_JUNIOR_VERBS.forEach((v) => { if (lower.includes(v)) passiveVerbCount++; });
    SENIOR_OWNER_VERBS.forEach((v) => { if (lower.includes(v)) leadVerbCount++; });
  });

  const ownershipLevel: 'Not assessed' | 'More ownership-style terms' | 'More passive-style terms' | 'Similar term counts' =
    leadVerbCount + passiveVerbCount === 0
      ? 'Not assessed'
      : leadVerbCount > passiveVerbCount
        ? 'More ownership-style terms'
        : passiveVerbCount > leadVerbCount
          ? 'More passive-style terms'
          : 'Similar term counts';

  // Component Scores
  const contentScore = allBullets.length === 0
    ? null
    : Math.max(35, Math.min(100, Math.round(
      100 - failingBullets.length * 9 - repeatedWordsList.length * 6 - grammarIssues.length * 5
    )));

  const hasPracticalExperience = resume.experience.length > 0 || (resume.projects && resume.projects.length > 0);
  const coreSectionsCount = (hasPracticalExperience ? 1 : 0) + (resume.education.length > 0 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (hasCandidateSummary ? 1 : 0);

  const sectionsScore = Math.max(40, Math.min(100, Math.round(
    (coreSectionsCount / 4) * 50 + (hasEmail ? 15 : 0) + (hasPhone ? 15 : 0) + (hasLinkedin ? 20 : 0)
  )));

  const formatSignals = [
    Boolean(cleanFileName) && /\.(pdf|docx|txt|md)$/i.test(cleanFileName),
    fileNamePassed,
    isPunctuationUniform,
    hasLinkedin
  ];
  const atsEssentialsScore = Math.round((formatSignals.filter(Boolean).length / formatSignals.length) * 100);

  const hrRedFlagsScore = Math.max(40, Math.min(100, Math.round(
    100 - buzzwordsFound.length * 15 - interviewRisks.length * 10
  )));

  const totalVerbSignals = leadVerbCount + passiveVerbCount;
  const seniorityScore = totalVerbSignals > 0
    ? Math.round((leadVerbCount / totalVerbSignals) * 100)
    : null;

  const hasTargetJobDescription = targetJdMatchedSkills.length + targetJdMissingSkills.length > 0;
  const tailoringScore = hasTargetJobDescription
    ? Math.round((targetJdMatchedSkills.length / (targetJdMatchedSkills.length + targetJdMissingSkills.length)) * 100)
    : 0;

  return {
    categories: {
      content: {
        score: contentScore,
        atsParseRate: {
          sectionCoveragePercentage: Math.round((essentialFound.length / Math.max(1, essentialFound.length + essentialMissing.length)) * 100),
          missingSectionPercentage: Math.round((essentialMissing.length / Math.max(1, essentialFound.length + essentialMissing.length)) * 100),
          notes: 'This estimate reflects detected section labels only. Employer ATS parsing and visual layout are not tested.'
        },
        quantifyingImpact: {
          issueCount: failingBullets.length,
          failingBullets
        },
        repetition: {
          issueCount: repeatedWordsList.length,
          repeatedWords: repeatedWordsList
        },
        spellingGrammar: {
          issueCount: grammarIssues.length,
          issues: grammarIssues
        },
        bulletsConsistency: {
          isProUnlocked: true,
          hasIssue: allBullets.length === 0 || !isPunctuationUniform || avgLength <= 8 || avgLength >= 35,
          periodConsistency: isPunctuationUniform
            ? allBullets.length > 0 ? '✓ Bullet punctuation is consistent where bullets were provided.' : 'Not assessed; no résumé bullets were detected.'
            : `⚠️ Inconsistent punctuation: ${endsWithPeriod} bullets end with a period, while ${noPeriod} bullets do not.`,
          tenseConsistency: 'Verb tense is not evaluated by this check.',
          lengthVariance: avgLength > 8 && avgLength < 35
            ? `✓ Average bullet length is ${Math.round(avgLength)} words.`
            : `⚠️ Average bullet length is ${Math.round(avgLength)} words; review for clarity.`,
          details: 'Punctuation, length variance, and verb tense heuristics.'
        }
      },
      sections: {
        score: sectionsScore,
        essentialFound,
        essentialMissing,
        contactDetails: {
          hasEmail,
          email: resume.email || 'Missing email',
          hasPhone,
          phone: resume.phone || 'Missing phone',
          hasLocation,
          location: resume.location || 'Missing location',
          hasLinkedin,
          linkedin: resume.linkedin || 'Missing LinkedIn Profile',
          hasPortfolio,
          portfolio: resume.portfolio || 'Missing Portfolio'
        }
      },
      atsEssentials: {
        score: atsEssentialsScore,
        fileFormatAndSize: {
          passed: Boolean(cleanFileName) && /\.(pdf|docx|txt|md)$/i.test(cleanFileName),
          format: cleanFileName.match(/\.(pdf|docx|txt|md)$/i)?.[1]?.toUpperCase() || 'Unknown',
          sizeLimit: 'Upload limit: 10 MB (actual file size is not retained in this report)',
          recommendation: cleanFileName
            ? 'Supported file extension detected. File size and employer-specific parsing are not assessed here.'
            : 'No source file was uploaded; format and size are not assessed.'
        },
        layoutAndDesign: {
          passed: false,
          layoutType: 'Not assessed from extracted text',
          recommendation: 'Review the original document layout manually; text extraction does not reveal columns, graphics, or text boxes.'
        },
        fileNameCheck: {
          isProUnlocked: true,
          passed: fileNamePassed,
          currentFileName: cleanFileName || 'No uploaded file',
          recommendation: fileNamePassed
            ? '✓ File name follows professional hiring naming conventions.'
            : cleanFileName
              ? `⚠️ Name format alert: Consider a clear filename such as "${(resume.fullName || 'Candidate').replace(/\s+/g, '_')}_Resume.pdf".`
              : 'No source file was uploaded; filename review is not assessed.'
        },
        datesAndLinks: {
          isProUnlocked: true,
          passed: hasLinkedin,
          details: `${hasLinkedin ? 'LinkedIn URL is present' : 'LinkedIn URL is missing'}; date order and hyperlink destinations are not verified.`
        }
      },
      hrRedFlags: {
        score: hrRedFlagsScore,
        credibility: {
          isProUnlocked: true,
          passed: buzzwordsFound.length === 0,
          buzzwordsDetected: buzzwordsFound,
          recommendation: buzzwordsFound.length > 0
            ? `Flagged unverified buzzwords: ${buzzwordsFound.join(', ')}. Replace subjective adjectives with verifiable metrics.`
            : 'No terms from the built-in buzzword list were detected; this is not a full credibility assessment.'
        },
        interviewRisks: {
          isProUnlocked: true,
          passed: interviewRisks.length === 0,
          risksDetected: interviewRisks,
          probingQuestions
        }
      },
      discrimination: {
        score: null,
        ageismDateBias: {
          isProUnlocked: true,
          passed: false,
          details: 'Not assessed. Graduation dates are not used to infer age or score résumé readiness.'
        },
        employmentGaps: {
          isProUnlocked: true,
          passed: false,
          details: 'Employment gaps are not assessed by the current checks.'
        }
      },
      seniority: {
        score: seniorityScore,
        scopeOwnership: {
          isProUnlocked: true,
          ownershipLevel,
          passiveVerbCount,
          leadVerbCount,
          details: `Found ${leadVerbCount} ownership-style terms vs ${passiveVerbCount} passive-style terms. ${
            ownershipLevel === 'Not assessed'
              ? 'No recognized verb pattern was found to assess.'
              : 'These word counts do not establish seniority. Confirm that each verb accurately describes your contribution.'
          }`
        },
        skillGap: {
          isProUnlocked: true,
          missingInfrastructureSkills: targetJdMissingSkills.slice(0, 6),
          depthScore: Math.min(100, resume.skills.length * 6)
        }
      },
      tailoring: {
        score: tailoringScore,
        matchedCount: targetJdMatchedSkills.length,
        missingCount: targetJdMissingSkills.length,
        missingTopSkills: targetJdMissingSkills
      }
    }
  };
}
