# Theme Picker — Dev Instructions

scope: `hallway.html`, `blog.html`, `character-sheet.html`, `styles/hallway.css`, `scripts/vibe-hallway.js`

## Theme Inventory

| key | base | persona | style ref |
|-----|------|---------|-----------|
| neon | neon | — | original |
| satire | satire | — | original |
| flicker | flicker | — | original |
| neon-drkb | neon | drkb | orange technomancer |
| neon-PAM | neon | PAM | red noir |
| neo-Dab | neon | Dab | purple + green chill |
| satire-drkb | satire | drkb | warm orange |
| satire-PAM | satire | PAM | sacred red |
| satire-Dab | satire | Dab | purple + green |
| flicker-red | flicker | base-red | terminal red |
| flicker-red-drkb | flicker | drkb | orange-red |
| flicker-red-PAM | flicker | PAM | red cyber |
| flicker-red-Dab | flicker | Dab | green chill |
| neonvomit | neon | base | #NEONVOMIT |
| neonvomit-drkb | neon | drkb | orange neon |
| neonvomit-PAM | neon | PAM | pink neon |
| neonvomit-Dab | neon | Dab | green chill |
| darksatire | satire | base | #DARKSATIRE |
| darksatire-drkb | satire | drkb | warm satire |
| darksatire-PAM | satire | PAM | red satire |
| darksatire-Dab | satire | Dab | green satire |
| voidterminal | flicker | base | #VOID TERMINAL |
| voidterminal-drkb | flicker | drkb | orange void |
| voidterminal-PAM | flicker | PAM | red void |
| voidterminal-Dab | flicker | Dab | green void |

## Persona Hex Reference (hand-picked stable colors)

**drkb:** orange dominant
- bg: `#0a0a02`, panel: `#1a1406`, ink: `#ffd6a0`, muted: `#c4a882`, accent: `#ff8c00`
- card-bg: `rgba(40,32,10,.8)`, card-border: `rgba(255,160,60,.10)`, shadow: `rgba(255,140,0,.12)`

**PAM:** dark red dominant
- bg: `#0a0202`, panel: `#1a0606`, ink: `#ffc0b0`, muted: `#e0a090`, accent: `#ff3030`
- card-bg: `rgba(40,10,10,.8)`, card-border: `rgba(255,80,60,.10)`, shadow: `rgba(255,48,48,.12)`

**Dab:** purple + neon green
- bg: `#06020a`, panel: `#0e0614`, ink: `#e0ffc0`, muted: `#a0d090`, accent: `#39ff14`
- card-bg: `rgba(22,10,34,.8)`, card-border: `rgba(57,255,20,.10)`, shadow: `rgba(57,255,20,.12)`

## How to Add / Edit a Theme Color Set

### 1. Define CSS Variables
**File:** `styles/hallway.css`

Add a new `[data-theme="<theme-key>"]` block. Every theme MUST define:
- `--bg`, `--panel`, `--ink`, `--muted`
- `--accent`, `--glow`
- `--panel-glass`, `--card-bg`, `--card-border`, `--shadow`

 naming convention: `<base>-<persona>` where base is `neon`, `satire`, `flicker`, `neonvomit`, `darksatire`, `voidterminal`, persona is `drkb`, `PAM`, or `Dab`. base-only themes omit the persona suffix.

### 2. Register in JavaScript
**File:** `scripts/vibe-hallway.js`

Add the new `theme-key` string to the `THEMES` array constant at the top.

### 3. Add HTML Option (3 pages)
**Files:** `hallway.html`, `blog.html`, `character-sheet.html`

Inside each `#themeSelect` block, add:
```html
<option value="<theme-key">display label</option>
```

Keep display labels lowercase to match the softened typography style.

### 4. Persistence
Theme selection is saved to `localStorage['multiverse-theme']` and applied via `document.documentElement.setAttribute('data-theme', value)`.

### 5. Verify
- Run `python -m http.server 8080` from repo root
- Visit `http://localhost:8080/hallway.html`
- Use the theme picker to cycle through all 24 options
- Confirm background, panel, text, accent, and card-border all update
- Check card glow animation is not aggressive (< 0.2 opacity recommended)

### Anti-patterns
- Do NOT add a theme only in CSS — it must also be in `THEMES[]` and all 3 `<select>` lists
- Do NOT use uppercase display labels — dev style guide forces lowercase
- Do NOT break the 2×4 grid when editing `hallway.html`
