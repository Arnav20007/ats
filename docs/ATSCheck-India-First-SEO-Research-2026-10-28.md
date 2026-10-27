# ATSCheck India-First SEO Research

**Research date:** 2026-10-28
**Scope:** Public SERP and competitor research, live-route technical inspection, a preliminary keyword-to-page/action map, and SEO-only source/content changes. No visual styling, layout, deployment, or Search Console account changes were made.
**Data status:** Search Console Performance ZIP received and reviewed. It covers the last three months and Web search, but has no India country filter. A Page indexing issue export was also received for “Discovered - currently not indexed”; the Sitemaps processing report and full reason totals remain unavailable. Anything about broad search demand below is still a hypothesis from public SERP evidence, not measured market-wide volume.

## SEO-only implementation update — 2026-10-28

The following SEO/content fixes are prepared in the local working tree and are not deployed yet:

- Updated route titles and descriptions for the main checker, templates, resume builder, matcher, bullet rewriter, formatting audit, technical guide, and privacy policy. The home and checker metadata now align more closely with the small GSC query sample without implying a proprietary ATS score.
- Replaced unsupported named-employer selection, vendor-compatibility, parser-guarantee, hiring-outcome, and fabricated research-statistic claims in visible copy and role profiles. Sample resume content is labeled fictional/illustrative and readers are told to use only verified results.
- Corrected privacy statements to distinguish browser-side resume processing from Google Analytics, Google AdSense, Google Fonts, and the optional QR request.
- Removed fabricated FAQ structured data and made prerendered and client-side route schemas consistent. Added Adobe references to OCR accuracy review and PDF reading order on the technical guide.
- Updated RSS generation so ordinary page entries are not marked as newly published on every build. Updated `lastmod` on the 45 sitemap URLs after the sitewide content revisions.
- Updated the public README, `llms.txt`, and PWA manifest claims. `npm run lint`, `npm run build`, RSS generation, and route prerender completed successfully; all 45 route entries were checked for a nonempty prerendered body, exactly one H1, and the expected canonical. RSS and sitemap XML both parse. Deployment and a post-deployment crawl are not included in this local change pass.
- Fixed the pre-existing undefined modal-state setter in `ResumeStudio.tsx` with the matching existing state setter. No layout or style changed.

Search result positions, clicks, and indexing are unchanged until these source changes are deployed and recrawled. The Page Indexing and Sitemaps exports are still needed to diagnose the other URLs that were not indexed.

## Executive summary

- The live sitemap contains 45 URLs. All 45 returned HTTP 200 in this review. Each had a prerendered body, exactly one H1, a unique title and description, a canonical matching its URL, and no `noindex` in the initial HTML. No duplicate title or canonical was found. This verifies the earlier empty-React-root concern is resolved for the currently submitted URLs.
- The Search Console screenshot reports five indexed pages, last crawled October 22. It does not show the exclusion reasons/statuses for the other sitemap URLs. Google says sitemaps are hints and do not guarantee indexing or ranking; new URLs can take time. Do not repeatedly resubmit an unchanged sitemap.
- The 2026-10-28 Page indexing export lists 24 URLs under **Discovered - currently not indexed**, including the builder, contact, guide, keyword hub/profile pages, privacy, and terms. Each row is marked `Pending`; `1970-01-01` is an empty-date placeholder, not an actual crawl date. Google defines this state as discovered but not crawled yet, so it is not evidence that Google crawled and rejected those pages. The supplied export does not include the complete indexed/not-indexed totals or Sitemaps processing details.
- The uploaded Performance ZIP contains six query rows (nine listed impressions), three page rows (13 listed impressions), five country rows (12 listed impressions), and one device row (12 listed impressions). Every listed row has zero clicks. `/checker` has 11 listed impressions at average position 75; India has eight impressions at average position 80.75. The sample is far too small and positions too low to diagnose snippets or claim demand.
- **At the time of the live audit, factual inconsistencies were the highest priority.** The SEO-only implementation update above removes the stale `/research` metadata/schema/feed claims and rewrites other employer/ATS compatibility, hiring-outcome, and sample-project statements that lacked support. The live site will retain the old copy until deployment and recrawl.
- Current public results suggest the category is crowded: “free,” “no signup,” “private/in-browser,” score checks, parsed-text visibility, and job-description keyword gaps are already common claims. ATSCheck should compete on demonstrable output and transparent limitations, not on those generic claims alone.
- Exact monthly search volumes and the queries that brought users to ATSCheck are unknown. The GSC exports are necessary to prioritize existing exposure. A Keyword Planner export is optional if exact third-party volume estimates are required.

