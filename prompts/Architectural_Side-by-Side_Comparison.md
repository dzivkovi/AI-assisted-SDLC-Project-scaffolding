# MISSION: Architectural Side-by-Side Comparison

I have multiple repositories I need to compare for a specific architectural pattern.

You have access to two powerful code search tools:
- **ripgrep (rg):** Fast text search across files
- **ast-grep (sg):** Structural code search using AST patterns

**Repository Paths:**
- {ABSOLUTE_PATH_TO_REPO_1}
- {ABSOLUTE_PATH_TO_REPO_2}
- {ABSOLUTE_PATH_TO_REPO_3}

---

## PART 1: TOPIC CONFIGURATION (The "Plugin")

**Topic:** {ARCHITECTURAL_TOPIC}

**Goal:** {WHAT_ASPECT_YOU_WANT_TO_UNDERSTAND}

**Discovery Patterns (Run these first):**

Given the Topic and Goal above, use ripgrep (rg) and ast-grep (sg) to discover:
1. **Core implementation** - Classes, functions, or modules that implement this pattern
2. **Abstractions** - Interfaces, base classes, or protocols being used
3. **Integration points** - How this connects to the rest of the system
4. **Information flow** - How data/events/requests move through the components

Useful commands:
- `sg run -p 'class $NAME($SUPER): $$$' --json` - Find class hierarchies
- `rg "pattern" -A 3 -B 1` - Search with context
- `rg "^from|^import" | rg "keyword"` - Find relevant imports

Explain what you'll search for, run the commands, then list the key files found.

---

## PART 2: THE WORKFLOW (Do not change)

### Step 0: Version Context (The Archeologist's Check)
- Before analyzing code, check `pyproject.toml`, `requirements.txt`, or `package.json`
- Extract versions of libraries relevant to {ARCHITECTURAL_TOPIC}
- Note version differences that explain code pattern differences
- *Why?* Identifying version drift (e.g., Pydantic v1 vs v2, FastMCP 2.11 vs 2.13) prevents false comparisons

### Step 1: Discovery (Map)
- Run the discovery searches you explained above in each repository
- List the *file paths* that appear to be the "Core Implementation" for this topic in each repo
- **STOP** - Ask me to confirm which files you should read

### Step 2: Extraction (Skeleton)
- Once I confirm the files, read them
- IF the files are large (>300 lines), use `sg` or `rg` to extract only the class definitions and method signatures first to understand the shape
- IF small, read the full content

### Step 3: Implementation Analysis (Identify the Pattern)
For each repository, before comparing:
- **What design pattern is being used?** (Name it if you recognize it, or describe the approach if it's a custom/hybrid pattern)
- **What problem is this pattern solving?**
- **What trade-off was made?** (What did they optimize for? What did they sacrifice?)
- **Information flow:** Describe the end-to-end flow for this topic in 3-5 steps (e.g., "Request arrives → Transport layer validates → Session manager stores → Handler processes → Response streams back")

### Step 4: The Matrix + Qualitative Assessment

**Comparison Table:**

| Dimension | Repo 1 | Repo 2 | Repo 3 |
|-----------|--------|--------|--------|
| **Implementation Complexity** | (High/Medium/Low) | | |
| **Information Flow** | (# of layers/hops) | | |
| **{DIMENSION_DISCOVERED}** | (Description with code reference) | | |
| **{DIMENSION_DISCOVERED}** | (Description with code reference) | | |

*Note: Additional dimensions emerge from what you discovered in the code.*

**For each repository:**

**Repo 1: {NAME}**
- ✅ **Strengths:** (2-3 bullets, reference specific code/files/line numbers)
- ⚠️ **Trade-offs/Weaknesses:** (2-3 bullets, reference specific code/files/line numbers)
- 🎯 **Best suited for:** (1 sentence - what use case fits this approach)

**Repo 2: {NAME}**
- ✅ **Strengths:**
- ⚠️ **Trade-offs/Weaknesses:**
- 🎯 **Best suited for:**

**Repo 3: {NAME}**
- ✅ **Strengths:**
- ⚠️ **Trade-offs/Weaknesses:**
- 🎯 **Best suited for:**

### Step 5: Cross-Repo Pattern Analysis
- Which repos use similar architectural approaches?
- Where do they differ in implementation despite similar goals?
- What explains those differences? (Framework constraints? Team preferences? Performance needs? Legacy compatibility?)

### Step 6: Decision Framework
If I were choosing an approach for:
- **Production deployment at scale:** Choose {REPO_X} because {1-2 sentences}
- **Rapid prototyping/MVP:** Choose {REPO_Y} because {1-2 sentences}
- **Learning/Education:** Choose {REPO_Z} because {1-2 sentences}
- **My specific context:** {YOUR_CONTEXT} → Choose {REPO_?} because {1-2 sentences}

---

## OPTIONAL: Visual Flow
If requested, create a simple text-based sequence diagram showing the information flow for one representative scenario (e.g., "handling an incoming request") side-by-side for each repo.
