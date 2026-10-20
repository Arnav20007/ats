import React from 'react';
import { ArrowLeft, ShieldCheck, Heart, Sparkles, Cpu, CheckCircle2, Globe, FileCheck, ArrowRight, Mail } from 'lucide-react';

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
              Reviewing a résumé for a specific role can take time. ToolForge offers browser-based checks to help you examine wording, sections, and keyword overlap.
            </p>
            <p>
              Many commercial resume scanners require account creation, recurring credit card subscriptions, or cloud uploads of personal documents just to view basic feedback. With sensitive details like work history, contact numbers, and personal references on every resume, privacy and transparency often become secondary considerations.
            </p>
            <p className="font-semibold text-slate-800 dark:text-zinc-200">
              ToolForge is a free résumé review tool. Résumé text is processed in your browser and is not sent to ToolForge servers; site fonts are loaded from Google Fonts.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">In-Browser Processing</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Résumé text is extracted and analyzed in your browser using PDF.js and Web APIs. The site loads fonts from Google Fonts, but résumé text is not sent to ToolForge servers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Paywalls, Ever</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Résumé checks, keyword comparisons, formatting feedback, and PDF exports are free with no credit card required.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">How the checks work</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              ToolForge checks résumé text, section labels, keyword overlap, and common formatting patterns in your browser. It does not test or certify results against Workday, Greenhouse, Taleo, Lever, or iCIMS.
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
            {['React 19', 'TypeScript', 'Tailwind CSS', 'PDF.js Client Engine', 'No app résumé database', 'In-browser text processing'].map((tag) => (
              <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author & E-E-A-T Engineering Profile */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-5 shadow-2xs">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Creator & Lead Engineer: Arnav Singh
            </h3>
          </div>

          <div
            id="arnav-singh"
            itemScope
            itemType="https://schema.org/Person"
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-xl font-black shadow-md shrink-0">
              AS
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span itemProp="name" className="font-bold text-base text-slate-900 dark:text-white">
                  Arnav Singh
                </span>
                <span itemProp="jobTitle" className="text-xs px-2 py-0.5 rounded-md font-mono bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Full Stack Software Engineer & Creator
                </span>
              </div>
              <p itemProp="description" className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                Full-stack software engineer focused on high-performance browser architectures and accessible career technology. Founded ToolForge as a 100% private, zero-signup, open-source alternative to predatory career tech paywalls.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <a
                  itemProp="email"
                  href="mailto:arnavsinghas1221@gmail.com"
                  className="hover:underline flex items-center gap-1 text-slate-700 dark:text-zinc-300 font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>arnavsinghas1221@gmail.com</span>
                </a>
                <a
                  itemProp="sameAs"
                  href="https://github.com/Arnav20007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>GitHub (@Arnav20007)</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  itemProp="sameAs"
                  href="https://github.com/Arnav20007/ats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Open Source Repository</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            <strong>Editorial & Heuristic Integrity:</strong> All 27 formatting heuristics and keyword rules are based on published ATS guidelines from Workday, Greenhouse, Taleo, and Google X-Y-Z recruiting principles. The client-side code is entirely public and open-source on GitHub.
          </p>
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black">Audit your resume for free today</h3>
            <p className="text-xs sm:text-sm text-emerald-100">
            No account required. Review results in your browser.
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
