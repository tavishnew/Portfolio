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
      "Built a full-stack RBAC/ABAC authorization platform with per-entity policy scoping and sub-millisecond evaluation using Express 5, Drizzle ORM, PostgreSQL, React 19, and Vite 7, featuring versioned policies, API key management, and a modern SPA frontend.",
    logo: GITHUB_FAVICON_URL,
    isExpanded: true,
  },
  {
    id: "snipt",
    title: "Snipt",
    link: "https://github.com/tavishnew/Snipt",
    skills: ["TypeScript", "React", "Database", "Full-Stack"],
    description:
      "A code snippet manager and sharing platform built with modern web technologies for organizing, managing, and sharing code snippets efficiently.",
    logo: GITHUB_FAVICON_URL,
  },
  {
    id: "notely",
    title: "Notely",
    link: "https://github.com/tavishnew/Notely",
    skills: ["Desktop App", "AI", "Ollama", "Study Tools"],
    description:
      "Built a local-first study application that transforms lectures, PDFs, videos, and audio into study notes, flashcards, quizzes, and chat using desktop app technology with Ollama integration for private, offline AI processing or cloud API support.",
    logo: GITHUB_FAVICON_URL,
  },
]
