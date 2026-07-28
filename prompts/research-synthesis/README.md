# Multi-AI Research Synthesis - version set

Staging area, not yet promoted. Six versions of one prompt: the thing that takes three independent deep-research reports (typically OpenAI, Gemini, Claude) and turns them into a Venn diagram of what is settled, what is contested, and which outlier is worth chasing. Used for knowledge cold starts, where the point is not only to find what is out there but to find the angle that matches a use case the researchers were never told about.

Assembled 2026-07-27 from the Dropbox working archive at `GAI/PROMPTING/DANIEL/Multi-AI Research/Grade Multi-AI Research/`. Every file here is verbatim from that archive with only line endings normalized to LF and a provenance header prepended. All six were diffed; **no corruption, no drift, no topic contamination.**

## The set

| File | Mode | Standing | Provenance |
|------|------|----------|------------|
| [v5-explore.md](v5-explore.md) | Explore - "what exists that I may not know about?" | #4 overall, but best discovery breadth (9/10) | Identical to the published copy and to the archive copy |
| [v6-decide.md](v6-decide.md) | Explore + Decide | **#1 twice. The recommended default.** | Verbatim; one patch pending, see below |
| [v7-defend.md](v7-defend.md) | Defend - "can I show this to security, legal or a client?" | #3. Best evidence discipline (9.5), worst readability (5.5) | Verbatim |
| [v8-brief.md](v8-brief.md) | Decide - "given my context, which do I trial?" | #2. Most readable, converges too early on a cold start | Verbatim, confirmed clean of the DeepWiki topic |
| [v7.1-archive.md](v7.1-archive.md) | none - **do not run** | #6. The bloat exemplar | Verbatim, kept as a failure-mode checklist |

Deliberately **not** copied here:

- **V1 to V4** and the `*_impovement.md` notes - pre-history from Aug to Oct 2025, still in the archive if the lineage ever matters.
- **`Research_synthesis_prompt_v5 (by claude) last used on Oct 2025.md`** - not a template. It is V5 with a live engagement pasted into it, and it **names a client**. It must never enter this repo or any public artifact. Left in Dropbox where it belongs.

## The pending V6 patch

V6's only named defect is that its verification language lets a model call something "verified" after reading an incomplete or stale source. The fix proposed twice, and never applied, goes inside **Analysis Method section 5**:

```
For every claim that changes the ranking, directly inspect the underlying
primary source.

State separately:

- What the source establishes
- What remains interpretation or inference
- Any important scope or methodology limitation

Model agreement measures discovery convergence, not factual confidence.
Multiple reports repeating the same underlying source count as one source.
```

Two sentences of intent, and the claim is that it captures most of V7's benefit without doubling the prompt. It is left unapplied so the baseline stays clean.

## The three findings worth carrying forward

**1. The version numbers are a lie.** V5 to V8 is chronological order, not a quality ladder. The final ranking was V6 > V8 > V7 > V5 > task-specific V8 > V7.1. Later is not better, and the numbering will actively mislead in six months.

**2. There are three modes, not six versions.** Explore, Decide, Defend. Trying to make one prompt do all three is what produced the bloat. Recorded pipelines: `V6 -> V7` for a decision that must later be defended; `V5 -> V8 -> V7` for a genuinely unfamiliar field.

**3. Every version overfit to something, and the overfitting is more transferable than the prompts.** This table is the single most reusable artifact in the whole exercise:

| Version | Hidden overfitting |
|---------|--------------------|
| V5 | Assumed exactly three named AI personalities; treated model convergence too much like evidence; required nearly every possible section regardless of usefulness |
| V6 | Optimized quickly toward a decision and role-based winners; verification guidance too loose, so claims got labelled "verified" too easily |
| V7 | Encoded the postmortem of one research run into a universal framework. Excellent for technical due diligence, excessive for general research |
| V7.1 | Classic patch accumulation: every V7 defect generated a new exception. The prompt became a policy manual |
| V8 generic | Overfit in the opposite direction, to compression. "Verify only three to five claims", four findings, four candidates - premature convergence during a genuine cold start |
| V8 + incumbent protection | Anchored the result around a tool already being evaluated. Rewarded existing investment instead of letting evidence demote it |

The correction that generated most of this: **model agreement measures prominence, not truth.** Three models can repeat one vendor page. Discovery support (3/3, 2/3, 1/3) and evidence status (verified, corroborated, single-source, disputed) are two independent axes, and a 1/3 verified claim can outrank a 3/3 unverified one.

## Where this went

These six prompts were distilled into one method, then into a runnable skill: [`claude-code/skills/triangulate/`](../../claude-code/skills/triangulate/SKILL.md). The skill is the thing to use now; this folder is the lineage behind it, kept because the failure modes are more transferable than the prompts.

The line of descent: V6's analytical core (dual labels, source-family dedup) + V5's full report body + V7's verification discipline, minus the paste-into-a-chat ceremony, because the executor is an agent that can read the files and open the sources itself.

## Open questions for the next pass

Listed as questions because reasonable people would answer them differently.

1. **Modes or versions?** Rename to `explore` / `decide` / `defend` and keep V-numbers only as lineage, or keep numeric versioning and accept that the ordering misleads?
2. **Prompt, skill, or command?** These are paste-into-a-chat prompts. As a Claude Code skill or command, the mode selection, the report loading and the verification fetches become mechanical rather than instructions a model must remember to follow. That may also dissolve question 1, since a skill can branch on mode without three separate documents.
3. **Combine or keep separate?** V6 and V8 share most of their method section and differ mainly in output caps. That may be one prompt with a tightness dial, not two prompts.
4. **Is V7 worth keeping as-is?** It earned the top evidence score and the bottom readability score. Fold its discipline into V6 via the patch above, or keep it whole for the cases where an audit trail is the deliverable?
5. **What replaces single-corpus evaluation?** Every score above came from one research topic (DeepWiki alternatives). The source session flagged this as unreliable and flip-flopped between V6 and V8 within one conversation.

## Second corpus, available now

A fresh three-agent report set is in `~/Downloads` (Knowledge Assistant to Inbound AI Sales Agent: `claude - ...md`, `gemini - ...md`, `Evolving Knowledge-Grounded Q&A...md`, plus the original research prompt). The OpenAI run is not finished yet. Once it is, that is the second topic needed before any ranking above should be trusted, and the natural test bed for whatever comes out of the questions above.

## Provenance and publishing status

- Working archive (source of truth until this folder is promoted): `~/Dropbox/GAI/PROMPTING/DANIEL/Multi-AI Research/Grade Multi-AI Research/`
- Development session that produced V6 through V8, with the rankings and critiques cited above: `research/consolidated_chat-2026-07-27-chatgpt-Research_Agent_Comparison.md` (gitignored, local only, 2011 lines)
- Sibling prompts from the same archive already published: `Architectural Side-by-Side Comparison.md`, `Similarity_Score_Clacculation.md`

Not published. [`prompts/README.md`](../README.md) still lists V5 as the single tested prompt. Nothing in this folder contains client or engagement content - that was checked, and the one file that does was excluded by name above - so publishing is a readiness call, not a confidentiality one. What argues against it today: no second-corpus validation, and an unresolved decision about whether any of this should stay a prompt at all.
