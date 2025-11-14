# AI-First Project Scaffolding

> *"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."*

## What is This?

This repository is the master "factory" for all new **Magma Inc.** projects. It provides three core components for our "spec-driven development" workflow:

1.  **An AI Assistant Kit (`claude-code/`):** A set of custom, client-safe slash commands (`/issue`, `/work`, etc.) that install locally to your home directory. This is your "AI team."
2.  **A Project Template (`python/`):** A production-ready, proprietary Python project skeleton with a best-practice `src` layout. This is the "product."
3.  **Project Visibility Setup:** GitHub Project board configuration for project tracking and stakeholder visibility. **Required for Claude Code compound engineering workflow.**

This system is designed so that the **AI Assistant Kit** (the tools) operates *on* the **Project Template** (the code), using **Project Visibility** for tracking and transparency, while remaining invisible to the client.

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

**CRITICAL:** This step is **required** for the Claude Code compound engineering workflow. The `/issue` and `/work` commands depend on a properly configured GitHub Project board for tracking and transparency.

#### Creating Your Kanban Board

1. **Access Project Creation**: Navigate to your GitHub projects tab, then select "New project" and choose the "Board" template
2. **Name Your Board**: Title it appropriately (e.g., "ProjectName Development" or "Compound Engineering in Action")
3. **Configure Columns**: Create your workflow board with these columns (in order):
   - **Backlog**: Items to be worked on in the future
   - **In Progress**: Current work in development
   - **In Review**: Pull requests awaiting feedback
   - **Done**: Completed work
   - To add columns, click the "+" button after the last column and select "New Column"
   - Reorder columns by dragging them
   - Edit column details through the "..." menu

#### Link Repository to Project

**Using CLI (Recommended):**
```bash
# From inside your repository directory
gh project list --owner YOUR-USERNAME
gh project link PROJECT-NUMBER
```

**Using Web UI (Alternative):**
- Check the project header for repository name indication
- Access project Settings → "Manage access" to link repositories if needed
- Verify "Projects" is enabled in repository Settings → Features

#### Enable Automation (Critical)

Navigate to your project's workflow settings:
- **Direct URL:** `https://github.com/users/YOUR-USERNAME/projects/PROJECT-NUMBER/workflows`
- Or: Access the project menu (top right "..."), select "Workflows"

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

**Reference screenshots:**
- [Workflows overview](assets/github-workflows-overview.png)
- [Item closed configuration](assets/github-workflows-item-closed.png)

#### Optional: Make Project Public

For public repositories:
- Navigate to project Settings
- Locate the "Danger zone" section
- Adjust visibility settings
- Benefit: public projects enable community visibility into your workflow

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
  * **Purpose:** **Required for Claude Code's `/issue` and `/work` commands** - enables compound engineering workflow where each unit of work makes subsequent work easier through systematic tracking and visibility.

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

## Why This Scaffolding Exists

| Before (The Old Way) | After (The Magma Inc. Way) |
| :--- | :--- |
| Repeat setup for every new project. | **Clone once, start coding in 2 minutes.** |
| Forget `.gitignore` patterns or `ruff`. | **All best practices are baked in.** |
| Cluttered root with `.py` or `.sh` files. | **Clean `src`/`scripts` layout enforces separation.** |
| AI commands mixed with client code. | **AI tools are client-safe and separated.** |
| Specs and preferences are lost in chat. | **Specs are the "source of truth" in the repo.** |
