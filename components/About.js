import { site } from "../data/site";
import { useI18n } from "../lib/i18n";
import styles from "../styles/Home.module.css";

export default function About() {
  const { t } = useI18n();

  const bits = [
    t("about.bit1"),
    t("about.bit2"),
    t("about.bit3"),
    t("about.bit4"),
  ];

  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.aboutTitle}>{t("about.title")}</h2>
      <div className={styles.aboutGrid}>
        <div className={styles.aboutImageWrap}>
          <span className={styles.aboutFrame} />
          {/* Reuses the same photo as the hero. Drop yours in /public/profile.jpg */}
          <img className={styles.aboutImage} src="/profile1.jpg" alt={site.name} />
        </div>

        <div className={styles.aboutText}>

          <p className={styles.aboutParagraph}>{t("about.p1")}</p>
          <p className={styles.aboutParagraph}>{t("about.p2")}</p>
          <p className={styles.aboutParagraph}>{t("about.p3")}</p>

          {site.socials.github ? (
            <p className={styles.aboutParagraph}>
              {t("about.findMe")}{" "}
              <a
                className={styles.aboutLink}
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          ) : (
            <p className={styles.aboutParagraph}>{t("about.p4")}</p>
          )}
          <p className={styles.aboutParagraph}>{t("about.closing")}</p>
        </div>
      </div>
    </section>
  );
}
