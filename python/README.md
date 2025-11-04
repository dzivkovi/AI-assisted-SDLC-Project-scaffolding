# PROJECT_NAME

> One-line description of what this project does.

## Status

🚧 In Development

## Overview

[TODO: Fill in after initial implementation. Explain the problem this project solves and the high-level solution.]

## Setup & Installation

This project requires **Python 3.12 or higher**.

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows

# 2. Upgrade pip (recommended)
python -m pip install --upgrade pip

# 3. Install all project and development dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt
````

## AI Assistant Onboarding

To work on this project, instruct your AI assistant (e.g., Claude, Gemini) to read the project preferences file. This will ensure it follows our specific design principles and coding style.

**Run this command in your AI chat:**

```text
Read @specs/preferences.md
```

## How to Use

[TODO: Add basic usage instructions or a code example.]

```bash
# Example:
python main.py
```

## Development Workflow

This project uses `ruff` for all formatting and linting.

```bash
# Auto-format all code
ruff format .

# Run linter and auto-fix what's possible
ruff check . --fix

# Run tests
pytest -v
```

## Project Documentation

  * **Product Requirements:** [specs/PRD.md](specs/PRD.md)
  * **Implementation Stories:** [specs/StoryBreakdown.md](specs/StoryBreakdown.md)
  * **Project Principles:** [specs/constitution.md](specs/constitution.md)

## Development Preferences

See [specs/preferences.md](specs/preferences.md) for development conventions.

## License

Proprietary - See LICENSE.md
