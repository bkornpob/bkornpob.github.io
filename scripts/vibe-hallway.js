(() => {
  'use strict';

  /* ── config ── */
  const THEMES = [
    'neon','satire','flicker',
    'neon-drkb','neon-PAM','neo-Dab',
    'satire-drkb','satire-PAM','satire-Dab',
    'flicker-drkb','flicker-PAM','flicker-Dab',
    'neonvomit-drkb','neonvomit-PAM','neonvomit-Dab',
    'darksatire-drkb','darksatire-PAM','darksatire-Dab',
    'voidterminal-drkb','voidterminal-PAM','voidterminal-Dab'
  ];
  const PLACEHOLDER_MODULES = [
    { id:'isc2-cc',   title:'ISC2 CC',         desc:'Systems security practice.', icon:'🔒', url:'https://example.com/isc2-cc' },
    { id:'cloudplus', title:'Cloud+',           desc:'Cloud ops from the void.',  icon:'☁️', url:'https://example.com/cloud-plus' },
    { id:'oscpplus',  title:'OSCP+',            desc:'Offense simulation runes.', icon:'🗝️', url:'https://example.com/oscp-plus' },
    { id:'cosmicsec', title:'Cosmic Security',  desc:'Astral-layer defense.',    icon:'🪐', url:'https://example.com/cosmic-security' },
    { id:'aiethics',  title:'AI & Ethics',      desc:'When data catches feelings.',icon:'🤖', url:'https://example.com/ai-ethics' }
  ];

  /* ── theme ── */
  const stored = localStorage.getItem('multiverse-theme');
  const initial = stored || THEMES[Math.floor(Math.random()*THEMES.length)];
  document.documentElement.setAttribute('data-theme', initial);
  const sel = document.getElementById('themeSelect');
  if(sel){ sel.value = initial; sel.addEventListener('change', e => { document.documentElement.setAttribute('data-theme', e.target.value); localStorage.setItem('multiverse-theme', e.target.value); }); }

  /* ── debug ── */
  const logEl = document.getElementById('debugLog');
  const log = (...args) => { if(logEl) logEl.textContent = args.join(' '); };

  /* ── focus panel ── */
  const grid = document.getElementById('focusGrid');
  if(!grid){ log('no focusGrid'); return; }

  let current = 0;

  const render = (idx) => {
    const m = PLACEHOLDER_MODULES[idx];
    grid.innerHTML = `
      <!-- row 1: messages (7 cols) -->
      <div class="fp-msg" style="grid-column:1/5">📡 module ${String(idx+1).padStart(2,'0')} of ${PLACEHOLDER_MODULES.length}</div>
      <div class="fp-msg" style="grid-column:5/8">${m.title}</div>

      <!-- rows 2-4: focus screen (4 cols) + attributes (3 cols) -->
      <div class="fp-screen" style="grid-column:1/5;grid-row:2/5">${m.icon}</div>
      <div class="fp-attr" style="grid-column:5/8;grid-row:2">${m.desc}</div>
      <div class="fp-attr" style="grid-column:5/8;grid-row:3">id · ${m.id}</div>
      <div class="fp-attr" style="grid-column:5/8;grid-row:4">${m.url}</div>

      <!-- row 5: nav (7 cols) -->
      <button class="fp-btn" id="fpPrev" style="grid-column:1/4">&#8592; prev</button>
      <div class="fp-emoji" style="grid-column:4/5">🌀</div>
      <button class="fp-btn" id="fpNext" style="grid-column:5/8">next &#8594;</button>
    `;

    document.getElementById('fpPrev').addEventListener('click', () => {
      current = (current - 1 + PLACEHOLDER_MODULES.length) % PLACEHOLDER_MODULES.length;
      render(current);
    });
    document.getElementById('fpNext').addEventListener('click', () => {
      current = (current + 1) % PLACEHOLDER_MODULES.length;
      render(current);
    });
  };

  render(current);
  log('focusPanel ready · '+PLACEHOLDER_MODULES.length+' modules · theme='+initial);
})();