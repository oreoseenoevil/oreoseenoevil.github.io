import { FC } from 'react';
import { SectionHeader } from 'Components/SectionHeader';
import permission from 'assets/jt/work/permission.png';
import skillAi from 'assets/jt/work/skill-ai.png';
import s2data from 'assets/jt/work/s2data.png';
import styles from './Work.module.scss';

const flagshipTech = ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'];
const permissionTech = ['React', 'TypeScript', 'Node.js', 'Wallets'];
const solutionAiTech = ['React', 'TypeScript', 'Data viz', 'MLOps'];
const invenireTech = ['React', 'Node.js', 'OpenAI'];

const alsoShippedLabel = '// also shipped —';

const flagshipFeatures = [
  'Resident portal',
  'Online dues & utility payments',
  'Budgeting & accounting',
  'Procurement & vendors',
  'Water & electricity billing',
  'Announcements & documents',
  'Multi-estate administration'
];

export const Work: FC = () => {
  return (
    <section id="work" className={styles.section}>
      <div className="wrap">
        <SectionHeader num="02" name="selected work" comment="// things that shipped" />

        {/* FLAGSHIP: ATRIUM OS */}
        <div className={styles.flag} data-reveal>
          <div className="proj-flag">
            <div className={styles.flag_copy}>
              <div className={styles.flag_meta}>
                <span className={styles.flag_badge}>01 — FLAGSHIP</span>
                <span className={styles.flag_type}>SaaS · multi-tenant</span>
              </div>
              <h3 className={styles.flag_title}>Atrium OS</h3>
              <p className={styles.flag_desc}>
                A centralized estate-management platform for homeowners’ associations, condominiums, subdivisions, and
                property developers.
              </p>
              <div className={styles.flag_role}>
                <span className={styles.flag_role_label}>{'ROLE  '}</span>
                Founder · Product Design · Full-Stack Engineering
              </div>
              <div className={styles.flag_block}>
                <div className={styles.flag_block_row}>
                  <span className={styles.flag_block_label}>problem</span>
                  <span>Estate ops scattered across spreadsheets, chat threads &amp; manual billing.</span>
                </div>
                <div className={styles.flag_block_row}>
                  <span className={styles.flag_block_label}>solution</span>
                  <span>One platform: portal, payments, budgeting, procurement &amp; utility billing.</span>
                </div>
                <div className={styles.flag_block_row}>
                  <span className={styles.flag_block_label}>built</span>
                  <span>Schema, APIs, UI, infra &amp; deploy pipelines — end to end.</span>
                </div>
                <div className={styles.flag_block_row}>
                  <span className={styles.flag_block_label}>result</span>
                  <span className={styles.flag_block_ok}>
                    Dues, water/electric billing &amp; accounting in one reconciled flow.
                  </span>
                </div>
              </div>
              <div className={`${styles.chips} ${styles.flag_chips}`}>
                {flagshipTech.map((tech) => (
                  <span key={tech} className={styles.chip}>
                    {tech}
                  </span>
                ))}
              </div>
              <a href="#contact" className={styles.flag_cta}>
                View Case Study <span className={styles.flag_cta_arrow}>→</span>
              </a>
            </div>

            {/* faux product dashboard */}
            <div className={styles.flag_shell}>
              <div className={styles.dash}>
                <div className={styles.dash_bar}>
                  <span className={`${styles.dash_dot} ${styles.dash_dot_red}`} aria-hidden="true" />
                  <span className={`${styles.dash_dot} ${styles.dash_dot_amber}`} aria-hidden="true" />
                  <span className={`${styles.dash_dot} ${styles.dash_dot_green}`} aria-hidden="true" />
                  <span className={styles.dash_url}>app.atrium-os.com</span>
                </div>
                <div className={styles.dash_content}>
                  <div className={styles.dash_side}>
                    <span className={styles.dash_side_active} aria-hidden="true" />
                    <span className={styles.dash_side_item} aria-hidden="true" />
                    <span className={styles.dash_side_item} aria-hidden="true" />
                    <span className={styles.dash_side_item} aria-hidden="true" />
                  </div>
                  <div className={styles.dash_main}>
                    <div className={styles.dash_head}>
                      <span className={styles.dash_heading}>Dashboard</span>
                      <span className={styles.dash_estate}>Estate: Atrium Grove</span>
                    </div>
                    <div className={styles.dash_stats}>
                      <div className={styles.dash_stat}>
                        <div className={styles.dash_stat_label}>COLLECTIONS</div>
                        <div className={styles.dash_stat_value}>₱2.41M</div>
                        <div className={styles.dash_stat_trend}>▲ 12% MoM</div>
                      </div>
                      <div className={styles.dash_stat}>
                        <div className={styles.dash_stat_label}>OCCUPANCY</div>
                        <div className={styles.dash_stat_value}>94.2%</div>
                        <div className={styles.dash_stat_sub}>312 / 331 units</div>
                      </div>
                    </div>
                    <div className={styles.dash_table}>
                      <div className={styles.dash_table_head}>
                        <span>UNIT</span>
                        <span>DUES</span>
                      </div>
                      <div className={styles.dash_table_row}>
                        <span>Tower A · 14F</span>
                        <span className={styles.dash_pill_paid}>PAID</span>
                      </div>
                      <div className={styles.dash_table_row}>
                        <span>Villa 22</span>
                        <span className={styles.dash_pill_due}>DUE</span>
                      </div>
                      <div className={styles.dash_table_row}>
                        <span>Tower B · 3F</span>
                        <span className={styles.dash_pill_paid}>PAID</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.flag_feats}>
            {flagshipFeatures.map((feature) => (
              <span key={feature} className={styles.flag_feat}>
                <span className={styles.flag_feat_check}>✓</span>
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* PERMISSION.IO (wide, reversed) */}
        <div className={styles.wide} data-reveal>
          <div className="proj-flag">
            <div className={styles.wide_media}>
              <img src={permission} alt="Permission.io" className={styles.wide_img} />
            </div>
            <div className={styles.wide_body}>
              <div className={styles.wide_meta}>
                <span className={styles.wide_num}>02 — CLIENT</span>
                <span className={styles.wide_type}>fintech · web3</span>
              </div>
              <h3 className={styles.wide_title}>Permission.io</h3>
              <p className={styles.wide_desc}>
                A rewards platform connecting brands and consumers through crypto — wallets, daily-earn mechanics, and a
                permissioned identity layer.
              </p>
              <div className={styles.wide_lines}>
                <div>
                  <span className={styles.wide_label}>{'role   '}</span>
                  Full-Stack Developer
                </div>
                <div>
                  <span className={styles.wide_label}>{'impact '}</span>
                  <span className={styles.wide_impact}>shipped wallet, daily-earn &amp; auth across web apps</span>
                </div>
              </div>
              <div className={styles.chips}>
                {permissionTech.map((tech) => (
                  <span key={tech} className={styles.chip}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2-COL: Solution.AI + S2Data */}
        <div className="proj-grid">
          <div className={styles.card} data-reveal>
            <div className={`${styles.card_media} ${styles.card_media_ai}`}>
              <img src={skillAi} alt="Accenture Solution.AI" className={styles.card_img} />
            </div>
            <div className={styles.card_body}>
              <div className={styles.card_meta}>
                <span className={styles.card_num}>03 — ENTERPRISE</span>
                <span className={styles.card_type}>AI · data</span>
              </div>
              <h3 className={styles.card_title}>Accenture · Solution.AI</h3>
              <p className={styles.card_desc}>
                An enterprise talent &amp; skilling suite — workforce analytics, skill graphs, and MLOps tooling for a
                15k-person org.
              </p>
              <div className={styles.card_role}>
                <span className={styles.card_role_label}>{'role '}</span>
                Full-Stack Developer
              </div>
              <div className={styles.chips}>
                {solutionAiTech.map((tech) => (
                  <span key={tech} className={styles.chip}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.card} data-reveal data-reveal-delay="100">
            <div className={`${styles.card_media} ${styles.card_media_s2}`}>
              <img src={s2data} alt="S2Data" className={styles.card_img} />
            </div>
            <div className={styles.card_body}>
              <div className={styles.card_meta}>
                <span className={styles.card_num}>04 — CLIENT</span>
                <span className={styles.card_type}>ai · review</span>
              </div>
              <h3 className={styles.card_title}>Invenire · Review AI</h3>
              <p className={styles.card_desc}>
                A records &amp; document application with an AI-assisted review layer — surfacing and reviewing
                information faster. Built for S2Data.
              </p>
              <div className={styles.card_role}>
                <span className={styles.card_role_label}>{'role '}</span>
                Full-Stack Developer · client: S2Data
              </div>
              <div className={styles.chips}>
                {invenireTech.map((tech) => (
                  <span key={tech} className={styles.chip}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* also shipped */}
        <div className={styles.ships} data-reveal>
          <span>{alsoShippedLabel}</span>
          <a href="https://landasia.ph/" target="_blank" rel="noopener noreferrer" className={styles.ships_link}>
            Landasia · real-estate web ↗
          </a>
          <a href="https://puredesire.org/" target="_blank" rel="noopener noreferrer" className={styles.ships_link}>
            Pure Desire · membership app ↗
          </a>
          <a
            href="https://github.com/oreoseenoevil/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ships_link} ${styles.ships_link_git}`}
          >
            more on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
};
