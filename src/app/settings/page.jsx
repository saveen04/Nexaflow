"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Database, 
  Cpu, 
  Globe,
  LogOut,
  ChevronRight,
  Zap,
  CheckCircle2
} from "lucide-react"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "neural", label: "Neural Engine", icon: Cpu },
    { id: "database", label: "Database", icon: Database }
  ]

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <FloatingOrbs />
      <AnimatedGrid />

      <div className="relative z-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <h1 className="title-xl uppercase tracking-[0.2em]">System <span className="gradient-text">Configuration</span></h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Manage neural platform settings — v4.2.0</p>
          </div>
          <button className="btn-secondary flex items-center gap-2 group text-[10px]">
             <Shield className="w-4 h-4 group-hover:text-[var(--color-primary)] transition-colors" />
             Verify Integrity
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-2 glass-card rounded-3xl border-white/5 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
                    activeTab === tab.id 
                      ? "bg-[var(--color-primary)] text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]" 
                      : "text-slate-500 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-black' : 'group-hover:text-[var(--color-primary)]'} transition-colors`} />
                  <span className="font-black text-[10px] uppercase tracking-[0.2em]">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4" />}
                </button>
              ))}
            </div>
            
            <button className="w-full flex items-center gap-4 px-8 py-5 rounded-3xl text-red-500 hover:bg-red-500/10 transition-all group border border-transparent hover:border-red-500/20">
               <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
               <span className="font-black text-[10px] uppercase tracking-[0.2em]">Terminate Session</span>
            </button>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-8">
             <motion.div 
               key={activeTab}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass-card p-12 rounded-[3.5rem] border-white/5 space-y-10"
             >
                {activeTab === "profile" && (
                  <div className="space-y-10">
                     <div className="flex items-center gap-8">
                        <div className="relative group">
                          <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-primary)] to-emerald-600 flex items-center justify-center text-black text-4xl font-black shadow-2xl shadow-[var(--color-primary)]/20">
                             AD
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-xl">
                             <CheckCircle2 className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="space-y-1">
                           <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Admin <span className="text-[var(--color-primary)]">Identity</span></h2>
                           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Root Orchestrator · NexaFlow AI Core</p>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Terminal Alias</label>
                           <input defaultValue="Admin Dashboard" className="form-input rounded-2xl h-16" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Logic Endpoint</label>
                           <input defaultValue="admin@nexaflow.ai" className="form-input rounded-2xl h-16" />
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === "neural" && (
                  <div className="space-y-10">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-black text-white uppercase tracking-tighter">GPT-4o Matrix</h3>
                           <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active classification engine.</p>
                        </div>
                        <div className="w-14 h-7 bg-[var(--color-primary)] rounded-full relative shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                           <div className="absolute right-1 top-1 w-5 h-5 bg-black rounded-full shadow" />
                        </div>
                     </div>
                     <div className="h-px bg-white/5" />
                     <div className="space-y-8">
                        <div className="flex items-center justify-between group">
                           <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Neural Auto-Routing</span>
                           <span className="text-[9px] font-black text-[var(--color-primary)] px-3 py-1 bg-[var(--color-primary)]/10 rounded-lg border border-[var(--color-primary)]/20 uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(163,230,53,0.1)]">Active</span>
                        </div>
                        <div className="flex items-center justify-between group">
                           <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Semantic Intelligence</span>
                           <span className="text-[9px] font-black text-[var(--color-primary)] px-3 py-1 bg-[var(--color-primary)]/10 rounded-lg border border-[var(--color-primary)]/20 uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(163,230,53,0.1)]">Active</span>
                        </div>
                        <div className="flex items-center justify-between opacity-30">
                           <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Autonomous Resolving</span>
                           <span className="text-[9px] font-black text-slate-600 px-3 py-1 bg-white/5 rounded-lg border border-white/10 uppercase tracking-[0.2em]">Locked</span>
                        </div>
                     </div>
                  </div>
                )}

                <div className="pt-12 flex border-t border-white/5">
                   <button className="btn-primary h-16 px-12 ml-auto shadow-[0_15px_40px_rgba(163,230,53,0.2)]">
                      Sync Protocols
                   </button>
                </div>
             </motion.div>

             <div className="mt-8 glass-card p-10 rounded-[3rem] border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center text-black shadow-[0_0_30px_rgba(163,230,53,0.3)] group-hover:scale-105 transition-transform duration-500">
                   <Shield className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                   <h4 className="text-white font-black uppercase tracking-tighter text-lg">AES-256 Neural Guard</h4>
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Global encryption active across all data pipelines.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
