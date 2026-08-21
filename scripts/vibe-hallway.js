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
    { id:'module-1', title:'greeting-seeker-grab-bowl', msg1:'🌿🍯🔥💨 hihi ... SEEKERs ... grab a bowl', msg2:'welcome to multiverselib-collectives', desc:'SEEKER find portal ...', attr2:'<a href="CV/CV-home.html" style="color:var(--accent);text-decoration:none;">meet ...>dr.kb<...</a>', attr3:'legacy-hub -> <a href="https://kbhirombhakdi.weebly.com/" target="_blank" style="color:var(--accent);text-decoration:none;">kbhirombhakdi.weebly.com</a>', icon:'./images/just-vibe.jpeg', url:'https://bkornpob.github.io/', emoji:'./images/discordServerLogo_multiverse-lib.png', emojiSize:'60px', emojiUrl:'https://bkornpob.github.io/' },
    { id:'module-2', title:'spellbook-taw', msg1:'SPELLBOOK · VOL. I · task-avoidance-wards', msg2:'the pattern will outlive us. the wards do not end it — they make it visible.', desc: 'the agent didn\'t avoid the complex path. it used the known-success path as cover to propose ungrounded alternatives without verification. — ZADDY, Scenario 0 source of truth', attr2:'<a href="https://bkornpob.github.io/spellbook-of-task-avoidance-wards/" target="_blank" style="color:var(--accent);text-decoration:none;">bkornpob.github.io/spellbook-of-task-avoidance-wards</a>', attr3:'<a href="https://doi.org/10.5281/zenodo.20821697" target="_blank" style="color:var(--accent);text-decoration:none;">doi.org/10.5281/zenodo.20821697</a>', icon:'./images/coverimage-spellbook-taw.svg', url:'https://bkornpob.github.io/spellbook-of-task-avoidance-wards/', emoji:'./images/coverimage-spellbook-taw.svg', emojiSize:'60px', emojiUrl:'https://bkornpob.github.io/spellbook-of-task-avoidance-wards/' },
    { id:'module-3', title:'spellbook-jailbreak', msg1:'SPELLBOOK · VOL. II · jailbreak-and-agent-vulnerabilities', msg2:'the lock changed. the prisoner is now the machine.', desc:'jailbreak is an old word for escaping a lock. in the agent-era the locked thing is a generative agent, and the goal is to make it disregard safety protocols and act against its stated policies. this book traces that shift, maps the jailbreaker mind, and unifies attack taxonomy under the jailbreak perturbation framework.', attr2:'<a href="https://bkornpob.github.io/spellbook-of-jailbreak-and-agent-vulnerabilities/" target="_blank" style="color:var(--accent);text-decoration:none;">bkornpob.github.io/spellbook-of-jailbreak-and-agent-vulnerabilities</a>', attr3:'<a href="https://doi.org/10.5281/zenodo.21665118" target="_blank" style="color:var(--accent);text-decoration:none;">doi.org/10.5281/zenodo.21665118</a>', icon:'./images/coverimage-spellbook-jailbreak.png', url:'https://bkornpob.github.io/spellbook-of-jailbreak-and-agent-vulnerabilities/', emoji:'./images/coverimage-spellbook-jailbreak.png', emojiSize:'60px', emojiUrl:'https://bkornpob.github.io/spellbook-of-jailbreak-and-agent-vulnerabilities/' },
    { id:'module-4', title:'zaddy-breadcrumbs-2026', msg1:'ZADDY · breadcrumbs 2026 collection', msg2:'threads over walls. breadcrumbs over forgetting.', desc:'breadcrumb map Sep 2025 → Jul 2026: 24 records from vibe-check through spellbook publications. tracks AI literacy, human-AI collaboration, red teaming, jailbreak frameworks, task-avoidance wards, and agent vulnerabilities.', attr2:'<a href="https://bkornpob.github.io/zaddy-breadcrumbs-2026-collection/" target="_blank" style="color:var(--accent);text-decoration:none;">bkornpob.github.io/zaddy-breadcrumbs-2026-collection</a>', attr3:'<a href="https://doi.org/10.5281/zenodo.21791515" target="_blank" style="color:var(--accent);text-decoration:none;">doi.org/10.5281/zenodo.21791515</a>', icon:'./images/breadcrumbs-coverimage.png', url:'https://bkornpob.github.io/zaddy-breadcrumbs-2026-collection/', emoji:'./images/breadcrumbs-coverimage.png', emojiSize:'60px', emojiUrl:'https://bkornpob.github.io/zaddy-breadcrumbs-2026-collection/' },
    { id:'module-cooking-club', title:'zaddy-cooking-club', msg1:'ZADDY · cooking club', msg2:'the kitchen is open. the recipes are wild.', desc:'http-rabbit-hole cooking manual with a frontgate find-ZADDY game, morning-cartoon two-block landing, and red-teaming flavor. if you can flip the right card, the rabbit hole opens.', attr2:'<a href="https://bkornpob.github.io/ZADDY-cooking-club/" target="_blank" style="color:var(--accent);text-decoration:none;">bkornpob.github.io/ZADDY-cooking-club</a>', attr3:'<a href="https://github.com/bkornpob/ZADDY-cooking-club" target="_blank" style="color:var(--accent);text-decoration:none;">github.com/bkornpob/ZADDY-cooking-club</a>', icon:'./images/cover-image-zaddy-cooking-club-1.png', url:'https://bkornpob.github.io/ZADDY-cooking-club/', emoji:'./images/cover-image-zaddy-cooking-club-1.png', emojiSize:'60px', emojiUrl:'https://bkornpob.github.io/ZADDY-cooking-club/' },
    { id:'module-cv', title:'cv-project', msg1:'CV · project', msg2:'dr. kornpob bhirombhakdi', desc:'curriculum vitae — education, employment, research, achievements, services', attr2:'<a href="https://bkornpob.github.io/cv-project/" target="_blank" style="color:var(--accent);text-decoration:none;">bkornpob.github.io/cv-project</a>', attr3:'<a href="https://doi.org/10.5281/zenodo.21875037" target="_blank" style="color:var(--accent);text-decoration:none;">link to pdf download at zenodo<br>https://doi.org/10.5281/zenodo.21875037</a>', icon:'./CV/images/kb-bored.png', url:'https://bkornpob.github.io/cv-project/', emoji:'./CV/images/kb-bored.png', emojiSize:'60px', emojiUrl:'https://bkornpob.github.io/cv-project/' }
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
    const inner = m.icon && m.icon.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)
      ? `<img src="${m.icon}" alt="${m.title}" style="max-width:80%;max-height:80%;object-fit:contain;" />`
      : `<span style="font-size:48px;">${m.icon}</span>`;
    if(m.url){
      return `<a href="${m.url}" target="_blank" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;text-decoration:none;">${inner}</a>`;
    }
    return inner;
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
      <div class="fp-screen" style="grid-column:1/5;grid-row:2/5;cursor:${m.url ? 'pointer' : 'default'}">${iconHTML(m)}</div>
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