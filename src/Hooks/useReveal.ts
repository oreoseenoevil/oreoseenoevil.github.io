import { useEffect } from 'react';

type RevealElement = HTMLElement & { jtRevealed?: boolean };

/**
 * Global scroll-reveal effect — call ONCE from App.
 * Animates every element carrying a `data-reveal` attribute (optionally
 * `data-reveal-delay="<ms>"`) with the `jtreveal` keyframe. Ported from the
 * prototype behavior script: IntersectionObserver + a manual in-view scan
 * fallback, `beforeprint` force-reveal, and `prefers-reduced-motion` support.
 */
export const useReveal = () => {
  useEffect(() => {
    const reveal = (el: RevealElement) => {
      if (el.jtRevealed) return;
      el.jtRevealed = true;
      const delay = el.getAttribute('data-reveal-delay') || '0';
      el.style.animation = `jtreveal .7s cubic-bezier(.4,.01,.165,.99) ${delay}ms both`;
    };

    const revealAll = () => {
      document.querySelectorAll<RevealElement>('[data-reveal]').forEach((el) => {
        el.jtRevealed = true;
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.animation = 'none';
      });
    };

    const reduce =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      revealAll();
      return undefined;
    }

    // manual in-view scan — reliable fallback; reveals as sections enter the viewport
    const scan = () => {
      const h = window.innerHeight || document.documentElement.clientHeight || 800;
      document.querySelectorAll<RevealElement>('[data-reveal]').forEach((el) => {
        if (el.jtRevealed) return;
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > -40) reveal(el);
      });
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      try {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                reveal(entry.target as RevealElement);
                io?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
        );
      } catch (e) {
        io = null;
      }
    }

    const bind = () => {
      if (io) {
        document.querySelectorAll<RevealElement>('[data-reveal]').forEach((el) => {
          io?.observe(el);
        });
      }
      scan();
    };

    const t1 = window.setTimeout(bind, 60);
    const t2 = window.setTimeout(bind, 700);
    window.addEventListener('scroll', scan, { passive: true });
    window.addEventListener('resize', scan, { passive: true });
    window.addEventListener('beforeprint', revealAll);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('scroll', scan);
      window.removeEventListener('resize', scan);
      window.removeEventListener('beforeprint', revealAll);
      if (io) io.disconnect();
    };
  }, []);
};
