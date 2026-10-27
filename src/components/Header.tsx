import React from 'react';
import {
  FileText,
  Moon,
  Sun,
  Coffee,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigateHome?: () => void;
  onNavigateGuide?: () => void;
  onNavigateKeywords?: () => void;
  onNavigateTemplates?: () => void;
  onNavigateBuilder?: () => void;
  onNavigateChecker?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onNavigateHome,
  onNavigateGuide,
  onNavigateKeywords,
  onNavigateTemplates,
  onNavigateBuilder,
  onNavigateChecker,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Left: Handcrafted Human Brand Mark */}
        <button
          type="button"
          onClick={onNavigateHome}
          aria-label="ATSCheck home"
          className="flex items-center gap-3 shrink-0 cursor-pointer bg-transparent border-0 p-0 text-left"
        >
          <img
            src="/favicon.svg"
            alt="ATSCheck"
            className="w-8 h-8 rounded-xl shadow-xs"
          />
          <span className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
              ATSCheck
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
              Resume Checker
            </span>
          </span>
        </button>

        {/* Center: Top Nav Links & Trust Message */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <nav className="flex items-center gap-0.5 font-semibold">
            <a
              href="/checker"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateChecker) onNavigateChecker();
                else if (onNavigateHome) onNavigateHome();
              }}
              className="px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Resume Checker
            </a>
            <a
              href="/builder"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateBuilder) onNavigateBuilder();
                else if (onNavigateHome) onNavigateHome();
              }}
              className="px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Resume Builder
            </a>
            <a
              href="/templates"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateTemplates) onNavigateTemplates();
                else if (onNavigateHome) onNavigateHome();
              }}
              className="px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              ATS Templates
            </a>
            <a
              href="/keywords"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateKeywords) onNavigateKeywords();
                else if (onNavigateHome) onNavigateHome();
              }}
              className="px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Role Keywords
            </a>
            <a
              href="/guide"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateGuide) onNavigateGuide();
                else if (onNavigateHome) onNavigateHome();
              }}
              className="px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              ATS Guide
            </a>
          </nav>

          <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 font-medium pl-3 border-l border-slate-200 dark:border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Free · In-Browser Memory</span>
          </div>
        </div>

        {/* Right: Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-colors shadow-2xs"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
