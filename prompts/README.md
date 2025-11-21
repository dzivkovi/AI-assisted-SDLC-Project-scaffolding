# Useful Prompts

Standalone prompts not yet graduated into Claude Code commands or agents.

## Contents

| File | Purpose | Notes |
|------|---------|-------|
| `Multi-AI_Research_synthesis_prompt.md` | Synthesize research from 3+ AI systems (GPT, Gemini, Claude) into convergence/divergence analysis | v5, extensively tested throughout 2025 |
| `Similarity_Score_Clacculation.md` | QA scoring for comparing text blocks across 5 dimensions | For evaluating essay/response similarity |
| `Architectural_Side-by-Side_Comparison.md` | Compare architectural patterns across multiple repos | See details below |
| `Consumer_Reports_Research_ANYTHING_Template.md` | Structured comparison for choosing libraries/products | See details below |

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

---

## Consumer Reports Style Research

**Why this exists:** I got tired of reading 5 blog posts that all say "it depends." I needed a prompt that forces the AI to give me a clear comparison table and tell me which option fits which use case. Like Consumer Reports, but for tech decisions.

**How it works:** Fill in placeholders for `{TOPIC}`, `{TRADITIONAL_OPTION}` (baseline you're comparing against), and `{CRITERION_1-4}` (domain-specific evaluation dimensions). The prompt forces structured output: star rating matrix, detailed reviews with pros/cons, and context-based recommendations.

**Key features:**
- **Star rating matrix** - Quick visual comparison across options
- **Structured reviews** - Each option gets: numerical rating, category label (Editor's Choice, Best For Beginners...), pros/cons, ideal use cases
- **Decision guide** - Ends with "Choose X if you need Y, choose A if you need B"

**Example usage:**
```
{TOPIC} = "Python visualization libraries"
{TRADITIONAL_OPTION} = "Matplotlib"
{CRITERION_1} = "Business-User Friendliness"
{CRITERION_2} = "Interactive Capabilities"
```
Also tested with: PDF report-generating libraries, modern dashboard frameworks.

**When to use:**
- Choosing between competing libraries/tools
- Need to justify a technology decision to stakeholders
- Want comparison data, not subjective opinions
