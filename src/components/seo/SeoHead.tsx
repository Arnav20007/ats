import React, { useEffect } from 'react';
import { EnhancedSeoData } from '../../data/seoData';

interface SeoHeadProps {
  seo: EnhancedSeoData;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ seo }) => {
  useEffect(() => {
    // 1. Update Document Title
    const activeTitle = seo.pageTitle || seo.title;
    document.title = activeTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', seo.metaDescription);
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.metaDescription);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', window.location.origin + seo.canonicalPath);
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.metaDescription);

    // 3. Update Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + seo.canonicalPath);

    // 4. Inject Dedicated Standalone FAQPage Schema (Google Search Rich Snippet Optimized)
    const existingFaq = document.getElementById('toolforge-faq-schema');
    if (existingFaq) existingFaq.remove();

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': seo.faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    const faqScript = document.createElement('script');
    faqScript.id = 'toolforge-faq-schema';
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema, null, 2);
    document.head.appendChild(faqScript);

    // 5. Inject WebApplication & HowTo Schema
    const existingApp = document.getElementById('toolforge-app-schema');
    if (existingApp) existingApp.remove();

    const appSchema = {
      '@context': 'https://schema.org',
      '@type': seo.schemaType,
      'name': seo.h1,
      'applicationCategory': seo.category,
      'operatingSystem': 'All (Modern Web Browser)',
      'browserRequirements': 'Requires JavaScript and HTML5 Canvas / Web Audio API',
      'description': seo.metaDescription,
      'url': window.location.origin + seo.canonicalPath,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock'
      },
      ...(seo.howToSteps && seo.howToSteps.length > 0 ? {
        'step': seo.howToSteps.map((step, idx) => ({
          '@type': 'HowToStep',
          'position': idx + 1,
          'name': step.name,
          'text': step.text
        }))
      } : {})
    };

    const appScript = document.createElement('script');
    appScript.id = 'toolforge-app-schema';
    appScript.type = 'application/ld+json';
    appScript.text = JSON.stringify(appSchema, null, 2);
    document.head.appendChild(appScript);

    // 6. Inject BreadcrumbList Schema
    const existingBreadcrumbs = document.getElementById('toolforge-breadcrumb-schema');
    if (existingBreadcrumbs) existingBreadcrumbs.remove();

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': window.location.origin
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': seo.category,
          'item': window.location.origin + '/#categories'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': seo.h1,
          'item': window.location.origin + seo.canonicalPath
        }
      ]
    };

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'toolforge-breadcrumb-schema';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema, null, 2);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.getElementById('toolforge-faq-schema')?.remove();
      document.getElementById('toolforge-app-schema')?.remove();
      document.getElementById('toolforge-breadcrumb-schema')?.remove();
    };
  }, [seo]);

  return null;
};
