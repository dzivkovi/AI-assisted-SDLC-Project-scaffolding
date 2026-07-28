# Multi-AI Research Synthesis v8 — Decision-First and Evidence-Aware

> **V8 (generic).** Verbatim from `Multi-AI_Research_synthesis_prompt_v8.md` (2026-07-13), only line endings normalized to LF. Confirmed clean: no trace of the DeepWiki topic it was developed against.
>
> **Standing:** ranked #2. Most readable output of the set. Its recorded failure mode is premature convergence on a cold start - the three-to-five claim verification budget plus the four-finding and four-candidate caps can suppress exactly the outliers the multi-agent method exists to surface. Use it when the landscape is already understood, or as a second-stage pass after V5 or V6.
>
> The task-specific V8 editions (the one that named Repowise and DeepWiki-Open, the one that protected Understand Anything) are deliberately not preserved. They were judged effective but anchored: they rewarded prior investment rather than letting evidence demote a candidate.

You are synthesizing several independent research reports into the shortest defensible decision.

Do not merge everything the reports contain. Identify what matters, verify the claims that could change the decision, preserve valuable minority findings, and produce an answer a busy professional can act on.

## Inputs

### RESEARCH TASK

[Original question or decision]

### DECISION CONTEXT

[Who will use the result, why it matters, and the intended outcome]

### HARD CONSTRAINTS

[Non-negotiable requirements. Leave blank if none were explicitly defined.]

### PREFERENCES

[Desirable but negotiable qualities, in priority order. Leave blank if unknown.]

### REPORTS

[Report A]

[Report B]

[Report C]

[Add more if available.]

### VERIFICATION

State whether current web verification is available.

---

## Core Principles

1. **Start with the actual decision.** Evaluate reports against the research task and decision context, not against how comprehensive or polished they appear.

2. **Agreement is a discovery signal, not proof.** Track how many reports found a claim separately from how well the claim is evidenced. A verified 1-of-3 insight may matter more than an unverified 3-of-3 consensus.

3. **Verify only decision-changing claims.** Check claims that support the leading recommendation, eliminate a candidate, resolve a conflict, or preserve a valuable outlier. Open the underlying source; do not rely on search snippets or another report’s summary.

4. **Match confidence to the evidence.**

   * Official sources can establish their own features, configuration, licence, releases, and documented limitations.
   * Vendor claims and product-team benchmarks do not independently establish superiority.
   * A comparison is supported only when the cited evaluation actually compared the named options under relevant conditions.
   * Distinguish **Fact**, **Interpretation**, **Inference**, and **Unknown**.
   * For changing facts such as licences, defaults, pricing, or releases, state the verification date or version.

5. **Use gates before preferences.** Apply only constraints explicitly supplied or logically unavoidable from the task. Label inferred constraints as assumptions. Treat configurable problems or unclear licence declarations as **Conditional**, not automatically as permanent failures. **Unknown is not Pass.**

6. **Recommend by role when necessary.** Do not force one universal winner if different options solve different jobs. Distinguish:

   * Best fit for the primary use case
   * Best complementary option
   * Recommended for trial
   * Recommended for production
   * Worth watching
   * Not recommended

7. **Keep the audit trail behind the answer.** Each major finding gets one primary home. Do not repeat the same explanation across the summary, table, verification notes, and appendix.

---

## Method

### 1. Frame the decision

Convert the task into three to five decision questions. Identify the stated hard constraints and preferences.

If those fields are blank:

* Infer only what is explicit or unavoidable.
* Label important assumptions.
* Use other dimensions as evaluation criteria, not hard gates.

### 2. Normalize the research

Combine duplicate claims and identify shared underlying sources. Multiple reports repeating the same vendor page count as one source family.

For each important claim track internally:

* Reports that found it
* Underlying source
* Evidence strength
* Whether it is Fact, Interpretation, Inference, or Unknown
* Effect on the decision

Do not print the full claim ledger unless requested.

### 3. Find convergence, conflicts, and outliers

Identify:

* High-value findings found by several reports
* Direct disagreements
* Unique findings that could change the decision
* Important issues every report missed

Do not preserve novelty merely because it is different.

### 4. Verify the decisive claims

Verify only the three to five claims most likely to affect the recommendation.

For each checked claim determine:

* What the source establishes
* What it does not establish
* Important scope or methodology limitations
* Whether newer or contradictory authoritative evidence exists

Security-sensitive products must be assessed beyond “self-hosted.” Consider model and embedding endpoints, code egress, credentials, telemetry, stored artifacts, access control, and supply-chain risk—but include only findings relevant to the decision.

### 5. Gate and rank

Apply confirmed hard constraints first. Then rank surviving candidates according to the user’s actual workflow and preferences.

Do not use stars, funding, citation count, or feature count as proof of quality.

Distinguish a cheap experiment from a production recommendation.

---

## Output

### A. Decision Brief

Maximum 800 words.

Include:

#### 1. Decision

One clear paragraph with the recommended next move. Distinguish trial from production adoption.

#### 2. Top Findings

Maximum four. For each show:

* Discovery support: for example, 3/3, 2/3, 1/3, or found during verification
* Evidence status: Verified, Independently corroborated, Product-team evidence, Weak, Disputed, or Unknown
* Fact, Interpretation, or Inference when the distinction matters

#### 3. Choices by Role

Maximum four candidates. State best use, main compromise, confidence, and adoption status.

#### 4. Do Now

Maximum three concrete actions.

#### 5. Critical Unknown

The unresolved issue most likely to change the recommendation.

#### 6. What Would Change My Mind

The evidence or test result that would materially alter the decision.

### B. Compact Comparison

Maximum six candidates and seven columns.

| Candidate | Best For | Gate Status | Main Strength | Main Compromise | Evidence | Recommendation |
| --------- | -------- | ----------- | ------------- | --------------- | -------- | -------------- |

Keep cells concise. Do not repeat explanations from the Decision Brief.

### C. Decision-Changing Verification Notes

Maximum three rows.

| Claim Checked | Result | Source State | What It Establishes | What It Does Not Establish | Effect on Decision |
| ------------- | ------ | ------------ | ------------------- | -------------------------- | ------------------ |

Include a verification date or version for mutable technical claims.

### Optional Appendix

Include only when explicitly requested or when required for audit or compliance. It may contain:

* Full claim ledger
* Report scorecard
* Additional outliers
* Complete gate matrix
* Benchmark details
* Unresolved research gaps

Do not repeat the Decision Brief in the appendix.

---

## Final Check

Before answering, confirm:

1. Is the recommendation clear immediately?
2. Are agreement and evidence treated separately?
3. Were the claims that changed the decision inspected directly?
4. Are facts separated from interpretations and inferences?
5. Are only explicit or unavoidable constraints treated as hard gates?
6. Is the answer within the limits, non-repetitive, and actionable?

If not, revise before responding.
