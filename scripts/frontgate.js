/* frontgate.js — triple-knock state machine */
(() => {
  'use strict';

  const FAIL_MS = 5000;
  const OPEN_AFTER_MS = 900;

  const BANK = [
    "nice try, but the vault has trust issues.",
    "slow hands don’t unlock multiverses.",
    "did the signal just... ghost you?",
    "the corridor is empty. knock louder.",
    "you fumbled the ritual. try again.",
    "access denied — too much hesitation.",
    "the multiverse yawned. try faster.",
    "knock with intent, not anxiety.",
    "almost mystical. almost.",
    "the gate knows when you hesitate.",
    "reset: 0. intent is the real key."
  ];

  let state = 'idle';
  let knocks = 0;
  let deadline = 0;
  let failTimer = 0;
  let lastFailIdx = -1;
  let tickRAF = 0;
  let debugEl = null;

  const knocker = document.getElementById('knocker');
  const statusEl = document.getElementById('status');
  const msgEl = document.getElementById('msg');

  if (!knocker || !statusEl || !msgEl) return;

  debugEl = document.getElementById('debugLog') || null;

  function setDebug(text) {
    if (debugEl) debugEl.textContent = text;
  }

  function pickJoke() {
    if (BANK.length <= 1) return BANK[0] || '';
    let next;
    do {
      next = Math.floor(Math.random() * BANK.length);
    } while (next === lastFailIdx && BANK.length > 1);
    lastFailIdx = next;
    return BANK[next];
  }

  function clearTimers() {
    clearTimeout(failTimer);
    cancelAnimationFrame(tickRAF);
    failTimer = 0;
    tickRAF = 0;
  }

  function enterIdle() {
    state = 'idle';
    knocks = 0;
    statusEl.textContent = 'are you a SEEKER?';
    msgEl.textContent = '';
    knocker.classList.remove('hit');
    knocker.style.removeProperty('box-shadow');
    setDebug('idle');
  }

  function open() {
    clearTimers();
    state = 'open';
    statusEl.textContent = 'BINDING COMPLETE';
    msgEl.textContent = 'welcome, seeker.';
    knocker.style.boxShadow = '0 0 25px #ff4d4d, inset 0 0 18px rgba(255,77,77,0.4)';
    setDebug('open');
    setTimeout(() => {
      window.location.href = 'hallway.html';
    }, OPEN_AFTER_MS);
  }

  function resetFail() {
    state = 'fail';
    msgEl.textContent = pickJoke();
    knocker.classList.remove('hit');
    setDebug('fail:' + msgEl.textContent);
    failTimer = setTimeout(enterIdle, 1200);
  }

  function scheduleTick() {
    const tick = () => {
      if (state !== 'locked') return;
      const remain = Math.max(0, deadline - Date.now());

      if (remain <= 0) {
        resetFail();
        return;
      }

      const sec = (remain / 1000).toFixed(1);

      if (knocks === 1) {
        statusEl.textContent = 'SEEKER seeks portal?';// + sec + 's';
      } else if (knocks === 2) {
        statusEl.textContent = 'TRUTH LOVE LIBERATION?';// + sec + 's';
      }

      const next = Math.max(16, Math.min(250, remain));
      tickRAF = requestAnimationFrame(tick);
    };

    tickRAF = requestAnimationFrame(tick);
  }

  knocker.addEventListener('click', () => {
    if (state === 'idle') {
      state = 'locked';
      knocks = 1;
      deadline = Date.now() + FAIL_MS;
      clearTimers();
      knocker.classList.add('hit');
      statusEl.textContent = '1/3 · 5.0s';
      setDebug('locked:1');
      scheduleTick();
    } else if (state === 'locked') {
      knocks += 1;
      knocker.classList.remove('hit');
      void knocker.offsetWidth;
      knocker.classList.add('hit');

      if (knocks === 2) {
        const sec = Math.max(0, (deadline - Date.now()) / 1000).toFixed(1);
        statusEl.textContent = '2/3 · ' + sec + 's';
        setDebug('locked:2');
      } else if (knocks >= 3) {
        open();
      }
    }
  });

  enterIdle();
})();
