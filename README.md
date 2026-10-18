# ToolForge — Free ATS Resume Score Checker & Keyword Matcher

[![Live Demo](https://img.shields.io/badge/Live_Site-toolforge--ats.vercel.app-emerald?style=flat-square&logo=vercel)](https://toolforge-ats.vercel.app)
[![ATS Score](https://img.shields.io/badge/ATS_Score-Free_Checker-blue?style=flat-square)](https://toolforge-ats.vercel.app)
[![Overleaf Support](https://img.shields.io/badge/Overleaf_%26_LaTeX-Supported-success?style=flat-square)](https://toolforge-ats.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Privacy: 100% In-Browser](https://img.shields.io/badge/Privacy-100%25_In--Browser-059669?style=flat-square&logo=shield)](https://toolforge-ats.vercel.app/privacy)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Arnav20007/ats/pulls)

> **Free in-browser ATS resume score checker, job description keyword matcher, and formatting auditor.**
> Calculate your ATS readiness score (out of 100), audit selectable text layers (PDF, DOCX, Overleaf, LaTeX), and format bullets with the Google X-Y-Z formula. 100% client-side privacy with zero server uploads.

🌐 **Live Website**: [https://toolforge-ats.vercel.app](https://toolforge-ats.vercel.app)  
🔑 **Role Keywords Checklist**: [https://toolforge-ats.vercel.app/keywords](https://toolforge-ats.vercel.app/keywords)  
📦 **Repository**: [https://github.com/Arnav20007/ats](https://github.com/Arnav20007/ats)  
🚀 **Launch & Backlink Kit**: [docs/LAUNCH_AND_BACKLINKS.md](docs/LAUNCH_AND_BACKLINKS.md)  


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
