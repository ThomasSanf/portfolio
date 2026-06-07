import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "../data/site";
import { useI18n } from "../lib/i18n";
import styles from "../styles/Home.module.css";

export default function Navbar() {
  const { t, lang, toggleLanguage } = useI18n();

  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          &lt;{site.logo} /&gt;
        </Link>

        <nav className={styles.navLinks}>
          <a href="#work">{t("nav.work")}</a>
          <a href="#contact">{t("nav.contact")}</a>
        </nav>

        <div className={styles.navActions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleLanguage}
            aria-label={lang === "en" ? "切換到中文" : "Switch to English"}
            title={lang === "en" ? "切換到中文" : "Switch to English"}
          >
            {lang === "en" ? "中" : "EN"}
          </button>

          <ThemeToggle />

          <a className={styles.cvButton} href={site.cvUrl} target="_blank" rel="noreferrer">
            {t("nav.cv")}
          </a>
        </div>
      </div>
    </header>
  );
}
