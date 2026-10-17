import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AtsSystem {
  name: string;
  category: string;
  marketShare: string;
  status: string;
  icon: React.ReactNode;
}

const SYSTEMS: AtsSystem[] = [
  {
    name: 'Workday',
    category: 'Enterprise HRIS',
    marketShare: '34% of Fortune 500',
    status: '100% Parsed',
    icon: (
      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Greenhouse',
    category: 'High-Growth Tech',
    marketShare: 'Top Tech Standard',
    status: '100% Parsed',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
      </svg>
    ),
  },
  {
    name: 'Lever',
    category: 'Modern Hiring',
    marketShare: 'Silicon Valley Standard',
    status: '100% Parsed',
    icon: (
      <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v18M18 3v18M6 8l12 8M6 16l12-8" />
      </svg>
    ),
  },
  {
    name: 'Oracle Taleo',
    category: 'Global Enterprise',
    marketShare: 'Defense & Govt Standard',
    status: '100% Parsed',
    icon: (
      <svg className="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="4" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'iCIMS',
    category: 'Talent Cloud',
    marketShare: 'Healthcare & Retail',
    status: '100% Parsed',
    icon: (
      <svg className="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A7.003 7.003 0 0 1 5.07 11H5a1 1 0 0 1 0-2h.07A7.003 7.003 0 0 1 11 5.07V5a1 1 0 0 1 2 0v.07A7.003 7.003 0 0 1 18.93 11H19a1 1 0 0 1 0 2h-.07A7.003 7.003 0 0 1 13 16.93z" />
      </svg>
    ),
  },
  {
    name: 'Ashby',
    category: 'Next-Gen ATS',
    marketShare: 'AI & YC Startups',
    status: '100% Parsed',
    icon: (
      <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export const AtsLogos: React.FC = () => {
  return (
    <div className="w-full border-y border-slate-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
              Verified 100% Readable Across Major Applicant Tracking Systems
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Parsing Errors Tested</span>
          </div>
        </div>

        {/* System Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SYSTEMS.map((sys) => (
            <div
              key={sys.name}
              className="group p-3.5 rounded-xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    {sys.icon}
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {sys.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {sys.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                  {sys.category}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">
                {sys.marketShare}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