## Search intent and preliminary keyword map

These are candidate query families to test against the small GSC sample and Keyword Planner, not claims that a particular term has a particular volume. Public SERPs repeatedly show free/no-signup checker, actual parser output, missing job-description keywords, résumé score, and fresher-specific needs. Search snippets and competitor copy do not establish exact demand. The only GSC queries in the current export are listed in the measured-data section below.

| Search intent | Candidate queries / variants | Best-fit URL | Preliminary action |
|---|---|---|---|
| Check overall résumé readability | free ATS resume checker; ATS resume checker online; check if resume is ATS friendly | `/` | Keep as the main checker landing page; clearly call the score a heuristic. |
| Get a general score and fixes | ATS resume score checker; resume score checker free; ATS score for freshers | `/checker` | Keep distinct from the home page by explaining the score rubric and result, not repeating the same generic landing copy. |
| Compare a résumé with a job ad | resume keyword matcher; compare resume to job description; missing keywords in resume | `/matcher` | Keep; make the job description input and exact gap output the page’s primary intent. |
| Create a résumé | free ATS resume builder; single-column resume builder | `/builder` | Keep; distinguish creation/export from checking. |
| Find résumé layouts | ATS resume templates free; fresher resume template PDF | `/templates` | Keep, but remove unsubstantiated employer-hiring and ATS-compliance claims. |
| Improve bullets | resume bullet point rewriter; Google X-Y-Z resume bullet formula | `/rewriter` | Keep; examples must not invent personal metrics. |
| Understand file/layout risks | ATS resume format checker; test PDF resume parser; ATS resume formatting audit | `/audit` | Keep as general-format review; avoid implying a Workday or other employer-system certification. |
| Learn how parsing works | how ATS reads resume; resume parser test; PDF text extraction resume | `/guide`, `/research` | Keep both only with distinct purposes: practical candidate guide vs sourced technical explanation. Remove fabricated study framing from `/research`. |
| Compare with a product | free Enhancv alternative; Enhancv alternative no paywall | `/vs/enhancv-alternative` | Keep only as a dated, sourced, fair comparison. Do not claim competitor architecture or outcomes without evidence. |
| Browse job-role terms | software engineer resume keywords; product manager resume skills; data analyst resume keywords; etc. | `/keywords` plus the 20 general-role URLs below | Keep the hub and role pages where their checklists/examples add real role-specific value. Let GSC overlap decide consolidation. |
| India campus/fresher | fresher ATS resume checker; fresher resume format; TCS NQT resume keywords; Infosys fresher resume | `/checker` plus company/education-specific URLs below | India-first opportunity hypothesis. Ground current hiring guidance in dated public job postings or official program material. |
| Hindi/Hinglish phrasing | resume ka ATS score kaise check kare; ATS friendly resume kaise banaye; fresher resume format Hindi | No dedicated route yet | Public search snippets provide weak signals only. Do not create Hindi pages until GSC/Planner and product-language readiness support them. |

### Full sitemap URL intent/action map

“Keep” is a provisional content decision, not an instruction to index a page regardless of GSC evidence. Privacy/terms/contact routes are trust/support pages, not acquisition pages. Role pages should be retained where the information is correct, useful, and demonstrably distinct; no route should be consolidated solely because its words overlap a template.

