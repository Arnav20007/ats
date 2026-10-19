import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ResumeStudio } from './components/tools/ResumeStudio';
import { TemplatesPage } from './pages/TemplatesPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GuidePage } from './pages/GuidePage';
import { KeywordsPage } from './pages/KeywordsPage';
import { ToastProvider } from './components/Toast';
import { ShieldCheck } from 'lucide-react';
import routeSeo from './data/routeSeo.json';
import { ResumeSessionProvider, useResumeSession, type AtsTemplateId } from './context/ResumeSessionContext';
import { SAMPLE_RESUMES } from './data/resumeSamples';
import { ROLE_KEYWORD_PROFILES } from './data/roleKeywords';

export type AppPage = 'home' | 'templates' | 'builder' | 'checker' | 'privacy' | 'terms' | 'about' | 'contact' | 'guide' | 'keywords' | 'notFound';

const getPageFromPath = (pathname: string): AppPage => {
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (path === '/') return 'home';
  if (path === '/templates' || path === '/resume-templates') return 'templates';
  if (path === '/builder' || path === '/resume-builder') return 'builder';
  if (path === '/checker' || path === '/resume-checker') return 'checker';
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  if (path === '/guide') return 'guide';
  if (path === '/keywords') return 'keywords';
  if (path.startsWith('/keywords/')) {
    const slug = path.replace('/keywords/', '').trim();
    if (ROLE_KEYWORD_PROFILES[slug]) return 'keywords';
    return 'notFound';
  }
  return 'notFound';
};

const getRoleSlugFromPath = (pathname: string): string => {
  const match = pathname.toLowerCase().match(/^\/keywords(?:\/([a-z0-9-]+))?\/?$/);
  return match && match[1] && ROLE_KEYWORD_PROFILES[match[1]] ? match[1] : '';
};

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

interface AppProps { initialPath?: string }

