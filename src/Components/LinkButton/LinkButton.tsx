import useClassNames from 'Hooks/useClassNames';
import { FC } from 'react';

import styles from './LinkButton.module.scss';

interface LinkButtonProps {
  link: string;
  className?: string;
  children?: React.ReactNode;
}

export const LinkButton: FC<LinkButtonProps> = ({ children, link, className }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={useClassNames(styles.button, styles.slide, className)}
    >
      {children}
    </a>
  );
};
