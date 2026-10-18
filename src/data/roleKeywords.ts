export interface RoleKeywordData {
  slug: string;
  roleTitle: string;
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  overview: string;
  starterTemplateKey: string;
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
    seoTitle: 'Top ATS Keywords for Software Engineers (2026 Checklist)',
    metaDescription: 'Essential ATS resume keywords, technical skills, and Google X-Y-Z achievement formulas for Software Engineers and Backend Developers. 100% free checklist.',
    overview: 'Applicant Tracking Systems at tech companies look for specific programming languages, distributed systems concepts, cloud infrastructure, and verifiable metrics rather than generic responsibilities.',
    starterTemplateKey: 'software_engineer',
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
  }
};
