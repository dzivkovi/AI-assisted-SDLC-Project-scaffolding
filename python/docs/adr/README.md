# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for your project.

## What are ADRs?

ADRs document significant architectural decisions made during development, capturing:
- **Context:** Why we needed to make a decision
- **Decision:** What we chose to do
- **Consequences:** Trade-offs and implications
- **Alternatives:** What we considered and rejected

## Format

We use the [Michael Nygard template](template.md):
- **Status:** proposed | accepted | rejected | deprecated | superseded
- **Date:** When the decision was made
- **Context:** The problem or opportunity
- **Decision:** What we're doing
- **Consequences:** Impact (positive and negative)
- **Alternatives:** Options we evaluated

## Naming Convention

Files are named: `NNNN-title-with-dashes.md`

Examples:
- `0001-use-lancedb-for-vector-storage.md`
- `0002-nomic-embed-code-for-embeddings.md`

## Sample ADRs

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [0001](0001-example-database-choice.md) | Use PostgreSQL for Primary Database | accepted | 2025-01-15 |
| [0002](0002-example-api-framework.md) | Use FastAPI for REST API | accepted | 2025-01-20 |

**Note:** These are examples. Replace with your actual ADRs as you make decisions.

## Process

1. **Identify Decision:** Architecture-level choices that impact system design
2. **Research:** Gather information, benchmark alternatives (store in `/work/`)
3. **Draft ADR:** Use template.md, fill in all sections
4. **Review:** Team discussion (if applicable)
5. **Decide:** Update status to "accepted" or "rejected"
6. **Commit:** Check into Git with descriptive commit message

## Relationship to Other Documentation

- **`/specs/`**: Requirements (WHAT we're building)
- **`/docs/adr/`**: Decisions (WHY we chose this approach)
- **`/docs/architecture/`**: System design (HOW it works)
- **`/work/`**: Research and exploration (DETAILS - .gitignore'd)

## Two-Tier Documentation System

This scaffolding uses a two-tier approach for AI-assisted development:

### Tier 1: Team-Facing ADRs (This Directory)
- Concise summaries (300-500 words)
- Focus on decision + rationale + alternatives
- Version controlled with code
- Audience: Team members, future developers, AI assistants

### Tier 2: Personal Research (`/work/`)
- Detailed analysis documents
- Benchmarks, comparisons, dead ends
- Daily AI chat logs and exploration
- NOT checked into Git (.gitignore'd)
- Audience: Original researcher

**Workflow:** Research in `/work/` → Decide → Distill to ADR → Link back to research

## Working with AI Assistants

### How to Ask Claude to Create an ADR

**Good prompt:**
```
Create an ADR for [decision]. Use the template at docs/adr/template.md.
Include these alternatives we discussed: [list alternatives].
Link to the research in work/YYYY-MM-DD/NN-filename.md
```

**What Claude needs to know:**
1. The decision you made
2. Why you needed to make it (context/problem)
3. What alternatives you considered
4. Where detailed research lives (work/ directory)

**Example:**
```
Create ADR-0003 for choosing PostgreSQL as our database.
Use template.md. We considered 3 alternatives (MySQL, MongoDB, SQLite).
Link to the research in work/2025-01-15/01-database-comparison.md.
The constraint was ACID compliance for financial transactions.
```

**Common mistake:** Asking "document this decision" without specifying template.
Claude might create a generic markdown file instead of following Michael Nygard format.

## Tools

We use ADRs for:
- Onboarding new team members
- Providing context to AI assistants
- Preventing re-litigation of settled decisions
- Understanding trade-offs made under constraints
- Documenting "why not X?" as much as "why Y?"

## References

- [ADR GitHub Organization](https://adr.github.io/)
- [Joel Parker Henderson's ADR Repo](https://github.com/joelparkerhenderson/architecture-decision-record)
- [AWS ADR Best Practices](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)
- [Backstage ADR Docs](https://backstage.io/docs/architecture-decisions/)
