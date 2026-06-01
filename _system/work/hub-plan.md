# hub build plan: bkornpob.github.io
operator: >dr.kb< | builder: Dab
status: draft → ready for execution

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP -1: frontgate ritual (triple-knock vault door)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTENTs:
  real: replace passive landing with an intentional entry ritual — three knocks within 5s
  hidden: set the vibe tone immediately, reduce accidental bounce rate, make the hub feel like a vault
  priority: 1 (THE FIRST THING USERS SEE)

DELIVERABLEs:
  - `index.html` (gate version) — vault door interface with knock circle, countdown, feedback area
  - `_system/gate/bank.json` — static joke bank for failed attempts
  - `_system/gate/state.js` — client-side state machine: idle → knock1 → knock2 → knock3 → open | reset
  - optional: `_system/gate/llm-proxy.js` or direct fetch to your LLM API endpoint for live messages

TASKs:
  1. design state machine:
     - IDLE: shows "KNOCK TO ENTER"
     - KNOCK1: first click → start 5s countdown, show "1/3 — 5.0s"
     - KNOCK2: second click within window → "2/3 — Xs"
     - KNOCK3: third click within window → "3/3 — OPEN" → transition to hallway
     - FAIL: timeout → "VAULT LOCKED. TRY AGAIN." + random bank line → back to IDLE
  2. write bank.json:
     - array of {knock_fail: "...", vibe: "chill|cosmic|connection"}
     - no-repeat rule: never show same message twice in a row (track last index)
  3. build gate UI:
     - central knocker element (circle, glow on click, ripple effect)
     - countdown display with `prefers-reduced-motion` respect
     - feedback area for messages
     - auto-flip card behavior after successful entry (if using homescreen with cards)
  4. write state.js (vanilla, zero deps):
     - click handler
     - countdown timer with reset on success/fail
     - random picker with last-index dedupe
  5. optional LLM enhancement:
     - config var `GATE_LLM_ENDPOINT` + `GATE_LLM_KEY`
     - fetch on fail → inject live generated line into feedback area
     - fallback to static bank if API fails or is unconfigured

CHECK-loop:
  - open gate page, click once → countdown appears, glow fires
  - wait >5s → reset + random message shown
  - click three times quickly → gate opens, redirected to `#hallway` or `hallway.html`
  - rapid-fire clicks don't break state machine
  - mobile: tap targets ≥44px, no hover dependency

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 0: anchor the contract

INTENTs:
  real: lock the md→html schema so every module behaves the same
  hidden: stop silent drift between source and rendered output
  priority: 1

DELIVERABLEs:
  - `docs/CONTRACT.md` — canonical spec for frontmatter, filename rules, link patterns
  - `scripts/validate-contract.js` — linter that checks a folder against the contract

TASKs:
  1. define frontmatter fields: title, emoji, desc, module, order, status (ready|wip|soon)
  2. define filename rule: `<slug>.md` → `<slug>.html`, folder == slug
  3. define link contract: internal links always `.html`, no `../` escapes beyond module root
  4. define asset contract: images in `<module>/assets/`, referenced relative
  5. write validator: reads a module dir, reports violations

CHECK-loop:
  - run validator on `isc2cc/` and `comptia-cloudplus/`
  - fix every reported violation before proceeding
  - pass = zero violations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: render md → html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTENTs:
  real: build a deterministic renderer that any module can use
  hidden: remove reliance on Jekyll for actual content rendering (keep theme only for styling fallback)
  priority: 1

DELIVERABLEs:
  - `scripts/render-md.js` — markdown → html using markdown-it + emoji-preserving handler
  - `scripts/render-module.js` — batch render all `.md` in a module dir to `.html`
  - proof-of-concept: fully rendered `isc2cc/` as `.html` files
  - `scripts/validate-links.js` — crawls generated html, reports broken internal links

TASKs:
  1. check if `markdown-it` is installed; if not, plan install
  2. write renderer:
     - input: `.md` with optional frontmatter
     - output: `.html` using current site CSS classes (`cyber-card`, `cyber-glow-rainbow`, etc.)
     - preserve emoji anchors, code blocks, tables
  3. write batch module renderer with dry-run flag
  4. run on `isc2cc/`, inspect output manually in browser
  5. write link validator: parse all `href`, check against filesystem
  6. run validator on rendered output, fix any broken links

CHECK-loop:
  - all `isc2cc/*.md` produce `.html` with no console errors
  - link validator reports zero broken internal links
  - visual spot-check: emoji anchors preserved, code blocks styled

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2: hallway homepage with auto-flip cards
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTENTs:
  real: replace hardcoded `index.html` with a generated hallway that reads a module registry
  hidden: make adding a new module a one-line registry edit, not html surgery
  priority: 2

DELIVERABLEs:
  - `_system/registry/modules.json` — single source of truth for all modules
  - `scripts/build-home.js` — generates `index.html` from registry + live module scan
  - auto-flip behavior: study panel cards auto-cycle every N seconds; hallway cards flip on hover/auto
  - deployed `index.html` with working hallway, identity card, study panel, footer

