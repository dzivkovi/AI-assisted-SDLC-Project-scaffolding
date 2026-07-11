---
description: Overnight autonomous engineering loop for your own repos. Starts from a GitHub issue (number, URL, or auto-pick from issues assigned to you). Trusts the Compound Engineering chain to self-orchestrate. PRs target your own origin, never upstream. Halts before merge for your morning review. For PRs to upstream forks, use /ship-it instead.
argument-hint: "[issue-number | issue-url | empty for auto-pick | free-form description]"
allowed-tools: [Bash, Read, Edit, Write, Skill, Agent, mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_close, mcp__playwright__browser_console_messages, mcp__playwright__browser_evaluate, mcp__playwright__browser_wait_for]
---

I'm going to bed. I trust your judgment. Use the Compound Engineering (/ce-...) chain to fix this end to end overnight.

**Task source:** $ARGUMENTS

If `$ARGUMENTS` is empty, run `gh issue list --assignee @me --state open --json number,title,labels --jq 'sort_by(.labels | map(.name) | contains(["priority:high"])) | reverse | .[0]'` to pick the highest-priority issue assigned to me. If a number, treat as issue number in the current repo. If a URL, follow it. If free-form text, search existing issues for a match before treating as a new spec.

## Rules

1. **Full CE loop, single line trust grant.** Run brainstorm → plan → TDD → impl → validation → self-review → fix as the CE chain handles it. Do not orchestrate step-by-step from this prompt; trust the skills.

2. **GATE 1 — real-input smoke test before declaring done.** Run the feature on real input. Capture pre-fix vs post-fix output as a section in the debrief. If a fixture/URL/credential is needed and not provided, halt with `## Open questions` (in the spec/brainstorm doc — see rule 9 — not buried in the debrief).

2.5. **GATE 1.5 — visual smoke test for any UI / dashboard / rendered-asset surface.** If the change adds or modifies a web-rendered surface OR a rendered image (HTML page, dashboard, frontend, served content, OG/social image, chart, logo/mark), launch it in headless Playwright via `mcp__playwright__browser_navigate`, capture an accessibility snapshot via `mcp__playwright__browser_snapshot` (preferred over screenshot for assertions), and assert:
   - (a) page loads with no errors-level entries from `mcp__playwright__browser_console_messages`;
   - (b) every component/panel the spec calls out is present in the DOM **AND renders fully within the frame** — not clipped, overflowing, zero-size, off-screen, or mis-coloured. **DOM-present is NOT rendered-correct.** For a mark/logo/chart/key element, verify each extremity sits inside its container by *measuring* (`mcp__playwright__browser_evaluate` with `getBoundingClientRect` / SVG `getBBox` vs the viewport/viewBox bounds), not by eyeballing the screenshot — geometry catches a clip the eye glosses over;
   - (c) at least one full-page screenshot via `mcp__playwright__browser_take_screenshot` saved to `work/YYYY-MM-DD/screenshots/`;
   - (d) **fresh-eye visual review — the visual MoE.** Dispatch a SEPARATE `Agent` to look at the saved screenshot with an adversarial brief: *"what in this image is clipped, overflowing, misaligned, unreadable, low-contrast, or off-brand?"* The agent that built the surface has confirmation bias — it sees what it intended to make, so its own glance is not a review. A second, build-context-free set of eyes is. Apply load-bearing findings before the PR.
   Close the browser with `mcp__playwright__browser_close` when done. HTTP 200 alone is insufficient — a server can return 200 while the JS renders nothing, and an element can sit in the DOM while rendering clipped. Curl proves the server didn't crash; Gate 1.5 proves the user-visible surface actually *looks* right.

3. **GATE 2 — two-clause halt.**
   - **(a) Destructive operations on real data** (file/branch deletions, schema drops, force-pushes, irreversible API calls): stop for explicit "go".
   - **(b) Merge step:** open the PR but DO NOT merge — even after Gate 1 passes, I want to see the diff and the smoke-test output together before clicking merge. Leave a "ready for review" comment with the smoke-test reference.

