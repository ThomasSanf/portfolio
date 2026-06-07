import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";
import Works from "../components/Works";
import { site } from "../data/site";
import { useI18n } from "../lib/i18n";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{site.name} — {site.role}</title>
        <meta name="description" content={t("hero.bio")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <Hero />
        <Works />
        <About />
        <Contact />
      </main>

      <footer id="contact" className={styles.footer}>
        <p>© {new Date().getFullYear()} {site.name}. {t("footer.builtWith")}</p>
      </footer>
    </>
  );
}
