import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { projects } from "../../data/projects";
import { site } from "../../data/site";
import { useI18n } from "../../lib/i18n";
import en from "../../locales/en.json";
import zh from "../../locales/zh.json";
import styles from "../../styles/ProjectArticle.module.css";

const DICTS = { en, zh };

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Merge the static project (structure: type, src, year, stack, links) with the
// localized copy from the locale JSON (text, alt, caption), aligned by index.
// Non-translatable fields and English text act as fallbacks.
function localizeProject(project, lang) {
  const dict = DICTS[lang] || DICTS.en;
  const loc = (dict.projects && dict.projects[project.slug]) || {};

  const sections = (project.sections || []).map((section, si) => {
    const locSection = (loc.sections && loc.sections[si]) || {};
    const locContent = locSection.content || [];
    const content = (section.content || []).map((block, bi) => ({
      ...block, // keeps type + src (image) + English fallback text/alt/caption
      ...(locContent[bi] || {}), // overlays localized text / alt / caption
    }));
    return { ...section, ...locSection, content };
  });

  return {
    ...project,
    title: loc.title ?? project.title,
    short: loc.short ?? project.short,
    description: loc.description ?? project.description,
    role: loc.role ?? project.role,
    tags: loc.tags ?? project.tags,
    highlights: loc.highlights ?? project.highlights,
    sections: sections.length ? sections : project.sections,
  };
}

export default function ProjectPage({ project: staticProject }) {
  const { t, lang } = useI18n();
  const project = localizeProject(staticProject, lang);
  const sections = project.sections || [];
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <Head>
        <title>{project.title} — {site.name}</title>
        <meta
          name="description"
          content={project.short || project.description}
        />
      </Head>

      <Navbar site={site} />

      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/" className={styles.backLink}>
              {t("projectPage.back")}
            </Link>

            <h1>{project.title}</h1>

            <div className={styles.meta}>
              {project.year && <span>{project.year}</span>}
              {project.role && <span>{project.role}</span>}
            </div>

            {project.description && (
              <p className={styles.description}>{project.description}</p>
            )}

            {project.tags?.length > 0 && (
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </header>

          {sections.length > 0 ? (
            <div className={styles.articleLayout}>
              <aside className={styles.toc}>
                <div className={styles.tocInner}>
                  <p className={styles.tocTitle}>{t("projectPage.toc")}</p>
                  <nav>
                    <ul>
                      {sections.map((section) => (
                        <li key={section.title}>
                          <a href={`#${slugify(section.title)}`}>
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>

              <div className={styles.content}>
                {sections.map((section) => (
                  <section key={section.title} id={slugify(section.title)}>
                    <h2>{section.title}</h2>

                    {(section.content || section.body || []).map(
                      (block, index) => {
                        if (typeof block === "string") {
                          return <p key={index}>{block}</p>;
                        }

                        if (block.type === "paragraph") {
                          return <p key={index}>{block.text}</p>;
                        }

                        if (block.type === "image-placeholder") {
                          return (
                            <figure
                              key={index}
                              className={styles.articleFigure}
                            >
                              <div className={styles.imagePlaceholder}>
                                <span>{block.label}</span>
                              </div>
                              {block.caption && (
                                <figcaption>{block.caption}</figcaption>
                              )}
                            </figure>
                          );
                        }

                        if (block.type === "image") {
                          return (
                            <figure
                              key={index}
                              className={styles.articleFigure}
                            >
                              <button
                                type="button"
                                className={styles.imageButton}
                                onClick={() =>
                                  setActiveImage({
                                    src: block.src,
                                    alt: block.alt || "",
                                    caption: block.caption || "",
                                  })
                                }
                                aria-label={`Open larger image: ${
                                  block.alt || block.caption || "project image"
                                }`}
                              >
                                <img
                                  src={block.src}
                                  alt={block.alt || ""}
                                  className={styles.articleImage}
                                />
                              </button>

                              {block.caption && (
                                <figcaption>{block.caption}</figcaption>
                              )}
                            </figure>
                          );
                        }

                        return null;
                      }
                    )}
                  </section>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.content}>
              <section>
                <h2>{t("projectPage.overview")}</h2>
                <p>{project.description}</p>
              </section>

              {project.stack?.length > 0 && (
                <section>
                  <h2>{t("projectPage.stack")}</h2>
                  <div className={styles.stackList}>
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </section>
              )}

              {project.highlights?.length > 0 && (
                <section>
                  <h2>{t("projectPage.highlights")}</h2>
                  <ul>
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </article>
      </main>

      {activeImage && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded project image"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActiveImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className={styles.lightboxImage}
            />

            {activeImage.caption && (
              <p className={styles.lightboxCaption}>{activeImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: projects.map((project) => ({
      params: { slug: project.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
}
