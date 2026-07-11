import { FC, ReactNode } from 'react';
import styles from './WindowChrome.module.scss';

export interface WindowChromeProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  topSlot?: ReactNode;
}

export const WindowChrome: FC<WindowChromeProps> = ({ title, children, className, bodyClassName, topSlot }) => {
  const outerClass = className ? `${styles.window} ${className}` : styles.window;
  const bodyClass = bodyClassName ? `${styles.window_body} ${bodyClassName}` : styles.window_body;

  return (
    <div className={outerClass}>
      {topSlot}
      <div className={styles.window_bar}>
        <span className={`${styles.window_dot} ${styles.window_dot_red}`} aria-hidden="true" />
        <span className={`${styles.window_dot} ${styles.window_dot_amber}`} aria-hidden="true" />
        <span className={`${styles.window_dot} ${styles.window_dot_green}`} aria-hidden="true" />
        <span className={styles.window_title}>{title}</span>
      </div>
      <div className={bodyClass}>{children}</div>
    </div>
  );
};
