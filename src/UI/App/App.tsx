import { useState } from 'react';
import { Navbar } from 'Components/Navbar';
import { Footer } from 'Components/Footer';
import { NotFoundOverlay } from 'Components/NotFoundOverlay';
import { CatCompanion } from 'Components/CatCompanion';
import { Hero } from 'Pages/Hero';
import { AboutMe } from 'Pages/AboutMe';
import { Work } from 'Pages/Work';
import { Experience } from 'Pages/Experience';
import { Skills } from 'Pages/Skills';
import { Principles } from 'Pages/Principles';
import { OffTheClock } from 'Pages/OffTheClock';
import { Contact } from 'Pages/Contact';
import { useReveal } from 'Hooks/useReveal';
import styles from './App.module.scss';

export const App = () => {
  const [show404, setShow404] = useState(false);

  useReveal();

  return (
    <div id="top" className={styles.app}>
      <Navbar />
      <Hero />
      <AboutMe />
      <Work />
      <Experience />
      <Skills />
      <Principles />
      <OffTheClock />
      <Contact />
      <Footer onOpen404={() => setShow404(true)} />
      <NotFoundOverlay open={show404} onClose={() => setShow404(false)} />
      <CatCompanion />
    </div>
  );
};
