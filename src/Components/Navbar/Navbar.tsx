import { FC, useEffect, useState } from 'react';
import { useMode } from 'Hooks/useMode';
import styles from './Navbar.module.scss';

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];

export const Navbar: FC = () => {
  const { darkMode, setDarkMode } = useMode();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={scrolled ? `${styles.nav} ${styles.nav_scrolled}` : styles.nav}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.logo}>
          <span className={styles.logo_mark} aria-hidden="true" />
          jessiet<span className={styles.logo_dev}>.dev</span>
        </a>
        <div className={`nav-links ${styles.links}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>
        <div className={styles.right}>
          <span className={`nav-status ${styles.status}`}>
            <span className={`${styles.status_dot} jt-nav-pulse`} aria-hidden="true" />
            currently building Atrium OS
          </span>
          <button
            type="button"
            aria-label="Toggle dark mode"
            className={styles.mode_btn}
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? '☀' : '☾'}
          </button>
          <a className={`nav-cta ${styles.cta}`} href="#contact">
            Let&rsquo;s talk
          </a>
          <button
            type="button"
            aria-label="Menu"
            className={`m-menu-btn ${styles.menu_btn}`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className={`wrap ${styles.menu_wrap}`}>
          <div className={styles.menu_panel}>
            {NAV_LINKS.map((link) =>
              link.href === '#contact' ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${styles.menu_link} ${styles.menu_link_accent}`}
                  onClick={closeMenu}
                >
                  Contact &rarr;
                </a>
              ) : (
                <a key={link.href} href={link.href} className={styles.menu_link} onClick={closeMenu}>
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
