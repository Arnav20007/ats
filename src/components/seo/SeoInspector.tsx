import React, { useState } from 'react';
import { PageSeoData } from '../../types';
import { Search, Globe, Code2, Copy, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface SeoInspectorProps {
  seo: PageSeoData;
}

export const SeoInspector: React.FC<SeoInspectorProps> = ({ seo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'serp' | 'jsonld' | 'keywords'>('serp');
  const [copied, setCopied] = useState(false);

  const jsonLdString = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': seo.h1,
          'applicationCategory': seo.category,
          'operatingSystem': 'All (Web Browser)',
          'description': seo.metaDescription,
          'url': 'https://toolforge.dev' + seo.canonicalPath,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          'mainEntity': seo.faqs.map((f) => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.answer
            }
          }))
        }
      ]
    },
    null,
    2
  );

  const handleCopyJsonLd = () => {
    navigator.clipboard.writeText(jsonLdString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all">
      {/* Header bar to toggle inspector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
              <span>Live SEO & Google Snippet Analyzer</span>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold">
                100% Crawl Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Inspect dynamic meta tags, JSON-LD structured data, and target search volume for this page.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{isOpen ? 'Hide SEO Details' : 'View Google Snippet'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-slate-200 space-y-4">
          {/* Sub-tab navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('serp')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'serp'
                  ? 'bg-emerald-800 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              Google SERP Preview
            </button>
            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'keywords'
                  ? 'bg-emerald-800 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              Target Keywords & Intent
            </button>
            <button
              onClick={() => setActiveTab('jsonld')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'jsonld'
                  ? 'bg-emerald-800 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              Schema.org JSON-LD Code
            </button>
          </div>

          {/* Tab 1: Google SERP Preview */}
          {activeTab === 'serp' && (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block">
                Google Desktop & Mobile Search Result Simulation
              </span>

              {/* Realistic Google Snippet Card */}
              <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs max-w-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] text-emerald-800 font-bold">
                    T
                  </div>
                  <span className="text-slate-700 font-medium">ToolForge</span>
                  <span className="text-slate-400">›</span>
                  <span className="text-slate-500 truncate">https://toolforge.dev{seo.canonicalPath}</span>
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-emerald-950 hover:text-emerald-700 hover:underline cursor-pointer leading-snug line-clamp-1">
                  {seo.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {seo.metaDescription}
                </p>

                {/* Rich FAQ preview under snippet */}
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[11px] font-medium text-slate-500">Google Rich Snippet FAQs:</span>
                  {seo.faqs.slice(0, 2).map((faq, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                      <span className="text-emerald-800 font-bold">Q:</span>
                      <span className="hover:text-emerald-700 cursor-pointer">{faq.question}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Target Keywords */}
          {activeTab === 'keywords' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-slate-800">Primary Keyword Strategy:</span>
                <span className="font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Estimated Total: {seo.monthlySearchVolume}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {seo.targetKeywords.map((kw, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-800 font-medium">{kw}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                      Intent: {seo.searchIntent}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: JSON-LD Viewer */}
          {activeTab === 'jsonld' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Injected Schema.org Script (Parsed by Googlebot):</span>
                <button
                  onClick={handleCopyJsonLd}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-[11px] transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-lg bg-slate-900 text-slate-200 text-[11px] font-mono leading-relaxed overflow-x-auto max-h-56">
                {jsonLdString}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
