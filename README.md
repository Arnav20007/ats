# ATSCheck — Free In-Browser ATS Resume Score Checker & Keyword Matcher

[![Live Demo](https://img.shields.io/badge/Live_Site-atscheck.tech-emerald?style=flat-square)](https://atscheck.tech)
[![ATS Score](https://img.shields.io/badge/ATS_Score-Free_Checker-blue?style=flat-square)](https://atscheck.tech/checker)
[![Overleaf PDF Guidance](https://img.shields.io/badge/Overleaf_%26_LaTeX-PDF_Guidance-success?style=flat-square)](https://atscheck.tech/keywords/overleaf-latex-ats)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Resume Processing](https://img.shields.io/badge/Resume_Processing-Browser--Based-059669?style=flat-square&logo=shield)](https://atscheck.tech/privacy)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Arnav20007/ats/pulls)

> **Free browser-based resume checker, job-description keyword matcher, and formatting review.**
> Review resume structure and extracted text, compare recognized job-description terms, and draft clearer bullet points. Scores and suggestions are heuristic guidance, not employer ATS results. Resume text is processed in the browser; the site separately loads analytics, advertising, and font services described in its [Privacy Policy](https://atscheck.tech/privacy).

- 🌐 **Production Web App**: [https://atscheck.tech](https://atscheck.tech)
- 🎯 **ATS Resume Score Calculator**: [https://atscheck.tech/checker](https://atscheck.tech/checker)
- 🔍 **Job Description Keyword Matcher**: [https://atscheck.tech/matcher](https://atscheck.tech/matcher)
- ✍️ **Resume Bullet Point Rewriter**: [https://atscheck.tech/rewriter](https://atscheck.tech/rewriter)
- 📋 **Resume PDF Formatting Review**: [https://atscheck.tech/audit](https://atscheck.tech/audit)
- 🎓 **Free ATS Resume Templates**: [https://atscheck.tech/templates](https://atscheck.tech/templates)
- 🔑 **Role Keywords Directory (30 Guides)**: [https://atscheck.tech/keywords](https://atscheck.tech/keywords)
- 📦 **Source Code Repository**: [https://github.com/Arnav20007/ats](https://github.com/Arnav20007/ats)

---

## 🎯 Campus Placements & Off-Campus Hiring Guides

General resume-preparation checklists for Indian engineering freshers and campus applicants. Requirements vary by role and hiring cycle; verify them against each employer’s current official materials:

* [TCS NQT Resume Keywords & Fresher Checklist](https://atscheck.tech/keywords/tcs-nqt) — Common CS topics such as Java, Python, OOP, and DBMS.
* [Infosys Fresher Resume Keywords](https://atscheck.tech/keywords/infosys-fresher) — Software development, databases, and project examples.
* [Accenture Placement Resume Keywords](https://atscheck.tech/keywords/accenture-fresher) — Programming, cloud, and project topics.
* [Cognizant GenC Resume Keywords](https://atscheck.tech/keywords/cognizant-fresher) — Full-stack, cloud, and development topics.
* [Wipro Fresher Resume Keywords](https://atscheck.tech/keywords/wipro-fresher) — Programming, database, and project topics.
* [B.Tech CSE Fresher ATS Resume Keywords & Format (2026)](https://atscheck.tech/keywords/btech-cse-fresher) — Academic projects, GitHub links, and GPA formatting.
* [BCA & MCA Placement ATS Resume Guide (2026)](https://atscheck.tech/keywords/bca-mca-fresher) — Full stack development and practical database project showcase.
* [Overleaf and LaTeX Resume PDF Checks](https://atscheck.tech/keywords/overleaf-latex-ats) — Inspect selectable text and PDF reading order.
* [Amazon SDE Fresher ATS Resume Keywords (2026)](https://atscheck.tech/keywords/amazon-sde) — Leadership principles, distributed systems, and AWS fundamentals.
* [Google SWE Intern ATS Resume Keywords (2026)](https://atscheck.tech/keywords/google-swe-intern) — Competitive programming, algorithmic problem solving, and metrics.

---

## ⚡ Key Capabilities

* **Document Structure & Formatting Review**:
  * Heading clarity, single-column flow, and font safety checks.
  * Measurable-detail checks and illustrative X-Y-Z-style bullet examples. Sample metrics may be fictional; use only results you can verify.
  * Repetition detector with 1-click contextual action verb diversification.
  * Punctuation, period consistency, and capitalization auto-formatter.
* **Browser-Based Resume Processing**:
  * PDF text extraction and resume checks run in the browser using `pdfjs-dist` and Web APIs.
  * The resume review code does not send resume text to ATSCheck application servers. Google Analytics, Google AdSense, and Google Fonts are also loaded by the site; see the Privacy Policy for details.
* **First-Class Technical Projects Support**:
  * Dedicated detection and formatting for students and freshers graduating 2024–2029.
  * No fake corporate employment forced into fresher resumes.
  * Editable project details, stack tags, metrics verification, and bullet rewrites.
* **Single-Column PDF Export**:
  * Formatted with clean `Plus Jakarta Sans` and `JetBrains Mono` typography.
  * Strict `@page { size: letter portrait; margin: 12mm 15mm; }` with page-break protection.
* **Instant Plain Text (TXT) Export** for legacy clipboard ATS forms.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript
* **Styling**: Tailwind CSS v4, Framer Motion
* **Build Tool**: Vite 8
* **Document Processing**: `pdfjs-dist` (client-side text stream parser)
* **Hosting & CI/CD**: Cloud Edge Production (atscheck.tech) + GitHub Actions

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Arnav20007/ats.git
   cd ats
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## 📄 License

MIT © [Arnav Singh](https://github.com/Arnav20007)
