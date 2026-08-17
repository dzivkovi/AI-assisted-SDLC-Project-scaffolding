# Archive: commands that did their job and were superseded

Nothing in here is installed by `sync-claude-kit.sh --push`, and nothing in here should be installed by hand. It is kept because deleting it would erase the only record of what this workflow looked like before the tooling caught up.

## Why these files still exist

Between roughly May 2025 and late 2025, [Compound Engineering](https://every.to/guides/compound-engineering) was something you could watch Kieran Klaassen describe but not something you could install. The commands in `archive/commands/` are what that gap looked like from the inside: an attempt to rebuild the workflow from talks and videos, then run it daily on real work, then find out where the reconstruction was wrong.

The plugin shipped. Every one of these has an official replacement that is better maintained and better documented. They are not recommendations. They are the fossil record of a working reconstruction, useful for exactly two things: seeing which parts of the idea survived contact with the official release, and seeing which gaps a solo practitioner hits first.

## What replaced what

| Archived command | Superseded by | Note |
|---|---|---|
| `commands/issue.md` | Compound Engineering's issue flow | Created GitHub issues from a conversation. Weak planning was its known limit, and it is the reason `/explore` existed at all. |
| `commands/work.md` | `/ce-work` | Implement a GitHub issue with TDD. The direct ancestor of how `/dark-factory` drives a ticket. |
| `commands/kanban.md` | Nothing exactly | Retroactive documentation for work that was already finished. The need mostly disappeared once work started flowing through issues from the beginning. |
| `commands/resume.md` | `/ce-work` picking up in place | Continue interrupted work. Session resume in Claude Code itself covers most of this now. |
| `/explore` (deleted, not archived) | `/ce-brainstorm` | Removed before this archive existed. Its reasoning is preserved in [ADR-0001](../../docs/adr/0001-remove-explore-command.md), which is the better artifact anyway. |

`/explore` is the one that got deleted rather than archived, and in hindsight the ADR made that fine: a decision record explaining why a thing died is worth more than the dead thing. That is the pattern the rest of this folder is following.

## The part that was not wrong

The reconstruction got one thing right early and it is still load-bearing: **the unit of work is a GitHub issue, and the workflow is what happens between opening one and closing it.** Everything current in this repo, `/dark-factory` most of all, still assumes that. The commands here were the wrong implementation of an idea that held up.
