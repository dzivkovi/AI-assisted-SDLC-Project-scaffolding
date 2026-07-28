# Handoff: what to do with this version set

Written 2026-07-27 for a fresh reviewer with no history in this thread. Everything referenced here is in this folder or named with a path.

## The /goal

**When I finish a cold-start research round, I want to get from three long reports to "I know what to do next, and I know which strange outlier deserves my afternoon" with as little ceremony as possible.**

Ceremony means: choosing between six prompts, filling in five template fields before anything happens, and reading a 3,000-word synthesis of 12,000 words of input. Each of those costs me attention at exactly the moment I have least of it - I have just absorbed three unfamiliar documents about something I knew nothing about that morning.

The test of success is not a better prompt. It is that the next time I bring a new corpus, I do not think about the machinery at all.

## What I actually do, and why

I hit topics cold, regularly, on consulting work. Same question goes to three deep-research agents - OpenAI, Gemini, Claude - because they have different training and different instincts and they genuinely surface different things. Then I want two views of the result:

1. **The overlap.** Where all three agree, that is the settled, discoverable core. Low-hanging fruit, most likely what I need to learn first.
2. **The outliers.** These matter more often than the overlap does. My situation always has a wrinkle I never told the researchers about - a client constraint, an odd deployment boundary, a preference. The insight that matches that wrinkle is almost never the consensus one. Losing outliers to compression is the expensive failure; a slightly long report is the cheap one.

Both halves are the point. Anything that optimizes one at the other's cost has missed what this is for.

## What is here to reason from

- **Six prompt versions** in this folder, verbatim, each with a provenance header stating its standing and its named defect. Read [README.md](README.md) first.
- **The overfitting table** in the README. Every version failed in a specific, documented way. That table is more useful than any of the prompts.
- **Rankings from exactly one research corpus** (open-source DeepWiki alternatives). Treat these as weak evidence. The session that produced them flip-flopped between two winners within one conversation and then said so itself.
- **The full development session**: `research/consolidated_chat-2026-07-27-chatgpt-Research_Agent_Comparison.md` (local only, 2011 lines). Read it if you want the reasoning behind a ranking; the README already carries the conclusions.
- **Four real corpora**, inventoried below. Three are open to you; one is held out.

## The corpora

| # | Topic | Agent reports | Historical synthesis outputs | Role |
|---|-------|---------------|------------------------------|------|
| 1 | Open-source DeepWiki alternatives (Jul 2026) | claude, gemini, openai - `~/Dropbox/GAI/PROMPTING/DANIEL/DeepResearch/DeepWiki Alternatives/` | V5, V6, V8 outputs, plus the full grading session | Design corpus |
| 2 | AI browser extensions (Aug 2025) | gemini2.5, gpt5, opus4.1 - `~/Dropbox/GAI/PROMPTING/DANIEL/Multi-AI Research/OSS ChatGPT Clones & AI Extensions/` | Synthesis v2, v3, v4, v5 - four generations against identical inputs | Design corpus |
| 3 | Open-source ChatGPT clones (Aug-Sep 2025) | gemini2.5, gpt5, opus4.1 - same folder | Synthesis v5, v6 | Design corpus |
| 4 | Knowledge assistant to inbound AI sales agent (Jul 2026) | `~/Downloads`, claude and gemini present, OpenAI leg unfinished | none | **Held out - do not open until the design is frozen** |

Corpora 2 and 3 are the underused asset. They hold multiple synthesis outputs generated from the *same* three reports by *different* prompt generations. That is the only place where the evolution of the output can be observed directly rather than inferred from a critique. Corpus 1 is the richest in commentary and the most contaminated by it - every ranking in this folder came from it.

Corpus 4 is deliberately different in shape: an architecture and evolution question, not a product bake-off. Three of the four corpora are "which tool should I pick," so a method tuned on them may quietly become a product-comparison method. Corpus 4 is where that shows up.

## How to run this

One session, two phases, with a hard commit point between them. The sequence matters more than the length.

**Phase 1 - reason.** Read this folder, the six versions, the overfitting table, and design corpora 1 to 3. Work out what the method should be. Then **write it down and commit it to git before doing anything else.**

**Phase 2 - test.** Only now open corpus 4 and run the method against it. Record what happened, including what you would want to change.

The commit between phases is the whole point. Any post-test change to the design shows up in the diff, so "did this overfit to the test corpus?" stops being a judgment call and becomes something readable. V7 exists because a single run's postmortem got encoded into a universal framework, and nobody could see it happening. This makes that visible.

Changing the design after Phase 2 is allowed. Changing it silently is not.

If corpus 4's OpenAI leg is still missing, run it with two reports. A missing leg is a real operating condition and the method should survive it.

## Where I read this going, and why you should feel free to disagree

My current instinct is that these should stop being prompts and become a skill or a command, so mode selection, report loading and source verification are mechanical rather than instructions a model has to remember. I might be wrong. Reasons you might conclude otherwise, and I would rather you say so than build what I asked for:

- **The bottleneck may be upstream.** I have spent all this effort on synthesis, and none on the prompts I send to the three agents in the first place. Better inputs may beat any downstream aggregation.
- **The Venn framing itself may be the limit.** Three-way agreement is a crude signal. Something better may exist for separating "settled" from "worth my afternoon."
- **Three modes may be one thing.** Explore, Decide and Defend may be a single adaptive process rather than three documents, in which case the whole version set is scaffolding to be thrown away.
- **The right answer may be less, not more.** If two of these six should simply be deleted, say that.

Do not preserve any version out of politeness, and do not hand me back a policy manual - V7.1 in this folder is what that looks like, and it is here specifically as a warning.

## Two constraints that are not negotiable

**How I read.** ADHD and dyslexic. In a sea of words I will miss the one thing that mattered. Lead with the answer, one must-not-miss item per message, tight bullets over paragraphs. If the work produces a document, give me two lines and the link rather than narrating it back. This constrains what you build as much as how you report: a tool that produces something I skim past has failed even if every claim in it is correct.

**No client content, ever, in anything that could become public.** One file was already excluded from this folder for naming a client; see the README. Same rule applies to whatever you produce.

## What I want back

1. **A recommendation on form** - prompt, skill, command, or something I have not considered - with the reasoning, including what it costs me.
2. **A workflow I can run**, end to end, from "I have a new topic" to "I know what to do." Including the upstream half if you think that is where the leverage is.
3. **A way to tell whether it worked** that does not depend on my impression after one run. The single-corpus evaluation problem above is real and I do not have an answer for it.

Take the time. I would rather have one sharp answer in an hour than a fast one now.
