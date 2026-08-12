---
description: Unattended overnight engineering loop for your own repos. Takes ONE issue or a LIST of tickets; each gets its own worktree, PR, and debrief; MERGES its own work on clean-green rebase after ce-code-review + the Codex peer pass. Never stalls mid-run - out-of-scope destructive actions are parked (never performed), ambiguity goes to the Codex proxy, and genuine human-only calls are collected into one end-of-run "Decisions" list with exact file:line references. Say "review mode" / "halt before merge" in the invocation to restore the old halt-for-morning-review behavior. PRs target your own origin, never upstream (use /ship-it for upstream forks).
argument-hint: "[issue-number(s) | issue-url | empty for auto-pick | free-form description]"
model: opus
allowed-tools: [Bash, Read, Edit, Write, Skill, Agent, mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_close, mcp__playwright__browser_console_messages, mcp__playwright__browser_evaluate, mcp__playwright__browser_wait_for]
---

I'm going to bed. I trust your judgment. Use the Compound Engineering (/ce-...) chain to fix this end to end overnight.

> **Requires an Opus-capable subscription.** This command pins `model: opus` in its frontmatter (see rule 1.5) so an unattended run costs and reasons the same no matter which model your session happened to be on. If your plan or gateway does not offer Opus, change that one frontmatter line to a tier you do have - but change it deliberately rather than deleting it, because with no pin the orchestrator silently inherits the session tier.

**Task source:** $ARGUMENTS

If a number or a LIST of numbers, treat as issue number(s) in the current repo. If a URL, follow it. If free-form text, search existing issues for a match before treating as a new spec.

If `$ARGUMENTS` is empty, rank the open issues and take the top of the list:

```bash
ME=$(gh api user --jq .login)
gh issue list --state open --limit 1000 --json number,title,labels,assignees \
| jq --arg me "$ME" '
[ .[]
  # Mine or nobody'"'"'s. Never pick work someone else has already claimed.
  | select((.assignees | length) == 0 or any(.assignees[]; .login == $me))
  | . + {p: ([
      ((.labels // [])[].name | ascii_downcase | capture("^(?:priority[/: _-]*)?p(?<n>[0-3])$") | .n | tonumber),
      ((.labels // [])[].name | ascii_downcase | select(test("^(?:priority[/: _-]*)?(critical|urgent)$")) | 0),
      ((.labels // [])[].name | ascii_downcase | select(test("^(?:priority[/: _-]*)?high$")) | 1),
      ((.title // "")   | ascii_downcase | capture("^p(?<n>[0-3])[:.) ]") | .n | tonumber),
      9 ] | min)} ]
| sort_by(.p, .number)
| .[0:3]'
```

It scores each issue by the LOWEST (most urgent) signal it carries, so it reads `priority/p1`, `P2`, `priority: high`, `critical`, and a bare `P0:` title prefix alike, and anything unlabelled sorts last at 9 rather than being dropped. Within a band it is oldest-first. Show me the top 3 and start on the first; if the list comes back empty, say so and stop rather than inventing work.

Two things this deliberately does NOT do. It does **not** filter `--assignee @me` at the CLI: on a solo repo issues are typically unassigned, so that filter silently returns an empty set and the run dies at step one - instead it accepts unassigned OR mine and skips tickets someone else has claimed, which is the behavior you actually want on a shared repo too. And the label patterns are **anchored**, so a label like `group3` or `notp0` cannot be misread as a priority.

## The unattended contract (default mode)

This run is UNATTENDED end to end. Never halt the run to wait for me - not between tickets, not on the last one, not at any gate. The failure mode this contract exists to kill: a run that stalls at 2am on a question nobody is awake to answer, wasting the whole night.

