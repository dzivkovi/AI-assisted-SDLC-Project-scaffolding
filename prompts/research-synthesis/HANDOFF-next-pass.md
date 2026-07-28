# Handoff: build the method, then use it on something I need by morning

Written 2026-07-27, overnight. For a fresh reviewer with no history in this thread. Everything referenced is in this folder or named with a path.

## Two deliverables, and the one that matters at 8am

**1. A morning briefing on AI SDR that makes me useful to my team when the office opens.** This is the deliverable I will actually open first. If you run out of time or judgment, this is the one to get right.

**2. A better method for synthesizing multi-agent research**, which is what this folder is about. The method is the means. Building it is how you earn the right to trust its output on deliverable 1.

Do not let the second eat the first. A beautiful reusable framework and no briefing is a failed night.

## Deliverable 1: the AI SDR briefing

### What I need to learn and why

I build genuinely good knowledge assistants - grounded in proprietary corpora, citing sources, reconciling conflicts, not website-scrape chatbots. They work. They are also Mr. Nice Guy: they answer beautifully and create no revenue for the businesses running them. That has to change, and I do not yet know the industry's current best practice for changing it.

The research question I sent to three agents is in `research/ai-sdr/_question - From Knowledge Assistant to Inbound AI Sales Agent.md`. Read it - it is specific about the design I am imagining (an observer model watching the conversation and deciding when a commercial move is appropriate) and equally specific that I do not want that design flattered. Three deep-research reports answering it are beside it.

Two things I need out of this that are easy to miss:

- **Vocabulary.** I need to know what this category is actually called by the people who work in it. Half of being credible in a room is naming the thing correctly.
- **A defensible opinion.** Not a survey. Two or three positions I can state, and defend, in front of engineers who will push back.

### What the briefing must do

**Sort everything by what it costs me to try.** Easiest first. A prompt-and-structured-output experiment I could run this week comes before a workflow layer, which comes before anything needing CRM integration, consent infrastructure, and analytics. I want to see the whole ladder - I do want to know it all - but ordered so the first rung is something I could start Monday. Say what each rung costs and what it buys.

**Show me the shape.** Where a diagram carries an architecture or a decision flow better than prose, draw it. Mermaid is fine.

**Lead with the answer.** I will read the first screen carefully and skim the rest. Put what matters there. Depth is welcome as long as it is behind the summary rather than in front of it.

**Keep the outliers.** Where the three reports disagree, or one of them found something the others missed, that is often the part that matches my situation - I have context I never told the researchers. Do not compress those away for tidiness. Flag them as what they are: single-source, worth a look.

One report or several is your call. If several, be explicit about which one I read first, and make that one stand alone.

### Where the output goes - hard rule

**Everything generated from `research/ai-sdr/` goes into `research/`, which is gitignored.** Not into `prompts/`, not into `docs/`, not anywhere tracked. I have not audited that corpus for whether I discussed my own work or clients while writing it, so none of it is publishable until I have. Treat the whole SDR topic as private by default.

The method itself - deliverable 2 - is a different matter and belongs in tracked files.

### The bigger thing I suspect is here

I have a feeling this matters beyond my own clients. Every organization sitting on a good knowledge assistant has the same gap between "answers well" and "creates value," and I do not think the community has a clean answer for it. If you see a genuine gap in what exists, say so plainly and say what would fill it. Keep that separate from the morning briefing - it is not what I need at 8am, but I do not want it lost.

## Deliverable 2: the method

### What I actually do, and why

I hit topics cold, regularly, on consulting work. The same question goes to three deep-research agents - OpenAI, Gemini, Claude - because they have different training and different instincts and they genuinely surface different things. Then I want two views:

1. **The overlap.** Where all three agree is the settled, discoverable core. The thing to learn first.
2. **The outliers.** These matter more often than the overlap does. My situation always has a wrinkle the researchers were never told about. The insight matching that wrinkle is almost never the consensus one. Losing outliers to compression is the expensive failure; a slightly long report is the cheap one.

Both halves are the point. Anything optimizing one at the other's cost has missed what this is for.

### The /goal

**Get me from three long reports to "I know what to do next, and I know which strange outlier deserves my afternoon" with as little ceremony as possible.**

Ceremony means choosing between six prompts, filling five template fields before anything happens, and reading a 3,000-word synthesis of 12,000 words of input. Each costs me attention at the moment I have least of it - I have just absorbed three unfamiliar documents about something I knew nothing about that morning.

The test of success is not a better prompt. It is that next time I bring a corpus, I do not think about the machinery at all.

### What is here to reason from

