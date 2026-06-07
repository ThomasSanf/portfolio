import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";
import styles from "../styles/Home.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The inline script in _document.js already set the attribute before paint.
    const current = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  }

}
