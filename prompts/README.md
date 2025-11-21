# Useful Prompts

Standalone prompts not yet graduated into Claude Code commands or agents.

## Contents

| File | Purpose | Notes |
|------|---------|-------|
| `Multi-AI_Research_synthesis_prompt.md` | Synthesize research from 3+ AI systems (GPT, Gemini, Claude) into convergence/divergence analysis | v5, extensively tested throughout 2025 |
| `Similarity_Score_Clacculation.md` | QA scoring for comparing text blocks across 5 dimensions | For evaluating essay/response similarity |
| `Architectural_Side-by-Side_Comparison.md` | Compare architectural patterns across multiple repos | See details below |

---

## Architectural Side-by-Side Comparison

**Problem:** When learning something new (new framework, emerging patterns), docs are outdated or don't exist. Reading one repo tells you how *that person* did it, not if it's the right way.

**Solution:** This prompt makes the AI read 3+ repos at once and report what they agree on. That's the real pattern. Disagreements reveal style preferences or context-specific choices.

**Key features:**
- **Version check first** - Avoids judging "bad code" that was correct for an older library version
- **Structured comparison** - Forces a matrix, not impressionistic notes
- **Decision-ready output** - Tells you which approach for which context (scale vs. MVP vs. learning)

**When to use:**
- Learning a new ecosystem by comparing popular libraries
- Making architectural decisions across competing approaches
- Understanding patterns before they're documented

**Alternative:** Compound Engineering's `Explore` subagent can do similar work:

```json
{
  "subagent_type": "Explore",
  "prompt": "Compare [pattern] implementation across repos: /path/1, /path/2...",
  "description": "Compare architectural patterns"
}
```
