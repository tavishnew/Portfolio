import type { Project } from "../types/projects"

const GITHUB_FAVICON_URL =
  "https://github.githubassets.com/favicons/favicon.png"

export const PROJECTS: Project[] = [
  {
    id: "axiom",
    title: "Axiom",
    link: "https://github.com/tavishnew/Axiom",
    skills: ["Express", "React", "PostgreSQL", "Drizzle ORM", "Tailwind"],
    description:
      "A full-stack authorization platform for fine-grained RBAC and ABAC policies, featuring per-entity scoping, versioned rules, API key management, and sub-millisecond evaluation across an Express, PostgreSQL, and React stack.",
    logo: GITHUB_FAVICON_URL,
    isExpanded: true,
  },
  {
    id: "snipt",
    title: "Snipt",
    link: "https://github.com/tavishnew/Snipt",
    skills: ["TypeScript", "React", "Database", "Full-Stack"],
    description:
      "A developer-focused code snippet manager for organizing, editing, and sharing reusable snippets through a streamlined full-stack workspace.",
    logo: GITHUB_FAVICON_URL,
  },
  {
    id: "orbit",
    title: "Orbit",
    link: "https://github.com/tavishnew/Orbit",
    skills: ["React", "TypeScript", "Vite", "Express", "PostgreSQL"],
    description:
      "A full-stack project management workspace for authenticated teams to organize projects, manage tasks, and track execution through a React and TypeScript frontend backed by Express and PostgreSQL.",
    logo: GITHUB_FAVICON_URL,
  },
]
