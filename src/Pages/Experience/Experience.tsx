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
    tech: 'Next.js · TypeScript · tRPC · MongoDB · Tailwind · AWS'
  },
  {
    period: '2022 — Now',
    company: 'CoDev Philippines',
    current: true,
    title: 'Senior Full-Stack Developer · client engagements',
    description: (
      <>
        Remote engineer for overseas clients. Current engagement: a{' '}
        <b className={styles.row_strong}>records & document application</b> and its{' '}
        <b className={styles.row_strong}>AI-assisted review layer</b>.
      </>
    ),
    bullets: [
      'Built the records application end to end',
      'Shipped the AI-assisted review layer',
      'Own features front to back, UI to APIs'
    ],
    tech: 'Next.js · TypeScript · MongoDB · Elasticsearch · BullMQ'
  },
  {
    period: '2022 — 2023',
    company: 'Permission.io',
    meta: 'fintech · web3 · via CoDev',
    title: 'Full-Stack Engineer',
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
    title: 'Advanced Application Engineering Analyst',
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
    period: '2015 — 2016',
    company: 'Land Asia Realty',
    meta: 'web · internship',
    title: 'Web Designer (Internship)',
    description: 'Company web presence and marketing for a real-estate developer.',
    bullets: ['Built the company site, property listings & subdomains', 'Designed print & marketing collateral'],
    tech: 'WordPress · PHP · HTML/CSS · JavaScript'
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