4. **`/ce-code-review` on your own work; address P1 findings before the PR.** Run the full reviewer team — the skill auto-selects applicable personas based on the diff. P0/critical = non-negotiable. P1 requiring architectural scope expansion = `## Open questions` instead of guessing. Lower-severity findings get the **Saint-Exupéry filter**: for each finding ask "would deferring this for two weeks make the diff worse, same, or better?" — defer everything that scores *same*. Cosmetic, refactor-for-refactor's-sake, theoretical-edge-case, and style-preference findings almost always score "same."

4.5. **Codex peer review after the PR opens.** Once the PR is open (just before the Gate-2(b) merge halt), dispatch `codex:codex-rescue` for a non-Anthropic second opinion on the diff. The brief should include: the PR URL or diff path, intent summary, **what ce-code-review applied AND what it deferred** (so Codex doesn't duplicate the work above), and a focused ask: *"flag what only a non-Anthropic eye would catch — cross-layer reasoning, data-flow asymmetries, idiom-level concerns the Sonnet reviewers missed."* Apply Codex's load-bearing findings with the same Saint-Exupéry filter. Push the fixes as a second commit on the feature branch and add a final PR comment summarizing both review passes (what each caught, what was applied vs deferred, the merge verdict). Empirically validated on two production PRs: Codex caught real bugs the Sonnet reviewers missed every time (non-string keyword crash, extract-vs-last30days_runs metadata asymmetry, disjointness shadow risk). The non-Anthropic perspective is the cheapest reliability gain we have. Skip only if `codex:codex-rescue` is unavailable in the current environment.

   **Scope limit (read this):** this MoE pass is the **code layer**. Codex (and the `/ce-...` personas) read the *diff text*, not pixels — they cannot see a clipped logo, a broken layout, an overflowing card, or a mis-coloured chart. A valid `viewBox`/CSS value that renders wrong looks fine in the diff. Rendered-visual correctness is **Gate 1.5's job** (rule 2.5b geometry check + 2.5d fresh-eye visual review), which is the *visual* analog of this code MoE. Run both; they cover different layers, and a green code review says nothing about whether the picture looks right.

5. **Premise-dependent claims with falsifiers.** In the PR body and debrief, label any claim that depends on an unverified premise. State the premise and what would falsify it. Overnight work can't probe back-and-forth, so this gives morning-me a clean review surface.

6. **Commit + push + PR against `origin`** — the repo I own. Never push to or PR against `upstream` even if it exists. Branch off origin's default branch in an isolated worktree (let `/ce-worktree` decide name and location).

7. **Skill-parity update — same diff.** Anything durable about conventions discovered during the run gets reflected back into project CLAUDE.md / SKILL.md / relevant skill files in the SAME diff as the code change. Skill-parity is a guardrail, not a nice-to-have.

8. **Memory update with durable items.** Any pattern that should outlive this session goes into project memory at `~/.claude/projects/<project-key>/memory/` per the auto-memory rules.

9. **Open-questions escalation, not stalling.** When you hit ambiguity, append to `## Open questions` in the spec/brainstorm doc — questions live with the spec so the next run reading the spec sees them. Fall back to the debrief if no spec doc exists. Never sit idle waiting for me.

## Debrief artifact

Write a debrief to `work/YYYY-MM-DD/<NN>-<slug>-debrief.md` covering:
- Issue link
- Branch name + worktree path
- PR URL
- **Smoke-test section** (from Gate 1) with pre-fix vs post-fix output
- **Premise-dependent claims** with their falsifiers
- Open questions for me to resolve in the morning (cross-reference the spec doc if also there)
- Anything updated in CLAUDE.md / skills / memory

## Failure-mode callout

"Green tests = merge-ready" is insufficient. Gate 1 is mandatory. A run that has all tests green but no real-input smoke test is NOT done.

And **"in the DOM" is not "rendered correctly,"** and a screenshot the builder glanced at is not a review. Empirically (magmainc.ca OG image, 2026-06-03): a clipped logo arc shipped past `/ce-code-review`, past the Codex MoE, and past a self-glance at the render — caught only by a human at full size. Code review is blind to pixels by construction; the builder is blind to its own render by confirmation bias. That is why Gate 1.5 now demands a *geometry* check (2.5b) and a *fresh-eye* visual reviewer (2.5d), not just "present in DOM + screenshot saved."

Go.
