import { CodeXmlIcon, Laptop } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "freelance",
    companyName: "Freelance",
    companyIcon: <Laptop className="size-5 text-muted-foreground" />,
    companyWebsite: "#",
    positions: [
      {
        id: "1",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "01.2024",
        },
        employmentType: "Freelance",
        icon: <CodeXmlIcon />,
        description:
          "- Built responsive websites and full-stack web applications for clients, delivering modern, scalable, and user-friendly solutions tailored to their requirements.\n- Performed code reviews, fixed bugs, optimized application performance, and collaborated with clients to deliver high-quality software solutions.",
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "codsoft",
    companyName: "CodSoft",
    companyIcon: <Laptop className="size-5 text-muted-foreground" />,
    companyWebsite: "https://codsoft.in",
    positions: [
      {
        id: "1",
        title: "Full Stack Web Developer Intern",
        employmentPeriod: {
          start: "07.2026",
          end: "08.2026",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description:
          "- Developed full-stack web applications, including a Project Management Tool and Job Board, using modern frontend and backend technologies.\n- Built responsive user interfaces, implemented backend functionality, integrated databases and APIs, and collaborated on feature development from development to deployment.",
        isExpanded: true,
      },
    ],
  },
]
