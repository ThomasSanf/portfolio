import { useLanguage } from "../lib/LanguageContext";

export default function LanguageToggle({ className }) {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className={className}
      onClick={toggleLanguage}
      aria-label={lang === "en" ? "Switch to Traditional Chinese" : "Switch to English"}
      title={lang === "en" ? "Switch to Traditional Chinese" : "Switch to English"}
    >
      {lang === "en" ? "中" : "EN"}
    </button>
  );
}
