import styles from './Footer.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footer_container}>
        <span className={styles.footer_span}>Designed and Developed by Jessie Tarrosa</span>
        <span className={styles.footer_span}>@{year} JessieT Dev</span>
      </div>
    </footer>
  );
};
