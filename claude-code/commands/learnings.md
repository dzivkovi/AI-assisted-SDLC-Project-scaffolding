---
name: learnings
description: Consolidate final learnings from a conversation - captures only refined positions, not intermediate iterations
argument-hint: "[optional: 'positioning only', 'technical', 'for MEMORY.md', 'since /save 05']"
---

# /learnings

Consolidate conversation learnings into a single file. Captures FINAL refined positions only - not every intermediate step that got there.

## Purpose

You saved 5-10 intermediate notes during this conversation. Each was useful in the moment. But when you review work/ next week, you need ONE file with the consolidated conclusions - not a trail of draft positions that create cognitive load.

**Why "learnings"?** Each conversation refines your thinking. Intermediate /save files capture the journey. /learnings captures the destination. The destination is what compounds.

**Each unit of engineering work should make subsequent units of work easier - not harder.**

## User Instructions

<user_arguments>
$ARGUMENTS
</user_arguments>

**Argument interpretation:**
- Empty: Consolidate ALL learnings since last /save, /note, or /learnings (or chat start)
- "positioning only": Filter to positioning/strategy category
- "technical only": Filter to technical discoveries
- "for MEMORY.md": Format output as bullet points ready for MEMORY.md sections
- "since /save 05" or "since file 05": Only process conversation after work file 05 was saved
- "focus on [topic]": Prioritize learnings about that topic

## Preconditions

<preconditions enforcement="advisory">
  <check condition="conversation_has_substance">
    Conversation contains decisions, refined positions, or discovered patterns (not just Q&A)
  </check>
  <check condition="not_trivial">
    At least 2-3 learnings worth capturing (otherwise just /save)
  </check>
</preconditions>

If conversation is too thin for consolidation, say: "This conversation has 1-2 discrete findings. /save would be more appropriate. Want me to /save instead?" Then STOP and wait for user response.

## Execution Strategy: Two-Phase Orchestration

<critical_requirement>
**Only ONE file gets written - the final consolidated learnings.**

Phase 1 subagents return TEXT DATA to the orchestrator. They must NOT use Write, Edit, or create any files. Only the orchestrator (Phase 2) writes the final file.
</critical_requirement>

### Phase 0: Scope Detection

Before launching subagents, determine the conversation scope.

1. **Scan conversation history** for the most recent occurrence of any of these:
   - A `/learnings` invocation
   - A `/save` invocation (look for Write tool calls to `work/YYYY-MM-DD/` paths)
   - A `/note` invocation (same pattern)
   - If none found: scope is entire conversation

2. **If $ARGUMENTS specifies a boundary** (e.g., "since /save 05", "since file 05"):
   - Use that as the scope start instead
   - Parse tolerantly: accept "since /save 05", "since file 05", "since 05-offer-section"

3. **List today's existing work files:**
```bash
bash -c 'D=$(date +%Y-%m-%d); echo "DATE=$D"; ls -1 work/$D/ 2>/dev/null | grep -E "^[0-9]{2}-" | sort; echo "---"; echo "COUNT=$(ls -1 work/$D/ 2>/dev/null | grep -E "^[0-9]{2}-" | wc -l)"'
```

4. **Report scope to user** before launching subagents:
   "Analyzing conversation from [boundary description] to now. [N] existing work files from today."

### Phase 1: Parallel Analysis (3 Subagents)

<parallel_tasks>

Launch these subagents IN PARALLEL using the Task tool. Each returns text data to the orchestrator. Each has access to the current conversation context.

#### 1. Position Tracker

Launch as Task (subagent_type: general-purpose). Prompt:

"Analyze this conversation starting from [SCOPE BOUNDARY]. Your job is to extract learnings that EVOLVED or were DECIDED during this conversation.

For each topic discussed:
- Identify the initial position, any pivots or refinements, and the FINAL position
- If a position evolved across multiple messages, capture ONLY the final refined version
- Note the KEY REASON the final position won (1 sentence)
- If a position is still UNRESOLVED (no final answer), flag it

Return ONLY text in this format for each finding:

```
TOPIC: [topic name]
FINAL POSITION: [the refined conclusion]
KEY REASON: [1 sentence why this won]
EVOLUTION: [brief - e.g., 'Started as X, rejected because Y, landed on Z']
STATUS: resolved | unresolved
```

Rules:
- DO NOT write any files. Return text only.
- Use the user's actual words when possible, not your paraphrase.
- Be specific: include file paths, exact copy text, line numbers where relevant.
- If something was stated once and never revisited, include it as-is with EVOLUTION: 'Stated directly, no iteration.'
- Omit trivial exchanges (greetings, file reads, routine commands)."

#### 2. Deduplication Scanner

Launch as Task (subagent_type: general-purpose). Prompt:

"You are checking what's ALREADY documented vs what's NEW in this conversation.

