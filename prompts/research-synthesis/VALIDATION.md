# Validation record - Triangulate method

One row per validation run. Full run artifacts live in `research/` (untracked); this file carries only the verdicts.

| Date | Corpus | Result | Method changed? |
|------|--------|--------|-----------------|
| 2026-07-28 | DeepWiki alternatives (design corpus 1, known ground truth) | Pass on all five checks: security outlier survived, Repowise vendor-labelled, Understand Anything judged on fit not popularity, critical unknown = bake-off, 640-word brief vs V5's 3,562 with zero cross-section repetition | No |
| 2026-07-28 | AI SDR (held out, no prior synthesis, architecture/strategy shape) | Mixed. Analytical core passed: 4 decision-changing claims opened and held (CRMArena-Pro, Art. 50 date, Rasa, Drift), one resolved a direct report conflict; vendor-family dedup fired independently on a second corpus. **Morning test FAILED**: the 900-word-total output was unrecognizable to the reader as a synthesis of their research - "I cannot recognize any of the research I gave you." Root cause: the method capped the whole output, when the asker's actual pattern (observed across every V5/V6 report they kept using) is front-read-carefully + body-kept-as-reference. Compression was meant to kill repetition, not the research body. Fix: METHOD.md step 7 rewritten (full body required for cold-start/learning runs), self-check item 6 added. Full report delivered: `research/ai-sdr/2026-07-28-ai-sdr-full-synthesis.md` | No |

| 2026-07-28 | Bake-off: skill v1 executed by Opus 5 and Codex (GPT-5.x) on both corpora, unattended, pre-registered 10-criterion rubric | **4/4 runs at rubric ceiling (20/20).** Source-family quarantine fired for both runners on both corpora. Runners surpassed the reference syntheses in places: 21x stat traced to a 2007 vendor study (sdr-opus), Law 25 s.12.1 scope corrected at LegisQuebec (sdr-codex), a 2/3 consensus claim refuted by opening its own cited page (dw-opus). Only failure was the harness: evaluator read a detached runner's file mid-write. Full scoring in `research/bakeoff/learnings.md` | Yes - v2 adds a completion sentinel and write-in-parts; analytical rules unchanged |

## Standing limitations

- The 2026-07-28 run validates that the method **encodes** the lessons from the grading session, not that it discovers such lessons unaided: the runner had read the session before designing the method. Discovery power is only testable on corpora with no prior synthesis, which is what the held-out run measures.
- Step 5 (open-the-source verification) was not exercised on 2026-07-28; first exercised in the held-out AI SDR run.
- Comparison to V5/V6 outputs used the grading session's documented account of those outputs, not a fresh read of the output PDFs in Dropbox.

## What a future run must log

Date, corpus, the five self-check results, whether known-good outliers survived (when ground truth exists), brief word count, and whether the method file changed as a result (with the commit hash if so).
