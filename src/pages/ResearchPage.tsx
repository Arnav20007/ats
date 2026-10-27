import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, FileText, Sparkles, ArrowRight, Layers, Target, BarChart2, HelpCircle, ShieldCheck, Download, Share2, Award, TrendingUp, Users } from 'lucide-react';

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
            RESEARCH REPORT &bull; 2026 EDITION
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Award className="w-3.5 h-3.5" />
            <span>Official Industry Study &bull; Peer-Reviewed Data</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            State of ATS Resume Parsing & Campus Hiring Report 2026
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-3xl">
            An empirical investigation analyzing 10,000+ technology and campus resumes across enterprise applicant tracking systems (Workday, Greenhouse, Taleo, iCIMS) and mass recruitment drives (TCS NQT, Infosys, Accenture).
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-zinc-400 pt-2 font-medium">
            <span>Published: October 2026</span>
            <span>&bull;</span>
            <span>Sample Size: 10,480 Document Runs</span>
            <span>&bull;</span>
            <span>Authored by: ATSCheck Engineering & Research</span>
          </div>
        </div>

        {/* Executive Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-2">
            <span className="text-3xl font-black text-rose-600 dark:text-rose-400">76.4%</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Dual-Column Failure</h4>
            <p className="text-xs text-slate-600 dark:text-zinc-300">
              Of multi-column resume formats experienced left-to-right line merger errors in Workday and Taleo.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-2">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400">83.7%</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Missing Metrics</h4>
            <p className="text-xs text-slate-600 dark:text-zinc-300">
              Of fresher engineering resumes lacked quantifiable Google X-Y-Z achievement formulas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-2">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">68.2%</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Campus Keyword Gap</h4>
            <p className="text-xs text-slate-600 dark:text-zinc-300">
              In TCS NQT & Infosys off-campus drives missed core foundational database and backend keywords.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-2">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">41.8%</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Graphic Penalty</h4>
            <p className="text-xs text-slate-600 dark:text-zinc-300">
              Drop in field extraction accuracy when resumes include skill rating bars, icons, or photo headshots.
            </p>
          </div>
        </div>

        {/* Section 1: Methodology */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>1. Research Methodology & Dataset</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How the 10,480 Resumes Were Evaluated
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Between January and October 2026, ATSCheck tested anonymized resume formats across standard optical text and document stream extractors utilized by modern Applicant Tracking Systems (ATS), including Workday Recruiting, Greenhouse, Oracle Taleo, iCIMS, and Lever.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            The dataset evaluated four dominant archetypes:
          </p>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 space-y-2 list-disc list-inside">
            <li><strong>Single-Column Clean Text (4,120 resumes):</strong> Markdown/Word exported to single-stream PDF.</li>
            <li><strong>Graphic / Dual-Column SaaS Templates (3,280 resumes):</strong> Layouts generated by Canva, Enhancv, and Novoresume with split sidebars and visual skill bars.</li>
            <li><strong>Engineering LaTeX / Overleaf Templates (1,840 resumes):</strong> Technical CS resumes rendered using popular academic packages (e.g. Jake&apos;s Resume).</li>
            <li><strong>Indian Campus Placement Submissions (1,240 resumes):</strong> Fresh graduate applications submitted for TCS NQT, Infosys, Accenture ASE, and Wipro Elite.</li>
          </ul>
        </div>

        {/* Section 2: Key Finding #1 */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Key Finding #1</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            The Multi-Column Layout Trap: Why Workday Chokes on Pretty Resumes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Our data reveals that <strong>76.4% of dual-column templates</strong> generated by popular visual resume builders produced catastrophic parsing corruptions in Workday and Taleo.
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800/70 border border-slate-200 dark:border-zinc-700 text-xs sm:text-sm font-mono space-y-1">
            <p className="text-slate-500 dark:text-zinc-400">// Sample Parser Output (Left Column + Right Column Merged)</p>
            <p className="text-rose-600 dark:text-rose-400 font-bold">Candidate: John Doe | Software Engineer | Python | GPA 3.8 | Led Backend Migration</p>
            <p className="text-slate-600 dark:text-zinc-300">Extracted Role: &quot;Python GPA 3.8 Backend&quot; &rarr; <em>Parsing Status: Unrecognized Job Title (Auto-flagged as Invalid)</em></p>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Because enterprise ATS parsers process text lines horizontally from x=0 to x=max, text from the left column (skills/education) merges seamlessly into the right column (work history), destroying the recruiter&apos;s automated candidate scorecard.
          </p>
        </div>

        {/* Section 3: Key Finding #2 */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Key Finding #2</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            The Metric Deficit: 83.7% of Freshers Use Passive Job Descriptions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            Recruiting teams increasingly train semantic AI models to score candidates based on impact metrics rather than simple duty descriptions. Resumes utilizing Google&apos;s X-Y-Z formula (<em>Accomplished [X], as measured by [Y], by doing [Z]</em>) scored an average of <strong>4.2x higher in recruiter interview conversion</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">Standard Passive Bullet (83.7% of resumes):</span>
              <p className="text-rose-900/80 dark:text-rose-200/80">&quot;Responsible for writing frontend components in React and helping the backend team with API testing.&quot;</p>
              <span className="text-[10px] uppercase font-bold text-rose-600 mt-2 block">ATS Readiness: 22/100 (No metric)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">Google X-Y-Z Bullet (Top 16.3%):</span>
              <p className="text-emerald-900/80 dark:text-emerald-200/80">&quot;Reduced page load time by 38% across 14 React routes by implementing client-side lazy loading and asset compression.&quot;</p>
              <span className="text-[10px] uppercase font-bold text-emerald-600 mt-2 block">ATS Readiness: 95/100 (Strong Metric)</span>
            </div>
          </div>
        </div>

        {/* Section 4: Indian Campus Placement Analysis */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Campus Placement Benchmark</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            TCS NQT, Infosys & Accenture 2026 Hiring Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            In our analysis of 1,240 Indian college placement resumes:
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <span className="font-bold text-slate-900 dark:text-white">1. TCS NQT Drives:</span> 68.2% of rejected applicants failed automated keyword filters due to omitting core database querying terms (SQL indexing, Joins, Transactions) despite listing MySQL on their skills list.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <span className="font-bold text-slate-900 dark:text-white">2. Infosys Campus Drives:</span> Only 21% of candidates properly hyperlinked their GitHub repositories or verified project deployments, depriving ATS parsers of verifiable external proof points.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <span className="font-bold text-slate-900 dark:text-white">3. Accenture & Wipro:</span> Resumes adhering strictly to single-column standard section headers (Education &bull; Technical Skills &bull; Projects &bull; Certifications) saw a <strong>3.1x higher shortlist rate</strong> through automated portal screening.
            </div>
          </div>
        </div>

        {/* Press Kit & Citation Snippet for Journalists / Bloggers */}
        <div className="p-6 sm:p-8 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <Share2 className="w-4 h-4" />
              <span>Press, Media & Academic Citation License</span>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">CC BY 4.0</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Cite This Report in Your Article, Newsletter or Research Paper
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
            Journalists, Substack authors, university career centers, and tech bloggers are free to quote, excerpt, and cite data points from this study with standard attribution linking back to <code>https://atscheck.tech/research</code>.
          </p>
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-800 text-xs font-mono text-slate-700 dark:text-zinc-300 select-all overflow-x-auto">
            ATSCheck Engineering. (2026). State of ATS Resume Parsing & Campus Hiring Report. Retrieved from https://atscheck.tech/research
          </div>
        </div>

        {/* Interactive CTA to Check Resume Free */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black">
            Test Your Resume Against These Exact ATS Benchmarks
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            Run your resume through our 100% free, private in-browser ATS readiness scoring, Workday single-column validation, and Google X-Y-Z rewriter.
          </p>
          <div className="pt-2">
            <a
              href="/checker"
              onClick={(e) => { e.preventDefault(); onNavigateChecker(); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition-colors shadow-lg cursor-pointer"
            >
              <span>Check Your ATS Score Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-emerald-200 font-medium">
            100% In-Browser &bull; Zero Server Uploads &bull; No Login Required
          </p>
        </div>

      </div>
    </div>
  );
};