- **Six prompt versions** in this folder, verbatim, each with a provenance header stating its standing and its named defect. Read [README.md](README.md) first.
- **The overfitting table** in the README. Every version failed in a specific documented way. That table is more useful than any of the prompts.
- **Rankings from exactly one corpus.** Weak evidence. The session that produced them flip-flopped between two winners within one conversation, then said so itself.
- **The full development session**: `research/consolidated_chat-2026-07-27-chatgpt-Research_Agent_Comparison.md` (local only, 2011 lines). Read it for the reasoning behind a ranking; the README already carries the conclusions.

## The corpora

| # | Topic | What it holds | Role |
|---|-------|---------------|------|
| 1 | Open-source DeepWiki alternatives | 3 reports at `~/Dropbox/GAI/PROMPTING/DANIEL/DeepResearch/DeepWiki Alternatives/`, plus V5, V6 and V8 outputs and the full grading session | Design + validation |
| 2 | AI browser extensions (Aug 2025) | 3 reports at `~/Dropbox/GAI/PROMPTING/DANIEL/Multi-AI Research/OSS ChatGPT Clones & AI Extensions/`, plus synthesis v2, v3, v4, v5 | Design |
| 3 | Open-source ChatGPT clones (Aug-Sep 2025) | 3 reports, same folder, plus synthesis v5 and v6 | Design |
| 4 | **AI SDR** | `research/ai-sdr/` - the question and all three reports, complete | **The real run** |

Corpora 2 and 3 are the underused asset: multiple synthesis outputs generated from *identical* inputs by different prompt generations. Everywhere else you can watch prompts evolve; there you can watch outputs evolve.

Corpus 1 is the richest in commentary and the most contaminated by it - every ranking in this folder came from it. Use it to validate that the method works, since you can compare against what previous versions produced.

Corpus 4 is also shaped differently from the others: three of the four are "which tool should I pick," while the SDR question is about architecture, strategy and market position. A method tuned only on product bake-offs may quietly become a product-comparison method. This is where that shows up.

## How to run this

One session, three phases, with a hard commit point.

**Phase 1 - reason.** Read this folder, the six versions, the overfitting table, and design corpora 1 to 3. Work out what the method should be. Then **write it down and commit it to git before doing anything else.**

**Phase 2 - validate.** Run the method against corpus 1 and compare with what V5, V6 and V8 produced from the same inputs. Adjust if it fails, and commit again so the adjustment is visible.

**Phase 3 - use it, fresh.** Now go to `research/ai-sdr/` and produce the morning briefing. Apply the *method* from phase 1, not the conclusions from corpus 1 - this is a different topic and a clean start. Output to `research/`.

The commit between phases is the whole point. Any post-test change to the design shows up in the diff, so "did this overfit?" stops being a judgment call and becomes something readable. V7 exists because one run's postmortem got encoded into a universal framework and nobody could see it happening. This makes it visible. Changing the design after a test is allowed. Changing it silently is not.

## Two constraints that are not negotiable

**How I read.** ADHD and dyslexic. In a sea of words I will miss the one thing that mattered. Lead with the answer, one must-not-miss item at a time, tight bullets over paragraphs. This constrains what you build as much as how you report: a report I skim past has failed even if every claim in it is correct.

**No client content in anything that could become public.** One file was already excluded from this folder for naming a client; see the README. The SDR corpus is unaudited, which is why its output stays in `research/`.

## Where I think this is going, and why you should feel free to disagree

My instinct is that these prompts should become a skill or a command, so mode selection, report loading and source verification are mechanical rather than instructions a model must remember. I might be wrong. Reasons you might conclude otherwise, and I would rather you say so than build what I asked for:

- **The bottleneck may be upstream.** All this effort went into synthesis and none into the prompts I send the three agents. Better inputs may beat any downstream aggregation. The SDR question file is a fair sample of my current input quality - judge it.
- **The Venn framing may be the limit.** Three-way agreement is a crude signal. Something better may exist for separating "settled" from "worth my afternoon."
- **Three modes may be one thing.** Explore, Decide and Defend may be a single adaptive process, in which case the version set is scaffolding to throw away.
- **The right answer may be less, not more.** If two of these six should simply be deleted, say that.

Do not preserve any version out of politeness, and do not hand me back a policy manual - V7.1 is in this folder as a warning about exactly that.

## What I want to find in the morning

1. **The AI SDR briefing.** In `research/`. Actionable, ordered by cost to try, outliers intact, with the one file to read first clearly named.
2. **The method**, committed, with the reasoning - including what form you chose and what it costs me.
3. **An honest note on whether the method actually worked**, based on the corpus comparisons rather than your impression of your own output.

Take the time. I would rather have one sharp answer than a fast one.
