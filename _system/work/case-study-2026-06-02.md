# Case Study: Frontgate Contamination Recovery
## 2026-06-02 — bkornpob-github-io

## What happened
Agent attempted to implement a 2×5 grid on the control bar. Wrong patch hit `index.html`
instead of `hallway.html`, replacing `.meta` with an `archive` placeholder span.
Frontgate rule (knock-only) was violated.

## What the user did
1. Attached image showing the lopsided layout
2. Said "remove two ZADDY"
3. Said "commit, then remove one ZADDY"
4. Corrected the agent when it tried to commit while submodule was dirty
5. Said "reflect the process... write training data"

## Thinking frame applied (retrospective)

### INTENTs
  real:
    - implement 2×5 equal-cell grid on control bar
    - remove placeholder overflow (ZADDY_09, ZADDY_10)
    - revert any frontgate contamination
  hidden:
    - avoid cross-file patching
    - preserve JS selectors (#themeSelect, #moduleGrid, #knocker)
    - keep index.html knock-only through all exploration
  priority: 1 (frontgate rule), 2 (grid comp)

### DELIVERABLEs
  - `index.html`: clean knock-only (vault + knocker + status + .meta)
  - `hallway.html`: control bar with 2×4 or 2×5 grid + ZADDY_n placeholders
  - `styles/hallway.css`: updated grid-template-columns
  - skill `bkornpob-layout-comp`: encoded anti-contamination rules
  - handoff: accurate state snapshot

### TASKs
  1. read hallway.html + vibe-hallway.js before touching anything
  2. patch CSS: .nav-right grid-template-columns (5 → 4 → 5 iterations)
  3. patch hallway.html: replace portal-grid + right-stack with .nav-right
  4. remove ZADDY_09/10 (overfilled grid)
  5. remove ZADDY_08 (user said "remove one ZADDY" after commit)
  6. verify frontgate NOT contaminated (read index.html)
  7. verify visual with browser_vision
  8. update handoff

### CHECK-loop
  - ✅ read target file before EVERY patch
  - ✅ search_files(target='files') to confirm path
  - ✅ browser_vision after meaningful change
  - ❌ FAIL: initial commit included dirty submodule
  - ❌ FAIL: index.html patched instead of hallway.html (cross-file contamination)
  - ❌ FAIL: subpatch to index.html replaced .meta with `archive` span
  - ✅ RECOVERED: read index.html → saw damage → reverted .meta
  - ✅ RECOVERED: stopped all patches → read state → fixed only what was broken

## Failure tree (for training)

```
attempt patch hallway.html
    ↓
context noise: hallway.html and index.html both in previous diff
    ↓
patch old_string matched BOTH files? or tool chose wrong target?
    ↓
index.html gets nav-right markup intended for hallway.html
    ↓
later: try to remove ZADDY_01 from index.html
    ↓
old_string matches .meta line instead
    ↓
.meta replaced with archive span
    ↓
CONTAMINATION EVENT
```

## Anti-failure rules (from this case)

1. **read-before-patch**: every time, even if you read it 60 seconds ago
2. **specify path explicitly**: never rely on fuzzy match alone
3. **verify immediately after patch**: diff + read
4. **frontgate lock-in**: index.html is untouchable for nav
5. **submodule check before commit**: git status + git submodule status first
6. **user direction on commits**: when submodule dirty, present options, don't auto-force

## What worked

- stopping immediately on wrong-file detection
- reading the damaged file to assess exact state
- precise patch to revert only the broken line
- updating skill + handoff to encode the failure

## What didn't

- trusting context memory instead of re-reading target file
- committing exploratory comps without submodule check
- changing CSS 3 times before visual verification

## Transferable frame

For ANY layout/content task:

```
INTENTs:
  what does "done" look like?
  what could go wrong?
  what's the priority order?

DELIVERABLEs:
  which files change
  what is the visual/runtime state after
  what regression tests apply

TASKs:
  smallest useful step
  smallest useful step
  ...

CHECK-loop:
  evidence-based verification
  if fail: stop, report, options
  if succeed: lock rule in skill + handoff
```

## Related artifacts
- Skill: bkornpob-layout-comp (encoded rules)
- Handoff: _system/work/handoff-2026-06-02.md
- AGENTS.md: repo root + _system/work/AGENTS.md
- Submodule guard: bkornpob-deploy skill
