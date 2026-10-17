import React, { useState } from 'react';
import { MonetizationMetrics } from '../types';
import { ShieldCheck, Zap, Coffee, BarChart2, Eye, MousePointerClick, TrendingUp, X } from 'lucide-react';

interface MonetizationHUDProps {
  metrics: MonetizationMetrics;
  onSimulateTraffic: () => void;
  onOpenCoffee: () => void;
  isPro: boolean;
  onSelectTool?: (tool: 'sitemap' | 'calculator' | 'blueprint') => void;
}

export const MonetizationHUD: React.FC<MonetizationHUDProps> = ({
  metrics,
  onSimulateTraffic,
  onOpenCoffee,
  onSelectTool,
}) => {
  const [showDevPanel, setShowDevPanel] = useState(false);

  return (
    <div className="w-full bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Clean, high-trust user-facing guarantee (NO dev monetization text) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-slate-600 font-medium">
          <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>100% Client-Side & Free</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Server Uploads</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>No Account or Sign-Up Needed</span>
          </div>
        </div>

        {/* Right: User Support + Private Developer Console Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCoffee}
            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1 whitespace-nowrap shadow-xs"
          >
            <Coffee className="w-3 h-3 text-amber-600" />
            <span>Support Solo Dev</span>
          </button>

          {/* Webmaster Stats Drawer */}
          <button
            onClick={() => setShowDevPanel(!showDevPanel)}
            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 whitespace-nowrap"
            title="Webmaster Traffic & Analytics Simulation"
          >
            <BarChart2 className="w-3 h-3 text-slate-500" />
            <span>{showDevPanel ? 'Hide Stats' : 'Site Stats'}</span>
          </button>
        </div>
      </div>

      {/* Webmaster Analytics Drawer */}
      {showDevPanel && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-200 space-y-3 bg-slate-50 p-3 rounded-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
              <span className="font-bold text-slate-900 font-sans">Telemetry Console:</span>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Pageviews:</span>
                <strong className="text-slate-900">{metrics.impressions}</strong>
              </div>
              <div className="flex items-center gap-1">
                <MousePointerClick className="w-3.5 h-3.5 text-slate-500" />
                <span>Sponsor Clicks:</span>
                <strong className="text-slate-900">{metrics.clicks}</strong>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Publisher RPM:</span>
                <strong className="text-slate-900">${metrics.estimatedRpm.toFixed(2)}</strong>
              </div>
              <div className="flex items-center gap-1">
                <span>Simulated Yield:</span>
                <strong className="text-emerald-700 text-sm">
                  ${(metrics.earnings + metrics.tipsReceived + metrics.proLicensesSold * 2.99).toFixed(2)}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onSimulateTraffic}
                className="px-2.5 py-1 text-[11px] font-medium rounded bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors"
              >
                Simulate +250 Visitors
              </button>
              <button
                onClick={() => setShowDevPanel(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Webmaster Quick Tools for Site Owner */}
          {onSelectTool && (
            <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 text-[11px]">Owner Tools:</span>
              <button
                onClick={() => onSelectTool('sitemap')}
                className="px-2 py-1 text-[11px] font-medium rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              >
                Live Sitemap.xml
              </button>
              <button
                onClick={() => onSelectTool('calculator')}
                className="px-2 py-1 text-[11px] font-medium rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              >
                Traffic Calculator
              </button>
              <button
                onClick={() => onSelectTool('blueprint')}
                className="px-2 py-1 text-[11px] font-medium rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              >
                Launch Guide
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
