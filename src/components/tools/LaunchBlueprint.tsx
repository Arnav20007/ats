import React, { useState } from 'react';
import { RANKED_NICHES, LAUNCH_PLAYBOOK_STEPS } from '../../data/mockData';
import { Rocket, ShieldCheck, Copy, Check, FileCode, Search, Lightbulb } from 'lucide-react';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';

interface LaunchBlueprintProps {
  onActionLogged: () => void;
}

export const LaunchBlueprint: React.FC<LaunchBlueprintProps> = ({ onActionLogged }) => {
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);

  const keywordMatrix = [
    { keyword: 'audio pitch shifter online free no ads', volume: '74,000', kd: '18 (Low)', intent: 'Transactional', cpc: '$2.40' },
    { keyword: 'tiktok 3 second hook generator', volume: '48,000', kd: '14 (Low)', intent: 'Transactional', cpc: '$1.80' },
    { keyword: 'overdue invoice demand letter template', volume: '33,000', kd: '22 (Low)', intent: 'Commercial', cpc: '$4.90' },
    { keyword: 'free ats resume bullet point rewriter', volume: '110,000', kd: '29 (Moderate)', intent: 'Informational', cpc: '$3.20' },
    { keyword: 'commercial roof replacement cost estimator', volume: '22,000', kd: '24 (Low)', intent: 'High-Ticket Lead', cpc: '$28.50' },
    { keyword: 'client side audio speed changer', volume: '19,000', kd: '9 (Ultra Low)', intent: 'Transactional', cpc: '$1.40' }
  ];

  const distributionScripts = [
    {
      platform: 'Reddit (r/freelance, r/Tiktokhelp, r/SideProject, r/webdev)',
      title: 'The Honest "Built This Out of Frustration" Post',
      text: `Every free audio pitch changer and video hook site on the web right now is completely ruined by 6 redirect popups and fake download buttons.

I spent Saturday building a 100% in-browser, clean alternative using the Web Audio API.

- Runs 100% in your local RAM (zero files uploaded to any server)
- No email sign-up, no "enter credit card for free trial"
- Instant one-click copy and export

Site: [YOUR_SITE_URL]

Would genuinely love feedback from anyone using it on what features I should add or tweak.`
    },
    {
      platform: 'TikTok / YouTube Shorts / Reels (Screen Recording)',
      title: 'The 15-Second Screen Demo (Highest Conversion)',
      text: `Screen: You open [YOUR_SITE_URL], paste a messy bullet or load a song, drag the speed slider, and click Export.
Voiceover (your natural voice): "If you make TikToks or dance choreo, stop downloading shady desktop apps just to speed up an audio track. This site runs in your browser, doesn't make you sign in, and renders the MP3 in 2 seconds. Link is in my bio."
Caption: "Free browser tool that fixes audio speed & key without ads #creatorhacks #edittok"`
    },
    {
      platform: 'Twitter / X Tech Community',
      title: 'The Zero-BS Indie Hacker Resource Drop',
      text: `Built and launched a client-side utility suite this weekend.

Stack:
- React 19 + Tailwind CSS + Web Audio API
- $0 hosting on Cloudflare Pages
- Dynamic sitemap.xml auto-indexing
- Clean model: privacy-first client-side processing + optional $2.99 ad-free pass

Traffic is already trickling in from Reddit. Check it out: [YOUR_SITE_URL]`
    }
  ];

  const handleCopyScript = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptIndex(idx);
    onActionLogged();
    setTimeout(() => setCopiedScriptIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Dynamic SEO Head with Dedicated FAQPage JSON-LD */}
      <SeoHead seo={SEO_DATA.blueprint} />

      {/* 2. Main Tool Card in Light Theme (NO BLUE) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono uppercase tracking-wider mb-1 font-bold">
            <span>Solo Developer Field Notes</span>
            <span>·</span>
            <span>Zero Ad Spend Distribution</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {SEO_DATA.blueprint.h1}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Here is the realistic developer playbook: how to deploy this utility on $0 hosting, submit the sitemap to Google Search Console, and get your first 500 organic visitors without paying a penny for ads.
          </p>
        </div>

        {/* Dedicated Live Sitemap Feature Banner */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Dynamic Live XML Sitemap Engine Active</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">Ready</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                We built a full interactive sitemap generator right into this app. Head over to the <strong>Sitemap.xml</strong> tab to add custom routes, adjust priorities, and download your production file.
              </p>
            </div>
          </div>
        </div>

        {/* High-Intent SEO Keyword Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-700" />
              <span>Target SEO Keywords & Keyword Difficulty (KD)</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              High Search Volume · Low Competition
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="p-3">Target Search Keyword</th>
                  <th className="p-3">Monthly Volume</th>
                  <th className="p-3">Keyword Difficulty</th>
                  <th className="p-3">Searcher Intent</th>
                  <th className="p-3 text-right">Ad CPC Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {keywordMatrix.map((k, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono font-medium text-slate-900">{k.keyword}</td>
                    <td className="p-3 font-mono text-slate-600 tabular-nums">{k.volume}</td>
                    <td className="p-3 font-mono text-emerald-800 font-bold">{k.kd}</td>
                    <td className="p-3 text-slate-600">{k.intent}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">{k.cpc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ranked Niches Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Top 6 High-Demand, Low-Competition Web Niches for 2026</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RANKED_NICHES.map((niche) => (
              <div
                key={niche.rank}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-900 font-bold">
                      Rank #{niche.rank}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      Est. {niche.expectedDay30Revenue}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">{niche.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {niche.whyItWinsNow}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 font-mono pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Monthly Volume:</span>
                      <span className="text-slate-900 font-semibold">{niche.monthlySearches}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Competition:</span>
                      <span className="text-slate-800 font-medium">{niche.competitionScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Publisher Model:</span>
                      <span className="text-emerald-800 font-semibold">{niche.primaryMonetization}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Build Time: {niche.buildComplexity}</span>
                  <span className="text-slate-900 font-bold">Active in this app</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 72-Hour Timeline Steps */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-slate-800" />
            <span>The 72-Hour Launch Timeline (From Zero to First Dollar)</span>
          </h3>

          <div className="space-y-3">
            {LAUNCH_PLAYBOOK_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 border border-slate-200 font-mono text-xs font-bold">
                      {step.day}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Duration: {step.duration}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {step.checklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Why it drives traffic:</strong> {step.trafficHook}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy-Paste Outreach Scripts */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Copy className="w-4 h-4 text-slate-700" />
            <span>Real Developer Outreach Scripts (Get First 1,000 Visitors for $0)</span>
          </h3>

          <div className="space-y-4">
            {distributionScripts.map((script, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{script.title}</span>
                    <span className="text-[11px] text-slate-500 font-mono block">{script.platform}</span>
                  </div>

                  <button
                    onClick={() => handleCopyScript(idx, script.text)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ${
                      copiedScriptIndex === idx
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    {copiedScriptIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Script!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-3.5 rounded-lg bg-slate-900 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed select-all">
                  {script.text}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Rich Crawlable Content: How-To, Competitor Benchmark, and Google FAQ Rich Snippets */}
      <FaqSection
        faqs={SEO_DATA.blueprint.faqs}
        toolName={SEO_DATA.blueprint.h1}
        howToSteps={SEO_DATA.blueprint.howToSteps}
        competitorComparison={SEO_DATA.blueprint.competitorComparison}
      />
    </div>
  );
};
