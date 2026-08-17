# Split the Repo into a Live Kit and a Dated Record

**Status:** accepted

**Date:** 2026-08-16

**Decision Maker(s):** Daniel Zivkovic

## Context

This repository has two jobs that had quietly started fighting each other.

The first job is to be installable. Someone lands here, wants `/dark-factory`, and needs a path from clone to working kit that does not damage their existing setup.

The second job is to be a record. The repo has been running since November 2025, and the practice behind it since roughly May 2025, when Compound Engineering was publicly described but not publicly available. The commands written during that gap are evidence of a specific moment in AI-assisted development, and the author's intent is explicitly to keep them.

Left unmanaged, those two jobs degrade each other. Four superseded commands sat alongside eight live ones with no structural difference between them, so a `cp -r` install put dead commands into a stranger's autocomplete. Meanwhile the README opened as an internal document ("the master factory for all new Magma Inc. projects"), buried the flagship feature under two hundred lines of Kanban board setup, and claimed "all best practices are baked in" about a Python scaffold that contained four empty directories and a `requirements.txt` holding a single TODO comment.

An external read on 2026-08-16 found the over-claim in under a minute. That is the real cost: a verifiable exaggeration on the front page teaches a reader to discount everything else on the page, including the parts that are accurate and hard-won.

## Decision

Separate the two jobs structurally rather than by labeling, and make every remaining claim checkable.

1. **Archive rather than delete.** Superseded commands (`/work`, `/issue`, `/kanban`, `/resume`) move to `claude-code/archive/commands/`, with a README mapping each to its replacement. `sync-claude-kit.sh` now refuses to sync anything under `archive/` in either direction, so the record cannot become an install.
2. **License MIT at the repo root.** The repo had no root license at all, so nothing here was legally reusable. `python/LICENSE.md` stays proprietary, since it is a template default for new closed projects, and both the LICENSE and the scaffold README now say so explicitly.
3. **Lead with `/dark-factory`, and explain why it exists.** The flagship gets the top of the README, including the reasoning that is not obvious from the command file: the lights-out factory metaphor, the lineage from Kieran Klaassen's `LFG`, and the three problems unattended operation forced (never stall, proxy the human to a non-Anthropic model, produce one decision list in the morning).
4. **Move the runbook out of the README.** The GitHub Projects setup guide, which is genuinely valuable and roughly half the old README, becomes `docs/runbooks/github-project-board.md`.
5. **Make the scaffold's claims true.** Add `pyproject.toml` with ruff and pytest configured, plus a CI workflow that runs exactly the documented commands. Describe the scaffold as minimal, because it is, and say why the source directories are empty on purpose.
6. **Date the history rather than hide it.** A timeline built from git, not memory, plus per-folder status markers separating "current" from "historic".

## Consequences

### Positive

- **An install cannot pick up dead commands.** The skip is enforced by the sync script, not by a reader noticing a heading that says "obsolete".
- **Every front-page claim is verifiable.** The scaffold was validated end to end before the claim was written: editable install, `ruff format --check`, `ruff check`, and `pytest` all run clean on a fresh copy.
- **The history became an asset instead of clutter.** Archived work with a dated explanation reads as a record of learning. The same files with no framing read as a repo nobody maintains.
- **Reusable by anyone.** MIT closes a gap that made the whole kit legally untouchable.

### Negative

- **Two more directories to keep honest.** `archive/` and `docs/runbooks/` each need their index kept accurate, and an archive with no curation is just a junk drawer with a nicer name.
- **The sync script gained a second skip rule.** More behavior to remember, and a future contributor could reasonably expect `archive/` to install.
- **Anyone who installed by `cp -r` still has the old commands.** The archive move does not reach into an existing `~/.claude`; those files must be removed by hand.
- **The scaffold now carries opinions.** Pinning ruff rules and a CI shape is a choice imposed on every project copied from it, and someone will disagree with the rule selection.

## Alternatives Considered

### Option: Delete the superseded commands
- **Pros:** Smallest repo, no ambiguity about what is current.
- **Cons:** Destroys the record that gives this repo its distinct value. ADR-0001 already demonstrated the better pattern: a decision record explaining why something died outlives the thing itself, but that works because the reasoning was captured. Deleting four commands with no equivalent record would just lose them.
- **Status:** rejected

### Option: Rename the repository
- **Pros:** The current name undersells `/dark-factory` and overstates the scaffold.
- **Cons:** Outward-facing and touches links already published elsewhere. GitHub redirects renamed repos, so it is safe, but it is the owner's call rather than a cleanup decision.
- **Status:** deferred to the owner

### Option: Fill out the Python scaffold properly
- **Pros:** Would make the original "clone once, start coding in 2 minutes" claim true rather than retiring it.
- **Cons:** A scaffold that pre-selects libraries you did not choose is a liability. The honest fix was to shrink the claim to match the artifact, not to grow the artifact to match the claim.
- **Status:** rejected, partially adopted (tooling config yes, dependencies no)

## Notes

The general principle, which is the same one behind `output-styles/concise.md` being kept as a cautionary artifact: **the failure that costs you a reader is not saying too much, it is saying something they can check and find wrong.** A buried fact annoys someone. A verifiable over-claim retroactively discredits the facts next to it.
