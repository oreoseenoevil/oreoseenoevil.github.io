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
          As an experienced full-stack developer with five years of hands-on experience, I bring a versatile skill set
          to the table. My expertise spans both front-end and back-end technologies, making me a valuable asset to any
          development team. On the front-end, I have a strong command of JavaScript, React, and Redux, enabling me to
          design and implement dynamic and responsive user interfaces. Proficiency in front-end technologies such as CSS
          and HTML ensures that I can create visually appealing and user-friendly web applications.
        </h3>
        <h3>
          On the back-end, I excel in building scalable and cost-effective systems, with a deep understanding of
          databases and effective data integration. I am also well-versed in cloud hosting and deployment strategies,
          ensuring that applications I work on are not only functional but also performant and easily scalable.
          Additionally, I am skilled in project management, utilizing collaboration tools like Git, GitHub, and JIRA.
        </h3>
        <h3>
          My commitment to delivering high-quality, efficient, and maintainable code is unwavering. I thrive on
          problem-solving and collaboration, always eager to embrace emerging technologies to enhance the quality of my
          work. With a proven track record of success, I am dedicated to continuous growth and development, constantly
          seeking opportunities to expand my skills and contribute to innovative full-stack projects.
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
