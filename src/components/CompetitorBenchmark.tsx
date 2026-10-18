import React from 'react';
import { Check, Sparkles, ShieldCheck, Zap, Lock } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Price',
    toolforge: 'Free to use',
    jobscan: 'Check current plan details',
    resumeworded: 'Check current plan details',
    teal: 'Check current plan details',
  },
  {
    feature: 'Account required?',
    toolforge: 'No account required',
    jobscan: 'Varies by provider and workflow',
    resumeworded: 'Varies by provider and workflow',
    teal: 'Varies by provider and workflow',
  },
  {
    feature: 'Data privacy',
    toolforge: 'Résumé text processed in browser; fonts load externally',
    jobscan: 'Review provider privacy notice',
    resumeworded: 'Review provider privacy notice',
    teal: 'Review provider privacy notice',
  },
  {
    feature: 'Interactive inline editor',
    toolforge: 'Edit fields in the browser',
    jobscan: 'Features vary by product and plan',
    resumeworded: 'Features vary by product and plan',
    teal: 'Features vary by product and plan',
  },
  {
    feature: '1-click keyword insert',
    toolforge: 'Add recognized terms to your skills',
    jobscan: 'Check current product features',
    resumeworded: 'Check current product features',
    teal: 'Check current product features',
  },
  {
    feature: 'Google X-Y-Z rewriter',
    toolforge: 'Draft suggestions with factual placeholders',
    jobscan: 'Check current product features',
    resumeworded: 'Check current product features',
    teal: 'Check current product features',
  },
  {
    feature: 'Clean PDF export',
    toolforge: 'Browser print-to-PDF',
    jobscan: 'Export options vary',
    resumeworded: 'Export options vary',
    teal: 'Export options vary',
  },
];

const stats = [
  { value: '$0', label: 'ToolForge price', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
  { value: 'Browser', label: 'Résumé text processing', icon: Lock, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60' },
  { value: 'Rule-based', label: 'Review approach', icon: Zap, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60' },
  { value: 'No account', label: 'Required to use ToolForge', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60' },
];

export const CompetitorBenchmark: React.FC = () => {
  return (
    <section className="w-full border-t border-slate-200/80 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-950/40 py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto space-y-16">

        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ToolForge Overview</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            What ToolForge includes
          </h2>

          <p className="text-base sm:text-lg text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
            ToolForge offers browser-based résumé checks, recognized skill-term comparisons, and draft wording suggestions. Results are heuristics, not employer ATS tests.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, label, icon: Icon, color }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 p-8 rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center shadow-sm hover:border-emerald-400 dark:hover:border-emerald-700 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{value}</span>
              <span className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Comparison Table Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800 overflow-hidden shadow-none bg-white dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-800">
                  <th className="py-5 px-6 font-bold text-slate-400 text-xs uppercase tracking-wider w-[24%] bg-slate-50/80 dark:bg-zinc-950/80">
                    Feature
                  </th>
                  <th className="py-5 px-6 w-[28%] bg-emerald-600 dark:bg-emerald-700">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="font-extrabold text-white text-base">ToolForge</span>
                      <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">FREE</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider bg-slate-50/80 dark:bg-zinc-950/80">Jobscan</th>
                  <th className="py-5 px-6 font-semibold text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider bg-slate-50/80 dark:bg-zinc-950/80">Resume Worded</th>
                  <th className="py-5 px-6 font-semibold text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider bg-slate-50/80 dark:bg-zinc-950/80">Teal</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 dark:border-zinc-800/60 last:border-0 hover:bg-slate-50/40 dark:hover:bg-zinc-950/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-zinc-200">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 bg-emerald-50/40 dark:bg-emerald-950/20 border-x border-emerald-100 dark:border-emerald-900/30">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">{row.toolforge}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 dark:text-zinc-400 font-medium">{row.jobscan}</td>
                    <td className="py-4 px-6 text-slate-500 dark:text-zinc-400 font-medium">{row.resumeworded}</td>
                    <td className="py-4 px-6 text-slate-500 dark:text-zinc-400 font-medium">{row.teal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clean Centered Subtext */}
        <p className="text-xs text-slate-400 dark:text-zinc-600 text-center">
          Third-party prices and features change; check each provider's current product and privacy information.
        </p>

      </div>
    </section>
  );
};
