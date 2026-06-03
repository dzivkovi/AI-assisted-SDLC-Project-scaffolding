# Claude Code Custom Commands

This directory contains custom slash commands and configuration for Claude Code.

## Directory Structure

- **`commands/`** - Slash commands (each `.md` file defines a reusable command)
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
- `/save` - **FAST** smart save (Haiku-powered, saves to `work/`, auto-generates semantic filename)
- `/note` - **Thorough** save (Sonnet-powered, more guardrails, better for important captures)
- `/learnings` - Consolidate final learnings since last `/save` (or full conversation if none). Captures only refined positions, not intermediate iterations - emulates Compound Engineering's `/workflows:compound` for knowledge compounding

**Workflow:**
- `/dark-factory` - Overnight autonomous engineering loop from a GitHub issue: runs the full Compound Engineering chain (TDD, validation, self-review), then a Codex (non-Anthropic) mixture-of-experts peer review and a visual smoke gate, and halts at an open PR for morning review. A spec goes in at midnight; a merge-ready PR is on your desk by breakfast - see the writeup: [**Software dark factories stopped being a fairy tale for me**](https://www.linkedin.com/feed/update/urn:li:activity:7453892609665810434/)
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

## Communication Personas

The `personas/` directory contains communication style presets that customize Claude's output for different team dynamics.

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
