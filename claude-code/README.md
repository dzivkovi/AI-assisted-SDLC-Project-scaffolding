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

**Workflow:**
- `/explore` - Chat about possible approaches
- `/issue` - Create GitHub issues (my take on [Compound Engineering](https://every.to/c/compounding-engineering))
- `/work` - Implement GitHub issue using TDD
- `/resume` - Continue interrupted work
- `/kanban` - Retroactive documentation for completed work
- `/reflection` - Improvement analysis (inspired by [https://reddit.com/r/ClaudeAI/comments/1laby6h/](https://reddit.com/r/ClaudeAI/comments/1laby6h/))

## Usage

Type any command in a Claude Code session. For example:
- `/save` - Save last response with smart filename
- `/save "your answer about git attributes"` - Save specific content
- `/notebook-review` - Review Jupyter notebooks (Anthropic command)
- `/explore how to add caching` - Explore implementation approaches
- `/issue 'Add rate limiting to API'` - Create GitHub issue
- `/work 42` - Implement issue #42

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
