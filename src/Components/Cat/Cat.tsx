import { useCallback, useEffect, useState } from 'react';
import useClassNames from 'Hooks/useClassNames';
import styles from './Cat.module.scss';

export const Cat = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const eyeBall = useCallback((event) => {
    const posX = (event.clientX * 100) / window.innerWidth;
    const posY = (event.clientY * 100) / window.innerHeight;

    setX(posX);
    setY(posY);
  }, []);

  useEffect(() => {
    let isActive = true;

    if (isActive) {
      window.addEventListener('mousemove', eyeBall);
    }

    return () => {
      isActive = false;
      window.removeEventListener('mousemove', eyeBall);
    };
  }, [eyeBall]);

  return (
    <div className={styles.cat}>
      <div className={useClassNames(styles.ear, styles.ear_left)} />
      <div className={useClassNames(styles.ear, styles.ear_right)} />
      <div className={styles.face}>
        <div className={useClassNames(styles.eye, styles.eye_left)}>
          <div className={styles.pupil_container}>
            <div
              className={styles.eye_pupil}
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: `translate(${-x}%, ${-y}%)`
              }}
            />
          </div>
        </div>
        <div className={useClassNames(styles.eye, styles.eye_right)}>
          <div className={styles.pupil_container}>
            <div
              className={styles.eye_pupil}
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: `translate(${-x}%, ${-y}%)`
              }}
            />
          </div>
        </div>
        <div className={styles.muzzle} />
      </div>
    </div>
  );
};
