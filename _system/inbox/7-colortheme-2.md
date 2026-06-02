i want you to add these 4 themes from this source to our theme-pickers

the following snippets are from 
  - https://github.com/51n5337/freak-show/blob/main/90-Assets/main.css

implement these 4 themes in additional to the original 3 themes
  1: the new four themes with the exact color profile from the source
  2: each theme, pair it with {drkb, PAM, Dab} color theme
  3: prepare a summary of color theme of these 3 named profiles {drkb, PAM, Dab} ... i simply want to have to hex-color codes recorded somewhere, so reproducing will not miss a beat

here is the original freak-show 4 themes:
```css
/* VOID TERMINAL */
.void-terminal { margin-top: 4rem; border: 1px solid var(--border); padding: 1rem; background: #000; }
.void-input { background: transparent; border: none; color: var(--accent); width: 100%; font-family: inherit; font-size: 1rem; outline: none; }
.void-prompt { color: var(--accent); margin-right: 0.5rem; }

/* VIBE: #THEFLICKER */
.vibe-flicker { --bg: #050505; --text: #ff4d4d; --accent: #ff4d4d; --border: #600; }
.vibe-flicker::before { content: ' '; display: block; position: fixed; top: 0; left: 0; bottom: 0; right: 0; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); z-index: 9999; background-size: 100% 2px, 3px 100%; pointer-events: none; }
.vibe-flicker h1, .vibe-flicker h2 { animation: flicker var(--flicker-speed) infinite; }

/* VIBE: #NEONVOMIT */
.vibe-neon { --bg: #000; --text: #0ff; --accent: #f0f; --border: #0ff; }
.vibe-neon .card { box-shadow: 0 0 10px var(--accent); }
.vibe-neon h1, .vibe-neon h2 { text-shadow: 2px 0 #f0f, -2px 0 #0ff; animation: glitch 1s infinite; }

/* VIBE: #DARKSATIRE */
.vibe-satire { --bg: #111; --text: #ffff00; --accent: #ffff00; --border: #ffff00; }
.vibe-satire h1, .vibe-satire .card { transform: rotate(-0.5deg); }
```