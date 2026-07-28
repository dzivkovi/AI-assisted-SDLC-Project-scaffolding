# Validation record - Triangulate method

One row per validation run. Full run artifacts live in `research/` (untracked); this file carries only the verdicts.

| Date | Corpus | Result | Method changed? |
|------|--------|--------|-----------------|
| 2026-07-28 | DeepWiki alternatives (design corpus 1, known ground truth) | Pass on all five checks: security outlier survived, Repowise vendor-labelled, Understand Anything judged on fit not popularity, critical unknown = bake-off, 640-word brief vs V5's 3,562 with zero cross-section repetition | No |

## Standing limitations

- The 2026-07-28 run validates that the method **encodes** the lessons from the grading session, not that it discovers such lessons unaided: the runner had read the session before designing the method. Discovery power is only testable on corpora with no prior synthesis, which is what the held-out run measures.
- Step 5 (open-the-source verification) was not exercised on 2026-07-28; first exercised in the held-out AI SDR run.
- Comparison to V5/V6 outputs used the grading session's documented account of those outputs, not a fresh read of the output PDFs in Dropbox.

## What a future run must log

Date, corpus, the five self-check results, whether known-good outliers survived (when ground truth exists), brief word count, and whether the method file changed as a result (with the commit hash if so).
