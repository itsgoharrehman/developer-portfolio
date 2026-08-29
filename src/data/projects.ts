export type ProjectType = "real" | "open-source" | "experiment" | "case-study";

export interface Project {
  id: string;
  number: string;
  name: string;
  type: ProjectType;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  whatBroke: string;
  learned: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  visualConcept: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: "proj-01",
    number: "01",
    name: "FastAPI Backend Service",
    type: "real",
    category: "Backend / API",
    tagline: "A production-grade REST API with async architecture",
    description:
      "A fully async REST API built with FastAPI, handling authentication, data persistence, and background task processing.",
    problem:
      "Needed a backend service that could handle concurrent requests efficiently without blocking on I/O operations.",
    approach:
      "Used Python's async/await model with FastAPI to build non-blocking endpoints. Structured the codebase with clear separation between routes, services, and data access layers.",
    whatBroke:
      "Database connection pooling was a challenge — learned the hard way that async ORM patterns behave differently from synchronous ones.",
    learned: [
      "Async Python is powerful but requires understanding the event loop",
      "API design decisions are hard to reverse — think about them early",
      "Database schemas should be designed with queries in mind",
      "Error handling in async code requires explicit attention",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Docker"],
    github: "https://github.com/goharrehman/fastapi-backend", // [ADD REAL LINK]
    visualConcept: "architectural-diagram",
    accentColor: "#E8E0D4",
  },
  {
    id: "proj-02",
    number: "02",
    name: "AI Search Tool",
    type: "experiment",
    category: "AI / Search",
    tagline: "Semantic search powered by vector embeddings",
    description:
      "An experimental search system using LLM embeddings to find semantically similar results rather than exact keyword matches.",
    problem:
      "Traditional keyword search fails when users don't know the exact terms. Needed a way to search by meaning.",
    approach:
      "Embedded text data into vector space using an LLM API, stored vectors in a vector database, and built a similarity search layer on top.",
    whatBroke:
      "Embedding quality varies significantly with how text is chunked. Naive chunking produced poor results until proper overlap and context strategies were applied.",
    learned: [
      "Vector search is a different mental model from SQL queries",
      "Chunking strategy dramatically affects retrieval quality",
      "LLM APIs have latency and cost trade-offs that matter at scale",
      "Retrieval quality is measurable — eval datasets matter",
    ],
    technologies: ["Python", "OpenAI API", "PostgreSQL", "pgvector", "FastAPI"],
    github: "https://github.com/goharrehman/ai-search", // [ADD REAL LINK]
    visualConcept: "semantic-cloud",
    accentColor: "#D4DFE8",
  },
  {
    id: "proj-03",
    number: "03",
    name: "Docker Infrastructure Setup",
    type: "experiment",
    category: "Infrastructure / DevOps",
    tagline: "Containerized multi-service architecture",
    description:
      "A Docker Compose setup managing multiple services: API, database, cache, and reverse proxy — all networked together.",
    problem:
      "Local development environment was inconsistent across machines. Needed a reproducible setup that mirrors production.",
    approach:
      "Containerized each service independently, defined inter-service networking with Docker Compose, and set up health checks and restart policies.",
    whatBroke:
      "Service startup order and health checks required careful orchestration. Services that depended on the database needed proper wait logic.",
    learned: [
      "Containers are simpler than they appear once you understand layers",
      "Network namespacing is what makes container isolation work",
      "Health checks are not optional in multi-service setups",
      "Volume management requires explicit strategy",
    ],
    technologies: ["Docker", "Docker Compose", "Nginx", "PostgreSQL", "Redis"],
    github: "https://github.com/goharrehman/docker-infra", // [ADD REAL LINK]
    visualConcept: "container-network",
    accentColor: "#E8D4D4",
  },
  {
    id: "proj-04",
    number: "04",
    name: "Automation Pipeline",
    type: "experiment",
    category: "Automation / AI",
    tagline: "Data processing workflow with AI-assisted steps",
    description:
      "An automated pipeline that processes input data through multiple stages, with AI-powered transformation steps in between.",
    problem:
      "Repetitive data processing tasks that required judgment calls. Wanted to automate the routine parts while keeping human decision points.",
    approach:
      "Built a pipeline with discrete stages, each with clear input/output contracts. AI steps were treated like any other service — with timeouts, retries, and fallbacks.",
    whatBroke:
      "AI API rate limits required exponential backoff logic. Initial implementation failed under load.",
    learned: [
      "Pipelines need observability — you have to know where things fail",
      "AI steps should be designed to fail gracefully",
      "Idempotency matters when retrying failed pipeline stages",
      "State management between pipeline stages needs explicit design",
    ],
    technologies: ["Python", "OpenAI API", "Redis", "PostgreSQL", "FastAPI"],
    github: "https://github.com/goharrehman/automation-pipeline", // [ADD REAL LINK]
    visualConcept: "workflow-diagram",
    accentColor: "#D4E8D4",
  },
];
