import { FC, FormEvent, useState } from 'react';
import { SectionHeader } from 'Components/SectionHeader';
import { WindowChrome } from 'Components/WindowChrome';
import resume from 'assets/file/resume.pdf';
import styles from './Contact.module.scss';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const Contact: FC = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (key: string) => String(data.get(key) ?? '').trim();
    const name = field('name');
    const email = field('email');
    const details = field('details');

    if (!name || !email || !details) {
      setErr('Add your name, email, and a line about the project.');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setErr('That email looks off — mind checking it?');
      return;
    }

    const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErr('Form backend not configured — email app.creator@jessiet.dev instead.');
      return;
    }

    setErr('');
    setSending(true);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New message from jessiet.dev — ${name}`,
          from_name: 'jessiet.dev contact form',
          name,
          email,
          company: field('company'),
          details,
          type: field('type'),
          botcheck: Boolean(data.get('botcheck'))
        })
      });
      const body = await res.json();
      if (res.ok && body.success) {
        setSent(true);
      } else {
        setErr('Signal lost — try again, or email me directly.');
      }
    } catch {
      setErr('Signal lost — try again, or email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="wrap">
        <SectionHeader num="07" name="contact" comment="$ ./say-hello.sh" />
        <div className="contact-grid">
          <div data-reveal>
            <h2 className={styles.heading}>
              Have a complicated product idea? <span className={styles.heading_accent}>Good.</span> Those are usually
              the interesting ones.
            </h2>
            <p className={styles.lede}>
              Tell me what you&rsquo;re building. I read every message and reply within a day or two.
            </p>
            <div className={styles.links}>
              <a href="mailto:app.creator@jessiet.dev" className={styles.links_row}>
                <span>
                  <span className={styles.links_label}>email&nbsp;&nbsp;&nbsp;</span>app.creator@jessiet.dev
                </span>
                <span className={styles.links_arrow} aria-hidden="true">
                  &rarr;
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/jessiedev/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.links_row}
              >
                <span>
                  <span className={styles.links_label}>linkedin</span>&nbsp;/in/jessiedev
                </span>
                <span className={styles.links_arrow} aria-hidden="true">
                  &#8599;
                </span>
              </a>
              <a
                href="https://github.com/oreoseenoevil/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.links_row}
              >
                <span>
                  <span className={styles.links_label}>github&nbsp;&nbsp;</span>oreoseenoevil
                </span>
                <span className={styles.links_arrow} aria-hidden="true">
                  &#8599;
                </span>
              </a>
              <a href="https://jessiet.dev/" target="_blank" rel="noopener noreferrer" className={styles.links_row}>
                <span>
                  <span className={styles.links_label}>web&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>jessiet.dev
                </span>
                <span className={styles.links_arrow} aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </div>
            <a href={resume} download className={styles.resume}>
              Download R&eacute;sum&eacute;{' '}
              <span className={styles.resume_arrow} aria-hidden="true">
                &darr;
              </span>
            </a>
          </div>

          <div data-reveal data-reveal-delay="120">
            <WindowChrome title="new-message.tsx" className={styles.window}>
              {sent ? (
                <div className={styles.success}>
                  <div className={styles.success_check} aria-hidden="true">
                    &#10003;
                  </div>
                  <h3 className={styles.success_title}>Signal received.</h3>
                  <p className={styles.success_note}>
                    Thanks &mdash; I&rsquo;ll reply within a day or two, usually sooner if it&rsquo;s genuinely
                    complicated.
                  </p>
                  <div className={styles.success_exit}>
                    $ exit 0 <span className={styles.success_exit_ok}># the cat approves</span>
                  </div>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submitForm}>
                  <input
                    type="checkbox"
                    name="botcheck"
                    className={styles.form_botcheck}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <div className={`form-2 ${styles.form_row}`}>
                    <label className={styles.form_field} htmlFor="contact-name">
                      <span className={styles.form_label}>NAME *</span>
                      <input className={styles.form_input} id="contact-name" name="name" placeholder="Jane Doe" />
                    </label>
                    <label className={styles.form_field} htmlFor="contact-email">
                      <span className={styles.form_label}>EMAIL *</span>
                      <input
                        className={styles.form_input}
                        id="contact-email"
                        name="email"
                        placeholder="jane@company.com"
                      />
                    </label>
                  </div>
                  <div className={styles.form_row}>
                    <label className={styles.form_field} htmlFor="contact-company">
                      <span className={styles.form_label}>COMPANY</span>
                      <input
                        className={styles.form_input}
                        id="contact-company"
                        name="company"
                        placeholder="Acme Estates Inc."
                      />
                    </label>
                  </div>
                  <div className={styles.form_row}>
                    <label className={styles.form_field} htmlFor="contact-details">
                      <span className={styles.form_label}>PROJECT DETAILS *</span>
                      <textarea
                        className={`${styles.form_input} ${styles.form_textarea}`}
                        id="contact-details"
                        name="details"
                        rows={4}
                        placeholder="What are we building, and what makes it complicated?"
                      />
                    </label>
                  </div>
                  <div className={styles.form_row_select}>
                    <label className={styles.form_field} htmlFor="contact-type">
                      <span className={styles.form_label}>TYPE / BUDGET</span>
                      <select className={styles.form_input} id="contact-type" name="type">
                        <option>SaaS product</option>
                        <option>Internal tool / platform</option>
                        <option>Financial / billing system</option>
                        <option>Something genuinely complicated</option>
                        <option>Not sure yet &mdash; let&rsquo;s talk</option>
                      </select>
                    </label>
                  </div>
                  {err && (
                    <div className={styles.form_error} role="alert">
                      <span aria-hidden="true">!</span>
                      {err}
                    </div>
                  )}
                  <button type="submit" className={styles.form_submit} disabled={sending}>
                    {sending ? <>Sending&hellip;</> : <>Send the signal &rarr;</>}
                  </button>
                </form>
              )}
            </WindowChrome>
          </div>
        </div>
      </div>
    </section>
  );
};
