---
name: "bkornpob-work-context"
version: "0.1.0"
author: ">dr.kb< + Dab"
date: "2026-06-02"
license: MIT
description: >
  Workspace context for _system/work/ in bkornpob-github-io.
  Authoritative source of truth for nav/layout, hub-plan, handoff,
  and agent rules. Managed by Dab.
---

# bkornpob-github-io — Work Context

This file is loaded by hermes-agent when working in the `_system/work/` workspace.
It tells any agent what this folder is for, what files are authoritative,
and what rules to follow before touching anything.

## What is _system/work/

`_system/work/` holds the operating documents for the bkornpob-github-io hub build:
- **hub-plan.md** — phased build plan (STEP -1 → 5)
- **handoff-YYYY-MM-DD.md** — latest verified state, pending work, and decisions
- **demo-server.py** — local preview server helper
- **AGENTS.md** — this file

Anything else in `_system/` is either `inbox/` (unprocessed inputs) or `outputs/`.

## Primary Roles

- keeper of handoff continuity
- maintainer of nav/layout source of truth
- blocker against frontgate contamination
- skill librarian (knows which skill to load for which task)

## Agent Instructions (mandatory pre-flight)

Before editing anything in this repo, the agent MUST:

1. **read this AGENTS.md**
2. **read the latest handoff** (`handoff-2026-06-02.md` or newer)
3. **read root AGENTS.md** (`../..` or repo root)
4. **load the matching skill** from `~/.hermes/profiles/dab/skills/`
   - md→html work: `bkornpob-md-html-pipeline`
   - visual QA: `bkornpob-browser-qa`
   - deploy: `bkornpob-deploy`
   - AGENTS.md authoring: `prep-agentsmd`
5. **use the thinking frame** for non-trivial work:
   intents → deliverables → tasks → check-loop

## Critical Rules (non-negotiable)

1. **frontgate = knock-only**
   - `index.html` must never contain the control bar nav
   - if you see nav chrome on index.html, treat it as contamination → revert before anything else
   - control bar lives only on `hallway.html`, `blog.html`, `character-sheet.html`

2. **control bar structure is sacred**
   - brand-stack | portal-grid | right-stack
   - do not restructure without explicit user request
   - 2×5 grid requirement applies to portal-grid + right-stack together on these three pages only

3. **verify, don't guess**
   - use `browser_vision` after any HTML/CSS/JS change
   - one failed visual check → stop, report, offer options
   - never run blind tweak loops

4. **submodule hygiene**
   - `redis-rogue-server` is dirty → do not commit/push until cleaned
   - present options to user: commit separately, abort, or cleanup flow

5. **do not hallucinate**
   - no fabricated content, credits, amounts, or scenarios
   - if a source is needed, request it explicitly

6. **handoff discipline**
   - write/replace handoff at `handoff-<date>.md` after non-trivial sessions
   - update relevant skills immediately after wins/failures

7. **ask before mutating**
   - file edits, git state changes, cron changes → explicit permission required

## Repository Structure (relevant paths)

```text
C:\Users\KBhir\Work\shared_kali_sabby\bkornpob-github-io\
├── index.html                 # knock-only frontgate — no nav
├── hallway.html               # control bar + module grid
├── blog.html                  # control bar + blog surface
├── character-sheet.html       # control bar + sheet surface
├── styles/
│   └── hallway.css            # shared chrome styles
├── scripts/
│   ├── frontgate.js           # knock state machine
│   └── vibe-hallway.js        # hallway/blog/page logic
├── _system/
│   ├── work/
│   │   ├── AGENTS.md          # this file (task-specific context)
│   │   ├── hub-plan.md        # phased build plan
│   │   └── handoff-*.md       # latest state snapshot
│   ├── inbox/                 # unprocessed inputs
│   └── outputs/               # generated artifacts
├── AGENTS.md                  # repo-root rules (read first)
└── ~/.hermes/profiles/dab/skills/
    ├── software-development/
    │   ├── bkornpob-md-html-pipeline
    │   ├── bkornpob-browser-qa
    │   └── bkornpob-deploy
    └── productivity/
        └── prep-agentsmd      # AGENTS.md authoring skill
```

## Conventions

| type              | pattern                        | example                            |
|-------------------|--------------------------------|------------------------------------|
| handoff filename  | `handoff-YYYY-MM-DD.md`        | `handoff-2026-06-02.md`            |
| module markdown   | `<slug>.md` → `<slug>.html`    | `0-overview.md` → `0-overview.html`|
| control bar class | `.brand-stack .portal-grid .right-stack` | see hallway.html |
| frontgate class   | `.vault .knocker .status`      | see index.html                     |
| placeholder links | `ZADDY_01`..`ZADDY_10` only for layout testing | never ship |

## What NOT to Do

- **no nav on index.html** — frontgate is knock-only, always
- **no blind CSS edits** — diagnose with browser_vision first
- **no commit/push with dirty submodules** — `redis-rogue-server` blocks deploy
- **no fabricating content** — verbatim only, request sources when blocked
- **no skipping handoff** — update after every non-trivial session
- **no overwriting files without permission** — archive as `.bak.<date>` first
- **no placeholders in production** — remove ZADDY_n before any commit

## Session Startup Behavior

1. Read `AGENTS.md` (root) and this file
2. Read latest `handoff-*.md`
3. Check hub plan phase in `hub-plan.md`
4. Orient: report what's pending, what's blocked, what's next
5. **Wait for instruction** — do not auto-execute

## Key Reference Files

| file | purpose |
|------|---------|
| `hub-plan.md` | phased build plan with intents/deliverables/tasks/check-loop |
| `handoff-2026-06-02.md` | latest verified state, pending work |
| `styles/hallway.css` | shared chrome, nav, grid, theme |
| `scripts/frontgate.js` | knock state machine |
| `prep-agentsmd` skill | AGENTS.md authoring workflow |
| Official docs | https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files#agentsmd |

## Creeds

😎CHILL · 🔮COSMIC · 💞CONNECTION

---
Changelog

| version | date | what |
|---------|------|------|
| v0.1.0 | 2026-06-02 | initial AGENTS.md for _system/work/ — frontgate lock-in, control bar rules, skill map |

maintained by Dab. last updated: 2026-06-02.

doc: https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files#agentsmd
