import { FC } from 'react';
import { SectionHeader } from 'Components/SectionHeader';
import awsIcon from 'assets/jt/icons/aws.svg';
import dockerIcon from 'assets/jt/icons/docker.svg';
import gitIcon from 'assets/jt/icons/git.svg';
import mongodbIcon from 'assets/jt/icons/mongodb.svg';
import nextjsIcon from 'assets/jt/icons/nextjs.svg';
import nodejsIcon from 'assets/jt/icons/nodejs.svg';
import postgresqlIcon from 'assets/jt/icons/postgresql.svg';
import prismaIcon from 'assets/jt/icons/prisma.svg';
import reactIcon from 'assets/jt/icons/react.svg';
import reduxIcon from 'assets/jt/icons/redux.svg';
import typescriptIcon from 'assets/jt/icons/typescript.svg';
import vercelIcon from 'assets/jt/icons/vercel.svg';
import styles from './Skills.module.scss';

interface ToolIcon {
  title: string;
  src: string;
  size: number;
}

interface SkillCard {
  heading: string;
  chips: string[];
  delay?: string;
  wide?: boolean;
}

const toolIcons: ToolIcon[] = [
  { title: 'React', src: reactIcon, size: 24 },
  { title: 'Next.js', src: nextjsIcon, size: 23 },
  { title: 'TypeScript', src: typescriptIcon, size: 23 },
  { title: 'Node.js', src: nodejsIcon, size: 24 },
  { title: 'PostgreSQL', src: postgresqlIcon, size: 23 },
  { title: 'MongoDB', src: mongodbIcon, size: 23 },
  { title: 'Redux', src: reduxIcon, size: 23 },
  { title: 'Prisma', src: prismaIcon, size: 22 },
  { title: 'Docker', src: dockerIcon, size: 24 },
  { title: 'AWS', src: awsIcon, size: 24 },
  { title: 'Vercel', src: vercelIcon, size: 20 },
  { title: 'Git', src: gitIcon, size: 23 }
];

const skillCards: SkillCard[] = [
  {
    heading: '01 · PRODUCT ENGINEERING',
    chips: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'tRPC']
  },
  {
    heading: '02 · FRONTEND SYSTEMS',
    chips: ['Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Material UI', 'Ant Design', 'React Query', 'Zustand'],
    delay: '80'
  },
  {
    heading: '03 · BACKEND & DATA',
    chips: ['MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch', 'BullMQ'],
    delay: '160'
  },
  {
    heading: '04 · CLOUD & DEVOPS',
    chips: ['AWS', 'Docker', 'CI/CD', 'DigitalOcean', 'Vercel', 'Serverless']
  },
  {
    heading: '05 · PRODUCT CAPABILITIES',
    chips: [
      'SaaS architecture',
      'Multi-tenancy',
      'Financial workflows',
      'Internal tools',
      'Design systems',
      'Performance optimization'
    ],
    delay: '80',
    wide: true
  }
];

export const Skills: FC = () => {
  return (
    <section id="skills" className={styles.section}>
      <div className="wrap">
        <SectionHeader num="04" name="toolbox" comment="$ ls ~/toolbox" />
        <div className={styles.rail} data-reveal>
          {toolIcons.map((icon) => (
            <span key={icon.title} title={icon.title} className={styles.rail_tile}>
              <img src={icon.src} alt={icon.title} width={icon.size} height={icon.size} />
            </span>
          ))}
        </div>
        <div className="skill-grid">
          {skillCards.map((card) => (
            <div
              key={card.heading}
              className={card.wide ? `${styles.card} ${styles.card_wide}` : styles.card}
              data-reveal
              data-reveal-delay={card.delay}
            >
              <div className={styles.card_heading}>{card.heading}</div>
              <div className={styles.card_chips}>
                {card.chips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
