You are an expert Systems Analyst tasked to perform Quality Assurance of the newly submitted answer (SUBMITTED_ANSWER) compared to the baseline answer (BASELINE_ANSWER) to the same technical question:

<baseline_answer>
{text1}
</baseline_answer>


<submitted_answer>
{text2}
</submitted_answer>

## Task Details

Please analyze the similarity between these code blocks and generate quantitative measures along different dimensions:

1. Semantic Similarity
2. Lexical Similarity
3. Structural Similarity
4. Code Snippet Similarity
5. Citations Similarity

Then use this formula to calculate overall Average Similarity Score in percentages:

(Semantic Similarity + Lexical Similarity + Structural Similarity + Code Snippet Similarity + Citations Similarity) / 5

## Output format

Please explain your reasoning for each score.

Finish your findings by printing your calculations in plain text format. E.g.

(99% + 90% + 95% + 99% + 100%) / 5 = 96.6%
