import { FC } from 'react';
import useClassNames from 'Hooks/useClassNames';

import styles from './Section.module.scss';

interface SectionProps {
  id?: string;
  className?: string;
  animation?: string;
}

export const Section: FC<SectionProps> = ({ children, id, className, animation = 'zoom-in' }) => {
  return (
    <div
      id={id}
      className={useClassNames(styles.section, className)}
      data-aos={animation}
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      {children}
    </div>
  );
};
