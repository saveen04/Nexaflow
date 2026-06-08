"use client"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  Tags, 
  MessageSquare, 
  AlertTriangle, 
  Paperclip, 
  Clock, 
  Bot, 
  CheckCircle,
  FileText,
  X,
  UploadCloud,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    email: "",
    summary: "",
    category: "booking",
    priority: "medium",
    description: "",
    files: []
  })
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFileDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAiResult(null)

    try {
      // Simulate/Call AI Classification
      const res = await fetch("/api/webhook/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: `TIC-${Math.floor(Math.random() * 10000)}`,
          subject: formData.summary,
          description: formData.description
        })
      })
      const data = await res.json()
      setAiResult(data.classification)
      
      // Delay to show classification success before final submission state
      setTimeout(() => {
        setIsSubmitted(true)
        setLoading(false)
      }, 2000)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen bg-[#0B1020] flex items-center justify-center p-6 lg:p-10">
        <FloatingOrbs />
        <AnimatedGrid />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-16 rounded-[4rem] border border-white/10 text-center space-y-8 relative z-10 max-w-2xl"
        >
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Ticket Created Successfully</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Your request has been classified by our neural engine and assigned to the 
            <span className="text-[#10B981] font-bold mx-1">{aiResult?.category}</span> team with 
            <span className="text-[#EC4899] font-bold mx-1">{aiResult?.priority}</span> priority.
          </p>
          <div className="pt-6">
            <button 
              onClick={() => { setIsSubmitted(false); setFormData({ email: "", summary: "", category: "booking", priority: "medium", description: "", files: [] }); setAiResult(null); }}
              className="px-8 py-4 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-bold rounded-2xl transition-all"
            >
              Back to Overview
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#0B1020] p-6 lg:p-10 space-y-10 overflow-x-hidden">
      <FloatingOrbs />
      <AnimatedGrid />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Support <span className="gradient-text">Portal</span></h1>
          </div>
          <p className="text-slate-500 font-medium text-lg">Raise tickets effortlessly. Let AI do the heavy lifting of classification.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Support Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[3.5rem] border border-white/10 space-y-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7C3AED]">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-[#7C3AED] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Category Selection</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-[#7C3AED] transition-all appearance-none"
                  >
                    <option value="booking">Booking & Reservations</option>
                    <option value="refund">Payment & Refunds</option>
                    <option value="technical">Technical Support</option>
                    <option value="account">Account Access</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Ticket Summary</label>
                <input 
                  required
                  value={formData.summary}
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  placeholder="Summarize your issue in one line"
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-[#7C3AED] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Issue Description</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Provide details about your problem..."
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white outline-none focus:border-[#7C3AED] transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Suggested Priority</label>
                  <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 gap-2">
                    {["low", "medium", "high"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData({...formData, priority: p})}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          formData.priority === p ? "bg-[#7C3AED] text-white" : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drag & Drop File Upload */}
              <div 
                onDragOver={e => e.preventDefault()}
                onDrop={handleFileDrop}
                className="relative group border-2 border-dashed border-white/10 rounded-[2.5rem] p-10 transition-all hover:border-[#7C3AED]/30 hover:bg-[#7C3AED]/5"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-[#7C3AED] transition-colors">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">Drop files here or click to upload</p>
                    <p className="text-slate-500 text-xs mt-1 font-medium">Maximum file size: 10MB</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-6">
                <p className="text-slate-500 text-xs font-medium max-w-sm">
                  Our system uses GPT-4o to analyze your ticket and route it to the fastest possible resolution channel.
                </p>
                <button 
                  disabled={loading}
                  className="px-10 h-16 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-black text-lg rounded-2xl shadow-xl shadow-purple-500/30 transition-all hover:scale-[1.02] flex items-center gap-3 disabled:opacity-50"
                >
                  {loading ? "Neural Classification..." : (
                    <>
                      Create Ticket
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* AI Intelligence Panel */}
          <div className="lg:col-span-4 space-y-6">
             <div className="glass p-8 rounded-[3rem] border border-[#7C3AED]/20 bg-[#7C3AED]/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-25 transition-opacity">
                   <Bot className="w-24 h-24 text-[#7C3AED]" />
                </div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white">
                      <Sparkles className="w-6 h-6" />
                   </div>
                   <h2 className="text-xl font-black text-white underline decoration-white/10">Active Neural Engine</h2>
                </div>
                
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-1 h-32 bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ height: [0, 128] }} transition={{ duration: 2, repeat: Infinity }} className="w-full bg-gradient-to-b from-[#7C3AED] to-[#EC4899]" />
                      </div>
                      <div className="space-y-4">
                        <div className="text-sm font-medium text-slate-400">Classification Model</div>
                        <div className="text-lg font-black text-white">GPT-4o-Mini Enterprise</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                           Latency &lt; 850ms
                        </div>
                      </div>
                   </div>
                   
                   <p className="text-slate-400 text-sm font-medium leading-relaxed italic border-t border-white/5 pt-6">
                    "AI classification helps reduce ticket wait times by up to 70% by ensuring direct-to-human routing for critical issues."
                   </p>
                </div>
             </div>

             <div className="glass p-8 rounded-[3rem] border border-white/10 space-y-8">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                   <Clock className="w-5 h-5 text-slate-500" />
                   Pending Items
                </h3>
                <div className="space-y-6">
                   {[
                    { id: "TIC-4512", subject: "Refund for Movie #9204", status: "In Process", color: "text-[#7C3AED]" },
                    { id: "TIC-3990", subject: "Express Bus Delay Claim", status: "AI Validating", color: "text-[#EC4899]" }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 pl-4 border-l-2 border-white/5 relative">
                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-white/10" />
                        <span className="text-[10px] font-black text-[#7C3AED] tracking-widest">{item.id}</span>
                        <div className="text-white font-bold text-sm truncate">{item.subject}</div>
                        <div className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</div>
                     </div>
                   ))}
                </div>
                <button className="w-full h-12 glass border-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
                   View All Tickets
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