TASKs:
  1. design `modules.json` schema:
     - id, title, emoji, desc, path, status (ready|wip|soon), order
  2. scan repo for module root folders (dirs containing `0-landing.md` or `0-zeroday.md`)
  3. write `build-home.js`:
     - reads `modules.json`
     - generates hallway grid (cards)
     - `SOON` cards get distinct style (dimmed, locked icon)
     - generates study panel from same registry (group by category)
     - generates footer with build timestamp + creeds
  4. implement auto-flip for hallway cards:
     - CSS 3d flip on hover (keep-orientation: manual)
     - optional auto-cycle every 8s with pause-on-hover
  5. implement study panel auto-cycle (tabs rotate when panel is open and idle)
  6. generate first `index.html`, serve locally, test all card links resolve

CHECK-loop:
  - add a fake module to `modules.json`, run builder, confirm it appears on homepage
  - remove a module, confirm it disappears
  - all card links resolve (run `validate-links.js` on `index.html`)
  - mobile responsive: grid collapses gracefully
  - flip animation: smooth, not janky, respects `prefers-reduced-motion`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3: blogosphere integration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTENTs:
  real: fold blogosphere into the hallway as a module, retire standalone `blog-home.html` drift risk
  hidden: unify all content under one registry so nothing is orphaned
  priority: 3

DELIVERABLEs:
  - `blogs/` treated as a module in `modules.json` (id: `blogosphere`)
  - `build-blog.js` and `build-blog-home.js` updated to write into `blogs/posts/` with same `<slug>.md` → `<slug>.html` contract
  - hallway card for blogosphere with `#KotV` tag

TASKs:
  1. update `modules.json` with blogosphere entry pointing to `./blogs/blog-home.html`
  2. audit `build-blog.js`: ensure it respects contract (slug == folder == html name)
  3. audit `build-blog-home.js`: excerpt parser kept as fallback, but prefer frontmatter `excerpt` field if present
  4. run blog build, confirm blog-home.html linkable from hallway

CHECK-loop:
  - publish a test post, confirm it appears on blog home and is reachable from hallway
  - remove test post, confirm it disappears from blog home

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4: full-site validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTENTs:
  real: catch every broken link and missing asset before deploy
  hidden: make validation part of the build, not a manual afterthought
  priority: 2

DELIVERABLEs:
  - single command: `npm run validate` → runs contract linter + link checker + image audit
  - report: `_system/outputs/validation-report.html` with clickable links to broken assets

TASKs:
  1. write `scripts/audit-site.js`:
     - walks every `.html` in repo (excluding `_system/`)
     - collects every `href`, `src`, `![]()`
     - checks existence
     - categorizes: broken link, missing image, external link (skip)
  2. wire into `package.json` scripts:
     - `npm run build` → render all modules + build home
     - `npm run validate` → audit-site
     - `npm run deploy` → git commit + push (optional, gated)
  3. run full audit, fix every broken link found

CHECK-loop:
  - `npm run validate` exits 0 with report showing zero broken internal links
  - broken image report is empty
  - external links are listed but not flagged

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5: content cleanup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTENTs:
  real: reduce noise, consolidate duplicates, archive deadwood
  hidden: make the repo scannable for both humans and the build system
  priority: 3

DELIVERABLEs:
  - `archive/tmp-md/` — all `tmp.md` files moved here with index
  - merged `special-karen*` series into single file per topic
  - unified landing page naming: `0-overview.md` for every module (instead of `0-landing` vs `0-zeroday`)

TASKs:
  1. find all `tmp.md` / `tmpp.md` / `tmp-*.md`, move to `archive/tmp-md/`
  2. find `special-1/2/3-karen*` under `idk/CompTIA Cloud+/`, merge into `karen-casefiles.md`
  3. create alias map for legacy landing names → `0-overview.md`
  4. update `modules.json` paths to new names

CHECK-loop:
  - `find . -name 'tmp*.md'` returns nothing outside `_system/` and `archive/`
  - old karen files gone from original locations
  - every module has exactly one `0-overview.md`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTION ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## confirmed decisions
- architecture: C — manifest-router (hub = portal + vibe hub, content external)
- hosting: hub on github.io; content repos on their own endpoints
- post-gate vibe: ambient multiverse leak, cards drift/pulse/auto-cycle, hover-to-flip
- migration: gradual, one module at a time
- open question: should hub repo hold any personal content directly, or 100% outbound links?

## execution order
-1 (frontgate) → 0 (contract) → 1 (renderer) → 2 (hallway with effects) → 3 (blogosphere integration) → 4 (validation) → 5 (cleanup)

auto-flip behavior summary:
- hallway cards: CSS 3d flip on hover; optional auto-cycle (8s, pause-on-hover)
- study panel: tabs auto-rotate when panel expanded and mouse idle (>5s)
- respects `prefers-reduced-motion: reduce` → flips off, tab rotation off
