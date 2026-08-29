export interface LearningArea {
  id: string;
  topic: string;
  know: string;
  learning: string;
  building: string;
}

export const learningAreas: LearningArea[] = [
  {
    id: "l-01",
    topic: "DISTRIBUTED SYSTEMS",
    know: "Conceptual understanding of CAP theorem, consistency models, and distributed state.",
    learning: "How consensus algorithms work in practice. Raft, Paxos — the theory vs. the implementation.",
    building: "A small distributed key-value store to understand partitioning and replication firsthand.",
  },
  {
    id: "l-02",
    topic: "DATABASE INTERNALS",
    know: "How to write queries, use indexes, and understand query plans.",
    learning: "How databases actually store data. B-trees, WAL, MVCC, buffer pools.",
    building: "Reading through PostgreSQL source code and cmu db course materials.",
  },
  {
    id: "l-03",
    topic: "ASYNC ARCHITECTURE",
    know: "Python async/await, event loops, and non-blocking I/O.",
    learning: "Message queues, event-driven systems, and the trade-offs between async and sync approaches.",
    building: "A background job processor using Redis Streams.",
  },
  {
    id: "l-04",
    topic: "SYSTEM DESIGN",
    know: "Basic patterns: load balancing, caching, CDN, horizontal vs. vertical scaling.",
    learning: "How real systems are designed at scale. The decisions behind architecture choices.",
    building: "Designing and documenting systems I haven't built yet — as an exercise in thinking.",
  },
  {
    id: "l-05",
    topic: "AI ENGINEERING",
    know: "LLM API integration, prompt engineering basics, vector embeddings.",
    learning: "RAG architectures, fine-tuning, evaluation frameworks for AI systems.",
    building: "An AI-powered search and retrieval system with proper evaluation metrics.",
  },
  {
    id: "l-06",
    topic: "LINUX & PERFORMANCE",
    know: "Command line, processes, file systems, basic system administration.",
    learning: "Linux kernel internals, profiling, and understanding where performance actually lives.",
    building: "Profiling Python applications and tracing system calls.",
  },
];

export const philosophyStatements = [
  "Understand before optimizing.",
  "Keep complexity where it belongs.",
  "Make failure understandable.",
  "Prefer simple systems that can evolve.",
  "Build things you can explain.",
];
