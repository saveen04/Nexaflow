"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  MessageSquare, 
  Paperclip, 
  Clock, 
  Bot, 
  CheckCircle, 
  Shield, 
  Cpu, 
  Activity, 
  Globe, 
  Zap,
  ChevronRight,
  Terminal,
  AlertCircle
} from "lucide-react"

const PIPELINE_STEPS = [
  { id: 1, label: "Event Source", icon: Globe, detail: "Detecting inbound ticketing event" },
  { id: 2, label: "FastAPI Bridge", icon: Cpu, detail: "Validating JSON orchestration" },
  { id: 3, label: "Neural Engine", icon: Bot, detail: "LLM Classification & Sentiment" },
  { id: 4, label: "Metric Logger", icon: Activity, detail: "Storing telemetry & predictions" },
  { id: 5, label: "Enriched Output", icon: CheckCircle, detail: "Dispatching diagnostic matrix" }
]

export default function SupportPage() {
  const fileInputRef = useRef(null)
  const [priority, setPriority] = useState("medium")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState(null)
  const [pipelineLogs, setPipelineLogs] = useState([])

  const addLog = (msg) => {
    setPipelineLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5))
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
        addLog("ERROR: High-fidelity extraction requires .json format")
        return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        // Auto-extract and populate
        setSubject(data.subject || data.title || data.header || "")
        setDescription(data.description || data.content || data.body || JSON.stringify(data, null, 2))
        addLog(`SUCCESS: Extracted JSON signature: ${file.name}`)
      } catch (err) {
        addLog("CRITICAL: Malformed JSON payload detected")
      }
    }
    reader.readAsText(file)
  }


  const handleSubmit = async () => {
    if (!subject || !description) return
    setLoading(true)
    setResult(null)
    setPipelineLogs([])
    
    // Simulate Pipeline Steps
    try {
      for (let i = 1; i <= 5; i++) {
        setCurrentStep(i)
        addLog(PIPELINE_STEPS[i-1].detail)
        await new Promise(r => setTimeout(r, 800))
        
        if (i === 2) {
          const res = await fetch("/api/webhook/support", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, description })
          })
          
          if (!res.ok) throw new Error(`Bridge Error: ${res.status}`)
          
          const data = await res.json()
          if (data.success) {
            setResult(data)
          } else {
            throw new Error(data.details || "Unknown Pipeline Error")
          }
        }
      }
    } catch (e) {
      console.error(e)
      addLog(`CRITICAL: ${e.message}`)
      setCurrentStep(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container relative min-h-screen pb-20 max-w-7xl mx-auto">
      
      {/* ── Dynamic Banner Section ── */}
      <section className="relative py-12 mb-12 border-b border-white/5">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-4 px-6 py-2 bg-white/[0.03] border border-white/5 rounded-full mb-4">
            <Bot className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Autonomous Customer Support Pipeline — v4.1.0</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
            CUSTOMER <span className="text-[var(--color-primary)] not-italic">SUPPORT</span>
          </h1>
          <p className="text-slate-600 font-bold text-xs uppercase tracking-[0.2em] max-w-2xl">
            Initializing high-fidelity orchestration protocols for complex ticket vectors and neural sentiment extraction.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ── Left Column: Analysis Center ── */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Pipeline Visualizer */}
          <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-[#030303]/40 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/[0.02]">
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-emerald-400 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
            
            <div className="grid grid-cols-5 gap-4 relative z-10">
              {PIPELINE_STEPS.map((step) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative mb-4
                      ${isActive ? "bg-[var(--color-primary)] text-black shadow-[0_0_40px_rgba(163,230,53,0.25)] scale-110" : "bg-white/[0.02] text-slate-800 border border-white/5"}
                      ${isCompleted ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""}
                    `}>
                      <Icon className={`${isActive ? "w-7 h-7" : "w-5 h-5"}`} />
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-lg border-2 border-[#030303]">
                          <CheckCircle className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? "text-white" : "text-slate-700"}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Context Initialization Form */}
          <div className="glass-card p-12 rounded-[3.5rem] border-white/5 space-y-12 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-white uppercase tracking-tight italic flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-[var(--color-primary)]" />
                  INITIALIZE <span className="text-[var(--color-primary)] not-italic">CONTEXT</span>
                </h2>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-px bg-[var(--color-primary)]/20" />
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Protocol Sync Ready</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => fileInputRef.current.click()}
                   className="px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl flex items-center gap-2 transition-all group"
                 >
                    <Paperclip className="w-3.5 h-3.5 text-slate-500 group-hover:text-[var(--color-primary)] transition-colors" />
                    <span className="text-[9px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Import JSON</span>
                 </button>
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   className="hidden" 
                   accept=".json" 
                   onChange={handleFileUpload} 
                 />
                 <div className="px-4 py-2 bg-black rounded-xl border border-white/5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Pipeline Node Active</span>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Diagnostic Core</label>
                <div className="input-wrapper" style={{ borderRadius: "1.25rem", height: "3.5rem" }}>
                   <Cpu className="input-icon text-slate-700" />
                   <select className="auth-input appearance-none flex-1 font-black text-[10px] uppercase tracking-widest">
                      <option>Technical Matrix</option>
                      <option>Financial Bridge</option>
                      <option>Logistics Core</option>
                   </select>
                   <ChevronRight className="w-4 h-4 text-slate-700 rotate-90 mr-4" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Urgency Vector</label>
                <div className="flex p-1.5 bg-black rounded-2xl border border-white/5 h-14 overflow-hidden">
                   {["low", "medium", "high", "critical"].map(p => (
                     <button
                       key={p}
                       onClick={() => setPriority(p)}
                       className={`flex-1 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${
                         priority === p ? "bg-[var(--color-primary)] text-black shadow-lg" : "text-slate-700 hover:text-white"
                       }`}
                     >
                       {p}
                     </button>
                   ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Payload Header</label>
              <div className="input-wrapper" style={{ borderRadius: "1.25rem", height: "3.5rem" }}>
                <MessageSquare className="input-icon text-slate-700" />
                <input 
                  placeholder="Inbound signal signature..."
                  className="auth-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Diagnostic Stream</label>
              <textarea 
                placeholder="Detailed telemetry for neural extraction..."
                className="form-input p-6 rounded-[1.5rem] bg-black border-white/10 h-40 resize-none font-medium text-sm leading-relaxed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between pt-6">
              <div className="flex gap-6">
                 <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-500/40" />
                    <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Secured</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[var(--color-primary)] opacity-40" />
                    <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Real-time</span>
                 </div>
              </div>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary px-12 rounded-[1.25rem] h-16 shadow-[0_15px_40px_rgba(163,230,53,0.2)] hover:scale-105 transition-all text-[11px] flex gap-3 items-center group"
              >
                {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:fill-black" />}
                {loading ? "ORCHESTRATING..." : "ENGAGE ENGINE"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Column: Enrichment Logs ── */}
        <div className="lg:col-span-4 space-y-10">
          
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glass-card p-10 rounded-[3rem] bg-[var(--color-primary)]/[0.02] border-[var(--color-primary)]/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <Bot className="w-48 h-48 text-[var(--color-primary)]" />
                </div>

                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                   <div className="w-12 h-12 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-black shadow-xl">
                      <Bot className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">Neural <span className="text-[var(--color-primary)] not-italic">Enrichment</span></h3>
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1 italic">Signal Decoded Successfully</p>
                   </div>
                </div>

                <div className="space-y-10 relative z-10">
                   <div className="space-y-4">
                      <div className="p-5 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-[2rem] space-y-2">
                        <div className="text-[8px] font-black text-[var(--color-primary)] uppercase tracking-[0.4em]">Neural Insight</div>
                        <p className="text-xs text-white font-bold italic leading-relaxed">"{result.data.short_note}"</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Matrix Node</div>
                        <div className="text-white font-black uppercase text-xs truncate">{result.data.classification.category}</div>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Subcategory</div>
                        <div className="text-[var(--color-primary)] font-black text-xs uppercase tracking-widest">{result.data.classification.subcategory}</div>
                      </div>
                   </div>

                   <div className="space-y-4 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                      <div className="flex items-center gap-2 text-[8px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                        <CheckCircle className="w-3 h-3" />
                        FIX PROTOCOL: {result.data.classification.error_type}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">
                        {result.data.intelligence.fix_protocol}
                      </p>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Sentiment Vector</span>
                         <span className="text-[var(--color-primary)] text-[10px] font-bold leading-none">{result.data.intelligence.sentiment}</span>
                      </div>
                      <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden p-0.5 border border-white/5">
                         <motion.div 
                           className={`h-full rounded-full ${
                             result.data.intelligence.sentiment === 'Positive' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 
                             result.data.intelligence.sentiment === 'Negative' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 
                             'bg-[var(--color-primary)] shadow-[0_0_15px_rgba(163,230,53,0.4)]'
                           }`}
                           initial={{ width: 0 }}
                           animate={{ width: `${result.data.intelligence.confidence * 100}%` }}
                         />
                      </div>
                   </div>

                   <div className="p-6 bg-black/60 rounded-3xl border border-white/5 italic space-y-3">
                      <div className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em] flex items-center gap-2">
                         <MessageSquare className="w-3 h-3 text-[var(--color-primary)]" />
                         AI RESPONSE GENERATED
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">"{result.data.neural_response}"</p>
                   </div>

                   <div className="space-y-3 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">Diagnostics Matrix</div>
                        <div className="text-[var(--color-primary)] font-black text-xs italic tracking-tighter tabular-nums leading-none">{(result.data.intelligence.confidence * 100).toFixed(1)}% Confidence</div>
                      </div>
                      {[
                        { l: "Neural Model", v: result.diagnostics.model },
                        { l: "Webhook Latency", v: result.data.intelligence.latency },
                        { l: "Payload ID", v: result.payload_id },
                        { l: "Ticket Signature", v: result.data.ticket_id }
                      ].map((d, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-bold py-3 border-b border-white/[0.02]">
                           <span className="text-slate-600 uppercase tracking-widest">{d.l}</span>
                           <span className="text-white uppercase tabular-nums tracking-widest">{d.v}</span>
                        </div>
                      ))}
                   </div>

                   <div className="pt-6">
                      <button 
                        onClick={() => {
                          const win = window.open("", "_blank");
                          win.document.write(`<pre style="background:#000;color:#fff;padding:20px;font-family:monospace;">${result.diagnostics.orch_prompt}</pre>`);
                        }}
                        className="w-full py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] hover:bg-white/[0.05] hover:text-white transition-all"
                      >
                        VIEW ORCHESTRATION PROMPT
                      </button>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-12 text-center space-y-6 border-dashed border-white/10 opacity-30 rounded-[3rem]">
                 <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center mx-auto">
                    <Activity className="w-6 h-6 text-slate-700" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Awaiting Signal</h3>
                    <p className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em]">Telemetry history will synchronize here</p>
                 </div>
              </div>
            )}
          </AnimatePresence>

          {/* Webhook Info */}
          <div className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-blue-500/5 space-y-5">
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Webhook Payload URL</span>
                <Globe className="w-4 h-4 text-blue-500/50" />
             </div>
             <div className="p-4 bg-black/60 rounded-xl border border-white/5 font-mono text-[10px] text-blue-400 overflow-hidden truncate">
                /api/webhook/support
             </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem] border-white/5 space-y-6">
             <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-700" />
                CYCLE HISTORY
             </h3>
             <div className="space-y-4">
               {[
                 { t: "Node Fail Root", s: "CLOSED", c: "emerald-500" },
                 { t: "Sync Latency", s: "ACTIVE", c: "yellow-500" }
               ].map((h, i) => (
                 <div key={i} className="flex justify-between items-center text-[9px] font-bold group pointer-events-none">
                    <span className="text-slate-500 uppercase tracking-widest italic">{h.t}</span>
                    <span className={`text-${h.c} uppercase tracking-widest`}>{h.s}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