| URL | Intended query intent | Preliminary action |
|---|---|---|
| `/` | Free ATS résumé checker | Keep as primary product landing page. |
| `/templates` | Free ATS-friendly résumé templates | Keep; remove unverified hiring/vendor claims. |
| `/builder` | Free single-column ATS résumé builder | Keep; emphasize builder workflow. |
| `/checker` | ATS résumé score calculator/checker for freshers and professionals | Keep; explain score limits and rubric. |
| `/matcher` | Match résumé keywords to job description | Keep; show exact matched/missing-term workflow. |
| `/rewriter` | Résumé bullet rewriter / X-Y-Z formula | Keep; never add invented metrics. |
| `/audit` | Résumé PDF formatting/readability audit | Keep with vendor-neutral wording unless a reproducible vendor test exists. |
| `/research` | Technical explanation of résumé parsing | Keep as technical guide only; remove old empirical study metadata/schema/feed claims. |
| `/vs/enhancv-alternative` | Enhancv alternative comparison | Keep only after factual, sourced comparison and non-guarantee wording. |
| `/guide` | ATS résumé formatting and optimization guide | Keep; cite primary/credible sources and state uncertainty. |
| `/about` | ATSCheck/about and creator trust lookup | Keep; source claims about method and experience. |
| `/contact` | Contact/support | Keep for users; not a major keyword target. |
| `/privacy` | ATSCheck privacy policy | Keep; fix remaining ToolForge brand reference and ensure claims match actual network/storage behavior. |
| `/terms` | ATSCheck terms of use | Keep; make score and outcome limitations clear. |
| `/keywords` | ATS résumé keywords by role hub | Keep as directory and route users to useful role profiles. |
| `/keywords/software-engineer` | Software engineer résumé keywords/skills | Keep; validate terms against current job descriptions. |
| `/keywords/product-manager` | Product manager résumé keywords/skills | Keep; distinguish product, analytics, and delivery responsibilities. |
| `/keywords/data-scientist` | Data scientist/ML résumé keywords | Keep; distinguish by seniority and job specialization. |
| `/keywords/devops-engineer` | DevOps/SRE résumé keywords | Keep; source cloud/platform terminology from current postings. |
| `/keywords/full-stack-developer` | Full-stack developer résumé keywords | Keep; distinguish from frontend/backend pages. |
| `/keywords/frontend-developer` | Frontend developer résumé keywords | Keep; validate framework/version and accessibility terms. |
| `/keywords/data-analyst` | Data analyst résumé keywords | Keep; distinguish from data scientist and business analyst. |
| `/keywords/cybersecurity-analyst` | Cybersecurity analyst résumé keywords | Keep; source certifications and security frameworks. |
| `/keywords/cloud-architect` | Cloud architect résumé keywords | Keep; validate cloud and architecture scope by seniority. |
| `/keywords/qa-automation-engineer` | QA automation/SDET résumé keywords | Keep; distinguish manual QA, automation, and SDET. |
| `/keywords/mobile-developer` | iOS/Android résumé keywords | Keep; separate platform-specific skills. |
| `/keywords/ui-ux-designer` | UI/UX and product designer résumé keywords | Keep; clarify role overlap without treating titles as interchangeable. |
| `/keywords/engineering-manager` | Engineering manager résumé keywords | Keep; focus on leadership, delivery, and team scope. |
| `/keywords/scrum-master` | Scrum Master/Agile Coach résumé keywords | Keep; avoid claiming a single universal hiring checklist. |
| `/keywords/systems-administrator` | Systems administrator résumé keywords | Keep; use current infra/tooling evidence. |
| `/keywords/business-analyst` | Business analyst résumé keywords | Keep; distinguish technical and domain BA. |
| `/keywords/financial-analyst` | Financial analyst/FP&A résumé keywords | Keep; validate financial tools and reporting terms. |
| `/keywords/blockchain-developer` | Blockchain/Web3 developer résumé keywords | Keep only if the guide has maintained, role-specific substance. |
| `/keywords/marketing-manager` | Growth/marketing manager résumé keywords | Keep; distinguish performance marketing from brand/content. |
| `/keywords/ai-engineer` | AI/LLM engineer résumé keywords | Keep; maintain current ML/LLM skill terminology. |
| `/keywords/tcs-nqt` | TCS NQT/fresher résumé preparation | Keep only with current, official TCS sourcing; label all sample résumé bullets fictional. |
| `/keywords/infosys-fresher` | Infosys fresher résumé/placement preparation | Keep only with dated, official role/program sources. |
| `/keywords/accenture-fresher` | Accenture fresher résumé/role preparation | Keep only with dated role sources; no proprietary ATS claims. |
| `/keywords/cognizant-fresher` | Cognizant GenC résumé/placement preparation | Keep only with dated role sources. |
| `/keywords/wipro-fresher` | Wipro fresher résumé/placement preparation | Keep only with dated role sources. |
| `/keywords/amazon-sde` | Amazon SDE résumé keywords | Keep as general role guidance; don’t imply Amazon endorsement or employer ATS access. |
| `/keywords/google-swe-intern` | Google SWE intern résumé keywords | Keep as general internship guidance; don’t imply Google endorsement or screening knowledge. |
| `/keywords/btech-cse-fresher` | B.Tech CSE fresher résumé format/skills | Keep; make examples illustrative and adaptable. |
| `/keywords/bca-mca-fresher` | BCA/MCA fresher résumé format/skills | Keep; use role-specific project examples. |
| `/keywords/overleaf-latex-ats` | LaTeX/Overleaf résumé parsing and format | Keep only with reproducible text-extraction tests; remove unsupported vendor-compliance and “95+” claims. |

