# Triangulate - multi-agent research synthesis method

One method replaces the V5-V8 prompt family. It is written for an agent executor (Claude Code) that can read the report files itself, open sources on the web, and write the output as files. The paste-into-a-chat ceremony that shaped V5-V8 is gone: point the executor at a folder containing the question and the reports, and it runs.

Design frozen 2026-07-28 before first contact with the held-out corpus. Any change made after testing must arrive as a separate commit explaining what the test showed.

## Why one method and not three prompts

The evidence from corpora 2 and 3 (four synthesis generations over identical inputs): changing the output template never changed the findings. Every reusable gain from V5 to V8 came from analytical rules, not structure. So this method spends its instruction budget on analysis and keeps the output spec minimal. Explore, Decide and Defend are not three prompts; they are two dials the executor sets by reading the question, stated in step 1 and never asked about.

## Method

### 1. Frame before reading

Read the research question first. Write down, in a few lines at the top of the working notes:

- The question's shape: candidate-selection (a bake-off), architecture/strategy, or pure learning. The shape controls which output sections exist. Never force gates and candidate tables onto a question that is not a bake-off.
- The two dials. Landscape familiarity: cold start means widen (keep more outliers, verify less); familiar means tighten. Audience: self means brief; skeptical third party means keep an evidence appendix.
- The asker's wrinkle: what does the asker's context (stated in the question or known from memory) make relevant that a generic reader would skip? Name it explicitly; it is the outlier filter.

### 2. Read reports adversarially

For each report, note what it uniquely found, what it omitted, and where its evidence actually comes from. An omission is not disagreement. Judge nothing by length, citation count, popularity metrics, or confident tone.

### 3. Two independent axes per finding

Every finding that could matter carries two labels, never merged:

- **Discovery**: found by 3/3, 2/3, 1/3 reports, or found during verification.
- **Evidence**: verified in a primary source, independently corroborated, vendor/product-team sourced, single-source, disputed, or unknown.

Agreement measures prominence, not truth. Reports citing the same underlying source, or any pages controlled by the same vendor, count as ONE source family. A verified 1/3 claim outranks an unverified 3/3 claim.

### 4. Outliers pass the wrinkle test

Keep a 1/3 finding when it could change the decision, exposes a risk, opens a different solution category, suggests a cheap experiment, or matches the asker's wrinkle. Drop novelty that does none of these. Each surviving outlier gets one home in the output and is labelled with its evidence status, not silently blended into consensus.

### 5. Verify only what would change the answer

Pick the 3-7 claims whose truth would alter the recommendation: those supporting the leading answer, those eliminating an option, valuable outliers, direct conflicts, and any mutable fact (licence, pricing, release, maintenance) that survives into the output. Open the actual source; a snippet or another report's paraphrase is not verification. For each, state what the source establishes, what it does not, and the date. Facts, interpretations and inferences stay labelled as such. If verification is unavailable, say so once and downgrade confidence language throughout.

### 6. Gate, then order by cost to act

Hard gates come only from constraints the asker stated or that are logically unavoidable; label inferred ones as assumptions, and Unknown is not Pass. Then order every recommendation by the cost of acting on it, cheapest first: the first item should be startable within days, with escalating rungs behind it. For each rung: what it costs, what it buys, what result would justify the next rung.

### 7. Output: executive layer on top, full research body below

*(Corrected 2026-07-28 after the held-out run failed the morning test - see VALIDATION.md. The original spec capped the entire output at 900 words plus a thin appendix; the reader could not recognize their own research corpus in the result. The compression rule was aimed at repetition and never meant amputation: the asker reads the front carefully and keeps the body as the reference they study and quote from.)*

**Layer 1 - the executive layer.** Roughly 600-900 words. Leads with the answer in one paragraph. Then: top findings (max 5, each with both labels), the action ladder from step 6, outliers worth an afternoon, the single critical unknown, and what would change the recommendation. A reader who stops here has the decision.

**Layer 2 - the full research body. Required, not optional, whenever the question is a cold start or the asker is learning the domain.** No word cap. It carries everything from the source reports that survives dedup and the wrinkle test, organized once: the full convergence map, complete candidate/architecture analyses with per-report attribution, merged comparison tables, domain deep-dives (regulatory, measurement, practices - whatever the question's shape demands), model-specific gems, conflicts and gaps, verification notes, and the roadmap. The asker must be able to recognize their source research in it and trace every claim's lineage (which report, what evidence). Dedup means each finding has one home - it never means dropping the finding.

Only when the asker explicitly requests brief-only does Layer 2 shrink to a stub.

Never: repeat a finding across sections, invent weights or scores the asker did not give, assign model personalities from one run, present an inference as a fact, or write market commentary that changes no decision.

### 8. Self-check, six items

1. Is the answer in the first paragraph?
2. Are discovery and evidence labelled separately everywhere?
3. Were the decision-changing sources actually opened, or is the downgrade stated?
4. Did the outliers survive with their labels, including at least one that matches the asker's wrinkle?
5. Is the first ladder rung startable this week?
6. Would the asker recognize their source research in the output, and can they trace any claim back to which report found it? (Added 2026-07-28 - the check the first held-out run failed.)

## Form and evaluation

**Form**: this file is written to be the body of a Claude Code command (`/triangulate <folder>`). Promotion is a copy to `claude-code/commands/` once validated; do not maintain two divergent copies.

**How to tell it worked** without trusting one impression: (a) the mechanical checks in step 8 are auditable by a second agent; (b) on a corpus with known ground truth, the known-good outliers must survive and the known vendor-inflated claims must carry vendor labels; (c) the morning test: the reader can state the answer and one outlier five minutes after opening the brief. Track these per run in a short log rather than re-arguing the method each time.
