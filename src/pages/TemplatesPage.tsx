import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  FileText,
  Download,
  Eye,
  ArrowRight,
  ShieldCheck,
  Check,
  Layers,
  Award
} from 'lucide-react';
import { ATS_TEMPLATES, AtsTemplateConfig } from '../data/atsTemplates';
import type { AtsTemplateId } from '../context/ResumeSessionContext';
import { SAMPLE_RESUMES } from '../data/resumeSamples';

interface TemplatesPageProps {
  onNavigateHome: () => void;
  onSelectTemplate: (templateId: AtsTemplateId, loadSampleData?: boolean) => void;
  onNavigateBuilder: () => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onNavigateHome,
  onSelectTemplate,
  onNavigateBuilder,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'tech' | 'finance' | 'compact'>('all');

  const templatesList: (AtsTemplateConfig & { filterCategory: 'tech' | 'finance' | 'compact'; sampleCompany: string })[] = [
    {
      ...ATS_TEMPLATES.jakes,
      filterCategory: 'tech',
      sampleCompany: 'Google, Meta, Amazon, Microsoft'
    },
    {
      ...ATS_TEMPLATES.harvard,
      filterCategory: 'finance',
      sampleCompany: 'Goldman Sachs, McKinsey, Big Tech, Research'
    },
    {
      ...ATS_TEMPLATES.modern,
      filterCategory: 'tech',
      sampleCompany: 'Stripe, Linear, Senior Tech & PM Roles'
    },
    {
      ...ATS_TEMPLATES.compact,
      filterCategory: 'compact',
      sampleCompany: 'Hackathons, High-Project Engineers, New Grads'
    }
  ];

  const filteredTemplates = templatesList.filter((t) => {
    if (selectedFilter === 'all') return true;
    return t.filterCategory === selectedFilter;
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-12 animate-in fade-in duration-200">
      <div className="max-w-6xl mx-auto space-y-12">

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
            PAGE: /TEMPLATES
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Award className="w-3.5 h-3.5" />
            <span>Real-World Selected Students ATS Formats</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Selected Students ATS Resume Templates
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-3xl">
            Authentic, single-column ATS templates used by candidates hired at Google, Meta, Amazon, Goldman Sachs, and top tech companies. 100% free, parser-compliant for Workday, Greenhouse, Taleo, and Lever, with zero paywalls.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All ATS Templates (4)' },
              { id: 'tech', label: 'Top Tech & FAANG' },
              { id: 'finance', label: 'Ivy League & Finance' },
              { id: 'compact', label: '1-Page High Density' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-zinc-950 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTemplates.map((template) => {
            const isSerif = template.id === 'harvard';

            return (
              <div
                key={template.id}
                className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Visual Paper Sheet Mockup Header */}
                <div className="p-6 bg-slate-100/70 dark:bg-zinc-950/70 border-b border-slate-200 dark:border-zinc-800">
                  <div className="w-full bg-white text-slate-900 rounded-xl border border-slate-200 shadow-md p-6 space-y-4">
                    
                    {/* Header in Template Font & Alignment */}
                    <div className={`space-y-1.5 ${template.headerAlign === 'center' ? 'text-center' : 'text-left'}`}>
                      <h3
                        style={{ fontFamily: template.fontFamily }}
                        className="text-xl sm:text-2xl font-black tracking-tight text-slate-900"
                      >
                        ARNAV SINGH
                      </h3>
                      <div className={`flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-medium ${template.headerAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
                        <span>San Francisco, CA</span>
                        <span>•</span>
                        <span>arnav@example.com</span>
                        <span>•</span>
                        <span>+1 (415) 555-0199</span>
                        <span>•</span>
                        <span>linkedin.com/in/arnav</span>
                      </div>
                    </div>

                    {/* Divider Line Style */}
                    <div
                      className="w-full my-2"
                      style={{
                        borderBottom: template.dividerStyle === 'double'
                          ? `3px double ${template.accentColor}`
                          : template.dividerStyle === 'subtle'
                          ? `2px solid ${template.headingColor}`
                          : template.dividerStyle === 'minimal'
                          ? `1px dashed #94a3b8`
                          : `1.5px solid ${template.headingColor}`
                      }}
                    />

                    {/* Mock Section: Education */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider" style={{ fontFamily: template.fontFamily, color: template.headingColor }}>
                        <span>EDUCATION</span>
                        <span className="text-[10px] font-normal text-slate-500">2022 – 2026</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                        <span>University of California, Berkeley</span>
                        <span className="text-[10px] font-normal text-slate-500">GPA: 3.9 / 4.0</span>
                      </div>
                      <div className="text-[10px] text-slate-500 italic">
                        B.S. in Computer Science &amp; Engineering
                      </div>
                    </div>

                    {/* Mock Section: Experience */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider" style={{ fontFamily: template.fontFamily, color: template.headingColor }}>
                        <span>EXPERIENCE</span>
                        <span className="text-[10px] font-normal text-slate-500">Present</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                        <span>Software Engineer Intern · Cloud Systems</span>
                        <span className="text-[10px] font-normal text-slate-500">San Francisco, CA</span>
                      </div>
                      <ul className="text-[10px] text-slate-600 space-y-1 pl-3 list-disc">
                        <li>Architected high-throughput REST APIs handling 10M+ daily events, reducing latency by 42%.</li>
                        <li>Automated CI/CD deployment pipelines on AWS infrastructure with zero downtime.</li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Template Info & Action Bar */}
                <div className="p-6 space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        {template.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                        Parser Compliant: 100%
                      </span>
                    </div>

                    <h2
                      style={{ fontFamily: template.fontFamily }}
                      className="text-xl font-bold text-slate-900 dark:text-white"
                    >
                      {template.name}
                    </h2>

                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {template.tagline}
                    </p>
                  </div>

                  {/* Typography & Layout Metadata */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Typography</span>
                      <span className="font-semibold text-slate-800 dark:text-zinc-200">
                        {isSerif ? 'Merriweather (Serif)' : 'Plus Jakarta / Clean Sans'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Layout Alignment</span>
                      <span className="font-semibold text-slate-800 dark:text-zinc-200 capitalize">
                        {template.headerAlign} Aligned Single-Column
                      </span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200 dark:border-zinc-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Companies</span>
                      <span className="font-medium text-slate-700 dark:text-zinc-300">
                        {template.sampleCompany}
                      </span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectTemplate(template.id, true)}
                      className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                      title="Open this template in builder with role sample content"
                    >
                      <span>Use This Template in Builder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectTemplate(template.id, false)}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                      title="Switch to this layout while keeping whatever is currently typed in your builder"
                    >
                      Format Only (Keep Current Text)
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ATS FAQ Section */}
        <div className="p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6 shadow-2xs">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Why Are These 4 Templates Chosen by Selected Students?
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Technical recruiters at Google, Microsoft, and Amazon discard flashy multi-column Canva designs because ATS engines read left-to-right across columns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Single-Column
              </span>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                Applicant tracking systems read linear text top-to-bottom. Two-column layouts cause skills and dates to merge awkwardly.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standard Heading Tags
              </span>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                Uses universal section tags (Experience, Education, Skills) that Workday and Greenhouse parsers recognize out-of-the-box.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vector &amp; Print Ready
              </span>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                High-density single page A4 formatting prevents awkward multi-page page breaks and saves recruiter reading time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
