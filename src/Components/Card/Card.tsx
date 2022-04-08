import { FC, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
        <LazyLoadImage src={src} alt={name} afterLoad={() => setOnLoad(false)} />
      </div>
      <h1 className={styles.card_name}>{name}</h1>
    </div>
  );
};