function AppContent({ initialPath }: AppProps) {
  const { setResume, setViewMode, setStudioTab, setActiveStudioTab, setSelectedTemplate } = useResumeSession();

  // Match the static HTML on the first render, then apply the saved preference.
  const [isDark, setIsDark] = useState<boolean>(false);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  });

  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    return getPageFromPath(currentPath);
  });

  const currentRoleSlug = getRoleSlugFromPath(currentPath);

  useEffect(() => {
    if (safeStorage.getItem('toolforge_theme') === 'dark') setIsDark(true);
  }, []);

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
      const path = window.location.pathname;
      setCurrentPath(path);
      setCurrentPage(getPageFromPath(path));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync session viewMode with dedicated tool routes
  useEffect(() => {
    if (currentPage === 'builder') {
      setViewMode('studio');
      setStudioTab('document');
    } else if (currentPage === 'checker' || currentPage === 'home') {
      setViewMode('landing');
    }
  }, [currentPage]);

  // Dynamic SEO metadata per route
  useEffect(() => {
    let currentSeo = { title: routeSeo.home.title, desc: routeSeo.home.description, path: routeSeo.home.path };
    if (currentPage === 'home') currentSeo = { title: routeSeo.home.title, desc: routeSeo.home.description, path: routeSeo.home.path };
    else if (currentPage === 'templates') currentSeo = { title: routeSeo.templates.title, desc: routeSeo.templates.description, path: routeSeo.templates.path };
    else if (currentPage === 'builder') currentSeo = { title: routeSeo.builder.title, desc: routeSeo.builder.description, path: routeSeo.builder.path };
    else if (currentPage === 'checker') currentSeo = { title: routeSeo.checker.title, desc: routeSeo.checker.description, path: routeSeo.checker.path };
    else if (currentPage === 'guide') currentSeo = { title: routeSeo.guide.title, desc: routeSeo.guide.description, path: routeSeo.guide.path };
    else if (currentPage === 'about') currentSeo = { title: routeSeo.about.title, desc: routeSeo.about.description, path: routeSeo.about.path };
    else if (currentPage === 'contact') currentSeo = { title: routeSeo.contact.title, desc: routeSeo.contact.description, path: routeSeo.contact.path };
    else if (currentPage === 'privacy') currentSeo = { title: routeSeo.privacy.title, desc: routeSeo.privacy.description, path: routeSeo.privacy.path };
    else if (currentPage === 'terms') currentSeo = { title: routeSeo.terms.title, desc: routeSeo.terms.description, path: routeSeo.terms.path };
    else if (currentPage === 'keywords') {
      const slugKey = `keywords_${currentRoleSlug.replace(/-/g, '_')}` as keyof typeof routeSeo;
      if (currentPath === '/keywords' && routeSeo.keywords) {
        currentSeo = { title: routeSeo.keywords.title, desc: routeSeo.keywords.description, path: routeSeo.keywords.path };
      } else if (routeSeo[slugKey]) {
        const entry = routeSeo[slugKey];
        currentSeo = { title: entry.title, desc: entry.description, path: entry.path };
      } else if (routeSeo.keywords) {
        currentSeo = { title: routeSeo.keywords.title, desc: routeSeo.keywords.description, path: routeSeo.keywords.path };
      }
    } else {
      currentSeo = { title: routeSeo.notFound.title, desc: routeSeo.notFound.description, path: routeSeo.notFound.path };
    }

    document.title = currentSeo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', currentSeo.desc);

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) robotsMeta.setAttribute('content', currentPage === 'notFound' ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', currentSeo.title);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && currentPage === 'notFound') canonicalLink.remove();
    else if (canonicalLink) canonicalLink.setAttribute('href', `https://toolforge-ats.vercel.app${currentSeo.path}`);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.desc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://toolforge-ats.vercel.app${currentSeo.path}`);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', currentSeo.title);
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', currentSeo.desc);
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', `https://toolforge-ats.vercel.app${currentSeo.path}`);

    const structuredData = document.getElementById('toolforge-route-schema');
    if (structuredData && currentPage !== 'home') {
      if (currentPage === 'notFound') {
        structuredData.textContent = '';
      } else if (currentPage === 'about') {
        structuredData.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': 'https://toolforge-ats.vercel.app/about#webpage',
          name: currentSeo.title,
          description: currentSeo.desc,
          url: 'https://toolforge-ats.vercel.app/about',
          isPartOf: { '@id': 'https://toolforge-ats.vercel.app/#website' },
          mainEntity: {
            '@type': 'Person',
            name: 'Arnav Singh',
            jobTitle: 'Founder & Full Stack Software Engineer',
            url: 'https://toolforge-ats.vercel.app/about',
            sameAs: [
              'https://github.com/Arnav20007',
              'https://github.com/Arnav20007/ats'
            ]
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolforge-ats.vercel.app/' },
              { '@type': 'ListItem', position: 2, name: 'About ToolForge', item: 'https://toolforge-ats.vercel.app/about' }
            ]
          }
        });
      } else if (currentPage === 'keywords') {
        const isSubrole = currentPath !== '/keywords';
        structuredData.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': isSubrole ? 'ItemPage' : 'CollectionPage',
          '@id': `https://toolforge-ats.vercel.app${currentSeo.path}#webpage`,
          name: currentSeo.title,
          description: currentSeo.desc,
          url: `https://toolforge-ats.vercel.app${currentSeo.path}`,
          isPartOf: { '@id': 'https://toolforge-ats.vercel.app/#website' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: isSubrole ? [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolforge-ats.vercel.app/' },
              { '@type': 'ListItem', position: 2, name: 'Role Keywords', item: 'https://toolforge-ats.vercel.app/keywords' },
              { '@type': 'ListItem', position: 3, name: currentSeo.title, item: `https://toolforge-ats.vercel.app${currentSeo.path}` }
            ] : [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolforge-ats.vercel.app/' },
              { '@type': 'ListItem', position: 2, name: 'Role Keywords Checklist', item: 'https://toolforge-ats.vercel.app/keywords' }
            ]
          }
        });
      } else {
        structuredData.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `https://toolforge-ats.vercel.app${currentSeo.path}#webpage`,
          name: currentSeo.title,
          description: currentSeo.desc,
          url: `https://toolforge-ats.vercel.app${currentSeo.path}`,
          isPartOf: { '@id': 'https://toolforge-ats.vercel.app/#website' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolforge-ats.vercel.app/' },
              { '@type': 'ListItem', position: 2, name: currentSeo.title, item: `https://toolforge-ats.vercel.app${currentSeo.path}` }
            ]
          }
        });
      }
    }
  }, [currentPage, currentPath, currentRoleSlug]);

  const navigateTo = (page: AppPage, subpath?: string) => {
    setCurrentPage(page);
    let path = page === 'home' ? '/' : `/${page}`;
    if (page === 'keywords') {
      path = subpath ? `/keywords/${subpath}` : '/keywords';
      setCurrentRoleSlug(subpath || '');
    }
    if (page === 'builder') {
      setViewMode('studio');
      setStudioTab('document');
    }
    if (page === 'checker' || page === 'home') {
      setViewMode('landing');
    }
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTemplateFromShowcase = (templateId: AtsTemplateId, loadSampleData?: boolean) => {
    setSelectedTemplate(templateId);
    if (loadSampleData) {
      const sample = SAMPLE_RESUMES.software_engineer;
      if (sample) setResume({ ...sample });
    }
    setViewMode('studio');
    setStudioTab('document');
    navigateTo('builder');
  };

  const handleSelectRoleTemplate = (templateKey: string) => {
    const template = SAMPLE_RESUMES[templateKey];
    if (template) {
      setResume({ ...template });
      setViewMode('studio');
      navigateTo('home');
    }
  };

  const handleOpenStudioTab = (tab: 'deep_report' | 'keywords' | 'audit' | 'rewriter') => {
    setViewMode('studio');
    setStudioTab('audit');
    setActiveStudioTab(tab);
    navigateTo('home');
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-100 dark:selection:bg-emerald-950 transition-colors">

      {/* Global Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavigateHome={() => navigateTo('home')}
        onNavigateChecker={() => navigateTo('checker')}
        onNavigateBuilder={() => navigateTo('builder')}
        onNavigateTemplates={() => navigateTo('templates')}
        onNavigateGuide={() => navigateTo('guide')}
        onNavigateKeywords={() => navigateTo('keywords')}
      />

      {/* Dedicated Page Views */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <ResumeStudio
            forcedMode="landing"
            onOpenPrivacy={() => navigateTo('privacy')}
            onOpenTerms={() => navigateTo('terms')}
            onOpenGuide={() => navigateTo('guide')}
            onOpenAbout={() => navigateTo('about')}
            onOpenContact={() => navigateTo('contact')}
            onOpenTemplates={() => navigateTo('templates')}
            onNavigateBuilder={() => navigateTo('builder')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'builder' && (
          <ResumeStudio
            forcedMode="studio"
            onOpenPrivacy={() => navigateTo('privacy')}
            onOpenTerms={() => navigateTo('terms')}
            onOpenGuide={() => navigateTo('guide')}
            onOpenAbout={() => navigateTo('about')}
            onOpenContact={() => navigateTo('contact')}
            onOpenTemplates={() => navigateTo('templates')}
            onNavigateBuilder={() => navigateTo('builder')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'checker' && (
          <ResumeStudio
            onOpenPrivacy={() => navigateTo('privacy')}
            onOpenTerms={() => navigateTo('terms')}
            onOpenGuide={() => navigateTo('guide')}
            onOpenAbout={() => navigateTo('about')}
            onOpenContact={() => navigateTo('contact')}
            onOpenTemplates={() => navigateTo('templates')}
            onNavigateBuilder={() => navigateTo('builder')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'templates' && (
          <TemplatesPage
            onNavigateHome={() => navigateTo('home')}
            onSelectTemplate={handleSelectTemplateFromShowcase}
            onNavigateBuilder={() => navigateTo('builder')}
          />
        )}

        {currentPage === 'keywords' && (
          <KeywordsPage
            onNavigateHome={() => navigateTo('home')}
            onSelectRoleTemplate={handleSelectRoleTemplate}
            initialRoleSlug={currentRoleSlug}
            onSelectRoleSlug={(slug) => navigateTo('keywords', slug)}
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

        {currentPage === 'notFound' && (
          <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-5">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Page not found</h1>
            <p className="text-slate-600 dark:text-zinc-400">That ToolForge page does not exist or may have moved.</p>
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Return to Resume Checker
            </button>
          </section>
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
                  { label: 'ATS Resume Checker', action: () => navigateTo('checker') },
                  { label: 'ATS Resume Builder', action: () => navigateTo('builder') },
                  { label: 'Selected Students ATS Templates', action: () => navigateTo('templates') },
                  { label: 'Job Keyword Matcher', action: () => handleOpenStudioTab('keywords') },
                  { label: 'Role Keywords Checklist', action: () => navigateTo('keywords') },
                  { label: 'Google X-Y-Z Rewriter', action: () => handleOpenStudioTab('rewriter') },
                  { label: 'PDF Audit Scorecard', action: () => handleOpenStudioTab('deep_report') },
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
                Role Keywords & Examples
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Software Engineer Keywords', action: () => navigateTo('keywords', 'software-engineer') },
                  { label: 'Product Manager Keywords', action: () => navigateTo('keywords', 'product-manager') },
                  { label: 'Data Scientist & AI Keywords', action: () => navigateTo('keywords', 'data-scientist') },
                  { label: 'DevOps & Cloud Keywords', action: () => navigateTo('keywords', 'devops-engineer') },
                  { label: 'Full Stack Developer Keywords', action: () => navigateTo('keywords', 'full-stack-developer') },
                  { label: 'ATS Optimization Guide', action: () => navigateTo('guide') },
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
                  { label: 'About ToolForge & Creator', action: () => navigateTo('about') },
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
            <span>© {new Date().getFullYear()} ToolForge · Created open-source by Arnav Singh.</span>
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <button
                onClick={() => navigateTo('keywords')}
                className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Role Keywords
              </button>
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
  );
}

export default function App({ initialPath }: AppProps = {}) {
  return (
    <ToastProvider>
      <ResumeSessionProvider initialPath={initialPath}>
        <AppContent initialPath={initialPath} />
      </ResumeSessionProvider>
    </ToastProvider>
  );
}
