/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENTS, LOGS } from './constants';
import { ViewType, Agent, LogEntry } from './types';

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

const OverviewView = () => (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { name: 'Juliette', role: 'Creative Strategist', status: 'Active', color: 'bg-primary', metric: '98%' },
          { name: 'Regis', role: 'Data Architect', status: 'Idle', color: 'bg-secondary', metric: '42%' },
          { name: 'Marcus', role: 'Security Lead', status: 'Active', color: 'bg-primary', metric: '89%' },
        ].map((agent) => (
          <div key={agent.name} className="glass-card rounded-3xl p-8 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
              <span className="text-4xl font-display">{agent.metric}</span>
            </div>
            <div className="flex justify-between items-start mb-8">
              <div className={`w-2 h-2 rounded-full ${agent.color} shadow-[0_0_15px_rgba(0,242,255,0.5)]`}></div>
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Node_{agent.name.substring(0,3).toUpperCase()}</div>
            </div>
            <h4 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{agent.name}</h4>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-medium">{agent.role}</p>
            
            <div className="mt-8 flex items-center gap-2">
              <div className="flex-1 h-[1px] bg-white/5"></div>
              <ArrowRight size={14} className="text-white/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
            </div>
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


const RegistryView = ({ agents, onEdit, onAdd }: { agents: Agent[], onEdit: (a: Agent) => void, onAdd: () => void }) => (
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
                    <span className={`px-3 py-1 rounded-full text-[8px] font-bold flex items-center gap-2 border ${
                      agent.status === 'active' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-white/5 text-on-surface-variant border-white/10'
                    }`}>
                      <span className={`h-1 w-1 rounded-full ${agent.status === 'active' ? 'bg-primary animate-pulse' : 'bg-on-surface-variant'}`}></span>
                      {agent.status.toUpperCase()}
                    </span>
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
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-all duration-500">
                    <Terminal size={22} />
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

const EditorView = ({ agent, onBack }: { agent: Agent, onBack: () => void }) => (
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
            <h2 className="text-5xl font-display tracking-tighter uppercase leading-none">{agent.name}</h2>
            <p className="text-on-surface-variant text-sm mt-2 font-medium italic opacity-60">Last neural sync recorded {agent.lastUpdated}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="px-8 py-4 border border-white/10 text-[10px] font-bold rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest">Discard</button>
          <button className="px-10 py-4 gradient-primary text-on-primary font-bold text-[10px] rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest">Commit Changes</button>
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
              <input className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium" type="text" defaultValue={agent.name}/>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[9px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.3em]">Functional Role</label>
              <input className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium" type="text" defaultValue={agent.role}/>
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
              <Sparkles size={16} className="text-secondary" />
              <h3 className="font-display text-lg tracking-widest text-white/90 uppercase">Capability Core</h3>
            </div>
            <button className="text-[9px] text-primary font-bold hover:underline uppercase tracking-widest">Inject Skill</button>
          </div>
          <div className="p-10">
            <div className="flex flex-wrap gap-3">
              {agent.tags.map(tag => (
                <div key={tag} className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-xl border border-primary/20 text-[9px] font-bold uppercase tracking-widest">
                  {tag} <X size={14} className="cursor-pointer hover:text-white transition-colors" />
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
              defaultValue={`# CORE DIRECTIVES\n1. Always prioritize readability and concise syntax.\n2. If providing code samples, default to TypeScript unless specified.\n3. Strict adherence to the 'Orchestria Style Guide v2.4'.\n\n# CONSTRAINT_LIMITS\n- MAX_OUTPUT_TOKENS: 4096\n- TEMPERATURE_THRESHOLD: 0.2\n- SEARCH_DEPTH: 3-LEVELS`}
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

const LogsView = () => (
  <div className="flex-1 flex flex-col min-w-0 bg-surface overflow-hidden">
    <section className="p-8 bg-surface-container-low border-b border-white/5 flex flex-wrap gap-6 items-center">
      <div className="relative flex-1 min-w-[300px]">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input className="w-full bg-white/[0.02] border border-white/5 text-on-surface text-xs pl-12 pr-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 placeholder:text-on-surface-variant/50 font-medium" placeholder="Search neural logs..." type="text"/>
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
      </div>
    </section>

    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mb-12 flex items-center gap-6">
            <span className="font-serif italic lowercase tracking-normal text-white/40 text-sm">cycle_</span> Oct 24
            <span className="h-[1px] flex-1 bg-white/5"></span>
          </h3>

          <div className="space-y-8">
            {LOGS.map((log, idx) => (
              <div key={log.id} className="relative pl-12 group">
                {idx !== LOGS.length - 1 && (
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
      </div>
    </div>
  </div>
);

const CreateAgentModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (agent: Omit<Agent, 'id' | 'status' | 'lastUpdated'>) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    tags: ''
  });

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

// --- Main App ---

export default function App() {
  const [view, setView] = useState<ViewType>('overview');
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setView('editor');
  };

  const handleAddAgent = (newAgentData: Omit<Agent, 'id' | 'status' | 'lastUpdated'>) => {
    const newAgent: Agent = {
      ...newAgentData,
      id: `XF-${Math.floor(Math.random() * 900) + 100}-${newAgentData.name.substring(0, 3).toUpperCase()}`,
      status: 'idle',
      lastUpdated: 'Just now'
    };
    setAgents([newAgent, ...agents]);
  };

  const getTitle = () => {
    if (view === 'editor') return 'Agent Editor';
    if (view === 'overview') return 'Personal Workspace';
    if (view === 'registry') return 'Agent Registry';
    if (view === 'logs') return 'Runs & Logs';
    return 'Orchestria';
  };

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
              {view === 'overview' && <OverviewView />}
              {view === 'registry' && <RegistryView agents={agents} onEdit={handleEditAgent} onAdd={() => setIsAddModalOpen(true)} />}
              {view === 'editor' && editingAgent && (
                <EditorView agent={editingAgent} onBack={() => setView('registry')} />
              )}
              {view === 'logs' && <LogsView />}
              {['skills', 'tools', 'orchestrators', 'providers', 'settings'].includes(view) && (
                <div className="flex flex-col items-center justify-center h-full text-center p-12 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center mx-auto mb-8 group">
                      <Lock size={40} className="text-white/20 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <h2 className="text-4xl font-display tracking-tighter uppercase mb-4">Module Encrypted</h2>
                    <p className="text-on-surface-variant text-sm font-medium italic opacity-60 max-w-md mx-auto">The <span className="text-primary font-mono uppercase tracking-widest not-italic">{view}</span> node is currently undergoing neural recalibration. Access will be granted in the next cycle.</p>
                    <button onClick={() => setView('overview')} className="mt-12 px-10 py-4 border border-white/10 text-[10px] font-bold rounded-2xl hover:bg-white/5 transition-all uppercase tracking-[0.4em]">Return to Core</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <CreateAgentModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddAgent} 
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
