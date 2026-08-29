export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: "internship" | "full-time" | "freelance" | "contract";
  description: string;
  responsibilities: string[];
  learned: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-01",
    role: "Python Development Intern",
    company: "DecodeLabs",
    period: "2024", // [ADD REAL DATES]
    type: "internship",
    description:
      "Worked on Python-based backend systems, contributing to API development and data processing pipelines.",
    responsibilities: [
      "Built and maintained Python backend services",
      "Developed REST API endpoints using FastAPI",
      "Worked with databases for data persistence and querying",
      "Contributed to code reviews and documentation",
    ],
    learned: [
      "How production Python codebases are structured",
      "The importance of API design decisions made early",
      "Working with real data at scale",
      "Reading and contributing to an existing codebase",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Git", "Linux"],
  },
  // [ADD MORE EXPERIENCE]
];
