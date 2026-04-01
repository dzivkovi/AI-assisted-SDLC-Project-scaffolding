---
description: Confidentiality guardrail for client-internal leakage and source-control exposure checks
argument-hint: [delta|full|git] [client-name]
version: 2.6
---

Run a strict, independent, read-only confidentiality guardrail review.

Parse `$ARGUMENTS` as follows:
- If the first argument is `delta`, `full`, or `git`, that is the scope.
- Otherwise, default scope to `delta`.
- Any remaining argument text is the client context.

If any information is missing, use AskUserQuestion to prompt before scanning:
- If scope was not explicitly provided, ask: "Which scope should this review use?" with options for delta (recommended), full, and git.
- If no client context was provided, ask: "Which client should this review target?" with options "No specific client (Recommended)" and "Mastercard". The user can type any other client name via the built-in Other option.
- Then proceed using the answers as if they had been passed as command-line arguments. When a client is named, automatically include common abbreviations and casing variants in the search.

Modes:

Generic mode (no client, or user chose "No specific client"):
- Scan for anything that looks non-public: project codenames, staff names with titles, internal workflows, architecture details, credentials, engagement context.
- Do not assume or infer a client name from project files or conversation history.
- Report `Client: generic` in output.

Client-targeted mode (client name provided via argument or prompt):
- Actively search for the client name, common abbreviations, and any provided aliases.
- Treat all aliases as equivalent to the client name for flagging purposes.
- Pay extra attention to references that could identify the client relationship, engagement scope, or internal project context.
- Report `Client: <client-name>` in output.

Working root rules:
- If the current folder is inside a git repository, use the repository root as the review root.
- Otherwise, use the current working directory as the review root.

Do not change files.
Do not suggest edits.
Do not generate patches or rewrites.
Only inspect and report flagged files.

Confidentiality boundary:
- Public brand names, public guidelines, and public-facing examples are allowed.
- Made-up examples using the client name, client abbreviations, or public brands are allowed if they are clearly generic.
- Do not flag content just because it mentions the client name or another public brand.
- Flag only content that may reveal non-public client-internal information or content derived from confidential client work.

Flag if content appears to contain, reveal, or be derived from:
- internal client processes, workflows, approvals, governance, onboarding, or reviewer relationships
- internal client project names, workstreams, codenames, or stakeholder context
- internal repos, environments, endpoints, paths, URLs, machine details, or plugin/tooling traces tied to client work
- internal business rules, thresholds, metrics, counts, timing, policies, or operating constraints
- wording, rationale, examples, or solution framing that appear adapted from private docs, meetings, chats, tickets, or internal notes
- any explicit mention that material came from proprietary, confidential, or internal sources
- genericized text that still appears traceable to a non-public client environment

Do not flag:
- public client guideline content
- generic software architecture or engineering language
- generic examples or invented scenarios using the client name
- personal or company attribution by itself unless it exposes confidential client context

Review rules:
- Be strict, but focus only on non-public client-internal leakage.
- Treat TODOs, ADRs, READMEs, comments, examples, rationale text, generated artifacts, fixtures, exports, and packaging artifacts as high risk.
- Flag inference risk, not just explicit leakage.
- If unclear, mark `REVIEW` rather than `FAIL`.
- Do not quote sensitive content verbatim.

Scope rules:

If scope is `delta`:
- Review only current changes rooted at the review root.
- If inside a git repository, include staged, unstaged, and untracked files.
- Gitignored files are intentionally excluded. `delta` reviews what is about to enter source control, not local scratch artifacts. Use `full` to cover those.
- Enumerate files via: `git diff --name-only`, `git diff --cached --name-only`, and `git ls-files --others --exclude-standard`.
- If not inside a git repository, review the current folder contents as the effective delta.
- Focus on files that could newly introduce leakage or exposure.

If scope is `full`:
- Review the whole workspace rooted at the review root, including gitignored and local-only files.
- Enumerate files by recursively listing the review root while excluding common VCS, dependency, build, and cache directories such as `.git/`, `node_modules/`, `.venv/`, `venv/`, `dist/`, `build/`, and `__pycache__/`.
- Explicitly include gitignored files. This is the scope that catches local scratch artifacts, conversation exports, and config files that `delta` intentionally skips.
- Inspect especially:
  - code
  - comments
  - TODOs
  - ADRs
  - READMEs
  - markdown docs
  - design notes
  - configs
  - scripts
  - tests
  - examples
  - sample or fixture data
  - generated artifacts
  - conversation exports
  - filenames and headings

If scope is `git`:
- Review source-control exposure risk rooted at the review root.
- Enumerate tracked files via: `git ls-files`.
- Enumerate untracked and ignored files via: `git ls-files --others --exclude-standard` for untracked files and `git status --ignored --short` for ignored files.
- Check commit history for suspect files via path-aware history commands such as `git log --all --oneline -- <suspect-path>`.
- Use reflog, branch, and tag inspection when needed to determine whether confidential material was committed locally, removed, rewritten, or never pushed.
- Check branches, tags, and release artifacts for residual exposure.
- Check whether tracked files reference or embed paths to sensitive local files.
- Determine whether risky material is:
  - tracked
  - untracked
  - ignored
  - present in reachable commit history
  - present in branches or tags
  - present in packaged or release artifacts
  - referenced from other tracked files, commit messages, or documentation
- Focus on whether confidential material crossed or nearly crossed repository boundaries, not just whether it exists locally.
- For gitignored files: verify they are protected and were never committed. Do not read their full content — detailed content inspection is `full` scope's job. However, if a client is targeted, do a lightweight grep for the client name across gitignored files. Report as a single summary line (e.g., "3 gitignored files contain Mastercard references — gitignore is the sole barrier"), not per-file flags with line numbers.
- For files that look sensitive but are NOT gitignored (e.g., `.env`, credentials, conversation exports, config with secrets): flag as a gitignore gap. This is the highest-priority finding in `git` scope.

Output:
- Keep it compact.
- Show only flagged files.
- Use a markdown table.
- Use the exact workspace file path as the visible file text.
- Make the file path clickable when possible.
- Put the line anchor on the first relevant line only.
- Do not use a separate Lines column.
- Put the line range at the start of the Reason cell in compact form like `5-5:` or `300-302:`.
- Put Reason before Category for easier scanning.
- Keep the reason short and specific.

Return exactly:

Overall: PASS | REVIEW | FAIL
Risk: LOW | MEDIUM | HIGH
Scope: delta | full | git
Root: <path>
Client: <client-name | generic>
Flagged files: <number>

| Result | File | Reason | Category |
|---|---|---|---|
| <REVIEW/FAIL> | <workspace/file/path> | <x-y>: <one short specific reason> | <specific category> |

Use specific categories such as:
- client-internal workflow
- client-internal approval/governance
- client-internal project reference
- client-internal environment/repo detail
- client-internal endpoint/path detail
- client-internal business rule
- client-internal metric/threshold
- confidential source-derived rationale
- private onboarding-derived wording
- repository exposure risk
- inference risk from client context
