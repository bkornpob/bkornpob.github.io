bkornpob-github-io
AGENTS.md — operational rules for every agent that touches this repo

RULES
1. frontgate = index.html only
   - index.html is knock-only: vault, knocker, status, frontgate.js
   - no nav, no control bar, no placeholders
   - if index.html contains nav/links/placeholders, that's a bug — revert

2. control bar pages = hallway.html, blog.html, character-sheet.html
   - exact structure:
       .rabbit-hole.top
         .brand-stack
         .portal-grid  (6 cells)
         .right-stack  (theme picker + character sheet)
   - do not change this structure without explicit user request

3. before touching anything
   - read _system/work/handoff-<date>.md
   - read AGENTS.md (this file)
   - read the relevant skill from ~/.hermes/profiles/equinox/skills/

4. use the thinking frame for every non-trivial task
   intents → deliverables → tasks → check-loop

5. verify visual changes with browser_vision
   - stop blind tweak loops after one failed attempt
   - offer options instead of more blind guessing

6. git hygiene
   - do not commit/push while submodules are dirty
   - confirm working tree state before any commit

7. do not hallucinate
   - only credits/amounts/scenarios explicitly requested
   - ask before fabricating

8. memory / continuity
   - write handoff at _system/work/handoff-<date>.md
   - update relevant skills after non-trivial wins/failures
   - _system/work/AGENTS.md holds task-specific addendum; both must be observed
   - prep-agentsmd skill governs AGENTS.md authoring across workspaces
   - when working on hallway focus-panel cards, load update-bkornpob-focuspanel
     from ~/.hermes/profiles/equinox/skills/ and follow its workflow exactly

CREEDS
😎CHILL · 🔮COSMIC · 💞CONNECTION

ASSETS
core-site inventory for bkornpob.github.io.

| file | description |
|------|-------------|
| index.html | frontgate / landing page |
| hallway.html | multiverse portal / focus panel |
| blog.html | blogosphere landing |
| CV/CV-home.html | CV home |
| CV/cv-sections/*.html | CV section pages |
| CV/cv-styles.css | CV styles |
| CV/cv-script.js | CV scripts |
| styles/*.css | site stylesheets |
| scripts/*.js | site scripts |
| images/* | site images |
| _config.yml | site config |
| AGENTS.md | repo rules |

## Changelog

| version | date | what |
|---------|------|------|
| v1.1 | 2026-06-02 | added _system/work/AGENTS.md lock-in; linked prep-agentsmd skill |
| v1.0 | 2026-06-02 | initial repo AGENTS.md — frontgate/control-bar rules, thinking frame |
