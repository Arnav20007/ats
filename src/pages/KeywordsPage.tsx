import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  Zap,
  Target,
  Database,
  Cpu,
  Layers,
  FileCheck,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { ROLE_KEYWORD_PROFILES, RoleKeywordData } from '../data/roleKeywords';
import { useToast } from '../components/Toast';

interface KeywordsPageProps {
  onNavigateHome: () => void;
  onSelectRoleTemplate?: (templateKey: string) => void;
  initialRoleSlug?: string;
}

export const KeywordsPage: React.FC<KeywordsPageProps> = ({
  onNavigateHome,
  onSelectRoleTemplate,
  initialRoleSlug = 'software-engineer'
}) => {
  const { showToast } = useToast();
  const [activeSlug, setActiveSlug] = useState<string>(initialRoleSlug);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedFormulaIdx, setCopiedFormulaIdx] = useState<number | null>(null);

  const activeProfile: RoleKeywordData =
    ROLE_KEYWORD_PROFILES[activeSlug] || ROLE_KEYWORD_PROFILES['software-engineer'];

  const handleCopySingleKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    showToast(`Copied "${keyword}" to clipboard`, 'copy');
    setTimeout(() => setCopiedKeyword(null), 1800);
  };

  const handleCopyAllCategoryKeywords = (categoryName: string, keywords: string[]) => {
    const text = keywords.join(', ');
    navigator.clipboard.writeText(text);
    showToast(`Copied ${keywords.length} ${categoryName} keywords!`, 'copy');
  };

  const handleCopyFormula = (index: number, formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormulaIdx(index);
    showToast('Copied Google X-Y-Z bullet example!', 'copy');
    setTimeout(() => setCopiedFormulaIdx(null), 1800);
  };

  const handleLoadInStudio = () => {
    if (onSelectRoleTemplate) {
      onSelectRoleTemplate(activeProfile.starterTemplateKey);
    } else {
      onNavigateHome();
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-12 animate-in fade-in duration-200">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Resume Checker</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            PAGE: /KEYWORDS/{activeSlug.toUpperCase()}
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-5 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 ATS Keyword Database</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {activeProfile.seoTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-3xl">
            {activeProfile.overview}
          </p>

          {/* Role Switcher Tabs */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-2.5">
              Select Career Profile:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.values(ROLE_KEYWORD_PROFILES).map((prof) => {
                const isActive = prof.slug === activeSlug;
                return (
                  <button
                    key={prof.slug}
                    onClick={() => setActiveSlug(prof.slug)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:border-emerald-400'
                    }`}
                  >
                    <span>{prof.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {activeProfile.categories.reduce((acc, c) => acc + c.keywords.length, 0)}
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 block font-medium">
                Verified ATS Keywords
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {activeProfile.categories.length}
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 block font-medium">
                Skill Competency Domains
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                3
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 block font-medium">
                Google X-Y-Z Formulas
              </span>
            </div>
          </div>
        </div>

        {/* Categorized Keywords Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Core Skill Terms & Technology Keywords
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-zinc-400 hidden sm:inline">
              Click any keyword to copy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProfile.categories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {cat.categoryName}
                    </h3>
                    <button
                      onClick={() => handleCopyAllCategoryKeywords(cat.categoryName, cat.keywords)}
                      className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy All</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.keywords.map((kw) => {
                    const isCopied = copiedKeyword === kw;
                    return (
                      <button
                        key={kw}
                        onClick={() => handleCopySingleKeyword(kw)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer flex items-center gap-1.5 ${
                          isCopied
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-600'
                        }`}
                        title="Click to copy keyword"
                      >
                        <span>{kw}</span>
                        {isCopied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-2.5 h-2.5 text-slate-400 opacity-60" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google X-Y-Z Bullet Examples */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Battle-Tested Google X-Y-Z Achievement Formulas
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              Google's hiring formula: <em>"Accomplished [X], as measured by [Y], by doing [Z]"</em>. Use these proven structures with your own real numbers:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeProfile.googleXyzExamples.map((item, idx) => {
              const isCopied = copiedFormulaIdx === idx;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                      {item.title}
                    </span>
                    <button
                      onClick={() => handleCopyFormula(idx, item.formula)}
                      className="px-3 py-1 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{isCopied ? 'Copied' : 'Copy Formula'}</span>
                    </button>
                  </div>

                  <p className="text-sm font-medium text-slate-900 dark:text-white font-mono bg-slate-50 dark:bg-zinc-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 leading-relaxed">
                    "{item.formula}"
                  </p>

                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    💡 <strong>Why it wins:</strong> {item.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recruiter Screening Criteria & ATS Formatting Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Recruiter 6-Second Screening Scan */}
          <div className="p-6 sm:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold">
                How Recruiters Screen a {activeProfile.shortTitle} Resume
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              The 6-second scan criteria hiring managers and automated filters evaluate first:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
              {activeProfile.recruiterScreeningChecklist?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ATS Parsing & Layout Guardrails */}
          <div className="p-6 sm:p-8 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold">
                  {activeProfile.shortTitle} ATS Formatting &amp; Parsing Guide
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                {activeProfile.atsFormattingAdvice}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300 font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Audit your layout with ToolForge's 100% in-browser single-column PDF parser.</span>
            </div>
          </div>
        </div>

        {/* Common ATS Resume Mistakes */}
        <div className="p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold">
              3 Common Mistakes to Avoid for {activeProfile.shortTitle} Resumes
            </h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
            {activeProfile.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">✕</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary CTA: Open in Resume Studio */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black">
              Ready to test your {activeProfile.shortTitle} resume?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              Check formatting, match your target job description, and polish your bullet points for free.
            </p>
          </div>
          <button
            onClick={handleLoadInStudio}
            className="px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-extrabold transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Open in Free Resume Checker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
