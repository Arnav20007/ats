import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targetFile = path.join(root, 'src/data/roleKeywords.ts');
let content = await readFile(targetFile, 'utf8');

const roleEnrichments = {
  'software-engineer': {
    recruiterScreeningChecklist: [
      'Does the resume highlight specific programming languages tied to production projects rather than a standalone unverified list?',
      'Are distributed systems concepts (concurrency, caching, message queues, microservices) backed by measurable throughput (RPS, QPS) or latency numbers?',
      'Is there clear proof of automated testing, CI/CD pipeline ownership, and production incident resolution?'
    ],
    atsFormattingAdvice: 'Software engineering resumes frequently fail ATS scans when candidates use visual multi-column skill bars (e.g. 80% Python) or complex LaTeX table environments. Parsers read these as unparsed metadata or blank lines. Use a single-column layout with clean standard headers like "Technical Skills", "Technical Projects", and "Professional Experience".'
  },
  'product-manager': {
    recruiterScreeningChecklist: [
      'Does the resume show revenue or growth ownership ($ ARR, % trial-to-paid conversion, retention, churn) instead of just feature delivery?',
      'Is there evidence of customer discovery, user research, and data-driven prioritization (Mixpanel, Amplitude, SQL)?',
      'Does the candidate clearly demonstrate cross-functional leadership across engineering, UX design, and executive stakeholders?'
    ],
    atsFormattingAdvice: 'Product managers often make the mistake of presenting roadmap timelines in graphic Gantt charts or multi-column matrix tables. ATS parsers strip all non-standard elements, leaving behind fragmented sentence snippets. Stick to single-column bullet points structured with the Google X-Y-Z formula.'
  },
  'data-scientist': {
    recruiterScreeningChecklist: [
      'Did the candidate deploy models to production (APIs, microservices, batch pipelines) or stop at exploratory Jupyter notebooks?',
      'Are statistical validation metrics (F1 score, AUC-ROC, precision/recall, RMSE) explicitly connected to a business KPI?',
      'Does the stack reflect modern tooling (PyTorch, Hugging Face, MLflow, Docker) alongside strong SQL querying capabilities?'
    ],
    atsFormattingAdvice: 'Data scientists often include mathematical formulas or Greek symbols in LaTeX resumes that export as unreadable Unicode glyphs in standard ATS parsers. Keep technical terminology spelled out in plain text (e.g., "ROC-AUC" instead of mathematical equation symbols).'
  },
  'devops-engineer': {
    recruiterScreeningChecklist: [
      'Is Infrastructure as Code (Terraform, CloudFormation, Ansible) demonstrated with measurable fleet or cluster scale?',
      'Does the resume highlight operational reliability improvements (uptime SLAs, MTTR reduction, automated failovers)?',
      'Is container orchestration (Kubernetes, Helm, Docker) backed by CI/CD pipeline automation and security scanning?'
    ],
    atsFormattingAdvice: 'DevOps resumes often list hundreds of acronyms in comma-separated clouds. ATS filters scan for context: ensure core tools like Kubernetes or Terraform appear naturally inside bullet points detailing the infrastructure scale and cost reductions achieved.'
  },
  'full-stack-developer': {
    recruiterScreeningChecklist: [
      'Does the candidate demonstrate genuine end-to-end depth across both modern frontend frameworks and relational/NoSQL backends?',
      'Are RESTful or GraphQL API contracts, database optimizations, and client-side rendering (SSR/hydration) clearly explained?',
      'Is there measurable evidence of performance tuning (Core Web Vitals, API response latency, bundle size reductions)?'
    ],
    atsFormattingAdvice: 'Full stack resumes easily get rejected if skills are lumped into one giant unstructured list. Group technical competencies into clear sub-categories: Frontend, Backend, Databases, and DevOps to help ATS parsers score keyword density accurately.'
  },
  'frontend-developer': {
    recruiterScreeningChecklist: [
      'Does the resume showcase proficiency with modern component-driven frameworks (React, Next.js, Vue) and state management?',
      'Are web performance metrics (Core Web Vitals, LCP, INP, bundle optimization, tree-shaking) explicitly quantified?',
      'Is responsive design, cross-browser compatibility, and accessibility (WCAG, semantic HTML) clearly represented?'
    ],
    atsFormattingAdvice: 'Frontend developers frequently design visually intricate portfolio resumes using CSS grids, icon graphics, and floating sidebars. ATS software strips styling completely, scrambling the reading order. Maintain a strictly single-column semantic structure.'
  },
  'data-analyst': {
    recruiterScreeningChecklist: [
      'Does the resume demonstrate advanced SQL (window functions, CTEs, complex joins) and BI dashboard adoption (Tableau, Power BI)?',
      'Are analytical findings tied directly to business decision-making and operational cost savings or revenue generation?',
      'Is there evidence of statistical analysis, cohort analysis, and cross-departmental stakeholder reporting?'
    ],
    atsFormattingAdvice: 'Avoid embedding charts, dashboard screenshots, or table borders to display analytics project outcomes. ATS software cannot parse images or graphic visual widgets; write out your methodology and numerical findings as concise text bullets.'
  },
  'cybersecurity-analyst': {
    recruiterScreeningChecklist: [
      'Does the resume highlight hands-on incident response, SIEM monitoring (Splunk, Sentinel), and threat hunting capabilities?',
      'Are industry compliance frameworks (SOC 2, ISO 27001, NIST, HIPAA) and vulnerability assessments (OWASP) detailed?',
      'Are recognized industry certifications (CISSP, CEH, CompTIA Security+) clearly formatted in the education or certifications section?'
    ],
    atsFormattingAdvice: 'Security resumes often feature acronym-heavy certifications. Ensure you write both the acronym and the full name at least once (e.g., "Certified Information Systems Security Professional (CISSP)") so legacy search filters match both queries.'
  },
  'cloud-architect': {
    recruiterScreeningChecklist: [
      'Does the candidate demonstrate enterprise cloud migration, multi-region failover, and high-availability architecture design?',
      'Are cloud governance, IAM zero-trust security policies, and FinOps cloud spend optimizations quantified with concrete dollar figures?',
      'Does the stack reflect major hyperscalers (AWS, Azure, GCP) alongside container ecosystems and infrastructure automation?'
    ],
    atsFormattingAdvice: 'Cloud architecture diagrams and complex multi-tier topology schematics break ATS parsers completely. Replace visual diagrams with structured bullets explaining network topologies, transit gateways, and uptime availability figures.'
  },
  'qa-automation-engineer': {
    recruiterScreeningChecklist: [
      'Did the candidate build and maintain automated test frameworks from scratch (Selenium, Cypress, Playwright) or only execute manual test cases?',
      'Are test coverage improvements (% increase in regression coverage) and release cycle acceleration clearly quantified?',
      'Is there evidence of integrating automated testing into CI/CD pipelines (GitHub Actions, Jenkins) and performance/load testing (JMeter, k6)?'
    ],
    atsFormattingAdvice: 'Do not separate manual testing and automated testing into complex dual-column tables. Outline testing automation frameworks in standard bullet points detailing the number of test suites automated and bug escape rates reduced.'
  },
  'mobile-developer': {
    recruiterScreeningChecklist: [
      'Does the resume clearly indicate native (Swift/iOS, Kotlin/Android) or cross-platform (Flutter, React Native) production mastery?',
      'Are app store metrics (downloads, active users, crash-free session rates, App Store ratings) quantified?',
      'Is there evidence of offline-first architectures, memory profiling, and push notification delivery systems?'
    ],
    atsFormattingAdvice: 'Including clickable App Store or Google Play badges as images confuses ATS parsers. Place live app links as clean markdown URLs or plain-text links in your projects section alongside user rating statistics.'
  },
  'ui-ux-designer': {
    recruiterScreeningChecklist: [
      'Does the resume highlight user research, usability testing methodologies, and design system creation in Figma?',
      'Are design decisions tied to measurable product impact (conversion rate lift, task completion time reduction, drop-off reduction)?',
      'Is there evidence of close collaboration with software engineers to inspect implementation fidelity and design tokens?'
    ],
    atsFormattingAdvice: 'Designers suffer the highest ATS rejection rate because their resumes often resemble Dribbble shots (creative fonts, dual sidebars, graphic skill meters). An ATS cannot read graphic vectors. Use a clean, typography-led single-column document with a prominent link to your portfolio.'
  },
  'engineering-manager': {
    recruiterScreeningChecklist: [
      'Does the resume detail engineering headcount growth, team retention, performance coaching, and promotion tracking?',
      'Are delivery metrics (sprint velocity, on-time project shipping, technical debt reduction) clearly outlined?',
      'Is there a track record of architectural stewardship alongside executive engineering stakeholder management?'
    ],
    atsFormattingAdvice: 'Avoid high-level managerial buzzwords like "spearheaded synergy". ATS filters for EM roles prioritize concrete team sizes, budget oversight figures, and operational velocity indicators (e.g., "Led team of 12 backend engineers").'
  },
  'scrum-master': {
    recruiterScreeningChecklist: [
      'Does the candidate hold recognized certifications (PSM, CSM, SAFe) and facilitate multi-team agile ceremonies?',
      'Are agile maturity metrics (velocity stability, cycle time reduction, dependency resolution) quantified?',
      'Is there demonstrated experience removing cross-functional blockers and mentoring product owners and development teams?'
    ],
    atsFormattingAdvice: 'Do not list Scrum events (daily standup, sprint review, retro) as generic duty bullets. ATS parsers score higher when you describe how your facilitation improved sprint predictability or resolved cross-team blockers.'
  },
  'systems-administrator': {
    recruiterScreeningChecklist: [
      'Does the resume cover Linux/Windows server administration, active directory management, and virtualization (VMware, Hyper-V)?',
      'Are backup/disaster recovery drills, automated patching, and security compliance audits documented?',
      'Is there evidence of bash/PowerShell scripting to automate routine administration and resolve helpdesk escalations?'
    ],
    atsFormattingAdvice: 'Avoid listing hardware specifications or vendor product numbers unless requested in the JD. Focus your bullets on server uptime percentages, fleet sizes managed, and routine task automation.'
  },
  'business-analyst': {
    recruiterScreeningChecklist: [
      'Does the candidate bridge business requirements into actionable functional specifications, user stories, and acceptance criteria?',
      'Are process optimization outcomes (cost reductions, cycle time savings, error reduction) quantified?',
      'Does the stack reflect requirements management tools (Jira, Confluence) alongside data query tools (SQL, Excel, Visio)?'
    ],
    atsFormattingAdvice: 'Flowcharts and BPMN process diagrams cannot be extracted by ATS software. Convert your process improvements into descriptive text explaining the "before vs after" efficiency gains.'
  },
  'financial-analyst': {
    recruiterScreeningChecklist: [
      'Does the resume demonstrate advanced financial modeling (DCF, LBO, 3-statement models), variance analysis, and budgeting?',
      'Are financial recommendations tied to measurable cost reductions, capital allocation, or EBITDA improvements?',
      'Is proficiency in ERP and reporting software (SAP, Oracle, Bloomberg Terminal, advanced Excel) explicitly highlighted?'
    ],
    atsFormattingAdvice: 'Financial analysts frequently format their experience into grid-like financial statement tables. Table cells often cause ATS parsers to read rows out of sequence. Stick to traditional bullet points with bold metrics.'
  },
  'blockchain-developer': {
    recruiterScreeningChecklist: [
      'Does the candidate write secure smart contracts (Solidity, Rust) with verifiable mainnet/testnet deployments?',
      'Are security audits, gas optimization techniques, and reentrancy protections explicitly highlighted?',
      'Is there experience with Web3 development stacks (Ethers.js, Hardhat, Foundry, The Graph, IPFS)?'
    ],
    atsFormattingAdvice: 'Do not paste raw transaction hashes or smart contract bytecode onto your resume. List verified contract links, total value locked (TVL), and audit confirmations in your technical projects section.'
  },
  'marketing-manager': {
    recruiterScreeningChecklist: [
      'Does the resume demonstrate customer acquisition (CAC), lifetime value (LTV), and multi-channel campaign ROI?',
      'Are marketing performance channels (paid search, SEO, social, email automation) quantified with pipeline or revenue contributions?',
      'Is there proven mastery over martech stacks (HubSpot, Google Analytics 4, Meta Ads Manager, Marketo)?'
    ],
    atsFormattingAdvice: 'Marketing resumes often use colorful brand graphics or two-column magazine layouts. Keep your resume single-column so that ATS crawlers capture your revenue impact, ROAS numbers, and campaign metrics without truncation.'
  },
  'ai-engineer': {
    recruiterScreeningChecklist: [
      'Did the candidate architect production LLM systems (RAG, vector search, vLLM inference) beyond simple prompt engineering?',
      'Are latency benchmarks (time-to-first-token, tokens per second, GPU memory footprints) and cost reductions quantified?',
      'Is there evidence of model fine-tuning (LoRA/QLoRA), synthetic evaluation benchmarks, and hallucination guardrails?'
    ],
    atsFormattingAdvice: 'Ensure modern AI terminology (RAG, LoRA, Vector Databases, Embeddings) is clearly written in both acronym and expanded forms. Avoid graphic flowcharts for LLM architectures and present them as structured technical bullets.'
  }
};

