# Claude Code Custom Commands

This directory contains custom slash commands and configuration for Claude Code.

## Directory Structure

- **`commands/`** - Slash commands (each `.md` file defines a reusable command)
- **`output-styles/`** - Output styles: system-prompt-level presets for how Claude reports back to you
- **`personas/`** - Communication style presets for different team dynamics
- **`tools/`** - Shell utilities for working with Claude Code
- **`settings.json`** - Claude Code permissions and configuration

## Available Commands

### From Anthropic Official Cookbooks

These commands are from [Anthropic's Claude Cookbooks](https://github.com/anthropics/claude-cookbooks/tree/main/.claude/commands):

- `/link-review` - Review links in changed files for quality and security issues
- `/model-check` - Validate Claude model usage against current public models
- `/notebook-review` - Comprehensive review of Jupyter notebooks and Python scripts

### Custom Commands

Remaining commands are custom for this project (based on [ai-strategy-consulting](https://github.com/dzivkovi/ai-strategy-consulting/tree/main/.claude)):

**Quick Saves:**
- `/note` - **Thorough** save (Sonnet-powered, more guardrails, better for important captures). Day-to-day driver: in practice the Haiku model behind `/save` produces less consistent output, and `/note` hasn't been noticeably slower to justify the trade-off.
- `/save` - **FAST** smart save (Haiku-powered, saves to `work/`, auto-generates semantic filename). Reach for it when you want the speed and can tolerate occasional inconsistency in filename/structure quality.
- `/learnings` - Consolidate final learnings since last `/save` (or full conversation if none). Captures only refined positions, not intermediate iterations - emulates Compound Engineering's `/workflows:compound` for knowledge compounding

**Workflow:**
- `/dark-factory` - Unattended overnight engineering loop: takes one issue or a LIST of tickets, runs each through the full Compound Engineering chain (TDD, validation, self-review) plus a Codex (non-Anthropic) peer review and a visual smoke gate, then **merges its own work** on clean-green rebase instead of halting for review. A ticket that can't proceed safely is parked, never stalled - unsafe destructive actions outside its own branches are always parked too. Everything that needs a human is collected into one end-of-run `## Decisions` list instead of scattered halt points. Say "review mode" / "halt before merge" in the invocation to fall back to opening PRs without merging them - see the writeup: [**Software dark factories stopped being a fairy tale for me**](https://www.linkedin.com/feed/update/urn:li:activity:7453892609665810434/)
- `/reflection` - Improvement analysis (inspired by [https://reddit.com/r/ClaudeAI/comments/1laby6h/](https://reddit.com/r/ClaudeAI/comments/1laby6h/))

**Obsolete - superseded by [Compound Engineering](https://every.to/guides/compound-engineering):**

These were early, pre-publication attempts to reverse-engineer the Compound Engineering workflow (back when it was discussed but not yet released). It is now a published framework with its own commands - use those instead. Kept here only for historical reference.

- `/explore` - Chat about possible approaches - now `/ce-brainstorm`
- `/work` - Implement a GitHub issue with TDD - now `/ce-work`
- `/issue` - Create GitHub issues - now Compound Engineering's issue flow
- `/kanban` - Retroactive documentation for completed work
- `/resume` - Continue interrupted work

**Quality & Security:**
- `/guardrail` - Confidentiality guardrail review (v2.6) - see [dedicated section below](#confidentiality-guardrail)

<!-- provenance: authored 2026-08-13 in a video-intel working session; origin trail in the author's private cross-project ledger -->
## Why the command files carry "*Why:*" paragraphs

If you read a command like `dark-factory.md`, you will notice that some rules end with a dated paragraph like `*Why (2026-07-16):* PR #15 said "Closes #2" on an unverified premise - the owner read the closed ticket as shipped and discovered otherwise in production.` That is deliberate, and it is the opposite of clutter. Four reasons:

1. **Git history is invisible to the agent at runtime.** When an agent applies a rule at 2am, the only thing in its context is the command file. Commit messages are not loaded. Moving the "why" to a commit message does not archive it - it deletes it from the only place the runtime can see.

2. **A bare rule invites rationalization; a rule with a consequence resists it.** "Never write `Closes` on unverified premises" competes against in-context pressure ("this ticket looks done, closing feels tidy"). A one-sentence story of the real failure makes the exception expensive for the model to talk itself into.

3. **Judgment rules need worked examples on both sides.** These files have had rules misapplied in *both* directions: one incident closed a ticket that was not actually done, and a later run left five finished, dual-review-approved tickets open "awaiting confirmation" because the rule only carried the first story. A rule with a failure example on each side defines the boundary far better than any abstract criterion - so when a rule gets over-corrected, the fix is a second dated "*Why*", not deleting the first.

4. **Chesterton's fence for future editors.** A rule with no visible reason looks arbitrary, and arbitrary-looking rules are exactly what the next "simplify this bloated file" pass deletes - whether that pass is a human or an agent. The date plus incident tells the editor what breaks if the fence comes down.

The honest limit: this only earns its tokens on **judgment rules** - rules the agent must interpret at application time. Mechanical rules (anything checkable by a grep, a test, or a linter) do not need persuading, they need the check; their history can live in git. And when a judgment rule eventually graduates into code plus a test, its "*Why*" can shrink to a pointer. Density is a real cost, so the discipline is: keep the story where the rule can be bent, drop it where the rule can be verified.

## Shell Utilities (`tools/`)

### `cs` — Claude Session name mapper

CLI sessions are GUIDs (`claude --resume 286ccdec-...`); the VS Code / web picker shows human names ("Migrate MagmaInc website to Astro"). `cs` translates between them.

**Install:**
```bash
mkdir -p ~/.claude/tools && cp claude-code/tools/claude-sessions.js ~/.claude/tools/
# Add to ~/.bashrc:
cs() { node "$HOME/.claude/tools/claude-sessions.js" "$@"; }
```

**Usage:**
```bash
cs                   # sessions for the current directory's project
cs --all             # all sessions across all projects
cs astro             # find sessions whose name contains "astro"
cs 286ccdec          # name + resume line for a GUID prefix
cs --json            # machine-readable output (pipe to jq)
```

A leading `~` marks a session with no auto-title (CLI-only sessions often lack one); the name shown is its first prompt.

> **Fragility note:** relies on undocumented JSONL record types (`ai-title`, `custom-title`, `agent-name`) verified on Claude Code v2.1.159. May break on future upgrades. Read-only — never modifies transcripts.

## Usage

Type any command in a Claude Code session. For example:
- `/save` - Save last response with smart filename
- `/save "your answer about git attributes"` - Save specific content
- `/notebook-review` - Review Jupyter notebooks (Anthropic command)
- `/dark-factory 42` - Hand off issue #42 overnight; wake up to a merge-ready PR
- `/guardrail` - Interactive: prompts for scope + client
- `/guardrail git Mastercard` - Fast: skip prompts, targeted scan
- `/learnings` - Save refined learnings from current conversation

## Confidentiality Guardrail

### Why This Matters

When doing client work, development often spans multiple environments: prototyping in personal repos, iterating with AI assistants, testing ideas before they land in client-managed infrastructure. You prove it works, then you bring it in.

The risk isn't the workflow - it's that client context (project names, staff names, architecture details, engagement scope) can inadvertently travel with your code. Conversation exports, design notes, and scratch files accumulate alongside source code, and any of them can end up in a commit, a package, or a public repository.

**It happened to Anthropic themselves.** On March 31, 2026, [Anthropic's entire Claude Code source was exposed](https://github.com/Kuberwastaken/claude-code) because a `.map` sourcemap file wasn't excluded from the npm package. One missing line in `.npmignore` leaked the full TypeScript codebase - including unreleased features (BUDDY, KAIROS, autoDream), internal model codenames, security team member names, and an elaborate "Undercover Mode" specifically designed to prevent exactly this kind of leak. The irony: they built sophisticated safeguards against accidental exposure, then shipped the source in a file the bundler generated automatically.

If it can happen to the company that built the tool, it can happen to you. Run `/guardrail` before contributing to any repository connected to client work.

### How It Works

`/guardrail` is an interactive, read-only confidentiality review. It prompts for scope and (optionally) a client name, then scans without changing any files.

**Three scopes, each with a distinct job:**

| Scope | What it checks | When to use |
|-------|---------------|-------------|
| `delta` | Staged, unstaged, and untracked files only | Before every commit - catches leakage about to enter source control |
| `git` | Tracked files, commit history, reflog, tags, releases, gitignore coverage | Periodic audit - catches boundary failures, near-misses (reset commits), and gitignore gaps |
| `full` | Everything including gitignored files (conversation exports, local config, scratch notes) | Cold-start audit - inspects what `delta` and `git` intentionally skip |

**Two targeting modes:**

| Mode | Invocation | Behavior |
|------|-----------|----------|
| Generic | `/guardrail` then select "No specific client" | Scans for anything that looks non-public: project codenames, staff names, internal workflows, credentials |
| Client-targeted | `/guardrail git Mastercard` or type client name via "Other" | Actively searches for client name, abbreviations, and domain-adjacent terms (e.g., PCI, interchange for a payments client) |

**What it catches:**
- Client employee names, internal project codenames, engagement scope details
- Conversation exports with client context sitting in the workspace
- Files that should be gitignored but aren't (the Anthropic-style gap)
- Unreachable git objects from reset commits that still contain sensitive content
- Tracked files that reference untracked sensitive files by name
- Credentials and API keys in local config files

**What it won't do:**
- Change, edit, or delete any files
- Suggest rewrites or patches
- Flag public brand names or generic engineering language

### Quick Reference

```bash
# Interactive (prompts for scope + client)
/guardrail

# Fast targeted (skip prompts)
/guardrail delta                    # Pre-commit check, generic
/guardrail git Mastercard           # Boundary audit, client-targeted
/guardrail full                     # Full workspace audit, generic
```

## Output Styles

`output-styles/` holds Claude Code **output styles**: presets that change how Claude reports back to you. An output style is written into the core system prompt and re-injected as a reminder during the session, so it holds better over a long run than the same rules placed in `CLAUDE.md`, which is loaded once at the top.

| Style | Shape | Pick it when |
|---|---|---|
| `briefing.md` | Answer first, bold the load-bearing phrase, structure scales with the reporting burden, substantial work closes with "What's left for you". | Default for normal work. One adaptive style, nothing to remember. |
| `plain-briefing.md` | Briefing's shape plus plain-word discipline, an explicit gloss boundary (what to explain and what never to explain), an analogy rule, and a mandatory recommendation on every decision. | The default reads as jargon-dense, or you are often tired or multitasking when you read it. |
| `concise-plus.md` | Concise with its three information-hiding lines removed and a closing decisions block added. | You want the smallest possible diff from a terse default. |
| `executive.md` | A fixed report skeleton (outcome, findings, detail, decisions) on all multi-step work. | Predictability matters more than proportion. |
| `concise.md` | Terse. **Kept as a cautionary artifact. Do not select it.** | Never. See below. |

Install by copying into `~/.claude/output-styles/`, then either pick the style from `/config` or set `"outputStyle": "<the name field>"` in `~/.claude/settings.json`. Styles are read at session start and prompt-cached, so restart before judging any change.

### The lesson `concise.md` records

`concise.md` is kept here as a warning, not a recommendation. Three of its lines cause information loss rather than brevity:

- *"give a high-level summary unless an in-depth explanation is specifically requested"* gates depth, forcing you to re-prompt for facts the agent had already found.
- *"Cap lists at 5 items"* is a hard cap on **findings**, which quietly encourages omission when there are seven.
- *"no recap of what you just did"* deletes the end-of-run handoff, which is the most-acted-on part of an unattended run's report.

What it produced in practice: an overnight automated run found a genuine bug, wrote the affected artifact to disk marked complete, and reported the problem as a clause inside a paragraph with no recommendation attached. It surfaced only when the operator asked a follow-up question the next morning. **The information had been found. The response shape hid it.**

The generalisable rule, and the reason the other styles exist: **optimise for retrieval cost, not word count.** A response can be long and instantly navigable, or short and completely opaque, and a word cap treats those as the same thing. The two ways a report fails a reader are not symmetric:

| Failure | Cost | Recoverable? |
|---|---|---|
| Too much to scan. The fact is present but buried in equal-weight prose. | Attention. The reader has to hunt. | Yes. Annoying, but it is on the page. |
| Too little surfaced. The fact never appears. | Decisions, bugs, money. The reader believes the work is complete. | **No. The reader does not know to ask.** |

A second, subtler trap: an over-specified style degrades output. Long style guides compete with the task for the model's attention, and mandatory section skeletons invite invented content to fill empty slots. Keep a style to a handful of load-bearing rules.

## Communication Personas

The `personas/` directory contains communication style presets that customize Claude's output for different team dynamics. Personas predate output styles and solve an adjacent problem: a persona sets the register for an audience (a client, an AI-skeptical team), while an output style sets the information architecture for you, the operator.

### Available Personas

| Persona | Use When |
|---------|----------|
| `diplomatic.md` | Professional tone, understated AI involvement, client deliverables |
| `incognito.md` | Environments favoring traditional development workflows |

Not every team needs a persona - AI-first teams can use Claude's default style.

### How to Use

Add to your project's root `CLAUDE.md`:

```text
Read ~/.claude/personas/diplomatic.md
```

This instructs Claude to adopt that communication style for the entire project. You can also reference personas mid-conversation when switching contexts.

### Why This Exists

Different teams have different comfort levels with AI tooling. Some prefer understated AI involvement in code reviews, commits, and documentation. Personas let you:

- Match existing team communication norms
- Reduce friction with AI-skeptical colleagues
- Produce client-appropriate deliverables
- Adapt to organizational policies on AI attribution

See [personas/README.md](personas/README.md) for details on creating custom personas.
