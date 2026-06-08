"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Webhook,
  Play,
  Trash2,
  Cpu,
  BarChart2,
  Activity,
  Zap,
  Code,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Terminal,
  Save,
  Brain
} from "lucide-react"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

export default function WebhookTestingPage() {
  const [jsonPayload, setJsonPayload] = useState(`{
  "ticketId": "TX-${Math.floor(Math.random() * 10000)}",
  "subject": "Payment issue on Express Bus",
  "description": "My payment of ₹1200 was deducted but I didn't receive a ticket confirmation for the Mumbai to Pune route.",
  "model": "gpt-4o-mini"
}`)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState([
    { id: 1, type: "POST", endpoint: "/api/webhook/classify", status: 200, time: "142ms", timestamp: "12:45:02" },
    { id: 2, type: "POST", endpoint: "/api/webhook/classify", status: 200, time: "890ms", timestamp: "11:30:15" },
  ])

  const handleTrigger = async () => {
    setLoading(true)
    setResponse(null)
    try {
      const parsed = JSON.parse(jsonPayload)
      const res = await fetch("/api/webhook/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed)
      })
      const data = await res.json()
      setResponse(data)
      setLogs(prev => [{
        id: Date.now(),
        type: "POST",
        endpoint: "/api/webhook/classify",
        status: 200,
        time: `${data.meta?.latency || 0}ms`,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev])
    } catch (e) {
      setResponse({ error: "Invalid JSON or Request Failed", details: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <FloatingOrbs />
      <AnimatedGrid />

      <div className="relative z-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <h1 className="title-xl uppercase flex items-center gap-4">
              <Terminal className="w-10 h-10 text-[var(--color-primary)]" />
              Dev <span className="gradient-text">Console</span>
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Test neural classification endpoints — protocol v12.4</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-secondary flex items-center gap-2 group">
              <Save className="w-4 h-4 group-hover:text-[var(--color-primary)] transition-colors" />
              Store Token
            </button>
            <button
              onClick={handleTrigger}
              disabled={loading}
              className="btn-primary flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
              Dispatch Payload
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px]">
          {/* JSON Editor Panel */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em]">Payload Matrix</span>
              <span className="text-[10px] font-black uppercase text-[var(--color-primary)] tracking-[0.2em]">POST /classify</span>
            </div>
            <div className="flex-1 glass-card relative overflow-hidden group">
              <textarea
                value={jsonPayload}
                onChange={e => setJsonPayload(e.target.value)}
                className="w-full h-full bg-transparent p-8 font-mono text-sm text-[var(--color-primary)] focus:text-white outline-none resize-none selection:bg-[var(--color-primary)]/20 transition-colors"
                spellCheck={false}
              />
              <div className="absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Code className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Response & AI Logs */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Result Inspector */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em]">Neural Output</span>
                  {response && (
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-mono ${response.error ? "text-[var(--color-critical)]" : "text-[var(--color-primary)]"}`}>
                      {response.error ? "ERR_LOG" : "HTTP_200"}
                    </span>
                  )}
                </div>
                <div className="flex-1 glass-card p-8 font-mono text-xs overflow-y-auto no-scrollbar">
                  {loading ? (
                    <div className="h-full flex items-center justify-center space-y-4 flex-col">
                      <div className="w-12 h-12 border-4 border-[var(--color-primary)]/10 border-t-[var(--color-primary)] rounded-full animate-spin" />
                      <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Processing Matrix...</p>
                    </div>
                  ) : response ? (
                    <pre className="text-slate-300 whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                      <Webhook className="w-14 h-14 text-slate-600" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Awaiting Signal...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Insights Panel */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em]">AI Intelligence</span>
                  <Zap className="w-4 h-4 text-[var(--color-primary)] animate-pulse" />
                </div>
                <div className="flex-1 glass-card p-10 space-y-8 overflow-y-auto no-scrollbar">
                  {response?.classification ? (
                    <div className="space-y-8">
                      <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 p-5 rounded-2xl flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">Predicted Class</div>
                          <div className="text-xl font-black text-white uppercase italic">{response.classification.category}</div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                          <span>Confidence Metric</span>
                          <span className="text-white font-mono">{response.classification.confidence}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${response.classification.confidence}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)]"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Neural Logic</span>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium italic border-l-2 border-[var(--color-primary)]/30 pl-6">
                          {response.classification.reasoning}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Suggested Action Tokens</span>
                        <div className="flex flex-wrap gap-2">
                          {response.classification.suggestedActions.map((act, i) => (
                            <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 hover:text-white hover:border-[var(--color-primary)]/30 transition-all cursor-default">
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                      <Brain className="w-14 h-14 text-slate-600" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Cognitive logs pending</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="h-60 glass-card p-8 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-6 px-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Request Pipeline</h4>
                <button 
                  onClick={() => setLogs([])}
                  className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] hover:text-white transition-colors"
                >
                  Purge Cache
                </button>
              </div>
              <div className="space-y-3 overflow-y-auto pr-2 no-scrollbar">
                {logs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all hover:border-[var(--color-primary)]/10 group">
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-black text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-lg border border-[var(--color-primary)]/10">{log.type}</span>
                      <span className="text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors">{log.endpoint}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-xs font-mono text-slate-600 group-hover:text-[var(--color-primary)] transition-colors italic">{log.time}</span>
                      <span className="text-[10px] font-black text-slate-700 uppercase tabular-nums tracking-widest">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RefreshCw({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}
