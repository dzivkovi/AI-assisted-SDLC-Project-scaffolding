# Output Styles

Output styles change how Claude reports back to you, rather than what work it does. That line is not absolute: a style's instructions can shape behaviour, and a custom style replaces Claude Code's built-in engineering guidance unless you keep it (see Install).

A style modifies the system prompt, and Claude Code emits reminders about the active style during a session. `CLAUDE.md` arrives as project context after the system prompt. That structural difference is the reason to put reporting rules in a style rather than in `CLAUDE.md`. It is not a measured claim about decay: both are present in the request, and how reliably either holds over a long run is not something the documentation establishes.

## Choosing a style

| Situation | Recommendation |
|---|---|
| Normal work, one style you never have to think about | `briefing.md` |
| The terse default is close and you only want the information loss fixed | `concise-plus.md` |
| You want a guaranteed report skeleton on every multi-step task | `executive.md` |
| You want maximum plain-language discipline and can tolerate an untested style | `plain-briefing.md` (experimental) |
| Never | `concise.md`. It is here as a counterexample. |

## Available styles

| Style | Shape |
|---|---|
| [briefing.md](briefing.md) | Answer first. Bold the load-bearing phrase. Structure scales with the reporting burden, so a lookup stays one line. Substantial work closes with "What's left for you", and the style separately requires naming what was not checked. Plain-word and gloss rules on diction. |
| [concise-plus.md](concise-plus.md) | The terse default with its three information-hiding lines removed and a closing decisions block added. The smallest diff that is still safe. |
| [executive.md](executive.md) | A fixed skeleton (outcome, findings, detail, decisions) on all multi-step work. Predictable, at the cost of ceremony on small answers. |
| [plain-briefing.md](plain-briefing.md) | **Experimental.** A more aggressive rewrite with a hardcoded gloss boundary and a mandatory recommendation on every decision. Not recommended yet, see "What is unproven" below. |
| [concise.md](concise.md) | **Do not use.** Kept as the cautionary artifact this README is about. |

## Install

```bash
cp claude-code/output-styles/*.md ~/.claude/output-styles/
```

Then either pick the style in `/config` under "Output style", or set it directly:

```json
"outputStyle": "Briefing"
```

in `~/.claude/settings.json`. The value is the style's `name` field, not its filename.

Styles are read at session start and prompt-cached. **Restart or `/clear` before judging any change**, or you will be evaluating the old style.

`keep-coding-instructions: true` in the frontmatter layers the style on top of Claude Code's normal engineering behaviour instead of replacing it. Keep it.

## The lesson `concise.md` records

`concise.md` is a real style that was really used, and it is committed here because the failure around it is more useful than the file is harmful.

It worked, at first. Replies got shorter and the answer arrived first. Two days later, an overnight automated run found a genuine bug: a generated artifact came back with invented content and was written to disk marked complete, because a guard tested for a zero value and the model reported a non-zero one. The run did report it, as a clause inside a paragraph, with no recommendation attached and no indication that a code change was warranted. The operator skimmed it, saw the word "recovered", and moved on. It registered as something to act on only after a follow-up question the next morning.

**The finding had been made and printed. The response shape still cost a day.**

Be precise about the cause, because the single-cause version of this story is wrong and would mislead you. The underlying verbosity came from somewhere else entirely: a plugin injecting "you may exceed typical length constraints" into every session, and removing it was the correct fix. The mistake was what came next. An aggressive style was added on top of an existing global instruction that already capped replies at roughly 150 words. **Two independent brevity mechanisms ended up stacked on an already-healthy baseline, and the resulting conflict was structural rather than stylistic.** A style like this one, without a competing global rule, may well behave differently.

Within the style, three lines carry the most risk:

- *"give a high-level summary unless an in-depth explanation is specifically requested"* gates depth, so you re-prompt for facts the agent already has.
- *"Cap lists at 5 items"* puts a numeric cap on what is often a list of **findings**. In fairness the style does say to split the overflow into "do now" versus "later", so it does not mandate dropping anything. It still makes a cap the default posture on the one kind of list that should never have one.
- *"no recap of what you just did"* deletes the end-of-run handoff, which on unattended work is the most-acted-on part of the report.

### The rule that generalises

**Optimise for retrieval cost, not word count.** A response can be long and instantly navigable, or short and completely opaque. A word cap treats those as the same thing.

The tempting version of this argument is a clean split: "buried but present" is recoverable, "missing entirely" is not. **That split does not survive contact with the incident above.** The bug was present. It was printed. It was still functionally lost, because nothing marked it as consequential.

So the accurate statement is that **presence is not retrievability.** What makes a finding recoverable is not that it appears, but that it appears with a label, a weight, and a consequence attached. A finding delivered as a clause inside a paragraph, with no recommendation, sits closer to omission than to disclosure. Outright omission is worse again, because the reader cannot even think to ask. But these are points on one spectrum, not two boxes, and treating them as two boxes is what let a printed finding count as "reported".

Every style here except `concise.md` is built on that. Cut explanation, background and narration freely. Never cut a finding, a risk, a cost, or a decision waiting on the reader, and when you keep one, give it a label and a consequence rather than a clause.

### Two corollaries worth knowing

**An over-specified style degrades output.** Long style guides compete with the task for the model's attention, and mandatory section skeletons invite invented content to fill empty slots. A style that always emits a "Decisions" heading teaches you to skip it. Keep a style to a handful of load-bearing rules, and let structure be conditional.

**Plain words and simple ideas are different requests.** "Explain it like I'm five" simplifies the *ideas*, which is usually not what an expert reader wants. Restricting *vocabulary* while leaving domain terms alone is the useful half. Controlled-language standards have understood this for decades: ASD-STE100, the Simplified Technical English used for aircraft maintenance manuals, restricts everyday connective vocabulary to an approved dictionary but **explicitly exempts technical names and technical verbs**. It never asked anyone to avoid saying "hydraulic actuator." That exemption is the part most often dropped when the standard is cited, and it is the part that keeps a plain-language rule from patronising an expert. `briefing.md` implements the same split: cut buzzwords, gloss unfamiliar jargon, never explain someone's own field to them.

## What is unproven

Honesty about the state of these files, because the whole point above is not letting a report imply more confidence than it has:

- **`briefing.md`'s plain-word and unverified-scope rules are new and have not been through a repeated test.** They were added after a skeptical review, not after measurement.
- **The unverified-scope rule has a ceiling worth understanding before you rely on it.** Asking an agent to state what it did not check surfaces *known* gaps: scope it chose not to cover, results it took on trust. It cannot surface a finding the agent never recognised as a finding. It narrows the blind spot, and it does not close it.
- **`plain-briefing.md` has not passed an omission test.** In early sampling it dropped a second-order finding that `briefing.md` caught. A sample of one proves nothing about rates, which is exactly why it is marked experimental rather than either adopted or deleted.
- **The right test is a planted-omission suite**: seed a scenario with a finding the reader did not ask about, run each style several times, and count how often it survives. Comparing a single response per style measures word count and nothing else.

If you adopt one of these, write down what would make you roll it back before you switch.

## Creating your own

Copy `briefing.md` and change what you need. Useful things to vary:

- **What gets glossed.** Make it a condition on the reader ("outside their demonstrated expertise"), not a list of terms. A list encodes one person's skill profile and goes stale in months.
- **Whether decisions carry a recommendation.** Some readers want the call made; some want the options preserved. Both are legitimate and the style should say which.
- **Where the closing section is mandatory.** On unwatched work it is the most valuable element. On a one-line answer it is ceremony.

The one rule worth keeping regardless: brevity may never hide a finding.
