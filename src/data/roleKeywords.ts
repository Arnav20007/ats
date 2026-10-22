export interface RoleKeywordData {
  slug: string;
  roleTitle: string;
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  overview: string;
  starterTemplateKey: string;
  recruiterScreeningChecklist: string[];
  atsFormattingAdvice: string;
  categories: {
    categoryName: string;
    description: string;
    keywords: string[];
  }[];
  googleXyzExamples: {
    title: string;
    formula: string;
    explanation: string;
  }[];
  commonMistakes: string[];
}

export const ROLE_KEYWORD_PROFILES: Record<string, RoleKeywordData> = {
  'software-engineer': {
    slug: 'software-engineer',
    roleTitle: 'Software Engineer & Backend Developer',
    shortTitle: 'Software Engineer',
    seoTitle: 'Top ATS Keywords for Software Engineers – Resume Checker & Checklist',
    metaDescription: 'Essential ATS resume keywords, technical skills, and Google X-Y-Z achievement formulas for Software Engineers and Backend Developers. 100% free checklist.',
    overview: 'Applicant Tracking Systems at tech companies look for specific programming languages, distributed systems concepts, cloud infrastructure, and verifiable metrics rather than generic responsibilities.',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Does the resume highlight specific programming languages tied to production projects rather than a standalone unverified list?",
    "Are distributed systems concepts (concurrency, caching, message queues, microservices) backed by measurable throughput (RPS, QPS) or latency numbers?",
    "Is there clear proof of automated testing, CI/CD pipeline ownership, and production incident resolution?"
],
    atsFormattingAdvice: "Software engineering resumes frequently fail ATS scans when candidates use visual multi-column skill bars (e.g. 80% Python) or complex LaTeX table environments. Parsers read these as unparsed metadata or blank lines. Use a single-column layout with clean standard headers like \"Technical Skills\", \"Technical Projects\", and \"Professional Experience\".",
categories: [
      {
        categoryName: 'Core Languages & Runtimes',
        description: 'Primary programming languages and execution environments tested by technical screeners.',
        keywords: ['Go', 'TypeScript', 'Python', 'Java', 'C++', 'Rust', 'Node.js', 'SQL']
      },
      {
        categoryName: 'Architecture & Distributed Systems',
        description: 'Systems design terminology that signals senior engineering maturity.',
        keywords: ['Distributed Systems', 'Microservices', 'System Architecture', 'REST APIs', 'GraphQL', 'WebSockets', 'Performance Optimization']
      },
      {
        categoryName: 'Databases & Streaming Pipelines',
        description: 'Data storage, caching layers, and high-throughput messaging brokers.',
        keywords: ['PostgreSQL', 'Redis', 'Kafka', 'MySQL', 'MongoDB', 'Vector Databases']
      },
      {
        categoryName: 'Cloud, Containers & DevOps',
        description: 'Deployment targets and automation pipelines.',
        keywords: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'CI/CD Pipelines', 'Linux', 'Git']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Event Streaming & Throughput',
        formula: 'Architected distributed event pipeline in Go and Apache Kafka, processing 65M+ daily transaction records at 99.99% availability with zero SLA breaches across 18 months.',
        explanation: 'Accomplished [event pipeline], measured by [65M+ daily records at 99.99% availability], by doing [architected in Go & Kafka].'
      },
      {
        title: 'Latency & Database Optimization',
        formula: 'Redesigned PostgreSQL query paths and deployed Redis caching layer, cutting P99 database latency from 840ms to 42ms and reducing monthly cloud compute spend by $18,000.',
        explanation: 'Shows clear business ROI alongside technical execution and concrete millisecond benchmarks.'
      },
      {
        title: 'Deployment Velocity & CI/CD',
        formula: 'Streamlined continuous delivery workflows using GitHub Actions and Helm on Kubernetes, elevating team deployment frequency from bi-weekly to 4x daily.',
        explanation: 'Demonstrates impact on team velocity and modern DevOps tooling adoption.'
      }
    ],
    commonMistakes: [
      'Listing technologies without showing where and how they were used in project bullets.',
      'Using passive phrasing like "responsible for coding features" instead of action verbs like "Architected" or "Engineered".',
      'Leaving out scale numbers (requests per second, active users, data volumes, latency reductions).'
    ]
  },

  'product-manager': {
    slug: 'product-manager',
    roleTitle: 'Product Manager & Technical PM',
    shortTitle: 'Product Manager',
    seoTitle: 'Essential ATS Keywords for Product Managers (2026 Guide)',
    metaDescription: 'Must-have ATS keywords, strategic metrics, and Google X-Y-Z resume bullet formulas for Product Managers and Technical PMs. Free checklist.',
    overview: 'Product Manager ATS filters heavily prioritize business impact metrics (ARR, conversion rate, retention), product-led growth (PLG) terminology, cross-functional leadership, and agile roadmapping.',
    starterTemplateKey: 'product_manager',
        recruiterScreeningChecklist: [
    "Does the resume show revenue or growth ownership ($ ARR, % trial-to-paid conversion, retention, churn) instead of just feature delivery?",
    "Is there evidence of customer discovery, user research, and data-driven prioritization (Mixpanel, Amplitude, SQL)?",
    "Does the candidate clearly demonstrate cross-functional leadership across engineering, UX design, and executive stakeholders?"
],
    atsFormattingAdvice: "Product managers often make the mistake of presenting roadmap timelines in graphic Gantt charts or multi-column matrix tables. ATS parsers strip all non-standard elements, leaving behind fragmented sentence snippets. Stick to single-column bullet points structured with the Google X-Y-Z formula.",
categories: [
      {
        categoryName: 'Product Strategy & Growth',
        description: 'High-level business and go-to-market competencies.',
        keywords: ['Product Strategy', 'Product-Led Growth (PLG)', 'Go-To-Market (GTM)', 'Conversion Rate Optimization', 'Customer Discovery', 'User Retention', 'A/B Testing']
      },
      {
        categoryName: 'Methodologies & Execution',
        description: 'Day-to-day agile frameworks and sprint delivery.',
        keywords: ['Agile', 'Scrum', 'Roadmap Prioritization', 'Sprint Planning', 'PRD Authoring', 'OKRs', 'Feature Scoping']
      },
      {
        categoryName: 'Analytics & Product Metrics',
        description: 'Quantitative measurement and telemetry tools.',
        keywords: ['SQL', 'Data Analytics', 'Cohort Analysis', 'Churn Reduction', 'KPI Tracking', 'Funnel Analysis', 'User Research']
      },
      {
        categoryName: 'Technical & Business Alignment',
        description: 'Bridge between software engineering and executive stakeholders.',
        keywords: ['REST APIs', 'System Architecture', 'Cross-Functional Leadership', 'Stakeholder Management', 'P&L Management', 'EBITDA']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Self-Serve Funnel & ARR Expansion',
        formula: 'Spearheaded self-serve onboarding redesign, increasing trial-to-paid conversion by 28% and generating $1.4M in incremental annual recurring revenue (ARR) in Q3.',
        explanation: 'Links product UX experimentation directly to top-line company revenue growth.'
      },
      {
        title: 'User Activation & Onboarding Friction',
        formula: 'Identified drop-off bottleneck via Mixpanel cohort analysis; overhauled registration flow, reducing time-to-first-value from 14 minutes to under 3 minutes.',
        explanation: 'Demonstrates data-driven problem discovery followed by measurable usability improvement.'
      },
      {
        title: 'Roadmap Execution Across Teams',
        formula: 'Directed 2-quarter product roadmap across 14 engineers and 3 designers, delivering enterprise SSO and audit logs 2 weeks ahead of schedule for 45 enterprise clients.',
        explanation: 'Highlights scale of leadership, cross-functional alignment, and reliable execution.'
      }
    ],
    commonMistakes: [
      'Focusing exclusively on process ("ran daily standups") rather than measurable product outcomes.',
      'Omitting financial or growth metrics ($ ARR, % conversion, user retention, DAU/MAU).',
      'Failing to mention collaboration with engineering, design, and executive leadership.'
    ]
  },

  'data-scientist': {
    slug: 'data-scientist',
    roleTitle: 'Data Scientist & Machine Learning Engineer',
    shortTitle: 'Data Scientist',
    seoTitle: 'Top ATS Keywords for Data Scientists & ML Engineers (2026)',
    metaDescription: 'Target ATS keywords, machine learning frameworks, data pipeline tools, and Google X-Y-Z formulas for Data Scientists and AI Engineers.',
    overview: 'Data science and AI resumes must showcase statistical foundations, production model deployment, data pipeline engineering, and tangible business or operational outcomes.',
    starterTemplateKey: 'ai_ml_engineer',
        recruiterScreeningChecklist: [
    "Did the candidate deploy models to production (APIs, microservices, batch pipelines) or stop at exploratory Jupyter notebooks?",
    "Are statistical validation metrics (F1 score, AUC-ROC, precision/recall, RMSE) explicitly connected to a business KPI?",
    "Does the stack reflect modern tooling (PyTorch, Hugging Face, MLflow, Docker) alongside strong SQL querying capabilities?"
],
    atsFormattingAdvice: "Data scientists often include mathematical formulas or Greek symbols in LaTeX resumes that export as unreadable Unicode glyphs in standard ATS parsers. Keep technical terminology spelled out in plain text (e.g., \"ROC-AUC\" instead of mathematical equation symbols).",
categories: [
      {
        categoryName: 'Languages & Core Math',
        description: 'Foundational programming and numerical computing.',
        keywords: ['Python', 'SQL', 'R', 'C++', 'Linear Algebra', 'Statistical Modeling', 'Hypothesis Testing']
      },
      {
        categoryName: 'Machine Learning & Deep Learning',
        description: 'Modern modeling frameworks and generative architectures.',
        keywords: ['PyTorch', 'TensorFlow', 'LLMs', 'RAG', 'Vector Databases', 'Scikit-Learn', 'Natural Language Processing (NLP)', 'Computer Vision']
      },
      {
        categoryName: 'Data Pipelines & Distributed Compute',
        description: 'ETL, batch processing, and big data orchestration.',
        keywords: ['PostgreSQL', 'Kafka', 'Spark', 'Airflow', 'Redis', 'Docker', 'AWS', 'Google Cloud']
      },
      {
        categoryName: 'MLOps & Production Serving',
        description: 'Packaging, monitoring, and scaling models in production.',
        keywords: ['Model Serving', 'Inference Optimization', 'Latency Reduction', 'MLflow', 'Feature Stores', 'A/B Testing']
      }
    ],
    googleXyzExamples: [
      {
        title: 'RAG Pipeline & Retrieval Accuracy',
        formula: 'Engineered hybrid retrieval-augmented generation (RAG) pipeline with Pinecone and PyTorch, improving factual question-answering accuracy from 71% to 94% across 50,000 queries.',
        explanation: 'Quantifies accuracy jump on a real production workload using contemporary AI architectures.'
      },
      {
        title: 'Churn Prediction & Revenue Protection',
        formula: 'Trained and deployed XGBoost customer churn prediction model on AWS SageMaker, identifying at-risk accounts 60 days in advance and preventing $320,000 in monthly churn.',
        explanation: 'Ties model predictions directly to concrete dollars preserved.'
      },
      {
        title: 'Model Quantization & Inference Latency',
        formula: 'Quantized transformer models using TensorRT and ONNX runtime, slashing P95 inference latency by 58% while saving $8,500/month in GPU cloud instances.',
        explanation: 'Demonstrates deep MLOps understanding with measurable compute cost savings.'
      }
    ],
    commonMistakes: [
      'Listing only academic algorithms without mentioning deployment or production infrastructure.',
      'Failing to mention data scale (number of training samples, daily inference queries, dataset size).',
      'Ignoring data cleaning and ETL pipeline engineering, which forms 70% of real-world work.'
    ]
  },

  'devops-engineer': {
    slug: 'devops-engineer',
    roleTitle: 'DevOps & Cloud Infrastructure Engineer',
    shortTitle: 'DevOps Engineer',
    seoTitle: 'Essential ATS Keywords for DevOps & Cloud Engineers (2026)',
    metaDescription: 'Complete ATS keyword checklist, cloud infrastructure tools, SRE terminology, and Google X-Y-Z resume bullet examples for DevOps Engineers.',
    overview: 'DevOps and Site Reliability Engineering resumes must highlight infrastructure as code, uptime reliability, deployment frequency, automated testing, and cloud cost governance.',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Is Infrastructure as Code (Terraform, CloudFormation, Ansible) demonstrated with measurable fleet or cluster scale?",
    "Does the resume highlight operational reliability improvements (uptime SLAs, MTTR reduction, automated failovers)?",
    "Is container orchestration (Kubernetes, Helm, Docker) backed by CI/CD pipeline automation and security scanning?"
],
    atsFormattingAdvice: "DevOps resumes often list hundreds of acronyms in comma-separated clouds. ATS filters scan for context: ensure core tools like Kubernetes or Terraform appear naturally inside bullet points detailing the infrastructure scale and cost reductions achieved.",
