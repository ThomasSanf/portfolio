import { useState } from "react";
import { site } from "../data/site";
import {
  MailIcon,
  PinIcon,
  LinkedinIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ArrowIcon,
} from "./icons";
import { useI18n } from "../lib/i18n";
import styles from "../styles/Home.module.css";

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Clipboard not available (e.g. insecure context) — fail silently.
    }
  }

  return (
    <button
      type="button"
      className={styles.contactCopy}
      onClick={copy}
      aria-label={label}
      title={label}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

export default function Contact() {
  const { t } = useI18n();
  const linkedin = site.socials.linkedin;

  return (
    <section id="contact" className={styles.contact}>
      <span className={styles.contactBadge}>{t("contact.badge")}</span>

      <h2 className={styles.contactTitle}>{t("contact.title")}</h2>

      <p className={styles.contactIntro}>{t("contact.intro")}</p>

      {site.available && (
        <div className={styles.contactStatus}>
          <span className={`${styles.statusDot} ${styles.statusOn}`} />
          {t("hero.availability")}
        </div>
      )}

      <div className={styles.contactCta}>
        {site.email && (
          <a className={styles.btnPrimary} href={`mailto:${site.email}`}>
            <MailIcon width="20" height="20" />
            {t("contact.emailMe")}
          </a>
        )}
        {site.cvUrl && (
          <a className={styles.btnGhost} href={site.cvUrl}>
            <DownloadIcon />
            {t("nav.cv")}
          </a>
        )}
      </div>

      <div className={styles.contactRows}>
        {site.email && (
          <div className={styles.chip}>
            <MailIcon width="18" height="18" className={styles.contactIcon} />
            <span>{site.email}</span>
            <CopyButton value={site.email} label={t("contact.copyEmail")} />
          </div>
        )}

        {linkedin && (
          <a
            className={`${styles.chip} ${styles.chipLink}`}
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinIcon className={styles.contactIcon} />
            <span>linkedin.com/in/thomas-maxime</span>
            <ArrowIcon
              width="16"
              height="16"
              className={`${styles.contactIcon} ${styles.chipArrow}`}
            />
          </a>
        )}

        <div className={styles.chip}>
          <PinIcon className={styles.contactIcon} />
          <span>{t("hero.location")}</span>
        </div>
      </div>
    </section>
  );
}
