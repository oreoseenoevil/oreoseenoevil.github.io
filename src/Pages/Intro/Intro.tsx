import { FC } from 'react';
import { Section } from 'Components/Section';
import Typewriter from 'typewriter-effect';
import { roles } from 'Constants';
import { IconType } from 'react-icons';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import man from 'assets/icons/man.svg';

import { LinkButton } from 'Components/LinkButton';
import { useMode } from 'Hooks/useMode';
import { Cat } from 'Components/Cat';
import styles from './Intro.module.scss';

interface Socials {
  icon: IconType;
  link: string;
  name: string;
}

const socials: Socials[] = [
  {
    icon: FaGithub,
    link: 'https://github.com/oreoseenoevil/',
    name: 'github'
  },
  {
    icon: FaLinkedin,
    link: 'https://www.linkedin.com/in/jessiedev/',
    name: 'linkedin'
  },
  {
    icon: FaTwitter,
    link: '#',
    name: 'twitter'
  },
  {
    icon: FaInstagram,
    link: '#',
    name: 'instagram'
  }
];

export const Intro: FC = () => {
  const { darkMode } = useMode();

  return (
    <Section id="intro" className={styles.intro}>
      <div className={styles.intro_container}>
        <h1>Hello I&apos;m Jessie Tarrosa</h1>
        <h3>
          <Typewriter
            options={{
              strings: roles,
              autoStart: true,
              loop: true
            }}
          />
        </h3>
        <div className={styles.socials}>
          {socials.map((item: Socials, i) => (
            <a href={item.link} key={i} className={styles.socials_icon} target="_blank" rel="noopener noreferrer">
              <item.icon size="5rem" className={styles[item.name]} />
            </a>
          ))}
        </div>
        <div className={styles.button_group}>
          <LinkButton link="mailto:creators.nuke@gmail.com">Get in touch</LinkButton>
        </div>
      </div>
      <div className={styles.img_container}>
        {darkMode ? (
          <Cat />
        ) : (
          <div className={styles.image_circle}>
            <img src={man} alt="Jessie Tarrosa" />
          </div>
        )}
      </div>
    </Section>
  );
};
