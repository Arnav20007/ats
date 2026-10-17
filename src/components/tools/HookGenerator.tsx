import React, { useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Download, FileText, CheckCircle2 } from 'lucide-react';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';

interface HookGeneratorProps {
  onActionLogged: () => void;
}

export const HookGenerator: React.FC<HookGeneratorProps> = ({ onActionLogged }) => {
  const [topic, setTopic] = useState('making money online with simple micro websites');
  const [targetAudience, setTargetAudience] = useState('beginners & solo creators');
  const [platform, setPlatform] = useState<'tiktok' | 'reels' | 'shorts'>('tiktok');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'curiosity' | 'contrarian' | 'urgency' | 'story'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeScriptModal, setActiveScriptModal] = useState<any | null>(null);

  const presets = [
    { label: 'Micro Cash Websites', topic: 'building simple cash-flow websites without coding', audience: 'solo founders & beginners' },
    { label: 'Personal Finance', topic: 'investing your first $1,000 without stock market anxiety', audience: 'college students & young pros' },
    { label: 'Fitness & Fat Loss', topic: 'losing 15 lbs of stubborn fat while eating carbs', audience: 'busy 9-to-5 workers' },
    { label: 'Freelancing & Invoicing', topic: 'getting clients to pay your invoices within 24 hours', audience: 'freelance designers & writers' },
    { label: 'Coding & Dev', topic: 'learning Python in 2026 without watching 10-hour tutorials', audience: 'self-taught programmers' }
  ];

  const generateHooks = () => {
    return [
      {
        id: 1,
        title: 'The Uncomfortable Reality Loop',
        text: `Most people fail at ${topic} because they copy what everyone else does on YouTube. Here is the exact 3-step cheat code nobody talks about.`,
        category: 'curiosity',
        retention: '89% 3s Retention',
        why: 'Attacks conventional wisdom and opens a strong curiosity gap that demands closure.',
        script: {
          problem: `You spend 3 weeks setting up tools, only to hear absolute crickets.`,
          solution: `Instead, focus exclusively on a single un-gated problem that users search for daily.`,
          cta: `Comment 'BLUEPRINT' and I will send you the complete step-by-step framework.`
        }
      },
      {
        id: 2,
        title: 'The Pattern Interrupt',
        text: `Stop wasting your weekends on ${topic} until you watch this 30-second fix. If you are ${targetAudience}, this changes everything.`,
        category: 'contrarian',
        retention: '92% 3s Retention',
        why: 'Direct command + targeted demographic identifier forces the viewer to pause scrolling.',
        script: {
          problem: `You are burning 40 hours building features that nobody actually asked for.`,
          solution: `Use a 1-day MVP approach: one pain point, one instant action button, instant utility.`,
          cta: `Save this video right now so you do not make the same mistake next week.`
        }
      },
      {
        id: 3,
        title: 'The Urgent Loss-Aversion Hook',
        text: `In 2026, if you are still approaching ${topic} the old way, you are losing at least $500 every single month.`,
        category: 'urgency',
        retention: '86% 3s Retention',
        why: 'Loss aversion is psychologically 2.5x more powerful than desire for gain.',
        script: {
          problem: `Every day you delay, three other people capture the exact search term you wanted.`,
          solution: `Deploy the lightweight version first with zero friction and instant value.`,
          cta: `Tap the link in my bio to get the free checklist before you start.`
        }
      },
      {
        id: 4,
        title: 'The Vulnerable Case Study',
        text: `I spent 45 days testing every single method for ${topic} so you do not have to waste a dime. Here is what actually worked on day 1.`,
        category: 'story',
        retention: '83% 3s Retention',
        why: 'High perceived research effort saved for the viewer generates instant trust.',
        script: {
          problem: `I tried 12 different tools and lost $400 on domain registrations that went nowhere.`,
          solution: `The only method that produced cash in 24 hours was an un-gated micro-utility.`,
          cta: `Follow for daily breakdowns of websites that work with zero overhead.`
        }
      },
      {
        id: 5,
        title: 'The "Don\'t Do This" Warning',
        text: `Never touch ${topic} until you understand this simple psychological rule. It is why 95% of people quit in week 2.`,
        category: 'curiosity',
        retention: '87% 3s Retention',
        why: 'Fear of avoidable failure induces high video completion rates.',
        script: {
          problem: `Beginners drown in perfectionism and spend months redesigning their landing page.`,
          solution: `Rule #1: If it does not solve an acute emergency in 10 seconds, do not build it.`,
          cta: `Share this with someone who is currently overthinking their side project.`
        }
      },
      {
        id: 6,
        title: 'The "Lazy Person\'s" Framework',
        text: `The lazy way to master ${topic} in under 15 minutes a day, especially engineered for ${targetAudience}.`,
        category: 'contrarian',
        retention: '91% 3s Retention',
        why: 'Low friction + high tangible reward is the #1 viral magnet across all social platforms.',
        script: {
          problem: `You do not have 4 hours every evening after work to grind.`,
          solution: `Automate 90% of the workflow with pre-built client-side templates.`,
          cta: `Drop a like if you want the part 2 deep-dive tomorrow.`
        }
      }
    ];
  };

  const [hooks, setHooks] = useState(generateHooks());

  const filteredHooks = selectedCategory === 'all'
    ? hooks
    : hooks.filter(h => h.category === selectedCategory);

  const handlePresetClick = (p: typeof presets[0]) => {
    setTopic(p.topic);
    setTargetAudience(p.audience);
    onActionLogged();
    setTimeout(() => {
      setHooks(generateHooks());
    }, 50);
  };

  const handleRegenerate = () => {
    onActionLogged();
    setHooks(generateHooks());
  };

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onActionLogged();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = filteredHooks.map((h, i) => `${i + 1}. [${h.title} - ${h.retention}]\n"${h.text}"\n`).join('\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    onActionLogged();
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadTxt = () => {
    const allText = filteredHooks.map((h, i) => `${i + 1}. [${h.title} - ${h.retention}]\n"${h.text}"\nWhy it works: ${h.why}\n`).join('\n');
    const blob = new Blob([allText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Viral_Hooks_${platform}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onActionLogged();
  };

  return (
    <div className="space-y-6">
      {/* 1. Dynamic SEO Head with Dedicated FAQPage JSON-LD */}
      <SeoHead seo={SEO_DATA.hooks} />

      {/* 2. Main Tool Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono uppercase tracking-wider mb-1 font-bold">
            <span>Video Retention Engine</span>
            <span>·</span>
            <span>100% Free · No Sign-Up Needed</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {SEO_DATA.hooks.h1}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Generate battle-tested 3-second openers proven to hold attention on TikTok, Instagram Reels, and YouTube Shorts. Stop viewers from scrolling past and trigger organic algorithmic push.
          </p>
        </div>

        {/* Niche Presets */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 block">
            Popular Niche Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(preset)}
                className="px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 transition-colors shadow-2xs"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Video Topic / Keyword:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. building a fast cash website"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Demographic / Viewer:
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. college students, busy freelancers"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Platform & Action Bar (NO BLUE BUTTONS) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-600 font-medium mr-1">Platform:</span>
              {(['tiktok', 'reels', 'shorts'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPlatform(p); handleRegenerate(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    platform === p
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {p === 'tiktok' ? 'TikTok' : p === 'reels' ? 'Instagram Reels' : 'YouTube Shorts'}
                </button>
              ))}
            </div>

            <button
              onClick={handleRegenerate}
              className="px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate Hooks</span>
            </button>
          </div>
        </div>

        {/* Framework Filter Tabs & Bulk Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Filter Angle:</span>
            {(['all', 'curiosity', 'contrarian', 'urgency', 'story'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All (6)' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'All Copied!' : 'Copy All'}</span>
            </button>
            <button
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-700" />
              <span>Export .TXT</span>
            </button>
          </div>
        </div>

        {/* Hooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {filteredHooks.map((hook) => (
            <div
              key={hook.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">{hook.title}</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {hook.retention}
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 my-2">
                  <p className="text-sm text-slate-900 leading-relaxed font-normal">
                    "{hook.text}"
                  </p>
                </div>

                <p className="text-xs text-slate-500 mt-2 flex items-start gap-1.5 leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{hook.why}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveScriptModal(hook)}
                  className="text-xs text-slate-800 hover:text-black font-semibold flex items-center gap-1 transition-colors underline decoration-slate-300 underline-offset-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full 30s Script</span>
                </button>

                <button
                  onClick={() => handleCopy(hook.id, hook.text)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                    copiedId === hook.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  {copiedId === hook.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Hook</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Script Breakdown Modal */}
      {activeScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase">Complete Video Blueprint</span>
                <h3 className="text-base font-bold text-slate-900">{activeScriptModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveScriptModal(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Sec 0-3 (The Opener):</span>
                <p className="text-slate-950 font-medium">"{activeScriptModal.text}"</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">Sec 4-12 (The Relatable Pain):</span>
                <p className="text-slate-700">{activeScriptModal.script.problem}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">Sec 13-25 (The Secret Fix):</span>
                <p className="text-slate-700">{activeScriptModal.script.solution}</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 space-y-1">
                <span className="font-bold text-emerald-900 block">Sec 26-30 (Call to Action):</span>
                <p className="text-emerald-950 font-medium">{activeScriptModal.script.cta}</p>
              </div>
            </div>

            <button
              onClick={() => {
                const fullScript = `HOOK:\n"${activeScriptModal.text}"\n\nPROBLEM:\n${activeScriptModal.script.problem}\n\nSOLUTION:\n${activeScriptModal.script.solution}\n\nCTA:\n${activeScriptModal.script.cta}`;
                navigator.clipboard.writeText(fullScript);
                setActiveScriptModal(null);
                onActionLogged();
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Script</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Rich Crawlable Content: How-To, Competitor Benchmark, and Google FAQ Rich Snippets */}
      <FaqSection
        faqs={SEO_DATA.hooks.faqs}
        toolName={SEO_DATA.hooks.h1}
        howToSteps={SEO_DATA.hooks.howToSteps}
        competitorComparison={SEO_DATA.hooks.competitorComparison}
      />
    </div>
  );
};
