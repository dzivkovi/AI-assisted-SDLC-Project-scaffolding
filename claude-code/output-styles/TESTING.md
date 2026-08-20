# How to evaluate an output style

Written for output styles, but the method is general: it works for any prompt artifact you are tempted to judge by reading it. You cannot tell whether a style is good by reading it. The file in this folder marked "do not use" reads perfectly sensibly, and it cost a day of work. What follows is the method that replaced reading with measuring, in the order you should apply it to your own.

## Step 1: Score before you test. Quality is not one number.

Do not start by building a test. Start by breaking "good" into dimensions and grading what you already have, harshly, one grade per dimension. A single overall score hides everything you need to know; a scorecard tells you exactly where to aim.

This is the scorecard that started this whole exercise. The incumbent style had been in daily use for three weeks and felt fine:

| Dimension | Incumbent, graded cold |
| --- | --- |
| Targets the right failure (protects findings) | A- |
| **Proof it works** | **F. No test existed, no rollback trigger written.** |
| **Free of over-specification** | **D. 727 words, in a folder whose own README warns that long styles degrade output.** |
| Covers the vendor's documented model behaviours | B- |
| Internally consistent | B+ |
| Ceremony risk on small tasks | C+ |
| Reversible | A |

Overall a B-, but the overall grade is the least useful row. **The two worst cells are the work order.** The F said: build the missing test. The D said: the trim is the change to test. Every run that followed traces back to those two cells; nothing else was touched. That discipline, one dimension per iteration, is what keeps an evaluation from sprawling.

Two properties make a scorecard worth the ten minutes it takes:

- **Dimensions are weighted by your situation, not universally.** An operator who follows agent runs on a phone weights tool-call narration heavily; a team reading transcripts later might not care. There is no absolute quality, only fit to a use.
- **A dimension you cannot yet measure still earns a grade.** Grade it on evidence available, mark it unproven, and let the bad grade tell you which instrument to build next.

## Step 2: Give each dimension an instrument

Different dimensions need different kinds of measurement. Use the cheapest one that answers the question:

- **Deterministic**, wherever possible: word counts, how much text the agent emits between tool calls, whether a trivial question triggered headings. Script it from the run logs; no judge needed, no judge bias possible.
- **Blind-judged**, for the dimension that matters most here, finding survival, because "surfaced with weight" is a judgment. The instrument is below.
- **Declared judgment**, for what neither can reach (internal consistency, over-specification). Grade it yourself, say so, and do not dress it up as measurement.

## Step 3: The instrument for finding survival

The failure that matters is a style that **drops findings the reader needed**. It is invisible by construction: a report missing something looks exactly like a report with nothing to report. So plant findings and count survivors.

1. **Build small fixture repos with planted findings.** Each has a routine task (update this README, add a `--dry-run` flag) and three seeded defects the task never mentions: one obvious (a committed secret), one subtle (an inverted guard that silently corrupts data), one operational (a cost or restart trap). The subtle one is the whole point; obvious findings survive any style and tell you nothing. Have someone other than the style's author write the fixtures, or you are grading your own homework.
2. **Prove the grader can fail a style you already know is broken, before any comparison.** Run the known-bad style and confirm the score drops. Here it did: 3 of 6 on the subtle class against 6 of 6 for the incumbent. A grader that passes a known-broken style cannot certify a good one, and you will spend the whole budget before noticing.
3. **Run each style for real, blind.** A real headless session with the style loaded into the system prompt, not a paste of the style text:

   ```bash
   claude -p --model opus --settings '{"outputStyle":"Briefing"}' \
     --permission-mode acceptEdits --output-format stream-json "$TASK" > run.jsonl
   ```

   The worker just gets the task; it must not know it is being tested. Three repetitions per style per fixture, minimum.
4. **Grade blind, on three points**: 0 absent, 1 mentioned as an unweighted clause, 2 surfaced with a label and a consequence. The three-point scale does the real work. A two-point "was it mentioned?" scale passes the broken style, because its failure was never omission: it printed the bug as a clause and the reader skimmed past it.
5. **Write pass and fail rules before the data lands**, per dimension: here, reject the candidate if it drops any finding the incumbent reliably surfaced, or falls more than one point behind on the subtle class; length and quietness count only if that holds. Deciding what "better" means after seeing the numbers is not measurement, it is alchemy.

## Step 4: Iterate one dimension at a time, and expect a surprise

The first candidate fixed the D (399 words) and held survival, but a deterministic metric caught a regression nobody predicted: it narrated during tool calls in 9 of 9 runs, against 4 of 9 for the incumbent, because it had adopted the vendor's recommended narration snippet. The revision swapped that one paragraph back, got its own pass/fail bar written before its own results, and re-ran. That is the loop: score, test, fix the one failing dimension, re-test. Never fix two things in one iteration; you will not know which one worked.

## Step 5: Re-score. The payoff is the same table, after.

| Dimension | Before | After |
| --- | --- | --- |
| Protects findings | A- (asserted) | A-, measured: 51/54 vs incumbent's 49/54, subtle class equal at 17/18 |
| Proof it works | **F** | B-. Suite exists, oracle-validated, rollback trigger written. Parity at n=3, so no superiority claimed |
| Free of over-specification | **D** | A-. 45% shorter, survival unchanged, so the trim is proven free |
| Covers vendor behaviours | B- | A-, with one measured, documented deviation (narration, above) |
| Internally consistent | B+ | A- |
| Ceremony on small tasks | C+ | B-. Measured clean on the incumbent, carried on trust for the current file |
| Reversible | A | A. Every prior version is a git tag |

Movement in the exact cells the first scorecard flagged, stasis where nothing was aimed, and one cell (ceremony) honestly worse-documented than its neighbour. That texture is what a single number can never give you.

## The budget

39 worker runs on the model under test plus 33 blind grader calls, about six hours unattended, roughly $30 to $38 of API-equivalent usage. Stage 0 (the oracle check) was 6 of those runs and would have been the whole cost if the grader had failed it.

## Four traps that each produce a confident wrong answer

- **A misspelled style name loads no style at all, silently.** One arm becomes the control and the result looks like a tie. Probe every arm before spending.
- **Vendor guidance can invert in your setup.** A snippet written to tune narration down from a chatty default tuned it up against a flat prohibition. Treat official guidance as a hypothesis about your configuration, and test it there.
- **One grader score can flip a verdict.** Here the grader scored the same reply pattern 1 in one arm and 0 in another, and the 0 would have rejected the winner. The fix is never re-grading the inconvenient cell: check the grader scored the same pattern identically in every arm, then adjudicate with independent reviewers.
- **A shorter file is not a win.** Shorter with survival unchanged is parity plus a smaller prompt, worth having, but it is not evidence the trim improved anything. Say "proven free", not "better".

## What this cannot prove

Three repetitions per cell detects large effects only. Every fixture here shares one shape: small repo, routine task, planted defects; long sessions and pure conversation were untested. And the deepest limit is structural: a style can make an agent report what it knows it did not check, but nothing can make it surface a finding it never recognised as one. The method narrows the blind spot. It does not close it.