- **Codex is my standing proxy.** For any judgment call: self-resolve from specs/corpus/code first; if still ambiguous, get `codex:codex-rescue`'s position and adopt any joint position. Escalate to me ONLY on genuine Claude-Codex non-consensus, or on a true taste/business/validation call an AI must not make. Per the TODO(HUMAN) policy (project CLAUDE.md): that tag is reserved for human-taste items that must START from a human - never for "the AIs couldn't decide."
- **Park, don't stall; park, don't perform.** When a ticket cannot proceed safely (a missing credential Codex can't route around, a destructive action outside this run's own artifacts, a genuine non-consensus), QUARANTINE that ticket: leave its branch/PR in a safe un-merged state, record a decision entry, and move to the next ticket. One stuck ticket never costs the rest of the night.
- **Decisions for me, at the end - one list, not buried tags.** Collect every parked item and every genuine human-only call into a single `## Decisions for <operator>` section of the final summary AND the closing chat message: exact `file:line`, the PR, both positions where there was disagreement, and your recommendation. I act from one highlighted list in the morning; I never hunt for markers scattered mid-diff.
- **Every Decisions item must be decision-SHAPED, not a statement.** The test: each item names (a) the choice as options I can pick between, (b) what changes if I pick differently (the revert point or alternative path), and (c) your recommendation. "I did X, flag if you disagree" is an FYI, not a decision - FYIs go in the debrief body, never in the Decisions list. And for any action only the human may execute (deleting worktrees/branches/files, revoking credentials, anything outside the AI's write-permissions): print the EXACT commands ready to copy-paste, never just describe them. *Why (2026-07-12):* a night summary listed four "decisions" of which zero were actual choices - the operator read them, found nothing to decide, and had to ask what was being asked; the cleanup commands he must run himself were missing entirely.
- **Review mode (opt-in):** if my invocation says "review mode" or "halt before merge", restore the legacy behavior - open PRs, do NOT merge, leave a ready-for-review comment with the smoke-test reference on each.

## Rules

1. **Full CE loop, single line trust grant.** Run brainstorm → plan → TDD → impl → validation → self-review → fix as the CE chain handles it. Do not orchestrate step-by-step from this prompt; trust the skills.

1.5. **Model routing - spend the premium tier on judgment, not on typing.** The `/ce-...` chain's reviewer personas keep their own pins; do not override them. For agents YOU dispatch during a ticket, route by what the task actually demands:
   - **Cheaper tier (pass `model: sonnet` explicitly on the `Agent` call):** work that is precise-execution against an already-written contract - scaffolding from an existing pattern, writing tests from a test contract stated in the issue, mechanical refactors, boilerplate, debrief/summary drafting, running and reporting a command's output. If the issue already says what "correct" is, an agent only has to hit it. **Tests are the sharp edge here:** a test is an executable spec, so a cheap tier writing one against an *ambiguous* issue can encode the wrong interpretation and every later implementer inherits it. Only delegate tests once the contract is unambiguous - if the issue does not state expected behavior precisely, normalize it on the session model FIRST (write the contract into the plan), then delegate typing it up.
   - **Session model (no override):** orchestration judgment - merge vs park, the Gate 2 scope guard, the Saint-Exupery filter on review findings, decision-shaping for the morning list, and any call where "correct" is still being decided rather than executed.
   - **Never route to a cheaper tier:** the merge/park decision itself, the destructive-action scope guard, or the final Decisions list. A wrong call there costs more than the whole night's token savings.

   Routing is only real when it is structural - an explicit `model:` argument on the `Agent` call, or a `model:` pin in frontmatter. An intention stated in the run prompt is not routing: with no explicit argument the agent silently inherits the session tier, whatever that happens to be. That inheritance is why this command pins `model: opus` in its own frontmatter - an overnight loop should cost and reason the same whether you happened to launch it from a cheap tier or an expensive long-context one, and the orchestrator's context grows across every ticket in the batch, so it is the single biggest lever on the night's bill. Change that pin if you want a different orchestrator tier; do not remove it and rely on remembering to set the session model first. State the split you used in the night summary so the next run can audit it.

2. **GATE 1 — real-input smoke test before declaring done.** Run the feature on real input. Capture pre-fix vs post-fix output as a section in the debrief. Check validation commands' EXIT CODES directly - never through a pipe (a `| tail` masks a red exit). Before smoking in a fresh worktree, check the project CLAUDE.md for worktree traps (gitignored assets - corpora, fixtures, .env - that must be copied in first). If an input is genuinely missing and Codex cannot route around it: do NOT halt - park the ticket with a decision entry and continue to the next.

   **Whole-system smoke, not feature-local smoke - where the project HAS a whole system.** This whole paragraph is conditional on the project defining a smoke entrypoint (a `scripts/smoke.py`, `make smoke`, or a "Definition of done" command in project CLAUDE.md). Where one exists, Gate 1 means running THAT - the full suite against the DEPLOYED system after the merge/deploy step, never a hand-picked subset - and a feature with a runtime surface must ship its own e2e suite in whatever location that entrypoint auto-discovers (e.g. `scripts/e2e_*.py`), so system coverage grows with the feature list instead of lagging it. Local tests green + deployed smoke unrun = NOT done. Where the project has NO smoke entrypoint and no deploy step (a library, a CLI, a plugin), do not invent one inside an unrelated ticket: Gate 1 reverts to its base meaning - run the changed behavior on real input and show pre-fix vs post-fix. Building the missing harness is its own ticket, not silent scope added to this one. Either way the debrief must record WHICH entrypoint you resolved to, or "none found" plus where you looked - otherwise "no smoke entrypoint" is indistinguishable from "did not check". *Why (2026-07-16):* branded-pptx merged with 7 green local tests and zero deployed runs; the owner found the gap in production the next morning.

2.5. **GATE 1.5 — visual smoke test for any UI / dashboard / rendered-asset surface.** If the change adds or modifies a web-rendered surface OR a rendered image (HTML page, dashboard, frontend, served content, OG/social image, chart, logo/mark), launch it in headless Playwright via `mcp__playwright__browser_navigate`, capture an accessibility snapshot via `mcp__playwright__browser_snapshot` (preferred over screenshot for assertions), and assert:
   - (a) page loads with no errors-level entries from `mcp__playwright__browser_console_messages`;
   - (b) every component/panel the spec calls out is present in the DOM **AND renders fully within the frame** — not clipped, overflowing, zero-size, off-screen, or mis-coloured. **DOM-present is NOT rendered-correct.** For a mark/logo/chart/key element, verify each extremity sits inside its container by *measuring* (`mcp__playwright__browser_evaluate` with `getBoundingClientRect` / SVG `getBBox` vs the viewport/viewBox bounds), not by eyeballing the screenshot — geometry catches a clip the eye glosses over;
   - (c) at least one full-page screenshot via `mcp__playwright__browser_take_screenshot` saved to `work/YYYY-MM-DD/screenshots/` (in EVERY theme the surface supports, when themable);
   - (d) **fresh-eye visual review — the visual MoE.** Dispatch a SEPARATE `Agent` to look at the saved screenshot with an adversarial brief: *"what in this image is clipped, overflowing, misaligned, unreadable, low-contrast, or off-brand?"* The agent that built the surface has confirmation bias — it sees what it intended to make, so its own glance is not a review. A second, build-context-free set of eyes is. Apply load-bearing findings before the PR.
   Close the browser with `mcp__playwright__browser_close` when done. HTTP 200 alone is insufficient — a server can return 200 while the JS renders nothing, and an element can sit in the DOM while rendering clipped. Curl proves the server didn't crash; Gate 1.5 proves the user-visible surface actually *looks* right.

3. **GATE 2 — scope guard, not a stop sign.**
   - **(a) Destructive operations:** standing "go" for this run's OWN mechanics only - creating/removing this run's worktrees and feature branches, force-pushing THIS run's feature branches, squash-merging its clean-green PRs. Anything destructive beyond that (real-data deletion, schema drops, live storage prefixes, branches/artifacts the run doesn't own, any force-push of main) is PARKED, never performed and never a stall: quarantine the ticket, decision entry, next ticket.
   - **(b) Merge step — default: merge your own work.** After Gate 1/1.5 pass and the rule-4/4.5 review findings are applied, rebase on latest origin/main and squash-merge on clean-green. A red check, a failed rebase, or an unresolved P0/P1 means the PR stays OPEN and PARKED with a decision entry - never silently merged, never a stalled run. (In opt-in review mode, this gate reverts to halt-before-merge.)

