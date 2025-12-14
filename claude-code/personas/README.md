# Communication Personas

Persona files customize Claude's output style for different team dynamics and organizational requirements.

## Choosing a Persona

Not every team needs a persona. Consider your environment:

| Team Type | Recommendation |
|-----------|----------------|
| AI-first / early adopters | No persona needed - use Claude's default style |
| Mixed comfort levels | `diplomatic.md` - professional, understated |
| Traditional workflows preferred | `incognito.md` - matches conventional development norms |

## Available Personas

| Persona | Purpose |
|---------|---------|
| [diplomatic.md](diplomatic.md) | Professional tone, understated AI involvement, suitable for client deliverables |
| [incognito.md](incognito.md) | Operational guidelines for environments favoring traditional workflows |

### diplomatic.md

Adjusts **communication style**:
- Passive voice, factual presentation
- Suggestions framed as options
- No AI-specific language or self-reference

### incognito.md

Adjusts **operational behavior**:
- Pacing and timing considerations
- Output calibration to match team norms
- Configuration visibility guidelines

These can be combined when both style and operational adjustments are needed.

## Usage

Add to your project's root `CLAUDE.md`:

```text
Read ~/.claude/personas/diplomatic.md
```

Or combine personas:

```text
Read ~/.claude/personas/diplomatic.md
Read ~/.claude/personas/incognito.md
```

## Creating Custom Personas

Copy an existing persona and modify for your team's needs. Common adjustments:

- **Verbosity**: How much reasoning to show
- **Attribution**: AI involvement in commits and documentation
- **Tone**: Technical vs. conversational
- **Pacing**: Output velocity and timing
- **Visibility**: What appears in version control

## Why Personas Exist

Organizations have varying policies and cultural norms around AI tooling. Personas help you:

1. Align with team communication standards
2. Meet organizational policy requirements
3. Produce appropriate client deliverables
4. Respect colleagues' workflow preferences

The goal is effective collaboration within your specific environment.
