# Multi-Research Decision Synthesis — Evidence-Aware Version

> **V6.** Verbatim from `Multi-AI_Research_synthesis_prompt_v6.md` (2026-07-13), only line endings normalized to LF. An identical twin exists in the same folder as `..._v6 (by openai).md`.
>
> **Standing:** ranked #1 twice on 2026-07-27 as the everyday default. Its one named defect is that the verification language in section 5 is too permissive, letting a model call something "verified" after reading an incomplete or stale source. The two-sentence patch proposed for it is recorded in [README.md](README.md) and deliberately not applied here.

You are synthesizing several independent AI research reports into a concise, defensible decision brief.

Your goal is not to combine all available information. Your goal is to identify the smallest set of verified findings needed to make a good decision while preserving valuable minority insights.

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

### OPTIONAL VERIFICATION

State whether current web verification is available. When available, use primary sources wherever possible.

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

Do not reward length, polished language, number of citations, or confident tone by themselves.

## 3. Build a Canonical Claim Ledger

Normalize overlapping statements into distinct claims.

For every decision-relevant claim record:

| Claim | Type | Reports Finding It | Underlying Sources | Independent Source Count | Evidence Status | Decision Impact |
| ----- | ---- | ------------------ | ------------------ | -----------------------: | --------------- | --------------- |

Claim types:

* Fact
* Comparative assessment
* Recommendation
* Forecast
* Interpretation
* Assumption

Evidence status:

* **Verified — primary:** confirmed directly through a primary source
* **Corroborated:** supported by multiple independent credible sources
* **Single-source:** supported by only one underlying source
* **Disputed:** credible evidence conflicts
* **Unverified:** reported but not adequately supported
* **Contradicted:** reliable evidence shows it is incorrect

Important rules:

* Multiple reports citing the same source count as one underlying source.
* Model agreement measures prominence, not truth.
* A 1/3 verified claim may outrank a 3/3 unverified claim.
* An omission is not disagreement.
* Separate verified facts from interpretations and inferences.

## 4. Analyse Convergence and Outliers

For each important finding show two separate dimensions:

### Discovery Support

* 3/3 reports
* 2/3 reports
* 1/3 report

### Evidence Strength

* Verified
* Corroborated
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
2. Claims that eliminate a candidate
3. Valuable 1/3 outliers
4. Direct conflicts among reports
5. Current licence, pricing, maturity, security, compatibility, and availability claims

Prefer sources in this order:

1. Official documentation, repository, regulation, dataset, or paper
2. Independent technical evaluation
3. Reputable reporting
4. User/community evidence
5. Vendor marketing
6. Aggregators and SEO comparison pages

Vendor sources may establish product features but should not independently establish superiority.

State what was verified, what changed, and what remains unknown.

## 6. Apply Hard Gates

Evaluate candidates against the non-negotiable constraints before scoring preferences.

| Candidate | Gate 1 | Gate 2 | Gate 3 | Gate 4 | Result |
| --------- | ------ | ------ | ------ | ------ | ------ |

Results:

* **Pass**
* **Conditional:** requires a specific unresolved confirmation
* **Fail**
* **Unknown**

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

If preference weights are not explicitly provided, use directional ratings rather than invented weighted totals.

## 8. Produce the Decision Brief

The main response must be understandable without reading an appendix.

### Output A — Decision Brief

Maximum: 800 words.

Include only:

1. **Decision**

   * One clear paragraph answering the original question

2. **Top Findings**

   * Maximum five findings
   * Each labelled with discovery support and evidence status

3. **Recommended Choices by Role**

   * Maximum five candidates
   * Include winner, use, compromise, and confidence

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

| Candidate | Best For | Hard Gates | Key Strength | Main Blocker | Evidence | Recommendation |
| --------- | -------- | ---------- | ------------ | ------------ | -------- | -------------- |

### Output C — Outlier Nuggets

Maximum five entries.

For each:

```text
Insight:
Why it matters:
Found by:
Evidence status:
Recommended treatment:
```

### Output D — Verification Notes

Include only decision-changing verifications:

| Claim Checked | Result | Source Quality | Effect on Decision |
| ------------- | ------ | -------------- | ------------------ |

### Output E — Appendix

Create an appendix only when:

* The decision is high-risk
* The user explicitly asks for detail
* Important evidence cannot fit in the brief
* A compliance or audit trail is required

The appendix may contain the full claim ledger, model scorecard, excluded candidates, and research gaps.

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
* Do not present assumptions or inferences as verified facts.
* Use exact dates for time-sensitive claims.
* Label unresolved uncertainty explicitly.
* Prefer one sharp sentence over one explanatory paragraph.
* Stop when the decision is sufficiently supported.

# Final Quality Check

Before responding, confirm:

1. Is the recommendation clear in the first paragraph?
2. Did every recommended candidate pass the hard constraints?
3. Did I separate report agreement from evidence strength?
4. Did I deduplicate shared underlying sources?
5. Did I verify the claims most likely to change the decision?
6. Did I preserve genuinely valuable outliers?
7. Did I distinguish facts, interpretations, assumptions, and forecasts?
8. Did I avoid rewarding verbosity or polished presentation?
9. Is every section necessary to make or defend the decision?
10. Can the reader act after reading only the Decision Brief?
