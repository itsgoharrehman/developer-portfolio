export interface SkillNode {
  id: string;
  label: string;
  category: "core" | "framework" | "database" | "infra" | "language" | "ai";
  description: string;
  familiarity: "learning" | "comfortable" | "confident";
  relatedTo: string[];
}

export const skills: SkillNode[] = [
  {
    id: "python",
    label: "Python",
    category: "language",
    description: "Primary language for backend development. Used across all backend projects.",
    familiarity: "confident",
    relatedTo: ["fastapi", "sqlalchemy", "redis"],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    category: "framework",
    description: "Used for building asynchronous APIs and backend services. Chosen for its speed and automatic documentation.",
    familiarity: "confident",
    relatedTo: ["python", "postgresql", "redis"],
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    category: "database",
    description: "Used for relational data modeling, queries, and persistence. Understanding indexes and query planning is ongoing.",
    familiarity: "comfortable",
    relatedTo: ["python", "sqlalchemy", "fastapi"],
  },
  {
    id: "redis",
    label: "Redis",
    category: "database",
    description: "Used for caching, session storage, and message queuing. Fast and effective for ephemeral data.",
    familiarity: "comfortable",
    relatedTo: ["python", "fastapi"],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "database",
    description: "Document store used for flexible schemas and unstructured data scenarios.",
    familiarity: "learning",
    relatedTo: ["python"],
  },
  {
    id: "docker",
    label: "Docker",
    category: "infra",
    description: "Used for containerizing services and creating reproducible development environments.",
    familiarity: "comfortable",
    relatedTo: ["linux", "postgresql", "redis"],
  },
  {
    id: "linux",
    label: "Linux",
    category: "infra",
    description: "Development and deployment environment. Understanding the filesystem, processes, and networking.",
    familiarity: "comfortable",
    relatedTo: ["docker", "git"],
  },
  {
    id: "git",
    label: "Git",
    category: "infra",
    description: "Version control. Branching strategies, rebasing, and collaborative workflows.",
    familiarity: "confident",
    relatedTo: ["linux"],
  },
  {
    id: "typescript",
    label: "TypeScript",
    category: "language",
    description: "Used for frontend development. Type safety reduces runtime surprises.",
    familiarity: "comfortable",
    relatedTo: ["javascript"],
  },
  {
    id: "javascript",
    label: "JavaScript",
    category: "language",
    description: "Foundation for web development. Understanding the event loop and async patterns.",
    familiarity: "comfortable",
    relatedTo: ["typescript"],
  },
  {
    id: "sqlalchemy",
    label: "SQLAlchemy",
    category: "framework",
    description: "ORM and database toolkit for Python. Used for database abstraction and migration management.",
    familiarity: "comfortable",
    relatedTo: ["python", "postgresql"],
  },
  {
    id: "llm-apis",
    label: "AI / LLM APIs",
    category: "ai",
    description: "Integration with OpenAI and similar APIs for AI-powered features. Understanding token limits, costs, and failure modes.",
    familiarity: "learning",
    relatedTo: ["python", "fastapi"],
  },
];

export const skillCenter = {
  label: "BACKEND\nENGINEERING",
  description: "The invisible layer that makes everything work.",
};
