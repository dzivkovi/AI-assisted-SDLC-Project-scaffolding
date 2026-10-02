---
description: Save session content as a numbered markdown note under work/<date>/
model: sonnet
---

Please save content as a markdown file with a specific naming convention and structure. Follow these instructions carefully:

## CRITICAL: Check for user instructions FIRST!

If the user provided specific instructions about what to save:
<user_instructions>
$ARGUMENTS
</user_instructions>

- If user instructions exist above, follow them to determine WHAT content to save
- If no instructions provided (empty), default to saving your last response (the assistant message immediately before this `/note`)

### LOSSLESS RULE (applies to every note, with or without instructions)
You may summarize prose. You may NEVER drop or paraphrase the details. Copy these into the note exactly as they appeared in the chat, character for character:
- every fenced code block (commands, drafts, messages the user will paste somewhere)
- every table, with all its rows
- every URL and every link
- every number, date, name, file path, and quoted sentence
A note that reads well but lost a link, a row, or a code block is a FAILED note. If in doubt, include the whole original section verbatim under its own heading rather than summarizing it. The value of a note is in its details, not in its prose.

Examples:
- `/note` → Save your last response
- `/note (AI extraction conversation)` → Save content about AI extraction conversation
- `/note (summary of GraphRAG implementation)` → Save summary of GraphRAG work

### CRITICAL: YOU run the commands to find the next file number
Nothing in this file runs by itself. Before writing, YOU run Bash to:
1. Create today's `work/<date>` directory (date from the `date` command, never typed by hand)
2. List what numbered files already exist there
3. Pick the next number (NN) and a meaningful-file-name

### IMPORTANT: Use the resolved path (real date, real number, real name) in the Write call.

## 1. File Naming and Location

Save the file in the following format: `work/$CURRENT_DATE/NN-meaningful-file-name.md` where:

### IMPORTANT NOTES:

1. Use bash `date` command for dates

- Always use a bash variable to store and reuse the current date:
```bash
CURRENT_DATE=$(date +%Y-%m-%d)
mkdir -p work/$CURRENT_DATE
```

- DO NOT manually type the date - always use the $CURRENT_DATE variable to avoid month transcription errors.

2. NN is a two-digit number (01, 02, etc.) indicating the order of the file for that day

3. Meaningful-file-name is a brief description of the content. If this is the first note of the day, start with 01. Otherwise, increment this number sequentially.

## 2. Content Structure

Each entry should include:

- Date and timestamp (use bash command: `date +"%Y-%m-%d at %H:%M:%S %Z"`)
- Context of the conversation
- The question/query from the user
- Your analysis and findings as seen in the chat, under the LOSSLESS RULE above: summarize the prose, copy the details

### WARNING - COMMON BUG:
The date July 21 is `<year>-07-21` NOT `<year>-01-21`!
- 07 = July (NOT 01 which is January)
- If today is July 21, the folder MUST be `work/<year>-07-21/`
