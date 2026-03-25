import { Agent, LogEntry } from './types';

export const AGENTS: Agent[] = [
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

export const LOGS: LogEntry[] = [
  {
    id: '1',
    timestamp: '14:22:05',
    agentName: 'Research Analyst Agent',
    status: 'success',
    message: 'Gathered market intelligence for "Project Quantum" from 12 distinct sources.',
    provider: 'OpenAI',
    model: 'GPT-4-Turbo',
    cost: '$0.042',
    duration: '8.4s',
    details: [
      'Initializing agent context...',
      'Calling tool google_search with params: {"query": "market trend project quantum"}',
      'Retrieved 8 relevant articles. Cross-referencing technical specifications...',
      'Execution finalized. Report generated.'
    ]
  },
  {
    id: '2',
    timestamp: '14:18:12',
    agentName: 'Content Synthesizer',
    status: 'running',
    message: 'Generating summary drafts for executive briefing...',
    provider: 'Anthropic',
    model: 'Claude 3.5 Sonnet',
    duration: '4m 21s...'
  },
  {
    id: '3',
    timestamp: '13:45:00',
    agentName: 'Data Extractor Pro',
    status: 'failed',
    message: 'Attempted PDF parsing of secure financial documents.',
    provider: 'Groq',
    model: 'Llama 3 70B',
    cost: '$0.000',
    duration: '1.2s'
  }
];

export const AGENT_TEMPLATES = [
  { 
    name: 'Standard Analyst', 
    role: 'Neural Data Analyst', 
    description: 'Expert in processing complex datasets and extracting actionable insights with high precision.', 
    tags: 'logic, analysis, data' 
  },
  { 
    name: 'Creative Writer', 
    role: 'Syntactic Architect', 
    description: 'Specialized in generating high-quality narrative content and creative copy across multiple domains.', 
    tags: 'creative, writing, synthesis' 
  },
  { 
    name: 'Technical Strategist', 
    role: 'Systems Architect', 
    description: 'Focused on long-term technical strategy and complex systems design.', 
    tags: 'strategy, architecture, technical' 
  },
  { 
    name: 'Research Assistant', 
    role: 'Information Specialist', 
    description: 'Optimized for deep research, fact-checking, and information synthesis.', 
    tags: 'research, synthesis, speed' 
  }
];