Read these files:
1. MEMORY.md at the project memory path (check for it using Glob on the .claude directory)
2. All work files from today's date directory: work/[today's date]/

Then compare each conversation topic against what's already captured.

Return ONLY text in this format:

```
NEW LEARNINGS (not captured anywhere):
- [topic]: [1-line summary]

EVOLVED SINCE LAST SAVE (position changed after it was saved):
- [topic]: Was '[old position in file NN]', now '[new position from conversation]'

ALREADY CAPTURED (skip these):
- [topic]: Already in [MEMORY.md section / work file NN-name]

MEMORY.MD UPDATES NEEDED (existing entries that should be modified):
- Section '[section name]': Update '[existing text]' to '[new text based on conversation]'
- Section '[section name]': Add '[new bullet point]'
```

Rules:
- DO NOT write any files. Return text only.
- Read actual file contents, don't guess.
- 'Already captured' means the SAME conclusion exists. If the conclusion evolved, mark as EVOLVED.
- For MEMORY.MD UPDATES, be specific about which section and what text to add or change."

#### 3. Category Classifier

Launch as Task (subagent_type: general-purpose). Prompt:

"Categorize each learning from this conversation and generate a filename.

Categories:
- **Decisions made**: Choices with rationale
- **Preferences refined**: Working preferences that crystallized
- **Positioning/strategy**: GTM, offers, audience, messaging
- **Technical discoveries**: CSS, HTML, tooling, architecture, infrastructure
- **What didn't work**: Rejected approaches with reasons
- **Rules/patterns established**: New rules or patterns to follow
- **Action items surfaced**: Things that need doing but weren't done this session

Return ONLY text in this format:

```
CATEGORY BREAKDOWN:
- Decisions: [count]
- Preferences: [count]
- Positioning/strategy: [count]
- Technical: [count]
- What didn't work: [count]
- Rules: [count]
- Action items: [count]

DOMINANT THEME: [2-4 word theme, e.g., 'website conversion refinements']

SUGGESTED FILENAME: [kebab-case, 3-5 words, e.g., 'website-conversion-refinements']

TOPIC-TO-CATEGORY MAPPING:
- [topic]: [category]
- [topic]: [category]
```

If $ARGUMENTS contains 'for MEMORY.md', also return:
```
MEMORY.MD SECTION MAPPING:
- [topic]: belongs in section '[MEMORY.md section name]'
```

Rules:
- DO NOT write any files. Return text only.
- The filename should reflect the dominant theme, not be generic like 'session-learnings'.
- If $ARGUMENTS filters to a category (e.g., 'positioning only'), only classify within that filter."

</parallel_tasks>

### Phase 2: Assembly and Write

<sequential_tasks>

**WAIT for all Phase 1 subagents to complete before proceeding.**

The orchestrating agent performs these steps:

1. **Collect** all text results from the 3 subagents

2. **Filter** using Deduplication Scanner results:
   - DROP anything marked ALREADY CAPTURED
   - INCLUDE anything marked NEW or EVOLVED SINCE LAST SAVE
   - FLAG anything marked MEMORY.MD UPDATES NEEDED (include in suggested updates section)

3. **Apply $ARGUMENTS filter** if provided:
   - "positioning only": Keep only Positioning/Strategy category
   - "technical only": Keep only Technical Discoveries category
   - "for MEMORY.md": Keep all, but format as MEMORY.md-ready bullet points
   - "focus on [topic]": Prioritize that topic, include others as secondary

4. **Get file number, date, and timestamp** (reuse the exact bash one-liner from /save):
```bash
bash -c 'D=$(date +%Y-%m-%d); mkdir -p work/$D; N=$(printf "%02d" $(($(ls -1 work/$D/ 2>/dev/null | grep -E "^[0-9]{2}-" | tail -1 | cut -d- -f1 | sed "s/^0*//" || echo 0) + 1))); T=$(date +"%Y-%m-%d at %H:%M:%S %Z"); echo "$D|$N|$T"'
```

5. **Assemble the file** using the Output Format below

6. **Write ONE file** to: `work/DATE/NUMBER-FILENAME.md`
   Where FILENAME comes from Category Classifier's suggestion

</sequential_tasks>

## Output Format

The saved file uses this structure. **Omit any section that has zero entries.**

