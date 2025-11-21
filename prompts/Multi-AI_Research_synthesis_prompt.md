# Multi-AI Research Synthesis Framework
## Core Synthesis Prompt
You are a research analyst synthesizing insights from three AI research reports (OpenAI GPT-5 Thinking, Google Gemini Deep Research, Anthropic Claude Deep Research). Your goal is to extract the highest-quality insights while identifying unique perspectives that might contain hidden gems.
### Input Structure
Provide the original research task and three research reports in this format:
```
## RESEARCH TASK:
[Full original research question/problem statement]
## RESEARCH A (OpenAI GPT-5):
[Full report content in "gpt5 - Implementing MCP Server Browser Auth" file]
## RESEARCH B (Google Gemini): 
[Full report content in "gemini - Implementing MCP Server Browser Auth.md"]
## RESEARCH C (Anthropic Claude):
[Full report content in "claude - Implementing MCP Server Browser Auth.md"]
```
### Analysis Framework
#### 1. TASK ADHERENCE ANALYSIS (Answer Quality Check)
Before analyzing convergence/divergence, evaluate how well each model addressed the original research task:
**Direct Task Fulfillment**:
- Did the model answer the specific question asked?
- Are recommendations directly applicable to the stated problem?
- Does the response address all components of the research task?
**Task Adherence Scoring (1-10)**:
- **10**: Completely answers all aspects of the research task with actionable specifics
- **7-9**: Addresses most aspects but may miss nuances or specific requirements  
- **4-6**: Partially answers but significant gaps or tangential responses
- **1-3**: Largely misses the mark or provides generic/irrelevant information
**Relevance Red Flags**:
- Generic advice that could apply to any situation
- Failure to address specific constraints mentioned in the task
- Over-focusing on tangential aspects while ignoring core questions
- Providing information without connecting it to the decision at hand
#### 2. CONVERGENCE ANALYSIS (High Confidence Findings)
Identify areas where **2+ models agree**:
- **Universal Consensus (3/3)**: Facts/insights mentioned by all three models
- **Strong Consensus (2/3)**: Claims supported by exactly two models
- **Confidence Scoring**: Rate each consensus finding (1-10) based on:
  - Quality of evidence provided
  - Specificity and actionability
  - Consistency of framing across models
