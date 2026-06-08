"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Webhook, Play, Trash2, Cpu, BarChart2, Activity, Zap, Code } from "lucide-react"

export default function WebhookTestingPage() {
  const [json, setJson] = useState(`{
  "ticket_id": "TX-4829",
  "message": "Payment deducted but ticket not booked",
  "user_id": "user_alk29482",
  "priority": "unknown"
}`)

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Webhook Developer Console</h1>
          <p className="text-slate-400 text-sm">Test and debug your AI classification webhooks in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-6 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <button className="h-11 px-6 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            <Play className="w-4 h-4" />
            Trigger Hook
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-250px)]">
        {/* JSON Editor */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
             <span className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
               PAYLOAD (JSON)
             </span>
             <span className="text-[#7C3AED]">POST /api/webhooks/classify</span>
          </div>
          <div className="flex-1 glass rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <Code className="w-4 h-4 text-slate-500" />
            </div>
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              className="w-full h-full bg-black/40 p-8 font-mono text-sm text-purple-300 outline-none resize-none selection:bg-[#7C3AED]/30"
            />
          </div>
        </div>

        {/* Response Viewer */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
             <span className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               RESPONSE
             </span>
             <span className="text-green-500">200 OK — 142ms</span>
          </div>
          <div className="flex-1 glass rounded-3xl border border-white/10 p-8 font-mono text-sm space-y-4 overflow-y-auto">
             <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
               <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                 <Cpu className="w-5 h-5 text-purple-400" />
               </div>
               <div>
                 <div className="text-white font-bold">Booking Failure</div>
                 <div className="text-slate-500 text-[10px] uppercase">AI Classification</div>
               </div>
               <div className="ml-auto text-right">
                 <div className="text-[#7C3AED] font-bold">98.2%</div>
                 <div className="text-slate-500 text-[10px] uppercase tracking-tighter">Confidence</div>
               </div>
             </div>

             <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sentiment:</span>
                  <span className="text-red-400 font-bold">Frustrated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Priority:</span>
                  <span className="text-red-500 font-bold px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20 uppercase text-[10px]">High</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-slate-500 italic">"Routing to critical_payment_queue..."</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Latency & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Average Latency", val: "142ms", icon: Activity, color: "text-blue-400" },
           { label: "Confidence Floor", val: "85%", icon: BarChart2, color: "text-purple-400" },
           { label: "Successful Hooks", val: "14,802", icon: Zap, color: "text-yellow-400" }
         ].map((stat, i) => (
           <div key={i} className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4">
             <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
               <stat.icon className="w-5 h-5" />
             </div>
             <div>
               <div className="text-white font-bold">{stat.val}</div>
               <div className="text-slate-500 text-xs">{stat.label}</div>
             </div>
           </div>
         ))}
      </div>
    </div>
  )
}
