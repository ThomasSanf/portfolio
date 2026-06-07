import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const uiText = {
  en: {
    builtWith: "Built with Next.js.",
    work: "Work",
    contact: "Contact",
    backHome: "← Back home",
    tableOfContents: "Table of Contents",
    overview: "Overview",
    stack: "Stack",
    highlights: "Highlights",
    openImage: "Open larger image",
    closeImage: "Close image preview",
  },
  zh: {
    builtWith: "使用 Next.js 製作。",
    work: "作品",
    contact: "聯絡",
    backHome: "← 回首頁",
    tableOfContents: "目錄",
    overview: "概覽",
    stack: "技術堆疊",
    highlights: "重點",
    openImage: "放大圖片",
    closeImage: "關閉圖片預覽",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");

    if (saved === "zh" || saved === "en") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: uiText[lang],
      toggleLanguage: () =>
        setLang((current) => (current === "en" ? "zh" : "en")),
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}