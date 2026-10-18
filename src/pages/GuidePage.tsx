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
            Prepare a Clear Résumé for Applicant Tracking Systems
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
            Applicant tracking systems vary by employer and configuration. This guide covers common résumé structure and keyword practices; ToolForge provides heuristic feedback rather than access to an employer's ranking rules.
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
            Single-column layouts and standard headings are generally easier for document parsers to interpret. Results vary by file, parser, and employer configuration, so no format can guarantee a particular screening outcome.
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
            A useful bullet can describe what you did, the outcome, and how you measured it. Add metrics only when you can support them, and keep your description accurate to your role.
          </p>
          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
              <span className="font-bold text-rose-700 dark:text-rose-400 block text-xs uppercase tracking-wider pb-1">Example without a measure:</span>
              <p className="text-slate-700 dark:text-zinc-300 font-serif italic">"Responsible for improving backend database queries and speeding up application load times."</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-xs uppercase tracking-wider pb-1">Illustrative X-Y-Z structure:</span>
              <p className="text-slate-900 dark:text-white font-medium">"[Action] [what you changed], improving [verified measure] from [before] to [after] by [specific action]."</p>
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
            Applicant tracking systems and employer configurations vary. Compare your résumé with the job description, and use relevant terms naturally when they accurately describe your experience.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 list-disc pl-5">
            <li>Do not hide keywords in the document; hidden text is not useful to readers and can make a résumé harder to review.</li>
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
                a: "An ATS résumé checker estimates how résumé text, sections, and keywords may be reviewed. ToolForge compares extracted résumé text and common formatting signals; it does not simulate or rank candidates in a specific employer system."
              },
              {
                q: "How do I check if my resume is ATS-friendly for free without signup?",
                a: "Upload a supported résumé file to analyze its extracted text in your browser. ToolForge checks common formatting patterns and compares résumé terms with a target job description without requiring an account."
              },
              {
                q: "What is a good ATS score?",
                a: "There is no universal passing score. ToolForge provides a heuristic based on keyword overlap, formatting checks, measurable bullets, and profile completeness; employers use different systems and criteria."
              },
              {
                q: "What is Google's X-Y-Z formula for resume bullets?",
                a: "The X-Y-Z format is commonly described as: Accomplished [X], as measured by [Y], by doing [Z]. Use results and measures that accurately reflect your own work."
              },
              {
                q: "Does ToolForge store or sell my resume data?",
                a: "Résumé text is processed in your browser and is not sent to ToolForge servers. Your theme preference may be stored in local browser storage, and the site loads fonts from Google Fonts."
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
              Review your résumé with browser-based formatting and keyword heuristics.
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
