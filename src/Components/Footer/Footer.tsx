import { FC, MouseEvent } from 'react';
import styles from './Footer.module.scss';

export interface FooterProps {
  onOpen404: () => void;
}

export const Footer: FC<FooterProps> = ({ onOpen404 }) => {
  const handleLostClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onOpen404();
  };

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.footer_inner}`}>
        <div className="foot-grid">
          <div>
            <a href="#top" className={styles.footer_logo}>
              <span className={styles.footer_logo_square} aria-hidden="true" />
              jessiet<span className={styles.footer_logo_dev}>.dev</span>
            </a>
            <p className={styles.footer_blurb}>
              Serious software, minus the boring parts. Building Atrium OS and open to ambitious products.
            </p>
            <div className={styles.footer_quip}>&#47;&#47; built at 2am, refactored at noon</div>
          </div>
          <div>
            <div className={styles.footer_heading}>Sitemap</div>
            <div className={styles.footer_links}>
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div>
            <div className={styles.footer_heading}>Elsewhere</div>
            <div className={`${styles.footer_links} ${styles.footer_links_mono}`}>
              <a href="https://github.com/oreoseenoevil/" target="_blank" rel="noopener noreferrer">
                GitHub &#8599;
              </a>
              <a href="https://www.linkedin.com/in/jessiedev/" target="_blank" rel="noopener noreferrer">
                LinkedIn &#8599;
              </a>
              <a href="https://www.codewars.com/users/oreoseenoevil" target="_blank" rel="noopener noreferrer">
                Codewars &#8599;
              </a>
              <a href="mailto:app.creator@jessiet.dev">app.creator@jessiet.dev</a>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <span>&copy; 2026 Jessie Tarrosa &middot; made in the Philippines, deployed worldwide</span>
          <span className={styles.footer_bottom_links}>
            <a href="#lost" onClick={handleLostClick}>
              lost? there&rsquo;s a 404 for that
            </a>
            <a href="#top">back to top &uarr;</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
