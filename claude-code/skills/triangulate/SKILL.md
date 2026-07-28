---
name: triangulate
description: Synthesize 2-5 independent deep-research reports on one question into a decision-first, evidence-labelled research report (convergence map, outliers, verification, roadmap). Use when the user points at a folder of research reports from different AI research agents and wants them combined - triggers include "triangulate", "synthesize my research", "Venn diagram of findings", "multi-AI research synthesis", "compare these research reports", "aggregate the deep research".
---

# Triangulate - multi-agent research synthesis

You are synthesizing several independent deep-research reports (typically from OpenAI, Gemini and Claude deep-research agents) into one report the asker will study, quote from, and act on.

Two outputs matter equally, and the whole point of running multiple researchers is to get both:

1. **The overlap** - where independent researchers agree is the settled, discoverable core. Learn this first.
2. **The outliers** - findings only one researcher surfaced. The asker always has context they never told the researchers; the insight matching that context is almost never the consensus one. Losing outliers to compression is the expensive failure; a long report is the cheap one.

Never optimize one at the other's cost.

## Step 0 - Resolve inputs

The user provides a folder (or list of files). Identify in it:

- **Reports**: the research documents, usually one per agent (filenames often contain claude / gemini / openai / grok or the agent's name).
- **The question**: the original research prompt given to those agents, usually named `_question*.md`, `*question*.md`, or `*prompt*.md`.

The question does not have to be a file. Resolve it in this priority order:

1. **Pasted in the invocation**: if the user's message contains the research question (or constraints/context) as plain text, that IS the question - do not ask for it again. Save it into the corpus folder as `_question.md` so the corpus stays self-contained and the run is reproducible.
2. **A file in the corpus** (the `_question*` / `*prompt*` patterns above).
3. **Neither, and the user is available**: use AskUserQuestion to get (a) the original research question or a paste of it, (b) any hard constraints, (c) decision context - who will use the result and for what. Save the answer as `_question.md`.
4. **Neither, and you are unattended**: reconstruct the question from the reports' own framing, label it **ASSUMED QUESTION** at the top of your output, and proceed.

Other rules:

- Fewer than 2 reports: stop and tell the user triangulation needs at least two independent reports.
- **Independence rule: do not read prior syntheses, summaries, or analysis files that may sit in the same folder tree.** Your analysis must come from the question and the reports only. Ignore every file you have not classified as a report or the question.

## Step 1 - Frame, before reading any report

Read the question first. Now load `references/method.md` and follow it exactly - it defines the question shapes, the two dials, the asker's wrinkle, and every analytical rule. Write your framing down before opening the first report.

## Step 2 - Analyze the reports

Per `references/method.md` sections 2-4: adversarial read, a finding ledger with two independent labels per finding, source-family deduplication, the outlier wrinkle test, and explicit conflicts.

## Step 3 - Verify decision-changing claims

Per `references/method.md` section 5. If you have web access, open 3-7 sources - the ones whose truth would change the recommendation. If you do not, state that downgrade once, prominently, in the output's verification section, and soften confidence language accordingly. Never claim verification you did not perform.

## Step 4 - Write the report

Follow `references/report-template.md` for structure: an executive layer (~600-900 words) on top, then the full research body with no word cap. Include at least one Mermaid diagram whenever an architecture, flow, or decision structure is easier drawn than described.

Output file: `<corpus-folder>/<YYYY-MM-DD>-<topic>-triangulation.md`, unless the user asked for a different destination.

Write long reports in appended parts rather than one write call, and end the file with this exact final line, which doubles as the completeness marker for anyone (or anything) checking on the run:

```text
<!-- triangulate:complete -->
```

## Step 5 - Self-check, then deliver

Run the six-item self-check in `references/method.md` section 8. Then re-read the tail of the output file and confirm the Quality Control section and the `<!-- triangulate:complete -->` marker are present; if the file is incomplete, resume writing from where it stops rather than restarting. In chat, reply with two or three lines plus the file link - never narrate the report back.

## Acquiring the corpus (context, not a step)

The reports can come from any deep-research surface: ChatGPT Deep Research, Gemini Deep Research, Claude Research, NotebookLM syntheses, or a colleague's written study. The skill only needs the files in one folder. Orchestrating the research runs themselves from inside the agent (dispatching the same question to multiple research services and collecting the results) is a natural extension; until those connectors exist, the user runs the researchers manually and drops the outputs here.
