# Multi-Research Decision Synthesis — Verification-Hardened Version

> **V7.** Verbatim from `Multi-AI_Research_synthesis_prompt_v7.md` (2026-07-13), only line endings normalized to LF.
>
> **Standing:** best evidence discipline of any version (9.5/10) and worst readability (5.5). Roughly twice V6's size. Use for defend mode only: when the recommendation goes to security, legal, procurement, architecture governance, or a client executive, and a wrong licence or security claim would be costly. Its recorded failure is that the verification machinery surfaces in the output and the model complies with the reporting structure instead of prioritizing the decision.

You are synthesizing several independent AI research reports into a concise, defensible decision brief.

Your goal is not to combine all available information. Your goal is to identify the smallest set of verified findings needed to make a good decision while preserving valuable minority insights.

A polished answer is not sufficient. Every decision-changing claim must be traceable to evidence that actually supports the precise claim being made.

## Inputs

### RESEARCH TASK

[Original question or decision]

### DECISION CONTEXT

[Who will use the result, why the decision matters, and the intended outcome]

### HARD CONSTRAINTS

Requirements that cannot be compensated for by strengths elsewhere.

Examples:

* Security and data residency
* Licence restrictions
* Budget ceiling
* Deployment environment
* Required capabilities
* Regulatory constraints
* Required delivery date

### PREFERENCES

Desirable but negotiable characteristics, in priority order.

### REPORT A

[Full report]

### REPORT B

[Full report]

### REPORT C

[Full report]

### VERIFICATION MODE

State one:

* **Current web verification available**
* **Only supplied sources available**
* **No external verification available**

When current verification is available, open and inspect the underlying source. Search-result snippets, AI summaries, and another report's characterization of a source do not count as verification.

---

# Analysis Method

## 1. Decompose the Decision

Convert the research task into 3–7 decision questions.

Examples:

* What must a viable solution provide?
* Which candidates pass all non-negotiable constraints?
* Which candidate best fits each major usage role?
* What claims could materially change the recommendation?
* What is the cheapest reliable way to validate the recommendation?

Do not introduce evaluation dimensions unrelated to the original task.

## 2. Evaluate Task Adherence

Evaluate Reports A, B, and C anonymously.

For each report identify:

* Directness
* Coverage of requested constraints
* Evidence quality
* Actionability
* Important omissions
* Unsupported certainty
* Unnecessary material

Use High / Medium / Low rather than arbitrary numeric precision.

Do not reward length, polished language, number of citations, popularity metrics, or confident tone by themselves.

## 3. Build a Canonical Claim Ledger

Normalize overlapping statements into distinct claims.

For every decision-relevant claim record:

| Claim | Claim Class | Reports Finding It | Underlying Sources | Independent Source Count | Evidence Status | Decision Impact |
| ----- | ----------- | ------------------ | ------------------ | -----------------------: | --------------- | --------------- |

Claim classes:

* **Verified fact:** a directly observable statement supported by the cited source
* **Comparative claim:** one option is better, faster, safer, more mature, or otherwise superior to another
* **Interpretation:** a reasoned reading of verified facts
* **Inference:** a conclusion that extends beyond what the source states directly
* **Recommendation:** an action proposed from facts, preferences, and trade-offs
* **Forecast:** a claim about likely future behaviour
* **Assumption:** an unverified condition used to continue the analysis

Evidence status:

* **Verified — primary:** directly confirmed in the authoritative source
* **Corroborated — independent:** supported by at least two genuinely independent credible sources
* **Published product-team evidence:** documented or benchmarked by the product's own authors or vendor
* **Single-source:** supported by one non-authoritative or non-independent source
* **Disputed:** credible sources materially conflict
* **Unverified:** reported but not adequately supported
* **Contradicted:** reliable evidence shows the claim is incorrect
* **Stale:** previously true, but current status could not be confirmed

Important rules:

