import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Zap,
  Sparkles,
  ExternalLink,
  Lock,
  Flame,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { ToolId } from '../types';

interface WorkbenchSidebarProps {
  activeTool: ToolId;
  onSelectTool: (id: ToolId) => void;
  onOpenPro: () => void;
  isPro: boolean;
}

export const WorkbenchSidebar: React.FC<WorkbenchSidebarProps> = ({
  activeTool,
  onSelectTool,
  onOpenPro,
  isPro,
}) => {
  return (
    <aside className="space-y-4">
      {/* 1. Client-Side Engine Status & Privacy Shield */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              In-Browser Security
            </h4>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/80">
            RAM Only
          </span>
        </div>

        <div className="pt-3 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Cpu className="w-3.5 h-3.5" /> Engine
            </span>
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">WebAssembly + WebAudio</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <HardDrive className="w-3.5 h-3.5" /> Storage
            </span>
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">Zero Cloud Logs</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Lock className="w-3.5 h-3.5" /> Privacy
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Client-Side</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Your files, audio tracks, and prompts are processed directly in your browser's private memory sandbox. Nothing is transmitted to external servers.
        </div>
      </div>

      {/* 2. Curated Creator Partner Spotlight */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-2 mb-3 border-b border-zinc-100 dark:border-zinc-800/80 font-mono">
          <span className="uppercase tracking-wider font-semibold">Curated Creator Tool</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Free Access</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              C
            </div>
            <div>
              <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Canva Pro Studio
              </h5>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                Design viral thumbnail templates, overlays, and media kits with one-click export.
              </p>
            </div>
          </div>

          <a
            href="https://www.canva.com"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 text-zinc-900 dark:text-zinc-100 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <span>Explore Creator Templates</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* 3. Pro Lifetime Pass Card */}
      {!isPro ? (
        <div className="rounded-2xl border border-amber-300/80 dark:border-amber-800/50 bg-gradient-to-b from-amber-50/60 to-white dark:from-amber-950/20 dark:to-zinc-900 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">
              Lifetime Access
            </span>
            <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">$2.99</span>
          </div>

          <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            ATSCheck Pro Pass
          </h4>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            One-time micro-payment. Unlock unlimited high-bitrate audio exports, full legal document generation, and lifetime updates.
          </p>

          <button
            onClick={onOpenPro}
            className="w-full mt-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Unlock Pro Pass</span>
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-semibold">ATSCheck Pro Active · All Features Unlocked</span>
        </div>
      )}
    </aside>
  );
};
