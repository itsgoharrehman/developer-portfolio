export interface JourneyStage {
  id: string;
  year: string;
  era: "early" | "learning" | "backend" | "current";
  title: string;
  subtitle: string;
  what: string;
  difficult: string;
  learned: string;
  next: string;
}

export const journey: JourneyStage[] = [
  {
    id: "stage-01",
    year: "2021",
    era: "early",
    title: "FIRST WEBSITES",
    subtitle: "The beginning of curiosity",
    what: "Built first websites with HTML and CSS. Simple pages, static layouts. The thrill of seeing something appear in a browser.",
    difficult: "Everything. Not knowing where to start. Not understanding why things worked when they did.",
    learned: "That building something — even something small — is addictive.",
    next: "Frontend development",
  },
  {
    id: "stage-02",
    year: "2022",
    era: "learning",
    title: "LEARNING FRONTEND",
    subtitle: "JavaScript enters the picture",
    what: "JavaScript. React. Making pages interactive. Understanding the DOM, events, components.",
    difficult: "JavaScript's asynchronous model. Promises. Callbacks. The eventual discovery of async/await.",
    learned: "That software is mostly about managing state — and that's harder than it looks.",
    next: "Discovering that the backend is what actually interests me",
  },
  {
    id: "stage-03",
    year: "2023",
    era: "learning",
    title: "PYTHON",
    subtitle: "A language that made sense",
    what: "Started learning Python seriously. Scripts, data processing, understanding how programs work at a lower level.",
    difficult: "The shift from thinking in HTML/CSS to thinking in logic and algorithms.",
    learned: "That code is about solving problems first. The language is secondary.",
    next: "Backend development",
  },
  {
    id: "stage-04",
    year: "2023",
    era: "backend",
    title: "BACKEND",
    subtitle: "Finding where I belong",
    what: "FastAPI. REST APIs. HTTP. Request/response cycles. Authentication. Building things users never see but always need.",
    difficult: "Understanding how all the pieces fit together: the web framework, the database, the cache, the queue.",
    learned: "That backend systems have a beauty to them — invisible but essential.",
    next: "Databases and data modeling",
  },
  {
    id: "stage-05",
    year: "2024",
    era: "backend",
    title: "DATABASES",
    subtitle: "Where data lives",
    what: "PostgreSQL. Data modeling. SQL queries. Understanding indexes, transactions, and why databases are more complex than they look.",
    difficult: "Designing schemas that don't paint you into a corner. Query optimization.",
    learned: "That the database schema is often the most important architectural decision in a system.",
    next: "Systems thinking and architecture",
  },
  {
    id: "stage-06",
    year: "2024–2025",
    era: "current",
    title: "SYSTEMS",
    subtitle: "The bigger picture",
    what: "Docker. Infrastructure. Distributed system concepts. Understanding how software actually runs in production.",
    difficult: "The distance between a working local setup and something production-ready.",
    learned: "That software engineering is about reliability as much as functionality.",
    next: "Distributed systems, AI engineering, cloud infrastructure",
  },
];