categories: [
      {
        categoryName: 'Cloud Platforms',
        description: 'Hyperscale cloud providers and managed services.',
        keywords: ['AWS', 'Google Cloud', 'Azure', 'S3', 'ECS', 'RDS', 'Lambda', 'EC2']
      },
      {
        categoryName: 'Containerization & Orchestration',
        description: 'Container runtimes and cluster scheduling engines.',
        keywords: ['Docker', 'Kubernetes', 'Helm', 'Container Security', 'Service Mesh', 'Microservices']
      },
      {
        categoryName: 'Infrastructure as Code (IaC) & CI/CD',
        description: 'Declarative automation and continuous delivery.',
        keywords: ['Terraform', 'CI/CD Pipelines', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'Ansible', 'Git']
      },
      {
        categoryName: 'Observability, Security & SRE',
        description: 'Monitoring, incident response, and compliance.',
        keywords: ['Linux', 'Security', 'Prometheus', 'Datadog', 'Performance Optimization', 'Disaster Recovery', 'High Availability (HA)']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Infrastructure as Code & Cloud Migration',
        formula: 'Architected automated Terraform IaC modules across 3 multi-region AWS environments, decreasing new environment spin-up time from 3 weeks to 18 minutes.',
        explanation: 'Clear time reduction benchmark demonstrating standard declarative automation.'
      },
      {
        title: 'Kubernetes Migration & Infrastructure Costs',
        formula: 'Migrated 42 legacy VMs to self-healing Kubernetes clusters with Horizontal Pod Autoscaling (HPA), elevating cluster utilization and trimming $24,000 in monthly AWS billings.',
        explanation: 'Shows architectural modernisation paired with quantifiable recurring cloud savings.'
      },
      {
        title: 'Zero-Downtime Deployment & Incident Reduction',
        formula: 'Configured automated canary deployments and Datadog synthetic monitors, reducing mean time to recovery (MTTR) by 73% and maintaining 99.995% service uptime.',
        explanation: 'Validates core SRE discipline and SLA reliability.'
      }
    ],
    commonMistakes: [
      'Listing tools as buzzwords without stating cluster sizes, server counts, or deployment velocity.',
      'Omitting security and compliance practices (IAM least privilege, container scanning).',
      'Failing to mention incident metrics (MTTR, uptime percentage, SLA adherence).'
    ]
  },

  'full-stack-developer': {
    slug: 'full-stack-developer',
    roleTitle: 'Full Stack Web Developer',
    shortTitle: 'Full Stack Dev',
    seoTitle: 'Top ATS Keywords for Full Stack Developers (2026 Checklist)',
    metaDescription: 'Must-have ATS keywords, frontend and backend tech stacks, database skills, and metric-backed resume bullets for Full Stack Web Developers.',
    overview: 'Full Stack resumes must prove end-to-end competency: responsive modern user interfaces, performant APIs, normalized database designs, and seamless cloud deployments.',
    starterTemplateKey: 'arnav_singh',
        recruiterScreeningChecklist: [
    "Does the candidate demonstrate genuine end-to-end depth across both modern frontend frameworks and relational/NoSQL backends?",
    "Are RESTful or GraphQL API contracts, database optimizations, and client-side rendering (SSR/hydration) clearly explained?",
    "Is there measurable evidence of performance tuning (Core Web Vitals, API response latency, bundle size reductions)?"
],
    atsFormattingAdvice: "Full stack resumes easily get rejected if skills are lumped into one giant unstructured list. Group technical competencies into clear sub-categories: Frontend, Backend, Databases, and DevOps to help ATS parsers score keyword density accurately.",
categories: [
      {
        categoryName: 'Frontend Technologies',
        description: 'Client-side frameworks, styling, and web standards.',
        keywords: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vue', 'HTML5', 'CSS3']
      },
      {
        categoryName: 'Backend & APIs',
        description: 'Server runtimes, protocols, and microservice design.',
        keywords: ['Node.js', 'Python', 'Go', 'REST APIs', 'GraphQL', 'WebSockets', 'Express', 'FastAPI']
      },
      {
        categoryName: 'Databases & State Management',
        description: 'Relational, document, and in-memory caches.',
        keywords: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma', 'SQL', 'State Management']
      },
      {
        categoryName: 'DevOps, Testing & Tooling',
        description: 'Version control, automated testing, and CI/CD.',
        keywords: ['Git', 'Docker', 'CI/CD Pipelines', 'Unit Testing', 'AWS', 'Linux', 'Vite']
      }
    ],
    googleXyzExamples: [
      {
        title: 'End-to-End SaaS Feature Delivery',
        formula: 'Architected full-stack billing and analytics portal using React 19, TypeScript, and Node.js with PostgreSQL, onboarding 4,200 active subscribers in the first 90 days.',
        explanation: 'Demonstrates complete ownership from database schema to responsive frontend UI.'
      },
      {
        title: 'Frontend Web Performance & Core Web Vitals',
        formula: 'Refactored legacy client bundle into lazy-loaded dynamic chunks with Tailwind CSS, improving Google Lighthouse performance score from 48 to 98 and reducing bounce rate by 22%.',
        explanation: 'Demonstrates tangible web vitals impact with clear conversion retention gains.'
      },
      {
        title: 'Real-Time Communication & APIs',
        formula: 'Designed WebSocket streaming gateway in Go and Redis Pub/Sub, supporting 15,000 concurrent active users with sub-50ms message delivery latency.',
        explanation: 'Validates high-concurrency real-time systems capability.'
      }
    ],
    commonMistakes: [
      'Presenting as a "jack of all trades" without highlighting core specialization depth.',
      'Neglecting testing methodologies (Jest, Vitest, integration tests) and CI pipelines.',
      'Failing to link full-stack projects to live GitHub repositories or deployed demonstrations.'
    ]
  },

  'frontend-developer': {
    slug: 'frontend-developer',
    roleTitle: 'Frontend Engineer & UI Developer',
    shortTitle: 'Frontend Dev',
    seoTitle: 'Top ATS Keywords for Frontend Developers (2026 Skills Checklist)',
    metaDescription: 'Target ATS keywords, modern JavaScript/TypeScript frameworks, web performance metrics, and Google X-Y-Z resume formulas for Frontend Engineers.',
    overview: 'Frontend ATS parsers prioritize modern component frameworks (React, Next.js, Vue), state management, accessibility (a11y), responsive design, and measurable Core Web Vitals optimizations.',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Does the resume showcase proficiency with modern component-driven frameworks (React, Next.js, Vue) and state management?",
    "Are web performance metrics (Core Web Vitals, LCP, INP, bundle optimization, tree-shaking) explicitly quantified?",
    "Is responsive design, cross-browser compatibility, and accessibility (WCAG, semantic HTML) clearly represented?"
],
    atsFormattingAdvice: "Frontend developers frequently design visually intricate portfolio resumes using CSS grids, icon graphics, and floating sidebars. ATS software strips styling completely, scrambling the reading order. Maintain a strictly single-column semantic structure.",
