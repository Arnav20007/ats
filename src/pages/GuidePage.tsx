import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, FileText, Sparkles, ArrowRight, Layers, Target, BarChart2, HelpCircle } from 'lucide-react';

interface GuidePageProps {
  onNavigateHome: () => void;
  onNavigatePrivacy: () => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigateHome }) => {
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
            PAGE: /GUIDE
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete 2026 ATS Field Guide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How to Beat Applicant Tracking Systems (ATS)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
            Over 97% of Fortune 500 companies use ATS parsers like Workday, Greenhouse, Taleo, and Lever. Here is how they actually parse your resume and how to score 90+ every time.
          </p>
        </div>

        {/* Rule 1: Single-Column Format */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Rule #1: Layout & Hierarchy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Use a Strict Single-Column Format
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Multi-column layouts, sidebars, floating text boxes, and tables cause major parsing failures in Workday and older Taleo engines. The parser reads horizontally across columns, merging unrelated text into an unreadable garble.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> DO:
              </span>
              <p className="text-emerald-900/80 dark:text-emerald-200/80">
                Single vertical column, standard margins (0.5 to 0.75 in), standard font families (Arial, Calibri, Helvetica, Georgia).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
              <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> AVOID:
              </span>
              <p className="text-rose-900/80 dark:text-rose-200/80">
                2-column split templates, graphic skill bars, icons, images, tables, headers/footers with critical contact data.
              </p>
            </div>
          </div>
        </div>

        {/* Rule 2: Google X-Y-Z Formula */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <BarChart2 className="w-4 h-4" />
            <span>Rule #2: Impact Scoring</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Write Bullet Points Using Google’s X-Y-Z Formula
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Google’s famous recruiting guideline is: <em>"Accomplished [X], as measured by [Y], by doing [Z]."</em> ATS semantic models and human recruiters look for measurable evidence of your impact, not a dry list of responsibilities.
          </p>
          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
              <span className="font-bold text-rose-700 dark:text-rose-400 block text-xs uppercase tracking-wider pb-1">Weak (0% Metrics):</span>
              <p className="text-slate-700 dark:text-zinc-300 font-serif italic">"Responsible for improving backend database queries and speeding up application load times."</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-xs uppercase tracking-wider pb-1">Optimized with Google X-Y-Z (100% Impact):</span>
              <p className="text-slate-900 dark:text-white font-medium">"Architected PostgreSQL indexing and Redis caching pipeline, slashing p99 query latency by 42% and supporting 150k daily active users."</p>
            </div>
          </div>
        </div>

        {/* Rule 3: Target Keyword Matching */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Rule #3: Job Description Alignment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Match Hard Skills & Exact Phrase Formats
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Modern ATS algorithms rank candidates based on keyword frequency and semantic co-occurrence. If a job posting asks for "Amazon Web Services (AWS)", include both the spelled-out form and the acronym.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 list-disc pl-5">
            <li>Never keyword-stuff white text in the background (modern ATS flags hidden text immediately and marks the candidate as fraudulent).</li>
            <li>Place your core tools and technologies in both your dedicated Skills section and naturally inside your experience bullets.</li>
            <li>Use standard job titles matching industry norms rather than company-specific jargon.</li>
          </ul>
        </div>

        {/* FAQ Section - Optimized for Google Rich Snippets & AI Overviews (AEO) */}
        <section className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions & ATS Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Everything You Need to Know About ATS Optimization
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                q: "What is an ATS resume checker?",
                a: "An ATS resume checker is an online tool that simulates how Applicant Tracking Systems (like Workday, Greenhouse, Taleo, and Lever) parse, scan, and rank resumes before a recruiter reads them. It audits formatting errors, section headings, and job keyword frequency."
              },
              {
                q: "How do I check if my resume is ATS-friendly for free without signup?",
                a: "Upload your PDF or Word resume to ToolForge. The tool parses text client-side in your browser, evaluates 27 formatting rules, and matches keywords against your target job description instantly without requiring an account or email."
              },
              {
                q: "What is a good ATS score?",
                a: "A score of 80% or higher is considered passing for major ATS systems. A score of 90+ places a candidate in the top 5% of applicant pools, ensuring high parser confidence and recruiter visibility."
              },
              {
                q: "What is Google's X-Y-Z formula for resume bullets?",
                a: "Google's hiring formula states: Accomplished [X], as measured by [Y], by doing [Z]. It transforms passive duty descriptions into high-impact metric statements (e.g., Slashing latency by 42% by redesigning database indexing)."
              },
              {
                q: "Does ToolForge store or sell my resume data?",
                a: "No. ToolForge is 100% private and runs entirely client-side in your browser memory via Web Workers. Your resume is never uploaded, stored, logged, or shared with third parties."
              }
            ].map((faq, idx) => (
              <article
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2 shadow-2xs"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">Q{idx + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-slate-900 dark:bg-zinc-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">Ready to test your resume against these rules?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Run our 27-point live ATS audit right now in your browser.
            </p>
          </div>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Scan My Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
