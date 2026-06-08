"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, RefreshCw, Download, Search, Filter, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects";

export default function PredictionLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prediction-logs?page=${page}&limit=${limit}`);
      const data = await res.json();
      setLogs(data.logs || []);
      setTotal(data.pagination?.total || 0);
    } catch (e) {
      console.error(e);
      // Fallback mock data if API fails or is empty
      setLogs([
        { _id: "1", ticketId: "TIC-4829", subject: "Payment deducted but ticket not booked", aiModel: "gpt-4o-mini", tokens: 842, latency: 450, confidence: 98, category: "Billing", priority: "high", createdAt: new Date().toISOString() },
        { _id: "2", ticketId: "TIC-1204", subject: "Express Bus Delay Inquiry", aiModel: "gpt-4o-mini", tokens: 620, latency: 1200, confidence: 92, category: "Bus Booking", priority: "medium", createdAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const totalPages = Math.ceil(total / limit) || 1;

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "critical": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "high": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "medium": return "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20";
      default: return "bg-slate-500/10 text-slate-400 border-white/10";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B1020] p-6 lg:p-10 space-y-8 overflow-x-hidden">
      <FloatingOrbs />
      <AnimatedGrid />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2 flex items-center gap-3">
              <ScrollText className="w-8 h-8 text-[#7C3AED]" />
              Prediction <span className="gradient-text">Logs</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-tight">Granular visibility into every AI classification and decision.</p>
          </div>
          <div className="flex gap-3">
            <button className="h-12 px-6 glass border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button onClick={fetchLogs} className="h-12 px-6 bg-[#7C3AED] text-white font-bold rounded-xl hover:bg-[#8B5CF6] transition-all text-sm flex items-center gap-2 shadow-lg shadow-purple-500/20">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="glass p-4 rounded-2xl border border-white/5 flex flex-wrap items-center gap-4">
           <div className="flex-1 min-w-[300px]">
              <div className="input-wrapper" style={{ borderRadius: "12px" }}>
                <Search className="input-icon" />
                <input
                  placeholder="Search by Ticket ID or Subject..."
                  className="auth-input"
                  style={{ height: "2.75rem" }}
                />
              </div>
           </div>
           <button className="h-11 px-6 glass border-white/10 text-slate-400 font-bold rounded-xl flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
           </button>
        </div>

        {/* Logs Table */}
        <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  {["Ticket ID", "Subject", "Model", "Tokens", "Latency", "Confidence", "Priority", "Time"].map(h => (
                    <th key={h} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                   [...Array(6)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {[...Array(8)].map((_, j) => (
                        <td key={j} className="px-6 py-4"><div className="h-4 bg-white/5 rounded-full w-full" /></td>
                      ))}
                    </tr>
                  ))
                ) : (
                  logs.map((log, i) => (
                    <motion.tr 
                      key={log._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-5">
                         <span className="font-mono text-xs font-black text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-1 rounded-lg border border-[#7C3AED]/20">
                           {log.ticketId}
                         </span>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-sm font-medium text-white truncate max-w-[200px] block">{log.subject}</span>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-xs font-mono text-slate-500">{log.aiModel}</span>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-xs font-mono text-slate-400">{log.tokens}</span>
                      </td>
                      <td className="px-6 py-5">
                         <span className={`text-xs font-mono font-bold ${log.latency < 1000 ? "text-green-400" : "text-orange-400"}`}>
                           {log.latency}ms
                         </span>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                           <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden min-w-[60px]">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${log.confidence}%` }}
                                className={`h-full rounded-full ${log.confidence > 90 ? 'bg-green-400' : 'bg-[#7C3AED]'}`}
                              />
                           </div>
                           <span className="text-[10px] font-black text-white">{log.confidence}%</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getPriorityStyle(log.priority)}`}>
                            {log.priority}
                         </span>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                           {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
             <p className="text-xs font-medium text-slate-500">
               Showing Page {page} of {totalPages}
             </p>
             <div className="flex gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
                >
                   <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
                >
                   <ChevronRight className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
