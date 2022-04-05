import { FC, useCallback, useEffect, useState } from 'react';
import { navLinks } from 'Constants';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useMode } from 'Hooks/useMode';
import useClassNames from 'Hooks/useClassNames';
import { useMediaQuery } from 'react-responsive';
import { SlideToggle } from 'Components/SlideToggle';
import { useTitle } from 'react-use';
import styles from './Navbar.module.scss';

export const Navbar: FC = () => {
  const { darkMode, setDarkMode } = useMode();
  const [onScroll, setOnScroll] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [path, setPath] = useState('Portfolio');
  const [color, setColor] = useState(false);
  useTitle(`${path} | Jessie Tarrosa`);

  const burger = useMediaQuery({ query: '(max-width: 800px)' });

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setLastScroll(window.scrollY || document.documentElement.scrollTop);

      if (window.scrollY > lastScroll) {
        if (lastScroll > 80) {
          setColor(true);
        } else {
          setColor(false);
        }
        setOnScroll(false);
      } else {
        setOnScroll(true);
      }
    }
  }, [lastScroll]);

  const handleToggle = (value: boolean) => {
    setDarkMode(value);
    setIsActive(false);
  };

  const handleClick = useCallback((path: string) => {
    let newPath = path;
    if (newPath === '' || newPath === 'Home') {
      newPath = 'Portfolio';
    }

    setPath(newPath);
    setIsActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    let active = true;

    if (!burger) {
      if (active) {
        setIsActive(false);
      }
    }

    return () => {
      active = false;
    };
  }, [burger]);

  return (
    <nav className={useClassNames(styles.navbar, !onScroll && styles.navbar_hidden, color && styles.navbar_color)}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="#intro" className={styles.logo_link} onClick={() => handleClick('Portfolio')}>
            JT.
          </a>
        </div>
        {burger && (
          <button
            className={`${styles.burger} ${isActive && styles.active}`}
            onClick={() => setIsActive(!isActive)}
            type="button"
          >
            <span className={styles.bar1} />
            <span className={styles.bar2} />
          </button>
        )}
        <ul className={useClassNames(styles.menu)} style={{ right: burger && isActive ? 0 : '-100%' }}>
          {navLinks.map((item, i) => (
            <li key={i} className={styles.menu_item}>
              <a href={item.path} className={styles.link} onClick={() => handleClick(item.name)}>
                {item.name}
              </a>
            </li>
          ))}
          <li className={styles.menu_item}>
            <SlideToggle value={darkMode} onChange={handleToggle}>
              {darkMode ? <FaSun className={styles.switch_mode} /> : <FaMoon className={styles.switch_mode} />}
            </SlideToggle>
          </li>
        </ul>
      </header>
    </nav>
  );
};
