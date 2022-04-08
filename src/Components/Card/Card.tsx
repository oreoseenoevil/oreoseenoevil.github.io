import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './Card.module.scss';

interface CardProps {
  name: string;
  src?: string;
}

export const Card: FC<CardProps> = ({ name, src }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <LazyLoadImage src={src} alt={name} />
      </div>
      <h1 className={styles.card_name}>{name}</h1>
    </div>
  );
};
