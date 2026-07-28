# Development record - triangulate method

How the method in [`claude-code/skills/triangulate/`](../../claude-code/skills/triangulate/SKILL.md) was tested while it was being built. This is a development log, not external validation: see the limitations at the bottom before treating any row as proof.

Runs were performed against private research corpora. Where a row cites evidence held privately, it says so.

| Date | Corpus / run | Outcome | Analytical rules changed | Output contract or harness changed |
|---|---|---|---|---|
| 2026-07-28 | DeepWiki alternatives. Design corpus, partial ground truth known from an earlier grading session | Passed all five checks in use at the time: the security-boundary outlier survived, a vendor-cited candidate was labelled as such, a popular tool was judged on fit rather than popularity, the critical unknown was identified as an empirical bake-off, and the brief carried no cross-section repetition | No | No |
| 2026-07-28 | AI SDR. Held-out corpus: no prior synthesis, and a different question shape (architecture and strategy rather than candidate selection) | Mixed. Analytical core held: four decision-changing claims were opened and verified, one of which resolved a direct conflict between two reports, and source-family deduplication fired independently on a second corpus. **The output contract failed**: the report was capped at ~900 words in total and the reader could not recognize their own source research in it | No | **Yes.** Step 7 rewritten to require a full research body alongside the executive layer; self-check item 6 added ("would the asker recognize their source research?") |
| 2026-07-28 | Bake-off. Skill v1 executed unattended by two runner classes (Claude Opus 5 and Codex GPT-5.x) across both corpora, scored against a 10-criterion rubric written before any output existed | All four runs passed every threshold criterion. Source-family quarantine fired for both runners on both corpora. Runners contributed findings beyond the reference syntheses: a widely-quoted sales statistic traced to a 2007 vendor-sponsored study, a privacy-law scope correction made against primary legislation, and a two-of-three consensus claim refuted by opening the very page both reports cited. The one failure was in the evaluation harness, not the method: a detached runner's output file was read while it was still being written | No | **Yes.** v2 adds a completion sentinel every report must end with, has the runner verify its own file tail, and writes long reports in appended parts |

## What these runs do and do not establish

**Do**: the written method is followed by executors other than its author, across two question shapes and two runner classes, without the author present. The rules that most often go wrong elsewhere - treating agreement as evidence, ranking on vendor-supplied claims, compressing away single-source findings - held in every run.

**Do not**: rank runners, or establish quality against any external baseline. Four passing scores on a rubric whose criteria were all met by every run measures a floor, not a difference. The rubric was written by the same author as the method, no scoring was blinded, and no independent party has reproduced any run. This is development evidence, not external validation, and should be described that way.

## Standing limitations

- The first run validates that the method **encodes** lessons from an earlier grading session that its author had read. Discovery power on genuinely novel corpora is only tested by held-out runs.
- Both corpora are technology-selection and technology-strategy questions. Behaviour on scientific, market, or policy research is untested.
- Bake-off outputs were produced by skill v1, before the completion sentinel existed. The current evaluation guide asks scorers to confirm that marker, which those historical artifacts cannot carry.
- Supporting material - the filled rubric, the four outputs, and the corpora - is held privately. Rows above summarize it; they do not let a reader audit it.

## What a future run should log

Date, corpus and its question shape, runner class, skill version, the six self-check results, whether known-good outliers survived where ground truth exists, and whether the change (if any) was to an analytical rule, the output contract, or the harness. Keeping those three kinds of change distinct is what makes this log worth reading.
