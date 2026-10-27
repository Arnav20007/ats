import React from 'react';
import { FileText, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface TermsPageProps {
  onNavigateHome: () => void;
}

const doList = [
  'Use ATSCheck to analyze and optimize your personal resume for any job application',
  'Export unlimited clean PDF and plain text documents with standard ATS formatting',
  'Edit sample candidate templates as a baseline for your own career materials',
  'Share ATSCheck with colleagues, students, and job seekers looking for work',
];

const dontList = [
  'Run automated scrapers, bots, or DDoS traffic against the web client',
  'Resell, repackage, or white-label the client code as a commercial paywalled service',
  'Attempt to reverse-engineer proprietary algorithms for malicious purposes',
  'Use the tool to generate fraudulent, deceptive, or unlawful materials',
];

const termsSections = [
  {
    title: '1. What ATSCheck Is',
    content: "ATSCheck is a free, browser-based utility that checks résumé text and compares it with job-description keywords. Its results are heuristics and do not measure compatibility with a specific employer's applicant tracking system.",
  },
  {
    title: '2. What ATSCheck Is Not',
    content: "ATSCheck is not a recruitment agency, staffing firm, employment broker, or career counseling entity. We do not review resumes manually, submit applications on your behalf, or guarantee interview callbacks, placement, or hiring outcomes.",
  },
  {
    title: '3. Intellectual Property and Content Ownership',
    content: "Your résumé text is processed in your browser and is not sent to ATSCheck application servers by the resume review code. Theme preference may be saved in local browser storage. Google Analytics, Google AdSense, and Google Fonts also load on the site and may process standard page or browser data under their policies. This page does not claim rights to your résumé content.",
  },
  {
    title: '4. Scoring and Algorithmic Disclaimers',
    content: "Résumé readiness scores and keyword percentages are ATSCheck heuristics. ATSCheck does not test documents in employer applicant tracking systems, whose configurations and screening criteria vary. Use your own judgment when reviewing the suggestions.",
  },
  {
    title: '5. "As-Is" Warranty Disclaimer',
    content: "ATSCheck is provided on an 'as-is' and 'as-available' basis without warranties of any kind, whether express or implied. We do not warrant that operation will be uninterrupted, error-free, or compatible with every document or employer system.",
  },
  {
    title: '6. Limitation of Liability',
    content: "To the maximum extent permitted by applicable law, ATSCheck and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of or inability to use this free service.",
  },
  {
    title: '7. Amendments and Contact',
    content: "We may update these terms periodically to reflect technical or legal requirements. Continued use constitutes acceptance. For inquiries regarding these terms, contact contact@atscheck.tech or arnavsinghas1221@gmail.com.",
  },
];

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-12 animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Resume Checker</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            PAGE: /TERMS
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <FileText className="w-3.5 h-3.5" />
            <span>Transparent Usage Guidelines</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Terms of Use
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
            Clear, transparent terms written in plain English. No hidden traps, no forced subscriptions, and no legalese.
          </p>

          <div className="pt-1 text-xs text-slate-400 font-mono">
            Last updated: October 2026 · Effective immediately
          </div>
        </div>

        {/* You Can vs You Can't Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">What You Can Do</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
              {doList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 shadow-2xs">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">What You Cannot Do</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-rose-800 dark:text-rose-300">
              {dontList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="space-y-8 rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 shadow-sm">
          {termsSections.map((sec, i) => (
            <div key={i} className="space-y-2 border-b border-slate-100 dark:border-zinc-800/80 last:border-0 pb-6 last:pb-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {sec.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Optimize your resume for applicant tracking systems
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 font-normal">
              100% free forever · No credit card required.
            </p>
          </div>

          <button
            onClick={onNavigateHome}
            className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-emerald-50 font-bold text-sm transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer active:scale-[0.99]"
          >
            <span>Launch ATS Checker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
