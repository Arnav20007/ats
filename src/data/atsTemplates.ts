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
    name: "Jake's Overleaf-Style Layout",
    badge: "Single-Column",
    tagline: "A familiar LaTeX-inspired single-column layout with monochrome divider rules. Customize the sample content and check the exported PDF before applying.",
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
    name: "Classic Serif Layout",
    badge: "Serif Layout",
    tagline: "A serif resume layout with a centered hierarchy. Customize the sample content and follow the formatting instructions for each application.",
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
    name: "Compact Resume Layout",
    badge: "Compact Layout",
    tagline: "A compact layout for organizing projects and skills. Page count depends on your content and export settings, so review the PDF before applying.",
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
