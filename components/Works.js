import Link from "next/link";
import { ArrowIcon } from "./icons";
import { useI18n } from "../lib/i18n";
import styles from "../styles/Home.module.css";

export default function Works() {
  const { t, projects } = useI18n();
  const latest = projects.slice(0, 3);

  return (
    <section id="work" className={styles.works}>
      <div className={styles.worksHead}>
        <h2 className={styles.worksTitle}>{t("works.title")}</h2>
        <p className={styles.worksSub}>{t("works.subtitle")}</p>
      </div>

      <div className={styles.worksGrid}>
        {latest.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.cardYear}>{p.year}</span>
              <ArrowIcon className={styles.cardArrow} />
            </div>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardDesc}>{p.short}</p>
            <div className={styles.cardTags}>
              {p.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
