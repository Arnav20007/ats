import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, CheckCircle2, XCircle, Sparkles, Layers } from 'lucide-react';
import { CompetitorComparison, HowToStep } from '../../data/seoData';

interface FaqSectionProps {
  faqs: Array<{ question: string; answer: string }>;
  toolName: string;
  howToSteps?: HowToStep[];
  competitorComparison?: CompetitorComparison[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  toolName,
  howToSteps,
  competitorComparison,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pt-8 border-t border-slate-200 space-y-8">
      {/* 1. Step-by-Step Practical How-To Guide (Schema-aligned) */}
      {howToSteps && howToSteps.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
            <h3 className="text-sm font-bold text-slate-900">
              Quick Guide: How to Use {toolName}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {howToSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{step.name}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Competitor Comparison Table (Crushes competitors on SEO) */}
      {competitorComparison && competitorComparison.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <h3 className="text-sm font-bold text-slate-900">
                ToolForge vs. Legacy Competitor Tools
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
              Zero Bloat · 100% In-Browser
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="p-3">Core Capability</th>
                  <th className="p-3 bg-emerald-50/50 text-emerald-900 font-bold">ToolForge (This Tool)</th>
                  <th className="p-3 text-slate-500">Typical Competitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {competitorComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-medium text-slate-900">{row.feature}</td>
                    <td className="p-3 bg-emerald-50/30 text-emerald-900 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{row.toolForge}</span>
                    </td>
                    <td className="p-3 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{row.competitors}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 3. Crawlable In-Depth FAQ Accordion (Eligible for Google FAQ Rich Snippets) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-700 shrink-0" />
            <h3 className="text-sm font-bold text-slate-900">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {faqs.length} Verified Answers
          </span>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 hover:text-slate-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-emerald-700 font-bold font-mono text-xs">Q:</span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
