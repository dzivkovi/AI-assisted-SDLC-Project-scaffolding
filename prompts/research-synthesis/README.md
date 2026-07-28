# Multi-AI Research Synthesis - prompt lineage (historical)

**Superseded. Use [`claude-code/skills/triangulate/`](../../claude-code/skills/triangulate/SKILL.md) instead.** This folder is the archaeology behind that skill: six generations of a paste-into-a-chat prompt, kept because what each version got wrong transfers better than what any of them got right.

The problem they all address: you hit a topic cold, send the same question to three deep-research agents (OpenAI, Gemini, Claude), and get three long reports. You want two things from them - the overlap, which is the settled core worth learning first, and the outliers, which is where the finding that matches your particular situation usually hides. Compress too hard and you lose the outliers; compress too little and you never read it.

## The versions

| File | Mode | How it was rated at the time | Provenance |
|------|------|------------------------------|------------|
| [v5-explore.md](v5-explore.md) | Explore | Best discovery breadth, weakest at producing a decision | The only version ever under version control before 2026-07-27 |
| [v6-decide.md](v6-decide.md) | Explore + Decide | Rated best overall twice | Recovered from chat prose; one verification patch never applied |
| [v7-defend.md](v7-defend.md) | Defend | Best evidence discipline, worst readability | Verbatim |
| [v8-brief.md](v8-brief.md) | Decide | Most readable, converged too early on cold starts | Verbatim, confirmed free of its development topic |
| [v7.1-archive.md](v7.1-archive.md) | none - do not run | The bloat exemplar | Kept as a warning, not a tool |

Those ratings came from one research corpus and are recorded as history, not as current guidance. The skill replaced all six.

## What the versions taught, which is the part that transfers

**The numbers are not a quality ladder.** V5 to V8 is chronological order. The final rating put V6 above V8 above V7 above V5 - a version *regression*. Any numbering scheme implies later-is-better, and here that is false.

**Every version overfit to something.** This table is the most reusable artifact in the folder:

| Version | Hidden overfitting |
|---------|--------------------|
| V5 | Assumed exactly three named AI personalities; treated model convergence too much like evidence; required nearly every possible section regardless of usefulness |
| V6 | Optimized quickly toward a decision; verification guidance too loose, so claims got labelled "verified" too easily |
| V7 | Encoded the postmortem of one research run into a universal framework. Excellent for due diligence, excessive for general research |
| V7.1 | Patch accumulation: every V7 defect generated a new exception until the prompt became a policy manual |
| V8 | Overfit in the opposite direction, to compression. Aggressive caps caused premature convergence on genuine cold starts |
| V8 task-specific | Anchored on a tool already being evaluated, rewarding prior investment instead of letting evidence demote it |

**Agreement measures prominence, not truth.** Three models can repeat one vendor's page. Discovery support (3/3, 2/3, 1/3) and evidence status (verified, corroborated, single-source, disputed) are independent axes, and a verified 1/3 claim can outrank an unverified 3/3 one. This correction generated most of the others and is now rule 3 of the skill's method.

**Three modes, not six versions.** Explore, Decide, Defend. Trying to make one prompt serve all three is what produced the bloat; the skill infers them from the question instead of making you choose a file.

## How this became the skill

V6's analytical core (dual labels, source-family deduplication) plus V5's full report body plus V7's verification discipline, minus the paste-into-a-chat ceremony - because the executor is now an agent that reads the corpus and opens the sources itself. Development record: [VALIDATION.md](VALIDATION.md).

## Still open

Questions this lineage raised and the skill has not settled:

1. Whether the two-axis labelling survives contact with corpora where the reports share most of their sources.
2. Whether a fourth mode is needed for questions that are pure learning with no decision attached.
3. How the method behaves with more than three reports, or with two.

## Provenance

Recovered 2026-07-27 from a local working archive; every file is verbatim with only line endings normalized. Excluded deliberately: V1-V4 pre-history, and one V5 variant that had a live engagement pasted into its input fields.
