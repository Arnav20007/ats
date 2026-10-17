import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How does the ATS readiness score get calculated?',
    a: "Your score is calculated across three technical factors: keyword match percentage against the target job description (40%), quantifiable metrics and action verbs in bullet points (40%), and layout readability with standard headings (20%)."
  },
  {
    q: 'Does my resume data get saved, stored, or sent to AI?',
    a: "Never. ToolForge operates 100% locally in your browser tab. There is no backend database, no user account, and your resume content is never transmitted, saved, or used for model training."
  },
  {
    q: 'Can ATS software read PDF resumes?',
    a: "Yes, as long as the PDF has selectable text. Our PDF exporter generates clean, single-column documents without nested tables, text boxes, or hidden graphics that break parsers like Workday, Greenhouse, or Taleo."
  },
  {
    q: 'What is considered a passing ATS score?',
    a: "A score of 80% or above indicates that your resume matches the core required skills and meets recruiter formatting standards, placing you in the top 5% of candidate pools."
  },
  {
    q: 'What is the Google X-Y-Z formula for bullet points?',
    a: 'Google’s hiring formula states: "Accomplished [X], as measured by [Y], by doing [Z]". Our built-in improver automatically turns passive duties into high-impact, measurable achievements.'
  },
  {
    q: 'Is ToolForge completely free with no hidden charges?',
    a: "Yes. Every single feature — keyword matching, ATS audit checklist, bullet point rewriter, and direct PDF export — is 100% free with no watermarks or required subscriptions."
  }
];

export const ResumeFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-200/80 dark:border-zinc-800">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
            Clear, straightforward answers to help you understand ATS screening and optimize your application.
          </p>
        </div>

        {/* Centered Accordion Cards */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-emerald-300 dark:border-emerald-700/80 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-none'
                    : 'border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left transition-colors"
                >
                  <span className={`text-base sm:text-lg font-bold tracking-tight ${
                    isOpen ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-900 dark:text-white'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-emerald-100 dark:border-emerald-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
