# Triangulate - report template

The report has two layers in one file: an executive layer the asker reads carefully, then the full research body they keep as reference. Sections marked (shape-dependent) appear only when the question's shape calls for them. Adapt section order to the topic when it genuinely helps; never drop the layers' contract.

Open the file with a two-line provenance header: date, corpus files used, and whether web verification ran.

## Executive layer (~600-900 words total)

1. **Executive Summary**
   - **Top findings** - at most 5, each carrying BOTH labels, e.g. "(3/3; corroborated)" or "(1/3, Claude; VERIFIED)". Lead with the single most decision-relevant finding, not the most agreed-on one.
   - **Most valuable unique insight per report** - one line each, named by report. This is where the asker sees their researchers' individual voices.
   - **Strategic recommendations** - at most 3, each traceable to findings above.
   - If anything is time-critical (an effective date, an expiring window), bold it here - exactly one bolded must-not-miss item.

## Full research body (no word cap - complete, deduplicated, attributed)

2. **Task Adherence Matrix** - one row per report: task score, completeness, specificity, actionability, major gaps. Note whether the reports' citation bases are actually independent.

3. **Convergence Map** - the Venn:
   - UNIVERSAL AGREEMENT (3/3) with confidence per finding
   - STRONG CONSENSUS (2/3) named by which pair
   - UNIQUE INSIGHTS (1/3) grouped per report
   - CONFLICTS - direct disagreements, each with a resolution or an explicit "unresolved, here is the cheapest test"

4. **Domain sections** (shape-dependent - use the question's own required outputs as the section list when it provided one). Typical:
   - Terminology / category map (cold-start questions: the vocabulary the asker needs to sound credible)
   - Market map (bake-off / strategy)
   - Ranked comparison tables - candidates as rows; include per-report rankings where they differed; quarantine vendor-sourced entries visibly rather than ranking them
   - Architecture analysis with a Mermaid diagram (strategy questions) - preserve the best comparison table any single report produced, extended with the others' findings, and credit it
   - Deep-dives the corpus demands (regulatory, measurement, practices...) with per-report attribution throughout

5. **Model-Specific Gems** - 3-5 per report: the insights worth preserving even where not consensus. This section is mandatory; it is where lineage lives.

6. **Research Gaps and Conflicts** - questions no report answered; conflicts already covered get a pointer, not a repeat.

7. **Verification Notes** - table: claim checked | result | source | what it establishes | what it does NOT establish. Include the date. If verification was unavailable, this section says so and lists the claims that SHOULD be checked first and where.

8. **Implementation Roadmap** - staged, cheapest rung first, each rung with cost, what it buys, and an exit gate. Include a "What NOT to build/do" list when the corpus supports one.

9. **Quality Control** - honest caveats: what is vendor-reported, what is single-source, what is inference, what would change the conclusions.

## Style rules

- Every claim in the body is traceable: (3/3), (2/3: Claude + OpenAI), (1/3, Gemini), or (found in verification).
- Each finding has exactly one home; other sections may reference it in half a sentence, never re-explain it.
- No em-dashes or en-dashes; use "-", ":", or parentheses. No emojis. No hard-wrapped prose - one physical line per paragraph or bullet.
- No invented numeric weights or scores; directional labels (High/Medium/Low) unless the asker supplied weights.
- Mermaid diagrams for architectures, flows, and decision structures; wrap wide tables' content tightly so they render.
- Vendor conversion/benchmark claims always carry the word "vendor" or "marketing" next to the number.
