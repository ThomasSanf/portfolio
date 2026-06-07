import { site } from "../data/site";
import { GithubIcon, TwitterIcon, FigmaIcon, PinIcon } from "./icons";
import { useI18n } from "../lib/i18n";
import styles from "../styles/Home.module.css";

const SOCIAL_ICONS = { github: GithubIcon, twitter: TwitterIcon, figma: FigmaIcon };

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>
          {t("hero.greeting")} {site.name} <span className={styles.wave}>👋</span>
        </h1>

        <p className={styles.heroBio}>{t("hero.bio")}</p>

        <ul className={styles.heroMeta}>
          <li>
            <PinIcon /> <span>{t("hero.location")}</span>
          </li>
          <li>
            <span className={`${styles.statusDot} ${site.available ? styles.statusOn : ""}`} />
            <span>{t("hero.availability")}</span>
          </li>
        </ul>

        <div className={styles.socials}>
          {Object.entries(site.socials).map(([key, url]) => {
            const Icon = SOCIAL_ICONS[key];
            if (!url || !Icon) return null;
            return (
              <a key={key} href={url} target="_blank" rel="noreferrer" aria-label={key}>
                <Icon />
              </a>
            );
          })}
        </div>
      </div>

      <div className={styles.heroImageWrap}>
        <span className={styles.heroFrameTop} />
        <span className={styles.heroFrameBottom} />
        {/* Drop your photo in /public/profile.jpg */}
        <img className={styles.heroImage} src="/profile.jpg" alt={site.name} />
      </div>
    </section>
  );
}
