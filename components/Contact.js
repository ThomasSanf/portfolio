import { useState } from "react";
import { site } from "../data/site";
import {
  GithubIcon,
  TwitterIcon,
  FigmaIcon,
  MailIcon,
  PhoneIcon,
  CopyIcon,
  CheckIcon,
} from "./icons";
import { useI18n } from "../lib/i18n";
import styles from "../styles/Home.module.css";

const SOCIAL_ICONS = { github: GithubIcon, twitter: TwitterIcon, figma: FigmaIcon };

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
  const hasSocials = Object.values(site.socials).some(Boolean);

  return (
    <section id="contact" className={styles.contact}>
      <span className={styles.contactBadge}>{t("contact.badge")}</span>

      <p className={styles.contactIntro}>{t("contact.intro")}</p>

      <div className={styles.contactDetails}>
        {site.email && (
          <div className={styles.contactRow}>
            <a className={styles.contactLink} href={`mailto:${site.email}`}>
              <MailIcon className={styles.contactIcon} />
              <span>{site.email}</span>
            </a>
            <CopyButton value={site.email} label={t("contact.copyEmail")} />
          </div>
        )}

        {site.phone && (
          <div className={styles.contactRow}>
            <a
              className={styles.contactLink}
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
            >
              <PhoneIcon className={styles.contactIcon} />
              <span>{site.phone}</span>
            </a>
            <CopyButton value={site.phone} label={t("contact.copyPhone")} />
          </div>
        )}
      </div>

      {hasSocials && (
        <>
          <p className={styles.contactPlatforms}>{t("contact.platforms")}</p>
          <div className={styles.contactSocials}>
            {Object.entries(site.socials).map(([key, url]) => {
              const Icon = SOCIAL_ICONS[key];
              if (!url || !Icon) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={key}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
