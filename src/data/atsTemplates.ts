export interface AtsTemplateConfig {
  id: 'jakes' | 'harvard' | 'modern' | 'compact';
  name: string;
  badge: string;
  tagline: string;
  recommendedFor: string;
  fontFamily: string;
  headingColor: string;
  accentColor: string;
  headerAlign: 'center' | 'left';
  dividerStyle: 'solid' | 'subtle' | 'double' | 'minimal';
  sectionTransform: 'uppercase' | 'none';
  density: 'standard' | 'compact';
}

export const ATS_TEMPLATES: Record<'jakes' | 'harvard' | 'modern' | 'compact', AtsTemplateConfig> = {
  jakes: {
    id: 'jakes',
    name: "Jake's Overleaf (FAANG Standard)",
    badge: "Top Tech Standard",
    tagline: "The #1 LaTeX template used by students selected at Google, Meta, Microsoft & Amazon. 100% clean single-column with monochrome divider rules.",
    recommendedFor: "Software Engineers, CS Students, Full Stack, DevOps",
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    headingColor: "#09090b",
    accentColor: "#18181b",
    headerAlign: "center",
    dividerStyle: "solid",
    sectionTransform: "uppercase",
    density: "standard"
  },
  harvard: {
    id: 'harvard',
    name: "Harvard Classic (Ivy League)",
    badge: "Ivy League & Finance",
    tagline: "Official Ivy League format for Goldman Sachs, McKinsey, Big Tech, and research institutions. Elegant serif typography with centered hierarchy.",
    recommendedFor: "Finance, Management, Consulting, Tech Leadership",
    fontFamily: "'Merriweather', Georgia, serif",
    headingColor: "#111827",
    accentColor: "#1f2937",
    headerAlign: "center",
    dividerStyle: "solid",
    sectionTransform: "uppercase",
    density: "standard"
  },
  modern: {
    id: 'modern',
    name: "Modern Executive",
    badge: "Contemporary",
    tagline: "Sleek emerald accent rules with crisp modern typography. High-impact readability designed for senior tech leaders and product managers.",
    recommendedFor: "Senior Tech, Product Managers, UI/UX, Startups",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    headingColor: "#059669",
    accentColor: "#10b981",
    headerAlign: "left",
    dividerStyle: "subtle",
    sectionTransform: "uppercase",
    density: "standard"
  },
  compact: {
    id: 'compact',
    name: "Deedy Compact (1-Page High-Density)",
    badge: "Guaranteed 1-Page",
    tagline: "High-density single page layout engineered by top engineering students to fit multiple complex projects and skills without page overflow.",
    recommendedFor: "Students with multiple projects, Hackathon winners, Career switchers",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    headingColor: "#1e293b",
    accentColor: "#475569",
    headerAlign: "left",
    dividerStyle: "minimal",
    sectionTransform: "uppercase",
    density: "compact"
  }
};