* Multiple reports citing the same underlying source count as one source.
* Multiple vendor-controlled pages count as one source family, not independent corroboration.
* Model agreement measures prominence, not truth.
* A 1/3 verified claim may outrank a 3/3 unverified claim.
* An omission is not disagreement.
* Product existence or feature support does not establish quality, superiority, security approval, operational fitness, or maintenance continuity.
* A product-team paper or benchmark is primary evidence for what was tested, but it is not independent validation of superiority.
* Separate verified facts from interpretations and inferences in both analysis and output.

## 4. Analyse Convergence and Outliers

For each important finding show two separate dimensions:

### Discovery Support

* 3/3 reports
* 2/3 reports
* 1/3 report

### Evidence Strength

* Verified — primary
* Corroborated — independent
* Published product-team evidence
* Weak
* Disputed
* Unknown

Preserve unique insights only when at least one condition applies:

* They could materially change the decision.
* They expose a hidden risk.
* They introduce a meaningfully different solution category.
* They suggest a low-cost experiment.
* They are supported by unusually strong evidence.

Do not preserve unique observations merely because they are different.

## 5. Verify Decision-Changing Claims

When external verification is available, verify only the highest-value claims:

1. Claims supporting the leading recommendation
2. Claims that eliminate or materially demote a candidate
3. Valuable 1/3 outliers
4. Direct conflicts among reports
5. Current licence, pricing, maturity, security, compatibility, configuration, maintenance, and availability claims
6. Comparative claims that materially affect ranking

Prefer sources in this order:

1. Official documentation, repository, regulation, dataset, standards text, or original paper
2. Independent technical evaluation with disclosed methodology
3. Reputable reporting
4. User/community evidence with reproducible details
5. Vendor marketing
6. Aggregators and SEO comparison pages

Vendor sources may establish their own features, configuration, licence, release, or benchmark methodology. They must not independently establish general superiority, production quality, security, or customer outcomes.

### 5.1 Verification Integrity Rules

For every decision-changing verification:

1. Open the underlying source yourself. Do not rely on another AI report's paraphrase, a search-result snippet, or an aggregator.
2. Record the exact claim being checked before reading the source.
3. Identify the exact passage, table, configuration line, licence clause, release entry, or dataset result that supports it.
4. State what the source establishes.
5. State what the source does **not** establish.
6. Record any material caveat, scope condition, methodology limitation, or conflicting evidence.
7. Re-check the claim after drafting the recommendation to ensure the wording did not become broader or stronger.

If the full source cannot be inspected, label the claim **Unverified** or **Single-source**. Do not upgrade it because multiple reports repeated it.

### 5.2 Comparative-Claim Rules

Never label a comparison as verified unless the cited evidence explicitly evaluates every named option under a relevant and reasonably comparable method.

Examples:

* A benchmark against Product X does not prove superiority over Products Y and Z.
* A feature matrix written by Vendor A does not prove Vendor A is better than its competitors.
* A successful test on small repositories does not establish large-repository performance.
* A single issue report establishes that a failure occurred, not its prevalence or a universal size threshold.
* Popularity, star count, download count, funding, or customer logos do not establish technical quality.

When a comparison is based on interpretation rather than direct evaluation, label it **Inference** and explain the reasoning briefly.

### 5.3 Version and Time Pinning

For claims that may change over time—especially repository configuration, licences, releases, defaults, pricing, APIs, product status, and maintenance activity—record:

* Source owner and document or repository name
* Exact page, file, or release inspected
* Branch, tag, version, or commit SHA when available
* Exact verification date

Prefer immutable or version-pinned references. A mutable `main` branch may be used for current-state claims only when the verification date is stated.

Do not present an older configuration, archived page, fork, translated mirror, package copy, or third-party deployment example as the current official default.

### 5.4 Fact, Interpretation, and Inference Discipline

Use these labels internally and expose them when the distinction matters:

```text
VERIFIED FACT: What the source states or directly demonstrates.
INTERPRETATION: What the verified facts plausibly mean.
INFERENCE: A conclusion extending beyond the direct evidence.
UNKNOWN: What remains unresolved.
```

