# AI-First Project Scaffolding

> *"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."*

## What is This?

This repository is the master "factory" for all new **Magma Inc.** projects. It provides three core components for our "spec-driven development" workflow:

1.  **An AI Assistant Kit (`claude-code/`):** A set of custom, client-safe slash commands ([`/dark-factory`](#flagship-dark-factory--overnight-autonomous-engineering), `/guardrail`, etc.) that install locally to your home directory. This is your "AI team." (The early issue-driven commands here - `/issue`, `/work`, `/kanban`, `/resume` - were a pre-publication reverse-engineering of [Compound Engineering](https://every.to/guides/compound-engineering) and are now superseded by its `/ce-...` commands.)
2.  **A Project Template (`python/`):** A production-ready, proprietary Python project skeleton with a best-practice `src` layout. This is the "product."
3.  **Project Visibility Setup:** GitHub Project board configuration for project tracking and stakeholder visibility. **Required for Claude Code compound engineering workflow.**

This system is designed so that the **AI Assistant Kit** (the tools) operates *on* the **Project Template** (the code), using **Project Visibility** for tracking and transparency, while remaining invisible to the client.

## Flagship: `/dark-factory` - Overnight Autonomous Engineering

Hand it a list of GitHub issues before bed; wake up to merged PRs. `/dark-factory` runs each ticket through the full [Compound Engineering](https://every.to/guides/compound-engineering) chain - plan, TDD, implementation, self-review - plus a non-Anthropic (Codex) peer review and a visual smoke gate, then **merges its own work** on clean-green instead of stalling for a human at 2am. Unattended is not unlimited: destructive actions outside its own branches are always parked, never performed, and everything that genuinely needs you lands in one end-of-run `## Decisions` list instead of scattered halt points. Say "review mode" / "halt before merge" in the invocation to fall back to opening PRs without merging them.

Proof, not a promise: [PR #41 on video-intel](https://github.com/dzivkovi/video-intel/pull/41) - 8 commits, 653 tests passing (49 new), a real-data smoke test matching the plan's estimate, and a multi-agent review that surfaced 2 polish items overnight, both applied cleanly. Ten minutes of human review, squash, merge.

Read the full story: [**"Software dark factories stopped being a fairy tale for me"**](https://www.linkedin.com/feed/update/urn:li:activity:7453892609665810434/) (LinkedIn).

- Command: [`claude-code/commands/dark-factory.md`](claude-code/commands/dark-factory.md)
- Built on [Kieran Klaassen's Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin)
- Repo it was proven on: [dzivkovi/video-intel](https://github.com/dzivkovi/video-intel)

## How to Use: The 3-Step Workflow

To start a new project (e.g., "CodeGnosis"):

### Step 1: Install the AI Assistant Kit (One Time Only)

Copy the `claude-code/` contents to your user's home directory. This installs the custom slash commands for your AI assistant.

```bash
# This makes your custom commands available in every project
cp -r claude-code/* ~/.claude/
```

### Step 2: Create the New Project

Copy the `python/` template to your new project's location.

```bash
# Example: Creating the new "CodeGnosis" project
cp -r python/ ~/work/CodeGnosis
cd ~/work/CodeGnosis

# You are now ready to work
git init
git add .
git commit -m "Initial scaffold"
```

### Step 3: Set Up Project Tracking (GitHub Project Board)

This step supports an issue-driven [Compound Engineering](https://every.to/guides/compound-engineering) workflow: each unit of work is tracked on a GitHub Project board for transparency. (This repo's original `/issue` and `/work` commands that drove the board are now superseded by Compound Engineering's `/ce-...` commands; set the board up if you want that tracking, skip it if you don't.)

> **Re-verified against GitHub on 2026-08-14.** Board creation and column setup are fully scriptable now, which they were not when this was first written. Only "Enable Automation" below still requires the web UI, and that limitation looks permanent: GitHub ships a `deleteProjectV2Workflow` mutation and no create or update counterpart.

**Prerequisite:** `gh auth status` must list the **`project`** scope alongside `repo`. Without it every command in this section fails, and not always with an obvious message. Add it with `gh auth refresh -s project`.

#### Creating Your Kanban Board

**Using CLI (Recommended):**

```bash
# 1. Create the project. Keep the returned "id" (PVT_...) and "number".
gh project create --owner YOUR-USERNAME --title "ProjectName Development" --format json

# 2. Read back the Status field id, its current options, and the view id.
gh api graphql -f query='
query { node(id: "PROJECT_ID") { ... on ProjectV2 {
  fields(first: 20) { nodes {
    ... on ProjectV2SingleSelectField { id name options { id name } } } }
  views(first: 5) { nodes { id name layout number } } } } }'
```

**Columns are options on a single-select `Status` field, not free-standing columns**, and a project created this way already ships with **Todo / In Progress / Done**. So "adding" the four you want leaves you with five and a stray `Todo`. Replace the whole set in one mutation instead. `singleSelectOptions` is a full replacement rather than a merge, and `description` is required, not decorative:

```bash
gh api graphql -f query='
mutation { updateProjectV2Field(input: {
  fieldId: "STATUS_FIELD_ID"
  singleSelectOptions: [
    {name: "Backlog",     color: GRAY,   description: "Items to be worked on in the future"},
    {name: "In Progress", color: YELLOW, description: "Current work in development"},
    {name: "In Review",   color: PURPLE, description: "Pull requests awaiting feedback"},
    {name: "Done",        color: GREEN,  description: "Completed work"}
  ]}) { projectV2Field { ... on ProjectV2SingleSelectField { options { id name } } } } }'
```

`gh project create` always produces a **table** view and accepts no template flag, so convert it. This replaces picking the "Board" template by hand:

```bash
gh api graphql -f query='
mutation { updateProjectV2View(input: {
  viewId: "VIEW_ID", name: "Board", layout: BOARD_LAYOUT
}) { projectV2View { name layout } } }'
```

A board view groups by `Status` on its own, so those four options become the four columns in that order.

**Using Web UI (Alternative):**

1. **Access Project Creation**: Navigate to your GitHub projects tab, then select "New project" and choose the "Board" template
2. **Name Your Board**: Title it appropriately (e.g., "ProjectName Development" or "Compound Engineering in Action")
3. **Configure Columns**: Create your workflow board with these columns (in order):
   - **Backlog**: Items to be worked on in the future
   - **In Progress**: Current work in development
   - **In Review**: Pull requests awaiting feedback
   - **Done**: Completed work
   - The board opens with a default set of columns already present, so rename and delete your way to the four above rather than only adding
   - To add columns, click the "+" button after the last column and select "New Column"
   - Reorder columns by dragging them
   - Edit column details through the "..." menu

#### Link Repository to Project

**Using CLI (Recommended):**
```bash
# From inside your repository directory
gh project list --owner YOUR-USERNAME
gh project link PROJECT-NUMBER

# Naming both explicitly is the form verified on 2026-08-14, and it works
# from any directory rather than depending on the current repo:
gh project link PROJECT-NUMBER --owner YOUR-USERNAME --repo YOUR-REPO
```

**Using Web UI (Alternative):**
- Check the project header for repository name indication
- Access project Settings → "Manage access" to link repositories if needed
- Verify "Projects" is enabled in repository Settings → Features

#### Enable Automation (Critical)

**This is the one step with no CLI path.** GitHub's GraphQL API can *read* workflow state and can delete a workflow, but there is no mutation to create or update one, so this must be done in a logged-in browser. Both workflows already exist on a new project; they are simply switched off.

Navigate to your project's workflow settings:
- **Direct URL:** `https://github.com/users/YOUR-USERNAME/projects/PROJECT-NUMBER/workflows`
- Or: Access the project menu (top right "..."), select "Workflows"

> **A 404 here means you are signed out, not that the URL changed.** A private project is invisible to an anonymous visitor, and GitHub serves its generic "Page not found" rather than a login prompt. This is easy to misread as a moved endpoint and waste time hunting for a replacement. There is no `/settings/workflows` variant. It also bites when driving a separate automation browser profile, which has its own cookie jar and is usually not signed in.

Configure these two essential workflows:

1. **"Item added to project"** workflow:
   - Click "Item added to project" in the left sidebar
   - Click the "Edit" button
   - Set the action to: **"Set status to Backlog"**
   - Save the workflow

2. **"Item closed"** workflow:
   - Click "Item closed" in the left sidebar
   - Click the "Edit" button
   - Set the action to: **"Set status to Done"**
   - Save the workflow

Two details that trip people up in the current UI:

- The save control reads **"Save and turn on workflow"** and stays **disabled until you pick a value**. Choosing the status is what arms it, so there is no separate enable toggle to hunt for.
- The sidebar's **"Workflows (N enabled)" counter lags by a page load**, so it is not confirmation. Verify from the API instead, where `enabled: true` is the only reliable signal:

```bash
gh api graphql -f query='
query { node(id: "PROJECT_ID") { ... on ProjectV2 {
  workflows(first: 30) { nodes { name number enabled } } } } }'
```

**Reference screenshots:**
- [Workflows overview](assets/github-workflows-overview.png)
- [Item closed configuration](assets/github-workflows-item-closed.png)

#### Optional: Make Project Public

Projects are created **private** by default, including via `gh project create`.

For public repositories:
- Navigate to project Settings
- Locate the "Danger zone" section
- Adjust visibility settings
- Benefit: public projects enable community visibility into your workflow

**If the linked repository is private, think before flipping this.** A project board carries issue titles, and the board is a separate object from the repo with its own visibility setting. Confirm what a signed-out visitor actually sees before making a board public over private work, rather than assuming the repo's privacy covers it.

#### Test Your Setup

Create and add a test issue to validate the automation:

**Using CLI (Recommended):**
```bash
# Step 1: Create the test issue
gh issue create --title "Test: Scaffolding Setup Validation" --body "This is a test issue to validate GitHub Project automation. If this appears in the Backlog column, the setup is working correctly. Safe to close after validation."

# Step 2: Add the issue to your project (the automation will set it to Backlog)
gh project item-add PROJECT-NUMBER --owner YOUR-USERNAME --url https://github.com/YOUR-USERNAME/YOUR-REPO/issues/1

# Example for CodeGnosis:
# gh project item-add 7 --owner dzivkovi --url https://github.com/dzivkovi/CodeGnosis/issues/1
```

**Using Web UI:**
1. **Create the issue:**
   - Go to your repository's Issues tab
   - Click "New issue"
   - Title: `Test: Scaffolding Setup Validation`
   - Body: `This is a test issue to validate GitHub Project automation. If this appears in the Backlog column, the setup is working correctly. Safe to close after validation.`
   - Click "Create issue"

2. **Add issue to project:**
   - On the right sidebar of the issue page, find "Projects"
   - Click "Add project" (or the gear icon)
   - Select your project from the dropdown
   - The issue should automatically move to the **Backlog** column

**Expected behavior:**
- When you add the issue to the project, it should automatically appear in the **Backlog** column
- When you close the issue, it should automatically move to the **Done** column

**Important:** The automation triggers when an issue is **added to** the project, not when it's created. You must explicitly add the issue to the project for the workflow to activate.

**Common convention:** Many developers use titles like "Hello World", "Test Issue", or "Scaffolding Test" for their first issue. The key is making it clearly identifiable as a test that can be safely closed.

#### Retrofitting a Board onto an Existing Backlog

The steps above assume a fresh project with one test issue. Putting a board over a repo that **already** has a hundred-plus issues is a different job, and it has two traps that cost real time on 2026-08-14.

Adding an item takes two calls, and there is no bulk endpoint:

```bash
ITEM_ID=$(gh project item-add PROJECT-NUMBER --owner YOUR-USERNAME --url "ISSUE_URL" --format json | jq -r .id)
gh project item-edit --id "$ITEM_ID" --project-id "PROJECT_ID" \
  --field-id "STATUS_FIELD_ID" --single-select-option-id "OPTION_ID"
```

`item-add` is idempotent, returning the existing item rather than duplicating, so a failed run is safe to re-run.

**Trap 1: enable the automation AFTER the import, not before.** The "Item added to project" workflow fires **asynchronously** on every add. If it is live while you bulk-import, it races your explicit `item-edit`: a closed issue can land in `Done` and get silently reset to `Backlog` a moment later. Import first, switch the workflows on last. If the order slips, re-verify rather than trusting the counts, and repair anything closed that is sitting in `Backlog`.

**Trap 2: the GraphQL rate limit will end your run, and it fails misleadingly.** Projects are a GraphQL-only surface with a **5,000 point per hour** budget and no REST fallback. A 169-item import exhausted the entire hourly budget and stranded the last 18 items. Once throttled, `gh project` commands return **empty output**, which reads exactly like "the board is empty" instead of "you are being throttled".

Check the budget before and during a bulk run. This endpoint is REST and does not itself consume GraphQL points:

```bash
gh api rate_limit -q '.resources.graphql'   # {"limit":5000,"remaining":N,"reset":<epoch>}
date -d @RESET_EPOCH                        # when it recovers
```

Two things burn the budget faster than the arithmetic suggests:

- **`item-add` and `item-edit` are not one point each.** `gh` resolves the project, its fields, and the item on every call.
- **Progress polling is the bigger cost.** `gh project item-list --limit 400` paginates the entire board and costs far more than a mutation, so polling it in a loop can outweigh the import itself. Fetch it **once** into a variable and derive every figure from that:

```bash
J=$(gh project item-list PROJECT-NUMBER --owner YOUR-USERNAME --limit 400 --format json)
echo "$J" | jq -r '[.items[].status] | group_by(.) | map({status:.[0], n:length}) | .[]'
echo "$J" | jq '.items|length'
```

If you do get throttled, stop every watcher immediately. Otherwise they re-consume the fresh budget the instant it resets, ahead of the retry that actually needs it.

**Map statuses honestly.** Open issues to `Backlog`, open pull requests to `In Review`, and issues closed as `COMPLETED` to `Done`. Filter with `select(.stateReason=="COMPLETED")` so that issues closed as **not planned** are left off the board entirely: listing abandoned work as `Done` overstates what shipped, and it is the first thing a reviewer notices. Expect `In Progress` to come out empty on a fresh import, because nothing in an imported backlog is genuinely mid-flight. Move those cards by hand.

## What's Inside

### 1\. The `python/` Project Template

This is the skeleton for your new product. It is structured using the "src" layout to prevent cluttering the root directory.

  * **`/src`**: **All Python source code lives here.** (Contains a `.gitkeep` file)
  * **`/docs`**: Project documentation. (Contains a `.gitkeep` file)
  * **`/tests`**: All `pytest` tests. (Contains a `.gitkeep` file)
  * **`/scripts`**: Utility scripts for dev tasks. (Contains a `.gitkeep` file)
  * **`/specs`**: The "brain" of the project (PRD, Stories, preferences).
  * `README.md`: The `README` for the *new project* (e.g., `CodeGnosis`).
  * `LICENSE.md`: The proprietary "All Rights Reserved" license.
  * `CONTRIBUTING.md`: Placeholder for internal contribution standards.
  * `requirements.txt` / `requirements-dev.txt`: Dependency files.

### 2\. The `claude-code/` AI Assistant Kit

These are your custom AI commands. They are kept separate in your home directory, so they are **invisible to your clients** and do not get checked into their source control.

  * **`/commands`**: The 12+ slash commands that form your development workflow.
  * **`settings.json`**: Configures the permissions for your AI assistant.

### 3\. Project Visibility Setup

GitHub Project board configuration for project tracking and stakeholder visibility.

  * **Kanban Board:** 4-column workflow (Backlog → In Progress → In Review → Done)
  * **Automation:** Auto-route issues to Backlog when added, to Done when closed
  * **Integration:** Links repository issues to project board for tracking
  * **Reference Assets:** Setup screenshots in `/assets/` for quick reference
  * **Purpose:** Supports an issue-driven [Compound Engineering](https://every.to/guides/compound-engineering) workflow where each unit of work makes subsequent work easier through systematic tracking and visibility. (The original `/issue` and `/work` commands are now superseded by its `/ce-...` commands.)

### 4\. Project Label Management

**CRITICAL:** Run `/setup-labels` **before** using `/compounding-engineering:plan`. The `/plan` command needs labels like `story`, `epic-0`, `P0` to exist or `gh issue create` will fail.

#### Quick Start

```bash
# 1. Check prerequisites
gh auth status

# 2. Run setup (from inside your new project)
/setup-labels

# 3. Review generated .github/LABELS.md and approve

# 4. Verify
gh label list  # Should show ~21 labels (9 defaults + 12 custom)
```

#### What It Does

The `/setup-labels` command:
- Reads `specs/StoryBreakdown.md` naturally (LLM understanding, no regex)
- Extracts epic titles automatically (Epic 0, Epic 1, etc.)
- Infers domain labels from context (dependencies, air-gapped, etc.)
- Generates `.github/LABELS.md` documentation
- Creates labels via `gh` CLI (skips existing ones)

#### Label Types Created

**Standard (3):** story, epic, infra
**Priorities (3):** P0, P1, P2
**Epic Tracking (N):** epic-0, epic-1, epic-2... (auto-generated from StoryBreakdown.md)
**Domain (2-4):** dependencies, air-gapped, security (inferred from PRD.md)

**Total:** 10-20 labels (target range)

#### Troubleshooting

- **"specs/StoryBreakdown.md not found"** → Ensure file exists with `## Epic 0: Title` format
- **"gh CLI not found"** → Install from https://cli.github.com/ and run `gh auth login`
- **Labels already exist** → Normal. Command skips existing labels.
- **Need to add Epic 4 later** → Edit StoryBreakdown.md, run `/setup-labels` again. Only new labels created.

### 5. Architecture Decision Records (ADRs)

**NEW:** Track architectural decisions with context for both humans and AI.

In AI-assisted development, decisions evolve rapidly and context windows are limited. ADRs serve as **persistent memory** for your project, capturing not just *what* you chose, but *why* you rejected alternatives.

#### Why ADRs Matter

**The Problem:**
- AI assistants have limited context windows
- Team members (human or AI) join projects mid-stream
- Decisions get re-litigated months later ("Why didn't we use X?")
- Valuable research gets lost in chat logs

**The Solution:**
- **Concise decision summaries** (300-500 words) that fit in AI context
- **Documented alternatives** show what was already tried
- **Immutable records** with superseding mechanism for evolving decisions
- **Two-tier system:** Team-facing ADRs + personal research in `/work/`

#### What's Included

ADR templates are **automatically included** in the Python scaffolding at `python/docs/adr/`:
- **README.md** - Process guide and index
- **template.md** - Michael Nygard format with AI-specific benefits

When you copy the `python/` template to start a new project, ADRs come with it - no extra steps needed.

#### Learn More

- [AWS: ADR Process Guide](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html) - Industry standard approach
- [Refactoring.fm: Engineering Docs in AI Era](https://refactoring.fm/p/how-engineering-docs-change-with) - How AI changes documentation needs
- [Salesforce: Human-Led, AI-Powered Decisions](https://www.salesforce.com/blog/architectural-decisions-human-led-ai-powered-approach/) - Real-world ADR adoption

**Bottom line:** ADRs are becoming essential for AI-assisted SDLC. Start using them from day one.

### 6. AI Research & Evaluation Prompts

**NEW:** Standalone prompts for research, planning, and quality assurance phases.

These aren't scaffolding-specific: they're general-purpose prompts I've battle-tested throughout 2025 for AI-assisted decision making. Use them with any reasoning AI (GPT, Gemini, Claude) before or during development.

#### What's Included

| Prompt | Purpose |
|--------|---------|
| **Multi-AI Research Synthesis** | Triangulate 3 reasoning AIs into convergence/divergence analysis |
| **Similarity Score Calculation** | Regression testing for AI outputs when there's no ground truth |
| **Architectural Comparison** | Compare patterns across 3+ repos to find consensus |
| **Consumer Reports Template** | Structured library/tool comparison with star ratings |

#### When to Use

- **Before coding:** Research architectural decisions, compare library options
- **During development:** Validate that prompt/embedding changes don't break existing answers
- **During planning:** Get structured comparisons instead of "it depends" answers

**See:** [prompts/README.md](prompts/README.md) for detailed usage and examples.

## Why This Scaffolding Exists

| Before (The Old Way) | After (The Magma Inc. Way) |
| :--- | :--- |
| Repeat setup for every new project. | **Clone once, start coding in 2 minutes.** |
| Forget `.gitignore` patterns or `ruff`. | **All best practices are baked in.** |
| Cluttered root with `.py` or `.sh` files. | **Clean `src`/`scripts` layout enforces separation.** |
| AI commands mixed with client code. | **AI tools are client-safe and separated.** |
| Specs and preferences are lost in chat. | **Specs are the "source of truth" in the repo.** |
