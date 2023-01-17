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
          Jessie Tarrosa is a highly experienced Software Developer with over 4 years of experience in developing
          software and tools to help businesses grow. He is currently working at CoDev, and has previously held a role
          as an advanced app engineering analyst and full-stack developer. In his free time, he stays current on the
          latest technologies by reading documentation and staying active.
        </h3>
        <h3>
          Jessie has a strong background in core programming languages, frameworks, and databases, as well as additional
          skills in serverless development, DevOps, AWS, SaaS, front-end technologies, and API integration. He also has
          experience with various version control systems, project management tools and API testing tools.
        </h3>
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
