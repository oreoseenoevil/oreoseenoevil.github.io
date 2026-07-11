import { FC } from 'react';
import styles from './SectionHeader.module.scss';

export interface SectionHeaderProps {
  num: string;
  name: string;
  comment?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ num, name, comment }) => {
  return (
    <div className={styles.header} data-reveal>
      <span className={styles.header_eyebrow}>
        {num} / {name}
      </span>
      <span className={styles.header_rule} aria-hidden="true" />
      {comment && <span className={styles.header_comment}>{comment}</span>}
    </div>
  );
};
