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
    { id:'mv-001', title:'multiverselib-seeker-gate', msg1:'🌿🍯🔥💨 hihi ... SEEKERs ... grab a bowl', msg2:'welcome to multiverselib-collectives', desc:'SEEKER find portal ...', attr2:'<a href="CV/CV-home.html" style="color:var(--accent);text-decoration:none;">meet ...>dr.kb<...</a>', attr3:'legacy-hub -> <a href="https://kbhirombhakdi.weebly.com/" target="_blank" style="color:var(--accent);text-decoration:none;">kbhirombhakdi.weebly.com</a>', icon:'hihi', url:'https://example.com/mv-001', emoji:'./images/discordServerLogo_multiverse-lib.png', emojiSize:'60px', emojiUrl:'https://bkornpob.github.io/' },
    { id:'isc2-cc',   title:'ISC2 CC',         msg1:'📡 module 02', msg2:'ISC2 CC', desc:'Systems security practice.', attr2:'id · isc2-cc', attr3:'https://example.com/isc2-cc', icon:'🔒', url:'https://example.com/isc2-cc', emoji:'🔒', emojiSize:'', emojiUrl:'' },
    { id:'cloudplus', title:'Cloud+',           msg1:'📡 module 03', msg2:'Cloud+',  desc:'Cloud ops from the void.',  attr2:'id · cloudplus', attr3:'https://example.com/cloud-plus', icon:'☁️', url:'https://example.com/cloud-plus', emoji:'☁️', emojiSize:'', emojiUrl:'' },
    { id:'oscpplus',  title:'OSCP+',            msg1:'📡 module 04', msg2:'OSCP+',   desc:'Offense simulation runes.', attr2:'id · oscpplus', attr3:'https://example.com/oscp-plus', icon:'🗝️', url:'https://example.com/oscp-plus', emoji:'🗝️', emojiSize:'', emojiUrl:'' },
    { id:'cosmicsec', title:'Cosmic Security',  msg1:'📡 module 05', msg2:'Cosmic',  desc:'Astral-layer defense.',    attr2:'id · cosmicsec', attr3:'https://example.com/cosmic-security', icon:'🪐', url:'https://example.com/cosmic-security', emoji:'🪐', emojiSize:'', emojiUrl:'' }
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

  const iconHTML = (m) => {
    if(m.icon && m.icon.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)){
      return `<img src="${m.icon}" alt="${m.title}" style="max-width:80%;max-height:80%;object-fit:contain;" />`;
    }
    return m.icon;
  };

  const emojiHTML = (m) => {
    const size = m.emojiSize || '100%';
    const inner = m.emoji && m.emoji.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)
      ? `<img src="${m.emoji}" alt="emoji" style="width:${size};height:${size};object-fit:contain;" />`
      : `<span style="font-size:${m.emojiSize || '20px'}">${m.emoji || '🌀'}</span>`;
    if(m.emojiUrl){
      return `<a href="${m.emojiUrl}" target="_blank" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;text-decoration:none;">${inner}</a>`;
    }
    return inner;
  };

  const render = (idx) => {
    const m = PLACEHOLDER_MODULES[idx];
    grid.innerHTML = `
      <div class="fp-msg" style="grid-column:1/5">${m.msg1 || ''}</div>
      <div class="fp-msg" style="grid-column:5/8">${m.msg2 || ''}</div>
      <div class="fp-screen" style="grid-column:1/5;grid-row:2/5">${iconHTML(m)}</div>
      <div class="fp-attr" style="grid-column:5/8;grid-row:2">${m.desc || ''}</div>
      <div class="fp-attr" style="grid-column:5/8;grid-row:3">${m.attr2 || ''}</div>
      <div class="fp-attr" style="grid-column:5/8;grid-row:4">${m.attr3 || ''}</div>
      <button class="fp-btn" id="fpPrev" style="grid-column:1/4">&#8592; prev</button>
      <div class="fp-emoji" style="grid-column:4/5;display:flex;align-items:center;justify-content:center;">${emojiHTML(m)}</div>
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