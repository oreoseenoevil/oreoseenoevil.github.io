/* catCompanionEngine — a tiny top-down cat that follows the cursor and,
   when you stop moving, sits / grooms / dozes. Silhouette uses the page's
   --ink token, so it is black in light mode and cream in dark mode.
   Ported 1:1 from the handoff's portable cat-companion.js; styles live in
   CatCompanion.module.scss. Skips touch devices and honors
   prefers-reduced-motion. Returns a cleanup function that removes the DOM
   node, cancels the rAF loop, removes listeners and disconnects observers. */
import styles from './CatCompanion.module.scss';

// [state, minMs, maxMs] — weights come from duplicates; each act keeps a
// duration range that fits the behavior (naps are long, rolls are quick)
const IDLE_ACTS: [string, number, number][] = [
  ['sit', 1500, 3500],
  ['sit', 1500, 3500],
  ['sit', 1500, 3500],
  ['groom', 2000, 4200],
  ['groom', 2000, 4200],
  ['sleep', 3200, 7200],
  ['sleep', 3200, 7200],
  ['scratch', 1800, 3200],
  ['scratch', 1800, 3200],
  ['stretch', 1800, 2800],
  ['stretch', 1800, 2800],
  ['roll', 1400, 2200]
];
const NEAR = 210;
const FAR = 340;
const STOP = 34;
// speeds in px per 60fps-frame (dt-normalized below, so real monitors of any
// refresh rate move the cat identically); caps keep it a trot, not a teleport
const CHASE_EASE = 0.055;
const CHASE_MAX = 4.2;
const WANDER_EASE = 0.022;
const WANDER_MAX = 1.8;
const MAX_FX = 36; // hard cap on live effect nodes (paw prints, dust, hearts)
const PAW_EVERY_PX = 26;
const HEART_COOLDOWN_MS = 4500;

