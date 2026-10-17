import React from 'react';
import { ArrowLeft, ShieldCheck, Heart, Sparkles, Cpu, CheckCircle2, Globe, FileCheck, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigatePrivacy: () => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigatePrivacy,
  onNavigateContact,
}) => {
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
            PAGE: /ABOUT
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Our Mission & Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About ToolForge
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
            Built by job seekers, for job seekers. ToolForge exists to eliminate the gatekeeping, paywalls, and predatory subscriptions common in career tech.
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Why We Built ToolForge
          </h2>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-zinc-300 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>
              Looking for a job is stressful enough without having to pay $39/month just to see why an Applicant Tracking System (ATS) rejected your resume.
            </p>
            <p>
              Most commercial resume scanners trap users with teaser scores, blurry reports, forced signups, and recurring credit card subscriptions. Even worse, many of them harvest your sensitive personal information — your full name, work history, phone number, and references — and sell candidate leads to recruiters or use them to train machine learning models without explicit consent.
            </p>
            <p className="font-semibold text-slate-800 dark:text-zinc-200">
              ToolForge was built to change that: a completely free, 100% private ATS resume auditor that runs entirely in your browser.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">100% Client-Side</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Your resume text is extracted and analyzed locally in your browser memory using PDF.js and Web APIs. Zero bytes are ever transmitted to an external server.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Paywalls, Ever</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Full 27-point ATS breakdown, keyword matching, formatting checks, and PDF audit exports are 100% free with no credit card required.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Real ATS Standards</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Built on verified parsing heuristics from Workday, Greenhouse, Taleo, Lever, and iCIMS, paired with Google X-Y-Z bullet point analysis.
            </p>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              The Technology Stack Behind ToolForge
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            ToolForge is engineered as a static, single-page progressive web application built with React, TypeScript, and Tailwind CSS. Document parsing is handled via Mozilla's <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-mono text-xs">pdfjs-dist</code> client-side engine. Because our business model does not rely on collecting user data or ad tracking, there are zero tracking scripts, analytics cookies, or backend databases.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['React 19', 'TypeScript', 'Tailwind CSS', 'PDF.js Client Engine', 'Zero Server Storage', '100% Client-Side'].map((tag) => (
              <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black">Audit your resume for free today</h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              No account required. Instant results in under 2 seconds.
            </p>
          </div>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-extrabold transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Open Resume Checker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
