/* catCompanionEngine — a tiny top-down cat that follows the cursor and,
   when you stop moving, sits / grooms / dozes. Silhouette uses the page's
   --ink token, so it is black in light mode and cream in dark mode.
   Ported 1:1 from the handoff's portable cat-companion.js; styles live in
   CatCompanion.module.scss. Skips touch devices and honors
   prefers-reduced-motion. Returns a cleanup function that removes the DOM
   node, cancels the rAF loop, removes listeners and disconnects observers. */
import styles from './CatCompanion.module.scss';

const IDLE_ACTS = ['sit', 'sit', 'groom', 'sleep'];
const NEAR = 210;
const FAR = 340;
const STOP = 34;

const buildCatMarkup = () =>
  [
    `<div class="${styles.jtcIn}">`,
    `<div class="${styles.tail}"><div class="${styles.tail2}"></div></div>`,
    `<div class="${styles.p} ${styles.b}" style="left:16px;top:0"></div>`,
    `<div class="${styles.p}" style="left:16px;bottom:0"></div>`,
    `<div class="${styles.body}"></div>`,
    `<div class="${styles.p}" style="left:38px;top:1px"></div>`,
    `<div class="${styles.p} ${styles.b}" style="left:38px;bottom:1px"></div>`,
    `<div class="${styles.head}"></div>`,
    '<div style="position:absolute;right:4px;top:1px;width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent;border-bottom:6px solid var(--ink);transform:rotate(22deg)"></div>',
    '<div style="position:absolute;right:4px;bottom:1px;width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent;border-top:6px solid var(--ink);transform:rotate(-22deg)"></div>',
    `<div class="${styles.z}">z</div>`,
    '</div>'
  ].join('');

export const initCatCompanion = (): (() => void) => {
  const noop = () => {};
  if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body) return noop;

  // guard matchMedia itself (undefined in jsdom)
  const mm = typeof window.matchMedia === 'function' ? window.matchMedia.bind(window) : null;
  const touchOnly = !!mm && mm('(hover:none) and (pointer:coarse)').matches; // phones/tablets
  const reduce = !!mm && mm('(prefers-reduced-motion: reduce)').matches;
  if (touchOnly || reduce) return noop; // touch-only device, or user prefers no motion

  // remove any prior instance (hot reload / double mount)
  const old = document.getElementById('jtc');
  if (old && old.parentNode) old.parentNode.removeChild(old);

  const el = document.createElement('div');
  el.id = 'jtc';
  el.className = styles.jtc;
  el.setAttribute('aria-hidden', 'true');
  el.title = 'the cat lives here now. it is following you.';
  el.innerHTML = buildCatMarkup();
  document.body.appendChild(el);

  // keep the silhouette in sync with the theme (--ink flips black<->cream);
  // the theme class 'jt-dark' lives on <html> (documentElement)
  const syncInk = () => {
    const ink = window.getComputedStyle(document.documentElement).getPropertyValue('--ink');
    if (ink) el.style.setProperty('--ink', ink.trim());
  };
  syncInk();
  let observer: MutationObserver | null = null;
  if (typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver(syncInk);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }
  const inkInterval = window.setInterval(syncInk, 1500);

  let W = window.innerWidth;
  let H = window.innerHeight;
  let x = W * 0.5; // cat center
  let y = H * 0.72;
  let mx = -9999; // cursor (offscreen until it moves)
  let my = -9999;
  let curAngle = 0;
  let aimAngle = 0;
  let state = ''; // visual class
  let stateUntil = 0; // when the current idle ends
  let mode = 'idle'; // 'wander' | 'chase' | 'idle'
  let tgx = x; // wander destination
  let tgy = y;
  let attentive = true; // cats sometimes stop caring about you
  let nextMood = 0;
  let rafId = 0;

  const setVis = (s: string) => {
    if (s !== state) {
      state = s;
      el.className = `${styles.jtc} ${styles[s]}`;
    }
  };
  const idleFor = (now: number, dur: number) => {
    mode = 'idle';
    setVis(IDLE_ACTS[Math.floor(Math.random() * IDLE_ACTS.length)]);
    stateUntil = now + dur;
  };
  const pickWander = () => {
    mode = 'wander';
    tgx = 46 + Math.random() * (W - 92);
    tgy = 96 + Math.random() * (H - 150);
  };

  const onMouseMove = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
  };
  const onResize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  idleFor(performance.now(), 1200);

  const loop = () => {
    const now = performance.now();

    // mood swings: ~35% of the time the cat ignores the cursor entirely
    if (now > nextMood) {
      attentive = Math.random() > 0.35;
      nextMood = now + 6000 + Math.random() * 9000;
    }

    const dcx = mx - x;
    const dcy = my - y;
    const cdist = Math.hypot(dcx, dcy);
    const trigger = mode === 'chase' ? FAR : NEAR; // hysteresis so it doesn't flicker
    const wantChase = attentive && cdist < trigger;

    if (wantChase) {
      mode = 'chase';
      if (cdist > STOP + 6) {
        const f = (cdist - STOP) / cdist;
        x += dcx * f * 0.14;
        y += dcy * f * 0.14;
        aimAngle = (Math.atan2(dcy, dcx) * 180) / Math.PI;
        setVis('follow');
      } else {
        setVis('sit'); // caught up to the cursor — sit and stare
      }
    } else if (mode === 'chase') {
      idleFor(now, 600 + Math.random() * 700); // just lost interest
    } else if (mode === 'idle') {
      if (now > stateUntil) {
        if (Math.random() < 0.3) idleFor(now, 1600 + Math.random() * 2600);
        else pickWander();
      }
    } else {
      // wander toward a random spot, slowly
      const dtx = tgx - x;
      const dty = tgy - y;
      const d = Math.hypot(dtx, dty);
      if (d < 8) {
        idleFor(now, 1500 + Math.random() * 3400);
      } else {
        x += dtx * 0.05;
        y += dty * 0.05;
        aimAngle = (Math.atan2(dty, dtx) * 180) / Math.PI;
        setVis('follow');
      }
    }

    // rotate smoothly toward heading (shortest path)
    const da = ((aimAngle - curAngle + 540) % 360) - 180;
    curAngle += da * 0.16;
    el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${curAngle.toFixed(1)}deg)`;

    rafId = window.requestAnimationFrame(loop);
  };
  rafId = window.requestAnimationFrame(loop);

  return () => {
    window.cancelAnimationFrame(rafId);
    window.clearInterval(inkInterval);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    if (observer) observer.disconnect();
    if (el.parentNode) el.parentNode.removeChild(el);
  };
};
