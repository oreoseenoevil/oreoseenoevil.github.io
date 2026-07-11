import { FC } from 'react';
import { SectionHeader } from 'Components/SectionHeader';
import styles from './Principles.module.scss';

interface Principle {
  num: string;
  title: string;
  body: string;
  delay?: string;
}

const principles: Principle[] = [
  {
    num: '01',
    title: 'Build for clarity, not complexity',
    body: 'The best systems explain themselves. I optimize for the next person reading the code, not for looking clever.'
  },
  {
    num: '02',
    title: 'Design systems that can grow',
    body: 'Schemas, boundaries, and APIs that hold up at 10× — so the product scales without a rewrite.',
    delay: '90'
  },
  {
    num: '03',
    title: 'Own the product, not just the ticket',
    body: 'I care where a feature lands with users — not only that it merged and the tests went green.'
  },
  {
    num: '04',
    title: 'Make technical decisions understandable',
    body: 'Trade-offs written in plain language, so the whole team — not just engineers — can weigh in.',
    delay: '90'
  }
];

export const Principles: FC = () => {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <SectionHeader num="05" name="principles" comment="// how I approach the work" />
        <div className="phil-grid">
          {principles.map((principle) => (
            <div key={principle.num} className={styles.card} data-reveal data-reveal-delay={principle.delay}>
              <div className={styles.card_head}>
                <span className={styles.card_num}>{principle.num}</span>
                <span className={styles.card_rule} aria-hidden="true" />
              </div>
              <h3 className={styles.card_title}>{principle.title}</h3>
              <p className={styles.card_body}>{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
