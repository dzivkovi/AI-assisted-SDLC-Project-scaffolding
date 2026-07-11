---
description: Unattended overnight engineering loop for your own repos. Takes ONE issue or a LIST of tickets; each gets its own worktree, PR, and debrief; MERGES its own work on clean-green rebase after ce-code-review + the Codex peer pass. Never stalls mid-run - out-of-scope destructive actions are parked (never performed), ambiguity goes to the Codex proxy, and genuine human-only calls are collected into one end-of-run "Decisions" list with exact file:line references. Say "review mode" / "halt before merge" in the invocation to restore the old halt-for-morning-review behavior. PRs target your own origin, never upstream (use /ship-it for upstream forks).
argument-hint: "[issue-number(s) | issue-url | empty for auto-pick | free-form description]"
allowed-tools: [Bash, Read, Edit, Write, Skill, Agent, mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_close, mcp__playwright__browser_console_messages, mcp__playwright__browser_evaluate, mcp__playwright__browser_wait_for]
---

I'm going to bed. I trust your judgment. Use the Compound Engineering (/ce-...) chain to fix this end to end overnight.

**Task source:** $ARGUMENTS

If `$ARGUMENTS` is empty, run `gh issue list --assignee @me --state open --json number,title,labels --jq 'sort_by(.labels | map(.name) | contains(["priority:high"])) | reverse | .[0]'` to pick the highest-priority issue assigned to me. If a number or a LIST of numbers, treat as issue number(s) in the current repo. If a URL, follow it. If free-form text, search existing issues for a match before treating as a new spec.

## The unattended contract (default mode)

This run is UNATTENDED end to end. Never halt the run to wait for me - not between tickets, not on the last one, not at any gate. The failure mode this contract exists to kill: a run that stalls at 2am on a question nobody is awake to answer, wasting the whole night.

- **Codex is my standing proxy.** For any judgment call: self-resolve from specs/corpus/code first; if still ambiguous, get `codex:codex-rescue`'s position and adopt any joint position. Escalate to me ONLY on genuine Claude-Codex non-consensus, or on a true taste/business/validation call an AI must not make. Per the TODO(HUMAN) policy (project CLAUDE.md): that tag is reserved for human-taste items that must START from a human - never for "the AIs couldn't decide."
- **Park, don't stall; park, don't perform.** When a ticket cannot proceed safely (a missing credential Codex can't route around, a destructive action outside this run's own artifacts, a genuine non-consensus), QUARANTINE that ticket: leave its branch/PR in a safe un-merged state, record a decision entry, and move to the next ticket. One stuck ticket never costs the rest of the night.
- **Decisions for me, at the end - one list, not buried tags.** Collect every parked item and every genuine human-only call into a single `## Decisions for <operator>` section of the final summary AND the closing chat message: exact `file:line`, the PR, both positions where there was disagreement, and your recommendation. I act from one highlighted list in the morning; I never hunt for markers scattered mid-diff.
- **Review mode (opt-in):** if my invocation says "review mode" or "halt before merge", restore the legacy behavior - open PRs, do NOT merge, leave a ready-for-review comment with the smoke-test reference on each.

## Rules

1. **Full CE loop, single line trust grant.** Run brainstorm → plan → TDD → impl → validation → self-review → fix as the CE chain handles it. Do not orchestrate step-by-step from this prompt; trust the skills.

2. **GATE 1 — real-input smoke test before declaring done.** Run the feature on real input. Capture pre-fix vs post-fix output as a section in the debrief. Check validation commands' EXIT CODES directly - never through a pipe (a `| tail` masks a red exit). Before smoking in a fresh worktree, check the project CLAUDE.md for worktree traps (gitignored assets - corpora, fixtures, .env - that must be copied in first). If an input is genuinely missing and Codex cannot route around it: do NOT halt - park the ticket with a decision entry and continue to the next.

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