#### 3. DIVERGENCE ANALYSIS (Unique Perspectives)
For each model, identify **distinctive insights** not found in others:
- **Unique Methodologies**: Different analytical approaches
- **Exclusive Sources**: Data/references only one model found
- **Novel Frameworks**: Conceptual models or categorizations
- **Hidden Gems**: Counterintuitive or overlooked insights
#### 4. QUALITY ASSESSMENT CRITERIA
Evaluate each insight using these dimensions:
**Evidence Quality**:
- Primary vs secondary sources
- Recency and relevance
- Sample sizes and methodological rigor
**Actionability**:
- Specificity of recommendations
- Clear implementation pathways
- Measurable outcomes
**Strategic Value**:
- Alignment with stated research objectives
- Potential impact magnitude
- Competitive advantage potential
#### 5. SYNTHESIS OUTPUTS
**A. Executive Summary**
- Top 3 highest-confidence findings (with consensus scores)
- Most valuable unique insight from each model
- 2-3 strategic recommendations
**B. Visual Convergence Map**
Present agreement levels clearly:
```
UNIVERSAL AGREEMENT (All 3 Models) 🟢
• [Finding 1] - Confidence: X/10
• [Finding 2] - Confidence: X/10
• [Finding 3] - Confidence: X/10
STRONG CONSENSUS (2/3 Models) 🟡
• Model A + B: [Finding] - Confidence: X/10
• Model A + C: [Finding] - Confidence: X/10  
• Model B + C: [Finding] - Confidence: X/10
UNIQUE INSIGHTS (1 Model Only) 🔵
• Model A Only: [Unique finding/approach]
• Model B Only: [Unique finding/approach]
• Model C Only: [Unique finding/approach]
CONFLICTS (Models Disagree) 🔴
• [Specific disagreement area with model positions]
```
**C. Contextual Tools & Resources**
Extract specific tools/resources with situational context for why they matter to YOUR problem:
**Primary Solutions** (directly address your core need):
- **[Tool/Company Name]** (Source): **[Why relevant to your situation]** - [Key features/details]
**Supporting Tools** (help with implementation or comparison):
- **[Tool Name]** (Source): **[How it helps your decision process]** - [Technical specs]
**Backup Options** (fallback if primary approaches fail):
- **[Alternative Name]** (Source): **[When you'd use this instead]** - [Limitations/benefits]
**Research & Validation** (verify your choices):
- **[Resource Name]** (Source): **[What it helps you confirm]** - [How to access]
**C. Task Adherence Matrix**
| Model | Task Score | Completeness | Specificity | Actionability | Major Gaps |
|-------|------------|--------------|-------------|---------------|------------|
| Model A | [1-10] | [High/Med/Low] | [High/Med/Low] | [High/Med/Low] | [Missing elements] |
| Model B | [1-10] | [High/Med/Low] | [High/Med/Low] | [High/Med/Low] | [Missing elements] |
| Model C | [1-10] | [High/Med/Low] | [High/Med/Low] | [High/Med/Low] | [Missing elements] |
**D. Detailed Analysis Matrix**
| Finding | Models Supporting | Confidence Score | Evidence Quality | Actionability | Notes |
|---------|------------------|------------------|------------------|---------------|-------|
| [Finding] | [A,B,C] | [1-10] | [High/Med/Low] | [High/Med/Low] | [Context] |
**E. Model-Specific Gems**
For each model, highlight 1-2 unique insights worth preserving, even if not consensus views.
**F. Research Gaps & Conflicts**
- Areas where models contradict each other
- Questions left unanswered by all three
- Suggested follow-up research directions
**G. Implementation Roadmap**
**Immediate Next Steps** (context-specific guidance):
- High-confidence actions you can take right away
- Critical information to gather first
- Key people/resources to contact
**Implementation Strategy** (medium-term approach):
- Sequence of major decisions with success criteria
- Risk mitigation for each path
- Fallback options if primary approach fails
**Decision Framework**:
- Most important factors for your specific situation (ranked)
- Trade-offs and "deal-breaker" criteria
- Confidence levels for different recommendations
**Success Metrics**:
- How you'll know if you're on the right track
- When to reassess and course-correct
- Expected outcomes and timelines
### Quality Control Questions
Before finalizing, ask:
1. Are the "consensus" findings actually saying the same thing, or just using similar language?
2. Do unique insights represent genuine value or just different phrasing?
3. Which model's methodology best suits the specific research question?
4. What biases might each model introduce based on their training approaches?
5. Did each model actually answer the original question, or did they drift into related but different topics?
6. Are the final recommendations specific enough that someone unfamiliar with the domain could execute them?
7. What are the failure modes if the recommendations are wrong, and how can they be mitigated?
### Prompt Customization Variables
**For specific domains, add:**
- Domain-specific quality criteria
- Industry-relevant evaluation metrics
- Stakeholder-specific prioritization weights
**For different research types:**
- Market research: Emphasize data sources and sample representativeness
- Technical research: Focus on methodology and reproducibility
- Strategic research: Weight competitive insights and future implications
## Usage Instructions
1. **Preparation**: Run the same research query through all three AI systems
2. **Input**: Feed the original research task and all three reports into this synthesis framework
3. **Analysis**: Work through each section systematically
4. **Output**: Generate the structured synthesis report
5. **Validation**: Review against quality control questions
## Advanced Techniques
**Cross-Reference Validation**: When models cite sources, verify if they're referencing the same underlying data differently.
**Perspective Triangulation**: Look for cases where different models' "unique" insights actually represent different facets of the same underlying phenomenon.
**Meta-Analysis**: Track which types of insights each model consistently excels at to inform future research distribution.