categories: [
      {
        categoryName: 'Frameworks & Core Languages',
        description: 'Core web technologies and modern client-side runtimes.',
        keywords: ['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Vue.js', 'Svelte']
      },
      {
        categoryName: 'Styling & Design Systems',
        description: 'Modern styling systems and cross-browser UI implementations.',
        keywords: ['Tailwind CSS', 'CSS Modules', 'Design Systems', 'Figma', 'Responsive Design', 'Sass/SCSS', 'Styled Components']
      },
      {
        categoryName: 'Web Performance & Web Vitals',
        description: 'Speed, bundle optimization, and user experience metrics.',
        keywords: ['Core Web Vitals', 'Lighthouse Score', 'Code Splitting', 'Lazy Loading', 'Tree Shaking', 'Bundle Size Optimization', 'SSR / SSG']
      },
      {
        categoryName: 'State, Testing & Tooling',
        description: 'Client state management, automated testing, and bundling.',
        keywords: ['Redux Toolkit', 'Zustand', 'React Query', 'Vitest', 'Jest', 'Playwright', 'Webpack', 'Vite', 'Git']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Core Web Vitals & Lighthouse Optimization',
        formula: 'Refactored enterprise dashboard to Next.js App Router with dynamic code-splitting, slashing Largest Contentful Paint (LCP) from 3.8s to 1.1s and boosting conversion rate by 19%.',
        explanation: 'Directly ties technical web vitals improvements to top-line user conversion gains.'
      },
      {
        title: 'Design System & Component Reusability',
        formula: 'Architected company-wide accessible design system in TypeScript and Tailwind CSS, reducing average feature UI development turnaround from 8 days to 2 days across 6 product teams.',
        explanation: 'Demonstrates cross-team developer velocity improvement and standardized engineering rigor.'
      },
      {
        title: 'State Architecture & Client Memory',
        formula: 'Re-architected client-side cache and server sync with TanStack Query and Zustand, eliminating 45% of redundant API calls and cutting client memory consumption by 35MB.',
        explanation: 'Quantifies reduced network overhead and client-side efficiency gains.'
      }
    ],
    commonMistakes: [
      'Listing UI libraries without mentioning responsive design, cross-browser support, or WCAG accessibility.',
      'Omitting load-time and runtime performance metrics (LCP, INP, bundle sizes, frame rates).',
      'Leaving out automated component and end-to-end testing (Jest, Playwright, Cypress).'
    ]
  },

  'data-analyst': {
    slug: 'data-analyst',
    roleTitle: 'Data Analyst & Business Intelligence Specialist',
    shortTitle: 'Data Analyst',
    seoTitle: 'Essential ATS Keywords for Data Analysts (2026 Checklist & Guide)',
    metaDescription: 'Must-have ATS keywords, SQL querying techniques, BI dashboarding tools, and Google X-Y-Z formulas for Data Analysts and BI Engineers.',
    overview: 'Data Analyst ATS filters look for advanced SQL capabilities, business intelligence platforms (Power BI, Tableau), statistical analysis, and clear executive decision support.',
    starterTemplateKey: 'ai_ml_engineer',
        recruiterScreeningChecklist: [
    "Does the resume demonstrate advanced SQL (window functions, CTEs, complex joins) and BI dashboard adoption (Tableau, Power BI)?",
    "Are analytical findings tied directly to business decision-making and operational cost savings or revenue generation?",
    "Is there evidence of statistical analysis, cohort analysis, and cross-departmental stakeholder reporting?"
],
    atsFormattingAdvice: "Avoid embedding charts, dashboard screenshots, or table borders to display analytics project outcomes. ATS software cannot parse images or graphic visual widgets; write out your methodology and numerical findings as concise text bullets.",
categories: [
      {
        categoryName: 'Querying & Data Manipulation',
        description: 'Languages used for extracting, joining, and transforming data.',
        keywords: ['SQL', 'PostgreSQL', 'Python', 'Pandas', 'R', 'DuckDB', 'Data Cleaning', 'Data Normalization']
      },
      {
        categoryName: 'Business Intelligence & Dashboards',
        description: 'Visualization and reporting suites for stakeholders.',
        keywords: ['Tableau', 'Power BI', 'Looker', 'Metabase', 'Dashboard Design', 'Executive Reporting', 'KPI Tracking']
      },
      {
        categoryName: 'Data Warehousing & Modeling',
        description: 'Modern data stack and cloud analytical storage.',
        keywords: ['Snowflake', 'BigQuery', 'dbt', 'Amazon Redshift', 'Star Schema', 'ETL Pipelines', 'Data Modeling']
      },
      {
        categoryName: 'Statistical & Business Analysis',
        description: 'Hypothesis testing, business metrics, and commercial insights.',
        keywords: ['A/B Testing', 'Cohort Analysis', 'Customer Lifetime Value (LTV)', 'Churn Analysis', 'Statistical Modeling', 'Predictive Analytics']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Revenue Analytics & Churn Discovery',
        formula: 'Designed automated customer cohort retention model in SQL and Tableau, uncovering a 14% onboarding drop-off and steering product fixes that recovered $280,000 in ARR.',
        explanation: 'Connects data analysis directly to discovered bottlenecks and dollar revenue recovery.'
      },
      {
        title: 'Warehouse Modeling & Query Optimization',
        formula: 'Rebuilt core reporting dbt models on Snowflake, cutting daily ETL runtime from 4.5 hours to 35 minutes and reducing monthly cloud compute credits by $4,200.',
        explanation: 'Highlights pipeline optimization paired with recurring cloud infrastructure savings.'
      },
      {
        title: 'Executive KPI Dashboard Automation',
        formula: 'Developed unified executive KPI dashboard in Power BI tracking 18 business metrics, eliminating 12 hours of weekly manual reporting across 5 department heads.',
        explanation: 'Demonstrates tangible time-saving automation and cross-departmental utility.'
      }
    ],
    commonMistakes: [
      'Listing basic tools like Excel without demonstrating advanced SQL, Python, or automated data modeling.',
      'Failing to link insights to business outcomes (e.g. revenue, cost savings, hours saved).',
      'Describing reports produced instead of business decisions influenced by the data.'
    ]
  },

  'cybersecurity-analyst': {
    slug: 'cybersecurity-analyst',
    roleTitle: 'Cybersecurity Analyst & InfoSec Engineer',
    shortTitle: 'Cybersecurity',
    seoTitle: 'Top ATS Keywords for Cybersecurity Analysts (2026 Checklist)',
    metaDescription: 'Essential ATS keywords, SIEM tools, vulnerability assessment, compliance frameworks, and Google X-Y-Z formulas for Cybersecurity Analysts.',
    overview: 'Security resumes need to highlight threat hunting, incident response, SIEM telemetry, vulnerability management, zero trust architecture, and compliance standards (SOC 2, ISO 27001).',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Does the resume highlight hands-on incident response, SIEM monitoring (Splunk, Sentinel), and threat hunting capabilities?",
    "Are industry compliance frameworks (SOC 2, ISO 27001, NIST, HIPAA) and vulnerability assessments (OWASP) detailed?",
    "Are recognized industry certifications (CISSP, CEH, CompTIA Security+) clearly formatted in the education or certifications section?"
],
    atsFormattingAdvice: "Security resumes often feature acronym-heavy certifications. Ensure you write both the acronym and the full name at least once (e.g., \"Certified Information Systems Security Professional (CISSP)\") so legacy search filters match both queries.",
