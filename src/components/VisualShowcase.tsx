import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

export const VisualShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'metrics'>('comparison');

  return (
    <section className="w-full border-b border-slate-200/80 dark:border-zinc-800 bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Before vs After ATS Optimization</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Clear formatting and relevant details help people review your experience.{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Here is how yours stands out.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
            Most applicant tracking systems reject resumes not for lack of qualifications, but because of unparseable formatting, missing target keywords, and vague bullet points. ATSCheck resolves formatting flags before you submit.
          </p>
        </div>

        {/* Visual Graphic Showcase Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-emerald-500/5 overflow-hidden">
          
          {/* Top Bar with Status Indicators */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Live ATS Parser Simulation & Conversion Breakdown
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Before: 38% Rejection
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Example draft
              </span>
            </div>
          </div>

          {/* High-Resolution Graphic Display */}
          <div className="relative group overflow-hidden bg-slate-950">
            <img
              src="/images/before-after-ats.jpg"
              alt="Comparison of a rejected resume before optimization versus an interview-ready resume after ATSCheck optimization"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              loading="lazy"
            />
            
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs font-medium flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Illustrative example · no employer ATS test</span>
            </div>
          </div>

          {/* 4 Key Pillar Badges Below Graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6">
            
            <div className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Unparsed Tables & Multi-Columns</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Replaces complex nested sidebars with an executive single-stream document that parser algorithms read in order.
              </p>
            </div>

            <div className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Missing Keyword Gaps</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Instantly identifies the top 12 core competencies recruiters search for and lets you insert them in one click.
              </p>
            </div>

            <div className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Zap className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Google X-Y-Z Formula</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Use the draft as a starting point, then add only outcomes and figures you can verify.
              </p>
            </div>

            <div className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Clean Print-Window Export</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Downloads directly as a clean PDF or plain text without hidden HTML artifacts or website navigation headers.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
