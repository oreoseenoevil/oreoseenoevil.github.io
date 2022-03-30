import { FC } from 'react';
import { Section } from 'Components/Section';

import { Card } from 'Components/Card';
import { LinkButton } from 'Components/LinkButton';
import styles from './Projects.module.scss';
import { data } from './data';

export const Projects: FC = () => {
  return (
    <Section id="projects" className={styles.projects}>
      <h1 className={styles.title}>Projects</h1>
      <div className={styles.project_container}>
        {data.map((item, i) => (
          <div className={styles.project} key={i}>
            <div className={styles.row_group}>
              <div className={styles.items}>
                <span className={styles.project_name}>{item.name}</span>
                <div className={styles.project_role}>
                  <span className={styles.role_key}>Role:</span>
                  <h3 className={styles.role_value}>{item.role}</h3>
                </div>
              </div>
              {item?.link && (
                <div className={styles.button_group}>
                  <LinkButton link={item.link}>View Details</LinkButton>
                </div>
              )}
            </div>
            <div className={styles.cards}>
              {item.projects.map((project, i) => (
                <Card src={project.src} name={project.name} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
