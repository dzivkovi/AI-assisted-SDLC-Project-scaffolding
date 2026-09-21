# Pinning the `/dark-factory` orchestrator: which tier, how much thinking, and when it matters

`/dark-factory` pins its own model in frontmatter (`model: fable` as of 2026-09-21; it was `model: opus` before). This note explains what that pin buys, how it interacts with the cheaper tiers the run dispatches for typing work, how to set the thinking effort for a given batch, and how to tell in the morning whether any of it worked. It exists because the question "why did my session switch models when I invoked the command" came up at 2am, and the answer turned out to be worth writing down.

## Three roles, three tiers

An overnight run has three kinds of model call, and they should not all run on the same tier.

| Role | What it does | Where its tier is set |
| --- | --- | --- |
| Orchestrator | Reads the batch brief, plans each ticket, decides merge versus park, filters review findings, shapes the morning Decisions list | The `model:` pin in the command's frontmatter |
| Typing subagents | Extraction passes, fixtures, tests from an already-settled contract, mechanical refactors, debrief drafting | An explicit `model: sonnet` argument on each `Agent` call the orchestrator makes |
| Reviewer personas | The `/ce-code-review` and `/ce-doc-review` lenses | Their own pins inside the Compound Engineering plugin; do not override them |

The point of the split: spend the premium tier on the calls where "correct" is still being decided, and the cheap tier on the calls where correct is already written down and only has to be hit. A test written from an unambiguous contract is typing. A test written from an ambiguous issue is judgment, because the test becomes the spec every later implementer inherits, so the contract gets settled on the orchestrator first and the typing is delegated after.

## Why a pin and not the session model

Routing is only real when it is structural. A `model:` argument on an `Agent` call routes; a `model:` pin in frontmatter routes; an intention stated in the prompt does not. With no pin, the orchestrator silently inherits whatever tier the session happened to be on when the command was typed, and two runs of the same batch cost and reason differently for no reason anyone chose.

The tell that a pin has fired: the session's attribution line changes the moment the command is invoked. If you launched from tier A and the commit attribution now names tier B, the frontmatter did that, and it is working as designed. If you want tier A to orchestrate, change the pin; do not delete it.

Which tier to pin: the highest one your plan offers. The name in the file is yours to change. The reasoning does not depend on the name: the orchestrator's context grows across every ticket in the batch, and every standing rule in the brief has to survive that growth, so it is the single call in the night where a weaker tier costs the most.

## Thinking effort is a session setting, not a pin

Effort (low, medium, high, max) is set on the session before you invoke, not in frontmatter. Set it deliberately per batch:

- **High** is the default for a multi-ticket batch. It gives the orchestrator enough deliberation to hold a dozen standing overrides through four tickets and to filter review findings well, without lengthening every gate of every ticket.
- **Max** is for a single ticket whose design the AIs must settle alone, or for a re-run after a night that produced a wrong merge-versus-park call. On a routine batch it buys marginal gains on problems that are not there and turns a long night into a longer one. Effort compounds: the orchestrator thinks at every gate of every ticket, so the bill and the wall clock scale with the number of decision points, not with the number of hard ones.
- **Medium or low** is fine for a run whose tickets are mechanical (a rename, a script with a stated contract, a test backfill), where the brief has few overrides and nothing is irreversible.

Raising effort does nothing for the typing subagents. They run at their own defaults, which is the point of routing them to a cheaper tier.

## When the pin matters: the complexity is in the instructions, not the code

The judgment load of a batch is set by the brief, not by the diff. A one-line fix under fifteen standing constraints is a harder night than a five-hundred-line feature under none. Count these before you decide the tier and the effort:

