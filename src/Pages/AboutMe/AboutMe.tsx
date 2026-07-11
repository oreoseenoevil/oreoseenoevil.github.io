import { FC } from 'react';
import { SectionHeader } from 'Components/SectionHeader';
import { WindowChrome } from 'Components/WindowChrome';
import jessie from 'assets/jt/jessie.jpg';

import styles from './AboutMe.module.scss';

const facts = [
  { label: 'EXPERIENCE', value: '6+ yrs in production' },
  { label: 'OWNERSHIP', value: 'full-stack, end to end' },
  { label: 'CORE', value: 'React · Next.js · TS · Node' },
  { label: 'DOMAINS', value: 'SaaS · internal · fintech · multi-tenant' },
  { label: 'INFRA', value: 'cloud deploys · DevOps · CI/CD' },
  { label: 'BASED', value: 'Philippines → working globally' }
];

export const AboutMe: FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="wrap">
        <SectionHeader num="01" name="about" comment="// who’s behind the commits" />
        <div className="two-col">
          <div data-reveal>
            <h2 className={styles.about_heading}>I turn complicated workflows into products that feel simple.</h2>
            <p className={styles.about_paragraph}>
              I’m a full-stack software engineer with <b className={styles.about_strong}>6+ years</b> building
              production applications. I enjoy turning complicated workflows into products that feel simple, reliable,
              and pleasant to use.
            </p>
            <p className={`${styles.about_paragraph} ${styles.about_paragraph_end}`}>
              I work across the entire product lifecycle — from understanding the problem and designing the system to
              building the interface, APIs, infrastructure, and deployment pipelines.
            </p>
            <div className={styles.about_callout}>
              <span className={styles.about_callout_mark} aria-hidden="true">
                &#47;&#47;
              </span>
              <span className={styles.about_callout_text}>
                My favorite feature is the one users never need explained.
              </span>
            </div>
          </div>
          <div data-reveal data-reveal-delay="120">
            <WindowChrome title="jessie.jpg — preview" className={styles.photo_card}>
              <img src={jessie} alt="Jessie Tarrosa" className={styles.photo} />
            </WindowChrome>
            <div className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label} className={styles.facts_row}>
                  <span className={styles.facts_label}>{fact.label}</span>
                  <span className={styles.facts_value}>{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
