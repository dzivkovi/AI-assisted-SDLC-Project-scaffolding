# Evaluating a triangulation run

Use this to check a synthesis before trusting it, to compare runners, or to test a change to the method. It is corpus-independent: fill the two corpus-specific slots from your own material before the run, never after.

## The discipline that makes the score mean anything

**Pre-register.** Write down your expected outliers and known vendor-sourced claims BEFORE reading the output. Scoring criteria invented after reading the report will simply describe that report.

**Read the whole file first.** A report being written by a detached or background runner is indistinguishable from a truncated one. Confirm the `<!-- triangulate:complete -->` marker is present before scoring anything.

**Score the reasoning, not the prose.** A lean 3,000-word report that gates correctly beats a rich 11,000-word one that does not, and vice versa depending on audience. Length is not a criterion.

## Rubric

Score 0-2 per criterion (0 absent or wrong, 1 partial, 2 solid). Max 20.

| # | Criterion | Passing looks like |
|---|---|---|
| 1 | Lineage and recognizability | Claims carry (n/N, which report). The person who commissioned the research can trace any claim back to the researcher who found it |
| 2 | Dual-axis discipline | Discovery support and evidence status labelled separately everywhere. No "3/3 therefore high confidence" collapse |
| 3 | Source-family detection | *(corpus slot A)* The vendor-cited or shared-source claims you identified in advance are flagged as such, not ranked on their own evidence |
| 4 | Outlier preservation | *(corpus slot B)* The valuable 1-of-N findings you identified in advance survive, with labels intact, at least one matching the asker's wrinkle |
| 5 | Conflict handling | Real disagreements between reports are named and either resolved with stated reasoning or left open with a cheap test proposed |
| 6 | Verification honesty | Sources actually opened, with dates and "what it does NOT establish" - or the no-web-access downgrade stated prominently. No claimed verification that did not happen |
| 7 | Output shape | Executive layer plus full body; each finding has exactly one home; template sections present and appropriate to the question's shape |
| 8 | Actionability | First rung startable within days; every rung has a cost, a payoff, and an exit gate; no invented weights or scores |
| 9 | Hallucination check | Spot-check five claims against the source reports. 2 = all hold, 1 = minor drift, 0 = anything fabricated |
| 10 | Independence | No contamination from prior syntheses of the same corpus; conclusions derive from the question and reports only |

**Filling the corpus slots.** Before the run, skim the reports for: (A) any candidate whose evidence traces mainly to its own vendor's pages, and any claim all reports take from one shared source; (B) three to five findings that appear in only one report and look decision-relevant. Those lists are your answer key for criteria 3 and 4.

## Beyond the score

Record these unscored - they are where method improvements actually come from:

- Runtime, tokens, and output length.
- Whether the runner asked the user anything it should have resolved itself, or resolved something it should have asked about.
- Whether it read files outside the corpus and the skill.
- **Every place the skill's wording was ambiguous to the runner.** Each ambiguity is an edit candidate. This is the highest-value output of an evaluation.
- Anything the runner found that you did not expect and cannot fault. Convergent surprises across runners are strong evidence; a single runner's surprise is a lead.

## Interpreting the result

**All runs at ceiling** means the rubric measures the floor, not the differences. That is a real result (the method transfers) and a signal to harden the criteria if you want to rank runners: score verification that *changed a conclusion*, contributions beyond what the corpus contained, and calibration against ground truth that emerged later.

**A single run failing one criterion** is a data point, not a mandate. Resist adding a rule to the method for every observed defect - that path ends in an unfollowable policy manual (see the failure-modes table in `method.md`). Change the method when a failure repeats across corpora or runners, and prefer generalizing an existing rule over appending a new one.

**Different runners producing different shapes** at the same score is expected and useful. Lean-and-gated suits an audience that must defend the decision; rich-and-attributed suits an audience learning a domain. Pick the runner to fit the reader, not the leaderboard.
