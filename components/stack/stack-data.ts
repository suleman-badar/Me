export type Tech = {
  id: string;
  label: string;
  group: string;
  x: number;
  y: number;
  r?: number;
};

export const TECH: Tech[] = [
  // Backend
  { id: "node", label: "Node.js", group: "backend", x: 22, y: 30, r: 32 },
  { id: "express", label: "Express", group: "backend", x: 12, y: 50 },
  { id: "fastapi", label: "FastAPI", group: "backend", x: 34, y: 46 },
  { id: "rest", label: "REST APIs", group: "backend", x: 28, y: 60 },
  { id: "jwt", label: "JWT / Auth", group: "backend", x: 8, y: 28 },
  { id: "meili", label: "Meilisearch", group: "backend", x: 22, y: 75 },

  // Databases
  { id: "mongo", label: "MongoDB", group: "db", x: 38, y: 86 },
  { id: "postgres", label: "PostgreSQL", group: "db", x: 50, y: 92 },
  { id: "mysql", label: "MySQL", group: "db", x: 62, y: 86 },

  // Frontend
  { id: "react", label: "React", group: "frontend", x: 78, y: 30, r: 30 },
  { id: "tailwind", label: "Tailwind", group: "frontend", x: 88, y: 50 },
  { id: "motion", label: "Framer Motion", group: "frontend", x: 72, y: 60 },
  { id: "js", label: "JavaScript", group: "frontend", x: 90, y: 28 },
  { id: "ts", label: "TypeScript", group: "frontend", x: 70, y: 44 },
  { id: "nextjs", label: "Next.js", group: "frontend", x: 80, y: 70, r: 32 },

  // Tools
  { id: "docker", label: "Docker", group: "tools", x: 50, y: 18 },
  { id: "git", label: "Git", group: "tools", x: 60, y: 30 },
  { id: "postman", label: "Postman", group: "tools", x: 40, y: 30 },

  // AI
  { id: "ai", label: "LLMs", group: "ai", x: 50, y: 50, r: 36 },
  { id: "langchain", label: "LangChain", group: "ai", x: 62, y: 60 },
  { id: "langgraph", label: "LangGraph", group: "ai", x: 38, y: 60 },
];

export const EDGES: [string, string][] = [
  ["node", "express"],
  ["node", "rest"],
  ["node", "jwt"],
  ["node", "meili"],
  ["meili", "mongo"],
  ["express", "rest"],
  ["react", "tailwind"],
  ["react", "motion"],
  ["react", "js"],
  ["docker", "node"],
  ["docker", "postgres"],
  ["docker", "mongo"],
  ["git", "node"],
  ["git", "react"],
  ["postman", "rest"],
  ["ai", "node"],
  ["ai", "react"],
  ["ai", "meili"],
  ["mysql", "langgraph"],
  ["langchain", "postgres"],
  ["langchain", "ai"],
  ["nextjs", "react"],
  ["nextjs", "tailwind"],
  ["ts", "react"],
];

export const GROUP_COLOR: Record<string, string> = {
  backend: "#c6ff3d",
  frontend: "#3d8bff",
  db: "#ff6b3d",
  tools: "#b1b8c4",
  ai: "#d83dff",
};

export const STACK_GROUPS = [
  {
    t: "Backend Core",
    v: "Next · Node · Express · REST · JWT ",
    c: "#c6ff3d",
  },
  {
    t: "Data Layer",
    v: "MongoDB · PostgreSQL · MySQL",
    c: "#ff6b3d",
  },
  {
    t: "Frontend",
    v: "Next · React · Tailwind · Framer Motion",
    c: "#3d8bff",
  },
  {
    t: "Tooling",
    v: "Docker · Git · Postman",
    c: "#b1b8c4",
  },
  {
    t: "Frontier",
    v: "LLMs · Langchain · LangGraph",
    c: "#d83dff",
  },
] as const;