categories: [
      {
        categoryName: 'Threat Detection & SIEM',
        description: 'Monitoring, log correlation, and real-time incident alerting.',
        keywords: ['SIEM', 'Splunk', 'CrowdStrike', 'EDR', 'Threat Hunting', 'Log Analysis', 'Incident Response', 'SOC Operations']
      },
      {
        categoryName: 'Vulnerability Assessment & Pen Testing',
        description: 'Active auditing, penetration testing, and patch management.',
        keywords: ['Vulnerability Assessment', 'Nessus', 'Wireshark', 'Burp Suite', 'Metasploit', 'Penetration Testing', 'CVE Remediation']
      },
      {
        categoryName: 'Cloud & Network Security',
        description: 'Defensive architecture across cloud and hybrid infrastructure.',
        keywords: ['Zero Trust', 'Firewalls', 'AWS IAM', 'Network Segmentation', 'VPN', 'TLS/SSL', 'Endpoint Security']
      },
      {
        categoryName: 'Compliance & Governance',
        description: 'Regulatory compliance and security governance frameworks.',
        keywords: ['SOC 2', 'ISO 27001', 'NIST Framework', 'GDPR', 'HIPAA', 'Risk Assessment', 'Security Auditing']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Incident Detection & Mean Time to Respond (MTTR)',
        formula: 'Configured automated Splunk SIEM correlation rules and CrowdStrike Falcon playbooks, reducing Mean Time to Detect (MTTD) by 64% and MTTR from 3 hours to 18 minutes.',
        explanation: 'Quantifies operational security readiness and response time improvement.'
      },
      {
        title: 'Vulnerability Remediation & CVE Elimination',
        formula: 'Audited 240+ production cloud instances using Nessus and AWS Inspector, remediating 48 critical CVE vulnerabilities and raising audit compliance from 78% to 99.4%.',
        explanation: 'Provides concrete cluster scale, vulnerability counts, and compliance benchmarks.'
      },
      {
        title: 'SOC 2 Type II Certification Leadership',
        formula: 'Spearheaded technical controls implementation across AWS IAM, encryption at rest, and audit logs, securing SOC 2 Type II certification with zero audit exceptions.',
        explanation: 'Validates enterprise compliance leadership and institutional trust.'
      }
    ],
    commonMistakes: [
      'Listing security certifications (CISSP, CEH, CompTIA) without showing hands-on triage experience.',
      'Omitting response metrics like Mean Time to Detect (MTTD) or Mean Time to Remediate (MTTR).',
      'Failing to mention specific SIEM, EDR, and vulnerability assessment tools used.'
    ]
  },

  'cloud-architect': {
    slug: 'cloud-architect',
    roleTitle: 'Cloud Solutions Architect',
    shortTitle: 'Cloud Architect',
    seoTitle: 'Essential ATS Keywords for Cloud Solutions Architects (2026)',
    metaDescription: 'Target ATS keywords, cloud infrastructure design, multi-region high availability, cost FinOps, and Google X-Y-Z formulas for Cloud Architects.',
    overview: 'Cloud Architect ATS filters seek multi-cloud expertise (AWS, Azure, GCP), high-availability system architecture, infrastructure as code (Terraform), and cloud financial management (FinOps).',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Does the candidate demonstrate enterprise cloud migration, multi-region failover, and high-availability architecture design?",
    "Are cloud governance, IAM zero-trust security policies, and FinOps cloud spend optimizations quantified with concrete dollar figures?",
    "Does the stack reflect major hyperscalers (AWS, Azure, GCP) alongside container ecosystems and infrastructure automation?"
],
    atsFormattingAdvice: "Cloud architecture diagrams and complex multi-tier topology schematics break ATS parsers completely. Replace visual diagrams with structured bullets explaining network topologies, transit gateways, and uptime availability figures.",
categories: [
      {
        categoryName: 'Cloud Infrastructure & Compute',
        description: 'Hyperscale platforms and managed compute services.',
        keywords: ['AWS', 'Google Cloud', 'Azure', 'EC2', 'Lambda', 'ECS', 'EKS', 'CloudFormation']
      },
      {
        categoryName: 'Architecture, HA & Resiliency',
        description: 'Scalable multi-region topology and fault-tolerant architectures.',
        keywords: ['High Availability (HA)', 'Disaster Recovery (DR)', 'Multi-Region Architecture', 'Load Balancing', 'Microservices', 'Zero-Downtime Migration']
      },
      {
        categoryName: 'Infrastructure as Code (IaC) & DevOps',
        description: 'Declarative automation and configuration orchestration.',
        keywords: ['Terraform', 'Kubernetes', 'Docker', 'CI/CD Pipelines', 'Helm', 'GitOps', 'Ansible']
      },
      {
        categoryName: 'Cloud Security & FinOps',
        description: 'Cost governance, IAM access controls, and compliance.',
        keywords: ['FinOps', 'AWS Cost Explorer', 'Cloud Cost Optimization', 'AWS IAM', 'KMS Encryption', 'VPC Peering', 'Compliance']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Multi-Region Migration & Cloud Cost Reduction',
        formula: 'Designed multi-region active-passive AWS architecture across us-east-1 and eu-west-1, ensuring 99.99% uptime while slashing monthly cloud compute spend by $34,000.',
        explanation: 'Highlights both high availability SLA achievement and significant recurring dollar savings.'
      },
      {
        title: 'Infrastructure as Code & Automated Provisioning',
        formula: 'Architected modular Terraform repository standardizing 60+ microservice environments, dropping environment provisioning lead time from 14 days to 25 minutes.',
        explanation: 'Demonstrates declarative automation and organizational developer velocity.'
      },
      {
        title: 'Zero-Downtime Database & Storage Re-platforming',
        formula: 'Executed zero-downtime migration of 18TB data cluster to Amazon Aurora PostgreSQL, maintaining sub-10ms query latency throughout peak traffic seasons.',
        explanation: 'Proves technical competency with large-scale data migrations under live traffic.'
      }
    ],
    commonMistakes: [
      'Listing certifications (AWS Solution Architect Professional) without real architectural blueprints.',
      'Omitting concrete dollar amounts saved through FinOps and cloud cost governance.',
      'Failing to detail disaster recovery (RPO and RTO) benchmarks.'
    ]
  },

  'qa-automation-engineer': {
    slug: 'qa-automation-engineer',
    roleTitle: 'QA Automation Engineer & SDET',
    shortTitle: 'QA / SDET',
    seoTitle: 'Top ATS Keywords for QA Automation Engineers & SDETs (2026)',
    metaDescription: 'Target ATS keywords, automated test frameworks, CI/CD pipeline integration, API testing, and Google X-Y-Z formulas for QA Engineers and SDETs.',
    overview: 'QA and SDET resumes must demonstrate automated test suite development (Playwright, Selenium, Cypress), API testing, load testing, CI/CD test gates, and bug escape reduction.',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Did the candidate build and maintain automated test frameworks from scratch (Selenium, Cypress, Playwright) or only execute manual test cases?",
    "Are test coverage improvements (% increase in regression coverage) and release cycle acceleration clearly quantified?",
    "Is there evidence of integrating automated testing into CI/CD pipelines (GitHub Actions, Jenkins) and performance/load testing (JMeter, k6)?"
],
    atsFormattingAdvice: "Do not separate manual testing and automated testing into complex dual-column tables. Outline testing automation frameworks in standard bullet points detailing the number of test suites automated and bug escape rates reduced.",
categories: [
      {
        categoryName: 'Test Automation Frameworks',
        description: 'End-to-end and integration automation runtimes.',
        keywords: ['Playwright', 'Selenium', 'Cypress', 'Appium', 'TestNG', 'JUnit', 'PyTest', 'Cucumber']
      },
      {
        categoryName: 'API & Performance Testing',
        description: 'Backend contract verification, load testing, and mocking.',
        keywords: ['REST APIs', 'Postman', 'JMeter', 'k6', 'Gatling', 'API Automation', 'Mocking']
      },
      {
        categoryName: 'Languages & Execution Runtimes',
        description: 'Languages used to write robust test scripts.',
        keywords: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'Bash', 'Git']
      },
      {
        categoryName: 'CI/CD & Quality Metrics',
        description: 'Automated test runners and bug prevention pipelines.',
        keywords: ['CI/CD Pipelines', 'GitHub Actions', 'Jenkins', 'Docker', 'Test Coverage', 'Regression Testing', 'Bug Tracking (Jira)']
      }
    ],
    googleXyzExamples: [
      {
        title: 'End-to-End Suite & Regression Runtime Reduction',
        formula: 'Engineered parallelized Playwright and TypeScript test suite running in GitHub Actions, slashing end-to-end regression execution time from 95 minutes to 11 minutes.',
        explanation: 'Drastically improves engineering deployment cycle velocity.'
      },
      {
        title: 'Production Bug Reduction & Test Coverage',
        formula: 'Expanded automated API and UI test coverage from 34% to 88% across 12 services, driving a 65% decrease in customer-reported production bug incidents.',
        explanation: 'Demonstrates direct impact on software quality and customer satisfaction.'
      },
      {
        title: 'Performance & Load Testing Benchmark',
        formula: 'Authored k6 load testing scripts simulating 50,000 concurrent user sessions, identifying 3 critical database connection leaks prior to Black Friday release.',
        explanation: 'Validates proactive risk mitigation and high-scale stress testing.'
      }
    ],
    commonMistakes: [
      'Focusing exclusively on manual testing when the market demands automated frameworks.',
      'Omitting test run execution times, parallelization, and CI/CD gate automation.',
      'Failing to quantify defect escape reduction or test coverage percentage improvements.'
    ]
  },

  'mobile-developer': {
    slug: 'mobile-developer',
    roleTitle: 'Mobile Application Developer (iOS & Android)',
    shortTitle: 'Mobile Dev',
    seoTitle: 'Essential ATS Keywords for Mobile Developers (iOS & Android 2026)',
    metaDescription: 'Target ATS keywords, Swift, Kotlin, React Native, App Store guidelines, and Google X-Y-Z resume bullet examples for iOS and Android Developers.',
    overview: 'Mobile developer ATS screeners focus on native platforms (Swift/SwiftUI, Kotlin/Jetpack Compose), cross-platform frameworks (React Native, Flutter), offline caching, and app performance.',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Does the resume clearly indicate native (Swift/iOS, Kotlin/Android) or cross-platform (Flutter, React Native) production mastery?",
    "Are app store metrics (downloads, active users, crash-free session rates, App Store ratings) quantified?",
    "Is there evidence of offline-first architectures, memory profiling, and push notification delivery systems?"
],
    atsFormattingAdvice: "Including clickable App Store or Google Play badges as images confuses ATS parsers. Place live app links as clean markdown URLs or plain-text links in your projects section alongside user rating statistics.",
