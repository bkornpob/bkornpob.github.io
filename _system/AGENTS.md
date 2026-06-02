# _system — Workspace Operating Rules

>dr.kb< multiverse-lib :: internal system docs
scope: _system/ subtree

## What is _system/

`_system/` holds all operational memory for the hub build:

| path | purpose |
|------|---------|
| `work/` | plans, handoffs, dev guides, case studies |
| `inbox/` | unprocessed inputs (numbered files, mixed formats) |
| `outputs/` | generated artifacts from completed work |

## Pre-flight (before editing anything in this subtree)

1. read `AGENTS.md` (this file)
2. read `work/AGENTS.md` — task-specific rules for work context
3. read the latest `work/handoff-*.md`
4. load matching skill from `~/.hermes/profiles/dab/skills/`

## Inbox intake rules

- every numbered file in `inbox/` is an unprocessed input
- file extension is authoritative (`.md` = markdown, `.html` = markup, bare = unknown)
- after processing: move to `outputs/` if it produced an artifact, or remove if consumed
- never ship with items in `inbox/` that have been implemented but not cleared

## Handoff discipline

- after any non-trivial work, update `work/handoff-YYYY-MM-DD.md`
- handoff must contain: verified state, open items, latest commit hash
- if continuing later, write a clear "next" section

## Work context rules

`work/AGENTS.md` governs:
- frontgate lock-in (index.html = knock-only)
- control bar structure (brand-stack | portal-grid | right-stack)
- submodule hygiene
- verification before claiming done

## Anti-patterns

- no cross-contamination between `_system/work/` deltas and live site files
- no handoff written after every tiny change — batch by session boundary
- no skipping inbox triage when you're about to touch a related feature

## Creeds

😎CHILL · 🔮COSMIC · 💞CONNECTION
