export type ToolId = 'hooks' | 'script' | 'audio' | 'resume' | 'invoice' | 'sitemap' | 'calculator' | 'blueprint';

export interface SitemapUrlEntry {
  id: string;
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  title: string;
  category: string;
  isCustom?: boolean;
}

export interface PageSeoData {
  title: string;
  pageTitle?: string;
  metaDescription: string;
  canonicalPath: string;
  h1: string;
  category: string;
  targetKeywords: string[];
  searchIntent: 'Informational' | 'Transactional' | 'Commercial';
  monthlySearchVolume: string;
  faqs: Array<{ question: string; answer: string }>;
  schemaType: 'WebApplication' | 'HowTo';
}

export interface MonetizationMetrics {
  impressions: number;
  clicks: number;
  estimatedRpm: number;
  earnings: number;
  tipsReceived: number;
  proLicensesSold: number;
}

export interface LaunchStep {
  day: string;
  title: string;
  duration: string;
  description: string;
  checklist: string[];
  trafficHook: string;
}

export interface NicheIdeaRanked {
  rank: number;
  title: string;
  monthlySearches: string;
  competitionScore: string;
  primaryMonetization: string;
  expectedDay30Revenue: string;
  whyItWinsNow: string;
  buildComplexity: '1-3 Hours' | '1 Day' | '2-3 Days';
  primaryKeyword: string;
  keywordDifficulty: string;
}
