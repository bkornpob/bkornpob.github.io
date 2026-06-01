# repo audit: bkornpob-github-io
generated: 2026-06-02
operator: Dab

## identity
- type: personal knowledge base + live static site
- format: markdown-first content, JS-generated HTML output
- editor: Obsidian vault, rendered via GitHub Pages
- site: https://bkornpob.github.io/ ↔ repo https://github.com/bkornpob/bkornpob.github.io
- persona: glitch/alien, ND-friendly, "grab a bowl"

## config / templates
- `_config.yml`: Jekyll theme `jekyll-theme-hacker` with `remote_theme`
- `template-article.md`: structural scaffold — header → cover-image → body → sign-off → rabbit holes
- `index.html`: manual landing page, not Jekyll-driven

## build pipeline
- `scripts/build-blog.js`: copies one article folder from `content/blog-posts/<slug>/` → `blogs/posts/<slug>/`
  - image搬运 via `![]()` regex
  - link-writer expectation: md filename must equal folder name (`folder.html`)
- `scripts/build-blog-home.js`: reads `blogs/posts/*/`, generates `blogs/blog-home.html`
  - same filename == folder-name assumption for links
  - excerpt parser is brittle: exact `**> Excerpt /**\n...\n---` marker required; otherwise generic fallback
- `scripts/panel-toggle.js`: UI only; no data dependency
- styles: `main.css`, `main2.css`, `home-body.css`, `banner-article.css`

## rendered top-level sections
- study-panel overlay ( Cybersecurity / Cloud & DevOps / AI & Data Science / Quick Actions )
- identity card → CV
- BLOGOSPHERE ACCESS → `blogs/blog-home.html`
- COMPTIA CLOUD+ STUDY GUIDE → `comptia-cloudplus/0-zeroday.html`
- ISC2 CC: ZERO-DAY DECOMPILED → `isc2cc/0-landing.html`
- SECURITY AS SACRED PRACTICE → `isc2cc/d5/d5-alchemy.html`

## structural observations
- `index.html` renders `.html` paths, but source tree is mostly `.md` → build step must render those before deploy
- walkable md tree covers: OSCP, PentesterLab, CompTIA Cloud+, ISC2 CC, CHFI, web sec (wsa, csrf, xss), AWS, graphql, Qi Men, astrophysics, ethics, fictions
- CV exists as `CV/CV-home.html` plus pdf
- Obsidian vault metadata present (`.obsidian/`)
- lots of `tmp.md`, duplicate karen casefiles, inconsistent 0-landing vs 0-zeroday naming

## tone / voice markers
- emoji-heavy headlines (🌿🔥💨🍯🌈)
- glitch persona: dr.kb, dab, drkb, zv as nodes
- “grab a bowl” / “chief vibe officer”
- #ND-AF / ND-friendly phrasing explicit
- non-fluffy, metaphor-rich, grounded

## risk items
- build link contract: md filename == folder name must hold forever
- excerpt parser: strict marker; missing → generic fallback (decent fallback but inconsistent)
- `index.html` hardcodes many `./...html` targets; drift between live and generated output is silent
- `panel-toggle.js` references `#mainContent`; if `index.html` doesn’t have that id, toggle is no-op

## actionable options
- A: clean/audit md tree
- B: scaffold build pipeline / enforce md→html contract
- C: map persona/ethics arcs across docs
- D: write repo README matching the vibe
