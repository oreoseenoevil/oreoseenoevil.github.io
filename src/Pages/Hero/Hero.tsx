import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { WindowChrome } from 'Components/WindowChrome';
import styles from './Hero.module.scss';

const STATUSES = [
  'deploying atrium-os',
  'reviewing a pull request',
  'naming a new service',
  'refactoring a workflow',
  'debugging (allegedly)',
  'pushing to main (bravely)',
  'available for work'
];

const MARQUEE_ITEMS = [
  'TRUSTED WITH PRODUCTION',
  'Permission.io',
  'Accenture · Solution.AI',
  'S2Data',
  'Landasia',
  'Pure Desire'
];

const STATUS_INTERVAL_MS = 2600;
const CAT_WAKE_DISTANCE_PX = 155;

const renderMarqueeRow = (hidden: boolean) => (
  <div className={styles.marquee_row} aria-hidden={hidden || undefined}>
    {MARQUEE_ITEMS.map((item) => (
      <Fragment key={item}>
        <span className={styles.marquee_item}>{item}</span>
        <span className={styles.marquee_gem}>◆</span>
      </Fragment>
    ))}
  </div>
);

export const Hero: FC = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [catAwake, setCatAwake] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex((index) => (index + 1) % STATUSES.length);
    }, STATUS_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const cat = catRef.current;
      if (!cat) return;

      const rect = cat.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2)
      );
      setCatAwake(distance < CAT_WAKE_DISTANCE_PX);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroCat = (
    <div ref={catRef} data-testid="hero-cat" className={`hero-cat${catAwake ? ' awake' : ''} ${styles.cat}`}>
      <div className={`hc-tail ${styles.cat_tail}`}>
        <svg
          className={`hc-tailwave ${styles.cat_tailwave}`}
          viewBox="0 0 34 46"
          width="34"
          height="46"
          aria-hidden="true"
        >
          <path
            d="M18,46 C 17,34 18,20 24,13 C 26,10 30,11 28,15 C 27,12 23,13 20,16 C 15,22 13,34 11,46 Z"
            fill="var(--ink)"
          />
        </svg>
      </div>
      <div className={`hc-body ${styles.cat_body}`} />
      <div className={`hc-earL ${styles.cat_ear_left}`} />
      <div className={`hc-earR ${styles.cat_ear_right}`} />
      <div className={`hc-eye ${styles.cat_eye_left}`} />
      <div className={`hc-eye ${styles.cat_eye_right}`} />
      <div className={`hc-eyeo ${styles.cat_eye_open_left}`} />
      <div className={`hc-eyeo ${styles.cat_eye_open_right}`} />
      <div className={styles.cat_nose} />
      <div className={`hc-z ${styles.cat_z}`} aria-hidden="true">
        <span className={styles.cat_z_small}>z</span>
        <span className={styles.cat_z_mid}>z</span>
        <span className={styles.cat_z_large}>z</span>
      </div>
    </div>
  );

  return (
    <header className={styles.hero}>
      <div className={`wrap ${styles.hero_wrap}`}>
        <div className="hero-grid">
          <div>
            <div className={styles.eyebrow}>▸ full-stack engineer &amp; saas builder</div>
            <h1 className={styles.headline}>
              I build <span className={styles.headline_mark}>serious software</span> without making the internet boring.
            </h1>
            <p className={styles.sub}>
              I design and build scalable web applications, internal platforms, and SaaS products with React, Next.js,
              TypeScript, Node.js, and cloud infrastructure.
            </p>
            <div className={styles.actions}>
              <a href="#work" className={styles.btn_primary}>
                View My Work <span className={styles.btn_arrow}>→</span>
              </a>
              <a href="#contact" className={styles.btn_secondary}>
                Let&rsquo;s Talk
              </a>
            </div>
            <div className={styles.note}>
              <span className={styles.note_dot} aria-hidden="true" />
              <span className={styles.note_text}>
                available for ambitious products, complicated systems &amp; good coffee
              </span>
              <span className={styles.note_hi}>yes, hi!</span>
              <svg
                width="46"
                height="30"
                viewBox="0 0 46 30"
                fill="none"
                className={styles.note_arrow}
                aria-hidden="true"
              >
                <path d="M42 4 C 26 2, 9 6, 6 23" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 23 l 10 -3 M6 23 l 1 -10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.stats}>
              <span>
                <b className={styles.stats_value}>6+</b> yrs shipping
              </span>
              <span className={styles.stats_divided}>full-stack ownership</span>
              <span className={styles.stats_divided}>PH → global</span>
            </div>
          </div>

          <div className={styles.hero_right}>
            <WindowChrome
              title="jessie@atrium-os: ~/dev"
              className={styles.terminal}
              bodyClassName={styles.terminal_body}
              topSlot={heroCat}
            >
              <div>
                <span className={styles.terminal_prompt}>›</span> whoami
              </div>
              <div className={styles.terminal_output}>jessie tarrosa — full-stack engineer · founder</div>
              <div className={styles.terminal_command}>
                <span className={styles.terminal_prompt}>›</span> cat stack.txt
              </div>
              <div className={styles.terminal_output}>react · next.js · typescript · node · postgres · aws</div>
              <div className={styles.terminal_command}>
                <span className={styles.terminal_prompt}>›</span> status --now
              </div>
              <div className={styles.terminal_status}>
                ● {STATUSES[statusIndex]}
                <span className={styles.terminal_caret} aria-hidden="true" />
              </div>
            </WindowChrome>
          </div>
        </div>
      </div>

      <div className={styles.marquee}>
        <div className={styles.marquee_track}>
          {renderMarqueeRow(false)}
          {renderMarqueeRow(true)}
        </div>
      </div>
    </header>
  );
};
