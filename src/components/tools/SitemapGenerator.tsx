import React, { useState } from 'react';
import { SitemapUrlEntry } from '../../types';
import { SEO_DATA } from '../../data/seoData';
import { SeoHead } from '../seo/SeoHead';
import { FaqSection } from '../seo/FaqSection';
import {
  FileCode,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Globe,
  CheckCircle2
} from 'lucide-react';

interface SitemapGeneratorProps {
  onActionLogged: () => void;
}

export const SitemapGenerator: React.FC<SitemapGeneratorProps> = ({ onActionLogged }) => {
  const [baseUrl, setBaseUrl] = useState('https://toolforge.dev');
  const todayStr = new Date().toISOString().split('T')[0];

  const initialUrls: SitemapUrlEntry[] = [
    {
      id: '1',
      loc: '/',
      lastmod: todayStr,
      changefreq: 'daily',
      priority: 1.0,
      title: 'Tools Index & Directory',
      category: 'Root Directory'
    },
    {
      id: '2',
      loc: '/tools/viral-hook-generator',
      lastmod: todayStr,
      changefreq: 'daily',
      priority: 0.9,
      title: 'TikTok & Shorts Hook Generator',
      category: 'Video Marketing'
    },
    {
      id: '2b',
      loc: '/tools/video-script-generator',
      lastmod: todayStr,
      changefreq: 'daily',
      priority: 0.9,
      title: 'Full Video, YouTube & Podcast Script Generator',
      category: 'Video Production'
    },
    {
      id: '3',
      loc: '/tools/audio-pitch-bpm-shifter',
      lastmod: todayStr,
      changefreq: 'weekly',
      priority: 0.9,
      title: 'In-Browser Audio Pitch & BPM Shifter',
      category: 'Audio Utilities'
    },
    {
      id: '4',
      loc: '/tools/ats-resume-bullet-polisher',
      lastmod: todayStr,
      changefreq: 'weekly',
      priority: 0.8,
      title: 'ATS Resume Bullet & Action Verb Optimizer',
      category: 'Career Tools'
    },
    {
      id: '5',
      loc: '/tools/overdue-invoice-demand-letter',
      lastmod: todayStr,
      changefreq: 'weekly',
      priority: 0.8,
      title: 'Freelancer Overdue Invoice Demand Letter',
      category: 'Legal & Finance'
    },
    {
      id: '6',
      loc: '/tools/website-revenue-simulator',
      lastmod: todayStr,
      changefreq: 'monthly',
      priority: 0.7,
      title: 'Website Traffic & Creator Revenue Potential Calculator',
      category: 'Calculators'
    },
    {
      id: '7',
      loc: '/playbook/72-hour-fast-cash-launch',
      lastmod: todayStr,
      changefreq: 'monthly',
      priority: 0.8,
      title: '72-Hour Web Utility Launch & Distribution Guide',
      category: 'Guides'
    },
    {
      id: '8',
      loc: '/tools/xml-sitemap-generator',
      lastmod: todayStr,
      changefreq: 'weekly',
      priority: 0.7,
      title: 'Live XML Sitemap Generator',
      category: 'Developer Tools'
    }
  ];

  const [urls, setUrls] = useState<SitemapUrlEntry[]>(initialUrls);
  const [newPath, setNewPath] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newFreq, setNewFreq] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [newPriority, setNewPriority] = useState(0.8);
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedRobots, setCopiedRobots] = useState(false);

  const cleanBase = baseUrl.replace(/\/+$/, '');
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${cleanBase}${u.loc.startsWith('/') ? u.loc : `/${u.loc}`}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsContent = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${cleanBase}/sitemap.xml`;

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPath.trim()) return;

    const formattedPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
    const newEntry: SitemapUrlEntry = {
      id: Date.now().toString(),
      loc: formattedPath,
      lastmod: todayStr,
      changefreq: newFreq,
      priority: newPriority,
      title: newTitle.trim() || formattedPath,
      category: 'Custom Route',
      isCustom: true
    };

    setUrls([...urls, newEntry]);
    setNewPath('');
    setNewTitle('');
    onActionLogged();
  };

  const handleRemoveUrl = (id: string) => {
    setUrls(urls.filter((u) => u.id !== id));
    onActionLogged();
  };

  const handlePriorityChange = (id: string, val: number) => {
    setUrls(urls.map((u) => (u.id === id ? { ...u, priority: val } : u)));
    onActionLogged();
  };

  const handleFreqChange = (id: string, val: SitemapUrlEntry['changefreq']) => {
    setUrls(urls.map((u) => (u.id === id ? { ...u, changefreq: val } : u)));
    onActionLogged();
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopiedXml(true);
    onActionLogged();
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onActionLogged();
  };

  const handleDownloadRobots = () => {
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onActionLogged();
  };

  const handleCopyRobots = () => {
    navigator.clipboard.writeText(robotsContent);
    setCopiedRobots(true);
    setTimeout(() => setCopiedRobots(false), 2000);
  };

  const fileSizeKb = (new Blob([xmlContent]).size / 1024).toFixed(2);

  return (
    <div className="space-y-6">
      {/* 1. Dynamic SEO Head with Dedicated FAQPage JSON-LD */}
      <SeoHead seo={SEO_DATA.sitemap} />

      {/* 2. Main Tool Card in Light Theme (NO BLUE) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono uppercase tracking-wider mb-1 font-bold">
            <span>Sitemaps.org Protocol v0.9 Compliant</span>
            <span>·</span>
            <span>Real-Time XML Generator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {SEO_DATA.sitemap.h1}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            I built this generator because every other online sitemap tool limits you to 500 URLs, asks for an email, or forces broken XML. This tool automatically builds a valid XML sitemap directly from your live routes, lets you tweak crawl priorities, and gives you instant copy or download.
          </p>
        </div>

        {/* Domain Configuration Bar */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 flex-1">
              <label className="block text-xs font-bold text-slate-800">
                Your Website Domain (Base URL):
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="url"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://yourdomain.com"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 shadow-xs"
                  />
                </div>
                <button
                  onClick={() => {
                    setBaseUrl(window.location.origin);
                    onActionLogged();
                  }}
                  className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs text-slate-800 font-semibold whitespace-nowrap shadow-xs"
                >
                  Use Current Host
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-700 font-mono bg-white border border-slate-200 px-3 py-2 rounded-lg shrink-0">
              <div>URLs: <span className="font-bold text-slate-900">{urls.length}</span></div>
              <span className="text-slate-300">|</span>
              <div>Size: <span className="font-bold text-slate-900">{fileSizeKb} KB</span></div>
              <span className="text-slate-300">|</span>
              <div className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Valid XML
              </div>
            </div>
          </div>
        </div>

        {/* Add Custom Route Form */}
        <form onSubmit={handleAddUrl} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
          <span className="text-xs font-bold text-slate-900 block">
            Add a Route or Landing Page to Sitemap:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="sm:col-span-2">
              <input
                type="text"
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                placeholder="/blog/how-to-make-money-online"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
            <div>
              <select
                value={newFreq}
                onChange={(e) => setNewFreq(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              >
                <option value="daily">Changefreq: Daily</option>
                <option value="weekly">Changefreq: Weekly</option>
                <option value="monthly">Changefreq: Monthly</option>
              </select>
            </div>
            <div>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono"
              >
                <option value="1.0">Priority: 1.0 (Highest)</option>
                <option value="0.9">Priority: 0.9</option>
                <option value="0.8">Priority: 0.8 (Standard)</option>
                <option value="0.6">Priority: 0.6</option>
                <option value="0.4">Priority: 0.4 (Low)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add URL to Sitemap</span>
            </button>
          </div>
        </form>

        {/* URLs Table & Priority Tuner */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Indexed Routes ({urls.length} URLs):</span>
            <span className="text-slate-500 font-normal">Tweak priority or frequency in real time</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="p-3">Route Location (&lt;loc&gt;)</th>
                  <th className="p-3">Page / Category</th>
                  <th className="p-3">Frequency (&lt;changefreq&gt;)</th>
                  <th className="p-3">Priority (&lt;priority&gt;)</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {urls.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-mono text-slate-900 font-semibold">
                      {cleanBase}{u.loc}
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="font-medium text-slate-900">{u.title}</div>
                      <div className="text-[11px] text-slate-400">{u.category}</div>
                    </td>
                    <td className="p-3">
                      <select
                        value={u.changefreq}
                        onChange={(e) => handleFreqChange(u.id, e.target.value as any)}
                        className="px-2 py-1 rounded border border-slate-200 bg-slate-50 text-slate-700 text-xs"
                      >
                        <option value="daily">daily</option>
                        <option value="weekly">weekly</option>
                        <option value="monthly">monthly</option>
                        <option value="yearly">yearly</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <select
                        value={u.priority}
                        onChange={(e) => handlePriorityChange(u.id, parseFloat(e.target.value))}
                        className="px-2 py-1 rounded border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs font-medium"
                      >
                        <option value="1.0">1.0</option>
                        <option value="0.9">0.9</option>
                        <option value="0.8">0.8</option>
                        <option value="0.7">0.7</option>
                        <option value="0.5">0.5</option>
                        <option value="0.3">0.3</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      {u.isCustom && (
                        <button
                          onClick={() => handleRemoveUrl(u.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove custom route"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live XML Code Viewport */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileCode className="w-4 h-4 text-slate-700" />
              <span>Real-Time Generated sitemap.xml:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyXml}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedXml ? 'Copied XML!' : 'Copy sitemap.xml'}</span>
              </button>

              <button
                onClick={handleDownloadXml}
                className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download sitemap.xml</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto max-h-72 shadow-inner">
            {xmlContent}
          </pre>
        </div>

        {/* Matching robots.txt Generator Box */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Companion robots.txt File:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyRobots}
                className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px] transition-colors"
              >
                {copiedRobots ? 'Copied robots.txt!' : 'Copy robots.txt'}
              </button>
              <button
                onClick={handleDownloadRobots}
                className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px] transition-colors"
              >
                Download robots.txt
              </button>
            </div>
          </div>
          <pre className="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs font-mono leading-relaxed">
            {robotsContent}
          </pre>
        </div>

        {/* Step-by-Step Google Indexing Instructions */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs text-slate-800">
          <div className="font-bold flex items-center gap-1.5 text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Developer Guide: How to Submit to Google in 60 Seconds</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed pl-1">
            <li>Download <code>sitemap.xml</code> and place it inside your public directory (e.g. <code>public/sitemap.xml</code>).</li>
            <li>Deploy your site to Vercel, Netlify, or Cloudflare Pages.</li>
            <li>Head over to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-slate-900 font-bold underline inline-flex items-center gap-0.5">Google Search Console <ExternalLink className="w-3 h-3" /></a>.</li>
            <li>Click <strong>Sitemaps</strong> in the left sidebar, paste <code>sitemap.xml</code> into the input field, and hit <strong>Submit</strong>.</li>
            <li>Googlebot will verify the XML and begin queueing your URLs for indexing within 24 to 48 hours.</li>
          </ol>
        </div>
      </div>

      {/* 4. Rich Crawlable Content: How-To, Competitor Benchmark, and Google FAQ Rich Snippets */}
      <FaqSection
        faqs={SEO_DATA.sitemap.faqs}
        toolName={SEO_DATA.sitemap.h1}
        howToSteps={SEO_DATA.sitemap.howToSteps}
        competitorComparison={SEO_DATA.sitemap.competitorComparison}
      />
    </div>
  );
};