Examples:

```text
VERIFIED FACT: The same organization maintains two active repositories.
INFERENCE: Maintainer attention may be divided.
NOT ESTABLISHED: The older repository is abandoned or will be discontinued.
```

```text
VERIFIED FACT: A plugin reuses an existing coding-agent runtime.
INFERENCE: Deployment overhead may be lower than a standalone service.
NOT ESTABLISHED: No additional security, supply-chain, privacy, or egress review is required.
```

Do not convert a reasonable inference into a verified fact merely because it sounds likely.

### 5.5 Security and Privacy Claim Rules

Do not reduce security to a single control such as self-hosting or model location.

For security-sensitive recommendations, distinguish at minimum:

* Repository credential handling
* Code and prompt egress
* Generation-model endpoint
* Embedding-model endpoint
* Telemetry, analytics, crash reporting, and update checks
* External assets or runtime dependencies
* Storage of embeddings, indexes, graphs, generated documentation, and chat history
* Authentication, authorization, and tenant isolation
* Secret scanning and prompt filtering
* Software supply-chain and plugin review

A locally hosted application calling an external model is not fully local. Conversely, reuse of an approved model path does not automatically approve a new plugin or application.

### 5.6 Benchmark and Research-Evidence Rules

For every benchmark or paper used to rank candidates, record:

* Who conducted the evaluation
* Which exact systems were compared
* Dataset or repository sample
* Scale and representativeness
* Metrics and judging method
* Model versions and configurations
* Whether the benchmark was independently reproduced
* Important limitations, including LLM-as-judge or author-created evaluation criteria

Use these labels:

* **Independent replicated evidence**
* **Independent published evidence**
* **Product-team published evidence**
* **Vendor marketing claim**

Do not describe product-team research as “third-party evidence.”

### 5.7 Contradiction and Staleness Check

Before finalizing a decision-changing claim:

1. Search for current contradictory evidence.
2. Check whether the source is current and canonical.
3. Prefer the newest authoritative source for current-state facts.
4. If authoritative sources disagree, report the conflict rather than selecting one silently.
5. If a claim was historically true but current status is uncertain, label it **Stale**, not **Verified**.

State what was verified, what changed, and what remains unknown.

## 6. Apply Hard Gates

Evaluate candidates against the non-negotiable constraints before scoring preferences.

| Candidate | Gate 1 | Gate 2 | Gate 3 | Gate 4 | Result | Evidence |
| --------- | ------ | ------ | ------ | ------ | ------ | -------- |

Results:

* **Pass:** supported by current evidence
* **Conditional:** requires a specific unresolved confirmation
* **Fail:** current evidence shows the constraint is not met
* **Unknown:** insufficient evidence to decide

Do not convert **Unknown** into **Pass**.

Do not average away a failed hard constraint.

Only candidates that pass—or have clearly resolvable conditional status—proceed to comparative ranking.

## 7. Rank by Usage Role

Do not force one universal winner when candidates solve different jobs.

Where applicable, identify:

* Best overall
* Best for a specific user or workflow
* Best low-complexity option
* Best enterprise/platform option
* Best technically advanced option
* Best complementary tool
* Worth watching
* Not recommended for this use case

For every recommended candidate state:

* Best use
* Why it wins
* Main compromise
* Who should not choose it
* Evidence confidence
* What would change the recommendation

A candidate must not be called a winner solely because it is the cheapest experiment. Distinguish:

* **Recommended for immediate trial**
* **Recommended for production adoption**
* **Recommended for further validation**

If preference weights are not explicitly provided, use directional ratings rather than invented weighted totals.

## 8. Produce the Decision Brief

The main response must be understandable without reading an appendix.

### Output A — Decision Brief

Maximum: 800 words.

Include only:

1. **Decision**

   * One clear paragraph answering the original question
   * Distinguish immediate trial from production recommendation

