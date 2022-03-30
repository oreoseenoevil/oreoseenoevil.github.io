import { FC } from 'react';
import { Section } from 'Components/Section';
import { LinkButton } from 'Components/LinkButton';
import pdf from './file/resume.pdf';

import styles from './AboutMe.module.scss';
import { Tools, tools } from './tools';

export const AboutMe: FC = () => {
  return (
    <Section id="about-me" className={styles.about_me} animation="fade-right">
      <div className={styles.about_container}>
        <h1>About Me</h1>
        <h3>
          Jessie Tarrosa is a React Developer at CoDev. With over 3 years of experience in web development and building
          tools to help business grow. In his previous role, he is an Advanced App Engineering Analyst. He is now
          working at CoDev.
        </h3>
        <h3>He spends his free time reading, watching movies and working out whenever he&apos;s not writing code.</h3>
        <h3>These are the tools that he&apos;s been using over the past few years in web development.</h3>
        <div className={styles.tools}>
          {tools.map((item: Tools, i) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              title={item.title}
              className={styles.tools_logo}
            >
              <img src={item.src} alt={item.alt} />
            </a>
          ))}
        </div>
        <div className={styles.about_button}>
          <LinkButton link={pdf}>View Resume</LinkButton>
        </div>
      </div>
    </Section>
  );
};
