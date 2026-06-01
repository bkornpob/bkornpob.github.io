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
const FAIL_MS = 5000;
let state = 'idle', knocks = 0, t = 0, lastIdx = -1;
const knocker = document.getElementById('knocker');
const status = document.getElementById('status');
const msg = document.getElementById('msg');
function pick() {
  if (BANK.length <= 1) return BANK[0];
  let i;
  do { i = Math.floor(Math.random() * BANK.length); } while (i === lastIdx);
  lastIdx = i;
  return BANK[i];
}
function reset(s) {
  state = s || 'idle'; knocks = 0; clearTimeout(t);
  knocker.classList.remove('hit');
  status.textContent = ''; msg.textContent = '';
  if (s === 'idle') return;
  msg.textContent = pick();
  setTimeout(() => { state = 'idle'; msg.textContent = ''; status.textContent = 'KNOCK TO ENTER'; }, 1200);
}
function open() {
  status.textContent = '3/3 — OPEN';
  msg.textContent = 'welcome, traveler.';
  knocker.style.borderColor = '#ff4d4d';
  knocker.style.color = '#fff';
  knocker.style.textShadow = '0 0 25px #ff4d4d';
  setTimeout(() => { window.location.href = 'hallway.html'; }, 900);
}
knocker.addEventListener('click', () => {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // still allow accessibility flow; no special animation
  }
  if (state === 'idle') {
    state = 'locked'; knocks = 1;
    knocker.classList.add('hit');
    status.textContent = '1/3 — 5.0s';
    t = setTimeout(() => reset('fail'), FAIL_MS);
  } else if (state === 'locked') {
    knocks++;
    knocker.classList.add('hit');
    if (knocks === 2) {
      const sec = Math.max(0, (t - Date.now()) / 1000).toFixed(1);
      status.textContent = `2/3 — ${sec}s`;
    } else if (knocks === 3) {
      clearTimeout(t);
      open();
    }
  }
});
