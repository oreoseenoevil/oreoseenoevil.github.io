import { FC, ReactNode } from 'react';
import { SectionHeader } from 'Components/SectionHeader';
import styles from './Experience.module.scss';

export interface ExperienceRole {
  period: string;
  company: string;
  meta?: string;
  current?: boolean;
  title: string;
  description: ReactNode;
  bullets: string[];
  tech: string;
}

export const experienceRoles: ExperienceRole[] = [
  {
    period: '2024 — Now',
    company: 'Atrium OS',
    current: true,
    title: 'Founder, Product Designer & Full-Stack Engineer',
    description:
      'Building a multi-tenant estate-management SaaS end to end — product, design, frontend, backend, and infrastructure.',
    bullets: [
      'Designed schema, APIs & UI for dues, billing & accounting',
      'Shipped resident portal + multi-estate administration',
      'Own infra, CI/CD & production deploys'
    ],
    tech: 'Next.js · TypeScript · Node.js · PostgreSQL · Redis · AWS'
  },
  {
    period: '2024 — Now',
    company: 'S2Data',
    current: true,
    title: 'Full-Stack Developer · client engagement',
    description: (
      <>
        Building <b className={styles.row_strong}>Invenire</b>, a records & document application, and{' '}
        <b className={styles.row_strong}>Invenire Review AI</b> — its AI-assisted review layer.
      </>
    ),
    bullets: [
      'Built the Invenire application end to end',
      'Shipped Invenire Review AI for AI-assisted review',
      'Own features front to back, UI to APIs'
    ],
    tech: 'React · Node.js · TypeScript · OpenAI'
  },
  {
    period: '2022 — 2024',
    company: 'Permission.io',
    meta: 'fintech · web3',
    title: 'Full-Stack Developer',
    description: 'Rewards platform connecting brands and consumers through crypto and a permissioned identity layer.',
    bullets: [
      'Shipped wallet & daily-earn flows used across web apps',
      'Built permissioned auth & account experiences',
      'Tuned performance of high-traffic marketing surfaces'
    ],
    tech: 'React · TypeScript · Node.js · Wallets'
  },
  {
    period: '2021 — 2022',
    company: 'Accenture · Solution.AI',
    meta: 'enterprise · AI',
    title: 'Full-Stack Developer',
    description:
      'Talent & skilling suite for a 15k-person organization — workforce analytics, skill graphs, and MLOps tooling.',
    bullets: [
      'Built workforce analytics & skill-graph interfaces',
      'Delivered MLOps & Data2Cloud tooling',
      'Collaborated across distributed, cross-functional teams'
    ],
    tech: 'React · TypeScript · Data viz · MLOps'
  },
  {
    period: '2019 — 2021',
    company: 'Landasia',
    meta: 'web',
    title: 'Web Developer',
    description: 'Real-estate web platform and membership applications.',
    bullets: ['Delivered marketing & membership front-ends', 'Built responsive property-listing experiences'],
    tech: 'React · Node.js'
  }
];

export const Experience: FC = () => {
  return (
    <section id="experience" className={styles.experience}>
      <div className="wrap">
        <SectionHeader num="03" name="experience" comment="// outcomes > responsibilities" />
        {experienceRoles.map((role) => (
          <div key={role.company} data-reveal className={`exp-row ${styles.row}`}>
            <div>
              <div className={styles.row_period}>{role.period}</div>
              <div className={styles.row_company}>{role.company}</div>
              {role.current && (
                <span className={styles.row_current}>
                  <span className={styles.row_current_dot} aria-hidden="true" />
                  current
                </span>
              )}
              {role.meta && <div className={styles.row_meta}>{role.meta}</div>}
            </div>
            <div>
              <div className={styles.row_title}>{role.title}</div>
              <p className={styles.row_desc}>{role.description}</p>
              <div className={styles.row_bullets}>
                {role.bullets.map((bullet) => (
                  <div key={bullet}>
                    <span className={styles.row_bullets_accent}>›</span> {bullet}
                  </div>
                ))}
              </div>
              <div className={styles.row_tech}>{role.tech}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
