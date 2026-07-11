import { FC } from 'react';
import { SectionHeader } from 'Components/SectionHeader';
import { WindowChrome } from 'Components/WindowChrome';
import styles from './OffTheClock.module.scss';

const checkedItems = [
  'Designing a SaaS product',
  'Experimenting with new tools',
  'Improving overly complicated workflows',
  'Gaming'
];

const stillRunning = '// still running…';

export const OffTheClock: FC = () => {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <SectionHeader num="06" name="off the clock" comment="// when I'm not debugging production" />
        <div className="two-col">
          <div data-reveal>
            <WindowChrome
              title="when-not-debugging.md"
              className={styles.checklist_window}
              bodyClassName={styles.checklist_body}
            >
              {checkedItems.map((item) => (
                <div key={item} className={styles.check_row}>
                  <span className={styles.check_box} aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
              <div className={`${styles.check_row} ${styles.check_row_open}`}>
                <span className={styles.check_box_empty} aria-hidden="true" />
                Overthinking product names &amp; domain availability{' '}
                <span className={styles.check_note}>{stillRunning}</span>
              </div>
            </WindowChrome>
          </div>
          <div className={styles.notes} data-reveal data-reveal-delay="120">
            <div className={styles.note}>
              <span className={styles.note_text}>every good product starts as an over-engineered side project.</span>
            </div>
            <div className={`${styles.note} ${styles.note_accent}`}>
              <span className={`${styles.note_text} ${styles.note_text_accent}`}>
                yes, the .com was already taken. it&rsquo;s always taken.
              </span>
            </div>
            <div className={styles.uptime}>
              $ uptime — <span className={styles.uptime_value}>caffeinated, mostly stable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
