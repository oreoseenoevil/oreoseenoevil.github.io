import { FC, KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import styles from './NotFoundOverlay.module.scss';

export interface NotFoundOverlayProps {
  open: boolean;
  onClose: () => void;
}

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export const NotFoundOverlay: FC<NotFoundOverlayProps> = ({ open, onClose }) => {
  const [pupil, setPupil] = useState({ mx: 50, my: 40 });

  useEffect(() => {
    if (!open) return undefined;

    const handleMouseMove = (event: MouseEvent) => {
      const mx = clampPercent((event.clientX / window.innerWidth) * 100);
      const my = clampPercent((event.clientY / window.innerHeight) * 100);
      setPupil({ mx, my });
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const pupilStyle = {
    top: `${pupil.my}%`,
    left: `${pupil.mx}%`,
    transform: `translate(${-pupil.mx}%, ${-pupil.my}%)`
  };

  const handleScrimClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleScrimKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onClose();
  };

  return (
    <div className={styles.overlay} role="presentation" onClick={handleScrimClick} onKeyDown={handleScrimKeyDown}>
      <div className={styles.overlay_card} role="dialog" aria-modal="true" aria-labelledby="jt-404-title">
        <div className={styles.overlay_cat} aria-hidden="true">
          <span className={styles.overlay_cat_ear_left} />
          <span className={styles.overlay_cat_ear_right} />
          <span className={styles.overlay_cat_face} />
          <span className={`${styles.overlay_cat_eye} ${styles.overlay_cat_eye_left}`}>
            <span className={styles.overlay_cat_pupil} style={pupilStyle} />
          </span>
          <span className={`${styles.overlay_cat_eye} ${styles.overlay_cat_eye_right}`}>
            <span className={styles.overlay_cat_pupil} style={pupilStyle} />
          </span>
          <span className={styles.overlay_cat_nose} />
        </div>
        <div className={styles.overlay_code}>404</div>
        <h3 className={styles.overlay_title} id="jt-404-title">
          This page wandered off to chase the cat.
        </h3>
        <p className={styles.overlay_text}>It&rsquo;s not you, it&rsquo;s a missing route. The cat regrets nothing.</p>
        <div className={styles.overlay_terminal}>
          $ cd /{' '}
          <span className={styles.overlay_terminal_comment}># go home before it knocks something off the table</span>
        </div>
        <button type="button" className={styles.overlay_button} onClick={onClose}>
          Take me home &rarr;
        </button>
      </div>
    </div>
  );
};
