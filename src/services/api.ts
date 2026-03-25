import { Agent, LogEntry } from '../types';

export const api = {
  async getAgents(): Promise<Agent[]> {
    const res = await fetch('/api/agents');
    if (!res.ok) throw new Error('Failed to fetch agents');
    return res.json();
  },

  async createAgent(agent: Omit<Agent, 'id' | 'status' | 'lastUpdated'>): Promise<Agent> {
    const res = await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent),
    });
    if (!res.ok) throw new Error('Failed to create agent');
    return res.json();
  },

  async updateAgent(id: string, agent: Partial<Agent>): Promise<Agent> {
    const res = await fetch(`/api/agents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent),
    });
    if (!res.ok) throw new Error('Failed to update agent');
    return res.json();
  },

  async deleteAgent(id: string): Promise<void> {
    const res = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete agent');
  },

  async getLogs(): Promise<LogEntry[]> {
    const res = await fetch('/api/logs');
    if (!res.ok) throw new Error('Failed to fetch logs');
    return res.json();
  },

  async saveLog(log: Omit<LogEntry, 'id' | 'timestamp'>): Promise<LogEntry> {
    const res = await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
    if (!res.ok) throw new Error('Failed to save log');
    return res.json();
  },

  async clearLogs(): Promise<void> {
    const res = await fetch('/api/logs', { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to clear logs');
  }
};