There are 30 `/keywords/...` profile URLs in the submitted sitemap (20 general roles and 10 company, education, or format profiles), plus the `/keywords` hub. A simple 5-word-shingle overlap scan of the live main content found no role-page pair over 0.45 similarity. This is only a screening heuristic; it does not establish usefulness, accuracy, or search demand.

## Live technical and content findings

### Verified strengths

- All 45 sitemap URLs returned 200 and had initial HTML with a title, description, one H1, matching canonical, and prerendered text body. Titles and canonicals were unique in the checked set; no sitemap page had `noindex` in its initial HTML.
- Titles were 47–60 characters and descriptions mostly 135–160 characters; `/terms` description is notably short at 48 characters. Character count alone is not a ranking requirement; review snippet quality and pixel-width truncation in the actual SERP before editing.
- Live `robots.txt`, sitemap, RSS, and `llms.txt` returned 200. The public `site:atscheck.tech` search query returned no results in the search provider used for this pass, but this is not authoritative Google index evidence; GSC URL Inspection remains the source of truth.

### High-priority factual/trust cleanup

1. **`/research` and feed/schema:** Live metadata still says “10,000+ tech resumes,” “76% multi-column failure,” and its FAQ structured data says “4.2x higher interview shortlist rate.” `src/data/routeSeo.json`, `scripts/prerender-routes.mjs`, and the RSS item preserve these claims; live `/rss.xml` repeats the 10,000+/76% claims. The visible research page is now a technical guide, so all metadata, schema, RSS, and any generated artifacts must match that guide and remove unsupported statistics.
2. **Template vendor/employment claims:** `/templates` says templates were used by people hired at named companies and are “parser-compliant” for Workday, Greenhouse, Taleo, and Lever. No evidence supporting those claims was found in the inspected site materials. Replace with claims that can be demonstrated, or cite reproducible tests and describe their exact scope.
3. **Illustrative résumé examples:** `/keywords/tcs-nqt` includes a project bullet claiming “88% predictive accuracy across 10,000 agricultural soil records,” plus other quantified project examples. The numbers are not labeled fictional or placeholders. Mark every example as fictional/illustrative and tell candidates to use only their own verified results; preferably use editable `[measured result]` placeholders.
4. **LaTeX/vendor compatibility:** `/keywords/overleaf-latex-ats` advertises “Workday Compliant,” “Greenhouse Parsable,” “Taleo Readable,” and “ATS Score 95+.” No test methodology or evidence was found. Reword as general PDF text-extraction checks unless tests are reproducible and named vendors have authorized public test claims.
5. **Enhancv comparison:** The page’s H1 says “100% ATS Friendly.” Its comparison also characterizes Enhancv as multi-column-only, makes claims about competitor data being stored in a remote database, and says there is no campus-placement support. Those assertions are unsupported or conflict with Enhancv’s public first-party pages, which show both one- and two-column templates and describe a free seven-day period followed by paid access/download rules. The comparison should state the observation date, link first-party evidence for both products, and avoid implying ATS compatibility guarantees.
6. **Brand/Privacy:** The live `/privacy` body still says résumé text is not sent to “ToolForge servers.” Replace this brand remnant and re-check every privacy statement against actual browser storage, network requests, analytics, fonts, and optional third-party features.
7. **More claim sourcing:** The About and technical guide pages mention heuristics being based on named ATS vendors or describe proprietary parsing pipelines. Add citations for public sources and distinguish published general guidance from a test of an employer’s private system.

The current Enhancv page itself promotes ATS-compatibility claims; that is not independent evidence that ATSCheck or Enhancv passes every employer configuration. Treat vendor claims as attributed statements, not universal truth.

## Search Console Performance export

