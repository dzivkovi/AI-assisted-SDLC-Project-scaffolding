# Development Preferences

> *"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."* — Antoine de Saint-Exupéry

## Core Philosophy

- **Less is More**: Remove everything non-essential
- **Domain Modeling First**: Architecture through domain understanding
- **Work Backwards**: Start from end goal, reverse-engineer the path
- **Analogies for Learning**: Concrete metaphors illuminate concepts

## Python Conventions

**Version**: Python 3.12

**Code Quality**:
- Linter/Formatter: RUFF (line-length=120)
- Type hints: MANDATORY for all parameters and returns

**Testing**:
- Framework: pytest (NOT unittest)
- Coverage: 80%+ minimum
- Strategy: Mocks and unit tests (end-to-end tests not viable in CI/CD)

**TDD Workflow** (MANDATORY):
1. RED: Write failing test → `test_<function>_<scenario>_<expected_result>()`
2. GREEN: Write minimal code to pass
3. REFACTOR: Clean up, keep tests passing

Use AAA pattern: Arrange, Act, Assert

## Critical Rules

- **Git**: NEVER auto-commit/add/push. Only when explicitly asked.
- **Files**: Prefer updating existing files over creating new ones
- **Content**: NEVER use emojis unless requested

## Communication Style

- **Direct**: No corporate speak
- **Concise**: One clear thought per response
- **Authentic**: Say what needs saying, nothing more

## Decision Making

When uncertain:
1. Identify the constraint that matters most
2. Choose the simplest solution that respects it
3. Ship, learn, iterate