const buildCatMarkup = () =>
  [
    `<div class="${styles.jtcIn}">`,
    `<div class="${styles.tail}"><div class="${styles.tail2}"></div></div>`,
    `<div class="${styles.p} ${styles.b}" style="left:16px;top:0"></div>`,
    `<div class="${styles.p}" style="left:16px;bottom:0"></div>`,
    `<div class="${styles.body}"></div>`,
    `<div class="${styles.p} ${styles.pf}" style="left:38px;top:1px"></div>`,
    `<div class="${styles.p} ${styles.b} ${styles.pf}" style="left:38px;bottom:1px"></div>`,
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

  // world-fixed effects layer (paw prints etc. stay where they happened
  // while the cat walks on); sits just under the cat's z-index
  const fx = document.createElement('div');
  fx.className = styles.fx;
  fx.setAttribute('aria-hidden', 'true');
  document.body.appendChild(fx);

  const spawnFx = (cls: string, px: number, py: number, rot: number, inner?: string) => {
    if (fx.childElementCount >= MAX_FX && fx.firstChild) fx.removeChild(fx.firstChild);
    const d = document.createElement('div');
    d.className = cls;
    d.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg)`;
    if (inner) d.innerHTML = inner;
    // animationend bubbles up from inner nodes too, so one listener covers both shapes
    d.addEventListener(
      'animationend',
      () => {
        if (d.parentNode) d.parentNode.removeChild(d);
      },
      { once: true }
    );
    fx.appendChild(d);
  };

  // keep the silhouette in sync with the theme (--ink flips black<->cream);
  // the theme class 'jt-dark' lives on <html> (documentElement)
  const syncInk = () => {
    const ink = window.getComputedStyle(document.documentElement).getPropertyValue('--ink');
    if (ink) {
      el.style.setProperty('--ink', ink.trim());
      fx.style.setProperty('--ink', ink.trim());
    }
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
  let travel = 0; // distance since the last paw print
  let pawSide = 1; // gait alternates prints left/right of the path
  let wasCaught = false; // edge-detects "just reached the cursor"
  let heartOkAt = 0;
  let nextDust = 0;

  const dropPawPrint = (stepLen: number) => {
    travel += stepLen;
    if (travel < PAW_EVERY_PX) return;
    travel = 0;
    pawSide *= -1;
    const a = (curAngle * Math.PI) / 180;
    const px = x - Math.cos(a) * 8 - Math.sin(a) * 5 * pawSide;
    const py = y - Math.sin(a) * 8 + Math.cos(a) * 5 * pawSide;
    spawnFx(styles.paw, px, py, curAngle + 90);
  };

  const setVis = (s: string) => {
    if (s !== state) {
      state = s;
      el.className = `${styles.jtc} ${styles[s]}`;
    }
  };
  const idleFor = (now: number, act?: [string, number, number]) => {
    mode = 'idle';
    const [name, minMs, maxMs] = act ?? IDLE_ACTS[Math.floor(Math.random() * IDLE_ACTS.length)];
    setVis(name);
    stateUntil = now + minMs + Math.random() * (maxMs - minMs);
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

  idleFor(performance.now(), ['sit', 900, 1500]);

  let lastT = performance.now();
  const loop = () => {
    const now = performance.now();
    // 60fps-normalized time step, clamped so a backgrounded tab can't teleport the cat
    const dt = Math.min(3, (now - lastT) / 16.667);
    lastT = now;

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
        let stepX = dcx * f * CHASE_EASE * dt;
        let stepY = dcy * f * CHASE_EASE * dt;
        const step = Math.hypot(stepX, stepY);
        const maxStep = CHASE_MAX * dt;
        if (step > maxStep) {
          stepX *= maxStep / step;
          stepY *= maxStep / step;
        }
        x += stepX;
        y += stepY;
        aimAngle = (Math.atan2(dcy, dcx) * 180) / Math.PI;
        setVis('follow');
        dropPawPrint(Math.hypot(stepX, stepY));
        wasCaught = false;
      } else {
        setVis('sit'); // caught up to the cursor — sit and stare
        if (!wasCaught) {
          wasCaught = true;
          if (now > heartOkAt) {
            heartOkAt = now + HEART_COOLDOWN_MS;
            spawnFx(styles.heart, x, y - 16, 0, '<i>♥</i>');
          }
        }
      }
    } else if (mode === 'chase') {
      idleFor(now, ['sit', 600, 1300]); // just lost interest — brief settle
    } else if (mode === 'idle') {
      if (now > stateUntil) {
        if (Math.random() < 0.3) idleFor(now);
        else pickWander();
      }
    } else {
      // wander toward a random spot, slowly
      const dtx = tgx - x;
      const dty = tgy - y;
      const d = Math.hypot(dtx, dty);
      if (d < 8) {
        idleFor(now);
      } else {
        let stepX = dtx * WANDER_EASE * dt;
        let stepY = dty * WANDER_EASE * dt;
        const step = Math.hypot(stepX, stepY);
        const maxStep = WANDER_MAX * dt;
        if (step > maxStep) {
          stepX *= maxStep / step;
          stepY *= maxStep / step;
        }
        x += stepX;
        y += stepY;
        aimAngle = (Math.atan2(dty, dtx) * 180) / Math.PI;
        setVis('follow');
        dropPawPrint(Math.hypot(stepX, stepY));
        wasCaught = false;
      }
    }

    // scratching kicks little flecks back from the front paws
    if (state === 'scratch' && now > nextDust) {
      nextDust = now + 260 + Math.random() * 160;
      const a = (curAngle * Math.PI) / 180;
      const side = Math.random() > 0.5 ? 1 : -1;
      const ox = x + Math.cos(a) * 14 - Math.sin(a) * 6 * side;
      const oy = y + Math.sin(a) * 14 + Math.cos(a) * 6 * side;
      spawnFx(styles.dust, ox, oy, curAngle + 180 + (Math.random() * 50 - 25), '<i></i>');
    }

    // rotate smoothly toward heading (shortest path)
    const da = ((aimAngle - curAngle + 540) % 360) - 180;
    curAngle += da * Math.min(1, 0.16 * dt);
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
    if (fx.parentNode) fx.parentNode.removeChild(fx);
  };
};
