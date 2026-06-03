# Claude Code Custom Commands

This directory contains custom slash commands and configuration for Claude Code.

## Directory Structure

- **`commands/`** - Slash commands (each `.md` file defines a reusable command)
- **`personas/`** - Communication style presets for different team dynamics
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
- `/save` - **FAST** smart save (Haiku-powered, saves to `work/`, auto-naming)
- `/note` - *Deprecated* (use `/save` instead - faster, cleaner, better organized)
- `/learnings` - Consolidate final learnings since last `/save` (or full conversation if none). Captures only refined positions, not intermediate iterations - emulates Compound Engineering's `/workflows:compound` for knowledge compounding

**Workflow:**
- `/explore` - Chat about possible approaches
- `/issue` - Create GitHub issues (my take on [Compound Engineering](https://every.to/c/compounding-engineering))
- `/work` - Implement GitHub issue using TDD
- `/dark-factory` - Overnight autonomous engineering loop from a GitHub issue: runs the full Compound Engineering chain (TDD, validation, self-review), then a Codex (non-Anthropic) mixture-of-experts peer review and a visual smoke gate, and halts at an open PR for morning review. The `/work` you can hand off and walk away from
- `/resume` - Continue interrupted work
- `/kanban` - Retroactive documentation for completed work
- `/reflection` - Improvement analysis (inspired by [https://reddit.com/r/ClaudeAI/comments/1laby6h/](https://reddit.com/r/ClaudeAI/comments/1laby6h/))

**Quality & Security:**
- `/guardrail` - Confidentiality guardrail review (v2.6) - see [dedicated section below](#confidentiality-guardrail)

## Usage

Type any command in a Claude Code session. For example:
- `/save` - Save last response with smart filename
- `/save "your answer about git attributes"` - Save specific content
- `/notebook-review` - Review Jupyter notebooks (Anthropic command)
- `/explore how to add caching` - Explore implementation approaches
- `/issue 'Add rate limiting to API'` - Create GitHub issue
- `/work 42` - Implement issue #42
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
