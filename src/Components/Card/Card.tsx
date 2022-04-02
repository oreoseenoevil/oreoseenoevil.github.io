import { FC, useState } from 'react';
import { SkeletonLoader } from 'Components/SkeletonLoader';
import styles from './Card.module.scss';

interface CardProps {
  name: string;
  src?: string;
}

export const Card: FC<CardProps> = ({ name, src }) => {
  const [onLoad, setOnLoad] = useState(true);

  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        {onLoad && (
          <SkeletonLoader>
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
          </SkeletonLoader>
        )}
        <img src={src} alt={name} style={onLoad ? { display: 'none' } : {}} onLoad={() => setOnLoad(false)} />
      </div>
      <h1 className={styles.card_name}>{name}</h1>
    </div>
  );
};