categories: [
      {
        categoryName: 'Native Platforms & Languages',
        description: 'Native mobile languages and platform development kits.',
        keywords: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Objective-C', 'Java', 'Xcode', 'Android Studio']
      },
      {
        categoryName: 'Cross-Platform Frameworks',
        description: 'Multi-platform shared codebases and component trees.',
        keywords: ['React Native', 'Flutter', 'Dart', 'TypeScript', 'Expo', 'Mobile Architecture']
      },
      {
        categoryName: 'App Architecture & Offline State',
        description: 'Architectural patterns, local persistence, and background sync.',
        keywords: ['MVVM', 'Clean Architecture', 'CoreData', 'Room Database', 'SQLite', 'REST APIs', 'WebSockets', 'GraphQL']
      },
      {
        categoryName: 'Distribution, CI/CD & Performance',
        description: 'App store releases, test distributions, and crash metrics.',
        keywords: ['App Store Connect', 'Google Play Console', 'Fastlane', 'Firebase Crashlytics', 'App Performance', 'Memory Leak Profiling']
      }
    ],
    googleXyzExamples: [
      {
        title: 'App Store Rating & Crash-Free Users',
        formula: 'Refactored networking and memory caching layers in Swift 6, increasing crash-free user sessions from 97.8% to 99.92% and elevating App Store rating from 3.7 to 4.8 stars.',
        explanation: 'Combines technical stability benchmarks with customer review impact.'
      },
      {
        title: 'Cross-Platform App Launch & User Base',
        formula: 'Architected greenfield React Native and TypeScript application with offline SQLite sync, scaling to 120,000 monthly active users (MAU) within 6 months of store release.',
        explanation: 'Demonstrates full product lifecycle ownership from code to market adoption.'
      },
      {
        title: 'Automated Build Pipelines & Fastlane',
        formula: 'Automated iOS and Android build pipelines using Fastlane and GitHub Actions, cutting binary release delivery cycles from 6 hours to 22 minutes.',
        explanation: 'Quantifies mobile release automation and developer productivity gains.'
      }
    ],
    commonMistakes: [
      'Listing only UI features without mentioning offline persistence, background workers, or state management.',
      'Failing to report crash-free session rates and app bundle size optimizations.',
      'Omitting familiarity with App Store Connect and Google Play release management.'
    ]
  },

  'ui-ux-designer': {
    slug: 'ui-ux-designer',
    roleTitle: 'Product Designer & UI/UX Specialist',
    shortTitle: 'UI/UX Designer',
    seoTitle: 'Top ATS Keywords for UI/UX & Product Designers (2026 Checklist)',
    metaDescription: 'Target ATS keywords, design systems, user research, wireframing, Figma components, and Google X-Y-Z formulas for UI/UX and Product Designers.',
    overview: 'UI/UX Designer ATS filters look for design systems, user research, prototyping (Figma), interaction design, usability testing, and metric-proven conversion increases.',
    starterTemplateKey: 'product_manager',
        recruiterScreeningChecklist: [
    "Does the resume highlight user research, usability testing methodologies, and design system creation in Figma?",
    "Are design decisions tied to measurable product impact (conversion rate lift, task completion time reduction, drop-off reduction)?",
    "Is there evidence of close collaboration with software engineers to inspect implementation fidelity and design tokens?"
],
    atsFormattingAdvice: "Designers suffer the highest ATS rejection rate because their resumes often resemble Dribbble shots (creative fonts, dual sidebars, graphic skill meters). An ATS cannot read graphic vectors. Use a clean, typography-led single-column document with a prominent link to your portfolio.",
categories: [
      {
        categoryName: 'Design Tools & Prototyping',
        description: 'Industry-standard design suites and interactive prototyping.',
        keywords: ['Figma', 'Design Systems', 'Prototyping', 'Wireframing', 'Auto-Layout', 'Component Libraries', 'Figma Variables']
      },
      {
        categoryName: 'User Research & Testing',
        description: 'Customer discovery, qualitative studies, and validation.',
        keywords: ['User Research', 'Usability Testing', 'User Interviews', 'Persona Development', 'Card Sorting', 'Journey Mapping', 'Information Architecture']
      },
      {
        categoryName: 'Interaction & Accessibility',
        description: 'Micro-interactions, motion design, and inclusive standards.',
        keywords: ['Interaction Design', 'Accessibility (WCAG 2.1)', 'Responsive Design', 'Design Tokens', 'Design Handoff', 'Design QA']
      },
      {
        categoryName: 'Product & Business Alignment',
        description: 'Connecting user experience directly to growth metrics.',
        keywords: ['Conversion Rate Optimization', 'A/B Testing', 'Product Strategy', 'Mixpanel', 'Heuristic Evaluation', 'Stakeholder Presentations']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Checkout Redesign & Checkout Conversion Rate',
        formula: 'Redesigned mobile checkout flow based on 25 moderated usability sessions, reducing step drop-off by 34% and increasing completed purchase conversion by 21%.',
        explanation: 'Ties qualitative user research directly to measured e-commerce sales conversion.'
      },
      {
        title: 'Multi-Brand Design System Architecture',
        formula: 'Created scalable multi-brand design system in Figma with 180+ tokenized accessible components, accelerating frontend sprint velocity by 40% across 4 squads.',
        explanation: 'Demonstrates enterprise component scalability and engineering synergy.'
      },
      {
        title: 'Enterprise SaaS Information Architecture',
        formula: 'Overhauled information architecture for analytics dashboard, reducing average customer time-on-task from 6.4 minutes to 1.8 minutes across 5,000 monthly users.',
        explanation: 'Quantifies usability and task completion speedup.'
      }
    ],
    commonMistakes: [
      'Focusing purely on aesthetic mockups without mentioning user research or usability testing.',
      'Failing to link design decisions to business metrics (retention, conversion rate, task completion time).',
      'Missing accessible design standards (WCAG color contrast, screen reader compatibility).'
    ]
  },

  'engineering-manager': {
    slug: 'engineering-manager',
    roleTitle: 'Engineering Manager & Tech Lead',
    shortTitle: 'Engineering Mgr',
    seoTitle: 'Essential ATS Keywords for Engineering Managers (2026 Guide)',
    metaDescription: 'Target ATS keywords, sprint delivery metrics, engineering headcount growth, system architecture, and Google X-Y-Z formulas for Engineering Managers.',
    overview: 'Engineering leadership resumes must prove people management (1:1s, performance reviews), technical architecture oversight, recruitment, and delivery velocity metrics (DORA).',
    starterTemplateKey: 'product_manager',
        recruiterScreeningChecklist: [
    "Does the resume detail engineering headcount growth, team retention, performance coaching, and promotion tracking?",
    "Are delivery metrics (sprint velocity, on-time project shipping, technical debt reduction) clearly outlined?",
    "Is there a track record of architectural stewardship alongside executive engineering stakeholder management?"
],
    atsFormattingAdvice: "Avoid high-level managerial buzzwords like \"spearheaded synergy\". ATS filters for EM roles prioritize concrete team sizes, budget oversight figures, and operational velocity indicators (e.g., \"Led team of 12 backend engineers\").",
categories: [
      {
        categoryName: 'Leadership & People Management',
        description: 'Team development, performance management, and career ladders.',
        keywords: ['People Management', '1:1 Coaching', 'Performance Reviews', 'Engineering Culture', 'Career Progression Frameworks', 'Mentorship']
      },
      {
        categoryName: 'Hiring & Headcount Growth',
        description: 'Talent acquisition, technical interviews, and team scaling.',
        keywords: ['Technical Recruiting', 'Interview Process Design', 'Headcount Planning', 'Onboarding Optimization', 'Team Scaling', 'DE&I']
      },
      {
        categoryName: 'Delivery Velocity & Agile',
        description: 'Agile execution and modern operational engineering metrics.',
        keywords: ['DORA Metrics', 'Sprint Planning', 'Agile / Scrum', 'Roadmap Execution', 'Incident Retrospectives', 'Cross-Functional Alignment']
      },
      {
        categoryName: 'Technical Strategy & Architecture',
        description: 'High-level architectural governance and technical debt control.',
        keywords: ['System Architecture', 'Technical Debt Reduction', 'Microservices', 'High Availability', 'Cloud Infrastructure', 'Budget Governance']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Team Scaling & Retention',
        formula: 'Grew distributed engineering team from 8 to 26 engineers across 3 squads with 96% annual talent retention, while establishing structured leveling and rubric frameworks.',
        explanation: 'Validates hiring capability, organizational structure, and team stability.'
      },
      {
        title: 'DORA Metrics & Deployment Cadence',
        formula: 'Instituted CI/CD automation and trunk-based development, raising team DORA deployment frequency from monthly to 3x weekly and reducing change failure rate from 18% to 2.8%.',
        explanation: 'Quantifies software delivery velocity and reliability engineering.'
      },
      {
        title: 'Multi-Squad Roadmap Delivery',
        formula: 'Directed technical roadmap across 4 cross-functional squads, delivering enterprise multi-region platform migration on time and under budget by $120,000.',
        explanation: 'Demonstrates executive roadmap reliability and fiscal stewardship.'
      }
    ],
    commonMistakes: [
      'Writing like an individual contributor instead of highlighting people management and team coaching.',
      'Omitting team retention, hiring numbers, and organizational growth metrics.',
      'Failing to mention operational delivery benchmarks (DORA metrics, sprint completion rates).'
    ]
  },

  'scrum-master': {
    slug: 'scrum-master',
    roleTitle: 'Scrum Master & Agile Coach',
    shortTitle: 'Scrum Master',
    seoTitle: 'Top ATS Keywords for Scrum Masters & Agile Coaches (2026 Checklist)',
    metaDescription: 'Must-have ATS keywords, Agile ceremonies, Jira administration, sprint velocity metrics, and Google X-Y-Z formulas for Scrum Masters.',
    overview: 'Scrum Master ATS filters look for Agile frameworks (Scrum, Kanban, SAFe), team velocity improvements, ceremony facilitation, backlog grooming, and impediment resolution.',
    starterTemplateKey: 'product_manager',
        recruiterScreeningChecklist: [
    "Does the candidate hold recognized certifications (PSM, CSM, SAFe) and facilitate multi-team agile ceremonies?",
    "Are agile maturity metrics (velocity stability, cycle time reduction, dependency resolution) quantified?",
    "Is there demonstrated experience removing cross-functional blockers and mentoring product owners and development teams?"
],
    atsFormattingAdvice: "Do not list Scrum events (daily standup, sprint review, retro) as generic duty bullets. ATS parsers score higher when you describe how your facilitation improved sprint predictability or resolved cross-team blockers.",
categories: [
      {
        categoryName: 'Agile Frameworks & Methodologies',
        description: 'Core agile practices and scaling frameworks.',
        keywords: ['Scrum', 'Kanban', 'SAFe (Scaled Agile)', 'Lean', 'Sprint Planning', 'Daily Standups', 'Sprint Retrospectives', 'Sprint Demos']
      },
      {
        categoryName: 'Metrics, Velocity & Forecasting',
        description: 'Quantitative delivery tracking and team predictability.',
        keywords: ['Sprint Velocity', 'Burndown Charts', 'Cycle Time', 'Lead Time', 'Capacity Planning', 'Flow Efficiency', 'Predictability']
      },
      {
        categoryName: 'Tools & Workflow Administration',
        description: 'Project tracking software and board configuration.',
        keywords: ['Jira Software', 'Confluence', 'Miro', 'Azure DevOps', 'Trello', 'Workflow Automation', 'Backlog Refinement']
      },
      {
        categoryName: 'Coaching & Facilitation',
        description: 'Team facilitation, conflict resolution, and cross-team alignment.',
        keywords: ['Agile Coaching', 'Impediment Removal', 'Continuous Improvement', 'Cross-Functional Collaboration', 'Stakeholder Communication']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Sprint Predictability & Velocity Improvement',
        formula: 'Facilitated Agile ceremonies and capacity planning across 2 product squads, increasing sprint commitment-to-delivery predictability from 62% to 91% over 6 sprints.',
        explanation: 'Quantifies reliable delivery and sprint predictability improvement.'
      },
      {
        title: 'Cycle Time Reduction & Impediment Removal',
        formula: 'Optimized Jira workflow and introduced WIP limits in Kanban boards, slashing average ticket cycle time from 14.5 days to 4.2 days across 18 engineers.',
        explanation: 'Demonstrates tangible workflow optimization and bottleneck removal.'
      },
      {
        title: 'Agile Transformation & SAFe Adoption',
        formula: 'Led company-wide SAFe Agile transition for 65 team members, standardizing release train schedules and reducing inter-team dependency delays by 48%.',
        explanation: 'Validates large-scale enterprise organizational change management.'
      }
    ],
    commonMistakes: [
      'Describing standard meetings ("ran standup every day") instead of measurable team delivery improvements.',
      'Omitting concrete agile metrics (cycle time, velocity predictability, lead time).',
      'Failing to mention Jira workflow administration and impediment resolution.'
    ]
  },

  'systems-administrator': {
    slug: 'systems-administrator',
    roleTitle: 'Systems Administrator & Linux SRE',
    shortTitle: 'SysAdmin',
    seoTitle: 'Essential ATS Keywords for Systems Administrators & Linux Admins (2026)',
    metaDescription: 'Target ATS keywords, Linux server administration, Bash scripting, virtualization, backup strategies, and Google X-Y-Z formulas for SysAdmins.',
    overview: 'SysAdmin resumes need to highlight Linux/Windows server administration, virtualization (VMware, Proxmox), automated scripting (Bash, Python), backup/restore DR, and server uptime.',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Does the resume cover Linux/Windows server administration, active directory management, and virtualization (VMware, Hyper-V)?",
    "Are backup/disaster recovery drills, automated patching, and security compliance audits documented?",
    "Is there evidence of bash/PowerShell scripting to automate routine administration and resolve helpdesk escalations?"
],
    atsFormattingAdvice: "Avoid listing hardware specifications or vendor product numbers unless requested in the JD. Focus your bullets on server uptime percentages, fleet sizes managed, and routine task automation.",
