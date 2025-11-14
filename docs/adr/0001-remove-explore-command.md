# Remove /explore Command in Favor of Compound Engineering /plan

> **Why ADRs Matter in AI-Assisted Development**
>
> In AI-assisted workflows, decisions evolve rapidly and context windows are limited. ADRs serve as persistent memory for both humans and AI agents, capturing not just *what* you chose, but *why* you rejected alternatives. This prevents re-litigating settled decisions and provides crucial context when requirements change or new team members (human or AI) join the project.
>
> **Key Benefits:**
> - **AI Context Efficiency:** Concise decision summaries fit in AI context windows
> - **Prevent Re-Work:** Documented alternatives show what was already tried
> - **Team Onboarding:** New developers understand architectural choices quickly
> - **Audit Trail:** Track how constraints and requirements shaped decisions
>
> **Learn More:**
> - [AWS: ADR Process Guide](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)
> - [Refactoring.fm: Engineering Docs in AI Era](https://refactoring.fm/p/how-engineering-docs-change-with)
> - [Salesforce: Human-Led, AI-Powered Decisions](https://www.salesforce.com/blog/architectural-decisions-human-led-ai-powered-approach/)

---

**Status:** accepted

**Date:** 2025-11-12

**Decision Maker(s):** Daniel Zivkovic

## Context

The scaffolding includes a custom `/explore` command that was created as a simplified replacement for an internal `/design` command. The original `/design` command was too complex and opinionated for public use - it would generate full DESIGN.md files automatically, which required significant expertise to use effectively.

The `/explore` command was intentionally "dumbed down" to simply facilitate technical discussions before creating GitHub issues. It was meant to fill the gap between the weak planning capabilities of the original Every.to `/issue` command and the need for thoughtful design exploration.

However, with the adoption of the updated Compound Engineering stack from Every.to, the new `/compounding-engineering:plan` command now provides comprehensive exploratory research and design proposal capabilities that supersede both the old approach and the `/explore` workaround.

**Additional pain point:** The `/explore` command causes autocomplete annoyance when trying to exit Claude Code sessions, as it interferes with the "exit" command.

## Decision

Remove the `/explore` command (`claude-code/commands/explore.md`) from the scaffolding and rely exclusively on the Compound Engineering `/plan` command for pre-issue exploration and design work.

The `/plan` command workflow:
1. Explores possible solution options
2. Proposes design approach on screen
3. User reviews, edits, and approves
4. Design content is manually used as body for `gh issue create` command

This replaces the old manual workflow of creating DESIGN.md files before issue creation.

## Consequences

### Positive Consequences

- **Alignment with official stack:** Uses the maintained Compound Engineering approach instead of custom workaround
- **Better research quality:** `/plan` has superior exploratory research capabilities compared to the simple `/explore` conversation mode
- **Design proposal built-in:** No need to manually write DESIGN.md files; `/plan` generates proposals interactively
- **Reduced command clutter:** Fewer custom commands to maintain
- **Better UX:** Eliminates autocomplete interference with "exit" command
- **Migration path:** Shows intention to gradually phase out other similar custom commands in favor of official Compound Engineering stack

### Negative Consequences

- **Learning curve:** Users familiar with `/explore` need to learn `/plan` syntax and workflow
- **Breaking change:** Existing users who rely on `/explore` will need to update their workflow
- **Dependency on external stack:** Relies on Every.to maintaining the Compound Engineering plugin

## Alternatives Considered

### Option: Keep both /explore and /plan
- **Pros:** No breaking changes, users can choose their preferred tool
- **Cons:** Maintenance burden of duplicate functionality, command clutter, autocomplete conflicts
- **Status:** rejected

### Option: Enhance /explore to match /plan capabilities
- **Pros:** Maintain control over the implementation
- **Cons:** Significant development effort to replicate work already done in Compound Engineering stack, goes against principle of using official tooling
- **Status:** rejected

### Option: Keep /explore as lightweight alternative
- **Pros:** Simple conversation mode for quick discussions without full planning
- **Cons:** Overlapping use cases create confusion, autocomplete issue remains
- **Status:** rejected

## Research References

- [Every.to Compound Engineering /plan command](https://github.com/EveryInc/every-marketplace/blob/main/plugins/compounding-engineering/commands/plan.md)
- Internal `/design.md` command (deprecated, not publicly released)
- Original Every.to `/issue.md` command (still in scaffolding but weak planning)

## Notes

This decision is part of a broader strategy to:
1. Align with the official Compound Engineering stack
2. Reduce custom command proliferation
3. Gradually phase out workaround commands created before superior official alternatives existed

The `/issue` command remains in the scaffolding for now but may be deprecated in future as `/plan` + manual `gh issue create` workflow matures.

**Migration guidance:** Users should replace `/explore "topic"` calls with `/compounding-engineering:plan` and follow the interactive design proposal workflow.
