# Useful Prompts

Standalone prompts not yet graduated into Claude Code commands or agents.

## Contents

| File | Purpose | Notes |
|------|---------|-------|
| `Multi-AI_Research_synthesis_prompt.md` | Synthesize research from 3+ AI systems (GPT, Gemini, Claude) into convergence/divergence analysis | v5, extensively tested throughout 2025 |
| `Similarity_Score_Clacculation.md` | QA scoring for comparing text blocks across 5 dimensions | For evaluating essay/response similarity |
| `Architectural_Side-by-Side_Comparison.md` | Compare architectural patterns across multiple repos using rg/ast-grep | Alt: use Compound Engineering's `Explore` subagent |

## Alternative: Compound Engineering Agents

The `Architectural_Side-by-Side_Comparison` workflow can also be done via:

```json
{
  "subagent_type": "Explore",
  "prompt": "Compare [pattern] implementation across repos: /path/1, /path/2...",
  "description": "Compare architectural patterns"
}
```

See compound engineering docs for other research agents.
