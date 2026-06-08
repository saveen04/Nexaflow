"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, 
  Search, 
  Filter, 
  Bot, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  MessageSquare,
  AlertCircle,
  Brain
} from "lucide-react"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

export default function AIClassificationsPage() {
  const [selectedTicket, setSelectedTicket] = useState(null)

  const classifications = [
    { 
      id: "TIC-8294", 
      subject: "Double charge for seat A2", 
      category: "Billing", 
      confidence: 98.4, 
      priority: "high",
      logic: "Detected currency keywords 'charge' and 'payment' combined with specific seat reference. High urgency due to financial discrepancy.",
      status: "Routed to Finance"
    },
    { 
      id: "TIC-1204", 
      subject: "Bus B-42 delayed by 2 hours", 
      category: "Bus Booking", 
      confidence: 94.2, 
      priority: "medium",
      logic: "Identified route delay report. Matched against real-time fleet GPS data. Automatic delay certificate generated.",
      status: "User Notified"
    },
    { 
      id: "TIC-3391", 
      subject: "Theater projection quality issue", 
      category: "Movie Booking", 
      confidence: 89.1, 
      priority: "low",
      logic: "Classified as feedback. Lower priority as it doesn't prevent access to service. Sent to Theater Ops.",
      status: "Feedback Logged"
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#0B1020] p-6 lg:p-10 space-y-10 overflow-x-hidden">
      <FloatingOrbs />
      <AnimatedGrid />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-lg shadow-purple-500/30">
                 <Brain className="w-6 h-6 text-white" />
              </div>
              Neural <span className="gradient-text">Classification</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">Real-time peek into how our AI perceives and prioritizes user requests.</p>
          </div>
          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl">
             <button className="px-6 py-2.5 bg-[#7C3AED] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-purple-500/20 transition-all">Real-time Feed</button>
             <button className="px-6 py-2.5 text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all">Historical Trends</button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: "AI Accuracy", val: "97.4%", icon: ShieldCheck, color: "text-emerald-400" },
             { label: "Active Models", val: "GPT-4o Mini", icon: Bot, color: "text-[#7C3AED]" },
             { label: "Avg Analysis Time", val: "842ms", icon: Activity, color: "text-blue-400" }
           ].map((stat, i) => (
             <div key={i} className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-3xl font-black text-white tracking-tight">{stat.val}</div>
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">{stat.label}</div>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Classification List */}
           <div className="lg:col-span-12 space-y-4">
              {classifications.map((item, i) => (
                <motion.div 
                  key={item.id}
                  layoutId={item.id}
                  onClick={() => setSelectedTicket(item)}
                  className="glass p-8 rounded-[3rem] border border-white/10 hover:border-[#7C3AED]/30 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity">
                     <Brain className="w-32 h-32 text-white" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                     <div className="flex items-center gap-8">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7C3AED]/10 group-hover:border-[#7C3AED]/20 transition-all">
                           <MessageSquare className="w-6 h-6 text-slate-500 group-hover:text-[#7C3AED]" />
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <span className="font-mono text-[10px] font-black text-[#7C3AED] uppercase tracking-widest">{item.id}</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                              <span className={`text-[10px] font-black uppercase tracking-widest ${item.priority === 'high' ? 'text-red-400' : 'text-slate-500'}`}>{item.priority} Priority</span>
                           </div>
                           <h3 className="text-2xl font-black text-white tracking-tight group-hover:gradient-text transition-all">{item.subject}</h3>
                        </div>
                     </div>

                     <div className="flex items-center gap-12 w-full md:w-auto overflow-hidden">
                        <div className="text-right whitespace-nowrap">
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Category</div>
                           <div className="text-white font-bold">{item.category}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Confidence</div>
                           <div className="text-lg font-black text-emerald-400">{item.confidence}%</div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-[#7C3AED] group-hover:border-[#7C3AED]/30 transition-all">
                           <ArrowUpRight className="w-5 h-5" />
                        </div>
                     </div>
                  </div>

                  {/* Expanded View Logic Preview */}
                  <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                           <Bot className="w-3 h-3" /> AI Decision Logic
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">"{item.logic}"</p>
                     </div>
                     <div className="flex flex-col justify-end items-end">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Current System Status</div>
                        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                           {item.status}
                        </div>
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}
