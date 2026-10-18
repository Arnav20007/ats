import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ResumeStudio } from './components/tools/ResumeStudio';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GuidePage } from './pages/GuidePage';
import { ToastProvider } from './components/Toast';
import { ShieldCheck } from 'lucide-react';

export type AppPage = 'home' | 'privacy' | 'terms' | 'about' | 'contact' | 'guide';

// Safe Storage Guard for private browsing / restricted contexts (F-08)
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignored safely
    }
  }
};

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return safeStorage.getItem('toolforge_theme') === 'dark';
  });

  // Client-side dedicated page routing
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('privacy')) return 'privacy';
    if (path.includes('terms')) return 'terms';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    if (path.includes('guide')) return 'guide';
    return 'home';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      safeStorage.setItem('toolforge_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeStorage.setItem('toolforge_theme', 'light');
    }
  }, [isDark]);

  // Handle browser back and forward history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('privacy')) setCurrentPage('privacy');
      else if (path.includes('terms')) setCurrentPage('terms');
      else if (path.includes('about')) setCurrentPage('about');
      else if (path.includes('contact')) setCurrentPage('contact');
      else if (path.includes('guide')) setCurrentPage('guide');
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic SEO metadata per route
  useEffect(() => {
    const seoMap: Record<AppPage, { title: string; desc: string; path: string }> = {
      home: {
        title: 'ToolForge – Free In-Browser ATS Resume Checker & Keyword Matcher',
        desc: 'Free in-browser résumé checks, job-description keyword comparisons, and formatting feedback. Results are heuristic guidance, not employer ATS tests.',
        path: '/'
      },
      guide: {
        title: 'ATS Resume Optimization Guide & Scoring Formula | ToolForge',
        desc: 'A practical guide to résumé formatting, job-description keyword comparisons, and writing clear achievement bullets.',
        path: '/guide'
      },
      about: {
        title: 'About ToolForge – Client-Side Privacy First Resume Studio',
        desc: 'Learn how ToolForge checks résumé text, compares job-description keywords, and processes content in your browser.',
        path: '/about'
      },
      contact: {
        title: 'Contact & Bug Report | ToolForge',
        desc: 'Get in touch with the ToolForge team, report parser bugs, suggest features, or request ATS platform verification.',
        path: '/contact'
      },
      privacy: {
        title: 'Privacy Policy & Zero-Storage Guarantee | ToolForge',
        desc: 'Résumé text is processed in your browser and is not sent to ToolForge servers. Theme preferences may be stored locally; fonts load from Google Fonts.',
        path: '/privacy'
      },
      terms: {
        title: 'Terms of Service | ToolForge',
        desc: 'Terms and conditions for using ToolForge free resume inspection and optimization utilities.',
        path: '/terms'
      }
    };

    const currentSeo = seoMap[currentPage] || seoMap.home;
    document.title = currentSeo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', currentSeo.desc);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', `https://toolforge-ats.vercel.app${currentSeo.path}`);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.desc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://toolforge-ats.vercel.app${currentSeo.path}`);
  }, [currentPage]);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-100 dark:selection:bg-emerald-950 transition-colors">

        {/* Global Header */}
        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onNavigateHome={() => navigateTo('home')}
        />

        {/* Dedicated Page Views */}
        <main className="flex-1 w-full">
          {currentPage === 'home' && (
            <ResumeStudio
              onOpenPrivacy={() => navigateTo('privacy')}
              onOpenTerms={() => navigateTo('terms')}
              onOpenGuide={() => navigateTo('guide')}
              onOpenAbout={() => navigateTo('about')}
              onOpenContact={() => navigateTo('contact')}
            />
          )}

          {currentPage === 'privacy' && (
            <PrivacyPage onNavigateHome={() => navigateTo('home')} />
          )}

          {currentPage === 'terms' && (
            <TermsPage onNavigateHome={() => navigateTo('home')} />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onNavigateHome={() => navigateTo('home')}
              onNavigatePrivacy={() => navigateTo('privacy')}
              onNavigateContact={() => navigateTo('contact')}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onNavigateHome={() => navigateTo('home')}
              onNavigatePrivacy={() => navigateTo('privacy')}
            />
          )}

          {currentPage === 'guide' && (
            <GuidePage
              onNavigateHome={() => navigateTo('home')}
              onNavigatePrivacy={() => navigateTo('privacy')}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

              {/* Brand */}
              <div className="col-span-2 lg:col-span-1 space-y-5">
                <div className="space-y-2">
                  <div
                    onClick={() => navigateTo('home')}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src="/favicon.svg" alt="ToolForge" className="w-5 h-5 rounded-md" />
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">ToolForge</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">FREE</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed max-w-[220px]">
                    Free browser-based résumé checks. No account required. Your résumé text is not sent to ToolForge servers.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Résumé text processed in your browser</span>
                </div>
              </div>

              {/* Column 1: Tools & Features */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                  Tools & Features
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'ATS Resume Checker', action: () => navigateTo('home') },
                    { label: 'Job Keyword Matcher', action: () => navigateTo('home') },
                    { label: 'Google X-Y-Z Rewriter', action: () => navigateTo('home') },
                    { label: 'PDF Audit Scorecard', action: () => navigateTo('home') },
                    { label: 'Résumé Formatting Guide', action: () => navigateTo('guide') },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className="text-xs text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Resources & Guides */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                  Resources & Guides
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'ATS Optimization Guide', action: () => navigateTo('guide') },
                    { label: 'Software Engineer Example', action: () => navigateTo('home') },
                    { label: 'Product Manager Example', action: () => navigateTo('home') },
                    { label: 'AI / ML Engineer Example', action: () => navigateTo('home') },
                    { label: 'Client-Side Privacy Guarantee', action: () => navigateTo('privacy') },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className="text-xs text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Company & Legal */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                  Company & Legal
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'About ToolForge', action: () => navigateTo('about') },
                    { label: 'Contact & Support', action: () => navigateTo('contact') },
                    { label: 'Privacy Policy', action: () => navigateTo('privacy') },
                    { label: 'Terms of Use', action: () => navigateTo('terms') },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className="text-xs text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-100 dark:border-zinc-800">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-zinc-500">
              <span>© {new Date().getFullYear()} ToolForge · Made for job seekers, by a job seeker.</span>
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                <button
                  onClick={() => navigateTo('guide')}
                  className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  ATS Guide
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Contact
                </button>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Terms of Use
                </button>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </ToastProvider>
  );
}