The ZIP’s `Filters.csv` shows **Search type: Web (text-based)** and **Date: Last 3 months**. It does not show a country filter, so the query rows cannot be attributed specifically to India. Search Console reports can omit anonymized queries, and dimensions can have different row totals; the CSVs do not include a chart-level total from which to reconcile every difference. Google also defines average position as an average across impressions, so these tiny samples should not be treated as stable rankings. See [Performance report dimensions and metrics](https://support.google.com/webmasters/answer/7576553?hl=en) and [Google’s explanation of position/click data](https://support.google.com/webmasters/answer/7042828?hl=en).

### Queries in the export

| Query | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| ats score | 0 | 4 | 0% | 95.75 |
| atscheck | 0 | 1 | 0% | 6 |
| resume worded | 0 | 1 | 0% | 10 |
| ats calculator | 0 | 1 | 0% | 79 |
| resume score calculator | 0 | 1 | 0% | 85 |
| resume calculator | 0 | 1 | 0% | 93 |

### Pages, countries and devices in the export

| Page | Clicks | Impressions | Average position |
|---|---:|---:|---:|
| `/checker` | 0 | 11 | 75 |
| `/` | 0 | 1 | 10 |
| `/about` | 0 | 1 | 15 |

| Country | Clicks | Impressions | Average position |
|---|---:|---:|---:|
| India | 0 | 8 | 80.75 |
| United States | 0 | 1 | 10 |
| Argentina | 0 | 1 | 15 |
| Thailand | 0 | 1 | 67 |
| Pakistan | 0 | 1 | 94 |

The device export lists desktop only (12 impressions, zero clicks). No reliable mobile-vs-desktop conclusion can be drawn from this sample.

### What this data supports—and does not

- It confirms that Google showed ATSCheck for a few relevant generic queries, mostly on `/checker`, but the average position for that page is deep in results. The “atscheck” branded query appeared once at position 6; that is not enough to infer a stable branded ranking.
- Zero clicks across these small rows is **not yet a meaningful CTR diagnosis**. Do not spend the first optimization pass rewriting titles for CTR; first fix factual/trust defects, strengthen the relevant page, and wait for more impressions/positions.
- India accounts for eight listed impressions, but the export cannot tell us which query caused those impressions. Re-export Queries and Pages with a country=India filter before making India-specific page/query decisions.
- The Queries table lists nine impressions while Pages lists 13 and Countries/Devices list 12. This may reflect anonymized-query omission or aggregation/reporting differences; the export alone cannot prove the exact cause. Google documents that anonymized queries are excluded from query tables.
- This dataset reports ATSCheck’s own impressions, not total search volume or all searches people make. For market demand estimates, use an optional Keyword Planner export and label its ranges/source.

## Public competitor/SERP review

This is a snapshot of public pages on 2026-10-28, not a hands-on test of their upload/scoring flows. Pricing and free-plan rules change, so comparisons need a “checked on” date.

| Competitor / source | Public positioning observed | Implication for ATSCheck |
|---|---|---|
| Naukri360 | Official checker positions free résumé score review, optional job description, parsing/keyword/formatting explanations, and fresher guidance. | “India-focused” and “score + advice” are not unique. Earn trust with transparent, testable checks and no false universal passing threshold. |
| InterviewSarthi / ApplySarthi | India-focused, browser-based résumé read, optional job description and explicit ATS-score limitations. | Direct competition on India + privacy + fresher intent. Differentiate through precise extraction evidence and a transparent rubric. |
| ResumeSquare | Publicly offers résumé structure plus writing-quality checks and exact fixes, with browser privacy language. | Competes on depth and specificity of feedback, not just the score. |
| CVScan | India-oriented checker markets role-specific checks, formatting, missing keywords, OCR and a low-cost optimized export. | File support and OCR are visible search differentiators; be exact about supported scan types and OCR error review. |
| Jobscan | Primarily positions résumé-to-job-description matching and match reports. | `/matcher` must provide a clearly useful JD gap workflow, not only generic profile keywords. |
| Teal | Its official help separates Resume Score from Job Match Score; basic analyzer issues are available on free plans and advanced issues are paid. | Be explicit that general résumé readiness and job-specific matching are separate measurements. |
| Enhancv | Its public pages show a résumé builder with single- and double-column templates, ATS checker, and free-period/paid-feature rules. | The existing comparison needs factual corrections and an observation date; avoid categorical claims about its layouts or data practices. |
| Other no-signup tools | Public pages including ATSResumeKit and Revquix emphasize no sign-up, privacy and visible parse output. | Free/no-account/privacy is table stakes in this competitor set. Demonstrable results, correct examples and trust are better differentiators. |

**Positioning opportunity:** “See what this file’s text extractor actually reads; understand each heuristic; compare against one real job description; keep the document local.” Only make the parser-output claim if the user can inspect extracted text clearly in the product, and explain that it is a diagnostic—not an employer ATS simulation or hiring prediction. India fresher guidance is a useful content cluster only when backed by current, official role requirements and original, clearly fictional examples.

## Remaining SEO action plan

| Priority | Action | Evidence of completion / measurement |
|---|---|---|
| P0 | Reconcile all sitemap URLs against Page indexing reasons and verify Sitemaps processing. The supplied export shows 24 discovered-but-not-crawled URLs but not the complete reason totals. | Export the Page indexing summary/reason totals and Sitemaps status; use URL Inspection for priority pages. |
| P1 | Complete the keyword-to-page map using the India-filtered GSC Queries and Pages exports. Current performance data is too small and is not filtered to India. | Map every measured query to one preferred URL; label public-SERP hypotheses separately from GSC evidence. |
| P1 | Add first-party research only when the method, sample, consent/privacy handling, limitations and data are real and publishable. `/research` is now positioned as an explanatory guide. | Publish methodology and evidence before reintroducing any numerical study claim. |
| P2 | Improve snippets only for URLs with meaningful impressions and low CTR, using actual query wording and visible page content. | Compare GSC CTR/impressions before and after over a sufficient period; Google may rewrite titles/snippets. |
| P2 | Earn relevant links through useful parser demonstrations, university/career-office resources, developer communities and genuine feedback. Avoid bulk directory/link promises or manufactured reviews. | Track qualified referral traffic, mentions and links; do not treat domain-rating promises as outcomes. |
| Ongoing | Keep sitemap `lastmod` tied to substantive page changes. The current sitewide metadata/content edits affected all 45 prerendered routes, so their `lastmod` values are set to 2026-10-28. | Future dates should change only when a route’s content is materially updated; check Sitemaps processing in GSC. |
| Ongoing | Review GSC monthly and revisit content quarterly or when product, ATS guidance, role requirements or competitor terms change. | Monthly query/page trend notes; quarterly page freshness and claim-source review. No ethical SEO plan can guarantee that no further work will ever be needed. |

## GSC data needed to finish measured prioritization

Still needed to complete the indexing diagnosis and India-filtered query map:

1. Search results Performance export: **Queries** tab, last 3 months, Search type **Web**, country **India** (clicks, impressions, CTR, position included).
2. Same filters, **Pages** tab.
3. The full Page indexing summary/reason totals (the supplied file contains one issue group and 24 URL examples), plus the Sitemaps report status for `https://atscheck.tech/sitemap.xml`.

Search Console reports show the queries that generated impressions for this property, not all searches people make. They can omit anonymized queries and group metrics differently. For global demand or exact search-volume estimates, also attach a Google Ads Keyword Planner export if available. Without it, this report will not invent volume numbers.

## Sources

### Google Search guidance

- [Search Console Performance report](https://support.google.com/webmasters/answer/7576553?hl=en) — query/page/country/device dimensions and clicks, impressions, CTR, position.
- [Google Search crawling and indexing FAQ](https://developers.google.com/search/help/crawling-index-faq) — indexing time is not guaranteed; sitemap submission does not guarantee indexing or ranking.
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) — sitemap is a hint; use Search Console to see processing issues.
- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) — rendering phases, prerender benefits, and canonical/title guidance.
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies) — original value, evidence, and scaled-content concerns.
- Adobe: [Recognize text in scanned PDFs](https://helpx.adobe.com/acrobat/desktop/create-documents/scan-documents-to-pdfs/recognize-text.html) and [Reading order in PDFs](https://helpx.adobe.com/acrobat/using/touch-reading-order-tool-pdfs.html) — source material linked from the updated technical guide.

### First-party competitor pages sampled

- [Naukri360 ATS Resume Checker](https://www.naukri.com/naukri360/ats-resume-checker)
- [InterviewSarthi ATS Resume Checker](https://interviewsarthi.com/apply/ats-resume-checker/)
- [ResumeSquare ATS Resume Checker](https://resumesquare.app/tools/ats-resume-checker)
- [CVScan Resume Checker](https://www.cvscan.in/free-resume-checker)
- [Teal Resume Analyzer help](https://help.tealhq.com/en/articles/9524748-using-the-resume-analyzer)
- [Enhancv pricing](https://enhancv.com/pricing/) and [Enhancv resume templates](https://enhancv.com/resume-templates/)
- [ATSResumeKit](https://atsresumekit.com/) and [Revquix ATS Resume Checker](https://www.revquix.com/tools/ats-resume-checker)
