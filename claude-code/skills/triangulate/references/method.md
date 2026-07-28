# Triangulate - the analytical method

Follow these rules exactly. They were distilled from six generations of a research-synthesis prompt and two validated runs; each rule exists because its absence produced a documented failure.

## 1. Frame before reading

From the question (and any decision context the user gave), write down four things before opening the first report:

- **Shape**: `bake-off` (choose among candidates) | `architecture/strategy` (how to build or position something) | `pure learning` (understand a domain). The shape controls which output sections exist. Never force hard-gate tables and candidate rankings onto a question that is not a bake-off; never omit them when it is.
- **Dial 1, landscape familiarity**: cold start (the asker knows little - keep MORE outliers, cast wide) vs familiar (tighten toward the decision).
- **Dial 2, audience**: self (lighter evidence trail) vs skeptical third party - engineers, security, legal, a client (keep a full evidence appendix and per-claim attribution).
- **The asker's wrinkle**: what does the asker's specific context make relevant that a generic reader would skip? A stated constraint, their tech stack, their jurisdiction, their business model. Name it explicitly - it is your outlier filter in rule 4.

## 2. Read reports adversarially

For each report, as you read, record: what it uniquely found, what it omitted (an omission is NOT disagreement), and where its evidence actually comes from - follow its citations to their origin type (official doc, independent evaluation, press, vendor page, SEO listicle).

Judge nothing by length, citation count, star counts, popularity metrics, funding, or confident tone. Reports are evaluated on directness, coverage, evidence quality, and actionability - use High/Medium/Low, not invented decimals.

## 3. Build the finding ledger - two independent labels per finding

Every finding that could matter gets BOTH labels, never merged into one score:

- **Discovery support**: found by 3/3 reports, 2/3, 1/3, or found during your verification.
- **Evidence status**: `Verified-primary` (you opened the authoritative source) | `Corroborated` (multiple genuinely independent sources) | `Vendor/product-team` (the claim's subject is its source) | `Single-source` | `Disputed` | `Unknown`.

The two axes are independent because **agreement measures prominence, not truth**. Three models repeating the same vendor page is 3 mentions, 1 source, 0 corroborations. Rules:

- Reports citing the same underlying source, or any set of pages controlled by one vendor, count as ONE source family. Check the citation lists - this fires in most corpora (observed twice: a #1-ranked product whose entire evidence base was its own blog).
- A verified 1/3 claim outranks an unverified 3/3 claim.
- Distinguish Fact / Interpretation / Inference when the distinction could change what the asker does. Never let a reasonable inference get written as a verified fact.
- Popularity metrics establish attention, never quality.

## 4. Outliers pass the wrinkle test

Keep a 1/3 finding when it does at least one of: could change the decision; exposes a hidden risk; opens a different solution category; suggests a cheap experiment; matches the asker's wrinkle from rule 1. Drop novelty that does none of these.

Every surviving outlier keeps its labels visibly (e.g. "1/3, Claude; single-source") - never silently blend an outlier into consensus prose. At least one preserved outlier should match the asker's wrinkle; if none does, re-read the reports, because in practice one always exists.

## 5. Verify only decision-changing claims

Pick the 3-7 claims whose truth would alter the recommendation:

- claims supporting the leading recommendation;
- claims that eliminate or materially demote a candidate;
- valuable 1/3 outliers about to influence the output;
- direct conflicts between reports (verification often resolves them);
- any mutable fact (licence, pricing, release status, maintenance, legal effective dates) that survives into the output.

Open the actual source - a search snippet or another report's paraphrase is not verification. For each checked claim record: what the source establishes, what it does NOT establish, and the date you checked. Source preference order: official documentation/repository/regulation/paper > independent technical evaluation > reputable reporting > community evidence > vendor marketing > aggregator/SEO pages.

No web access: say so once, prominently, and downgrade confidence language everywhere ("reported as", "per the reports", never "verified").

## 6. Gate, then order by cost to act

Hard gates come only from constraints the asker stated or that are logically unavoidable from the question. Label inferred constraints as assumptions. **Unknown is not Pass.** Never average away a failed hard constraint.

Order every recommendation by the cost of acting on it, cheapest first. The first rung must be startable within days with what the asker already has. For each rung: what it costs, what it buys, and what result justifies climbing to the next rung (the exit gate).

## 7. Output shape

Defined fully in `report-template.md`. The contract, in one line: an executive layer (~600-900 words, answer first) PLUS a complete research body with no word cap, in which every claim is traceable to which report found it. Deduplication means each finding has exactly one home; it never means dropping the finding. The asker must be able to recognize their source research in your output.

## 8. Self-check before delivering

1. Is the answer in the first paragraph?
2. Are discovery support and evidence status labelled separately, everywhere?
3. Were the decision-changing sources actually opened - or is the downgrade stated prominently?
4. Did the outliers survive with their labels, including at least one matching the asker's wrinkle?
5. Is the first ladder rung startable this week?
6. Would the asker recognize their source research in this output, and can they trace any claim back to which report found it?

## Failure modes to design against

Each of these was observed in a real prior generation of this method; do not reintroduce them.

| Failure | What it looks like |
|---|---|
| Agreement-as-confidence | "3/3 models agree" presented as high confidence while all three cite one vendor page |
| Repetition bloat | The same finding explained in the summary, the map, the table, the gems, and the roadmap - findings get one home |
| Invented precision | Decision weights (40/30/20/10), scores, or day-by-day plans the asker never asked for and no evidence supports |
| Premature convergence | Hard caps applied so aggressively on a cold-start question that category-opening outliers vanish |
| Incumbent anchoring | A tool the asker already uses gets protected (or attacked) instead of judged on the evidence |
| Model personalities | "Gemini is always academic" style conclusions from a single run |
| Amputated body | Only a short brief delivered; the asker cannot recognize their research and cannot use the report as a reference |
| Rule accumulation | Adding a new rule for every observed defect until the method becomes an unfollowable policy manual - fix by generalizing, not appending |
