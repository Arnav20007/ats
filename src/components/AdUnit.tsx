import React, { useState } from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface AdUnitProps {
  type: 'leaderboard' | 'rectangle';
  onAdClick?: () => void;
  isPro?: boolean;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, onAdClick, isPro }) => {
  const [clicked, setClicked] = useState(false);

  if (isPro) {
    return (
      <div className="w-full py-2.5 px-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Pro Member: All Ads Removed
        </span>
        <span className="text-[11px] text-emerald-600 font-mono">100% Ad-Free Experience</span>
      </div>
    );
  }

  const handleClick = () => {
    setClicked(true);
    if (onAdClick) onAdClick();
    setTimeout(() => setClicked(false), 2500);
  };

  if (type === 'leaderboard') {
    return (
      <div className="w-full max-w-4xl mx-auto my-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs transition-colors hover:border-slate-300">
        <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 mb-2 border-b border-slate-100 font-mono">
          <span className="tracking-wider uppercase font-semibold">Featured Developer Partner</span>
          <span className="text-slate-400">Verified Sponsor</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-slate-900">CloudScale Serverless Postgres</h4>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono font-medium">Free Tier</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                Deploy Postgres in 1 click. Zero config, auto-scaling up to 50k QPS with $300 free developer credits.
              </p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
          >
            {clicked ? 'Claiming Credits...' : 'Claim $300 Credits'}
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-colors hover:border-slate-300">
      <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 mb-2.5 border-b border-slate-100 font-mono">
        <span className="tracking-wider uppercase font-semibold">Recommended Creator Tool</span>
        <span>Sponsored</span>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50/40 border border-slate-200 p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-700 font-bold uppercase tracking-wider mb-2">Voice & Audio Studio</span>
          <div>
            <h5 className="text-sm font-bold text-slate-900 leading-snug">ElevenLabs AI Voice Studio</h5>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              Generate hyper-realistic voices for your TikTok, Reels, and YouTube Shorts in 29 languages.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          The industry standard for video creators. Over 10M+ audio tracks generated this week.
        </p>
        <button
          onClick={handleClick}
          className="w-full py-2.5 text-xs font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          {clicked ? 'Opening Studio...' : 'Try Free Voice Studio'}
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
