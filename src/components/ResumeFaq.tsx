import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How does the ATS readiness score get calculated?',
    a: "The general readiness score adds seven checklist categories: contact details (20 points), standard section headings (20), résumé length (10), achievement bullets (10), quantified results (15), action verbs (15), and filler phrases (10) for a 0–100 total. Target-job keyword match is shown separately as a percentage gap and does not change this score. This is a rule-based heuristic estimate, not a proprietary score from an employer's ATS."
  },
  {
    q: 'Does my resume data get saved, stored, or sent to AI?',
    a: "Résumé text is processed in your browser for the current session and is not sent to ATSCheck application servers or an external AI service by the resume review code. Theme preference is stored locally. Google Analytics, Google AdSense, and Google Fonts also load on the site and may process standard page or browser data under their policies."
  },
  {
    q: 'Can ATS software read PDF resumes?',
    a: 'Many systems can read PDFs with selectable text, but support varies by employer and document structure. ATSCheck checks extracted text and does not test your resume in an employer ATS.'
  },
  {
    q: 'What is considered a good ATS score?',
    a: 'There is no universal passing score across all employers. ATSCheck provides a heuristic to help review keyword overlap, formatting, bullet points, and profile completeness; employers use different systems and criteria.'
  },
  {
    q: 'What is an X-Y-Z-style structure for resume bullets?',
    a: 'One commonly shared X-Y-Z-style format describes an accomplishment, how it was measured, and the action behind it. The improver offers draft wording; use only outcomes and measures that accurately reflect your work.'
  },
  {
    q: 'Can I check an Overleaf, LaTeX, or Word resume ATS score?',
    a: 'Yes. If you exported your resume PDF from Overleaf, LaTeX, Microsoft Word, or Google Docs, ATSCheck extracts the selectable text layer in your browser to evaluate standard section headings, quantifiable metrics, and role keywords without breaking formatting.'
  },
  {
    q: 'Is ATSCheck completely free with no hidden charges?',
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
