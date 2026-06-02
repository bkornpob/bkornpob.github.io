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

  /* ── cards ── */
  const grid = document.getElementById('moduleGrid');
  if(!grid){ log('no grid'); return; }

  PLACEHOLDER_MODULES.forEach((m, idx) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label', m.title);

    const front = document.createElement('div');
    front.className = 'front';
    front.innerHTML = `<div class="icon" aria-hidden="true">${m.icon}</div><h2>${m.title}</h2><p>${m.desc}</p><div class="meta">mod #${String(idx+1).padStart(2,'0')} · placeholder</div>`;

    const back = document.createElement('div');
    back.className = 'back';
    back.innerHTML = `<div class="meta">portal link ready</div><div class="meta">${m.url}</div>`;

    // flipping behaviour
    const flip = () => card.classList.toggle('flipped');

    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); flip(); } });

    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });

  log('loaded: '+PLACEHOLDER_MODULES.length+' modules · theme='+initial);
})();
