# Theme Picker — Dev Instructions

**scope:** `hallway.html`, `blog.html`, `character-sheet.html`, `styles/hallway.css`, `scripts/vibe-hallway.js`

## How to Add / Edit a Theme Color Set

### 1. Define CSS Variables
**File:** `styles/hallway.css`

Add a new `[data-theme="<theme-key>"]` block after the `flicker` block. Every theme MUST define:
- `--bg`, `--panel`, `--ink`, `--muted`
- `--accent`, `--glow`
- `--panel-glass`, `--card-bg`, `--card-border`, `--shadow`

Naming convention: `<base>-<persona>` where base is `neon` or `satire`, persona is `drkb`, `PAM`, or `Dab`.

### 2. Register in JavaScript
**File:** `scripts/vibe-hallway.js`

Add the new `theme-key` string to the `THEMES` array constant at the top.

### 3. Add HTML Option (3 pages)
**Files:** `hallway.html`, `blog.html`, `character-sheet.html`

Inside each `#themeSelect` `<select>` block, add:
```html
<option value="<theme-key">display label</option>
```

Keep display labels lowercase to match the softened typography style.

### 4. Persistence
Theme selection is saved to `localStorage['multiverse-theme']` and applied via `document.documentElement.setAttribute('data-theme', value)`.

### 5. Verify
- Run `python -m http.server 8080` from repo root
- Visit `http://localhost:8080/hallway.html`
- Use the theme picker to cycle through all 9 options
- Confirm background, panel, text, accent, and card-border all update
- Check card glow animation is not aggressive (< 0.2 opacity recommended)

### Anti-patterns
- Do NOT add a theme only in CSS — it must also be in `THEMES[]` and all 3 `<select>` lists
- Do NOT use uppercase display labels — dev style guide forces lowercase
- Do NOT break the 2×4 grid when editing `hallway.html`
