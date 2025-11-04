# AI-First Project Scaffolding

> *"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."*

## What is This?

This repository is the master "factory" for all new **Magma Inc.** projects. It provides the two core components for our "spec-driven development" workflow:

1.  **An AI Assistant Kit (`claude-code/`):** A set of custom, client-safe slash commands (`/issue`, `/work`, etc.) that install locally to your home directory. This is your "AI team."
2.  **A Project Template (`python/`):** A production-ready, proprietary Python project skeleton with a best-practice `src` layout. This is the "product."

This system is designed so that the **AI Assistant Kit** (the tools) operates *on* the **Project Template** (the code), while remaining invisible to the client.

## How to Use: The 2-Step Workflow

To start a new project (e.g., "CodeGnosis"):

### Step 1: Install the AI Assistant Kit (One Time Only)

Copy the `claude-code/` contents to your user's home directory. This installs the custom slash commands for your AI assistant.

```bash
# This makes your custom commands available in every project
cp -r claude-code/* ~/.claude/
````

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

## Why This Scaffolding Exists

| Before (The Old Way) | After (The Magma Inc. Way) |
| :--- | :--- |
| Repeat setup for every new project. | **Clone once, start coding in 2 minutes.** |
| Forget `.gitignore` patterns or `ruff`. | **All best practices are baked in.** |
| Cluttered root with `.py` or `.sh` files. | **Clean `src`/`scripts` layout enforces separation.** |
| AI commands mixed with client code. | **AI tools are client-safe and separated.** |
| Specs and preferences are lost in chat. | **Specs are the "source of truth" in the repo.** |