1. **Things that cost money or cannot be undone.** A vendor API with a per-call price, an engine that spends credits, a scheduled job that will publish whatever it finds in a folder at 03:30. Each one is a rule the orchestrator has to carry through every ticket, and a single drift is a real bill or a real leak.
2. **Protected paths.** Directories the run may read but never write, because something else owns them (a backup job, a live database, a mirror). "Write every test artifact to a temp folder" is easy to state and easy to lose at ticket three.
3. **Dependencies between tickets.** "A first because it is independent, then the two store tickets, then the one that depends on them" is a sequencing rule the run must honor even when a parked ticket tempts it to reorder.
4. **Phase boundaries and close discipline.** "Build phase one only, write `Refs #N` not `Closes #N`, file the second phase as its own ticket." A green run tempts the orchestrator into the next phase; the rule exists because a process that has worked once is not yet a process.
5. **Verbatim-preserve lines.** A runbook step rewritten in the same PR must keep two specific lines byte-for-byte because they were fixed four hours ago. This is the kind of constraint a cheaper tier pattern-matches away while "improving" the wording.
6. **Naming bans.** No client, prospect or person name anywhere in code, fixtures, commit messages or PR bodies, including names encountered while reading the private work notes the run has to read to do its job.
7. **Standing facts that override older documents.** "The comparator already exists and needs two inputs a day apart, so a single batch cannot produce one; do not invent a one-input rule" contradicts an older brief the run will also read. The orchestrator has to know which document wins.

A batch with none of these is a mechanical run: pin still on, effort medium, and the night is cheap. A batch with most of them is where the premium tier at high effort earns its cost, because the failure mode is not a wrong line of code but a dropped constraint that nobody catches until morning, when the scheduled job has already run.

## What a high-constraint invocation looks like

Condensed and genericized from a real batch of four tickets on a research-pipeline repository, so the categories above are checkable rather than abstract. The brief ran to about 1,500 words; this is the shape, not the text.

> Four tickets, in this order: A first because it is independent, then B and C (both touch the store), then D which depends on B and C. Ticket E is deliberately not in this batch.
>
> No paid calls anywhere in this run. Never execute the research engine, never run the vendor pull without `--dry-run`, never run the diagnostic that reaches the engine. Everything that costs money is proved tonight by a dry run, a fixture or a unit test.
>
> Nothing this run produces may be written, moved, renamed or deleted under the artifact root or the store directory: a scheduled task mirrors that whole tree to cloud storage at 03:30, so a scratch file written there gets published and a file moved there gets deleted from the backup. Read those paths read-only; write every test artifact to a temp folder.
>
> Read first, before any ticket: the runbook, three named README sections, and two named commits. Standing facts that override anything older you read: [five sentences correcting assumptions the older work notes make].
>
> Ticket A: the issue body plus its newest comment is the spec; ignore the older brief in the work notes, which is the same five items in an older wording. Build items 1, 2, 3 and 5 in full. Item 4 cannot be generated inside one run, so build it to take an explicit input path and to skip with a recorded reason when none is given; record the choice as a decision entry. Both new steps are off by default behind flags, because on by default makes the runbook's paste-ready command cost money. Rewrite the runbook steps this ticket automates in the same PR, preserving verbatim the two lines fixed four hours ago.
>
> Tickets B, C, D: the store schema belongs to the engine and is read, never altered; a missing column gets a companion table in a separate database file. Define the stream classifier explicitly in code and in the plan. Existing runs cannot be backfilled and new runs cost money, so write `Refs` not `Closes` on C, and say in the decision entry that the one check which closes it is the first batch of the coming week. D is a first cut only: no rollup, no month grouping, and do not implement the contract item that edits the skill directory, which is out of scope for this run; file that as its own ticket.
>
> Plan every ticket with `/ce-plan` from the issue text (the re-scope is the newest comment on each issue); doc-review the plans for A and D. Merge all four on clean green. No client, prospect or person name anywhere in code, fixtures, commit messages or PR bodies, including any name you encounter while reading the work notes.

Every paragraph of that is a rule the orchestrator must carry, and several of them contradict what the repository's own older documents say. That is the case for the top tier at high effort. A batch of "rename this module, add a test for that function, bump this dependency" is not, and treating it as one is the other way to waste a night.

## The morning check

The night summary must state the model split it used: which tier orchestrated, which tier each dispatched agent ran on, and which reviewer personas ran on their own pins. Read that line first. If it says every agent ran on the session model, the routing never happened and the pin bought nothing; the run cost the premium tier on typing work and you should look at why the `Agent` calls carried no `model:` argument. If it shows the split, the pin did its job, and the place to look next is the Decisions list.
