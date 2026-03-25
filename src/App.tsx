/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Cpu, 
  Brain, 
  Wrench, 
  GitBranch, 
  Cloud, 
  History, 
  Settings, 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  Terminal, 
  List, 
  X, 
  Check, 
  ChevronDown, 
  Fingerprint, 
  Sparkles, 
  Database, 
  Globe, 
  FileText, 
  Rocket,
  ArrowRight,
  Lock,
  Zap,
  Shield,
  Activity,
  MoreVertical,
  Play,
  Edit2,
  Trash2,
  ChevronRight,
  Code,
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOGS, AGENT_TEMPLATES } from './constants';
import { ViewType, Agent, LogEntry, Tool, AgentStatus } from './types';
import { api } from './services/api';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const Sidebar = ({ currentView, setView }: { currentView: ViewType, setView: (v: ViewType) => void }) => {
  const navItems = [
    { id: 'overview', label: 'Workspaces', icon: LayoutGrid },
    { id: 'registry', label: 'Agents', icon: Cpu },
    { id: 'skills', label: 'Skills', icon: Brain },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'orchestrators', label: 'Orchestrators', icon: GitBranch },
    { id: 'providers', label: 'Providers', icon: Cloud },
    { id: 'logs', label: 'Runs', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-72 bg-surface-container-lowest border-r border-white/5 z-50">
      <div className="px-10 h-24 flex items-center">
        <span className="text-3xl font-display tracking-tighter text-gradient">SOULMATE</span>
      </div>
      <nav className="flex-1 px-6 py-8 space-y-1">
        <p className="px-4 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] mb-6">Navigation</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative ${
              currentView === item.id 
                ? 'text-on-surface bg-white/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.2)]' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.01]'
            }`}
          >
            {currentView === item.id && (
              <motion.div 
                layoutId="activeNav"
                className="absolute left-0 w-1 h-6 bg-primary rounded-full"
              />
            )}
            <item.icon size={18} className={`${currentView === item.id ? 'text-primary' : 'group-hover:text-primary/50'} transition-colors`} />
            <span className="text-xs font-bold tracking-tight uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-8">
        <div className="flex items-center gap-4 p-4 glass-panel rounded-[2rem] border border-white/5 group cursor-pointer hover:border-primary/20 transition-all">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
            <span className="text-sm font-bold text-on-primary">JD</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">Cluster Alpha</p>
            <p className="text-[9px] text-primary font-mono uppercase tracking-[0.3em] flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
              Synchronized
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const TopBar = ({ title }: { title: string }) => (
  <header className="h-20 bg-surface border-b border-white/5 flex justify-between items-center px-10 z-40">
    <div className="flex items-center gap-6">
      <Menu size={20} className="text-on-surface-variant cursor-pointer md:hidden" />
      <div className="flex items-center gap-3">
        <span className="w-1 h-4 bg-primary/30 rounded-full"></span>
        <h1 className="font-display text-lg font-bold text-on-surface uppercase tracking-widest">{title}</h1>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <div className="hidden sm:flex items-center gap-3 text-secondary text-[9px] font-mono bg-secondary/5 border border-secondary/20 px-3 py-1.5 rounded-full tracking-[0.2em]">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
        SYSTEM_ACTIVE
      </div>
      <div className="flex items-center gap-6">
        <Search size={20} className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
        <div className="relative">
          <Bell size={20} className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-tertiary rounded-full border-2 border-surface"></span>
        </div>
      </div>
      <div className="w-10 h-10 rounded-2xl bg-primary-container border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shadow-lg">
        JD
      </div>
    </div>
  </header>
);

const MobileNav = ({ currentView, setView }: { currentView: ViewType, setView: (v: ViewType) => void }) => (
  <nav className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-10 items-center glass-panel rounded-[2rem] px-8 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
    <button onClick={() => setView('logs')} className={`transition-all duration-500 ${currentView === 'logs' ? 'text-primary scale-110' : 'text-on-surface-variant opacity-50 hover:opacity-100'}`}>
      <Terminal size={22} />
    </button>
    <button onClick={() => setView('overview')} className={`transition-all duration-500 ${currentView === 'overview' ? 'text-secondary scale-125' : 'text-on-surface-variant opacity-50 hover:opacity-100'}`}>
      <div className={`p-3 rounded-full ${currentView === 'overview' ? 'bg-secondary/20 shadow-[0_0_20px_rgba(112,0,255,0.3)]' : ''}`}>
        <LayoutGrid size={26} />
      </div>
    </button>
    <button onClick={() => setView('registry')} className={`transition-all duration-500 ${currentView === 'registry' ? 'text-primary scale-110' : 'text-on-surface-variant opacity-50 hover:opacity-100'}`}>
      <Cpu size={22} />
    </button>
  </nav>
);

// --- Views ---

const OverviewView = ({ agents, logs }: { agents: Agent[], logs: LogEntry[] }) => {
  const stats = [
    { label: 'Active Nodes', value: agents.length.toString(), icon: Cpu, trend: '+12%' },
    { label: 'Total Executions', value: logs.length.toString(), icon: Zap, trend: '+5.4%' },
    { label: 'Success Rate', value: logs.length > 0 ? (logs.filter(l => l.status === 'success').length / logs.length * 100).toFixed(1) + '%' : '100%', icon: Shield, trend: '+0.2%' },
    { label: 'Avg Latency', value: '1.2s', icon: Activity, trend: '-15%' },
  ];

  return (
    <div className="flex-1 relative overflow-hidden node-connector bg-surface-container-lowest h-full">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.02),transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-12 h-full flex flex-col">
        <div className="mb-20 relative">
          <h2 className="text-[18vw] font-display leading-[0.8] tracking-tighter uppercase text-white/[0.02] select-none absolute -top-10 left-0 w-full text-center pointer-events-none">
            ORCHESTRIA
          </h2>
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-primary/50"></span>
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.5em]">System Architecture v4.0</span>
            </div>
            <h3 className="text-7xl md:text-8xl font-display tracking-tighter uppercase leading-none">
              Neural <span className="font-serif italic font-normal text-white/90 lowercase tracking-normal">network</span> <br/>
              <span className="text-gradient">Operational</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-3xl p-8 group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon size={20} className="text-primary" />
                </div>
                <span className="text-[10px] font-mono text-secondary">{stat.trend}</span>
              </div>
              <p className="text-[9px] font-mono text-on-surface-variant uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h4 className="text-3xl font-display tracking-tight group-hover:text-primary transition-colors">{stat.value}</h4>
            </div>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] border border-white/[0.03] rounded-full animate-[spin_100s_linear_infinite]"></div>
            <div className="w-[450px] h-[450px] border border-white/[0.03] rounded-full animate-[spin_60s_linear_infinite_reverse]"></div>
            <div className="w-[300px] h-[300px] border border-white/[0.03] rounded-full"></div>
          </div>
          
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] scale-150 animate-pulse"></div>
            <div className="relative w-56 h-56 rounded-full glass-panel flex flex-col items-center justify-center p-8 text-center shadow-2xl border-white/10 group-hover:border-primary/30 transition-all duration-700">
              <div className="absolute inset-0 rounded-full border border-white/5 group-hover:scale-110 transition-transform duration-700"></div>
              <GitBranch size={40} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-display uppercase tracking-[0.3em] text-white/60">Core Router</p>
              <div className="mt-4 flex gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary animate-bounce"></span>
                <span className="w-1 h-1 rounded-full bg-primary animate-bounce delay-150"></span>
                <span className="w-1 h-1 rounded-full bg-primary animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-12 border-t border-white/5 flex justify-between items-end">
          <div className="flex gap-20">
            <div>
              <p className="text-[9px] font-mono text-on-surface-variant uppercase tracking-[0.3em] mb-2">System Uptime</p>
              <p className="text-2xl font-display tracking-tight">99.998<span className="text-sm text-primary/50 ml-1">%</span></p>
            </div>
            <div>
              <p className="text-[9px] font-mono text-on-surface-variant uppercase tracking-[0.3em] mb-2">Neural Latency</p>
              <p className="text-2xl font-display tracking-tight">14<span className="text-sm text-secondary/50 ml-1">ms</span></p>
            </div>
            <div className="hidden lg:block">
              <p className="text-[9px] font-mono text-on-surface-variant uppercase tracking-[0.3em] mb-2">Active Threads</p>
              <p className="text-2xl font-display tracking-tight">1,024</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border border-surface bg-surface-container-high flex items-center justify-center text-[10px] font-bold hover:-translate-y-1 transition-transform cursor-pointer">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Authorized Personnel Only</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const RegistryView = ({ agents, onEdit, onAdd, onDelete, onRun, onUpdateStatus }: { 
  agents: Agent[], 
  onEdit: (a: Agent) => void, 
  onAdd: () => void,
  onDelete: (id: string) => void,
  onRun: (agent: Agent) => void,
  onUpdateStatus: (id: string, status: AgentStatus) => void
}) => (
  <div className="h-full flex flex-col">
    <div className="bg-surface-container-lowest border-b border-white/5 overflow-hidden h-10 flex items-center">
      <div className="marquee-track">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6 whitespace-nowrap">
            <span className="text-[9px] font-mono text-primary/40 uppercase tracking-[0.3em]">System Online</span>
            <span className="text-[9px] font-mono text-secondary/40 uppercase tracking-[0.3em]">Neural Link Established</span>
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Soulmate Console v4.0.2</span>
            <span className="text-[9px] font-mono text-tertiary/40 uppercase tracking-[0.3em]">Encryption Active</span>
          </div>
        ))}
      </div>
    </div>

    <div className="p-12 space-y-16 overflow-y-auto flex-1 custom-scrollbar">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Node Registry</span>
          </div>
          <h3 className="text-7xl md:text-8xl font-display tracking-tighter uppercase leading-[0.9]">
            Soulmate <span className="font-serif italic font-normal text-white/80 lowercase tracking-normal">directory</span>
          </h3>
          <p className="text-sm text-on-surface-variant mt-6 leading-relaxed font-medium">Manage and monitor your deployed soulmates. Each node represents a unique neural identity within the Orchestria network.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center justify-center gap-4 gradient-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-xs shadow-[0_20px_40px_rgba(0,242,255,0.15)] hover:shadow-[0_25px_50px_rgba(0,242,255,0.25)] hover:-translate-y-1 transition-all active:scale-95 group uppercase tracking-widest"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          <span>Initialize Node</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between text-[9px] font-mono text-on-surface-variant uppercase tracking-[0.4em] pb-6 border-b border-white/5">
            <span className="flex items-center gap-2">
              <List size={12} className="text-primary" />
              Active Deployments
            </span>
            <span>{agents.length} Nodes Online</span>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                onClick={() => onEdit(agent)}
                className="group glass-card rounded-[2rem] p-8 flex flex-col sm:flex-row items-start sm:items-center gap-10 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-110"></div>
                  <div className="h-24 w-24 rounded-3xl overflow-hidden flex-shrink-0 border border-white/10 relative z-10 shadow-2xl">
                    <img src={agent.avatarUrl || 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=200&q=80'} alt={agent.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                    <h4 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">{agent.name}</h4>
                    <div className="relative group/status">
                      <select 
                        value={agent.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdateStatus(agent.id, e.target.value as AgentStatus);
                        }}
                        className={`bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary/30 appearance-none cursor-pointer pr-8 hover:bg-white/10 transition-colors ${
                          agent.status === 'active' ? 'text-primary border-primary/20' : 'text-on-surface-variant border-white/10'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="dormant">Dormant</option>
                        <option value="processing">Processing</option>
                        <option value="idle">Idle</option>
                      </select>
                      <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-1 font-medium italic opacity-80">"{agent.description}"</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-mono px-3 py-1.5 bg-white/[0.03] text-white/60 border border-white/5 rounded-lg uppercase tracking-widest group-hover:border-primary/30 group-hover:text-primary transition-all">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/5 pt-6 sm:pt-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-[8px] font-mono text-on-surface-variant uppercase tracking-widest mb-1">Last Sync</p>
                    <p className="text-xs font-bold font-mono">{agent.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRun(agent); }}
                      className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-500"
                      title="Run Task"
                    >
                      <Rocket size={22} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(agent.id); }}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-on-surface-variant hover:text-error hover:border-error/30 transition-all duration-500"
                      title="Delete Node"
                    >
                      <X size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <h4 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
              <Cpu size={14} />
              Neural Allocation
            </h4>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between text-[10px] mb-4 uppercase tracking-widest font-bold">
                  <span className="text-on-surface-variant">Synaptic Tokens</span>
                  <span className="text-primary">28%</span>
                </div>
                <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '28%' }}
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full shadow-[0_0_15px_rgba(0,242,255,0.4)]"
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-4 uppercase tracking-widest font-bold">
                  <span className="text-on-surface-variant">Core Frequency</span>
                  <span className="text-secondary">4.2 GHz</span>
                </div>
                <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="bg-gradient-to-r from-secondary to-tertiary h-full rounded-full shadow-[0_0_15px_rgba(112,0,255,0.4)]"
                  ></motion.div>
                </div>
              </div>
            </div>
            <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-[10px] text-on-surface-variant leading-relaxed italic font-serif">"System efficiency is currently optimal. Neural pathways show zero degradation across all active clusters."</p>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-mono text-secondary uppercase tracking-[0.4em] flex items-center gap-2">
                <History size={14} />
                Telemetry Feed
              </h4>
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></div>
            </div>
            <div className="space-y-6 font-mono text-[9px]">
              {LOGS.slice(0, 6).map(log => (
                <div key={log.id} className="flex gap-4 group cursor-pointer">
                  <span className="text-white/10 shrink-0 group-hover:text-primary/40 transition-colors">{log.timestamp}</span>
                  <span className="text-on-surface/60 group-hover:text-white transition-colors truncate leading-relaxed">{log.message}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 rounded-xl border border-white/5 text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 hover:text-primary hover:border-primary/30 transition-all">View Full Archive</button>
          </div>
        </aside>
      </div>
    </div>
  </div>
);

const EditorView = ({ agent, logs, onBack, onSave, setView, setSearchQuery }: { 
  agent: Agent, 
  logs: LogEntry[],
  onBack: () => void, 
  onSave: (a: Partial<Agent>) => void,
  setView: (v: ViewType) => void,
  setSearchQuery: (q: string) => void
}) => {
  const [formData, setFormData] = useState({
    name: agent.name,
    role: agent.role,
    description: agent.description || '',
    tags: agent.tags.join(', '),
    status: agent.status
  });

  const recentLogs = logs.filter(l => l.agentName === agent.name).slice(0, 5);

  return (
    <div className="h-full overflow-y-auto bg-surface custom-scrollbar">
      <div className="p-12 border-b border-white/5 bg-surface-container-lowest/30 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-[2rem] gradient-primary flex items-center justify-center shadow-2xl relative group">
              <div className="absolute inset-0 rounded-[2rem] border border-white/20 group-hover:scale-110 transition-transform duration-500"></div>
              <Sparkles size={40} className="text-on-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Configuration Mode</span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">{agent.id}</span>
              </div>
              <h2 className="text-5xl font-display tracking-tighter uppercase leading-none">{formData.name}</h2>
              <p className="text-on-surface-variant text-sm mt-2 font-medium italic opacity-60">Last neural sync recorded {agent.lastUpdated}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="px-8 py-4 border border-white/10 text-[10px] font-bold rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest">Discard</button>
            <button 
              onClick={() => onSave({
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
              })}
              className="px-10 py-4 gradient-primary text-on-primary font-bold text-[10px] rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest"
            >
              Commit Changes
            </button>
          </div>
        </div>
      </div>

      <div className="p-12 grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-8 space-y-12">
          <section className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint size={16} className="text-primary" />
                <h3 className="font-display text-lg tracking-widest text-white/90 uppercase">Identity Matrix</h3>
              </div>
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Section_01</span>
            </div>
            <div className="p-10 grid grid-cols-2 gap-10">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Agent Designation</label>
                <input 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Functional Role</label>
                <input 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                  type="text" 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Operational Status</label>
                <div className="relative">
                  <select 
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as AgentStatus})}
                  >
                    <option value="active">Active</option>
                    <option value="dormant">Dormant</option>
                    <option value="processing">Processing</option>
                    <option value="idle">Idle</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Neural Persona</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Professional', 'Analytical', 'Creative'].map(tone => (
                    <button key={tone} className={`p-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      tone === 'Professional' ? 'border-primary/30 bg-primary/5 text-primary' : 'border-white/5 hover:bg-white/5 text-on-surface-variant'
                    }`}>{tone}</button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History size={16} className="text-secondary" />
                <h3 className="font-display text-lg tracking-widest text-white/90 uppercase">Recent History</h3>
              </div>
              <button 
                onClick={() => {
                  setSearchQuery(agent.name);
                  setView('logs');
                }}
                className="text-[9px] text-primary font-bold hover:underline uppercase tracking-widest"
              >
                Full Archive
              </button>
            </div>
            <div className="p-10 space-y-6 font-mono text-[10px]">
              {recentLogs.length > 0 ? (
                recentLogs.map(log => (
                  <div key={log.id} className="flex items-center gap-6 group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <span className="text-white/20 shrink-0 group-hover:text-primary/40 transition-colors">{log.timestamp}</span>
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      log.status === 'success' ? 'bg-secondary' : 
                      log.status === 'running' ? 'bg-primary animate-pulse' : 'bg-error'
                    }`}></div>
                    <span className="text-on-surface/70 group-hover:text-white transition-colors truncate flex-1">{log.message}</span>
                    <span className="text-white/20 text-[8px] uppercase tracking-widest hidden sm:block">{log.model}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-40 italic text-sm">No recent neural activity recorded for this node.</div>
              )}
            </div>
          </section>

          <section className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles size={16} className="text-secondary" />
                <h3 className="font-display text-lg tracking-widest text-white/90 uppercase">Capability Core</h3>
              </div>
              <button className="text-[9px] text-primary font-bold hover:underline uppercase tracking-widest">Inject Skill</button>
            </div>
            <div className="p-10">
              <div className="flex flex-wrap gap-3">
                {formData.tags.split(',').map(t => t.trim()).filter(t => t !== '').map(tag => (
                  <div key={tag} className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-xl border border-primary/20 text-[9px] font-bold uppercase tracking-widest">
                    {tag} <X size={14} className="cursor-pointer hover:text-white transition-colors" onClick={() => {
                      const newTags = formData.tags.split(',').map(t => t.trim()).filter(t => t !== tag).join(', ');
                      setFormData({...formData, tags: newTags});
                    }} />
                  </div>
                ))}
                <div className="flex items-center gap-3 bg-white/[0.02] text-on-surface-variant px-4 py-2 rounded-xl border border-white/5 text-[9px] font-bold hover:border-primary/30 transition-all cursor-pointer uppercase tracking-widest">
                  <Plus size={14} /> Add Capability
                </div>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-tertiary" />
                <h3 className="font-display text-lg tracking-widest text-white/90 uppercase">Neural Directives</h3>
              </div>
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">System_Prompt_v2</span>
            </div>
            <div className="p-10">
              <textarea 
                className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-8 text-secondary font-mono text-xs focus:ring-2 focus:ring-secondary/20 transition-all resize-none leading-relaxed" 
                rows={10} 
                spellCheck="false"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[9px] text-on-surface-variant font-mono uppercase tracking-widest opacity-40">Read-only fields locked by cluster admin</span>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] text-primary font-mono uppercase tracking-widest">Tokens: 1,242</span>
                  <span className="text-[9px] text-on-surface-variant font-mono uppercase tracking-widest opacity-40">UTF-8</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-12">
          <section className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Compute Engine</h3>
            </div>
            <div className="p-8 space-y-8">
              <div>
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Inference Provider</label>
                <div className="relative">
                  <select className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-on-surface appearance-none focus:ring-1 focus:ring-primary/50 font-medium">
                    <option>Orchestria Local</option>
                    <option>Azure AI Foundry</option>
                    <option>AWS Bedrock</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-3.5 text-on-surface-variant pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Primary Model</label>
                <div className="relative">
                  <select className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-on-surface appearance-none focus:ring-1 focus:ring-primary/50 font-medium">
                    <option>orchestria-L4-preview</option>
                    <option>gpt-4o-optimized</option>
                    <option>claude-3-sonnet</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-3.5 text-on-surface-variant pointer-events-none" />
                </div>
              </div>
              <div className="pt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Creativity Level</span>
                  <span className="text-[10px] font-mono text-primary">0.2</span>
                </div>
                <div className="relative h-1.5 bg-white/[0.03] rounded-full">
                  <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" type="range" min="0" max="1" step="0.1" defaultValue="0.2"/>
                  <div className="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Permitted Toolsets</h3>
            </div>
            <div className="p-8 space-y-6">
              {[
                { name: 'Local Web Search', desc: 'Access isolated intranet', icon: Globe, color: 'text-primary', active: true },
                { name: 'Code Interpreter', desc: 'Sandboxed Python runtime', icon: Terminal, color: 'text-secondary', active: true },
                { name: 'PDF Parser', desc: 'OCR and structure extraction', icon: FileText, color: 'text-tertiary', active: false },
                { name: 'Direct SQL Access', desc: 'Production Database Link', icon: Database, color: 'text-error', active: false, disabled: true },
              ].map((tool) => (
                <div key={tool.name} className={`flex items-center justify-between group ${tool.disabled ? 'opacity-30' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white/[0.02] border border-white/5 ${tool.color} group-hover:scale-110 transition-transform`}>
                      <tool.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight">{tool.name}</p>
                      <p className="text-[9px] text-on-surface-variant font-medium">{tool.desc}</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-all ${tool.active ? 'bg-primary/20' : 'bg-white/[0.02] border border-white/10'}`}>
                    <div className={`w-3 h-3 rounded-full absolute transition-all ${tool.active ? 'bg-primary right-1' : 'bg-white/10 left-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <Rocket size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Check size={14} className="text-primary" />
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Ready for Deployment</p>
              </div>
              <p className="text-[11px] text-on-surface/80 leading-relaxed font-medium">Current configuration matches 98% of target workload efficiency. Latency estimated at <span className="text-primary font-bold">14ms</span>.</p>
              <button className="mt-8 w-full bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold py-4 rounded-xl uppercase tracking-[0.3em] border border-white/5 transition-all">View Pre-Flight Log</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LogsView = ({ logs, onClear, searchQuery, setSearchQuery }: { 
  logs: LogEntry[], 
  onClear: () => void,
  searchQuery: string,
  setSearchQuery: (q: string) => void
}) => {
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface overflow-hidden">
      <section className="p-8 bg-surface-container-low border-b border-white/5 flex flex-wrap gap-6 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            className="w-full bg-white/[0.02] border border-white/5 text-on-surface text-xs pl-12 pr-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 placeholder:text-on-surface-variant/50 font-medium" 
            placeholder="Search neural logs..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          {['All Agents', 'Providers', 'Live Feed'].map(filter => (
            <button key={filter} className={`px-4 py-2 rounded-xl flex items-center gap-2 text-[9px] font-bold border transition-all uppercase tracking-widest ${
              filter === 'Live Feed' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
            }`}>
              {filter === 'All Agents' && <Cpu size={12} />}
              {filter === 'Providers' && <Cloud size={12} />}
              {filter === 'Live Feed' && <History size={12} />}
              {filter}
            </button>
          ))}
          <button 
            onClick={onClear}
            className="px-4 py-2 rounded-xl flex items-center gap-2 text-[9px] font-bold border border-error/20 bg-error/5 text-error hover:bg-error/10 transition-all uppercase tracking-widest"
          >
            <X size={12} />
            Clear History
          </button>
        </div>
      </section>

      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-10">
          {filteredLogs.length > 0 ? (
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mb-12 flex items-center gap-6">
                <span className="font-serif italic lowercase tracking-normal text-white/40 text-sm">cycle_</span> Oct 24
                <span className="h-[1px] flex-1 bg-white/5"></span>
              </h3>

              <div className="space-y-8">
                {filteredLogs.map((log, idx) => (
                  <div key={log.id} className="relative pl-12 group">
                    {idx !== filteredLogs.length - 1 && (
                      <div className="absolute left-[11px] top-8 bottom-[-32px] w-[1px] bg-white/5"></div>
                    )}
                    <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10 border border-white/5 ${
                      log.status === 'success' ? 'bg-secondary/10' : log.status === 'running' ? 'bg-primary/10' : 'bg-error/10'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-secondary shadow-[0_0_10px_rgba(112,0,255,0.5)]' : 
                        log.status === 'running' ? 'bg-primary shadow-[0_0_10px_rgba(0,242,255,0.5)] animate-pulse' : 
                        'bg-error shadow-[0_0_10px_rgba(255,68,68,0.5)]'
                      }`}></div>
                    </div>

                    <div className="glass-card rounded-3xl overflow-hidden border border-white/5 group-hover:border-primary/20 transition-all duration-500">
                      <div className="p-6 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[8px] font-mono px-2 py-0.5 rounded border ${
                              log.status === 'success' ? 'bg-secondary/5 text-secondary border-secondary/20' : 
                              log.status === 'running' ? 'bg-primary/5 text-primary border-primary/20' : 
                              'bg-error/5 text-error border-error/20'
                            }`}>{log.status.toUpperCase()}</span>
                            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{log.timestamp}</span>
                          </div>
                          <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">{log.agentName}</h4>
                          <p className="text-xs text-on-surface-variant mt-1 font-medium italic opacity-70">"{log.message}"</p>
                        </div>
                        <div className="flex items-center gap-8 text-[9px] font-mono text-on-surface-variant">
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-white font-bold">{log.model}</span>
                            <span className="opacity-40 uppercase tracking-widest">{log.provider}</span>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-primary font-bold">{log.cost || '--'}</span>
                            <span className="opacity-40 uppercase tracking-widest">{log.duration}</span>
                          </div>
                          <ChevronDown size={16} className={`transition-transform duration-500 ${log.details ? 'rotate-180 text-primary' : 'opacity-20'}`} />
                        </div>
                      </div>

                      {log.details && (
                        <div className="bg-white/[0.01] border-t border-white/5 p-8">
                          <div className="space-y-3 font-mono text-[10px] leading-relaxed">
                            {log.details.map((detail, i) => (
                              <div key={i} className="flex gap-4 group/line">
                                <span className="text-primary/30 group-hover/line:text-primary transition-colors">[{i * 1.2}s]</span>
                                <span className="text-on-surface/60 group-hover/line:text-white transition-colors">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <History size={48} className="mb-4" />
              <p className="text-sm font-mono uppercase tracking-widest">No neural logs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CreateAgentModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (agent: Omit<Agent, 'id' | 'status' | 'lastUpdated'>) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    tags: ''
  });

  const applyTemplate = (template: typeof AGENT_TEMPLATES[0]) => {
    setFormData({
      name: template.name.toUpperCase().replace(' ', '_') + '_01',
      role: template.role,
      description: template.description,
      tags: template.tags
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl glass-panel rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
        
        <div className="p-12 relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Neural Initialization</span>
              </div>
              <h2 className="text-4xl font-display tracking-tighter uppercase">Manifest New Agent</h2>
              <p className="text-on-surface-variant text-sm mt-2 font-medium italic opacity-60">Define the core parameters for the new node.</p>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl hover:bg-white/5 transition-colors text-on-surface-variant">
              <X size={24} />
            </button>
          </div>

          <div className="mb-10">
            <label className="block text-[9px] font-bold text-primary mb-3 uppercase tracking-[0.3em]">Select Configuration Template</label>
            <div className="grid grid-cols-2 gap-3">
              {AGENT_TEMPLATES.map(t => (
                <button 
                  key={t.name}
                  type="button"
                  onClick={() => applyTemplate(t)}
                  className="px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-[10px] font-bold text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all text-left uppercase tracking-widest"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            onAdd({
              ...formData,
              tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
            });
            setFormData({ name: '', role: '', description: '', tags: '' });
            onClose();
          }} className="space-y-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Designation</label>
                <input 
                  required
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-white/10" 
                  placeholder="e.g. ARCHITECT_01"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Functional Role</label>
                <input 
                  required
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-white/10" 
                  placeholder="e.g. Neural Strategist"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Core Directives</label>
                <textarea 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-white/10 resize-none" 
                  rows={3}
                  placeholder="Describe the agent's primary mission..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Capability Tags (comma separated)</label>
                <input 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-white/10" 
                  placeholder="e.g. logic, creative, speed"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-5 border border-white/10 text-[10px] font-bold rounded-2xl hover:bg-white/5 transition-all uppercase tracking-[0.3em]"
              >
                Abort
              </button>
              <button 
                type="submit"
                className="flex-[2] py-5 gradient-primary text-on-primary font-bold text-[10px] rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.4em]"
              >
                Initialize Node
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const RunTaskModal = ({ isOpen, onClose, onRun, agent }: { isOpen: boolean, onClose: () => void, onRun: (prompt: string) => void, agent: Agent | null }) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-xl glass-panel rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="p-12 relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Rocket size={16} className="text-primary" />
                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Execute Directive</span>
              </div>
              <h2 className="text-3xl font-display tracking-tighter uppercase">Run {agent.name}</h2>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl hover:bg-white/5 transition-colors text-on-surface-variant">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            onRun(prompt);
            setPrompt('');
            onClose();
          }} className="space-y-8">
            <div>
              <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Task Description</label>
              <textarea 
                required
                autoFocus
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-white/10 resize-none" 
                rows={4}
                placeholder="Describe the task you want this agent to perform..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 gradient-primary text-on-primary font-bold text-[10px] rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.4em]"
            >
              Initialize Execution
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const SkillsView = () => {
  const skills = [
    { name: 'Logical Reasoning', level: 98, desc: 'Advanced deductive and inductive reasoning capabilities.', icon: Brain },
    { name: 'Creative Synthesis', level: 85, desc: 'Ability to generate novel concepts and artistic content.', icon: Sparkles },
    { name: 'Data Extraction', level: 92, desc: 'High-precision information retrieval from unstructured sources.', icon: Search },
    { name: 'Strategic Planning', level: 78, desc: 'Long-term goal orientation and complex decision making.', icon: GitBranch },
  ];

  return (
    <div className="p-12 space-y-12 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Cognitive Assets</span>
        </div>
        <h3 className="text-7xl md:text-8xl font-display tracking-tighter uppercase leading-[0.9]">
          Neural <span className="font-serif italic font-normal text-white/80 lowercase tracking-normal">capabilities</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill) => (
          <div key={skill.name} className="glass-panel p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <skill.icon size={28} className="text-primary" />
              </div>
              <span className="text-3xl font-display text-primary/40">{skill.level}%</span>
            </div>
            <h4 className="text-2xl font-bold mb-3 uppercase tracking-tight">{skill.name}</h4>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed opacity-70">{skill.desc}</p>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ToolsView = () => {
  const tools: Tool[] = [
    { id: '1', name: 'Web Search', description: 'Real-time web browsing and information retrieval.', type: 'api', status: 'active', icon: 'Globe' },
    { id: '2', name: 'Code Interpreter', description: 'Execute Python code in a sandboxed environment.', type: 'function', status: 'active', icon: 'Code' },
    { id: '3', name: 'File System', description: 'Read and write access to local workspace files.', type: 'plugin', status: 'inactive', icon: 'Folder' },
    { id: '4', name: 'Database Connector', description: 'Direct SQL execution on connected databases.', type: 'api', status: 'active', icon: 'Database' },
  ];

  return (
    <div className="p-12 space-y-12 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.4em]">Capability Matrix</span>
        </div>
        <h3 className="text-7xl md:text-8xl font-display tracking-tighter uppercase leading-[0.9]">
          Neural <span className="font-serif italic font-normal text-white/80 lowercase tracking-normal">toolsets</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <motion.div 
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-10 rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5 group-hover:border-primary/20">
                <Wrench size={28} className="text-primary" />
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${tool.status === 'active' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-white/5 text-on-surface-variant border-white/10'}`}>
                {tool.status}
              </div>
            </div>
            <h3 className="text-3xl font-display uppercase mb-3 tracking-tight">{tool.name}</h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed font-medium opacity-80">{tool.description}</p>
            <div className="flex items-center gap-6 pt-8 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">Protocol</span>
                <span className="text-[10px] font-mono text-on-surface uppercase tracking-widest">{tool.type}</span>
              </div>
              <div className="flex-1" />
              <button className="px-6 py-3 rounded-xl border border-white/10 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary/10 transition-all">Configure</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const OrchestratorsView = () => {
  const workflows = [
    { id: 'wf1', name: 'Content Pipeline', status: 'Active', nodes: 3, lastRun: '2m ago' },
    { id: 'wf2', name: 'Data Analysis', status: 'Idle', nodes: 5, lastRun: '1h ago' },
    { id: 'wf3', name: 'Customer Support', status: 'Active', nodes: 2, lastRun: 'Just now' },
  ];

  return (
    <div className="p-12 space-y-12 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Workflow Engine</span>
        </div>
        <h3 className="text-7xl md:text-8xl font-display tracking-tighter uppercase leading-[0.9]">
          Neural <span className="font-serif italic font-normal text-white/80 lowercase tracking-normal">orchestration</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {workflows.map((wf) => (
          <div key={wf.id} className="glass-panel p-8 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-all">
                <GitBranch size={28} className="text-primary" />
              </div>
              <div>
                <h4 className="text-2xl font-display uppercase tracking-tight">{wf.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">{wf.nodes} Nodes Connected</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Last Run: {wf.lastRun}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${wf.status === 'Active' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-white/5 text-on-surface-variant border-white/10'}`}>
                {wf.status}
              </div>
              <button className="p-4 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant">
                <Play size={20} />
              </button>
              <button className="p-4 rounded-xl hover:bg-white/5 transition-colors text-on-surface-variant">
                <Settings size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProvidersView = () => {
  const providers = [
    { id: 'google', name: 'Google AI', model: 'Gemini 3.1 Pro', latency: '120ms', status: 'Connected', icon: Sparkles },
    { id: 'openai', name: 'OpenAI', model: 'GPT-4o', latency: '240ms', status: 'Disconnected', icon: Zap },
    { id: 'anthropic', name: 'Anthropic', model: 'Claude 3.5 Sonnet', latency: '180ms', status: 'Connected', icon: Shield },
  ];

  return (
    <div className="p-12 space-y-12 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.4em]">Model Hub</span>
        </div>
        <h3 className="text-7xl md:text-8xl font-display tracking-tighter uppercase leading-[0.9]">
          Neural <span className="font-serif italic font-normal text-white/80 lowercase tracking-normal">providers</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {providers.map((provider) => (
          <div key={provider.id} className="glass-panel p-10 rounded-[3rem] border border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <provider.icon size={28} className="text-secondary" />
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${provider.status === 'Connected' ? 'bg-secondary/5 text-secondary border-secondary/20' : 'bg-white/5 text-on-surface-variant border-white/10'}`}>
                {provider.status}
              </div>
            </div>
            <h4 className="text-2xl font-display uppercase mb-2 tracking-tight">{provider.name}</h4>
            <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest mb-8">{provider.model}</p>
            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">Latency</span>
                <span className="text-[10px] font-mono text-on-surface uppercase tracking-widest">{provider.latency}</span>
              </div>
              <button className="px-6 py-3 rounded-xl border border-white/10 text-[10px] font-bold text-secondary uppercase tracking-widest hover:bg-secondary/10 transition-all">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsView = () => {
  const [apiKey, setApiKey] = useState('••••••••••••••••');
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="p-12 space-y-16 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="text-[10px] font-mono text-tertiary uppercase tracking-[0.4em]">System Parameters</span>
        </div>
        <h3 className="text-7xl md:text-8xl font-display tracking-tighter uppercase leading-[0.9]">
          Core <span className="font-serif italic font-normal text-white/80 lowercase tracking-normal">settings</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <section className="space-y-8">
            <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Infrastructure</h3>
            <div className="space-y-4">
              {[
                { label: 'API Gateway', value: 'https://api.orchestria.ai/v1', status: 'Online' },
                { label: 'Neural Engine', value: 'Gemini 3 Flash (Latest)', status: 'Active' },
                { label: 'Environment', value: 'Production Cluster Alpha', status: 'Stable' },
                { label: 'System Version', value: 'v4.0.2-stable', status: 'Up to date' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center p-8 glass-panel rounded-[2rem] border border-white/5 hover:border-white/10 transition-all">
                  <div>
                    <p className="text-[9px] font-mono text-on-surface-variant uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-on-surface">{item.value}</p>
                  </div>
                  <span className="text-[9px] font-mono text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/20 uppercase tracking-widest">{item.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-[10px] font-mono text-secondary uppercase tracking-[0.4em]">API Configuration</h3>
            <div className="p-10 glass-panel rounded-[3rem] border border-white/5 space-y-8">
              <div>
                <label className="block text-[9px] font-bold text-on-surface-variant mb-4 uppercase tracking-[0.3em]">Gemini API Key</label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input 
                      type={showKey ? 'text' : 'password'}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm" 
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                    />
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <button className="px-8 py-4 gradient-primary text-on-primary font-bold text-[10px] rounded-2xl uppercase tracking-[0.3em] hover:brightness-110 active:scale-95 transition-all">
                    Update
                  </button>
                </div>
                <p className="mt-4 text-[10px] text-on-surface-variant italic opacity-60">Your key is stored locally and never leaves the environment.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-12">
          <section className="space-y-8">
            <h3 className="text-[10px] font-mono text-secondary uppercase tracking-[0.4em]">Security Protocol</h3>
            <div className="p-10 glass-panel rounded-[3rem] border border-white/5 space-y-10 relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-bold mb-1 uppercase tracking-tight">Encryption Matrix</p>
                  <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest">AES-256-GCM Hardware</p>
                </div>
                <div className="w-14 h-7 bg-primary rounded-full relative p-1 cursor-pointer">
                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-xl" />
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-bold mb-1 uppercase tracking-tight">Audit Persistence</p>
                  <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest">90 Day Neural History</p>
                </div>
                <div className="w-14 h-7 bg-white/10 rounded-full relative p-1 cursor-pointer">
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white/40 rounded-full" />
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-bold mb-1 uppercase tracking-tight">Multi-Factor Sync</p>
                  <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest">Biometric Verification</p>
                </div>
                <div className="w-14 h-7 bg-primary rounded-full relative p-1 cursor-pointer">
                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-xl" />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-[10px] font-mono text-tertiary uppercase tracking-[0.4em]">System Actions</h3>
            <div className="space-y-4">
              <button className="w-full p-8 glass-panel rounded-[2rem] border border-white/5 hover:border-destructive/20 hover:bg-destructive/5 transition-all flex items-center justify-between group">
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-tight group-hover:text-destructive transition-colors">Purge Neural Cache</p>
                  <p className="text-[9px] font-mono text-on-surface-variant uppercase tracking-widest">Clear all temporary session data</p>
                </div>
                <Trash2 size={20} className="text-on-surface-variant group-hover:text-destructive transition-colors" />
              </button>
              <button className="w-full p-8 glass-panel rounded-[2rem] border border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all flex items-center justify-between group">
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors">Reboot Engine</p>
                  <p className="text-[9px] font-mono text-on-surface-variant uppercase tracking-widest">Restart neural processing unit</p>
                </div>
                <RefreshCw size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<ViewType>('overview');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [runningAgent, setRunningAgent] = useState<Agent | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRunModalOpen, setIsRunModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsData, logsData] = await Promise.all([
          api.getAgents(),
          api.getLogs()
        ]);
        setAgents(agentsData);
        setLogs(logsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setView('editor');
  };

  const handleSaveAgent = async (updatedData: Partial<Agent>) => {
    if (!editingAgent) return;
    try {
      const updatedAgent = await api.updateAgent(editingAgent.id, updatedData);
      setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
      setView('registry');
    } catch (error) {
      console.error('Failed to update agent:', error);
    }
  };

  const handleAddAgent = async (newAgentData: Omit<Agent, 'id' | 'status' | 'lastUpdated'>) => {
    try {
      const newAgent = await api.createAgent(newAgentData);
      setAgents([newAgent, ...agents]);
    } catch (error) {
      console.error('Failed to add agent:', error);
    }
  };

  const handleDeleteAgent = async (id: string) => {
    try {
      await api.deleteAgent(id);
      setAgents(agents.filter(a => a.id !== id));
    } catch (error) {
      console.error('Failed to delete agent:', error);
    }
  };

  const handleClearLogs = async () => {
    try {
      await api.clearLogs();
      setLogs([]);
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  };

  const handleRunAgent = async (promptText: string) => {
    if (!runningAgent) return;

    const tempLog: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour12: false }),
      agentName: runningAgent.name,
      status: 'running',
      message: `Executing task: ${promptText}`,
      provider: 'Google',
      model: 'Gemini 3 Flash',
      duration: '...'
    };
    setLogs([tempLog, ...logs]);
    setView('logs');

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY is missing in environment");

      const ai = new GoogleGenAI({ apiKey });
      const startTime = Date.now();
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: `You are ${runningAgent.name}, a ${runningAgent.role}. ${runningAgent.description}. Task: ${promptText}` }] }],
      });
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
      
      const resultLog = await api.saveLog({
        agentName: runningAgent.name,
        status: 'success',
        message: response.text || "Task completed successfully",
        provider: 'Google',
        model: 'Gemini 3 Flash',
        cost: '$0.001',
        duration,
        details: [
          `Initializing ${runningAgent.name}...`,
          `Processing prompt: ${promptText}`,
          `Generating response using Gemini 3 Flash...`,
          `Task finalized.`
        ]
      });

      setLogs(prev => prev.map(l => l.id === tempLog.id ? resultLog : l));
    } catch (error: any) {
      console.error('Failed to run agent:', error);
      const errorLog: LogEntry = {
        ...tempLog,
        status: 'failed',
        message: error.message || 'Execution failed',
        details: [`Error: ${error.message}`]
      };
      setLogs(prev => prev.map(l => l.id === tempLog.id ? errorLog : l));
    } finally {
      setRunningAgent(null);
    }
  };

  const getTitle = () => {
    if (view === 'editor') return 'Agent Editor';
    if (view === 'overview') return 'Personal Workspace';
    if (view === 'registry') return 'Agent Registry';
    if (view === 'logs') return 'Runs & Logs';
    return 'Orchestria';
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface text-primary">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] animate-pulse">Initializing Neural Link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar title={getTitle()} />
        
        <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full"
                >
                  {view === 'overview' && <OverviewView agents={agents} logs={logs} />}
                  {view === 'registry' && (
                    <RegistryView 
                      agents={agents} 
                      onEdit={handleEditAgent} 
                      onAdd={() => setIsAddModalOpen(true)} 
                      onDelete={handleDeleteAgent}
                      onRun={(agent) => {
                        setRunningAgent(agent);
                        setIsRunModalOpen(true);
                      }}
                      onUpdateStatus={async (id, status) => {
                        try {
                          const updated = await api.updateAgent(id, { status });
                          setAgents(agents.map(a => a.id === id ? updated : a));
                        } catch (error) {
                          console.error('Failed to update status:', error);
                        }
                      }}
                    />
                  )}
                  {view === 'editor' && editingAgent && (
                    <EditorView 
                      agent={editingAgent} 
                      logs={logs}
                      onBack={() => setView('registry')} 
                      onSave={handleSaveAgent}
                      setView={setView}
                      setSearchQuery={setSearchQuery}
                    />
                  )}
                  {view === 'logs' && <LogsView logs={logs} onClear={handleClearLogs} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
                  {view === 'skills' && <SkillsView />}
                  {view === 'tools' && <ToolsView />}
                  {view === 'orchestrators' && <OrchestratorsView />}
                  {view === 'providers' && <ProvidersView />}
                  {view === 'settings' && <SettingsView />}
                </motion.div>
              </AnimatePresence>
        </div>

        <CreateAgentModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddAgent} 
        />

        <RunTaskModal 
          isOpen={isRunModalOpen}
          onClose={() => setIsRunModalOpen(false)}
          onRun={handleRunAgent}
          agent={runningAgent}
        />

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-xl gradient-primary text-on-primary flex items-center justify-center shadow-2xl hover:brightness-110 transition-all active:scale-95 group z-50"
        >
          <Plus size={24} />
          <div className="absolute right-full mr-4 glass-panel px-3 py-1.5 rounded text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
            Start New Run
          </div>
        </button>

        <MobileNav currentView={view} setView={setView} />
      </main>
    </div>
  );
}
