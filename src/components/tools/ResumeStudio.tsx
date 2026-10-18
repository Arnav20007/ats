import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  ResumeData,
  ResumeExperience,
  ResumeEducation,
  ResumeProject,
  SAMPLE_RESUMES,
  BLANK_STARTER_RESUME,
  STARTER_ROLE_TEMPLATES
} from '../../data/resumeSamples';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Download,
  Plus,
  Trash2,
  FileText,
  ShieldCheck,
  Search,
  Check,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Flag,
  PenTool,
  CheckCircle,
  Zap,
  Award,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FileCheck,
  Target,
  BarChart2,
  Info,
  Lock,
  Unlock,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useToast } from '../Toast';
import { CompetitorBenchmark } from '../CompetitorBenchmark';
import { ResumeFaq } from '../ResumeFaq';
import { prepareResumeImport } from '../../utils/resumeImport';
import { analyzeAtsKeywords, hasQuantifiableMetric } from '../../utils/atsKeywordMatcher';
import { generateDeepAuditReport, DeepAuditReport } from '../../utils/deepAuditAnalyzer';
import { safelyOptimizeResume } from '../../utils/resumeOptimizer';
import { useResumeSession } from '../../context/ResumeSessionContext';

interface ResumeStudioProps {
  onActionLogged?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenGuide?: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
}

