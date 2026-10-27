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
            <span>100% Free &bull; Zero Paywalls &bull; No Login</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Best Free Enhancv Alternative (No Paywall, 100% ATS Friendly)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-3xl">
            Tired of spending an hour building a resume on Enhancv only to get hit with a \$24.99/month paywall at the download screen? Meet ATSCheck: the 100% free, private in-browser resume checker and single-column builder engineered for real ATS parsers.
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

        {/* The 3 Major Frustrations with Enhancv */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Paywall Bait-and-Switch
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Enhancv allows you to edit resumes freely, but when you click &quot;Export PDF&quot;, you are blocked by a \$24.99/mo subscription. On ATSCheck, PDF and text downloads are 100% free with zero paywalls.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <XCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Multi-Column Layout Trap
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Enhancv templates feature 2-column designs, visual skill bars, and icons. Enterprise systems (Workday, Taleo, Greenhouse) read these horizontally, merging columns and scrambling your work history.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Forced Signups & Cloud Storage
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Enhancv requires personal emails and stores resume documents on remote servers. ATSCheck operates 100% locally in your browser memory using Web Workers — zero server uploads.
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
              A transparent breakdown of features, pricing, compliance standards, and privacy.
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
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">\$24.99 / month recurring</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">100% Free Forever (\$0)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Paywall at PDF Export</td>
                  <td className="py-3.5 px-4 text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 shrink-0" /> Yes (Credit card required)
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Never (1-Click Instant Download)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">ATS Parser Architecture</td>
                  <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400">Multi-column &amp; graphic heavy (76% parser failure rate)</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Strict Single-Column (Workday &amp; Taleo Compliant)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Account Creation / Login</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">Mandatory signup with email</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Zero Login (Instant in-browser access)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Document Privacy</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">Uploaded to remote cloud DB</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> 100% In-Browser Memory (No server storage)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Google X-Y-Z Bullet Rewriter</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">Basic suggestions</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Dedicated Action-Verb &amp; Metric Engine</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Campus Placements (TCS, Infosys)</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">None (US enterprise focus only)</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Dedicated TCS, Infosys, Accenture Checklists</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real User Reviews / Reddit Sentiment */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-5 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Why Tech Candidates Are Switching</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 dark:text-zinc-300 italic">
                &quot;I spent 45 minutes on Enhancv only for it to demand a credit card to download my own PDF. Found ATSCheck on Reddit — uploaded my resume, saw missing TCS NQT keywords, fixed them, and downloaded my clean ATS PDF in 2 minutes for zero dollars.&quot;
              </p>
              <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 block">— CS Fresher, B.Tech 2026 Batch</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 dark:text-zinc-300 italic">
                &quot;Workday kept rejecting my resume because my old Enhancv template had a 2-column sidebar that scrambled my text. The ATSCheck audit scorecard showed me the exact parser errors and single-column formatting rules.&quot;
              </p>
              <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 block">— Backend Software Engineer</span>
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
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Is ATSCheck truly 100% free with no hidden charges?</h4>
              <p>Yes. ATSCheck does not ask for credit cards, does not have premium paywalls, and does not restrict your PDF or text exports. Every feature is free.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Why does ATSCheck emphasize single-column layouts over visual designs?</h4>
              <p>Large enterprises use automated applicant tracking systems (Workday, Greenhouse, Taleo) that parse documents linearly. Multi-column templates frequently merge lines horizontally, corrupting job titles and dates. Single-column layouts guarantee accurate parser ingestion.</p>
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
            Experience the 100% free, private ATS resume checker with zero paywalls and zero logins.
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
