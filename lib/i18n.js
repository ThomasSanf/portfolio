import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "../locales/en.json";
import zh from "../locales/zh.json";
import { projects as neutralProjects } from "../data/projects";

const DICTS = { en, zh };
const I18nContext = createContext(null);

// Resolve a dotted path ("nav.work") inside a dictionary object.
function get(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

// Merge neutral structure (slug/year/tags/stack/links/image positions) with the
// translated text for the active language, producing the same shape the
// components expect (project.title, project.sections[i].content[j].text, etc.).
function mergeProject(neutral, dict) {
  const txt = (dict.projects && dict.projects[neutral.slug]) || {};
  const merged = {
    slug: neutral.slug,
    year: neutral.year,
    tags: neutral.tags || [],
    stack: neutral.stack || [],
    live: neutral.live || "",
    repo: neutral.repo || "",
    title: txt.title || neutral.slug,
    short: txt.short || "",
    description: txt.description || "",
    role: txt.role || "",
    highlights: txt.highlights || [],
  };

  if (neutral.sections) {
    merged.sections = neutral.sections.map((ns, si) => {
      const ts = (txt.sections && txt.sections[si]) || {};
      return {
        title: ts.title || "",
        content: ns.content.map((nc, ci) => ({
          ...nc,
          ...((ts.content && ts.content[ci]) || {}),
        })),
      };
    });
  }
  return merged;
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en"); // server + first client render = en (no hydration mismatch)

  useEffect(() => {
    let stored;
    try {
      stored = localStorage.getItem("portfolio-lang");
    } catch (e) {}
    if (stored === "zh" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch (e) {}
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  const value = useMemo(() => {
    const dict = DICTS[lang] || en;
    const t = (path) => {
      const v = get(dict, path);
      return v == null ? get(en, path) ?? path : v;
    };
    const projects = neutralProjects.map((n) => mergeProject(n, dict));
    const getProject = (slug) => {
      const n = neutralProjects.find((p) => p.slug === slug);
      return n ? mergeProject(n, dict) : null;
    };
    const toggleLanguage = () => setLang((l) => (l === "en" ? "zh" : "en"));
    return { lang, setLang, toggleLanguage, t, projects, getProject };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
