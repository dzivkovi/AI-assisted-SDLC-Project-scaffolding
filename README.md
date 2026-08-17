# AI-assisted SDLC Kit

> *"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."*

Two things live here, and it is worth knowing which one you came for.

**A kit you can install today.** Claude Code commands, output styles, personas, and shell tools that run a real solo engineering practice. The flagship is [`/dark-factory`](#dark-factory), an unattended overnight loop that takes GitHub issues to merged PRs while you sleep.

**A paper trail you can read.** This repo has been running since November 2025, and the practice behind it since around May 2025, back when [Compound Engineering](https://every.to/guides/compound-engineering) was something you could watch someone describe but not something you could install. The early commands here were a reconstruction of that workflow from talks and videos. The plugin shipped and superseded most of them. Those files are still in the repo, dated and labeled, in [`claude-code/archive/`](claude-code/archive/) and [`prompts/`](prompts/). They are kept the way you keep photographs: not because the clothes are still in style, but because that is what learning looks like from the outside.

MIT licensed. Take any of it.

---

## `/dark-factory`

Hand it a list of GitHub issues before bed. Wake up to merged PRs and one list of things only you can decide.

**The name is literal.** A dark factory is a plant that runs with the lights off, because nobody is on the floor. That only works under one condition: the specification going in is clean, and the output is validated coming out. The lights-out part is not the interesting part. The discipline on either end of the night is.

**The lineage.** This is a layer on top of Compound Engineering, not a replacement for it. `/dark-factory` does not reimplement planning, TDD, or review; it calls the `/ce-...` chain and trusts it. What it adds is everything that turns a supervised workflow into an unsupervised one. It started as a modification of Kieran Klaassen's `LFG` command, reshaped around the fact that the operator is asleep rather than watching.

**What "unsupervised" actually required.** Three problems had to be solved before a night could run unattended:

1. **Never stall.** A run that stops at 2am to ask a question wastes the whole night. So a ticket that cannot proceed safely is *parked*, not stalled: its branch is left in a safe state, a decision entry is recorded, and the run moves to the next ticket. One stuck ticket never costs the rest of the batch.
2. **A proxy for the human.** Judgment calls go to specs and code first, then to Codex as a standing proxy. Only genuine Claude-Codex non-consensus, or a real taste or business call, comes back to the operator. This is a mixture of experts used for a specific reason: a non-Anthropic reviewer catches things an in-family reviewer does not. Empirically it has caught a non-string keyword crash, a metadata asymmetry, a cross-bucket IAM gap, and stale binding docs, all after a clean in-family review pass.
3. **One list in the morning, not scattered markers.** Everything needing a human lands in a single `## Decisions` section with exact `file:line` references, both positions where there was disagreement, a recommendation, and copy-paste commands for anything only a human may execute. Each item has to be shaped as a choice. "I did X, flag if you disagree" is an FYI and belongs in the debrief body.

**What it will not do while you sleep.** Destructive actions outside its own worktrees and feature branches are parked, never performed. That includes real-data deletion, schema drops, and any force-push of main. It merges its own work only on a clean rebase with green checks and review findings applied. Say "review mode" or "halt before merge" in the invocation to get the older behavior of opening PRs and stopping.

**Proof rather than a promise:** [PR #41 on video-intel](https://github.com/dzivkovi/video-intel/pull/41). Eight commits, 653 tests passing including 49 new ones, a real-data smoke test matching the plan's estimate, and a multi-agent review that surfaced two polish items overnight, both applied cleanly. Ten minutes of human review the next morning, then squash and merge.

- The command: [`claude-code/commands/dark-factory.md`](claude-code/commands/dark-factory.md)
- The writeup: ["Software dark factories stopped being a fairy tale for me"](https://www.linkedin.com/feed/update/urn:li:activity:7453892609665810434/)
- Built on [Kieran Klaassen's Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin)

Requires an Opus-capable subscription, plus the Compound Engineering plugin and the Codex CLI for the peer-review pass. The command pins its own model tier on purpose, so a night costs and reasons the same regardless of which model your session happened to be on.

## Install

The kit installs into your home directory, not into a project, which is what keeps it out of client repositories and out of their source control.

```bash
git clone https://github.com/dzivkovi/AI-assisted-SDLC-Project-scaffolding
cd AI-assisted-SDLC-Project-scaffolding

# Read-only report first: shows what would change in ~/.claude, touches nothing
./claude-code/tools/sync-claude-kit.sh

# Install or update
./claude-code/tools/sync-claude-kit.sh --push
```

Use the script rather than `cp -r claude-code/* ~/.claude/`. A plain copy will overwrite a `settings.json` you have already customized, and it drags along the machine-local permission file. The script refuses to sync `settings.local.json` in either direction, skips symlinks, ignores line-ending-only differences, and never touches anything that is not tracked in git.

It runs in both directions on purpose. `--pull` brings edits you made in `~/.claude` at 2am back into the repo, which is the failure this script was written for: three `/dark-factory` rules lived only in a home directory for a month before anyone noticed.

## What is in here

| Path | What it is | Status |
|---|---|---|
| [`claude-code/commands/`](claude-code/commands/) | Ten live slash commands. `/dark-factory`, `/guardrail`, `/note`, `/save`, `/learnings`, `/reflection`, `/setup-labels`, plus three from [Anthropic's cookbooks](https://github.com/anthropics/claude-cookbooks/tree/main/.claude/commands). | Current |
| [`claude-code/output-styles/`](claude-code/output-styles/) | Five output styles, including one kept deliberately as a cautionary artifact. | Current |
| [`claude-code/personas/`](claude-code/personas/) | Communication registers for AI-skeptical teams and client-facing work. | Current |
| [`claude-code/tools/`](claude-code/tools/) | `sync-claude-kit.sh` (drift management) and `cs` (session GUID to human name). | Current |
| [`claude-code/archive/`](claude-code/archive/) | Four commands superseded by the Compound Engineering plugin. Not installed by the sync script. | Historic |
| [`prompts/`](prompts/) | Four research and evaluation prompts from before commands and skills existed. | Historic, still works |
| [`python/`](python/) | A deliberately minimal Python project scaffold. | Current, minimal |
| [`docs/adr/`](docs/adr/) | Architecture decision records for this repo. | Current |
| [`docs/runbooks/`](docs/runbooks/) | [GitHub Project board setup](docs/runbooks/github-project-board.md), verified against the live API. | Current |

### The `python/` scaffold, described accurately

It is a starting point, not a framework. `cp -r python/ ~/projects/YourProject` gives you a `src` layout, `pyproject.toml` with ruff and pytest configured, a CI workflow that runs both, issue and PR templates, ADR templates, and a specs directory. The source directories are empty by design and `requirements.txt` is a placeholder, because the whole point is that your project's dependencies are yours.

`python/LICENSE.md` reads "All Rights Reserved" because most new projects start closed. Replace it. It is a template default and it licenses nothing in this repository, which is MIT.

### The `prompts/` folder is older than the tooling

These four predate slash commands being common and predate skills existing at all. They were just text you pasted into a chat window, and they were tested hard through 2025 on real decisions.

The most interesting one archaeologically is `Multi-AI_Research_synthesis_prompt.md`. Ask the same question to three reasoning models, feed all three answers back in, and get convergence scored by agreement: three of three means act on it, two of three means verify, one of three is either a hidden gem or noise. That prompt is the direct ancestor of the `/triangulate` skill and of the Codex peer-review pass inside `/dark-factory`. The idea has not changed since 2025. Only its packaging has, from prompt to command to skill.

They still work as plain prompts with any reasoning model. See [`prompts/README.md`](prompts/README.md).

## How this repo grew

Dates are from git, not from memory.

| When | What happened |
|---|---|
| ~May 2025 | The practice starts, before this repo. Compound Engineering is described publicly but not installable. Commands get reverse-engineered from talks and videos and run daily on real work. |
| 2025-11-03 | First commit. The Python scaffold and the first commands land. |
| 2025-11-12 | [ADR-0001](docs/adr/0001-remove-explore-command.md) removes `/explore` in favor of the now-published `/plan`. First decision recorded rather than argued. |
| 2025-11-21 | `prompts/` published, gathering work already battle-tested through 2025. |
| 2025-12-14 | Personas added, because not every team wants AI involvement stated loudly. |
| 2026-03-31 | `/guardrail` added, the same day Anthropic's own source was exposed through a sourcemap left in an npm package. The lesson landed the same week it happened. |
| 2026-06-03 | `/dark-factory` and the `tools/` directory arrive. Unattended runs begin. |
| 2026-06 to 2026-08 | `/dark-factory` gets calibrated by failures: a merge with no deployed smoke test, a run that closed a ticket on an unverified premise, a later run that left finished tickets open out of over-correction. Each fix carries the dated incident that caused it. |
| 2026-08-14 | The GitHub Projects runbook re-verified against the live API. Half of it turned out to be scriptable now. |
| 2026-08-15 | Output styles added, including the one that hid a real finding and is kept as a warning. |

## Two ideas worth stealing even if you install nothing

**Rules carry their incident.** Look at `dark-factory.md` and you will find rules ending in a dated paragraph like *"Why (2026-07-16): PR #15 said Closes #2 on an unverified premise, and the owner discovered otherwise in production."* That is deliberate. Git history is invisible to an agent at runtime, so moving the reasoning to a commit message does not archive it, it deletes it from the only place the runtime can see. A bare rule also invites rationalization, while a rule carrying a consequence resists it. The full argument, including where the practice is *not* worth its tokens, is in [`claude-code/README.md`](claude-code/README.md).

**Optimize for retrieval cost, not word count.** A response can be long and instantly navigable, or short and completely opaque, and a word limit treats those as the same thing. A reader who has to hunt for a fact is annoyed; a reader who never sees it makes the wrong decision and does not know to ask. `output-styles/concise.md` is kept in this repo specifically because it got that wrong and cost a real finding on a real overnight run. The [output styles README](claude-code/output-styles/README.md) documents the incident.

## License

MIT. See [LICENSE](LICENSE).
