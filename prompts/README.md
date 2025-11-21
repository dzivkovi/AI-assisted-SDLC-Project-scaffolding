# Useful Prompts

Standalone prompts not yet graduated into Claude Code commands or agents.

## Contents

| File | Purpose | Notes |
|------|---------|-------|
| `Multi-AI_Research_synthesis_prompt.md` | Triangulate deep research from 3 reasoning AIs into convergence/divergence analysis | v5, extensively tested throughout 2025. See details below |
| `Similarity_Score_Clacculation.md` | QA scoring for comparing text blocks across 5 dimensions | See details below |
| `Architectural_Side-by-Side_Comparison.md` | Compare architectural patterns across multiple repos | See details below |
| `Consumer_Reports_Research_ANYTHING_Template.md` | Structured comparison for choosing libraries/products | See details below |

---

## Multi-AI Research Synthesis

**Why this exists:** Deep research AIs each do great work individually. But each has blind spots, frames things differently, and no single AI tells you what's actually settled vs. what's just one opinion. I needed a way to triangulate.

**How it works:** Ask the same complex research question to 3 reasoning AIs (GPT-5, Gemini, Claude). Feed all three responses into this prompt. It synthesizes them into a structured analysis: where they agree (high confidence), where 2/3 agree (likely true), unique insights from each (hidden gems), and where they conflict (requires your judgment).

**Key features:**
- **Convergence scoring** - Universal Agreement (3/3) = act on it, Strong Consensus (2/3) = verify, Single Source = investigate
- **Divergence analysis** - Names the conflicts explicitly so you know where expert opinion differs
- **Model-specific gems** - Extracts unique insights each AI contributed that others missed
- **Implementation roadmap** - Ends with phased next steps, not just a research dump

**Tested on:**
- RAG architecture for 1000+ page structured documents (regulatory compliance focus)
- NotebookLM-style research synthesis for technical documentation
- Framework selection decisions with conflicting expert opinions

**When to use:**
- High-stakes architectural decisions where "it depends" isn't good enough
- Learning a complex domain where no single source has complete coverage
- Need to justify decisions with evidence from multiple authoritative sources
- Want to know what's actually consensus vs. what's one AI's opinion

---

## Similarity Score Calculation (AI Output Regression Testing)

**Why this exists:** When tuning a RAG system—different embeddings, prompt variations, temperature settings—you get different answers to the same question. But there's no "correct answer" to compare against. It's like grading student essays: you can't just diff them. I needed a way to measure drift without ground truth.

**How it works:** Feed in a baseline answer (your reference point, the "before") and a submitted answer (output after you changed something). The prompt scores similarity across 5 orthogonal dimensions, then averages them into a single percentage.

**The 5 dimensions:**
- **Semantic** - Do they convey the same meaning?
- **Lexical** - Do they use similar vocabulary?
- **Structural** - Same organization and flow?
- **Code Snippets** - Same examples and code blocks?
- **Citations** - Reference the same sources?

**The insight:** You don't need to know if either answer is *correct*. You just need to know if your changes caused *drift*. High similarity (>90%) = safe change. Low similarity = investigate why.

**When to use:**
- A/B testing prompt variations before deploying to production
- Validating that embedding model changes don't break existing answers
- Regression testing after RAG pipeline modifications
- Comparing outputs across different LLM providers or versions

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
