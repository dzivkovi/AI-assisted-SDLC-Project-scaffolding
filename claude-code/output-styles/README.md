# Output Styles

Output styles change how Claude Code reports back to you, rather than what work it does. A style modifies the system prompt itself, which is why reporting rules belong here rather than in `CLAUDE.md` (which arrives later, as project context).

This folder now holds exactly two files, on purpose:

| Style | What it is |
| --- | --- |
| [briefing.md](briefing.md) | **The one to use.** Answer first, bold only the load-bearing phrases, structure scales with the reporting burden, substantial work closes with "What's left for you" plus what was not checked. Silent while working. |
| [concise.md](concise.md) | **Do not use.** A real style that was really used, kept as the cautionary artifact. The failure it caused, and the test it led to, are documented below and in [TESTING.md](TESTING.md). |

The evaluation behind the choice, and the recipe for repeating it on your own style, is in **[TESTING.md](TESTING.md)**.

Earlier variants (`concise-plus`, `executive`, `plain-briefing`, and the previous 727-word `briefing`) are retired, not lost: **each version of this folder is a git tag.** `git checkout briefing-v1 -- claude-code/output-styles/` restores the old set; `git diff briefing-v1..briefing-v2b -- claude-code/output-styles/briefing.md` shows exactly what the measured rewrite changed. New style versions get new tags, so the folder stays two files forever.

## Install

```bash
cp claude-code/output-styles/*.md ~/.claude/output-styles/
```

Pick the style in `/config` under "Output style", or set `"outputStyle": "Briefing"` in `~/.claude/settings.json` (the value is the style's `name` field, not the filename). Styles are read at session start and prompt-cached: **restart or `/clear` before judging any change**, or you will be evaluating the old style. Keep `keep-coding-instructions: true` in the frontmatter; it layers the style on top of Claude Code's engineering behaviour instead of replacing it.

## The lesson `concise.md` records

It worked, at first. Replies got shorter and the answer arrived first. Two days later, an overnight automated run found a genuine bug: a generated artifact came back with invented content and was written to disk marked complete, because a guard tested for a zero value and the model reported a non-zero one. The run did report it - as a clause inside a paragraph, no recommendation attached. The operator skimmed it, saw the word "recovered", and moved on. It registered only after an unrelated question the next morning.

**The finding had been made and printed. The response shape still cost a day.**

The rule that generalises: **optimise for retrieval cost, not word count.** Presence is not retrievability. What makes a finding survive is not that it appears, but that it appears with a label, a weight, and a consequence attached. A finding delivered as an unweighted clause sits closer to omission than to disclosure. So: cut explanation, background and narration freely; never cut a finding, a risk, a cost, or a decision waiting on the reader.

## Measured, not asserted (2026-08-19)

An earlier version of this README said the right test was a planted-omission suite and admitted it had not been built. It has been now. **[TESTING.md](TESTING.md) is the method, in full and reusable**: how the fixtures are built, why the grader must be able to fail a known-bad style before you trust it, the exact headless command, and the traps. The short version is that three fixture repos were each seeded with three findings a routine task never asks about, every style ran each task three times on Claude Opus 5 as a real loaded style, and a separate blind grader scored each planted finding 0 absent, 1 unweighted clause, 2 labelled with a consequence.

| Style | Subtle-finding survival | All findings | Tool-call narration (median words; runs narrating) |
| --- | --- | --- | --- |
| concise (control) | 3/6 - degraded to a clause every run | 15/18 | - |
| briefing v1 (727 words, tag `briefing-v1`) | 17/18 | 49/54 | 0; 4 of 9 |
| v1 trimmed + Anthropic narration snippet | 16/18 | 50/54 | 49; 9 of 9 |
| **briefing (current, tag `briefing-v2b`)** | 17/18 | **51/54** | **0; 3 of 9** |

Three findings worth carrying beyond the scoreboard, each traceable to [Anthropic's Opus 5 prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5):

1. **Effort does not control length.** The effort parameter tunes how much the model thinks, not how much it says; only explicit prompting shortens visible output. (Documented by Anthropic; the trap everyone hits first.)
2. **Anthropic's narration-cadence snippet tunes narration UP against a flat prohibition.** Their guide offers a positive cadence ("say one sentence before your first tool call...") for tuning narration down from the default. Against an explicit "do not narrate" rule it moved the other way: 9 of 9 runs narrating (median 49 words) versus 3 of 9 (median 0). The current style keeps the prohibition, deviating from the official snippet deliberately and on measurement. Their broader point stands and is also the reason this style is half its predecessor's length: [over-constraining costs quality](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models) - Anthropic deleted over 80% of Claude Code's system prompt with no measured loss.
3. **Trimming 727 words to ~400 cost nothing measurable.** Survival was equal or better everywhere. The cut is justified by parity plus the over-constraint guidance, not claimed as a win.

Honest limits, in full in [TESTING.md](TESTING.md): n=3 per cell detects large effects only, so 51/54 versus 49/54 is parity, not superiority; all fixtures share one shape; long sessions and pure-chat work were not tested.

## Creating your own

Copy `briefing.md` and change what you need: what gets glossed (make it a condition on the reader, not a list of terms), whether decisions carry a recommendation, where the closing section is mandatory. Two rules are worth keeping regardless: brevity may never hide a finding, and **write down what would make you roll the style back before you switch** - then test against the known-bad state first, because a grader that cannot flunk a style you already know is broken cannot certify the one you hope is better.
