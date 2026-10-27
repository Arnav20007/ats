import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, FileText, Sparkles, ArrowRight, Layers, Target, BarChart2, ShieldCheck, Code2, Users } from 'lucide-react';

interface ResearchPageProps {
  onNavigateHome: () => void;
  onNavigateChecker: () => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigateHome, onNavigateChecker }) => {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-12 animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Resume Checker</span>
          </a>

          <span className="text-xs font-mono text-slate-400">
            TECHNICAL GUIDE &bull; UPDATED 2026
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Code2 className="w-3.5 h-3.5" />
            <span>ATS Architecture & Parser Mechanics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            How Applicant Tracking Systems Parse and Screen Tech Resumes
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-3xl">
            A general overview of resume text extraction, PDF reading order, OCR, and common formatting considerations. Parsing behavior varies across document parsers and employer configurations; this guide does not report vendor-specific tests.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-zinc-400 pt-2 font-medium">
            <span>Engineering Documentation</span>
            <span>&bull;</span>
            <span>Author: ATSCheck Technical Team</span>
            <span>&bull;</span>
            <span>Target: Software Engineers & Freshers</span>
          </div>
        </div>

        {/* Section 1: The Pipeline */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>1. The Extraction Pipeline Explained</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            What Actually Happens When You Upload a PDF Resume
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Resume review systems may extract text and other fields from uploaded documents. The exact process depends on the file, parser, configuration, and employer workflow. A selectable text layer can be easier to inspect than a scanned image, which may require OCR. Adobe explains that OCR creates searchable text from scans and that recognized text should be reviewed for errors (<a href="https://helpx.adobe.com/acrobat/desktop/create-documents/scan-documents-to-pdfs/recognize-text.html" target="_blank" rel="noopener noreferrer" className="underline text-emerald-700 dark:text-emerald-400">Adobe Acrobat OCR guidance</a>).
          </p>
          <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <strong className="text-slate-900 dark:text-white">Step 1: Text and OCR:</strong> Text-based PDFs expose selectable text. Image-only scans may need optical character recognition (OCR), and recognition errors can affect names, dates, and other details. Check extracted text before applying.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <strong className="text-slate-900 dark:text-white">Step 2: Section Identification:</strong> Familiar headings such as <code>EDUCATION</code>, <code>EXPERIENCE</code>, and <code>SKILLS</code> make sections clear to readers and may help automated extraction. Custom labels can be interpreted differently across tools.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <strong className="text-slate-900 dark:text-white">Step 3: Field Extraction:</strong> A system may identify contact details, employers, dates, education, or skills. Field coverage and accuracy depend on the parser and the document; review any imported profile for errors.
            </div>
          </div>
        </div>

        {/* Section 2: Why Multi-Column Layouts Fail */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>2. The Formatting Trap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How Layout Can Affect PDF Text Reading Order
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            PDFs can represent text and layout in different ways. Extraction tools may reconstruct reading order differently, especially when content is placed in separate columns, text boxes, or graphics. The result depends on how the PDF was created and which parser processes it. Adobe documents a tool for inspecting and correcting a PDF’s reading order (<a href="https://helpx.adobe.com/acrobat/using/touch-reading-order-tool-pdfs.html" target="_blank" rel="noopener noreferrer" className="underline text-emerald-700 dark:text-emerald-400">Adobe reading-order guidance</a>); this manual check does not predict employer ATS behavior.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
              <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Multi-Column / Graphic Layouts
              </span>
              <p className="text-rose-900/80 dark:text-rose-200/80">
                Separate text regions, icons, or image-based text can make extracted content harder to inspect. Test the exported PDF by selecting and copying its text, then check the reading order.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Simple Single-Column Layouts
              </span>
              <p className="text-emerald-900/80 dark:text-emerald-200/80">
                A simple column offers a predictable layout to review and can make text order easier to inspect. It does not guarantee error-free extraction in every system; check the PDF and follow application instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Illustrative achievement structure */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>3. Achievement Formulation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            An X-Y-Z-Style Structure for Resume Bullets
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            One commonly shared structure describes an accomplishment, how it was measured, and the action that produced it. Treat the example as a writing prompt, not a required formula or a predictor of hiring outcomes:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-center font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            &quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
            <p><strong>[X] Accomplished:</strong> The active, concrete business outcome or technical milestone.</p>
            <p><strong>[Y] Measured by:</strong> Quantifiable baseline metrics (percentages, latency reduction, user counts, data scale).</p>
            <p><strong>[Z] By doing:</strong> The exact technical stack, architectural pattern, or methodology used.</p>
          </div>
        </div>

        {/* Section 4: Indian Campus Placement Realities */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>4. Campus Placements (TCS, Infosys, Accenture)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Practical Resume Preparation for Freshers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Requirements vary by role, employer, and application cycle. For campus or early-career applications, use the current official job post as your source of truth and make your relevant experience easy to review:
          </p>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 space-y-2 list-disc list-inside">
            <li><strong>Core Computer Science Fundamentals:</strong> Mentioning exact terms like <em>Data Structures &amp; Algorithms (DSA)</em>, <em>Object-Oriented Programming (OOP)</em>, <em>Database Management Systems (DBMS)</em>, and <em>Computer Networks</em>.</li>
            <li><strong>Verifiable Project Proof:</strong> Live deployment links (Vercel, Render) and public GitHub repository links allow technical interviewers to inspect code quality directly.</li>
            <li><strong>Clean Single-Column Typography:</strong> Standard system fonts (Arial, Calibri, Georgia, Times New Roman) ensure that local PDF extractors do not discard character glyphs.</li>
          </ul>
        </div>

        {/* Interactive CTA to Check Resume Free */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black">
            Review Your Resume’s Readability
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            Use ATSCheck’s general formatting and keyword guidance as a preliminary review. It does not reproduce an employer’s private parser or predict a screening outcome.
          </p>
          <div className="pt-2">
            <a
              href="/checker"
              onClick={(e) => { e.preventDefault(); onNavigateChecker(); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition-colors shadow-lg cursor-pointer"
            >
              <span>Check Your Resume Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-emerald-200 font-medium">
            Browser-Based Resume Review &bull; No Account Required
          </p>
        </div>

      </div>
    </div>
  );
};