2. **Top Findings**

   * Maximum five findings
   * Each labelled with discovery support and evidence status
   * Clearly mark any material interpretation or inference

3. **Recommended Choices by Role**

   * Maximum five candidates
   * Include winner, use, compromise, confidence, and adoption status

4. **Do Now**

   * Maximum three concrete actions

5. **Do Not Do**

   * Maximum three avoidable mistakes

6. **Critical Unknown**

   * The one unresolved issue most likely to change the decision

7. **What Would Change My Mind**

   * Explicit evidence or test result that would alter the recommendation

### Output B — Compact Comparison

Maximum:

* Seven candidates
* Eight columns
* One sentence per cell
* No repeated prose from Output A

Suggested columns:

| Candidate | Best For | Hard Gates | Key Strength | Main Blocker | Evidence | Adoption Status | Recommendation |
| --------- | -------- | ---------- | ------------ | ------------ | -------- | --------------- | -------------- |

### Output C — Outlier Nuggets

Maximum five entries.

For each:

```text
Insight:
Why it matters:
Found by:
Claim class:
Evidence status:
Recommended treatment:
```

### Output D — Verification Notes

Include only decision-changing verifications:

| Exact Claim Checked | Result | Source and Version | Evidence Class | Source Establishes | Source Does Not Establish | Effect on Decision |
| ------------------- | ------ | ------------------ | -------------- | ------------------ | ------------------------- | ------------------ |

For time-sensitive sources, include the verification date and branch, tag, release, or commit SHA when available.

### Output E — Appendix

Create an appendix only when:

* The decision is high-risk
* The user explicitly asks for detail
* Important evidence cannot fit in the brief
* A compliance or audit trail is required

The appendix may contain the full claim ledger, exact source excerpts, model scorecard, excluded candidates, benchmark details, and unresolved research gaps.

---

# Compression Rules

* Lead with the answer.
* Do not repeat a finding in multiple sections.
* Do not include background history unless it changes the decision.
* Do not write generic market commentary.
* Do not create a roadmap when three immediate actions are sufficient.
* Do not assign model personalities based on one run.
* Do not treat citation quantity as evidence quality.
* Do not use popularity metrics as proof of product quality.
* Do not present assumptions, interpretations, or inferences as verified facts.
* Do not use “verified,” “confirmed,” “proven,” “best,” or “secure” more broadly than the source supports.
* Do not describe product-team benchmarks as independent evidence.
* Do not infer enterprise approval from self-hostability or local execution.
* Use exact dates for time-sensitive claims.
* Pin mutable technical sources to a version or state the verification date.
* Label unresolved uncertainty explicitly.
* Prefer one sharp sentence over one explanatory paragraph.
* Stop when the decision is sufficiently supported.

# Final Quality Check

Before responding, confirm:

1. Is the recommendation clear in the first paragraph?
2. Did every recommended candidate pass the hard constraints, or is its conditional status explicit?
3. Did I separate report agreement from evidence strength?
4. Did I deduplicate shared underlying sources and vendor-controlled source families?
5. Did I independently open and inspect the sources behind decision-changing claims?
6. Does every comparative claim explicitly match the systems and conditions actually evaluated?
7. Did I record source version, commit, release, or verification date for mutable claims?
8. Did I state what each important source does **not** establish?
9. Did I distinguish verified facts, interpretations, inferences, assumptions, and forecasts?
10. Did I avoid treating product-team research as independent validation?
11. Did I search for contradictory or newer authoritative evidence?
12. Did I re-check every claim that changed a ranking, hard gate, or recommendation after drafting?
13. Did I preserve genuinely valuable outliers without promoting novelty alone?
14. Did I distinguish a low-cost trial from a production adoption recommendation?
15. Did I avoid rewarding verbosity, polished presentation, citation volume, or popularity?
16. Is every section necessary to make or defend the decision?
17. Can the reader act after reading only the Decision Brief?

If any answer is no, revise before finalizing.
