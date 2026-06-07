export function translateProject(project, t) {
  const copy = t?.projects?.[project.slug];

  if (!copy) {
    return project;
  }

  return {
    ...project,
    title: copy.title ?? project.title,
    short: copy.short ?? project.short,
    description: copy.description ?? project.description,
    role: copy.role ?? project.role,
    tags: copy.tags ?? project.tags,
    highlights: copy.highlights ?? project.highlights,
    sections: project.sections?.map((section, sectionIndex) => {
      const translatedSection = copy.sections?.[sectionIndex];

      if (!translatedSection) {
        return section;
      }

      return {
        ...section,
        title: translatedSection.title ?? section.title,
        content: section.content?.map((block, blockIndex) => {
          const translatedBlock = translatedSection.content?.[blockIndex];

          if (!translatedBlock) {
            return block;
          }

          if (typeof block === "string") {
            return translatedBlock.text ?? block;
          }

          return {
            ...block,
            text: translatedBlock.text ?? block.text,
            label: translatedBlock.label ?? block.label,
            alt: translatedBlock.alt ?? block.alt,
            caption: translatedBlock.caption ?? block.caption,
          };
        }),
      };
    }),
  };
}

export function translateProjects(projects, t) {
  return projects.map((project) => translateProject(project, t));
}
