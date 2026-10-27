import React from 'react';
import { ShieldCheck, HardDrive, EyeOff, Lock, CheckCircle2, ArrowLeft, ArrowRight, FileText } from 'lucide-react';

interface PrivacyPageProps {
  onNavigateHome: () => void;
}

const guarantees = [
  {
    icon: HardDrive,
    title: 'Résumé text stays in your browser',
    body: 'Your browser parses résumé text locally in the current page session. The site also loads Google Analytics, Google AdSense, and Google Fonts; see the details below.',
    color: 'emerald',
  },
  {
    icon: EyeOff,
    title: 'No app database or account',
    body: 'The inspected application has no résumé database or user account system. Hosting providers may create service logs under their own policies.',
    color: 'blue',
  },
  {
    icon: Lock,
    title: 'No AI service processes résumé text',
    body: 'Résumé suggestions are produced by client-side JavaScript. The app does not send résumé text to an external AI service.',
    color: 'purple',
  },
  {
    icon: CheckCircle2,
    title: 'No sign-up or registration',
    body: 'No email, password, or credit card is required to use the resume review tools.',
    color: 'amber',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-900', icon: 'text-emerald-600 dark:text-emerald-400' },
  blue:    { bg: 'bg-blue-50 dark:bg-blue-950/30',    border: 'border-blue-200 dark:border-blue-900',    icon: 'text-blue-600 dark:text-blue-400'    },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-900', icon: 'text-purple-600 dark:text-purple-400' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-950/30',   border: 'border-amber-200 dark:border-amber-900',   icon: 'text-amber-600 dark:text-amber-400'   },
};

const detailedSections = [
  {
    title: '1. What Information Do We Process?',
    content: "When you upload or paste a resume, the app parses and reviews its text in your browser session. The resume review code does not send that text to ATSCheck application servers. The site separately loads Google Analytics, Google AdSense, and Google Fonts; those providers may receive standard browser, device, and page-request data under their own policies.",
  },
  {
    title: '2. Cookies and Local Storage',
    content: "ATSCheck stores the theme preference in the browser's localStorage under 'toolforge_theme'. The page loads Google Analytics and Google AdSense scripts as well as Google Fonts. These third-party services may use their own storage or identifiers and process standard page and browser information under their policies. If you open the optional UPI support dialog, the QR image is requested from qrserver.com and contains the displayed payment intent; résumé content is not included in that request.",
  },
  {
    title: '3. Third-Party Data Sharing',
    content: "Résumé text is processed in the browser and is not sent by the resume review code to ATSCheck application servers or third-party analytics, advertising, or AI services. Google Analytics, Google AdSense, and Google Fonts are loaded for the site and may receive standard page or browser data. If you open the optional UPI support dialog, qrserver.com receives a request to render the payment QR code; that request does not contain résumé text.",
  },
  {
    title: '4. AI Architecture and Processing',
    content: "Resume formatting checks, keyword comparisons, and bullet-writing suggestions run in client-side JavaScript. The application does not send resume content to OpenAI, Anthropic, or another external AI API.",
  },
  {
    title: '5. File Upload Handling (PDF & DOCX)',
    content: "When you select a supported file, PDF.js extracts readable text in your browser. If a PDF has no text layer, the bundled English OCR engine can attempt local text recognition. OCR may make mistakes; check the extracted text. The app's parsing flow does not upload the original file or extracted text to ATSCheck application servers.",
  },
  {
    title: '6. Contact & Data Controller',
    content: "ATSCheck is built with a privacy-by-design architecture. If you have questions regarding this policy or our technical implementation, contact us at contact@atscheck.tech or arnavsinghas1221@gmail.com.",
  },
];

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigateHome }) => {
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
            PAGE: /PRIVACY
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Browser-Side Résumé Processing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
            Resume text is analyzed in your browser and is not sent to ATSCheck application servers by the review code. Theme preference is stored locally. Google Analytics, Google AdSense, and Google Fonts also load on the site and may process standard page or browser data under their own policies.
          </p>

          <div className="pt-1 text-xs text-slate-400 font-mono">
            Last updated: October 2026 · Effective immediately
          </div>
        </div>

        {/* 4 Core Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guarantees.map(({ icon: Icon, title, body, color }) => {
            const c = colorMap[color];
            return (
              <div
                key={title}
                className={`p-6 rounded-2xl border ${c.bg} ${c.border} space-y-2.5 transition-all shadow-xs`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 shadow-2xs">
                    <Icon className={`w-5 h-5 ${c.icon}`} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 shadow-sm">
          {detailedSections.map((sec, i) => (
            <div key={i} className="space-y-2 border-b border-slate-100 dark:border-zinc-800/80 last:border-0 pb-6 last:pb-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {sec.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to review your résumé in your browser?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 font-normal">
              No account required. Resume text is processed in your browser; see this policy for site services and storage details.
            </p>
          </div>

          <button
            onClick={onNavigateHome}
            className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-emerald-50 font-bold text-sm transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer active:scale-[0.99]"
          >
            <span>Launch ATS Checker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
