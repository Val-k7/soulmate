export type AgentStatus = 'active' | 'dormant' | 'processing' | 'idle';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  tags: string[];
  avatarUrl?: string;
  lastUpdated?: string;
  description?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  agentName: string;
  status: 'success' | 'running' | 'failed' | 'info' | 'warn';
  message: string;
  details?: string[];
  provider?: string;
  model?: string;
  cost?: string;
  duration?: string;
}

export type ViewType = 'overview' | 'registry' | 'editor' | 'logs';