categories: [
      {
        categoryName: 'Operating Systems & Administration',
        description: 'Server platforms and kernel-level administration.',
        keywords: ['Linux (RHEL, Ubuntu)', 'Windows Server', 'Active Directory', 'LDAP', 'DNS/DHCP', 'SSH', 'Patch Management']
      },
      {
        categoryName: 'Virtualization & Storage',
        description: 'Hypervisors, network-attached storage, and clustering.',
        keywords: ['VMware vSphere', 'Proxmox', 'SAN/NAS', 'NFS', 'RAID Configuration', 'Hyper-V', 'Virtual Machines']
      },
      {
        categoryName: 'Scripting & Automation',
        description: 'Command-line scripting and automated configurations.',
        keywords: ['Bash Scripting', 'Python', 'PowerShell', 'Ansible', 'Cron Jobs', 'Configuration Management', 'Git']
      },
      {
        categoryName: 'Backups, Networking & Monitoring',
        description: 'High-availability infrastructure, disaster recovery, and alerting.',
        keywords: ['Veeam Backup', 'Disaster Recovery (DR)', 'Firewalls (iptables)', 'VLANs', 'Nagios', 'Zabbix', 'Prometheus', 'Uptime Maintenance']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Server Virtualization & Hardware Consolidation',
        formula: 'Consolidated 75 legacy bare-metal physical servers onto redundant VMware vSphere ESXi clusters, cutting monthly data center power and hardware costs by 42%.',
        explanation: 'Demonstrates infrastructure modernization with tangible operational cost reductions.'
      },
      {
        title: 'Automated Patch Management & Scripting',
        formula: 'Engineered automated Ansible playbooks for scheduled kernel patching across 180+ Linux instances, reducing monthly downtime maintenance windows from 8 hours to 20 minutes.',
        explanation: 'Quantifies time-saving automation and reliability enhancements.'
      },
      {
        title: 'Disaster Recovery & Uptime Reliability',
        formula: 'Restructured enterprise offsite Veeam replication strategy and verified quarterly recovery drills, achieving 99.98% fleet uptime with a tested 15-minute RTO benchmark.',
        explanation: 'Proves readiness with real RTO/RPO disaster recovery metrics.'
      }
    ],
    commonMistakes: [
      'Listing routine manual tasks ("fixed printer and rebooted servers") rather than automated systems engineering.',
      'Omitting server fleet sizes (e.g. 50+ VMs, 200+ servers, multi-datacenter).',
      'Failing to mention backup verification and recovery time objectives (RTO/RPO).'
    ]
  },

  'business-analyst': {
    slug: 'business-analyst',
    roleTitle: 'Technical Business Analyst',
    shortTitle: 'Business Analyst',
    seoTitle: 'Top ATS Keywords for Technical Business Analysts (2026 Checklist)',
    metaDescription: 'Target ATS keywords, requirements gathering, BRD/FRD documentation, SQL querying, user stories, and Google X-Y-Z formulas for Business Analysts.',
    overview: 'Business Analyst ATS parsers focus on requirements elicitation (BRD, FRD, PRD), user story authoring in Jira, stakeholder management, SQL data validation, and process modeling (BPMN).',
    starterTemplateKey: 'product_manager',
        recruiterScreeningChecklist: [
    "Does the candidate bridge business requirements into actionable functional specifications, user stories, and acceptance criteria?",
    "Are process optimization outcomes (cost reductions, cycle time savings, error reduction) quantified?",
    "Does the stack reflect requirements management tools (Jira, Confluence) alongside data query tools (SQL, Excel, Visio)?"
],
    atsFormattingAdvice: "Flowcharts and BPMN process diagrams cannot be extracted by ATS software. Convert your process improvements into descriptive text explaining the \"before vs after\" efficiency gains.",
categories: [
      {
        categoryName: 'Requirements & Documentation',
        description: 'Translating business objectives into technical specifications.',
        keywords: ['BRD (Business Requirements Document)', 'FRD (Functional Requirements)', 'User Stories', 'Acceptance Criteria', 'Gap Analysis', 'Use Cases']
      },
      {
        categoryName: 'Process Modeling & Architecture',
        description: 'Visual process maps and technical workflows.',
        keywords: ['BPMN 2.0', 'Process Mapping', 'Workflow Diagrams', 'Lucidchart', 'Visio', 'Data Flow Diagrams (DFD)']
      },
      {
        categoryName: 'Data Validation & Tools',
        description: 'Verifying data accuracy and testing business logic.',
        keywords: ['SQL', 'Jira Software', 'Confluence', 'User Acceptance Testing (UAT)', 'Excel Advanced (VLOOKUP, Pivot)', 'Tableau']
      },
      {
        categoryName: 'Stakeholder & Project Management',
        description: 'Bridging technical engineering teams with business leaders.',
        keywords: ['Stakeholder Management', 'Scrum / Agile', 'Cross-Functional Alignment', 'Cost-Benefit Analysis', 'Change Management']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Process Automation & Operational Cost Savings',
        formula: 'Mapped end-to-end claims handling process in BPMN and specified automated rules engine, reducing manual document review time by 52% and saving $140,000 annually.',
        explanation: 'Connects process analysis directly to operational efficiency and recurring savings.'
      },
      {
        title: 'ERP Integration & UAT Coordination',
        formula: 'Authored 120+ user stories with strict acceptance criteria and directed UAT testing across 60 business users, launching SAP ERP module 3 weeks ahead of schedule.',
        explanation: 'Validates thorough documentation, cross-functional testing, and on-time delivery.'
      },
      {
        title: 'Data-Driven Feature Scoping & SQL Validation',
        formula: 'Executed SQL queries against production database to validate customer transaction frequency, scoping MVP requirements that boosted feature adoption by 38%.',
        explanation: 'Demonstrates technical data analysis backing functional product scoping.'
      }
    ],
    commonMistakes: [
      'Using passive phrasing like "attended meetings and took notes" instead of "elicited requirements and authored BRDs".',
      'Leaving out technical tools like SQL, Jira, and BPMN process modeling.',
      'Failing to link requirements analysis to measurable business outcomes or cost savings.'
    ]
  },

  'financial-analyst': {
    slug: 'financial-analyst',
    roleTitle: 'Financial Analyst & FP&A Lead',
    shortTitle: 'Financial Analyst',
    seoTitle: 'Essential ATS Keywords for Financial Analysts & FP&A (2026 Checklist)',
    metaDescription: 'Target ATS keywords, financial modeling, DCF valuations, budget forecasting, variance analysis, and Google X-Y-Z formulas for Financial Analysts.',
    overview: 'Finance resumes must highlight three-statement financial modeling, variance analysis, budget forecasting, SaaS unit economics, ERP systems (NetSuite, SAP), and EBITDA impact.',
    starterTemplateKey: 'finance_ops',
        recruiterScreeningChecklist: [
    "Does the resume demonstrate advanced financial modeling (DCF, LBO, 3-statement models), variance analysis, and budgeting?",
    "Are financial recommendations tied to measurable cost reductions, capital allocation, or EBITDA improvements?",
    "Is proficiency in ERP and reporting software (SAP, Oracle, Bloomberg Terminal, advanced Excel) explicitly highlighted?"
],
    atsFormattingAdvice: "Financial analysts frequently format their experience into grid-like financial statement tables. Table cells often cause ATS parsers to read rows out of sequence. Stick to traditional bullet points with bold metrics.",
categories: [
      {
        categoryName: 'Financial Modeling & Valuation',
        description: 'Quantitative forecasting, valuation models, and balance sheet modeling.',
        keywords: ['Financial Modeling', 'DCF Valuation', 'Three-Statement Models', 'LBO Models', 'Sensitivity Analysis', 'Scenario Planning']
      },
      {
        categoryName: 'FP&A & Corporate Finance',
        description: 'Budgeting, cost variance analysis, and margin improvement.',
        keywords: ['FP&A', 'Budget Forecasting', 'Variance Analysis', 'P&L Management', 'EBITDA Optimization', 'Capital Allocation', 'Cash Flow Analysis']
      },
      {
        categoryName: 'Business Metrics & Unit Economics',
        description: 'SaaS metrics and commercial profitability indicators.',
        keywords: ['SaaS Metrics (CAC, LTV, ARR)', 'Gross Margins', 'Revenue Forecasting', 'Unit Economics', 'Cost-Benefit Analysis', 'ROI Tracking']
      },
      {
        categoryName: 'Software, ERP & Data Analysis',
        description: 'Accounting software, data querying, and reporting suites.',
        keywords: ['Excel (Advanced VBA, Power Query)', 'NetSuite', 'SAP', 'SQL', 'Power BI', 'Adaptive Insights', 'Board Presentations']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Annual Operating Budget & Forecast Accuracy',
        formula: 'Constructed dynamic 3-statement operating model forecasting $45M in annual expenses, achieving 98.4% historical forecast accuracy across 4 consecutive quarters.',
        explanation: 'Quantifies fiscal scale and exceptional forecasting precision.'
      },
      {
        title: 'Vendor Contract Audit & EBITDA Expansion',
        formula: 'Conducted comprehensive SaaS and vendor spending variance analysis, identifying redundant software licenses and securing $1.2M in recurring EBITDA savings.',
        explanation: 'Directly demonstrates bottom-line profit improvement and cost discipline.'
      },
      {
        title: 'Unit Economics & Customer Acquisition Efficiency',
        formula: 'Modeled customer acquisition cost (CAC) and lifetime value (LTV) by marketing channel, reallocating $600,000 in ad spend to accelerate ARR growth by 26%.',
        explanation: 'Highlights data-driven capital reallocation resulting in measurable top-line acceleration.'
      }
    ],
    commonMistakes: [
      'Listing basic duties like "reviewed monthly expenses" instead of "conducted variance analysis and optimized EBITDA".',
      'Leaving out dollar figures, budget sizes, and percentage accuracy metrics.',
      'Failing to mention advanced modeling techniques (scenario analysis, DCF, unit economics).'
    ]
  },

  'blockchain-developer': {
    slug: 'blockchain-developer',
    roleTitle: 'Web3 & Blockchain Developer',
    shortTitle: 'Web3 / Blockchain',
    seoTitle: 'Top ATS Keywords for Web3 & Blockchain Developers (2026 Checklist)',
    metaDescription: 'Target ATS keywords, Solidity smart contracts, DeFi protocols, security auditing, Hardhat, and Google X-Y-Z formulas for Web3 Developers.',
    overview: 'Blockchain ATS parsers evaluate smart contract engineering (Solidity, Rust), security audits, testing suites (Foundry, Hardhat), decentralized storage, and gas optimization.',
    starterTemplateKey: 'software_engineer',
        recruiterScreeningChecklist: [
    "Does the candidate write secure smart contracts (Solidity, Rust) with verifiable mainnet/testnet deployments?",
    "Are security audits, gas optimization techniques, and reentrancy protections explicitly highlighted?",
    "Is there experience with Web3 development stacks (Ethers.js, Hardhat, Foundry, The Graph, IPFS)?"
],
    atsFormattingAdvice: "Do not paste raw transaction hashes or smart contract bytecode onto your resume. List verified contract links, total value locked (TVL), and audit confirmations in your technical projects section.",
categories: [
      {
        categoryName: 'Smart Contract Languages',
        description: 'EVM and non-EVM contract programming languages.',
        keywords: ['Solidity', 'Rust', 'EVM', 'Vyper', 'Yul', 'Web3.js', 'Ethers.js', 'Viem']
      },
      {
        categoryName: 'Development & Testing Frameworks',
        description: 'Testing, local simulation, and deployment suites.',
        keywords: ['Foundry', 'Hardhat', 'Truffle', 'Slither', 'Remix IDE', 'Smart Contract Auditing', 'Unit Testing']
      },
      {
        categoryName: 'DeFi Protocols & Standards',
        description: 'Token architectures, automated market makers, and bridges.',
        keywords: ['ERC-20', 'ERC-721', 'ERC-1155', 'DeFi Protocols', 'DEX / AMM', 'Staking', 'Decentralized Oracles (Chainlink)']
      },
      {
        categoryName: 'Infrastructure & Web3 Integration',
        description: 'Decentralized storage, node RPCs, and wallet integration.',
        keywords: ['IPFS', 'The Graph', 'RPC Nodes', 'Gas Optimization', 'Zero-Knowledge Proofs (ZKP)', 'MetaMask', 'Cross-Chain Bridges']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Smart Contract Gas Optimization',
        formula: 'Re-engineered ERC-20 staking and reward contracts in Solidity and Yul, reducing transaction gas consumption by 38% across 450,000 on-chain transactions.',
        explanation: 'Quantifies direct gas fee savings and execution volume on a live protocol.'
      },
      {
        title: 'Protocol Security & TVL Protection',
        formula: 'Architected automated liquidity rebalancing protocol handling $18M in Total Value Locked (TVL), completing 2 independent audits with zero critical vulnerabilities.',
        explanation: 'Demonstrates high financial stakes, protocol scale, and security compliance.'
      },
      {
        title: 'Subgraphs & Real-Time Blockchain Indexing',
        formula: 'Built custom decentralized indexing subgraph with The Graph, reducing dApp client data retrieval latency from 4.2s to 120ms for 35,000 daily active users.',
        explanation: 'Validates Web3 full-stack performance and responsive dApp UX.'
      }
    ],
    commonMistakes: [
      'Listing speculative crypto buzzwords without verifiable GitHub smart contract repositories.',
      'Omitting security testing (Foundry, Slither) and formal audit reports.',
      'Failing to mention gas optimization or Total Value Locked (TVL) metrics.'
    ]
  },

  'marketing-manager': {
    slug: 'marketing-manager',
    roleTitle: 'Growth & Digital Marketing Manager',
    shortTitle: 'Growth Marketing',
    seoTitle: 'Essential ATS Keywords for Growth & Marketing Managers (2026 Guide)',
    metaDescription: 'Target ATS keywords, SEO optimization, paid acquisition (PPC), conversion funnels (CRO), email marketing, and Google X-Y-Z formulas for Marketing Managers.',
    overview: 'Marketing resumes must prove ROI-driven acquisition (CAC, ROAS), conversion rate optimization (CRO), search engine optimization (SEO), lifecycle retention, and marketing analytics.',
    starterTemplateKey: 'product_manager',
        recruiterScreeningChecklist: [
    "Does the resume demonstrate customer acquisition (CAC), lifetime value (LTV), and multi-channel campaign ROI?",
    "Are marketing performance channels (paid search, SEO, social, email automation) quantified with pipeline or revenue contributions?",
    "Is there proven mastery over martech stacks (HubSpot, Google Analytics 4, Meta Ads Manager, Marketo)?"
],
    atsFormattingAdvice: "Marketing resumes often use colorful brand graphics or two-column magazine layouts. Keep your resume single-column so that ATS crawlers capture your revenue impact, ROAS numbers, and campaign metrics without truncation.",
categories: [
      {
        categoryName: 'Performance Acquisition & PPC',
        description: 'Paid search, social advertising, and campaign scaling.',
        keywords: ['Paid Acquisition', 'Google Ads', 'Meta Ads', 'ROAS Optimization', 'PPC Campaigns', 'Lead Generation', 'B2B Marketing']
      },
      {
        categoryName: 'Organic Growth & Content SEO',
        description: 'Search visibility, content marketing, and backlink strategies.',
        keywords: ['Search Engine Optimization (SEO)', 'Content Strategy', 'Keyword Research', 'Technical SEO', 'Backlink Building', 'Organic Traffic Growth']
      },
      {
        categoryName: 'Conversion & Funnel Optimization',
        description: 'Landing page experimentation and user activation.',
        keywords: ['Conversion Rate Optimization (CRO)', 'A/B Testing', 'Landing Page Design', 'Funnel Analysis', 'Customer Journey', 'Activation Rate']
      },
      {
        categoryName: 'Lifecycle & Analytics Tooling',
        description: 'Retention marketing, email automation, and performance measurement.',
        keywords: ['HubSpot', 'Google Analytics 4 (GA4)', 'Customer Acquisition Cost (CAC)', 'Email Automation', 'Mixpanel', 'CRM Management', 'Churn Reduction']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Paid Acquisition & ROAS Expansion',
        formula: 'Restructured paid search and Meta advertising funnels with dynamic creative testing, elevating Return on Ad Spend (ROAS) from 1.8x to 3.9x and driving $1.8M in net new ARR.',
        explanation: 'Demonstrates dramatic marketing efficiency gains and multimillion-dollar revenue impact.'
      },
      {
        title: 'Programmatic SEO & Organic Traffic Scaling',
        formula: 'Engineered programmatic SEO content architecture targeting 1,200 long-tail keywords, increasing monthly organic search impressions by 310% in 7 months.',
        explanation: 'Validates sustainable organic search acquisition and technical SEO strategy.'
      },
      {
        title: 'Email Lifecycle Automation & Free-to-Paid Conversion',
        formula: 'Designed 5-stage automated behavioral email onboarding workflow in HubSpot, raising free-to-paid subscriber conversion from 3.1% to 6.4%.',
        explanation: 'Ties automated lifecycle communication directly to user activation and monetization.'
      }
    ],
    commonMistakes: [
      'Focusing on vanity metrics (impressions, follower counts) instead of CAC, ROAS, and revenue generated.',
      'Leaving out specific marketing platforms and analytical tooling (GA4, HubSpot, Mixpanel).',
      'Failing to quantify A/B test results and conversion rate percentages.'
    ]
  },

  'ai-engineer': {
    slug: 'ai-engineer',
    roleTitle: 'Artificial Intelligence & LLM Systems Engineer',
    shortTitle: 'AI Engineer',
    seoTitle: 'Top ATS Keywords for AI & LLM Systems Engineers (2026 Checklist)',
    metaDescription: 'Target ATS keywords, LLM fine-tuning, RAG pipelines, vLLM serving, vector databases, and Google X-Y-Z resume formulas for AI Engineers.',
    overview: 'AI and Large Language Model (LLM) engineering resumes must highlight production inference, RAG architectures, model fine-tuning (LoRA), prompt evaluation, and vector storage.',
    starterTemplateKey: 'ai_ml_engineer',
        recruiterScreeningChecklist: [
    "Did the candidate architect production LLM systems (RAG, vector search, vLLM inference) beyond simple prompt engineering?",
    "Are latency benchmarks (time-to-first-token, tokens per second, GPU memory footprints) and cost reductions quantified?",
    "Is there evidence of model fine-tuning (LoRA/QLoRA), synthetic evaluation benchmarks, and hallucination guardrails?"
],
    atsFormattingAdvice: "Ensure modern AI terminology (RAG, LoRA, Vector Databases, Embeddings) is clearly written in both acronym and expanded forms. Avoid graphic flowcharts for LLM architectures and present them as structured technical bullets.",
categories: [
      {
        categoryName: 'LLMs, RAG & Vector Search',
        description: 'Generative AI architectures and contextual document retrieval.',
        keywords: ['Large Language Models (LLMs)', 'RAG Architectures', 'Vector Databases (Pinecone, Qdrant)', 'LangChain', 'LlamaIndex', 'Semantic Search', 'Embeddings']
      },
      {
        categoryName: 'Model Fine-Tuning & Quantization',
        description: 'Adapting base models and optimizing weight footprints.',
        keywords: ['LoRA / QLoRA', 'Model Fine-Tuning', 'Hugging Face', 'Quantization (AWQ, GGUF)', 'PyTorch', 'PEFT', 'Reinforcement Learning (RLHF)']
      },
      {
        categoryName: 'Inference Serving & Production MLOps',
        description: 'High-throughput serving clusters and latency reduction.',
        keywords: ['vLLM', 'Triton Inference Server', 'TensorRT-LLM', 'Docker', 'Kubernetes', 'GPU Cluster Management', 'Streaming Responses']
      },
      {
        categoryName: 'Evaluation, Guardrails & Governance',
        description: 'Benchmarking factual accuracy, hallucination prevention, and safety.',
        keywords: ['Hallucination Detection', 'Prompt Engineering', 'Model Evaluation (Ragas)', 'NeMo Guardrails', 'AI Governance', 'MLflow']
      }
    ],
    googleXyzExamples: [
      {
        title: 'Enterprise RAG Precision & Latency',
        formula: 'Architected enterprise hybrid-search RAG pipeline with Qdrant and cross-encoder re-ranking, boosting answer retrieval accuracy from 68% to 93% with sub-400ms time-to-first-token.',
        explanation: 'Quantifies retrieval accuracy jumps and fast real-time inference latency.'
      },
      {
        title: 'Model Serving Throughput & Cloud Cost Reduction',
        formula: 'Deployed vLLM continuous batching and AWQ 4-bit quantization on AWS GPU instances, increasing token serving throughput by 3.4x and trimming $14,000 in monthly compute bills.',
        explanation: 'Proves deep operational optimization with direct monthly dollar savings.'
      },
      {
        title: 'Automated Hallucination Evaluation Suite',
        formula: 'Engineered synthetic benchmark evaluation suite testing 15,000 domain-specific queries, reducing customer-reported LLM hallucination rate to under 0.8%.',
        explanation: 'Demonstrates rigorous AI quality assurance and safety guardrails.'
      }
    ],
    commonMistakes: [
      'Claiming to be an AI engineer having only used ChatGPT API wrapper prompts.',
      'Omitting model evaluation, latency benchmarks (TTFT, tokens/sec), and cost per query.',
      'Failing to detail inference serving infrastructure (vLLM, GPU memory sizing).'
    ]
  }
};
