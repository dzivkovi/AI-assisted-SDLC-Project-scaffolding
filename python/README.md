# PROJECT_NAME

> One-line description of what this project does.

## Status

In development.

## Overview

[TODO: Fill in after initial implementation. Explain the problem this project solves and the high-level solution.]

## Setup

Requires **Python 3.12 or higher**.

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate      # .venv\Scripts\activate on Windows

# 2. Install the project (editable) plus dev tooling
python -m pip install --upgrade pip
pip install -e ".[dev]"

# 3. Runtime dependencies, once you have any
pip install -r requirements.txt
```

Using [uv](https://docs.astral.sh/uv/) instead is a drop-in replacement and considerably faster:

```bash
uv venv && uv pip install -e ".[dev]"
```

The editable install is what makes the `src` layout work: your tests import the package the way a user would, not by accident of the current working directory.

## AI assistant onboarding

Point your AI assistant at the project preferences before it writes anything, so it follows this project's conventions rather than its defaults.

```text
Read @specs/preferences.md
```

## Usage

[TODO: Add basic usage instructions or a code example.]

## Development workflow

`ruff` handles both formatting and linting. Configuration lives in `pyproject.toml`, and CI runs exactly these commands, so a clean local run means a green build.

```bash
ruff format .           # format
ruff check . --fix      # lint, fixing what is safely fixable
pytest -v               # tests
pytest --cov=src        # tests with coverage
```

CI is defined in [.github/workflows/ci.yml](.github/workflows/ci.yml). It lints, then tests. An empty test suite passes on a fresh scaffold; a failing one does not.

## Project documentation

Specs are the source of truth for what this project is meant to do, and they are what an AI assistant reads first. Only `preferences.md` ships with the scaffold. Create the rest as the project earns them.

  * **Development conventions:** [specs/preferences.md](specs/preferences.md) (included)
  * **Product requirements:** `specs/PRD.md` (create when scope firms up)
  * **Implementation stories:** `specs/StoryBreakdown.md` (create when breaking work into issues)
  * **Project principles:** `specs/constitution.md` (create when conventions need enforcing)
  * **Architecture decisions:** [docs/adr/](docs/adr/) (template included, add records as decisions are made)

## License

Proprietary, all rights reserved. See [LICENSE.md](LICENSE.md).

This is the scaffold's default because most new projects start closed. Replace it with whatever terms this project actually needs.
