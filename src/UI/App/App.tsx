import { useEffect } from 'react';
import { Navbar } from 'Components/Navbar';
import { Projects } from 'Pages/Projects';
import { AboutMe } from 'Pages/AboutMe';
import { Intro } from 'Pages/Intro';
// import { ParticlesBG } from 'Components/ParticlesBG';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useMode } from 'Hooks/useMode';
import useClassNames from 'Hooks/useClassNames';
import { Footer } from 'Components/Footer';
import styles from './App.module.scss';

export const App = () => {
  const { darkModeClass, darkMode } = useMode();

  useEffect(() => {
    let active = true;
    if (active) {
      AOS.init();
    }

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={useClassNames(styles.App, darkModeClass, darkMode ? styles.dark_mode : styles.light_mode)}>
      <Navbar />
      <div className={styles.App_container}>
        <Intro />
        <AboutMe />
        <Projects />
      </div>
      <Footer />
      {/* <ParticlesBG /> */}
    </div>
  );
};