// 1. Update RoleKeywordData interface definition
if (!content.includes('recruiterScreeningChecklist: string[];')) {
  content = content.replace(
    'starterTemplateKey: string;',
    'starterTemplateKey: string;\n  recruiterScreeningChecklist: string[];\n  atsFormattingAdvice: string;'
  );
}

// 2. Inject properties into each role profile
for (const [slug, data] of Object.entries(roleEnrichments)) {
  const marker = `'${slug}': {`;
  const idx = content.indexOf(marker);
  if (idx === -1) {
    console.warn(`Could not find profile for ${slug}`);
    continue;
  }
  
  // Find where categories starts in this profile
  const catIdx = content.indexOf('categories: [', idx);
  if (catIdx !== -1 && !content.slice(idx, catIdx).includes('recruiterScreeningChecklist:')) {
    const checklistStr = JSON.stringify(data.recruiterScreeningChecklist, null, 4);
    const adviceStr = JSON.stringify(data.atsFormattingAdvice);
    const injection = `    recruiterScreeningChecklist: ${checklistStr},\n    atsFormattingAdvice: ${adviceStr},\n`;
    content = content.slice(0, catIdx) + injection + content.slice(catIdx);
  }
}

await writeFile(targetFile, content, 'utf8');
console.log('Successfully enriched roleKeywords.ts with distinct recruiter checklists and ATS formatting guidance!');