```markdown
Date: [TIMESTAMP]

# Consolidated Learnings: [Dominant Theme from Category Classifier]

Session scope: [boundary description] to end of conversation
Work files reviewed: [comma-separated list of NN-filename from today]
New: [N] | Already captured: [N] | Updates: [N]

## Decisions Made

### [Decision Topic]
**Decision:** [Final position in 1-2 sentences]
**Rationale:** [Why this won, in 1 sentence]
**Supersedes:** [work file NN-name if this updates a previous save, or "new"]

## Preferences Refined

- **[Preference name]:** [What Daniel now prefers and why - 1-2 sentences]

## Positioning/Strategy

### [Insight title]
[2-3 sentences capturing the refined insight]

## Technical Discoveries

- **[Discovery]:** [What was found and where it applies - 1-2 sentences]

## What Didn't Work

- **[Rejected approach]:** [Why it failed or was rejected - 1 sentence]

## Rules/Patterns Established

- **[Rule name]:** [The rule, stated as an imperative]

## Action Items

- [ ] [Action item with enough context to act on later]

## MEMORY.md Updates Suggested

- **Section "[section name]":** Add "[bullet point text]"
- **Section "[section name]":** Update "[existing text]" to "[new text]"
```

## Writing Style Rules (enforced)

- No emojis anywhere in the output file
- No em-dashes - use plain hyphens or rewrite the sentence
- No AI jargon: delve, tapestry, leverage, utilize, facilitate, synergy
- No "not only... but also" construction
- Each learning gets 1-3 sentences max. This is a reference document, not a narrative.
- Use Daniel's actual words from the conversation when possible
- Be specific: file paths, exact copy text, rule numbers, line references
- "Supersedes" field connects this to intermediate saves for later cleanup

## Quality Guidelines

**Good learnings capture has:**
- Final positions only (if something evolved 5 times, only the 5th version)
- The "key reason" each position won (future-Daniel needs WHY, not just WHAT)
- What was rejected and why (negative knowledge prevents re-litigating)
- Specific references: file paths, POSITIONING-RULES.md rule numbers, exact copy text
- Connection to existing rules when applicable

**Avoid:**
- Intermediate positions (the journey is in the /save files, not here)
- Narrative prose (this is a lookup document)
- Implementation details already in committed code or HTML
- Context Daniel already knows (he was in the conversation)
- Verbatim duplication of MEMORY.md content
- Vague descriptions like "improved the CTA" (say exactly what changed and to what)

## Common Mistakes to Avoid

| Wrong | Correct |
|-------|---------|
| Capture all 5 positions on a topic | Capture only the FINAL position + 1-line evolution summary |
| Write 200 words per learning | Write 1-3 sentences per learning (reference doc, not essay) |
| Repeat what's in MEMORY.md | Check MEMORY.md first, only add NEW or EVOLVED insights |
| Include code diffs | Reference the commit SHA or file path, not the diff |
| Subagents write intermediate files | Subagents return text; orchestrator writes one file |
| Skip "what didn't work" section | Negative knowledge prevents re-litigating rejected ideas |
| Generic filename like "session-learnings" | Specific filename from dominant theme: "offer-section-funnel-logic" |
| Research and assembly run in parallel | Research completes first, then assembly runs |

## Decision Gate (Post-Save)

After writing the consolidated file, present these options and WAIT for user response:

```
Learnings saved to work/YYYY-MM-DD/NN-filename.md

[N] new learnings consolidated from [scope description]
[N] intermediate saves superseded: [list NN-filenames that are now superseded]
[N] MEMORY.md updates suggested

What next?
1. Update MEMORY.md with suggested changes [recommended if updates flagged]
2. View the file
3. Continue working
4. Archive superseded work files (move to work/YYYY-MM-DD/archive/)
5. Other
```

**Handle responses:**

**Option 1: Update MEMORY.md**
- Read current MEMORY.md from the project memory directory
- Apply the updates listed in "MEMORY.md Updates Suggested" section
- Show the changes (what will be added/modified) BEFORE writing
- Wait for user confirmation, then write

**Option 2: View the file**
- Display the saved file content
- Present the decision menu again

**Option 3: Continue working**
- Return to normal conversation
- Documentation is complete

**Option 4: Archive superseded work files**
- Create archive/ subdirectory: `mkdir -p work/DATE/archive/`
- Move ONLY the files explicitly listed as superseded (from "Supersedes" fields)
- Confirm: "Moved [N] files to work/DATE/archive/"
- Present menu again minus option 4

**Option 5: Other**
- Accept free text instruction

## The Compounding Philosophy

This creates a compounding knowledge system:

1. During a session, /save captures intermediate thinking (fast, 2-3s each)
2. At session end, /learnings consolidates into final conclusions (thorough, one file)
3. MEMORY.md gets updated with durable insights (option 1 at decision gate)
4. Next session starts smarter - MEMORY.md is loaded automatically

The feedback loop:

```
Explore -> Decide -> Refine -> /save (intermediate) -> ... -> /learnings (final)
    ^                                                                    |
    |                   MEMORY.md <- updated with durable insights       |
    +--------------------------------------------------------------------+
```

Knowledge compounds. Each session builds on the last.

## Related Commands

- `/save` - Quick fire-and-forget save of last response or specified content
- `/note` - Older save variant with more verbose format
- `/compound-engineering:\workflows:compound` - Kieran's bug-fix documentation (for code problems, not learning consolidation)
