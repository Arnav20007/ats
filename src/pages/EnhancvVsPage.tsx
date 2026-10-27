import React from 'react';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap, AlertTriangle, Sparkles, Star, HelpCircle } from 'lucide-react';

interface EnhancvVsPageProps {
  onNavigateHome: () => void;
  onNavigateChecker: () => void;
  onNavigateBuilder: () => void;
}

export const EnhancvVsPage: React.FC<EnhancvVsPageProps> = ({ onNavigateHome, onNavigateChecker, onNavigateBuilder }) => {
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
            COMPARISON &bull; ATS ALTERNATIVE
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Free to Use &bull; No Paywall &bull; No Login</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Free Enhancv Alternative: Resume Checker and Builder
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-3xl">
            Compare ATSCheck’s free resume review and single-column builder with Enhancv. ATSCheck provides browser-based checks and PDF export without an account. Resume parsing results vary, so neither a template nor a score guarantees an employer-system result.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="/checker"
              onClick={(e) => { e.preventDefault(); onNavigateChecker(); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Check ATS Score Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/builder"
              onClick={(e) => { e.preventDefault(); onNavigateBuilder(); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-900 dark:text-white font-bold text-sm shadow-2xs transition-all cursor-pointer"
            >
              <span>Build Single-Column Resume</span>
            </a>
          </div>
        </div>

        {/* Core Differences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Free vs. Subscription Model
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              ATSCheck’s resume review, builder, and PDF export are available without a paid plan. For current Enhancv plan and download terms, consult its official pricing page.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Single-Column ATS Parsing
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              ATSCheck’s current templates use a single-column layout. This is a formatting choice, not a compatibility certification: text extraction and field recognition can vary by PDF and employer system.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              In-Browser Processing &amp; Privacy
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              ATSCheck performs resume checks in your browser and does not require an account. This page does not compare how Enhancv stores or processes documents; review each service’s current privacy policy for those details.
            </p>
          </div>
        </div>

        {/* Feature-by-Feature Comparison Table */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6 shadow-2xs">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Enhancv vs. ATSCheck: Direct Side-by-Side Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Feature notes reviewed on 28 Oct 2026. Plans and product details can change; confirm current terms on the linked official Enhancv pages.
              {' '}<a href="https://enhancv.com/pricing/" target="_blank" rel="noopener noreferrer" className="underline">Enhancv pricing</a> · <a href="https://enhancv.com/resume-templates/" target="_blank" rel="noopener noreferrer" className="underline">template gallery</a>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-800">
                  <th className="py-3 px-4 font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider text-[11px]">Feature</th>
                  <th className="py-3 px-4 font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider text-[11px]">Enhancv</th>
                  <th className="py-3 px-4 font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px] bg-emerald-50/50 dark:bg-emerald-950/20 rounded-t-lg">ATSCheck (Free)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Pricing Model</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400"><a href="https://enhancv.com/pricing/" target="_blank" rel="noopener noreferrer" className="underline">See current plans</a></td>
              <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">Free to use currently</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Paywall at PDF Export</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">
                    Check current export terms on the pricing page
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> PDF export available without a paid plan</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Resume Layouts</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400"><a href="https://enhancv.com/resume-templates/" target="_blank" rel="noopener noreferrer" className="underline">See current template gallery</a></td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Current templates use a single-column layout</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Account Creation / Login</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">Check current account requirements</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Zero Login (Instant in-browser access)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Document Privacy</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">Not independently assessed; see its current privacy policy</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Resume checks run in your browser</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Resume Bullet Guidance</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">Not compared</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Dedicated Action-Verb &amp; Metric Engine</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Campus Placements (TCS, Infosys)</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">Not assessed</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Dedicated TCS, Infosys, Accenture Checklists</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Who ATSCheck Is Built For */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-5 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Target Use Cases</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Who ATSCheck Is Built For
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Software Engineering &amp; Tech Candidates</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                Developers who want an editable single-column resume layout and general document-readability checks before applying. Follow the instructions in each job post.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">College Freshers &amp; Campus Placements</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                Students who want to review role keywords and resume structure while preparing applications. Check current official campus-program requirements for each employer.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Common Questions About Switching from Enhancv
          </h3>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 pt-2">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Can I use ATSCheck without an account or paid plan?</h4>
              <p>Yes. The resume review, builder, and PDF export are currently available without an account or paid plan.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Why does ATSCheck emphasize single-column layouts over visual designs?</h4>
              <p>A single-column layout can make a document’s reading order easier to inspect, but parsing varies by PDF, parser, and employer configuration. ATSCheck does not test or certify output against private employer systems.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Can I test my resume without creating an account?</h4>
              <p>Yes. You can paste your resume text or upload your document instantly without providing an email address or creating any account.</p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to Check Your Resume for Free?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            Use the browser-based resume checker without an account or paid plan. Read the Privacy Policy for details about resume processing and third-party site services.
          </p>
          <div className="pt-2">
            <a
              href="/checker"
              onClick={(e) => { e.preventDefault(); onNavigateChecker(); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition-colors shadow-lg cursor-pointer"
            >
              <span>Launch Free ATS Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