export const ResumeStudio: React.FC<ResumeStudioProps> = ({
  onActionLogged,
  onOpenPrivacy,
  onOpenTerms,
  onOpenGuide,
  onOpenAbout,
  onOpenContact,
}) => {
  const { showToast } = useToast();

  // Mode: 'landing' (Enhancv-style marketing flow) vs 'studio' (focused interactive ATS editor)
  const { viewMode, setViewMode, resume, setResume, targetJd, setTargetJd, uploadedFileName, setUploadedFileName } = useResumeSession();

  // Scanning animation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Drag & drop upload state
  const [isDragging, setIsDragging] = useState(false);

  // Canvas Zoom & Focus Mode
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [studioTab, setStudioTab] = useState<'document' | 'audit'>('document');

  // Active Resume State
  const [activeTab, setActiveTab] = useState<'deep_report' | 'keywords' | 'audit' | 'rewriter'>('deep_report');
  const [quickLinkedinInput, setQuickLinkedinInput] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [hasEdited, setHasEdited] = useState(false);
  const [selectedBulletIndex, setSelectedBulletIndex] = useState<{
    section: 'experience' | 'project';
    itemIdx: number;
    bulletIdx: number;
  }>({
    section: 'experience',
    itemIdx: 0,
    bulletIdx: 0
  });
  const [rewriterInput, setRewriterInput] = useState(
    resume.experience[0]?.bullets[0] ||
    resume.projects?.[0]?.bullets[0] ||
    'Built a high-volume data pipeline in Go and Apache Kafka.'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const jdRef = useRef<HTMLTextAreaElement>(null);
  const rewriterRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize a textarea to fit its content (no scrollbar)
  const autoResize = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, []);

  // Resize all textareas whenever their values change
  useEffect(() => { autoResize(summaryRef.current); }, [resume.summary, autoResize]);
  useEffect(() => { autoResize(jdRef.current); }, [targetJd, autoResize]);
  useEffect(() => { autoResize(rewriterRef.current); }, [rewriterInput, autoResize]);

  // Common keywords list
  // Modal state for formula breakdown
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);
  // Modal state for Create Your Resume / Template Picker
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showFormulaModal && !showCreateModal) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const modal = modalRef.current;
    const firstFocusable = modal?.querySelector<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    (firstFocusable || modal)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowFormulaModal(false);
        setShowCreateModal(false);
        return;
      }
      if (event.key !== 'Tab' || !modal) return;
      const focusable = Array.from(modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (!focusable.length) {
        event.preventDefault();
        modal.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === modal)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [showFormulaModal, showCreateModal]);

  // 1. Enterprise ATS Keyword Analysis (Word boundary & alias safe)
  const keywordAnalysis = useMemo(() => {
    const isUnclassifiedBulletNote = resume.summary.startsWith('Extracted bullets to review and move to the correct section:');
    const analysis = analyzeAtsKeywords(targetJd, {
      fullName: resume.fullName,
      jobTitle: resume.jobTitle,
      summary: isUnclassifiedBulletNote ? '' : resume.summary,
      skills: resume.skills,
      experienceBullets: [
        ...resume.experience.flatMap((e) => e.bullets),
        ...(resume.projects || []).flatMap((p) => p.bullets)
      ]
    });

    return {
      matched: analysis.matchedKeywords.map((m) => m.canonical),
      missing: analysis.missingKeywords.map((m) => m.canonical),
      matchedDetails: analysis.matchedKeywords,
      missingDetails: analysis.missingKeywords,
      matchRate: analysis.matchRate,
      totalJdKeywords: analysis.totalJdKeywords,
      scopeDescription: analysis.scopeDescription
    };
  }, [resume, targetJd]);

  // Rule-based résumé review (content, sections, file signals, and keyword overlap)
  const deepAudit = useMemo(() => {
    return generateDeepAuditReport(
      resume,
      uploadedFileName,
      keywordAnalysis.matched,
      keywordAnalysis.missing
    );
  }, [resume, uploadedFileName, keywordAnalysis]);

  // 2. Resume formatting & content checks
  const atsAudit = useMemo(() => {
    const checks = [];

    // Check 1: Contact Details
    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.email.trim());
    const hasPhone = resume.phone.length > 7;
    checks.push({
      id: 'contact',
      title: 'Contact details are clear',
      passed: hasEmail && hasPhone,
      explanation: hasEmail && hasPhone
        ? 'Your email and phone number are easy for recruiters to find.'
        : 'Please add a valid email address and phone number so recruiters can reach you.',
      action: 'Use standard formats like (555) 000-0000 and name@email.com.'
    });

    // Check 2: Action Verbs & Metrics (Comprehensive Enterprise Regex)
    const allBullets = [
      ...resume.experience.flatMap((e) => e.bullets),
      ...(resume.projects || []).flatMap((p) => p.bullets)
    ];
    const bulletsWithMetrics = allBullets.filter((b) => hasQuantifiableMetric(b)).length;
    const metricRate = allBullets.length > 0
      ? Math.round((bulletsWithMetrics / allBullets.length) * 100)
      : 0;

    checks.push({
      id: 'metrics',
      title: 'Measurable achievements (Google X-Y-Z)',
      passed: metricRate >= 60,
      explanation: allBullets.length > 0
        ? `${metricRate}% of your bullet points contain numbers or measurable terms. Verify that each figure is accurate.`
        : 'Add experience or project bullets to review numeric details.',
      action: 'Add a result and metric you can verify, if one is available.'
    });

    // Check 3: Standard Section Headings
    checks.push({
      id: 'headings',
      title: 'Standard section titles',
      passed: true,
      explanation: 'The editor organizes information under common résumé section labels. This does not test heading recognition in an employer ATS.',
      action: 'Avoid unusual labels like "My Story" or "What I Do".'
    });

    // Check 4: Presence of dates for listed work and project entries
    const hasDates = resume.experience.length > 0
      ? resume.experience.every((e) => e.startDate && e.endDate)
      : (resume.projects && resume.projects.length > 0
          ? resume.projects.every((p) => p.startDate || p.endDate)
          : false);
    checks.push({
      id: 'dates',
      title: 'Clear role / project dates',
      passed: hasDates,
      explanation: hasDates
        ? 'Date fields are present for the listed roles or projects; their chronology and accuracy are not verified.'
        : 'Some role or project date fields are missing.',
      action: 'Format dates consistently (for example, "Jan 2022 – Present").'
    });

    // Check 5: Skill Density & Indexing
    const skillCount = resume.skills.length;
    checks.push({
      id: 'skills',
      title: 'Balanced skills list',
      passed: skillCount >= 6 && skillCount <= 25,
      explanation: `You have ${skillCount} skills listed. This check flags lists outside the app's suggested range of 6 to 25; relevance is not evaluated.`,
      action: 'Keep skills focused on the job you want instead of listing every tool you have ever tried.'
    });

    const passedCount = checks.filter((c) => c.passed).length;
    const formatChecks = checks.filter((c) => c.id === 'headings' || c.id === 'dates');
    const formattingScore = Math.round((formatChecks.filter((c) => c.passed).length / formatChecks.length) * 100);

    // Check 6: Role & Section Completeness (Summary > 50 chars, Job Title, Contact present)
    const hasSummary = (resume.summary || '').length >= 60 && !resume.summary.startsWith('Extracted bullets to review and move to the correct section:');
    const hasTitle = (resume.jobTitle || '').length >= 5;
    const roleCompletenessScore = Math.round(
      (hasEmail ? 25 : 0) + (hasPhone ? 25 : 0) + (hasSummary ? 25 : 0) + (hasTitle ? 25 : 0)
    );

    return {
      checks,
      passedCount,
      totalCount: checks.length,
      formattingScore,
      overallScore: formattingScore,
      metricRate,
      roleCompletenessScore,
      allBulletsCount: allBullets.length,
      bulletsWithMetricsCount: bulletsWithMetrics
    };
  }, [resume]);

  // ToolForge heuristic; normalize the remaining weights when no recognized target-job terms are available.
  const K = keywordAnalysis.matchRate;
  const F = atsAudit.formattingScore;
  const M = atsAudit.metricRate;
  const R = atsAudit.roleCompletenessScore;
  const hasRecognizedTargetTerms = keywordAnalysis.totalJdKeywords > 0;
  const scoreWeightTotal = hasRecognizedTargetTerms ? 1 : 0.6;
  const keywordWeight = hasRecognizedTargetTerms ? 0.4 : 0;
  const formattingWeight = 0.25 / scoreWeightTotal;
  const metricsWeight = 0.2 / scoreWeightTotal;
  const completenessWeight = 0.15 / scoreWeightTotal;

  const compositeScore = Math.min(100, Math.max(0, Math.round(
    keywordWeight * K + formattingWeight * F + metricsWeight * M + completenessWeight * R
  )));

  // Scanning animation steps
  const SCAN_STEPS = [
    'Extracting text and section headings...',
    'Checking resume structure...',
    'Comparing keywords with your target job description...',
    'Reviewing bullet points and profile details...',
    'Preparing your heuristic readiness summary...'
  ];

  // Load an illustrative sample profile; sample details are fictional.
  const handleSelectSample = (sampleKey: keyof typeof SAMPLE_RESUMES) => {
    const s = SAMPLE_RESUMES[sampleKey];
    if (s) {
      setResume(s);
      setRewriterInput(s.experience[0]?.bullets[0] || '');
      setUploadedFileName('');
      setHasEdited(true);
      setViewMode('studio');
      showToast('Loaded a fictional sample profile. Replace its details before using it.', 'sparkle');
      if (onActionLogged) onActionLogged();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Strict file type and size validator (Max 10MB, PDF/DOCX/TXT/MD only)
  const validateResumeFile = (file: File): string | null => {
    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE_BYTES) {
      return `File exceeds the 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a smaller document.`;
    }
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const validExts = ['.pdf', '.docx', '.txt', '.md'];
    const fileType = file.type.toLowerCase();
    const validMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown'
    ];
    const isValid = validExts.includes(ext) || validMimes.includes(fileType);
    if (!isValid) {
      return `Unsupported file format (${ext || file.type || 'unknown'}). Please upload a PDF, DOCX, TXT, or MD resume.`;
    }
    return null;
  };

  // Process File Object using client text extractor
  const processResumeFile = async (file: File) => {
    const validationError = validateResumeFile(file);
    if (validationError) {
      showToast(validationError, 'warning');
      return;
    }

    setUploadedFileName(file.name);
    // Start scan modal immediately so candidate gets instant feedback
    setIsScanning(true);
    setScanProgress(15);
    setCurrentStepIndex(0);

    const stepTimer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
      setScanProgress((prev) => Math.min(prev + 22, 92));
    }, 220);

    try {
      const { extracted, resume: cleanUploadedResume } = await prepareResumeImport(file);

      // If document yielded zero text (e.g. encrypted or unreadable scan)
      if (!extracted.text || extracted.text.trim().length === 0) {
        clearInterval(stepTimer);
        setIsScanning(false);
        showToast(
          extracted.error || `Could not extract text from "${file.name}". The document may be password-protected, encrypted, or an unreadable scan.`,
          'warning'
        );
        return;
      }

      setTimeout(() => {
        clearInterval(stepTimer);
        setScanProgress(100);

        setTimeout(() => {
          setIsScanning(false);
          setViewMode('studio');

          if (!cleanUploadedResume) return;
          setResume(cleanUploadedResume);
          const firstBullet = cleanUploadedResume.experience[0]?.bullets[0] ||
            cleanUploadedResume.projects?.[0]?.bullets[0] ||
            '';
          setRewriterInput(firstBullet);
          setHasEdited(true);
          setStudioTab('document'); // Always land directly on Document Canvas!

          if (extracted.usedOcr) {
            showToast('OCR extracted text from this scan. Review names, dates, contact details, and metrics carefully.', 'warning');
          } else if (extracted.isScanned) {
            showToast('Scanned image detected. Please review the imported fields carefully.', 'warning');
          } else {
            showToast(`Extracted text from ${file.name}. Review the fields; some details may need correction.`, 'success');
          }

          if (onActionLogged) onActionLogged();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 220);
      }, 700);
    } catch (err) {
      console.error('File parsing error:', err);
      clearInterval(stepTimer);
      setIsScanning(false);
      showToast(`Unable to parse ${file.name}. Please ensure the file is not corrupted or password-protected.`, 'warning');
    }
  };

  // File Upload Handlers
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processResumeFile(file);
    }
    // Reset input value so selecting the same file triggers onChange
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processResumeFile(file);
  };

  // Add missing keyword to skills
  const handleAddKeywordToSkills = (keyword: string) => {
    if (!resume.skills.includes(keyword)) {
      setResume((prev) => ({
        ...prev,
        skills: [...prev.skills, keyword]
      }));
      showToast(`Added "${keyword}" to your skills!`, 'success');
      if (onActionLogged) onActionLogged();
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  // Add custom skill
  const handleAddNewSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !resume.skills.includes(newSkillInput.trim())) {
      setResume((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkillInput.trim()]
      }));
      setNewSkillInput('');
      showToast('Skill added', 'success');
    }
  };

  // Select bullet for rewriting and auto-scroll to the ribbon
  const handleSelectBulletForRewrite = (expIdx: number, bulletIdx: number, text: string) => {
    setSelectedBulletIndex({ section: 'experience', itemIdx: expIdx, bulletIdx });
    setRewriterInput(text);
    setActiveTab('rewriter');
    setStudioTab('audit');
    showToast('Loaded bullet point into Google X-Y-Z improver', 'sparkle');
    ribbonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectProjectBulletForRewrite = (projIdx: number, bulletIdx: number, text: string) => {
    setSelectedBulletIndex({ section: 'project', itemIdx: projIdx, bulletIdx });
    setRewriterInput(text);
    setActiveTab('rewriter');
    setStudioTab('audit');
    showToast('Loaded project bullet into Google X-Y-Z improver', 'sparkle');
    ribbonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Generate editable drafts that preserve the user's facts and leave unknown results as prompts.
  const rewrittenOptions = useMemo(() => {
    const text = rewriterInput.trim().replace(/^[-•*]\s*/, '').replace(/[.!?]+$/, '');
    return [
      {
        type: 'Focus on results (Google X-Y-Z formula)',
        text: `${text} — Add your verified result [X], measure [Y], and action [Z].`,
        powerVerbs: [],
        rationale: 'Replace the prompts with outcomes and measurements you can verify.'
      },
      {
        type: 'Focus on leadership and initiative',
        text: `${text} — Add the scope you personally owned [team, users, or process] and its verified outcome [result].`,
        powerVerbs: [],
        rationale: 'Add only the scope and outcomes that accurately describe your contribution.'
      },
      {
        type: 'Short, clean, and direct',
        text: `${text} — Add one concise, verified outcome and metric, if available.`,
        powerVerbs: [],
        rationale: 'A concise draft; keep the outcome factual and omit a metric if you cannot verify one.'
      }
    ];
  }, [rewriterInput]);

  // Apply rewrite to resume
  const handleApplyRewrite = (newBulletText: string) => {
    setResume((prev) => {
      if (selectedBulletIndex.section === 'project') {
        const nextProjects = [...(prev.projects || [])];
        if (nextProjects[selectedBulletIndex.itemIdx]) {
          const bullets = [...nextProjects[selectedBulletIndex.itemIdx].bullets];
          bullets[selectedBulletIndex.bulletIdx] = newBulletText;
          nextProjects[selectedBulletIndex.itemIdx] = {
            ...nextProjects[selectedBulletIndex.itemIdx],
            bullets
          };
        }
        return { ...prev, projects: nextProjects };
      }

      const newExp = [...prev.experience];
      if (newExp[selectedBulletIndex.itemIdx]) {
        const bullets = [...newExp[selectedBulletIndex.itemIdx].bullets];
        bullets[selectedBulletIndex.bulletIdx] = newBulletText;
        newExp[selectedBulletIndex.itemIdx] = {
          ...newExp[selectedBulletIndex.itemIdx],
          bullets
        };
      }
      return { ...prev, experience: newExp };
    });
    showToast('Updated on your resume!', 'success');
    if (onActionLogged) onActionLogged();
  };

  // Apply suggested Google X-Y-Z bullet from deep audit
  const handleApplySuggestedBullet = (original: string, suggested: string) => {
    setResume((prev) => {
      let matched = false;
      const nextExp = prev.experience.map((exp) => {
        const nextBullets = exp.bullets.map((b) => {
          if (!matched && (b === original || b.trim() === original.trim() || original.includes(b.slice(0, 30)))) {
            matched = true;
            return suggested;
          }
          return b;
        });
        return { ...exp, bullets: nextBullets };
      });

      const nextProjects = (prev.projects || []).map((proj) => {
        const nextBullets = proj.bullets.map((b) => {
          if (!matched && (b === original || b.trim() === original.trim() || original.includes(b.slice(0, 30)))) {
            matched = true;
            return suggested;
          }
          return b;
        });
        return { ...proj, bullets: nextBullets };
      });

      return { ...prev, experience: nextExp, projects: nextProjects };
    });
    setHasEdited(true);
    showToast('Applied high-impact Google X-Y-Z bullet point!', 'sparkle');
    if (onActionLogged) onActionLogged();
  };

  // 1-Click auto-diversify repetitive action verbs
  const handleAutoReplaceRepetitiveVerbs = () => {
    const repeated = deepAudit.categories.content.repetition.repeatedWords;
    if (!repeated || repeated.length === 0) {
      showToast('No repetitive action verbs found.', 'info');
      return;
    }

    setResume((prev) => {
      const counts: Record<string, number> = {};
      const replaceInBullets = (bullets: string[]) => {
        return bullets.map((b) => {
          let updated = b;
          repeated.forEach((rw) => {
            const wLower = rw.word.toLowerCase();
            const regex = new RegExp(`\\b${rw.word}\\b`, 'gi');
            updated = updated.replace(regex, (match) => {
              counts[wLower] = (counts[wLower] || 0) + 1;
              if (counts[wLower] > 1 && rw.synonyms && rw.synonyms.length > 0) {
                const syn = rw.synonyms[(counts[wLower] - 2) % rw.synonyms.length];
                return match[0] === match[0].toUpperCase()
                  ? syn.charAt(0).toUpperCase() + syn.slice(1)
                  : syn.toLowerCase();
              }
              return match;
            });
          });
          return updated;
        });
      };

      const nextExp = prev.experience.map((exp) => ({
        ...exp,
        bullets: replaceInBullets(exp.bullets)
      }));

      const nextProjects = (prev.projects || []).map((proj) => ({
        ...proj,
        bullets: replaceInBullets(proj.bullets)
      }));

      return { ...prev, experience: nextExp, projects: nextProjects };
    });
    setHasEdited(true);
    showToast('Auto-replaced repetitive action verbs with strong synonyms!', 'success');
    if (onActionLogged) onActionLogged();
  };

  // 1-Click bullet point consistency formatter (uniform periods and capitalization)
  const handleAutoFormatBulletConsistency = () => {
    setResume((prev) => {
      const formatBullets = (bullets: string[]) => {
        return bullets.map((b) => {
          let clean = b.trim();
          if (!clean) return clean;
          clean = clean.charAt(0).toUpperCase() + clean.slice(1);
          clean = clean.replace(/[.,;:]*$/, '.');
          return clean;
        });
      };

      const nextExp = prev.experience.map((exp) => ({
        ...exp,
        bullets: formatBullets(exp.bullets)
      }));

      const nextProjects = (prev.projects || []).map((proj) => ({
        ...proj,
        bullets: formatBullets(proj.bullets)
      }));

      return { ...prev, experience: nextExp, projects: nextProjects };
    });
    setHasEdited(true);
    showToast('Uniform bullet capitalization and period punctuation applied!', 'success');
    if (onActionLogged) onActionLogged();
  };

  // 1-Click Save LinkedIn from Quick Input
  const handleSaveQuickLinkedin = () => {
    if (!quickLinkedinInput.trim()) return;
    setResume((prev) => ({
      ...prev,
      linkedin: quickLinkedinInput.trim()
    }));
    setQuickLinkedinInput('');
    setHasEdited(true);
    showToast('Added LinkedIn profile URL to candidate info!', 'success');
    if (onActionLogged) onActionLogged();
  };

  // Apply only factual-neutral cleanup; never invent metrics or achievements.
  const handleOneClickOptimize = () => {
    const result = safelyOptimizeResume(resume);
    if (result.changedBullets === 0) {
      showToast('No safe automatic edits found. Add only results you can verify.', 'info');
      return;
    }

    setResume(result.resume);
    setHasEdited(true);
    showToast(
      result.removedPlaceholderBullets > 0
        ? `Removed unverified metric placeholders from ${result.removedPlaceholderBullets} bullet${result.removedPlaceholderBullets === 1 ? '' : 's'} and standardized punctuation. No résumé facts were added.`
        : 'Standardized bullet capitalization and punctuation. No résumé facts were added.',
      'sparkle'
    );
    if (onActionLogged) onActionLogged();
  };

  // Project CRUD Handlers
  const handleUpdateProject = (projIdx: number, field: keyof ResumeProject, value: any) => {
    setResume((prev) => {
      const nextProjects = [...(prev.projects || [])];
      if (nextProjects[projIdx]) {
        nextProjects[projIdx] = { ...nextProjects[projIdx], [field]: value };
      }
      return { ...prev, projects: nextProjects };
    });
    setHasEdited(true);
  };

  const handleAddProject = () => {
    const newProj: ResumeProject = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      technologies: '',
      startDate: '',
      endDate: '',
      bullets: []
    };
    setResume((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
    setHasEdited(true);
    showToast('Added new technical project', 'success');
  };

  const handleDeleteProject = (projIdx: number) => {
    setResume((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((_, idx) => idx !== projIdx)
    }));
    setHasEdited(true);
    showToast('Removed project', 'info');
  };

  const handleUpdateProjectBullet = (projIdx: number, bulletIdx: number, text: string) => {
    setResume((prev) => {
      const nextProjects = [...(prev.projects || [])];
      if (nextProjects[projIdx]) {
        const nextBullets = [...nextProjects[projIdx].bullets];
        nextBullets[bulletIdx] = text;
        nextProjects[projIdx] = { ...nextProjects[projIdx], bullets: nextBullets };
      }
      return { ...prev, projects: nextProjects };
    });
    setHasEdited(true);
  };

  const handleAddProjectBullet = (projIdx: number) => {
    const newBullet = '';
    setResume((prev) => {
      const nextProjects = [...(prev.projects || [])];
      if (nextProjects[projIdx]) {
        nextProjects[projIdx] = {
          ...nextProjects[projIdx],
          bullets: [...nextProjects[projIdx].bullets, newBullet]
        };
      }
      return { ...prev, projects: nextProjects };
    });
    setHasEdited(true);
    showToast('Added project bullet point', 'success');
  };

  const handleDeleteProjectBullet = (projIdx: number, bulletIdx: number) => {
    setResume((prev) => {
      const nextProjects = [...(prev.projects || [])];
      if (nextProjects[projIdx]) {
        nextProjects[projIdx] = {
          ...nextProjects[projIdx],
          bullets: nextProjects[projIdx].bullets.filter((_, idx) => idx !== bulletIdx)
        };
      }
      return { ...prev, projects: nextProjects };
    });
    setHasEdited(true);
    showToast('Deleted project bullet point', 'info');
  };

  // Create New Resume from Scratch or Template
  const handleCreateNewResume = (templateKey: string = 'starter_clean') => {
    let chosen: ResumeData = JSON.parse(JSON.stringify(BLANK_STARTER_RESUME));
    if (templateKey === 'software_engineer') {
      chosen = JSON.parse(JSON.stringify(SAMPLE_RESUMES.software_engineer));
    } else if (templateKey === 'ai_ml_engineer') {
      chosen = JSON.parse(JSON.stringify(SAMPLE_RESUMES.ai_ml_engineer));
    } else if (templateKey === 'product_manager') {
      chosen = JSON.parse(JSON.stringify(SAMPLE_RESUMES.product_manager));
    } else if (templateKey === 'finance_ops') {
      chosen = JSON.parse(JSON.stringify(SAMPLE_RESUMES.finance_ops));
    }

    chosen.id = `created-${Date.now()}`;
    setResume(chosen);
    setRewriterInput(chosen.experience[0]?.bullets[0] || '');
    setHasEdited(true);
    setUploadedFileName('');
    setShowCreateModal(false);
    setViewMode('studio');
    showToast(templateKey === 'starter_clean'
      ? 'Blank résumé draft is ready.'
      : 'Loaded a fictional sample profile. Replace its details before using it.', 'sparkle');
    if (onActionLogged) onActionLogged();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Experience CRUD Handlers
  const handleUpdateExperience = (expIdx: number, field: keyof ResumeExperience, value: any) => {
    setResume((prev) => {
      const nextExp = [...prev.experience];
      if (nextExp[expIdx]) {
        nextExp[expIdx] = { ...nextExp[expIdx], [field]: value };
      }
      return { ...prev, experience: nextExp };
    });
    setHasEdited(true);
  };

  const handleAddExperience = () => {
    const newExp: ResumeExperience = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: []
    };
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
    setHasEdited(true);
    showToast('Added new work experience position', 'success');
  };

  const handleDeleteExperience = (expIdx: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== expIdx)
    }));
    setHasEdited(true);
    showToast('Removed work experience', 'info');
  };

  const handleUpdateBullet = (expIdx: number, bulletIdx: number, text: string) => {
    setResume((prev) => {
      const nextExp = [...prev.experience];
      if (nextExp[expIdx]) {
        const nextBullets = [...nextExp[expIdx].bullets];
        nextBullets[bulletIdx] = text;
        nextExp[expIdx] = { ...nextExp[expIdx], bullets: nextBullets };
      }
      return { ...prev, experience: nextExp };
    });
    setHasEdited(true);
  };

  const handleAddBullet = (expIdx: number) => {
    const newBullet = '';
    setResume((prev) => {
      const nextExp = [...prev.experience];
      if (nextExp[expIdx]) {
        nextExp[expIdx] = {
          ...nextExp[expIdx],
          bullets: [...nextExp[expIdx].bullets, newBullet]
        };
      }
      return { ...prev, experience: nextExp };
    });
    setHasEdited(true);
    showToast('Added bullet point', 'success');
  };

  const handleDeleteBullet = (expIdx: number, bulletIdx: number) => {
    setResume((prev) => {
      const nextExp = [...prev.experience];
      if (nextExp[expIdx]) {
        nextExp[expIdx] = {
          ...nextExp[expIdx],
          bullets: nextExp[expIdx].bullets.filter((_, idx) => idx !== bulletIdx)
        };
      }
      return { ...prev, experience: nextExp };
    });
    setHasEdited(true);
    showToast('Deleted bullet point', 'info');
  };

  // Education CRUD Handlers
  const handleUpdateEducation = (eduIdx: number, field: keyof ResumeEducation, value: string) => {
    setResume((prev) => {
      const nextEdu = [...prev.education];
      if (nextEdu[eduIdx]) {
        nextEdu[eduIdx] = { ...nextEdu[eduIdx], [field]: value };
      }
      return { ...prev, education: nextEdu };
    });
    setHasEdited(true);
  };

  const handleAddEducation = () => {
    const newEdu: ResumeEducation = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      location: '',
      year: ''
    };
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
    setHasEdited(true);
    showToast('Added education entry', 'success');
  };

  const handleDeleteEducation = (eduIdx: number) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== eduIdx)
    }));
    setHasEdited(true);
    showToast('Removed education entry', 'info');
  };
  const handleExportTxt = () => {
    const txtContent = `${resume.fullName.toUpperCase()}
${resume.jobTitle}
${resume.email} | ${resume.phone} | ${resume.location}
LinkedIn: ${resume.linkedin}${resume.portfolio ? ' | Portfolio: ' + resume.portfolio : ''}

SUMMARY
${resume.summary}

SKILLS
${resume.skills.join(', ')}
${resume.projects && resume.projects.length > 0 ? `
TECHNICAL PROJECTS
${resume.projects
  .map(
    (proj) => `${proj.name.toUpperCase()}${proj.role ? ` (${proj.role})` : ''}
${proj.technologies ? `Technologies: ${proj.technologies}\n` : ''}${proj.startDate ? `${proj.startDate} – ${proj.endDate || 'Present'}\n` : ''}${proj.bullets.map((b) => `• ${b}`).join('\n')}`
  )
  .join('\n\n')}
` : ''}${resume.experience && resume.experience.length > 0 ? `
EXPERIENCE
${resume.experience
  .map(
    (exp) => `${exp.role.toUpperCase()} - ${exp.company} (${exp.location})
${exp.startDate} – ${exp.endDate}
${exp.bullets.map((b) => `• ${b}`).join('\n')}`
  )
  .join('\n\n')}
` : ''}
EDUCATION
${resume.education.map((edu) => `${edu.degree} - ${edu.school} (${edu.year})`).join('\n')}
`;

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${resume.fullName.replace(/\s+/g, '_')}_ATS_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded ATS plain text resume', 'copy');
    if (onActionLogged) onActionLogged();
  };

  // Safe HTML Escaper to prevent XSS injection in generated print windows
  const esc = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    return String(val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Export PDF with standard @page margins and page-break guards
  const handleExportPdf = () => {
    const r = resume;
    const contactParts = [
      esc(r.email),
      esc(r.phone),
      esc(r.location),
      esc(r.linkedin),
      r.portfolio ? esc(r.portfolio) : ''
    ].filter(Boolean).join(' · ');

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${esc(r.fullName)} — Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
  @page {
    size: letter portrait;
    margin: 12mm 15mm;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 9.5pt;
    color: #18181b;
    line-height: 1.5;
    padding: 0;
    max-width: 100%;
    margin: 0 auto;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  h1 { font-size: 20pt; font-weight: 800; color: #09090b; letter-spacing: -0.03em; margin-bottom: 2pt; }
  .title { font-size: 11pt; font-weight: 700; color: #059669; margin-bottom: 5pt; }
  .contact { font-size: 8.5pt; color: #52525b; margin-bottom: 12pt; padding-bottom: 6pt; border-bottom: 1pt solid #e4e4e7; }
  .section { margin-top: 12pt; }
  .section-heading { font-size: 8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #059669; border-bottom: 1.5pt solid #059669; padding-bottom: 2pt; margin-bottom: 7pt; }
  .summary { font-size: 9pt; color: #27272a; line-height: 1.55; }
  .skills { font-size: 9pt; color: #27272a; line-height: 1.6; }
  .exp-block { margin-bottom: 10pt; page-break-inside: avoid; }
  .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
  .exp-role { font-size: 10pt; font-weight: 700; color: #09090b; }
  .exp-dates { font-size: 8.5pt; font-weight: 600; color: #71717a; font-family: 'JetBrains Mono', monospace; }
  .exp-company { font-size: 9pt; font-weight: 600; color: #3f3f46; margin-top: 1pt; margin-bottom: 3pt; }
  .exp-tech { font-size: 8.5pt; color: #52525b; font-style: italic; margin-bottom: 3pt; }
  ul { margin-top: 3pt; padding-left: 13pt; }
  li { margin-bottom: 3pt; font-size: 9pt; color: #27272a; line-height: 1.45; }
  .edu-block { display: flex; justify-content: space-between; margin-bottom: 5pt; page-break-inside: avoid; }
  .edu-degree { font-weight: 700; font-size: 9.5pt; color: #09090b; }
  .edu-school { font-size: 9pt; color: #3f3f46; }
  .edu-year { font-size: 8.5pt; font-weight: 600; color: #71717a; font-family: 'JetBrains Mono', monospace; }
</style>
</head>
<body>
  <h1>${esc(r.fullName)}</h1>
  <div class="title">${esc(r.jobTitle)}</div>
  <div class="contact">${contactParts}</div>

  <div class="section">
    <div class="section-heading">Professional Summary</div>
    <div class="summary">${esc(r.summary)}</div>
  </div>

  <div class="section">
    <div class="section-heading">Technical Skills & Competencies</div>
    <div class="skills">${r.skills.map(s => esc(s)).join(' · ')}</div>
  </div>

  ${r.projects && r.projects.length > 0 ? `
  <div class="section">
    <div class="section-heading">Key Technical Projects</div>
    ${r.projects.map(proj => `
    <div class="exp-block">
      <div class="exp-header">
        <span class="exp-role">${esc(proj.name)}${proj.role ? ' — ' + esc(proj.role) : ''}</span>
        <span class="exp-dates">${proj.startDate ? `${esc(proj.startDate)} – ${esc(proj.endDate || 'Present')}` : ''}</span>
      </div>
      ${proj.technologies ? `<div class="exp-tech">Stack: ${esc(proj.technologies)}</div>` : ''}
      ${proj.link ? `<div class="exp-company">${esc(proj.link)}</div>` : ''}
      <ul>${proj.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>` : ''}

  ${r.experience && r.experience.length > 0 ? `
  <div class="section">
    <div class="section-heading">Work Experience</div>
    ${r.experience.map(exp => `
    <div class="exp-block">
      <div class="exp-header">
        <span class="exp-role">${esc(exp.role)}</span>
        <span class="exp-dates">${esc(exp.startDate)} – ${esc(exp.endDate)}</span>
      </div>
      <div class="exp-company">${esc(exp.company)} · ${esc(exp.location)}</div>
      <ul>${exp.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>` : ''}

  <div class="section">
    <div class="section-heading">Education</div>
    ${r.education.map(edu => `
    <div class="edu-block">
      <div>
        <div class="edu-degree">${esc(edu.degree)}</div>
        <div class="edu-school">${esc(edu.school)}${edu.location ? ' · ' + esc(edu.location) : ''}</div>
      </div>
      <div class="edu-year">${esc(edu.year)}</div>
    </div>`).join('')}
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (!win) { showToast('Allow pop-ups to download PDF', 'info'); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 600);
    showToast('Opening clean PDF — save as PDF in print dialog', 'success');
    if (onActionLogged) onActionLogged();
  };

  // Export a résumé readiness summary
  const handleExportAuditScorecard = () => {
    const r = resume;
    const checks = atsAudit.checks;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>ToolForge ATS Audit Report — ${esc(r.fullName)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
  @page { size: letter portrait; margin: 12mm 15mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #09090b;
    line-height: 1.45;
    background: #fff;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2pt solid #059669; padding-bottom: 12pt; margin-bottom: 14pt; }
  .brand { font-size: 18pt; font-weight: 900; color: #059669; letter-spacing: -0.02em; }
  .badge { display: inline-block; font-size: 8pt; font-weight: 800; background: #ecfdf5; color: #047857; border: 1pt solid #a7f3d0; padding: 2pt 8pt; border-radius: 9999px; margin-top: 3pt; font-family: 'JetBrains Mono', monospace; }
  .report-meta { text-align: right; font-size: 8.5pt; color: #52525b; font-family: 'JetBrains Mono', monospace; }
  .hero-card { display: flex; justify-content: space-between; align-items: center; background: #fbfbfb; border: 1pt solid #e4e4e7; border-radius: 12pt; padding: 14pt 18pt; margin-bottom: 16pt; }
  .candidate-name { font-size: 16pt; font-weight: 800; color: #09090b; }
  .candidate-role { font-size: 10pt; font-weight: 600; color: #059669; margin-top: 1pt; }
  .score-badge { text-align: center; background: #ecfdf5; border: 2pt solid #059669; border-radius: 12pt; padding: 8pt 16pt; }
  .score-val { font-size: 28pt; font-weight: 900; color: #047857; line-height: 1; font-family: 'JetBrains Mono', monospace; }
  .score-label { font-size: 7.5pt; font-weight: 800; text-transform: uppercase; color: #065f46; letter-spacing: 0.05em; margin-top: 2pt; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12pt; margin-bottom: 14pt; }
  .box { border: 1pt solid #e4e4e7; border-radius: 10pt; padding: 10pt 12pt; background: #fff; }
  .box-title { font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #3f3f46; margin-bottom: 6pt; border-bottom: 1pt solid #f4f4f5; padding-bottom: 4pt; }
  .stat-row { display: flex; justify-content: space-between; font-size: 9pt; padding: 3pt 0; border-bottom: 1pt dashed #f4f4f5; }
  .stat-row:last-child { border-bottom: 0; }
  .status-pass { font-weight: 800; color: #059669; font-family: 'JetBrains Mono', monospace; }
  .status-flag { font-weight: 800; color: #d97706; font-family: 'JetBrains Mono', monospace; }
  .status-neutral { font-weight: 700; color: #71717a; font-family: 'JetBrains Mono', monospace; }
  .tag-cloud { display: flex; flex-wrap: wrap; gap: 4pt; margin-top: 4pt; }
  .tag-pass { font-size: 7.5pt; font-weight: 700; background: #ecfdf5; color: #065f46; border: 1pt solid #a7f3d0; padding: 2pt 6pt; border-radius: 4pt; }
  .tag-miss { font-size: 7.5pt; font-weight: 700; background: #fffbeb; color: #92400e; border: 1pt solid #fde68a; padding: 2pt 6pt; border-radius: 4pt; }
  .table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-top: 6pt; }
  .table th { background: #fbfbfb; text-align: left; padding: 5pt 8pt; font-size: 7.5pt; font-weight: 800; color: #3f3f46; border-bottom: 1.5pt solid #d4d4d8; text-transform: uppercase; }
  .footer { margin-top: 14pt; border-top: 1pt solid #e4e4e7; padding-top: 8pt; display: flex; justify-content: space-between; font-size: 7.5pt; color: #71717a; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">ToolForge Résumé Review</div>
      <div class="badge">RÉSUMÉ READINESS SUMMARY</div>
    </div>
    <div class="report-meta">
      <div><strong>Audit Date:</strong> ${esc(dateStr)}</div>
      <div><strong>Inspection:</strong> Rule-based résumé heuristics</div>
      <div><strong>Processing:</strong> Résumé text reviewed in this browser</div>
    </div>
  </div>

  <div class="hero-card">
    <div>
      <div class="candidate-name">${esc(r.fullName)}</div>
      <div class="candidate-role">${esc(r.jobTitle)}${r.location ? ' · ' + esc(r.location) : ''}</div>
      <div style="font-size: 8.5pt; color: #64748b; margin-top: 4pt;">
        Estimates common formatting signals; not tested against employer ATS platforms
      </div>
    </div>
    <div class="score-badge">
      <div class="score-val">${compositeScore}%</div>
      <div class="score-label">${compositeScore >= 80 ? 'Strong heuristic score' : 'Review suggested'}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="box">
      <div class="box-title">7 Heuristic Review Categories</div>
      <div class="stat-row"><span>1. Content Quality & Metrics</span><span class="${deepAudit.categories.content.score === null ? '' : deepAudit.categories.content.score >= 70 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.content.score === null ? 'Not assessed' : `${deepAudit.categories.content.score}%`}</span></div>
      <div class="stat-row"><span>2. Essential Sections & Contact</span><span class="${deepAudit.categories.sections.score >= 80 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.sections.score}%</span></div>
      <div class="stat-row"><span>3. File and Formatting Signals</span><span class="${deepAudit.categories.atsEssentials.score >= 70 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.atsEssentials.score}%</span></div>
      <div class="stat-row"><span>4. HR Red Flags & Credibility</span><span class="${deepAudit.categories.hrRedFlags.score >= 70 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.hrRedFlags.score}%</span></div>
      <div class="stat-row"><span>5. Age / Graduation-Date Review</span><span class="status-neutral">NOT ASSESSED</span></div>
      <div class="stat-row"><span>6. Verb Pattern Review</span><span class="${deepAudit.categories.seniority.score === null ? 'status-neutral' : deepAudit.categories.seniority.score >= 50 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.seniority.score !== null ? `${deepAudit.categories.seniority.score}%` : 'NOT ASSESSED'}</span></div>
      <div class="stat-row"><span>7. Job Description Match</span><span class="${deepAudit.categories.tailoring.matchedCount + deepAudit.categories.tailoring.missingCount === 0 ? 'status-neutral' : deepAudit.categories.tailoring.score >= 70 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.tailoring.matchedCount + deepAudit.categories.tailoring.missingCount > 0 ? `${deepAudit.categories.tailoring.score}%` : 'NOT ASSESSED'}</span></div>
    </div>

    <div class="box">
      <div class="box-title">Quality Verification Checks</div>
      <div class="stat-row"><span>Bullets Consistency Check</span><span class="${deepAudit.categories.content.bulletsConsistency.hasIssue ? 'status-flag' : 'status-pass'}">${deepAudit.categories.content.bulletsConsistency.hasIssue ? 'REVIEW' : 'PASS'}</span></div>
      <div class="stat-row"><span>File Name Professionalism</span><span class="${deepAudit.categories.atsEssentials.fileNameCheck.passed ? 'status-pass' : 'status-flag'}">${deepAudit.categories.atsEssentials.fileNameCheck.passed ? 'PASS' : 'REVIEW'}</span></div>
      <div class="stat-row"><span>LinkedIn URL Presence</span><span class="${deepAudit.categories.atsEssentials.datesAndLinks.passed ? 'status-pass' : 'status-flag'}">${deepAudit.categories.atsEssentials.datesAndLinks.passed ? 'FOUND' : 'REVIEW'}</span></div>
      <div class="stat-row"><span>Buzzword & Fluff Review</span><span class="${deepAudit.categories.hrRedFlags.credibility.passed ? 'status-pass' : 'status-flag'}">${deepAudit.categories.hrRedFlags.credibility.passed ? 'PASS' : 'REVIEW'}</span></div>
      <div class="stat-row"><span>Interview Risk Review</span><span class="${deepAudit.categories.hrRedFlags.interviewRisks.passed ? 'status-pass' : 'status-flag'}">${deepAudit.categories.hrRedFlags.interviewRisks.passed ? 'PASS' : 'REVIEW'}</span></div>
      <div class="stat-row"><span>Date Bias Review</span><span class="${deepAudit.categories.discrimination.score === null ? 'status-neutral' : deepAudit.categories.discrimination.ageismDateBias.passed ? 'status-pass' : 'status-flag'}">${deepAudit.categories.discrimination.score === null ? 'NOT ASSESSED' : deepAudit.categories.discrimination.ageismDateBias.passed ? 'PASS' : 'REVIEW'}</span></div>
      <div class="stat-row"><span>Employment Gap Review</span><span class="${deepAudit.categories.discrimination.score === null ? 'status-neutral' : deepAudit.categories.discrimination.employmentGaps.passed ? 'status-pass' : 'status-flag'}">${deepAudit.categories.discrimination.score === null ? 'NOT ASSESSED' : deepAudit.categories.discrimination.employmentGaps.passed ? 'PASS' : 'REVIEW'}</span></div>
      <div class="stat-row"><span>Verb Pattern Review</span><span class="${deepAudit.categories.seniority.scopeOwnership.ownershipLevel === 'Not assessed' ? 'status-neutral' : deepAudit.categories.seniority.scopeOwnership.leadVerbCount >= deepAudit.categories.seniority.scopeOwnership.passiveVerbCount ? 'status-pass' : 'status-flag'}">${deepAudit.categories.seniority.scopeOwnership.ownershipLevel === 'Not assessed' ? 'NOT ASSESSED' : deepAudit.categories.seniority.scopeOwnership.leadVerbCount >= deepAudit.categories.seniority.scopeOwnership.passiveVerbCount ? 'PASS' : 'REVIEW'}</span></div>
    </div>
  </div>

  <div class="box" style="margin-bottom: 12pt;">
      <div class="box-title">Résumé Review Findings & Recommendations</div>
    <table class="table">
      <thead>
        <tr>
          <th style="width: 28%;">Inspection Module</th>
          <th style="width: 57%;">Analysis Detail</th>
          <th style="width: 15%; text-align: right;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Detected Section Labels</strong></td>
          <td style="color: #475569;">Detected section-label coverage: ${deepAudit.categories.content.atsParseRate.sectionCoveragePercentage}% (${deepAudit.categories.content.atsParseRate.missingSectionPercentage}% of expected labels were not found). This does not test text extraction or an employer ATS.</td>
          <td style="text-align: right;"><span class="${deepAudit.categories.content.atsParseRate.sectionCoveragePercentage === 0 ? 'status-flag' : 'status-pass'}">${deepAudit.categories.content.atsParseRate.sectionCoveragePercentage}%</span></td>
        </tr>
        <tr>
          <td><strong>Quantifying Impact</strong></td>
          <td style="color: #475569;">${deepAudit.categories.content.quantifyingImpact.issueCount === 0 ? 'All bullets feature measurable Google X-Y-Z achievements.' : `${deepAudit.categories.content.quantifyingImpact.issueCount} bullet points lack measurable percentages or scale.`}</td>
          <td style="text-align: right;"><span class="${deepAudit.categories.content.quantifyingImpact.issueCount === 0 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.content.quantifyingImpact.issueCount === 0 ? 'PASS' : 'FLAG'}</span></td>
        </tr>
        <tr>
          <td><strong>Action Verb Repetition</strong></td>
          <td style="color: #475569;">${deepAudit.categories.content.repetition.issueCount === 0 ? 'Vocabulary is well-diversified.' : `${deepAudit.categories.content.repetition.issueCount} action verbs repeatedly overused.`}</td>
          <td style="text-align: right;"><span class="${deepAudit.categories.content.repetition.issueCount === 0 ? 'status-pass' : 'status-flag'}">${deepAudit.categories.content.repetition.issueCount === 0 ? 'PASS' : 'FLAG'}</span></td>
        </tr>
        <tr>
          <td><strong>Bullets Consistency</strong></td>
          <td style="color: #475569;">${esc(deepAudit.categories.content.bulletsConsistency.periodConsistency)}; ${esc(deepAudit.categories.content.bulletsConsistency.tenseConsistency)}.</td>
          <td style="text-align: right;"><span class="${!deepAudit.categories.content.bulletsConsistency.hasIssue ? 'status-pass' : 'status-flag'}">${!deepAudit.categories.content.bulletsConsistency.hasIssue ? 'PASS' : 'FLAG'}</span></td>
        </tr>
        <tr>
          <td><strong>Verb Pattern</strong></td>
          <td style="color: #475569;">${deepAudit.categories.seniority.scopeOwnership.leadVerbCount} ownership-style terms vs ${deepAudit.categories.seniority.scopeOwnership.passiveVerbCount} passive-style terms. This does not establish candidate seniority.</td>
          <td style="text-align: right;"><span class="${deepAudit.categories.seniority.scopeOwnership.ownershipLevel === 'Not assessed' ? 'status-neutral' : 'status-pass'}">${esc(deepAudit.categories.seniority.scopeOwnership.ownershipLevel)}</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="box">
    <div class="box-title">Target Job Keyword Match (${keywordAnalysis.matched.length} Matched · ${keywordAnalysis.missing.length} Missing)</div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4pt;">Matched in Candidate Profile:</div>
    <div class="tag-cloud">
      ${keywordAnalysis.matched.map(kw => `<span class="tag-pass">✓ ${esc(kw)}</span>`).join('')}
    </div>
    ${keywordAnalysis.missing.length > 0 ? `
    <div style="font-size: 8pt; color: #475569; margin-top: 6pt; margin-bottom: 4pt;">Missing Target Job Skills:</div>
    <div class="tag-cloud">
      ${keywordAnalysis.missing.map(kw => `<span class="tag-miss">+ ${esc(kw)}</span>`).join('')}
    </div>` : ''}
  </div>

  <div class="footer">
    <span>ToolForge résumé review · Heuristic results for guidance</span>
    <span>Résumé analysis runs in this browser; external site assets may make separate requests</span>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (!win) { showToast('Allow pop-ups to download Scorecard', 'info'); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 600);
    showToast('Opening résumé readiness summary', 'sparkle');
    if (onActionLogged) onActionLogged();
  };

  // Clear to blank
  const handleResetToBlank = () => {
    setResume({ ...BLANK_STARTER_RESUME, id: 'blank', skills: [], experience: [], projects: [], education: [] });
    setTargetJd('');
    setUploadedFileName('');
    setHasEdited(false);
    setRewriterInput('');
    showToast('Resume cleared', 'info');
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt,.md"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* HIGH-TECH ATS SCANNING MODAL */}
      {isScanning && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 text-white p-8 shadow-none space-y-6 text-center">
            
            {/* Animated Laser Pulse Badge */}
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center border border-emerald-500">
                <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight">Analyzing Résumé Details</h3>
              <p className="text-xs text-zinc-400 font-normal">
                Reviewing extracted text, common headings, and keyword overlap...
              </p>
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-300 h-full rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>

            {/* Scanning Steps */}
            <div className="space-y-2 text-left pt-2">
              {SCAN_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 text-xs transition-opacity duration-300 ${
                    idx <= currentStepIndex ? 'text-zinc-200 opacity-100 font-semibold' : 'text-zinc-600 opacity-40 font-normal'
                  }`}
                >
                  {idx < currentStepIndex ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : idx === currentStepIndex ? (
                    <span className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-zinc-800 shrink-0" />
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: MARKETING LANDING PAGE (ENHANCV VISUAL STANDARDS)                */}
      {/* ========================================================================= */}
      {viewMode === 'landing' && (
        <div className="w-full space-y-0">
          
          {/* SECTION 1: HERO */}
          <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[#f8fafc] via-[#f0fdf4]/50 to-[#f1f5f9] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border-b border-slate-200/80 dark:border-zinc-800">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* LEFT COLUMN: Clean Headline & Direct Upload */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>FREE ATS RESUME CHECKER</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.08]">
                  Review Your Resume. <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                    Show Your Experience Clearly.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal max-w-xl">
                  Browser-based résumé checks, keyword comparisons, and formatting feedback in seconds. Results are heuristic guidance, not employer ATS tests.
                </p>

                {/* Clean Drag & Drop Upload Box */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all shadow-sm space-y-5 group ${
                    isDragging
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-4 ring-emerald-500/20'
                      : 'border-emerald-400/80 dark:border-emerald-600/60 bg-white/80 dark:bg-zinc-900/80 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-zinc-100">
                      {isDragging ? 'Drop your resume file to analyze' : 'Drop your resume here or browse files'}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
                      Supports PDF & DOCX
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all shadow-md inline-flex items-center justify-center gap-2 focus:ring-2 focus:ring-emerald-500/20 active:scale-[0.99] cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload Your Resume</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowCreateModal(true)}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl border-2 border-emerald-600/80 dark:border-emerald-500/80 bg-white dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-base font-bold transition-all shadow-xs inline-flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>Create Your Resume</span>
                    </button>
                  </div>

                  {/* Quick Sample Selector */}
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-medium pt-1">
                    <span>Or test with a sample profile:</span>
                    <button
                      type="button"
                      onClick={() => handleSelectSample('software_engineer')}
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                    >
                      Software Eng
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => handleSelectSample('product_manager')}
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                    >
                      Product Mgr
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => handleSelectSample('ai_ml_engineer')}
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                    >
                      AI/ML
                    </button>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Visual Product ATS Preview */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-2xl group">
                  <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-emerald-500/15 to-teal-500/15 blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-none transition-transform duration-300 hover:scale-[1.01]">
                    <picture className="block w-full">
                      <source srcSet="/images/hero-ats-preview.webp" type="image/webp" />
                      <img
                        src="/images/hero-ats-preview.jpg"
                        alt="Illustrative preview of the ToolForge resume review interface"
                        width={1376}
                        height={768}
                        fetchPriority="high"
                        decoding="async"
                        className="block w-full h-auto object-cover"
                      />
                    </picture>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2: TWO-TIER SCORING HIGHLIGHT */}
          <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white dark:bg-zinc-950 border-b border-slate-200/80 dark:border-zinc-800">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left: Before vs After Illustration */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-2xl group">
                  <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-rose-500/10 via-emerald-500/15 to-teal-500/10 blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-none bg-slate-900 transition-transform duration-300 hover:scale-[1.01]">
                    <picture className="block w-full">
                      <source srcSet="/images/before-after-ats.webp" type="image/webp" />
                      <img
                        src="/images/before-after-ats.jpg"
                        alt="Illustrative before-and-after example of clearer resume structure"
                        width={1376}
                        height={768}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto object-cover"
                      />
                    </picture>
                  </div>
                </div>
              </div>

              {/* Right: Clean, Crisp Explanation */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  ToolForge’s Resume Checker forms its ATS score with a two-tier system
                </h2>

                <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                  When you're applying for a job, there's a high chance your resume will be screened through an applicant tracking system before it finds its way on a recruiter's screen. ATS helps hiring managers find the right candidates by adding resumes to a database in a searchable format, extracting content.
                </p>

                <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
            A résumé's relevance, structure, and wording can affect how easy it is to review. ToolForge checks common formatting signals and compares recognized skill terms with a job description; it cannot predict or guarantee an employer's screening result.
                </p>

                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center justify-center text-sm shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        The proportion of content we can interpret
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Similar to an ATS, the tool analyzes and attempts to comprehend your resume's structure, standard headings, and dates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center justify-center text-sm shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Recruiter impact & keyword relevance
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Evaluates measurable achievements, action verbs, and keyword density against the exact job description you are targeting.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 4: BEYOND TYPOS AND PUNCTUATION — 3 WHITE CARDS (MATCHING SCREENSHOT 3) */}
          <section className="py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0b0f19] via-[#0f172a] to-[#0b0f19] text-white">
            <div className="max-w-[1400px] mx-auto space-y-16">
              
              {/* Centered Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-tight">
                  The résumé checker reviews more than typos and punctuation
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                  The tool reviews common résumé content and formatting signals across three categories. Results are heuristic guidance, not tests against employer ATS software or recruiters:
                </p>
              </div>

              {/* 3 Centered White Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Card 1: ATS Essentials */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8 sm:p-9 shadow-none space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">ATS essentials</h3>
                  <ul className="space-y-3.5 text-sm text-slate-600 font-medium">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>File format and size</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Common formatting signals</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Professional email address</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Contact and profile details</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Standard section headings</span>
                    </li>
                  </ul>
                </div>

                {/* Card 2: Content */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8 sm:p-9 shadow-none space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Content</h3>
                  <ul className="space-y-3.5 text-sm text-slate-600 font-medium">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Detected section labels</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Quantifying impact with AI suggestions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Repetition of words and phrases</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Action verbs & metrics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Target job keyword match</span>
                    </li>
                  </ul>
                </div>

                {/* Card 3: Recruiter Red Flags */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8 sm:p-9 shadow-none space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Flag className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Recruiter red flags</h3>
                  <ul className="space-y-3.5 text-sm text-slate-600 font-medium">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Resume credibility</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Interview risk signals</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Repeated action words</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Measurable achievements density</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Clear employment timeline</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 5: BEFORE VS AFTER VISUAL TRANSFORMATION */}
          <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white dark:bg-zinc-950 border-b border-slate-200/80 dark:border-zinc-800">
            <div className="max-w-[1400px] mx-auto space-y-16">
              
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60">
                  <Award className="w-3.5 h-3.5" />
                  <span>Illustrative Example</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  See how clearer formatting and evidence can strengthen a résumé
                </h2>
                <p className="text-base sm:text-lg text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
                  The comparison below is an illustrative mockup, not a measured result or an employer ATS test. Add only skills and outcomes that are true for you.
                </p>
              </div>

              {/* 3D Visual Mockup */}
              <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-none bg-slate-900">
                <picture className="block w-full">
                  <source srcSet="/images/before-after-ats.webp" type="image/webp" />
                  <img
                    src="/images/before-after-ats.jpg"
                    alt="Illustrative resume example showing formatting and evidence improvements"
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto object-cover"
                  />
                </picture>
              </div>

              {/* Side-by-side Technical Highlights */}
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Card: Before */}
                <div className="p-8 rounded-3xl border border-rose-200/80 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">Before ToolForge</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-200">
                      Example input
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-700 dark:text-zinc-300">
                    <li className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-rose-200/70 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">✕</span>
                      <span>Nested tables broke text parser</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-rose-200/70 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">✕</span>
                      <span>0 of 12 job description keywords matched</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-rose-200/70 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">✕</span>
                      <span>Passive duties without measurable metrics</span>
                    </li>
                  </ul>
                </div>

                {/* Right Card: After */}
                <div className="p-8 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">After ToolForge</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-200">
                      Example draft
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-700 dark:text-zinc-300">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Use a simple, readable document structure</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Compare job terms with skills you actually have</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Add verified outcomes where you can support them</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Call to Action Button */}
              <div className="text-center pt-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition-all shadow-none inline-flex items-center gap-2 cursor-pointer focus:ring-2 focus:ring-emerald-500/20 active:scale-[0.99]"
                >
                  <Upload className="w-5 h-5" />
                  <span>Scan Your Resume Free</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </section>

          {/* SECTION 6: COMPETITOR BENCHMARK */}
          <CompetitorBenchmark />

          {/* SECTION 6.5: SAAS VALUE PROPOSITION & PRICING TIERS */}
          <section className="py-24 px-4 sm:px-6 lg:px-12 bg-slate-50 dark:bg-zinc-900/60 border-b border-slate-200/80 dark:border-zinc-800">
            <div className="max-w-[1400px] mx-auto space-y-16">
              
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>TRANSPARENT VALUE ARCHITECTURE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Résumé Heuristics. Free for Candidates.
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                  ToolForge provides free browser-based résumé checks and keyword comparisons. Its results are heuristics, not tests against employer ATS platforms.
                </p>
              </div>

              {/* 2-Column Tier Comparison Cards */}
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Tier 1: Community Core Tier (Forever Free) */}
                <div className="relative rounded-3xl border-2 border-emerald-500 bg-white dark:bg-zinc-900 p-8 sm:p-10 shadow-none flex flex-col justify-between space-y-8">
                  <div className="absolute -top-3.5 left-8 px-3.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    Active · Forever Free
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Community Tier</h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">Browser-based résumé checks and keyword comparisons.</p>
                    </div>

                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-5xl font-black text-slate-900 dark:text-white">$0</span>
                      <span className="text-sm font-bold text-slate-500 dark:text-zinc-400">/ forever free</span>
                    </div>

                    <ul className="space-y-3.5 pt-4 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Unlimited</strong> client-side ATS resume scans</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Résumé Checks</strong> for content, sections, and common formatting patterns</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Job Keyword Matcher</strong> & missing hard skills audit</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Google X-Y-Z</strong> quantifiable bullet rewriter</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>PDF Readiness Summary</strong> download</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Résumé text processed in your browser</strong></span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      fileInputRef.current?.click();
                    }}
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Start Free ATS Scan Now</span>
                  </button>
                </div>

                {/* Tier 2: Pro Suite (Roadmap Anchor) */}
                <div className="relative rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 p-8 sm:p-10 shadow-md flex flex-col justify-between space-y-8 backdrop-blur-xs">
                  <div className="absolute -top-3.5 left-8 px-3.5 py-1 rounded-full bg-slate-800 dark:bg-zinc-700 text-slate-200 text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    Roadmap Preview
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Pro Suite</h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">Advanced automated multi-application pipeline.</p>
                    </div>

                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-5xl font-black text-slate-400 dark:text-zinc-500">$19</span>
                      <span className="text-sm font-bold text-slate-400 dark:text-zinc-500">/ estimated value</span>
                    </div>

                    <ul className="space-y-3.5 pt-4 text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span><strong>1-Click Auto-Tailor</strong> per live job post URL</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span><strong>LinkedIn Profile Audit</strong> & semantic keyword sync</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span><strong>Recruiter Cold Outreach</strong> personalized email generator</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span><strong>Multi-Version A/B Tracking</strong> across job applications</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span><strong>FAANG & Big Tech</strong> custom parser emulation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-center space-y-1">
                     <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">Roadmap preview · timing not announced</span>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                      Current core scanning engine will always remain 100% free and unmetered.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
          <ResumeFaq />

          {/* SECTION 8: FINAL HIGH-CONVERTING CALL TO ACTION BANNER */}
          <section className="py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white border-t border-emerald-800/40">
            <div className="max-w-[1200px] mx-auto text-center space-y-8">
              
              <div className="space-y-3 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Ready to review your résumé?
                </h2>
                <p className="text-emerald-100/80 text-base sm:text-lg font-normal">
                  Free to use with no account. Résumé text is processed in your browser and is not sent to ToolForge servers.
                </p>
              </div>

              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-base transition-all shadow-none border border-zinc-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Upload className="w-5 h-5 text-emerald-600" />
                  <span>Upload Your Resume (Free)</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200/70 pt-4">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Résumé text stays in your browser
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Instant Live Scoring
                </span>
                <span className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-emerald-400" />
                  Print-to-PDF export
                </span>
              </div>

            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: DEDICATED LIVE ATS STUDIO (CENTERED, MINIMALIST, HIGH-IMPACT)     */}
      {/* ========================================================================= */}
      {viewMode === 'studio' && (
        <div className={`w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5 animate-in fade-in duration-300 ${
          isFocusMode ? 'fixed inset-0 z-50 bg-slate-950/95 overflow-y-auto max-w-full p-4 sm:p-8' : ''
        }`}>
          
          {/* STUDIO TOP CONTROL BAR (CLEAN MINIMALIST 1PX BORDER) */}
          <header className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 shadow-none">
            
            {/* Left: Back Button & Active Document Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => {
                  setViewMode('landing');
                  setIsFocusMode(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block shrink-0" />

              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[150px] sm:max-w-[240px]">
                {uploadedFileName || resume.fullName || 'Untitled résumé'}
              </span>
            </div>

            {/* Center: Segmented Primary View Switcher */}
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shrink-0">
              <button
                type="button"
                onClick={() => setStudioTab('document')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  studioTab === 'document'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Resume Canvas</span>
              </button>

              <button
                type="button"
                onClick={() => setStudioTab('audit')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  studioTab === 'audit'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>ATS Inspection</span>
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                  studioTab === 'audit'
                    ? 'bg-white text-emerald-800'
                    : compositeScore >= 80
                    ? 'border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                    : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}>
                  {compositeScore}%
                </span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleOneClickOptimize}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
                title="Review résumé findings and add only accurate details you can verify"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>1-Click Optimize</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-semibold transition-colors items-center gap-1.5 cursor-pointer hidden sm:flex"
                title="Choose sample resume or starter layout"
              >
                <span>Templates</span>
              </button>

              <button
                onClick={handleExportPdf}
                className="px-3.5 py-2 rounded-lg border border-emerald-600 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
                title="Download résumé readiness summary"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>

          </header>

          {/* TAB 2: ATS QUALITY INSPECTION & FIXES */}
          {studioTab === 'audit' && !isFocusMode && (
            <div className="space-y-4">
              
              {/* Back to Document Switcher & Score */}
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => setStudioTab('document')}
                  className="text-sm font-semibold text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Back to Resume Canvas</span>
                </button>

                <div className="flex items-center gap-3.5">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span>Overall heuristic score:</span>
                    <span className="font-mono text-base font-bold text-zinc-900 dark:text-white">
                      {compositeScore}%
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleOneClickOptimize}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Auto-Fix All Issues</span>
                  </button>
                </div>
              </div>

              {/* The Inspector Ribbon */}
              <div ref={ribbonRef} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-none overflow-hidden">
                {/* Minimalist Segmented Tabs */}
                <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950 flex flex-wrap sm:flex-nowrap items-center gap-2">
                    <button
                      onClick={() => setActiveTab('deep_report')}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                        activeTab === 'deep_report'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      <BarChart2 className="w-4 h-4" />
                      <span>Deep Quality Audit</span>
                      <span className="font-mono text-xs opacity-90">
                        ({compositeScore}/100)
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('keywords')}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                        activeTab === 'keywords'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      <span>Job Keywords</span>
                      <span className="font-mono text-xs opacity-90">
                        ({keywordAnalysis.matched.length}/{keywordAnalysis.totalJdKeywords})
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('audit')}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                        activeTab === 'audit'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Format Checklist</span>
                      <span className="font-mono text-xs opacity-90">
                        ({atsAudit.passedCount} Passed)
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('rewriter')}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                        activeTab === 'rewriter'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Bullet Improver</span>
                    </button>
                  </div>

                  {/* TAB 0: COMPREHENSIVE DEEP AUDIT REPORT (MINIMALIST INSPECTION LEDGER) */}
                  {activeTab === 'deep_report' && (
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">

                      {/* Header Info Line */}
                      <div className="px-5 py-3 bg-zinc-50/70 dark:bg-zinc-900/50 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-zinc-900 dark:text-white">7 Audit Categories</span>
                          <span>•</span>
                          <span className="font-mono text-xs text-zinc-500">Comprehensive Deep Analysis</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleOneClickOptimize}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Zap className="w-4 h-4 fill-current" />
                          <span>1-Click Fix All Issues</span>
                        </button>
                      </div>

                      {/* 1. CONTENT AUDIT */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">01. CONTENT</span>
                            <span className="font-mono text-xs text-zinc-500">{deepAudit.categories.content.score === null ? '(Not assessed)' : `(${deepAudit.categories.content.score}%)`}</span>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-500">
                            {deepAudit.categories.sections.essentialFound.length} section labels found · employer parsing not tested
                          </span>
                        </div>

                        {/* Unquantified Bullets */}
                        {deepAudit.categories.content.quantifyingImpact.failingBullets.length > 0 && (
                          <div className="space-y-2.5">
                            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 block font-medium">
                              Quantifying Impact: {deepAudit.categories.content.quantifyingImpact.issueCount} unquantified bullet points
                            </span>
                            {deepAudit.categories.content.quantifyingImpact.failingBullets.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-2.5 text-xs shadow-none"
                              >
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Current (Unquantified)</span>
                                  <p className="text-zinc-500 line-through leading-relaxed">"{item.original}"</p>
                                </div>
                                <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                                      Draft suggestion (Google X-Y-Z)
                                    </span>
                                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                                      Add verified results where available
                                    </span>
                                  </div>
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed">
                                      {item.suggestedGoogleXyz}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => handleApplySuggestedBullet(item.original, item.suggestedGoogleXyz)}
                                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Apply</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Repetitive Verbs */}
                        {deepAudit.categories.content.repetition.repeatedWords.length > 0 && (
                          <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-zinc-500">Repetitive verbs:</span>
                              {deepAudit.categories.content.repetition.repeatedWords.map((rw, i) => (
                                <span key={i} className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">
                                  "{rw.word}" ({rw.count}x)
                                </span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={handleAutoReplaceRepetitiveVerbs}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-[0.98]"
                            >
                              Auto-Diversify Verbs
                            </button>
                          </div>
                        )}

                        {/* Bullets Consistency */}
                        <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div>
                            <span className="text-zinc-800 dark:text-zinc-200 font-medium">{deepAudit.categories.content.bulletsConsistency.details}</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleAutoFormatBulletConsistency}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-[0.98]"
                          >
                            Auto-Format Bullets
                          </button>
                        </div>
                      </div>

                      {/* 2. ESSENTIAL SECTIONS */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">02. SECTIONS</span>
                            <span className="font-mono text-xs text-zinc-500">({deepAudit.categories.sections.score}%)</span>
                          </div>
                          <span className="text-xs text-zinc-500 font-medium">
                            {deepAudit.categories.sections.essentialFound.join(' · ')}
                          </span>
                        </div>

                        {!deepAudit.categories.sections.contactDetails.hasLinkedin && (
                          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 flex flex-wrap sm:flex-nowrap items-center gap-2.5 text-xs shadow-none">
                            <span className="text-zinc-700 dark:text-zinc-300 shrink-0 font-medium">Missing LinkedIn Profile:</span>
                            <input
                              type="text"
                              value={quickLinkedinInput}
                              onChange={(e) => setQuickLinkedinInput(e.target.value)}
                              placeholder="linkedin.com/in/arnav-singh"
                              className="max-w-xs flex-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white font-mono"
                            />
                            <button
                              type="button"
                              onClick={handleSaveQuickLinkedin}
                              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-sm shrink-0 active:scale-[0.98]"
                            >
                              Save to Resume
                            </button>
                          </div>
                        )}
                      </div>

                      {/* 3. ATS ESSENTIALS */}
                      <div className="p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">03. ATS ESSENTIALS</span>
                            <span className="font-mono text-xs text-zinc-500">({deepAudit.categories.atsEssentials.score}%)</span>
                          </div>
                          <span className="font-mono text-zinc-500">Uploaded page layout is not assessed</span>
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-400 space-y-1">
                          <p>• File name: <code className="font-mono">{deepAudit.categories.atsEssentials.fileNameCheck.currentFileName}</code>. {deepAudit.categories.atsEssentials.fileNameCheck.recommendation}</p>
                          <p>• {deepAudit.categories.atsEssentials.datesAndLinks.details}</p>
                        </div>
                      </div>

                      {/* 4. HR RED FLAGS & PROBING QUESTIONS */}
                      <div className="p-4 space-y-2.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">04. HR RED FLAGS & DEFENSE</span>
                            <span className="font-mono text-xs text-zinc-500">({deepAudit.categories.hrRedFlags.score}%)</span>
                          </div>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          Questions to help review your résumé:
                        </p>
                        <div className="space-y-1.5 pl-3 border-l-2 border-zinc-200 dark:border-zinc-800">
                          {deepAudit.categories.hrRedFlags.interviewRisks.probingQuestions.map((q, i) => (
                            <p key={i} className="text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
                              "{q}"
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* 5. BIAS SHIELD */}
                      <div className="p-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">05. DATE REVIEW</span>
                          <span className="font-mono text-xs text-zinc-500">{deepAudit.categories.discrimination.score !== null ? `(${deepAudit.categories.discrimination.score}%)` : '(Not assessed)'}</span>
                        </div>
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {deepAudit.categories.discrimination.ageismDateBias.details} · {deepAudit.categories.discrimination.employmentGaps.details}
                        </span>
                      </div>

                      {/* 6. SENIORITY & OWNERSHIP */}
                      <div className="p-4 space-y-2.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">06. VERB PATTERNS</span>
                            <span className="font-mono text-xs text-zinc-500">{deepAudit.categories.seniority.score !== null ? `(${deepAudit.categories.seniority.score}%)` : '(Not assessed)'}</span>
                          </div>
                          <span className="font-mono text-zinc-500">
                            {deepAudit.categories.seniority.scopeOwnership.ownershipLevel} ({deepAudit.categories.seniority.scopeOwnership.leadVerbCount} Lead vs {deepAudit.categories.seniority.scopeOwnership.passiveVerbCount} Passive)
                          </span>
                        </div>
                        {deepAudit.categories.seniority.skillGap.missingInfrastructureSkills.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-zinc-500 font-medium">Add infra skills:</span>
                            {deepAudit.categories.seniority.skillGap.missingInfrastructureSkills.map((tool, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleAddKeywordToSkills(tool)}
                                className="px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer"
                              >
                                + {tool}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 7. TARGET JOB TAILORING */}
                      <div className="p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">07. JOB TAILORING</span>
                            <span className="font-mono text-xs text-zinc-500">{deepAudit.categories.tailoring.matchedCount + deepAudit.categories.tailoring.missingCount > 0 ? `(${deepAudit.categories.tailoring.score}%)` : '(Not assessed)'}</span>
                          </div>
                          <span className="font-mono text-zinc-500 font-medium">
                            {deepAudit.categories.tailoring.matchedCount + deepAudit.categories.tailoring.missingCount > 0
                              ? `${deepAudit.categories.tailoring.matchedCount} Matched · ${deepAudit.categories.tailoring.missingCount} Missing`
                              : 'Add a target job description to assess keyword match'}
                          </span>
                        </div>
                        {deepAudit.categories.tailoring.missingTopSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {deepAudit.categories.tailoring.missingTopSkills.map((sk, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleAddKeywordToSkills(sk)}
                                className="px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer"
                              >
                                + {sk}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* TAB 1: JOB MATCH */}
                  {activeTab === 'keywords' && (
                    <div className="p-4 sm:p-5 space-y-4">
                      
                      {/* Whole-Resume Scope Note */}
                      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                        <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong>Whole-Resume Scanning Engine:</strong> Skills are scanned across your Skills array, Work Experience bullet points, Summary, and Job Title with word-boundary accuracy (e.g. <code>Go</code> never falsely matches <code>Google</code>; <code>Postgres</code> automatically matches <code>PostgreSQL</code>). Repeating a keyword 10 times counts once to prevent keyword-stuffing flags.
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block">
                            Target Job Description:
                          </label>
                          <span className="text-xs font-mono text-zinc-500">
                            {keywordAnalysis.matched.length} of {keywordAnalysis.totalJdKeywords} skills matched ({keywordAnalysis.matchRate}%)
                          </span>
                        </div>
                        <textarea
                          ref={jdRef}
                          value={targetJd}
                          onChange={(e) => {
                            setTargetJd(e.target.value);
                            autoResize(e.target);
                          }}
                          placeholder="Paste the target job description here..."
                          className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 leading-relaxed resize-none overflow-hidden min-h-[80px] shadow-none"
                        />
                      </div>

                      {/* Missing & Matched Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 space-y-2.5 shadow-none">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                              Missing Skills ({keywordAnalysis.missing.length})
                            </span>
                            <span className="text-[11px] font-mono text-zinc-500">Click to inject</span>
                          </div>

                          {keywordAnalysis.missing.length === 0 ? (
                            <div className="p-3 rounded border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>All core skills from the job description are matched!</span>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {keywordAnalysis.missing.map((kw, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleAddKeywordToSkills(kw)}
                                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all flex items-center gap-1.5 shadow-none group cursor-pointer active:scale-95"
                                  title={`Click to add ${kw} to your skills`}
                                >
                                  <Plus className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors" />
                                  <span>{kw}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 space-y-2.5 shadow-none">
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Matched Skills ({keywordAnalysis.matched.length})
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {keywordAnalysis.matchedDetails.map((detail, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded text-xs font-mono bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 shadow-none flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{detail.canonical}</span>
                                <span className="text-[10px] text-zinc-400 font-normal">
                                  ({detail.foundIn.join(' & ')})
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ATS CHECKLIST (HIGH-DENSITY LEDGER) */}
                  {activeTab === 'audit' && (
                    <div className="p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                            Résumé Structure & Profile Review
                          </h4>
                          <p className="text-xs text-zinc-500">Rule-based checks of available résumé fields</p>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {atsAudit.passedCount} / {atsAudit.totalCount} Passed
                        </span>
                      </div>

                      <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-none">
                        {atsAudit.checks.map((check) => (
                          <div
                            key={check.id}
                            className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                          >
                            <div className="flex items-start gap-2.5">
                              {check.passed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              )}
                              <div className="space-y-0.5">
                                <div className="text-xs font-bold text-zinc-900 dark:text-white">
                                  {check.title}
                                </div>
                                <div className="text-xs text-zinc-500 leading-relaxed">
                                  {check.explanation}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 pl-6 sm:pl-0">
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                  check.passed
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                                }`}
                              >
                                {check.passed ? 'PASS' : 'FLAG'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: FIX BULLETS WITH GOOGLE X-Y-Z (MINIMALIST COMPARISON LIST) */}
                  {activeTab === 'rewriter' && (
                    <div className="p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider block">
                            Google X-Y-Z Method: Accomplished [X] as measured by [Y], by doing [Z]
                          </span>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                            Selected Bullet Point:
                          </h4>
                        </div>
                      </div>

                      <textarea
                        ref={rewriterRef}
                        value={rewriterInput}
                        onChange={(e) => {
                          setRewriterInput(e.target.value);
                          autoResize(e.target);
                        }}
                        placeholder="Type or select a bullet point from the resume below..."
                        className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 leading-relaxed resize-none overflow-hidden min-h-[56px] shadow-none"
                      />

                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                          Recommended High-Impact Variations:
                        </span>

                        <div className="space-y-2">
                          {rewrittenOptions.map((opt, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-none hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                                    {opt.type}
                                  </span>
                                  <span className="text-xs font-mono text-emerald-600 font-semibold">
                                    Draft suggestion
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                                  • {opt.text}
                                </p>
                              </div>
                              <button
                                onClick={() => handleApplyRewrite(opt.text)}
                                className="shrink-0 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Apply</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Navigation for Audit Mode */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-none">
                  <button
                    type="button"
                    onClick={() => setStudioTab('document')}
                    className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Resume Canvas</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleOneClickOptimize}
                      className="px-4 py-2.5 rounded-lg border border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-emerald-600 fill-current" />
                      <span>Auto-Fix All Remaining Issues</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportPdf}
                      className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 1: RESUME CANVAS (DEFAULT MODE) */}
            {studioTab === 'document' && (
              <div className="space-y-4">
                
                {/* Slim Minimalist Canvas Utility Bar */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 px-1 py-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider hidden sm:inline">
                      Single-Column ATS Canvas
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">·</span>

                    <button
                      type="button"
                      onClick={() => setShowFormulaModal(true)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                      title="Click to view ATS scoring formula"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Heuristic score: <strong>{compositeScore}%</strong></span>
                    </button>

                    {deepAudit.categories.content.quantifyingImpact.issueCount > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>{deepAudit.categories.content.quantifyingImpact.issueCount} unquantified</span>
                      </span>
                    )}

                    {keywordAnalysis.missing.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                        <Search className="w-3 h-3" />
                        <span>{keywordAnalysis.missing.length} missing skills</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                        className="p-1 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1.5 min-w-[38px] text-center text-zinc-800 dark:text-zinc-200">
                        {zoomLevel}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))}
                        className="p-1 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Focus Mode Button */}
                    <button
                      type="button"
                      onClick={() => setIsFocusMode(!isFocusMode)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isFocusMode
                          ? 'bg-emerald-600 text-white border-transparent'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-600 bg-white dark:bg-zinc-900'
                      }`}
                      title={isFocusMode ? "Exit Focus Mode" : "Focus Mode"}
                    >
                      {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Paper Sheet with Transform Zoom */}
                <div className="overflow-x-auto pb-4">
                  <div
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 sm:p-12 shadow-none space-y-7 text-zinc-900 dark:text-zinc-100 max-w-[860px] mx-auto"
                  >
              
              {/* DOCUMENT HEADER */}
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 space-y-3">

                <div className="space-y-1">
                  <input
                    type="text"
                    value={resume.fullName}
                    onChange={(e) => {
                      setResume({ ...resume, fullName: e.target.value });
                      setHasEdited(true);
                    }}
                    className="w-full text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none transition-colors tracking-tight"
                    placeholder="Your Full Name"
                  />
                  
                  <input
                    type="text"
                    value={resume.jobTitle}
                    onChange={(e) => {
                      setResume({ ...resume, jobTitle: e.target.value });
                      setHasEdited(true);
                    }}
                    className="w-full text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Target Professional Title"
                  />
                </div>
                
                {/* Contact Line */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="email"
                      value={resume.email}
                      onChange={(e) => {
                        setResume({ ...resume, email: e.target.value });
                        setHasEdited(true);
                      }}
                      className="bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={resume.phone}
                      onChange={(e) => {
                        setResume({ ...resume, phone: e.target.value });
                        setHasEdited(true);
                      }}
                      className="bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={resume.location}
                      onChange={(e) => {
                        setResume({ ...resume, location: e.target.value });
                        setHasEdited(true);
                      }}
                      className="bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="City, State"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={resume.linkedin}
                      onChange={(e) => {
                        setResume({ ...resume, linkedin: e.target.value });
                        setHasEdited(true);
                      }}
                      className="bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="linkedin.com/in/profile"
                    />
                  </div>
                </div>

              </div>

              {/* SECTION: SUMMARY */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-zinc-800">
                  <h3 className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Professional Summary
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Editable</span>
                </div>
                <textarea
                  ref={summaryRef}
                  value={resume.summary}
                  onChange={(e) => {
                    setResume({ ...resume, summary: e.target.value });
                    setHasEdited(true);
                    autoResize(e.target);
                  }}
                  className="w-full text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-zinc-800 focus:border-emerald-500 focus:bg-slate-50 dark:focus:bg-zinc-900 rounded-lg p-2 focus:outline-none transition-all resize-none overflow-hidden"
                />
              </div>

              {/* SECTION: SKILLS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-zinc-800">
                  <h3 className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Skills & Competencies
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {resume.skills.length} skills listed
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {resume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 transition-all"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove skill"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Inline Add Skill */}
                <form onSubmit={handleAddNewSkill} className="flex gap-2 pt-1 max-w-md">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add a skill (e.g. System Architecture, Redis, AWS)..."
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors flex-1"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              </div>

              {/* SECTION: TECHNICAL PROJECTS */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Technical Projects
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ({(resume.projects || []).length} {(resume.projects || []).length === 1 ? 'project' : 'projects'})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                {(!resume.projects || resume.projects.length === 0) ? (
                  <div className="p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center space-y-2">
                    <p className="text-xs text-zinc-500">No projects added yet. Adding 2–3 technical projects showcases hands-on engineering capability.</p>
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Technical Project</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {resume.projects.map((proj, projIdx) => (
                      <div key={proj.id} className="space-y-3 p-3 sm:p-4 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/30 dark:bg-zinc-900/30">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-1">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={proj.name}
                                onChange={(e) => handleUpdateProject(projIdx, 'name', e.target.value)}
                                className="w-full text-base sm:text-lg font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none"
                                placeholder="Project Name (e.g. MoodMate, PDFlex)"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(projIdx)}
                                className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                                title="Delete this project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <input
                                type="text"
                                value={proj.role || ''}
                                onChange={(e) => handleUpdateProject(projIdx, 'role', e.target.value)}
                                className="font-semibold text-emerald-700 dark:text-emerald-400 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none"
                                placeholder="Your Role (e.g. Lead Developer)"
                              />
                              <span className="text-slate-400 font-normal">·</span>
                              <input
                                type="text"
                                value={proj.technologies || ''}
                                onChange={(e) => handleUpdateProject(projIdx, 'technologies', e.target.value)}
                                className="text-slate-500 dark:text-zinc-400 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none flex-1 min-w-[180px]"
                                placeholder="Technologies (e.g. React, Flask, SQLite, Render)"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
                            <input
                              type="text"
                              value={proj.startDate || ''}
                              onChange={(e) => handleUpdateProject(projIdx, 'startDate', e.target.value)}
                              className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none font-medium tabular-nums"
                              placeholder="2025"
                            />
                            <span>–</span>
                            <input
                              type="text"
                              value={proj.endDate || ''}
                              onChange={(e) => handleUpdateProject(projIdx, 'endDate', e.target.value)}
                              className="w-20 text-left bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none font-medium tabular-nums"
                              placeholder="Present"
                            />
                          </div>
                        </div>

                        {/* Bullets with In-Place Edit, Hover Improve Action & Metric Tags */}
                        <ul className="space-y-2.5 pt-1">
                          {proj.bullets.map((bullet, bulletIdx) => {
                            const isSelected =
                              selectedBulletIndex.section === 'project' &&
                              selectedBulletIndex.itemIdx === projIdx &&
                              selectedBulletIndex.bulletIdx === bulletIdx;
                            const hasMetric = hasQuantifiableMetric(bullet);

                            return (
                              <li
                                key={bulletIdx}
                                className={`p-3 rounded-xl transition-all flex items-start justify-between gap-3 group ${
                                  isSelected
                                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700'
                                    : 'hover:bg-slate-50 dark:hover:bg-zinc-900 border border-transparent'
                                }`}
                              >
                                <div className="flex-1 space-y-1.5">
                                  <div className="flex items-start gap-2">
                                    <span className="text-slate-400 font-bold select-none mt-0.5">•</span>
                                    <textarea
                                      value={bullet}
                                      rows={2}
                                      onChange={(e) => handleUpdateProjectBullet(projIdx, bulletIdx, e.target.value)}
                                      className="w-full text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed bg-transparent border-0 focus:outline-none resize-none p-0 focus:ring-0"
                                      placeholder="Describe your project achievement using Google X-Y-Z formula..."
                                    />
                                  </div>
                                  <div className="flex items-center gap-2 pl-4">
                                    {hasMetric ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 font-mono">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        <span>Google X-Y-Z Quantified</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/60 font-mono">
                                        <AlertCircle className="w-3 h-3 text-amber-600" />
                                        <span>Lacks Metric · Click Improve</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleSelectProjectBulletForRewrite(projIdx, bulletIdx, bullet)}
                                    className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                                    title="Improve with Google X-Y-Z formula"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors" />
                                    <span>Improve</span>
                                  </button>
                                  {proj.bullets.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteProjectBullet(projIdx, bulletIdx)}
                                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                                      title="Delete bullet point"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="pl-2 pt-1.5">
                          <button
                            type="button"
                            onClick={() => handleAddProjectBullet(projIdx)}
                            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 inline-flex items-center gap-1.5 cursor-pointer py-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Bullet Point</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION: EXPERIENCE */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Work Experience
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">({resume.experience.length} positions)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Position</span>
                  </button>
                </div>

                {resume.experience.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center space-y-1.5">
                    <p className="text-xs text-zinc-500">Optional for Freshers/Students: Have corporate, internship, or freelance experience? Click below to add.</p>
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Work Experience</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {resume.experience.map((exp, expIdx) => (
                      <div key={exp.id} className="space-y-3 p-3 sm:p-4 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/30 dark:bg-zinc-900/30">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-1">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleUpdateExperience(expIdx, 'role', e.target.value)}
                                className="w-full text-base sm:text-lg font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none"
                                placeholder="Job Title (e.g. Senior Software Engineer)"
                              />
                              {(resume.experience.length > 1 || (resume.projects && resume.projects.length > 0)) && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteExperience(expIdx)}
                                  className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                                  title="Delete this position"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleUpdateExperience(expIdx, 'company', e.target.value)}
                                className="font-semibold text-emerald-700 dark:text-emerald-400 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none"
                                placeholder="Company Name"
                              />
                              <span className="text-slate-400 font-normal">·</span>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => handleUpdateExperience(expIdx, 'location', e.target.value)}
                                className="text-slate-500 dark:text-zinc-400 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-zinc-700 focus:border-emerald-500 focus:outline-none"
                                placeholder="City, State / Remote"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => handleUpdateExperience(expIdx, 'startDate', e.target.value)}
                              className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none font-medium tabular-nums"
                              placeholder="Jan 2022"
                            />
                            <span>–</span>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => handleUpdateExperience(expIdx, 'endDate', e.target.value)}
                              className="w-20 text-left bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none font-medium tabular-nums"
                              placeholder="Present"
                            />
                          </div>
                        </div>

                        {/* Bullets with In-Place Edit, Hover Improve Action & Metric Tags */}
                        <ul className="space-y-2.5 pt-1">
                          {exp.bullets.map((bullet, bulletIdx) => {
                            const isSelected =
                              selectedBulletIndex.section === 'experience' &&
                              selectedBulletIndex.itemIdx === expIdx &&
                              selectedBulletIndex.bulletIdx === bulletIdx;
                            const hasMetric = hasQuantifiableMetric(bullet);

                            return (
                              <li
                                key={bulletIdx}
                                className={`p-3 rounded-xl transition-all flex items-start justify-between gap-3 group ${
                                  isSelected
                                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700'
                                    : 'hover:bg-slate-50 dark:hover:bg-zinc-900 border border-transparent'
                                }`}
                              >
                                <div className="flex-1 space-y-1.5">
                                  <div className="flex items-start gap-2">
                                    <span className="text-slate-400 font-bold select-none mt-0.5">•</span>
                                    <textarea
                                      value={bullet}
                                      rows={2}
                                      onChange={(e) => handleUpdateBullet(expIdx, bulletIdx, e.target.value)}
                                      className="w-full text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed bg-transparent border-0 focus:outline-none resize-none p-0 focus:ring-0"
                                      placeholder="Describe your achievement using Google X-Y-Z formula..."
                                    />
                                  </div>
                                  <div className="flex items-center gap-2 pl-4">
                                    {hasMetric ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 font-mono">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        <span>Google X-Y-Z Quantified</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/60 font-mono">
                                        <AlertCircle className="w-3 h-3 text-amber-600" />
                                        <span>Lacks Metric · Click Improve</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleSelectBulletForRewrite(expIdx, bulletIdx, bullet)}
                                    className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                                    title="Improve with Google X-Y-Z formula"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors" />
                                    <span>Improve</span>
                                  </button>
                                  {exp.bullets.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteBullet(expIdx, bulletIdx)}
                                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                                      title="Delete bullet point"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="pl-2 pt-1.5">
                          <button
                            type="button"
                            onClick={() => handleAddBullet(expIdx)}
                            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 inline-flex items-center gap-1.5 cursor-pointer py-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Bullet Point</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION: EDUCATION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-zinc-800">
                  <h3 className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Education
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Education</span>
                  </button>
                </div>
                {resume.education.map((edu, eduIdx) => (
                  <div key={edu.id} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-colors flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group">
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(eduIdx, 'degree', e.target.value)}
                        className="w-full text-sm sm:text-base font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none"
                        placeholder="Degree (e.g. B.S. in Computer Science)"
                      />
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleUpdateEducation(eduIdx, 'school', e.target.value)}
                          className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none"
                          placeholder="School / University"
                        />
                        <span>·</span>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => handleUpdateEducation(eduIdx, 'location', e.target.value)}
                          className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleUpdateEducation(eduIdx, 'year', e.target.value)}
                        className="w-28 text-xs text-slate-500 dark:text-zinc-400 font-medium tabular-nums text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none"
                        placeholder="Graduation Year"
                      />
                      {resume.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteEducation(eduIdx)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                          title="Delete education entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* BOTTOM ACTIONS BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-none">
            <button
              onClick={() => {
                setViewMode('landing');
                setIsFocusMode(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Marketing Overview</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleExportAuditScorecard}
                className="px-4 py-2.5 rounded-lg border border-emerald-600/40 bg-emerald-50/50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-none"
              >
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>ATS Report Scorecard</span>
              </button>

              <button
                onClick={handleExportTxt}
                className="px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-zinc-800 dark:text-zinc-200 text-sm font-semibold transition-colors shadow-none cursor-pointer"
              >
                Export .txt
              </button>

              <button
                onClick={handleExportPdf}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive PDF</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  )}

      {/* MATHEMATICAL ATS SCORE FORMULA BREAKDOWN MODAL */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="formula-modal-title" tabIndex={-1} className="relative w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-none p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  <Info className="w-3 h-3" />
                  <span>TRANSPARENT ALGORITHMIC AUDITING</span>
                </div>
                <h3 id="formula-modal-title" className="text-lg font-bold text-zinc-900 dark:text-white">
                  ATS Readiness Formula
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close formula inspector"
                onClick={() => setShowFormulaModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Formula Mathematical Display */}
            <div className="p-3.5 rounded-lg bg-zinc-950 text-white font-mono text-center space-y-1.5 border border-zinc-800 shadow-none">
              <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Exact Mathematical Model:</span>
              <div className="text-base font-bold text-white tracking-wide">
                {hasRecognizedTargetTerms
                  ? 'S = 0.40K + 0.25F + 0.20M + 0.15R'
                  : `S = ${(formattingWeight).toFixed(2)}F + ${(metricsWeight).toFixed(2)}M + ${(completenessWeight).toFixed(2)}R (K not assessed)`}
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                This is a ToolForge heuristic. It is not calibrated against employer ATS engines.
              </p>
            </div>

            {/* 4 Component Live Weights Breakdown */}
            <div className="space-y-2 text-xs">
              
              {/* K: Keyword Match */}
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-none">
                <div className="space-y-0.5">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">
                    K · Target Job Keyword Match ({hasRecognizedTargetTerms ? '40% Weight' : 'Not assessed'})
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {hasRecognizedTargetTerms
                      ? `${keywordAnalysis.matched.length} of ${keywordAnalysis.totalJdKeywords} recognized skill terms found across résumé sections`
                      : targetJd.trim()
                        ? 'No supported skill terms were found in this job description.'
                        : 'Add a target job description to assess keyword overlap.'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white text-sm">
                    {hasRecognizedTargetTerms ? `${keywordAnalysis.matchRate}%` : 'N/A'}
                  </span>
                  <span className="text-[10px] text-emerald-600 block font-mono">
                    +{(keywordWeight * K).toFixed(1)} pts
                  </span>
                </div>
              </div>

              {/* F: Formatting */}
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-none">
                <div className="space-y-0.5">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">
                    F · Section and Date Fields ({(formattingWeight * 100).toFixed(0)}% Weight)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Common section labels and date fields are checked; uploaded page layout is not assessed
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white text-sm">
                    {atsAudit.formattingScore}%
                  </span>
                  <span className="text-[10px] text-emerald-600 block font-mono">
                    +{(formattingWeight * F).toFixed(1)} pts
                  </span>
                </div>
              </div>

              {/* M: Measurable Metrics */}
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-none">
                <div className="space-y-0.5">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">
                    M · Measurable Bullet Details ({(metricsWeight * 100).toFixed(0)}% Weight)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {atsAudit.bulletsWithMetricsCount} of {atsAudit.allBulletsCount} bullets include numbers, % or scale
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white text-sm">
                    {atsAudit.metricRate}%
                  </span>
                  <span className="text-[10px] text-emerald-600 block font-mono">
                    +{(metricsWeight * M).toFixed(1)} pts
                  </span>
                </div>
              </div>

              {/* R: Role Completeness */}
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-none">
                <div className="space-y-0.5">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">
                    R · Role & Contact Fields ({(completenessWeight * 100).toFixed(0)}% Weight)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Email, phone, target job title, and summary completeness
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white text-sm">
                    {atsAudit.roleCompletenessScore}%
                  </span>
                  <span className="text-[10px] text-emerald-600 block font-mono">
                    +{(completenessWeight * R).toFixed(1)} pts
                  </span>
                </div>
              </div>

            </div>

            {/* Composite Calculation Result */}
            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between shadow-none">
              <div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                  Composite heuristic score:
                </span>
                <span className="text-[11px] text-zinc-500">
                  {compositeScore >= 85 ? '✓ Strong heuristic indicators' : compositeScore >= 70 ? '✓ Review the details below' : '⚠️ Several areas may need review'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-zinc-900 dark:text-white font-mono">
                  {compositeScore} / 100
                </span>
              </div>
            </div>

            {/* Explanation Note */}
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
              <strong>Note on Target Job Match:</strong>{' '}
              {hasRecognizedTargetTerms
                ? `Recognized skill terms found: ${keywordAnalysis.matched.length} of ${keywordAnalysis.totalJdKeywords} (${keywordAnalysis.matchRate}%). Keyword match contributes 40%; formatting, measurable bullets, and profile completeness contribute 25%, 20%, and 15%.`
                : 'Keyword match is not assessed because no supported job-description terms were found. The remaining formatting, measurable-bullet, and profile-completeness weights are renormalized to total 100%.'}
            </p>

            <button
              type="button"
              onClick={() => setShowFormulaModal(false)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm cursor-pointer active:scale-[0.98]"
            >
              Close Formula Inspector
            </button>

          </div>
        </div>
      )}

      {/* CREATE YOUR RESUME / STARTER TEMPLATES MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="create-resume-modal-title" tabIndex={-1} className="relative w-full max-w-2xl rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-none p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>ATS RESUME STARTER</span>
                </div>
                <h3 id="create-resume-modal-title" className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                  Choose a Resume Starter
                </h3>
                <p className="text-xs text-zinc-500">
                  Pre-configured single-column ATS layouts. Click any to load and edit.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close resume starter picker"
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: Clean Starter Canvas (Recommended) */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleCreateNewResume('starter_clean'); } }}
                onClick={() => handleCreateNewResume('starter_clean')}
                className="p-3.5 rounded-lg border border-emerald-600 bg-white dark:bg-zinc-900 transition-colors cursor-pointer space-y-2 relative shadow-none"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                    Default
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Clean Starter Canvas
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Optimal single-column hierarchy, bullet placeholders, and standard sections.
                </p>
              </div>

              {/* Option 2: Software Engineer */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleCreateNewResume('software_engineer'); } }}
                onClick={() => handleCreateNewResume('software_engineer')}
                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer space-y-2 shadow-none"
              >
                <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Senior Software Engineer
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Distributed systems, high-scale Go & TypeScript microservices, and Kafka streams.
                </p>
              </div>

              {/* Option 3: AI / ML Engineer */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleCreateNewResume('ai_ml_engineer'); } }}
                onClick={() => handleCreateNewResume('ai_ml_engineer')}
                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer space-y-2 shadow-none"
              >
                <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  AI & Machine Learning
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  LLMs, PyTorch, RAG architectures, model inference optimization, and vector search.
                </p>
              </div>

              {/* Option 4: Product Manager */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleCreateNewResume('product_manager'); } }}
                onClick={() => handleCreateNewResume('product_manager')}
                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer space-y-2 shadow-none"
              >
                <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Product Manager
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Product-led growth (PLG), B2B SaaS ARR expansion, conversion optimization & OKRs.
                </p>
              </div>

              {/* Option 5: Finance & Operations */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleCreateNewResume('finance_ops'); } }}
                onClick={() => handleCreateNewResume('finance_ops')}
                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer space-y-2 shadow-none"
              >
                <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Finance & Operations
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  FP&A, EBITDA optimization, operational models, and vendor management.
                </p>
              </div>

              {/* Option 6: Blank Slate */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleCreateNewResume('blank_slate'); } }}
                onClick={() => handleCreateNewResume('blank_slate')}
                className="p-3.5 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/30 dark:bg-zinc-900/20 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer space-y-2 shadow-none"
              >
                <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Blank Slate
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Clean starter template ready to type in your own custom achievements from scratch.
                </p>
              </div>

            </div>

            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center shadow-none">
              <p className="text-xs text-zinc-500">
                🔒 <strong>Local Privacy:</strong> Résumé text is processed in your browser and is not sent to ToolForge servers. The site may request external fonts.
              </p>
            </div>

          </div>
        </div>
      )}

    </>
  );
};
