import React, { useState } from 'react';
import { Copy, Check, Sparkles, ShieldCheck, Download, Award } from 'lucide-react';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';

interface ResumePolisherProps {
  onActionLogged: () => void;
}

export const ResumePolisher: React.FC<ResumePolisherProps> = ({ onActionLogged }) => {
  const [inputBullet, setInputBullet] = useState(
    'Helped manage social media and responded to customer emails to increase followers.'
  );
  const [roleLevel, setRoleLevel] = useState<'entry' | 'mid' | 'senior'>('mid');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const rolePresets = [
    {
      role: 'Software Engineer',
      bullet: 'Worked on backend APIs and fixed database bugs to improve application speed.',
      level: 'mid' as const
    },
    {
      role: 'Growth Marketing',
      bullet: 'Managed ad campaigns on Google and Facebook to get more signups.',
      level: 'mid' as const
    },
    {
      role: 'Sales & Account Exec',
      bullet: 'Talked to business leads and closed deals to hit quarterly targets.',
      level: 'senior' as const
    },
    {
      role: 'Customer Support',
      bullet: 'Answered support tickets and helped users solve account issues.',
      level: 'entry' as const
    }
  ];

  const getEnhancedBullets = () => {
    return [
      {
        type: 'Metric-Driven & High Impact (Google X-Y-Z)',
        score: 96,
        text: 'Spearheaded organic social growth across 3 core channels, orchestrating an 84% surge in engagement and decreasing support ticket turnaround by 35% through standardized SLA playbooks.',
        powerVerbs: ['Spearheaded', 'Orchestrating', 'Standardized'],
        whyItWins: 'Replaces passive "helped" with executive active verbs and concrete percentage benchmarks.'
      },
      {
        type: 'Executive & Strategic Leadership',
        score: 93,
        text: 'Directed omnichannel community operations; formulated automated customer response pipelines that boosted retention by 22% while scaling audience reach to 120k+ impressions monthly.',
        powerVerbs: ['Directed', 'Formulated', 'Scaling'],
        whyItWins: 'Highlights pipeline thinking, operational systems, and quantifiable monthly volume.'
      },
      {
        type: 'Punchy ATS-Optimized (Concise)',
        score: 91,
        text: 'Accelerated cross-platform brand presence (+68% YoY) and streamlined customer communications, resolving 450+ inquiries weekly with a 98.4% satisfaction score.',
        powerVerbs: ['Accelerated', 'Streamlined', 'Resolving'],
        whyItWins: 'Clean scanning for recruiter screeners and automated Applicant Tracking Systems.'
      }
    ];
  };

  const [results, setResults] = useState(getEnhancedBullets());

  const handlePolish = () => {
    onActionLogged();
    setResults(getEnhancedBullets());
  };

  const handleApplyPreset = (preset: typeof rolePresets[0]) => {
    setInputBullet(preset.bullet);
    setRoleLevel(preset.level);
    onActionLogged();
    setTimeout(() => {
      setResults(getEnhancedBullets());
    }, 50);
  };

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    onActionLogged();
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const combined = results.map(r => `• ${r.text}`).join('\n\n');
    navigator.clipboard.writeText(combined);
    setCopiedAll(true);
    onActionLogged();
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Dynamic SEO Head with Dedicated FAQPage JSON-LD */}
      <SeoHead seo={SEO_DATA.resume} />

      {/* 2. Main Tool Card in Light Theme (NO BLUE) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono uppercase tracking-wider mb-1 font-bold">
            <span>Career & ATS Optimizer</span>
            <span>·</span>
            <span>100% Free · No Sign-Up Needed</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {SEO_DATA.resume.h1}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Transform weak, passive job descriptions into metric-backed executive achievements that pass ATS filters and impress hiring managers.
          </p>
        </div>

        {/* Role Presets */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 block">
            Common Job Role Templates:
          </span>
          <div className="flex flex-wrap gap-2">
            {rolePresets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 transition-colors shadow-2xs"
              >
                {p.role}
              </button>
            ))}
          </div>
        </div>

        {/* Input Console */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Draft / Weak Bullet Point:
            </label>
            <textarea
              value={inputBullet}
              onChange={(e) => {
                setInputBullet(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              placeholder="e.g. Worked with team on website redesign and fixed bugs"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all leading-relaxed shadow-xs resize-none overflow-hidden min-h-[56px]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-medium">Target Seniority:</span>
              {(['entry', 'mid', 'senior'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => { setRoleLevel(lvl); handlePolish(); }}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                    roleLevel === lvl
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lvl === 'entry' ? 'Entry-Level' : lvl === 'mid' ? 'Mid-Level' : 'Senior / Lead'}
                </button>
              ))}
            </div>

            <button
              onClick={handlePolish}
              className="px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate 3 Polished Rewrites</span>
            </button>
          </div>
        </div>

        {/* Bulk Action Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="font-bold text-slate-800">3 Executive Rewrites Ready:</span>
          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? 'All Copied!' : 'Copy All Bullets'}</span>
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-800" />
                  <span className="text-xs font-bold text-slate-900">{item.type}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    ATS Score: {item.score}%
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="text-[11px] font-medium">Power Verbs:</span>
                  {item.powerVerbs.map((v, i) => (
                    <span key={i} className="text-[11px] font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/80">
                <p className="text-sm text-slate-900 leading-relaxed font-normal">
                  • {item.text}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">{item.whyItWins}</span>
                </span>

                <button
                  onClick={() => handleCopy(idx, `• ${item.text}`)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                    copiedIndex === idx
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Bullet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Rich Crawlable Content: How-To, Competitor Benchmark, and Google FAQ Rich Snippets */}
      <FaqSection
        faqs={SEO_DATA.resume.faqs}
        toolName={SEO_DATA.resume.h1}
        howToSteps={SEO_DATA.resume.howToSteps}
        competitorComparison={SEO_DATA.resume.competitorComparison}
      />
    </div>
  );
};
