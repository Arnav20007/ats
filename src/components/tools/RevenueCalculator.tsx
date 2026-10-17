import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';

interface RevenueCalculatorProps {
  onActionLogged: () => void;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ onActionLogged }) => {
  const [dailyVisitors, setDailyVisitors] = useState<number>(350);
  const [adRpm, setAdRpm] = useState<number>(8.5);
  const [microConversion, setMicroConversion] = useState<number>(2.5);
  const [leadConversion, setLeadConversion] = useState<number>(1.8);
  const [leadBounty, setLeadBounty] = useState<number>(65);
  const [nicheIndustry, setNicheIndustry] = useState<'utility' | 'finance' | 'tech' | 'gaming'>('utility');

  const dailyAdRevenue = (dailyVisitors / 1000) * adRpm;
  const monthlyAdRevenue = dailyAdRevenue * 30;

  const dailyMicroBuyers = (dailyVisitors * (microConversion / 100));
  const dailyMicroRevenue = dailyMicroBuyers * 2.99;
  const monthlyMicroRevenue = dailyMicroRevenue * 30;

  const dailyLeads = (dailyVisitors * (leadConversion / 100));
  const dailyLeadRevenue = dailyLeads * leadBounty;
  const monthlyLeadRevenue = dailyLeadRevenue * 30;

  const applyIndustry = (ind: 'utility' | 'finance' | 'tech' | 'gaming', rpm: number) => {
    setNicheIndustry(ind);
    setAdRpm(rpm);
    onActionLogged();
  };

  return (
    <div className="space-y-6">
      {/* 1. Dynamic SEO Head with Dedicated FAQPage JSON-LD */}
      <SeoHead seo={SEO_DATA.calculator} />

      {/* 2. Main Tool Card in Light Theme (NO BLUE) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono uppercase tracking-wider mb-1 font-bold">
            <span>Creator Audience Economics</span>
            <span>·</span>
            <span>Traffic Yield Simulator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {SEO_DATA.calculator.h1}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Compare how different digital publishing models perform in practice: discover why relying strictly on banner ads demands hundreds of thousands of views, while lightweight utilities and direct passes achieve sustainable results with just 300 daily visitors.
          </p>
        </div>

        {/* Industry Niche Presets */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 block">
            Select Your Target Niche & Realistic Ad RPM:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyIndustry('utility', 8.5)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shadow-2xs ${
                nicheIndustry === 'utility' ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Creator Utilities ($8.50 RPM)
            </button>
            <button
              onClick={() => applyIndustry('finance', 24.0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shadow-2xs ${
                nicheIndustry === 'finance' ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Finance & Invoicing ($24.00 RPM)
            </button>
            <button
              onClick={() => applyIndustry('tech', 15.0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shadow-2xs ${
                nicheIndustry === 'tech' ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Developer & B2B ($15.00 RPM)
            </button>
            <button
              onClick={() => applyIndustry('gaming', 2.5)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shadow-2xs ${
                nicheIndustry === 'gaming' ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Entertainment / Gaming ($2.50 RPM)
            </button>
          </div>
        </div>

        {/* Sliders Console */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          {/* Daily Visitors Slider */}
          <div className="space-y-2 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-700" />
                <span>Daily Unique Visitors:</span>
              </span>
              <span className="font-mono font-bold text-slate-900 tabular-nums text-sm bg-slate-100 border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                {dailyVisitors.toLocaleString()} / day
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={dailyVisitors}
              onChange={(e) => { setDailyVisitors(parseInt(e.target.value)); onActionLogged(); }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>50 (Day 1)</span>
              <span>1,000 (Month 1)</span>
              <span>5,000 (Established)</span>
            </div>
          </div>

          {/* AdSense RPM Slider */}
          <div className="space-y-2 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Publisher RPM Rate:</span>
              </span>
              <span className="font-mono font-bold text-emerald-800 tabular-nums text-sm bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shadow-2xs">
                ${adRpm.toFixed(2)} / 1k views
              </span>
            </div>
            <input
              type="range"
              min="2.0"
              max="35.0"
              step="0.5"
              value={adRpm}
              onChange={(e) => { setAdRpm(parseFloat(e.target.value)); onActionLogged(); }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>$2.00 (General)</span>
              <span>$15.00 (Utility)</span>
              <span>$35.00 (High-Ticket)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Model Comparison Cards in Light Mode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Model 1: Display Ads Only */}
          <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Display Ads Only</span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AdSense</span>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                ${monthlyAdRevenue.toFixed(0)}
                <span className="text-xs font-normal text-slate-500"> /mo</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Requires 100,000+ monthly visits to make grocery money. Ad blockers reduce yield by 35%.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-rose-600 font-mono font-semibold">
              Speed to $100: ~3-6 Months
            </div>
          </div>

          {/* Model 2: Free Utility + $2.99 Micro-Pass */}
          <div className="p-4 sm:p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-950">Micro-Utility + Pro Pass</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">Stripe / Lemon</span>
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-800 tabular-nums mt-1">
                ${monthlyMicroRevenue.toFixed(0)}
                <span className="text-xs font-normal text-slate-600"> /mo</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                2.5% of users pay $2.99 for unlimited export or ad-free access. Immediate cash flow from Day 1.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-emerald-800 font-mono font-bold">
              Speed to $100: ~24–48 Hours
            </div>
          </div>

          {/* Model 3: High-Ticket Lead Gen Arbitrage */}
          <div className="p-4 sm:p-5 rounded-xl border border-slate-300 bg-slate-50 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900">Lead Arbitrage Engine</span>
                <span className="text-[10px] font-mono text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded font-bold">$65 / Lead</span>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                ${monthlyLeadRevenue.toFixed(0)}
                <span className="text-xs font-normal text-slate-600"> /mo</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Commercial quote submissions. 10 visitors can generate $130 in a single morning.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-800 font-mono font-bold">
              Speed to $100: Same Day
            </div>
          </div>
        </div>

        {/* Goal Planner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">The $3,000 / Month Target Formula:</div>
              <p className="text-xs text-slate-300 mt-0.5">
                To reach $3,000/mo with AdSense alone, you need <strong>12,000 daily visits</strong>. With a Free Tool + $2.99 Pro Pass, you need only <strong>1,100 daily visits</strong>.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-400 font-mono">Combined Hybrid Total:</span>
            <div className="text-lg font-bold font-mono text-emerald-400">
              ${(monthlyAdRevenue + monthlyMicroRevenue).toFixed(0)} / mo
            </div>
          </div>
        </div>
      </div>

      {/* 4. Rich Crawlable Content: How-To, Competitor Benchmark, and Google FAQ Rich Snippets */}
      <FaqSection
        faqs={SEO_DATA.calculator.faqs}
        toolName={SEO_DATA.calculator.h1}
        howToSteps={SEO_DATA.calculator.howToSteps}
        competitorComparison={SEO_DATA.calculator.competitorComparison}
      />
    </div>
  );
};
