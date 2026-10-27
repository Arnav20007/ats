import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const doList = [
  'Use ATSCheck to check and improve your own resume',
  'Share it with friends and colleagues looking for work',
  'Edit sample resumes as a starting point for your own',
  'Export your resume as PDF or plain text for any application',
];

const dontList = [
  'Run automated bots or scrapers against the tool',
  'Resell or repackage the analysis logic as your own service',
  'Use the tool for anything that breaks the law',
];

const sections = [
  {
    title: 'What ATSCheck is',
    body: "A free, browser-based ATS resume checker and editor. It helps you understand how your resume performs, find missing keywords, and rewrite weak bullet points. All analysis runs in your browser."
  },
  {
    title: 'What ATSCheck is not',
    body: "A recruitment agency, staffing firm, or career counseling service. We don't review your resume manually, contact employers on your behalf, or guarantee interviews or job offers."
  },
  {
    title: 'Your content',
    body: "Your resume is yours. Since ATSCheck runs entirely in your browser and never transmits data to our servers, we make no claim to ownership of anything you write or upload."
  },
  {
    title: 'Accuracy',
    body: "Our ATS scoring and keyword matching are based on best-practice patterns. They're a helpful guide, not a guarantee. Different employers use different ATS systems with different rules — always apply your own judgment."
  },
  {
    title: 'No warranty',
    body: 'ATSCheck is provided "as is". We do our best to keep it accurate and working, but we can\'t guarantee it will always be available or perfectly up to date with every ATS system on the market.'
  },
  {
    title: 'Contact',
    body: "Questions about these terms? Email contact@atscheck.tech or arnavsinghas1221@gmail.com and we'll respond in plain English."
  },
];

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl text-slate-900 dark:text-zinc-100">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800">
              <FileText className="w-5 h-5 text-slate-600 dark:text-zinc-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Terms of Use</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Plain English, no legalese · Updated Oct 2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Do / Don't cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">You can</span>
              </div>
              <ul className="space-y-2">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/20 space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span className="text-sm font-bold text-rose-700 dark:text-rose-300">You can't</span>
              </div>
              <ul className="space-y-2">
                {dontList.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sections */}
          <div className="divide-y divide-slate-100 dark:divide-zinc-800">
            {sections.map(({ title, body }) => (
              <div key={title} className="py-4 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-700 dark:hover:bg-zinc-100 text-white dark:text-slate-900 font-semibold text-sm transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
