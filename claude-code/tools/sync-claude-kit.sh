#!/usr/bin/env bash
# sync-claude-kit.sh - keep claude-code/ (this repo) and ~/.claude/ (installed) honest.
#
# The install in the README is one-directional:
#
#     cp -r claude-code/* ~/.claude/
#
# which is fine on day one and lossy forever after. Commands get edited in place
# at 2am when a run hits a gap, the repo never hears about it, and the only copy
# of a hard-won refinement is an untracked file in a home directory. That is not
# hypothetical: three /dark-factory rules (decision-SHAPED items, whole-system
# smoke, Closes-discipline) lived only in ~/.claude for a month before anyone
# noticed.
#
# This script does not sync silently. Default is a read-only drift report; you
# choose a direction explicitly.
#
#   ./sync-claude-kit.sh              # report drift, change nothing (default)
#   ./sync-claude-kit.sh --diff       # report drift + show the actual diffs
#   ./sync-claude-kit.sh --pull       # ~/.claude  ->  repo   (capture ad-hoc edits)
#   ./sync-claude-kit.sh --push       # repo       ->  ~/.claude (install/update)
#
# Only files GIT-TRACKED under claude-code/ are considered. ~/.claude holds
# plenty that is none of this repo's business, and an untracked scratch file must
# never be able to ride a --pull into a public repo.
#
# settings.local.json is never synced in EITHER direction. It carries
# machine-local permission grants; pulling it would leak them into a public repo,
# and pushing it would overwrite your live grants with the empty committed
# template. Install that one by hand, once, only if you do not have one.
#
# Symlinks are skipped on both sides: `cp` follows a destination symlink and
# would write through it to a path outside the tree you think you are syncing.
#
# archive/ is never synced either. It holds commands that were superseded and are
# kept only as a record; installing them would put dead slash commands back in
# your autocomplete, and pulling into it would resurrect a file that was retired
# on purpose. It stays a read-only exhibit.

set -euo pipefail

TOOLS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KIT_DIR="$(cd "$TOOLS_DIR/.." && pwd)"
REPO_ROOT="$(cd "$KIT_DIR/.." && pwd)"
HOME_DIR="${CLAUDE_HOME:-$HOME/.claude}"
MODE="report"

case "${1:-}" in
  --pull) MODE="pull" ;;
  --push) MODE="push" ;;
  --diff) MODE="diff" ;;
  ""|--report) MODE="report" ;;
  -h|--help) sed -n '2,38p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
  *) echo "unknown option: $1 (try --help)" >&2; exit 2 ;;
esac

# Never synced in either direction. Direction-neutral on purpose: a --push that
# replaces a live permissions file with the public empty template is data loss.
NEVER_SYNC="settings.local.json"

# Directories, relative to the kit root, that are records rather than kit. Same
# direction-neutral reasoning: never installed, never pulled back into.
NEVER_SYNC_DIR="archive"

if [ "$KIT_DIR" = "$HOME_DIR" ]; then
  echo "refusing to run: repo kit and install dir are the same path ($KIT_DIR)" >&2
  exit 2
fi

# Strip CR before comparing. A repo cloned on Windows and a `cp` install
# routinely disagree on line endings alone; reporting that as drift makes the
# tool cry wolf and trains you to ignore it. sed is used rather than GNU diff's
# --strip-trailing-cr so this also works against BSD diff on macOS.
norm() { sed 's/\r$//' "$1"; }

file_list="$(mktemp)"
trap 'rm -f "$file_list"' EXIT

# Git-tracked only. If this is not a git checkout, say so rather than silently
# falling back to a looser file set.
if ! git -C "$REPO_ROOT" rev-parse --git-dir >/dev/null 2>&1; then
  echo "refusing to run: $REPO_ROOT is not a git checkout (cannot determine tracked files)" >&2
  exit 2
fi
git -C "$REPO_ROOT" ls-files -z -- "${KIT_DIR#"$REPO_ROOT"/}" > "$file_list"

same=0; differ=0; missing=0; changed=0; skipped=0; errors=0

echo "repo: $KIT_DIR"
echo "home: $HOME_DIR"
echo "mode: $MODE"
echo

while IFS= read -r -d '' tracked; do
  repo_file="$REPO_ROOT/$tracked"
  rel="${tracked#"${KIT_DIR#"$REPO_ROOT"/}"/}"
  home_file="$HOME_DIR/$rel"

  if [ "$(basename "$rel")" = "$NEVER_SYNC" ]; then
    echo "  skipped        $rel  (machine-local, never synced either way)"
    skipped=$((skipped + 1))
    continue
  fi

  if [ "${rel%%/*}" = "$NEVER_SYNC_DIR" ]; then
    echo "  skipped        $rel  (archived record, never synced either way)"
    skipped=$((skipped + 1))
    continue
  fi

  if [ -L "$repo_file" ] || [ -L "$home_file" ]; then
    echo "  skipped        $rel  (symlink on one side; refusing to copy through it)"
    skipped=$((skipped + 1))
    continue
  fi

  if [ ! -f "$home_file" ]; then
    echo "  only-in-repo   $rel"
    missing=$((missing + 1))
    if [ "$MODE" = "push" ]; then
      mkdir -p "$(dirname "$home_file")"
      cp "$repo_file" "$home_file"
      echo "                 -> installed"
      changed=$((changed + 1))
    fi
    continue
  fi

  # 0 = same, 1 = differs, >1 = diff itself failed. Conflating the third with
  # "differs" would let an unreadable file or a missing tool trigger an overwrite.
  rc=0
  diff -q <(norm "$repo_file") <(norm "$home_file") >/dev/null 2>&1 || rc=$?

  if [ "$rc" -eq 0 ]; then
    same=$((same + 1))
    continue
  fi
  if [ "$rc" -gt 1 ]; then
    echo "  ERROR          $rel  (diff failed, rc=$rc; not touching this file)"
    errors=$((errors + 1))
    continue
  fi

  differ=$((differ + 1))
  # mtime only, and a `cp` install rewrites mtimes - this is a hint about the
  # filesystem, never about who edited what. It never drives sync direction.
  if [ "$home_file" -nt "$repo_file" ]; then hint="mtime: home newer"; else hint="mtime: repo newer"; fi
  echo "  DIFFERS        $rel  ($hint)"

  case "$MODE" in
    diff) diff -u <(norm "$repo_file") <(norm "$home_file") | sed 's/^/      /' || true ;;
    pull) cp "$home_file" "$repo_file"; echo "                 -> pulled into repo"; changed=$((changed + 1)) ;;
    push) cp "$repo_file" "$home_file"; echo "                 -> pushed to home"; changed=$((changed + 1)) ;;
  esac
done < "$file_list"

echo
echo "in sync: $same   differing: $differ   not installed: $missing   skipped: $skipped   errors: $errors   changed this run: $changed"

if [ "$errors" -gt 0 ]; then
  exit 2
fi
if [ "$MODE" = "report" ] && [ $((differ + missing)) -gt 0 ]; then
  echo
  echo "Nothing was modified. Re-run with --diff to see what changed,"
  echo "--pull to bring home edits into the repo, or --push to install the repo copy."
  exit 1
fi
