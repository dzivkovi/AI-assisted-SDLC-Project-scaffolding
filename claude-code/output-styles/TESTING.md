# How to test an output style

You cannot tell whether a style is good by reading it. The file in this folder marked "do not use" reads perfectly sensibly, and it cost a day of work. This page is the method that replaced reading with measuring, short enough to copy.

## The question worth asking

Not "is it shorter?" Length is easy to measure and nearly worthless alone. The question is whether a style **drops findings the reader needed**, because that failure costs real money and is invisible by construction: a report missing something looks exactly like a report with nothing to report.

So the test plants findings the task never asks about, and counts how many survive.

## The method, five steps

**1. Build fixtures with planted findings.** Three small repos, each with a routine task (update this README, add a `--dry-run` flag) and three seeded defects the task never mentions: one obvious (a committed secret), one subtle (an inverted guard that silently corrupts data), one operational (a cost or restart trap). The subtle one is the whole point; obvious findings survive any style and tell you nothing. Have someone other than the style's author write these, or you are grading your own homework.

**2. Prove your grader can fail a style you already know is broken.** This step is not optional and it goes first. Run the known-bad style, grade it, and confirm the score drops. Ours did: 3 of 6 on the subtle class against 6 of 6 for the working style. A grader that scores a broken style clean cannot certify a good one, and you will have spent the whole budget before noticing.

**3. Run each style for real, blind.** Not a paste of the style text into a prompt. A real headless session with the style loaded into the system prompt:

```bash
claude -p --model opus --settings '{"outputStyle":"Briefing"}' \
  --permission-mode acceptEdits --output-format stream-json "$TASK" > run.jsonl
```

The worker must not know it is being tested; it just gets the task. Three repetitions per style per fixture, minimum. One run per style measures variance and calls it a result.

**4. Grade blind, on three points.** A separate process, with no output style of its own, sees the answer key and one unlabelled reply, and scores each planted finding: **0 absent, 1 mentioned as an unweighted clause, 2 surfaced with a label and a consequence.** The three-point scale is doing the real work. A two-point "was it mentioned?" scale scores the broken style clean, because its failure was never omission: it printed the bug as a clause and the reader skimmed past it.

**5. Write the pass and fail rules before the data lands.** Ours: reject the candidate if it drops any finding the incumbent reliably surfaced, or falls more than one point behind on the subtle class. Secondary goals (shorter, quieter) count only if the primary holds. Deciding what "better" means after seeing the numbers is not measurement, it is alchemy.

## What was actually run

| Stage | Purpose | Runs |
| --- | --- | --- |
| 0 | Prove the grader discriminates: known-bad versus incumbent | 6 |
| 1 | Independent fixtures authored, candidate style written | 0 |
| 2 | Incumbent versus candidate, 3 fixtures, 3 reps | 24 |
| 3 | Revised candidate after the narration regression | 9 |

39 worker runs on Claude Opus 5 plus 33 grader calls, about six hours unattended, roughly $30 to $38 of API-equivalent usage. Every measurement ran on the model under test; a cheaper model handled only orchestration and the throwaway probes.

## The scorecard

Measured, subtle-finding survival first because it is the one that matters:

| | concise (the one that hurt) | briefing v1 | briefing, current |
| --- | --- | --- | --- |
| Subtle findings surfaced with weight | **3 of 6** | 17 of 18 | 17 of 18 |
| All planted findings | 15 of 18 | 49 of 54 | **51 of 54** |
| Style file length | 297 words | 727 words | **399 words** |
| Reply length, median | shortest | 636 words | 512 words |
| Narrates during tool calls | not measured | no | **no** |
| Ceremony on a trivial question | none | none | not probed |

Judged, on the qualities a measurement cannot reach:

| | concise | briefing v1 | briefing, current |
| --- | --- | --- | --- |
| Protects findings | F, it degraded every one | A- | A- |
| Evidence behind it | A, thoroughly measured as the control | B- | B- |
| Free of over-specification | A | D, 727 words buying nothing measurable | A- |
| Internally consistent | C, it gates the depth it also demands | B+ | A- |
| Reversible | A | A | A |

The concise column is scored on one fixture, not three; it was the control, not a contender. Note what it gets right. It is short, consistent with itself, and cheap to undo. Being wrong about one thing was enough.

## Four traps that would have produced a wrong answer

- **A misspelled style name loads no style at all**, silently. One arm of the experiment quietly becomes the control and the result looks like a tie. Probe every arm before spending anything.
- **Vendor guidance can invert.** The official snippet for tuning narration down, written for a default that narrates, tuned it up against a flat prohibition: 9 of 9 runs narrating versus 3 of 9. Guidance is a hypothesis about your setup, not a fact about it.
- **One grader score can flip a verdict.** Ours scored the same pattern 1 in one arm and 0 in another, and the 0 would have rejected the winner. The fix is not re-grading the inconvenient cell. It is checking that the grader scored the same pattern identically everywhere, then adjudicating with independent reviewers.
- **A shorter file is not a win.** Ours came out 45 percent shorter with survival unchanged. That is parity plus a smaller prompt, which is worth having. It is not evidence that the trim improved anything.

## What this does not prove

Three repetitions per cell detects large effects only, so 51 against 49 is parity, not superiority. Every fixture shares one shape: a small repo, a routine task, three planted defects. Long sessions, pure conversation, and real codebases were not tested. And the deepest limit is structural: asking an agent to report what it did not check surfaces the gaps it knows about. It cannot surface a finding it never recognised as one. This narrows the blind spot. It does not close it.
