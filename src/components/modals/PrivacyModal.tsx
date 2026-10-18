import React from 'react';
import { X, ShieldCheck, HardDrive, EyeOff, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const guarantees = [
  {
    icon: HardDrive,
    title: 'Runs on your device',
    body: 'Your browser reads the resume. Nothing is sent over the internet — the same way a calculator works offline.',
    color: 'emerald',
  },
  {
    icon: EyeOff,
    title: 'Nothing is stored',
    body: "We don't have a database. When you close this tab, everything disappears — name, phone, job history, all of it.",
    color: 'blue',
  },
  {
    icon: Lock,
    title: 'Never used to train AI',
    body: 'Many sites secretly use your uploaded resume to train AI models or sell data to recruiters. We never do.',
    color: 'purple',
  },
  {
    icon: CheckCircle2,
    title: 'No account required',
    body: "No sign-up, no email verification, no password. Open the page and start working.",
    color: 'amber',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-900', icon: 'text-emerald-600 dark:text-emerald-400' },
  blue:    { bg: 'bg-blue-50 dark:bg-blue-950/30',    border: 'border-blue-200 dark:border-blue-900',    icon: 'text-blue-600 dark:text-blue-400'    },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-900', icon: 'text-purple-600 dark:text-purple-400' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-950/30',   border: 'border-amber-200 dark:border-amber-900',   icon: 'text-amber-600 dark:text-amber-400'   },
};

const sections = [
  {
    title: 'What information do we collect?',
    body: "Résumé content — name, contact details, job history, skills, and education — is processed in your browser and is not sent to ToolForge servers. It remains in the current page session."
  },
  {
    title: 'Do we use cookies or tracking?',
    body: "The site stores a light or dark theme preference in localStorage; this is not a cookie. The site also loads fonts from Google Fonts, which receives standard connection metadata."
  },
  {
    title: 'Do we share data with third parties?',
    body: "Résumé content is not sent to ToolForge servers. Google Fonts receives standard connection metadata when font assets load; résumé content is not included in those requests."
  },
  {
    title: 'What about AI features?',
    body: "All analysis (keyword matching, ATS scoring, formatting checks, bullet suggestions) runs locally using rule-based logic. We don't send your resume to any AI API — no OpenAI, Gemini, or Claude calls when processing your resume."
  },
  {
    title: 'File uploads',
    body: "If you upload a PDF or DOCX, your browser reads it using standard Web APIs. The file is extracted in memory to populate the editor. It is never uploaded to a server."
  },
];

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl text-slate-900 dark:text-zinc-100">

        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Privacy Policy</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Résumé text stays in your browser · Updated Oct 2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Guarantee cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guarantees.map(({ icon: Icon, title, body, color }) => {
              const c = colorMap[color];
              return (
                <div key={title} className={`p-4 rounded-xl border ${c.bg} ${c.border} space-y-2`}>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${c.icon}`} />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{title}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{body}</p>
                </div>
              );
            })}
          </div>

          {/* Why we built it this way */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Why we built it this way</h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              When you're looking for a job, the last thing you want is your personal contact information, salary history, and employment records on a company's server where they could be leaked or sold. ToolForge runs everything in your browser — zero risk of data leaks, 100% peace of mind.
            </p>
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
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Got it, back to my resume
          </button>
        </div>
      </div>
    </div>
  );
};
