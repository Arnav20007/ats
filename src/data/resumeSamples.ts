export interface ResumeExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ResumeEducation {
  id: string;
  degree: string;
  school: string;
  location: string;
  year: string;
}

export interface ResumeProject {
  id: string;
  name: string;
  role?: string;
  link?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface ResumeData {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  projects?: ResumeProject[];
  education: ResumeEducation[];
}

export const SAMPLE_RESUMES: Record<string, ResumeData> = {
  software_engineer: {
    id: 'software_engineer',
    fullName: 'David Lin',
    jobTitle: 'Senior Staff Software Engineer',
    email: 'david.lin@devcloud.io',
    phone: '+1 (415) 892-4410',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/davidlin-eng',
    portfolio: 'davidlin.dev',
    summary:
      'Senior Staff Engineer with 7+ years designing distributed backend systems and high-concurrency APIs in Go and TypeScript. Known for performance optimization that moves real numbers — cut P99 API latency by 48% across a 3.5M DAU multi-region AWS platform.',
    skills: [
      'Go',
      'TypeScript',
      'React',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Docker',
      'Kubernetes',
      'AWS (ECS, S3, RDS)',
      'GraphQL',
      'REST APIs',
      'Distributed Systems',
      'CI/CD Pipelines',
      'Microservices',
      'System Architecture',
      'Performance Optimization',
      'Observability (Datadog, OpenTelemetry)'
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Staff Software Engineer',
        company: 'NovaScale Systems',
        location: 'San Francisco, CA',
        startDate: 'Feb 2022',
        endDate: 'Present',
        bullets: [
          'Designed and shipped a distributed event ingestion pipeline in Go and Apache Kafka, processing 65M+ daily transaction records at 99.99% availability — zero SLA breaches across 18 months.',
          'Migrated monolithic database queries to read-replicas with Redis caching, cutting P99 database latency from 840ms to 42ms and reducing RDS spend by $18,000 per month.',
          'Rebuilt the primary operations dashboard in React 19 and Vite, reducing JavaScript bundle size by 62% and lifting daily active user engagement by 31% in the following quarter.',
          'Automated deployment pipelines using GitHub Actions and Helm on Kubernetes, increasing cross-team deploy frequency from bi-weekly to 4x daily with zero production regressions.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Senior Software Engineer',
        company: 'AeroCloud Analytics',
        location: 'Mountain View, CA',
        startDate: 'Jun 2019',
        endDate: 'Jan 2022',
        bullets: [
          'Built a real-time telemetry streaming service in Node.js and WebSockets, scaling to 45,000 concurrent client streams with sub-15ms end-to-end message propagation under peak load.',
          'Executed a zero-downtime migration of a 12TB PostgreSQL cluster during live traffic, resulting in zero data corruption and no customer-facing disruptions over a 72-hour cutover window.',
          'Wrote 140+ unit and integration tests in Vitest, raising code coverage from 42% to 91% and reducing production rollback incidents by 70% over two release cycles.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        school: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        year: '2015 – 2019'
      }
    ]
  },
  ai_ml_engineer: {
    id: 'ai_ml_engineer',
    fullName: 'Elena Rostova',
    jobTitle: 'Lead Machine Learning & AI Engineer',
    email: 'elena.rostova@ailabs.org',
    phone: '+1 (206) 555-8192',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/elena-rostova-ai',
    portfolio: 'rostova-research.ai',
    summary:
      'Lead Machine Learning Engineer with 6+ years specializing in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) architectures, and production model serving. Decreased inference costs by 54% through vLLM quantization and continuous batching across enterprise clusters.',
    skills: [
      'Python',
      'PyTorch',
      'LLM Fine-Tuning (LoRA, QLoRA)',
      'RAG Architectures',
      'Vector Databases (Qdrant, Pinecone)',
      'LangChain / LlamaIndex',
      'vLLM / Triton Inference Server',
      'Docker & Kubernetes',
      'MLflow',
      'Model Evaluation & Guardrails',
      'C++',
      'CUDA Optimization',
      'Data Pipelines (Polars, DuckDB)'
    ],
    experience: [
      {
        id: 'exp-ai-1',
        role: 'Lead AI Infrastructure Engineer',
        company: 'Synthetix AI',
        location: 'Seattle, WA',
        startDate: 'Mar 2023',
        endDate: 'Present',
        bullets: [
          'Designed enterprise-grade RAG pipeline integrating hybrid sparse/dense vector search and cross-encoder re-ranking, boosting retrieval precision by 38% on proprietary legal datasets.',
          'Deployed model serving clusters utilizing vLLM and TensorRT-LLM on AWS p4d.24xlarge GPU instances, achieving 3.2x higher tokens/sec throughput per dollar.',
          'Instituted automated LLM benchmark evaluation suite measuring hallucination rates, contextual relevance, and answer faithfulness across 10,000 real-world customer test cases.'
        ]
      },
      {
        id: 'exp-ai-2',
        role: 'Machine Learning Engineer',
        company: 'Vanguard Cognitive Systems',
        location: 'Bellevue, WA',
        startDate: 'Aug 2020',
        endDate: 'Feb 2023',
        bullets: [
          'Trained and deployed multimodal classification models in PyTorch for high-speed document OCR, resolving 1.2M monthly documents with 99.4% accuracy.',
          'Streamlined feature engineering pipelines using Ray and DuckDB, reducing data preprocessing runtimes from 6 hours to 28 minutes.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-ai-1',
        degree: 'M.S. in Computer Science (Artificial Intelligence)',
        school: 'University of Washington',
        location: 'Seattle, WA',
        year: '2018 – 2020'
      }
    ]
  },
  product_manager: {
    id: 'product_manager',
    fullName: 'Marcus Vance',
    jobTitle: 'Director of Product Management',
    email: 'marcus.vance@techpm.io',
    phone: '+1 (512) 674-8821',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/marcusvance-pm',
    portfolio: 'marcuspm.dev',
    summary:
      'Product Management Leader with 8+ years scaling B2B SaaS ARR from $2M to $24M+. Spearheaded Product-Led Growth (PLG) motions, self-serve onboarding optimizations, and developer API ecosystems. Deep experience leading cross-functional teams of 18+ engineers, product designers, and data scientists.',
    skills: [
      'Product Strategy',
      'Product-Led Growth (PLG)',
      'Roadmap Prioritization',
      'User Research & Discovery',
      'Conversion Rate Optimization (CRO)',
      'Metrics & OKRs',
      'API Product Design',
      'Mixpanel / Amplitude',
      'SQL & Data Analysis',
      'A/B Testing Frameworks',
      'Go-To-Market (GTM)',
      'Agile / Scrum Leadership'
    ],
    experience: [
      {
        id: 'exp-pm-1',
        role: 'Director of Product',
        company: 'HyperFlow Payments',
        location: 'Austin, TX',
        startDate: 'Apr 2022',
        endDate: 'Present',
        bullets: [
          'Led launch of instant global developer payouts API, generating $14.5M in new annualized gross payment volume within the first 9 months of market release.',
          'Redesigned self-serve enterprise onboarding workflow, shortening time-to-first-transaction from 4.2 days to 18 minutes and boosting activation rate by 44%.',
          'Established data-driven experimentation framework running 25+ simultaneous quarterly experiments, increasing free-to-paid subscriber conversion from 2.6% to 5.2%.'
        ]
      },
      {
        id: 'exp-pm-2',
        role: 'Senior Product Manager',
        company: 'CloudPulse Analytics',
        location: 'Austin, TX',
        startDate: 'Jan 2019',
        endDate: 'Mar 2022',
        bullets: [
          'Managed flagship monitoring product generating $8M in annual recurring revenue (ARR), leading a cross-functional squad of 14 engineers and 2 UX designers.',
          'Conducted 60+ qualitative interviews with Fortune 500 VP of Engineering prospects to validate core retention features, reducing customer annual churn from 7.1% to 2.8%.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-pm-1',
        degree: 'B.S. in Management Information Systems',
        school: 'University of Texas at Austin',
        location: 'Austin, TX',
        year: '2014 – 2018'
      }
    ]
  },
  finance_ops: {
    id: 'finance_ops',
    fullName: 'Rachel Sterling',
    jobTitle: 'Head of Finance & Business Operations',
    email: 'rachel.sterling@finops.co',
    phone: '+1 (212) 402-9934',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/rachelsterling-ops',
    portfolio: 'rachelsterling.com',
    summary:
      'Finance & Business Operations Leader with 8+ years leading financial planning & analysis (FP&A), capital allocation, and operational efficiency initiatives. Directed $85M operating budgets and restructured software vendor contracts, delivering $3.2M in annualized EBITDA savings.',
    skills: [
      'Financial Modeling & FP&A',
      'P&L Management',
      'EBITDA Optimization',
      'Vendor Contract Negotiation',
      'Capital Allocation',
      'Headcount Planning',
      'Revenue Forecasting',
      'ERP Systems (NetSuite)',
      'SaaS Unit Economics (CAC, LTV, Magic Number)',
      'Cross-Functional Leadership',
      'Board & Investor Reporting'
    ],
    experience: [
      {
        id: 'exp-fo-1',
        role: 'Head of Business Operations',
        company: 'Vanguard Commerce Group',
        location: 'New York, NY',
        startDate: 'Jul 2022',
        endDate: 'Present',
        bullets: [
          'Engineered financial operating model forecasting monthly cash flows with 98.2% historical accuracy, securing $35M in non-dilutive credit facilities.',
          'Renegotiated top 25 cloud and enterprise SaaS vendor contracts, reducing operational overhead by $2.4M annually without impacting product delivery velocity.',
          'Restructured sales compensation models and commission accelerators, lifting net revenue retention (NRR) from 104% to 119% over a 12-month period.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-fo-1',
        degree: 'B.S. in Finance & Statistics',
        school: 'New York University, Stern School of Business',
        location: 'New York, NY',
        year: '2013 – 2017'
      }
    ]
  },
  arnav_singh: {
    id: 'arnav_singh',
    fullName: 'Arnav Singh',
    jobTitle: 'Developer',
    email: 'arnavsinghas1221@gmail.com',
    phone: '+91 7080091179',
    location: 'Lucknow, Uttar Pradesh, India',
    linkedin: '', // Missing LinkedIn flagged by Enhancv audit
    portfolio: 'github.com/arnavsingh',
    summary:
      'Developer experienced in full-stack web development with React, Python, and Flask. Passionate about automated data pipelines, algorithm optimization, and building utility software.',
    skills: [
      'C++',
      'Python',
      'Java',
      'JavaScript',
      'SQL',
      'React',
      'Flask',
      'HTML',
      'CSS',
      'Framer Motion',
      'REST APIs',
      'SQLite',
      'Git',
      'GitHub',
      'Render',
      'Data Structures & Algorithms',
      'Object-Oriented Programming'
    ],
    experience: [
      {
        id: 'exp-arnav-1',
        role: 'Cloud Arcade Champion & DSA Contributor',
        company: 'Google Cloud & GeeksforGeeks',
        location: 'India',
        startDate: '01/2022',
        endDate: '12/2022',
        bullets: [
          'Reached Champion tier in Google Cloud Arcade program, completing 15+ hands-on cloud architecture and deployment labs.',
          'Solved 100 Data Structures & Algorithms challenges on GeeksforGeeks over a 100-day public learning streak with daily commits.'
        ]
      }
    ],
    projects: [
      {
        id: 'proj-arnav-1',
        name: 'MoodMate — Mental Health Platform',
        role: 'Full Stack Developer',
        technologies: 'React, Flask, SQLite, Render',
        startDate: '2025',
        endDate: 'Present',
        bullets: [
          'Developed a React and Flask web application implementing mood tracking, chat, appointment booking, and user/provider workflows.',
          'Implemented password-hashed authentication and role-based access control for user/provider routes, with SQLite audit logs for sensitive actions.',
          'Tested backend API endpoints and core application workflows, configuring automated continuous deployment through Render.'
        ]
      },
      {
        id: 'proj-arnav-2',
        name: 'Material Code Standardization System',
        role: 'Data Pipeline Engineer',
        technologies: 'Python, Regex, Data Normalization',
        startDate: '2026',
        endDate: '2026',
        bullets: [
          'Designed an automated Python data pipeline using regular expressions and rule-based normalization to clean and deduplicate vendor records.',
          'Constructed a synthetic dataset of 200 controlled variants to evaluate matching behavior and identify false positives and false negatives.',
          'Applied attribute extraction and deterministic matching logic to identify equivalent materials across inconsistent vendor data.'
        ]
      },
      {
        id: 'proj-arnav-3',
        name: 'PDFlex — PDF Utility Platform',
        role: 'Sole Developer',
        technologies: 'Python, Web Services, Document Processing',
        startDate: '2026',
        endDate: '2026',
        bullets: [
          'Developed a Python web application for merging, splitting, compressing, and converting PDF files with multipart upload processing.',
          'Implemented file-type validation, configurable size limits, processing-error handling, and streaming download responses.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-arnav-1',
        degree: 'B.Tech in Computer Science and Engineering',
        school: 'Babu Banarasi Das University',
        location: 'Lucknow, Uttar Pradesh, India',
        year: '08/2024 – 05/2028'
      }
    ]
  }
};

export const BLANK_STARTER_RESUME: ResumeData = {
  id: 'new_builder_draft',
  fullName: 'Alex Morgan',
  jobTitle: 'Software Engineer',
  email: 'alex.morgan@email.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alexmorgan-dev',
  portfolio: 'alexmorgan.dev',
  summary:
    'Dedicated Software Engineer with proven expertise building scalable cloud applications, high-performance APIs, and intuitive user interfaces. Passionate about system reliability and measurable business impact.',
  skills: [
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'REST APIs',
    'Git',
    'CI/CD Pipelines'
  ],
  experience: [
    {
      id: 'exp-starter-1',
      role: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2023',
      endDate: 'Present',
      bullets: [
        'Architected and deployed responsive full-stack features using React and Node.js, boosting customer engagement by 32%.',
        'Optimized PostgreSQL database queries and indexing strategies, slashing average API response latency by 45%.',
        'Implemented automated CI/CD deployment pipelines with Docker, cutting deployment cycle times from 45 minutes to 8 minutes.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-starter-1',
      name: 'CloudSync — Real-Time Collaboration Engine',
      role: 'Creator & Maintainer',
      technologies: 'TypeScript, WebSocket, Redis, Docker',
      startDate: '2024',
      endDate: '2024',
      bullets: [
        'Built a real-time collaborative document editor with Operational Transformation algorithms, supporting 50+ concurrent users with sub-25ms sync latency.',
        'Containerized multi-service deployment with Docker Compose, achieving 100% test pass rate across 65 integration test suites.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-starter-1',
      degree: 'B.S. in Computer Science',
      school: 'University of California',
      location: 'Berkeley, CA',
      year: '2017 – 2021'
    }
  ]
};

export const STARTER_ROLE_TEMPLATES: {
  id: string;
  name: string;
  description: string;
  role: string;
  resume: ResumeData;
}[] = [
  {
    id: 'software_engineer',
    name: 'Software Engineer',
    description: 'High-impact backend and distributed systems profile with Go, TypeScript & AWS.',
    role: 'Senior Software Engineer',
    resume: SAMPLE_RESUMES.software_engineer
  },
  {
    id: 'ai_ml_engineer',
    name: 'AI / ML Engineer',
    description: 'LLM fine-tuning, RAG pipelines, PyTorch & scalable inference clusters.',
    role: 'Lead AI Engineer',
    resume: SAMPLE_RESUMES.ai_ml_engineer
  },
  {
    id: 'product_manager',
    name: 'Product Manager',
    description: 'B2B SaaS growth, PLG funnels, roadmap prioritization & metric OKRs.',
    role: 'Director of Product',
    resume: SAMPLE_RESUMES.product_manager
  },
  {
    id: 'arnav_singh',
    name: 'Arnav Singh (Full Stack Dev)',
    description: 'React, Flask, Python, SQLite audit logs, and material code data pipelines.',
    role: 'Developer',
    resume: SAMPLE_RESUMES.arnav_singh
  },
  {
    id: 'starter_clean',
    name: 'Clean Starter Canvas',
    description: 'Fresh ATS-verified starter with clean placeholders ready to fill out.',
    role: 'Software Engineer',
    resume: BLANK_STARTER_RESUME
  }
];

export const DEFAULT_SAMPLE_JD = `Senior Software Engineer / Tech Lead (TypeScript, Go, React, Distributed Systems)

About the Position:
We are looking for a Senior Software Engineer to build and scale our high-throughput distributed cloud services. You will design resilient backend microservices in Go and Node.js/TypeScript, craft interactive React web applications, and optimize PostgreSQL and Redis data architectures.

What You Will Do:
• Architect, deploy, and operate high-concurrency distributed systems with 99.99% availability SLAs.
• Build real-time streaming architectures utilizing Apache Kafka, WebSockets, or event queues.
• Optimize database schemas and caching layers across PostgreSQL, Redis, and multi-region AWS environments.
• Implement continuous delivery (CI/CD Pipelines) utilizing Docker, Kubernetes, and automated test suites.
• Champion web performance optimization, reducing API latency and improving frontend response times.
• Mentor junior and mid-level engineering team members through rigorous code reviews and architecture design docs.

Requirements & Qualifications:
• 5+ years of software engineering experience with TypeScript, React, Go, and Node.js.
• Strong foundation in Distributed Systems, System Architecture, and REST / GraphQL APIs.
• Production experience with PostgreSQL, Redis, and message queues (Kafka).
• Hands-on proficiency with Docker, Kubernetes, and AWS cloud infrastructure.
• Proven track record delivering measurable performance and latency improvements.`;
