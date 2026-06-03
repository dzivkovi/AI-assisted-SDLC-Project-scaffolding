#!/usr/bin/env node
/**
 * claude-sessions.js - map Claude Code session GUIDs <-> the text names VS Code shows.
 *
 * The CLI resumes by GUID (`claude --resume <id>`); the VS Code / web picker shows a
 * human name. That name is the *last* `{"type":"ai-title","aiTitle":...}` record inside
 * the session's transcript at ~/.claude/projects/<project>/<id>.jsonl. This tool reads
 * those records so you can translate either direction.
 *
 * Usage:
 *   node claude-sessions.js                 List sessions for the CURRENT directory's project
 *   node claude-sessions.js --all           List sessions across ALL projects
 *   node claude-sessions.js <text>          Find sessions whose NAME contains <text> (case-insensitive)
 *   node claude-sessions.js <guid|prefix>   Show the NAME for a session id (full or unambiguous prefix)
 *   node claude-sessions.js --json [...]    Emit JSON instead of a table (composable with the above)
 *
 * Output always includes a ready-to-paste `claude --resume <id>` line for each match.
 *
 * Install as `cs`:
 *   cp claude-sessions.js ~/.claude/tools/claude-sessions.js
 *   # Add to ~/.bashrc:
 *   # cs() { node "$HOME/.claude/tools/claude-sessions.js" "$@"; }
 *
 * Verified on Claude Code v2.1.159. Relies on undocumented JSONL record types
 * (ai-title, custom-title, agent-name) - may break on future Claude Code upgrades.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

const PROJECTS_DIR = path.join(os.homedir(), '.claude', 'projects');
const GUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const HELP = `claude-sessions - map Claude Code session GUIDs <-> the names VS Code shows.

The CLI resumes a session by GUID ("claude --resume <id>"); the VS Code / web
picker lists sessions by a human name. That name is the latest "ai-title" record
written inside the session transcript (~/.claude/projects/<project>/<id>.jsonl).
This tool reads those records so you can translate either direction.

USAGE
  cs                     List sessions for the CURRENT directory's project
  cs --all               List sessions across ALL projects
  cs <text>              Find sessions whose NAME contains <text> (case-insensitive)
  cs <guid|prefix>       Show the full details + resume line for a session id
  cs --json [<query>]    Emit JSON instead of a table (composable with the above)
  cs --help | -h         Show this help

NOTES
  - A leading "~" in the list marks a session with no ai-title yet; the name
    shown is its first prompt instead (same as the GUI's untitled state).
  - The GUID is authoritative (it is the filename); the name is derived data.
  - Read-only: this never modifies your transcripts.

EXAMPLES
  cs                                 # what was I doing in this repo?
  cs astro                           # which session was the Astro migration?
  cs 286ccdec                        # name + paste-ready resume for that id
  claude --resume "$(cs astro --json | jq -r '.[0].id')"   # resume top match`;

// --- arg parsing -----------------------------------------------------------
const rawArgs = process.argv.slice(2);
if (rawArgs.includes('--help') || rawArgs.includes('-h')) { console.log(HELP); process.exit(0); }
const wantJson = rawArgs.includes('--json');
const wantAll = rawArgs.includes('--all');
const query = rawArgs.find((a) => !a.startsWith('--')) || null;

function normPath(p) {
  // Windows-safe comparison: resolve, lowercase, unify separators.
  return path.resolve(p).replace(/[\\/]+/g, '/').toLowerCase();
}

// --- read one transcript ---------------------------------------------------
// Single forward pass. A session has up to three kinds of name record, all of
// which can repeat (newest wins) and all of which carry a sessionId:
//   custom-title / agent-name  -> what /rename, `claude -n`, Ctrl+R write (user intent)
//   ai-title                   -> the auto-generated title (VS Code; CLI often omits it)
//   summary                    -> legacy fallback
// Precedence: user > auto > legacy > first prompt, matching what the official picker shows.
// Every record is gated on `sessionId === id` because a rename after /resume can write
// another session's title into THIS file (anthropics/claude-code#27202).
async function readSession(file) {
  const id = path.basename(file, '.jsonl');
  let customTitle = null;
  let aiTitle = null;
  let summary = null;
  let cwd = null;
  let firstPrompt = null;

  const mine = (o) => !o.sessionId || o.sessionId === id;

  const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const maybeTitle =
      line.includes('"custom-title"') || line.includes('"agent-name"') ||
      line.includes('"ai-title"') || line.includes('"type":"summary"');
    const maybeCwd = cwd === null && line.includes('"cwd"');
    const maybePrompt = firstPrompt === null && line.includes('"role":"user"');
    if (!maybeTitle && !maybeCwd && !maybePrompt) continue;

    let o;
    try { o = JSON.parse(line); } catch { continue; }

    if (o.type === 'custom-title' && o.customTitle && mine(o)) customTitle = o.customTitle;
    else if (o.type === 'agent-name' && o.agentName && mine(o)) customTitle = o.agentName;
    else if (o.type === 'ai-title' && o.aiTitle && mine(o)) aiTitle = o.aiTitle;
    else if (o.type === 'summary' && o.summary && summary === null && mine(o)) summary = o.summary;

    if (cwd === null && typeof o.cwd === 'string') cwd = o.cwd;

    if (firstPrompt === null && o.message && o.message.role === 'user') {
      const c = o.message.content;
      let t = typeof c === 'string'
        ? c
        : Array.isArray(c) ? c.map((x) => (x.type === 'text' ? x.text : '')).join('') : '';
      t = t.trim();
      if (t && !t.startsWith('<')) firstPrompt = t.replace(/\s+/g, ' ').slice(0, 70);
    }
  }

  let mtime = 0;
  try { mtime = fs.statSync(file).mtimeMs; } catch {}

  const title = customTitle || aiTitle || summary;
  const named = title !== null;
  return {
    id,
    name: title || firstPrompt || '(untitled)',
    named,
    cwd,
    mtime,
    file,
  };
}

// --- collect across all projects ------------------------------------------
async function collectAll() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`No projects dir at ${PROJECTS_DIR}`);
    process.exit(1);
  }
  const out = [];
  for (const proj of fs.readdirSync(PROJECTS_DIR)) {
    const dir = path.join(PROJECTS_DIR, proj);
    let stat;
    try { stat = fs.statSync(dir); } catch { continue; }
    if (!stat.isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.jsonl')) out.push(await readSession(path.join(dir, f)));
    }
  }
  out.sort((a, b) => b.mtime - a.mtime);
  return out;
}

// --- presentation ----------------------------------------------------------
function fmtDate(ms) {
  if (!ms) return '            ';
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function printTable(rows) {
  if (!rows.length) { console.log('(no matching sessions)'); return; }
  for (const r of rows) {
    const flag = r.named ? ' ' : '~';
    console.log(`${r.id}  ${fmtDate(r.mtime)} ${flag} ${r.name}`);
  }
  console.log(`\n${rows.length} session(s). Resume any with:  claude --resume <id>`);
}

// --- main ------------------------------------------------------------------
(async () => {
  const all = await collectAll();

  // 1) Direct GUID / prefix lookup.
  if (query && /^[0-9a-f-]+$/i.test(query) && !query.includes(' ')) {
    const hits = all.filter((s) => s.id === query.toLowerCase() || s.id.startsWith(query.toLowerCase()));
    if (hits.length) {
      if (wantJson) { console.log(JSON.stringify(hits, null, 2)); return; }
      for (const h of hits) {
        console.log(`\nname:    ${h.name}${h.named ? '' : '   (inferred from first prompt; no ai-title yet)'}`);
        console.log(`id:      ${h.id}`);
        console.log(`project: ${h.cwd || '(unknown)'}`);
        console.log(`updated: ${fmtDate(h.mtime)}`);
        console.log(`file:    ${h.file}`);
        console.log(`resume:  claude --resume ${h.id}`);
      }
      return;
    }
    if (GUID_RE.test(query)) { console.error(`No session with id ${query}`); process.exit(2); }
  }

  // 2) Name search.
  if (query) {
    const q = query.toLowerCase();
    const hits = all.filter((s) => s.name.toLowerCase().includes(q));
    if (wantJson) { console.log(JSON.stringify(hits, null, 2)); return; }
    printTable(hits);
    return;
  }

  // 3) No query: default to current directory's project, or --all.
  let rows = all;
  if (!wantAll) {
    const here = normPath(process.cwd());
    const scoped = all.filter((s) => s.cwd && normPath(s.cwd) === here);
    if (scoped.length) rows = scoped;
    else console.log(`(no sessions for ${process.cwd()} -- showing all; use --all to silence this)\n`);
  }
  if (wantJson) { console.log(JSON.stringify(rows, null, 2)); return; }
  printTable(rows);
})();
