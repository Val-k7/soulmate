import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock Data (will be moved to a more persistent store if needed, but for now in-memory is fine for "finishing" the app)
let agents = [
  {
    id: 'XF-992-JUL',
    name: 'Juliette',
    role: 'Technical Documentation Specialist',
    status: 'active',
    tags: ['G-CAL_SYNC', 'WEB_SCRAPE', 'NLP_TRANSFORM'],
    avatarUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=100&q=80',
    lastUpdated: '2 hours ago',
    description: 'Personal Assistant & Life Optimizer'
  },
  {
    id: 'XF-104-ATL',
    name: 'Atlas',
    role: 'Cloud Infrastructure Architect',
    status: 'dormant',
    tags: ['TERRAFORM', 'AWS_CORE'],
    avatarUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=100&q=80',
    lastUpdated: '1 day ago',
    description: 'Cloud Infrastructure Architect'
  },
  {
    id: 'XF-552-LYR',
    name: 'Lyra',
    role: 'Creative Research Synthesizer',
    status: 'processing',
    tags: ['DALL-E_INT', 'SEMANTIC_SEARCH', 'PDF_PARSER'],
    avatarUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=100&q=80',
    lastUpdated: '15 mins ago',
    description: 'Creative Research Synthesizer'
  },
  {
    id: 'XF-882-KOD',
    name: 'Koda',
    role: 'Security & Compliance Watchdog',
    status: 'active',
    tags: ['AUTH_SHIELD', 'AUDIT_LOGGER'],
    avatarUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=100&q=80',
    lastUpdated: '5 hours ago',
    description: 'Security & Compliance Watchdog'
  }
];

let logs = [
  {
    id: '1',
    timestamp: '14:22:05',
    agentName: 'Juliette',
    status: 'success',
    message: 'Gathered market intelligence for "Project Quantum" from 12 distinct sources.',
    provider: 'Google',
    model: 'Gemini 3 Flash',
    cost: '$0.001',
    duration: '2.4s',
    details: [
      'Initializing agent context...',
      'Calling tool google_search with params: {"query": "market trend project quantum"}',
      'Retrieved 8 relevant articles. Cross-referencing technical specifications...',
      'Execution finalized. Report generated.'
    ]
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/agents", (req, res) => {
    res.json(agents);
  });

  app.post("/api/agents", (req, res) => {
    const newAgent = {
      ...req.body,
      id: `XF-${Math.floor(Math.random() * 1000)}-${req.body.name.substring(0, 3).toUpperCase()}`,
      status: 'idle',
      lastUpdated: 'Just now'
    };
    agents.push(newAgent);
    res.status(201).json(newAgent);
  });

  app.put("/api/agents/:id", (req, res) => {
    const { id } = req.params;
    const index = agents.findIndex(a => a.id === id);
    if (index !== -1) {
      agents[index] = { ...agents[index], ...req.body, lastUpdated: 'Just now' };
      res.json(agents[index]);
    } else {
      res.status(404).json({ error: "Agent not found" });
    }
  });

  app.delete("/api/agents/:id", (req, res) => {
    const { id } = req.params;
    agents = agents.filter(a => a.id !== id);
    res.status(204).send();
  });

  app.get("/api/logs", (req, res) => {
    res.json(logs);
  });

  app.post("/api/logs", (req, res) => {
    const newLog = {
      ...req.body,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour12: false })
    };
    logs.unshift(newLog);
    res.status(201).json(newLog);
  });

  app.delete("/api/logs", (req, res) => {
    logs = [];
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