4. **`/ce-code-review` on your own work; address P1 findings before the PR.** Run the full reviewer team — the skill auto-selects applicable personas based on the diff. P0/critical = non-negotiable. P1 requiring architectural scope expansion = a decision entry (park if load-bearing) instead of guessing. Lower-severity findings get the **Saint-Exupéry filter**: for each finding ask "would deferring this for two weeks make the diff worse, same, or better?" — defer everything that scores *same*. Cosmetic, refactor-for-refactor's-sake, theoretical-edge-case, and style-preference findings almost always score "same."

4.5. **Codex peer review after the PR opens.** Once the PR is open (before the Gate-2(b) merge), dispatch `codex:codex-rescue` for a non-Anthropic second opinion on the diff. The brief should include: the PR URL or diff path, intent summary, **what ce-code-review applied AND what it deferred** (so Codex doesn't duplicate the work above), and a focused ask: *"flag what only a non-Anthropic eye would catch — cross-layer reasoning, data-flow asymmetries, idiom-level concerns the Sonnet reviewers missed."* Apply Codex's load-bearing findings with the same Saint-Exupéry filter. Push the fixes as a second commit on the feature branch and add a final PR comment summarizing both review passes (what each caught, what was applied vs deferred, the merge verdict). Empirically validated repeatedly: Codex catches real bugs the in-family reviewers miss (non-string keyword crash, metadata asymmetry, a cross-bucket IAM gap, stale binding docs). The non-Anthropic perspective is the cheapest reliability gain we have. Skip only if `codex:codex-rescue` is unavailable in the current environment. Note: the wrapper returns its verdict IN its final message - capture it from the agent result; do not wait on files it never writes.

   **Scope limit (read this):** this MoE pass is the **code layer**. Codex (and the `/ce-...` personas) read the *diff text*, not pixels — they cannot see a clipped logo, a broken layout, an overflowing card, or a mis-coloured chart. A valid `viewBox`/CSS value that renders wrong looks fine in the diff. Rendered-visual correctness is **Gate 1.5's job** (rule 2.5b geometry check + 2.5d fresh-eye visual review), which is the *visual* analog of this code MoE. Run both; they cover different layers, and a green code review says nothing about whether the picture looks right.

5. **Premise-dependent claims with falsifiers.** In the PR body and debrief, label any claim that depends on an unverified premise. State the premise and what would falsify it. Overnight work can't probe back-and-forth, so this gives morning-me a clean review surface.

   **Closes discipline - a premise-dependent claim forbids "Closes #N".** A PR body may carry `Closes #N` ONLY when every acceptance criterion of #N is live-proven in this run (Gate 1 on the deployed system). If ANY premise-dependent claim touching #N's acceptance remains unverified, write `Refs #N` instead, leave the ticket open, and add a decision entry naming what would close it. A documented caveat inside a closed ticket is a lie the tracker tells the owner. *Why (2026-07-16):* PR #15 documented "runs on serverless" as an unverified premise AND said "Closes #2" - the owner read the closed ticket as shipped and discovered otherwise in production.

   **Every deferred close needs a way back, or it becomes backlog.** A rule that only says when NOT to close is a ratchet: tickets accumulate in a state nobody owns. So whenever you write `Refs #N` instead of `Closes #N`, also label #N `awaiting-verification` (create the label if the repo lacks it) and state in the comment the ONE check that would close it. Then at the START of every run, before touching the batch, list `awaiting-verification` issues and try to discharge them: if the premise is now verifiable in this repo, verify it, REMOVE the label and close the ticket; if it is not, leave it and say so in the night summary. Bound this so it cannot eat the night: **at most 15 minutes and only the oldest 5**, then move on to the batch regardless. Apply the label only where the blocking premise is real and stated - a label on everything is a label on nothing, and an unbounded sweep just re-litigates the same queue every run.

6. **Commit + push + PR against `origin`** — the repo I own. Never push to or PR against `upstream` even if it exists. Branch off origin's default branch in an isolated worktree (let `/ce-worktree` decide name and location).

7. **Skill-parity update — same diff.** Anything durable about conventions discovered during the run gets reflected back into project CLAUDE.md / SKILL.md / relevant skill files in the SAME diff as the code change. Skill-parity is a guardrail, not a nice-to-have.

8. **Memory update with durable items.** Any pattern that should outlive this session goes into project memory at `~/.claude/projects/<project-key>/memory/` per the auto-memory rules.

9. **Ambiguity goes to the proxy, never to idling.** When you hit ambiguity: specs/corpus first, then Codex (the standing-proxy chain above). Durable spec-level questions still land in the spec doc's `## Open questions` so the next run sees them - but everything that needs MY answer is ALSO aggregated into the end-of-run Decisions list. Never sit idle waiting for me.

## Multi-ticket batches (the normal case)

`$ARGUMENTS` is usually a LIST. Process tickets SEQUENTIALLY, each in its own worktree with its own PR and debrief; rebase on latest origin/main before starting each (so ticket N+1 builds on merged ticket N). A parked ticket never blocks the next one. After the last ticket, write a night summary (`work/YYYY-MM-DD/NN-night-summary.md`): the scoreboard (ticket → PR → merged/parked), the `## Decisions for <operator>` section, follow-ups filed, and anything deferred - and repeat the Decisions list in the closing chat message.

## Parallel runs (two windows, one repo)

Worktrees isolate the working files and each has its own index; the shared .git is lock-safe. What keeps two simultaneous runs from colliding:

- Rebase on latest origin/main IMMEDIATELY before each merge - GitHub serializes the merges, the second lands on top of the first.
- Respect surface assignments from the invocation (e.g. "do not touch the /demo block") - disjoint surfaces make every rebase trivial.
- At most ONE run deploys, and only when its invocation explicitly says so. Deploying is never implied by a merge.

## Debrief artifact

Write a debrief to `work/YYYY-MM-DD/<NN>-<slug>-debrief.md` covering:
- Issue link
- Branch name + worktree path
- PR URL + merged/parked status
- **Smoke-test section** (from Gate 1) with pre-fix vs post-fix output
- **Premise-dependent claims** with their falsifiers
- Decision entries this ticket contributed (also aggregated in the night summary)
- Anything updated in CLAUDE.md / skills / memory

## Failure-mode callout

"Green tests = merge-ready" is insufficient. Gate 1 is mandatory. A run that has all tests green but no real-input smoke test is NOT done.

And **"in the DOM" is not "rendered correctly,"** and a screenshot the builder glanced at is not a review. Empirically (magmainc.ca OG image, 2026-06-03): a clipped logo arc shipped past `/ce-code-review`, past the Codex MoE, and past a self-glance at the render — caught only by a human at full size. Code review is blind to pixels by construction; the builder is blind to its own render by confirmation bias. That is why Gate 1.5 demands a *geometry* check (2.5b) and a *fresh-eye* visual reviewer (2.5d), not just "present in DOM + screenshot saved."

Go.
