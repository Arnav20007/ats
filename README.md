# ATSCheck — Free In-Browser ATS Resume Score Checker & Keyword Matcher

[![Live Demo](https://img.shields.io/badge/Live_Site-atscheck.tech-emerald?style=flat-square&logo=vercel)](https://atscheck.tech)
[![ATS Score](https://img.shields.io/badge/ATS_Score-Free_Checker-blue?style=flat-square)](https://atscheck.tech/checker)
[![Overleaf Support](https://img.shields.io/badge/Overleaf_%26_LaTeX-Supported-success?style=flat-square)](https://atscheck.tech/keywords/overleaf-latex-ats)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Privacy: 100% In-Browser](https://img.shields.io/badge/Privacy-100%25_In--Browser-059669?style=flat-square&logo=shield)](https://atscheck.tech/privacy)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Arnav20007/ats/pulls)

> **Free in-browser ATS resume score checker, job description keyword matcher, and formatting auditor.**
> Calculate your ATS readiness score (out of 100), audit selectable text layers (PDF, DOCX, Overleaf, LaTeX), and format bullets with the Google X-Y-Z formula. 100% client-side privacy with zero server uploads.

🌐 **Production Web App**: [https://atscheck.tech](https://atscheck.tech)  
🎯 **ATS Resume Score Calculator**: [https://atscheck.tech/checker](https://atscheck.tech/checker)  
🔍 **Job Description Keyword Matcher**: [https://atscheck.tech/matcher](https://atscheck.tech/matcher)  
✍️ **Google X-Y-Z Bullet Point Rewriter**: [https://atscheck.tech/rewriter](https://atscheck.tech/rewriter)  
📋 **Workday ATS PDF Formatting Audit**: [https://atscheck.tech/audit](https://atscheck.tech/audit)  
🎓 **Selected Students ATS Templates**: [https://atscheck.tech/templates](https://atscheck.tech/templates)  
🔑 **Role Keywords Directory (30 Guides)**: [https://atscheck.tech/keywords](https://atscheck.tech/keywords)  
📦 **Source Code Repository**: [https://github.com/Arnav20007/ats](https://github.com/Arnav20007/ats)  

---

## 🎯 Campus Placements & Off-Campus Hiring Guides

Tailored ATS screening benchmarks, recruiter checklists, and exact keywords for Indian engineering freshers and campus drives:

* [TCS NQT ATS Resume Keywords & Fresher Checklist (2026)](https://atscheck.tech/keywords/tcs-nqt) — Core CS keywords (Java, Python, OOP, DBMS) and iBegin ATS parser compliance.
* [Infosys Fresher ATS Resume Keywords & Format (2026)](https://atscheck.tech/keywords/infosys-fresher) — Infosys Springboard & GenC role benchmarks.
* [Accenture Placement Resume Keywords & ATS Checklist (2026)](https://atscheck.tech/keywords/accenture-fresher) — Accenture Associate Software Engineer screening criteria.
* [Cognizant GenC ATS Resume Keywords & Format (2026)](https://atscheck.tech/keywords/cognizant-fresher) — Cognizant GenC & Elevate fresher technical checklist.
* [Wipro Elite Fresher ATS Resume Checklist (2026)](https://atscheck.tech/keywords/wipro-fresher) — Wipro Elite National Talent Hunt resume standards.
* [B.Tech CSE Fresher ATS Resume Keywords & Format (2026)](https://atscheck.tech/keywords/btech-cse-fresher) — Academic projects, GitHub links, and GPA formatting.
* [BCA & MCA Placement ATS Resume Guide (2026)](https://atscheck.tech/keywords/bca-mca-fresher) — Full stack development and practical database project showcase.
* [Overleaf LaTeX ATS Resume Checker & Parser (2026)](https://atscheck.tech/keywords/overleaf-latex-ats) — Testing Jake's Resume and Deedy Resume single-column compliance.
* [Amazon SDE Fresher ATS Resume Keywords (2026)](https://atscheck.tech/keywords/amazon-sde) — Leadership principles, distributed systems, and AWS fundamentals.
* [Google SWE Intern ATS Resume Keywords (2026)](https://atscheck.tech/keywords/google-swe-intern) — Competitive programming, algorithmic problem solving, and metrics.

---

## ⚡ Key Capabilities

* **Document Structure & Formatting Review**:
  * Heading clarity, single-column flow, and font safety checks.
  * Measurable achievements density using the **Google X-Y-Z Formula** (`Accomplished [X] as measured by [Y], by doing [Z]`).
  * Repetition detector with 1-click contextual action verb diversification.
  * Punctuation, period consistency, and capitalization auto-formatter.
* **100% In-Browser Privacy Shield**:
  * Client-side PDF parsing using Web Workers and `pdfjs-dist`.
  * **0 bytes of candidate resume data are ever uploaded to any server or database.**
* **First-Class Technical Projects Support**:
  * Dedicated detection and formatting for students and freshers graduating 2024–2029.
  * No fake corporate employment forced into fresher resumes.
  * Editable project details, stack tags, metrics verification, and bullet rewrites.
* **Executive-Grade Single-Column PDF Export**:
  * Formatted with clean `Plus Jakarta Sans` and `JetBrains Mono` typography.
  * Strict `@page { size: letter portrait; margin: 12mm 15mm; }` with page-break protection.
* **Instant Plain Text (TXT) Export** for legacy clipboard ATS forms.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript
* **Styling**: Tailwind CSS v4, Framer Motion
* **Build Tool**: Vite 8
* **Document Processing**: `pdfjs-dist` (client-side text stream parser)
* **Hosting & CI/CD**: Vercel (Production) + GitHub Actions

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
