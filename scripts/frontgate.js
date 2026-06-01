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
let state = 'idle';
let knocks = 0;
let deadline = 0;
let lastFailIdx = -1;

const knocker = document.getElementById('knocker');
const status = document.getElementById('status');
const msg = document.getElementById('msg');

function pickJoke() {
  if (BANK.length <= 1) return BANK[0] || '';
  let next;
  do { next = Math.floor(Math.random() * BANK.length); } while (next === lastFailIdx && BANK.length > 1);
  lastFailIdx = next;
  return BANK[next];
}

function enterIdle() {
  state = 'idle';
  knocks = 0;
  status.textContent = 'KNOCK TO ENTER';
  msg.textContent = '';
  knocker.classList.remove('hit');
  knocker.style.removeProperty('box-shadow');
}

function open() {
  clearTimeout(window.__frontgateTimer);
  status.textContent = '3/3 — OPEN';
  msg.textContent = 'welcome, traveler.';
  knocker.style.boxShadow = '0 0 25px #ff4d4d, inset 0 0 18px rgba(255,77,77,0.4)';
  setTimeout(() => { window.location.href = 'hallway.html'; }, 900);
}

function resetFail() {
  state = 'fail';
  msg.textContent = pickJoke();
  knocker.classList.remove('hit');
  window.__frontgateTimer = setTimeout(enterIdle, 1200);
}

function tick() {
  if (state !== 'locked') return;
  const remain = Math.max(0, deadline - Date.now());
  if (remain <= 0) { resetFail(); return; }

  if (knocks === 1) {
    status.textContent = '1/3 · ' + (remain / 1000).toFixed(1) + 's';
  } else if (knocks === 2) {
    status.textContent = '2/3 · ' + (remain / 1000).toFixed(1) + 's';
  }

  const next = Math.min(50, remain);
  setTimeout(tick, next);
}

knocker.addEventListener('click', () => {
  if (state === 'idle') {
    state = 'locked';
    knocks = 1;
    deadline = Date.now() + FAIL_MS;
    knocker.classList.add('hit');
    status.textContent = '1/3 · 5.0s';
    tick();
  } else if (state === 'locked') {
    knocks += 1;
    knocker.classList.add('hit');
    knocker.classList.remove('hit');
    void knocker.offsetWidth;
    knocker.classList.add('hit');

    if (knocks === 2) {
      status.textContent = '2/3 · ' + Math.max(0, (deadline - Date.now()) / 1000).toFixed(1) + 's';
    } else if (knocks >= 3) {
      open();
    }
  }
});
