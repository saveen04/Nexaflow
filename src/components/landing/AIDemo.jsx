"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, Webhook, CheckCircle, ArrowRight } from "lucide-react"

export function AIDemo() {
  const [inputText, setInputText] = useState("My payment was deducted but ticket wasn't booked.")
  const [logs, setLogs] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleClassify = async () => {
    if (isProcessing) return
    setIsProcessing(true)
    setLogs([])
    
    const steps = [
      { text: `User: ${inputText}`, type: "input" },
      { text: "Webhook: Triggering AI Classification Flow...", type: "webhook" },
      { text: "AI: Analyzing sentiment and priority...", type: "ai" },
    ]

    for (let i = 0; i < steps.length; i++) {
      setLogs(prev => [...prev, steps[i]])
      await new Promise(r => setTimeout(r, 800))
    }

    try {
      // Simulate/Call AI logic
      const result = {
        category: inputText.toLowerCase().includes('bus') ? 'Bus Booking' : 'General Support',
        priority: inputText.toLowerCase().includes('urgent') || inputText.toLowerCase().includes('failed') ? 'High' : 'Medium',
        confidence: 96 + Math.floor(Math.random() * 4)
      }
      
      setLogs(prev => [...prev, { 
        text: `Result: ${result.category} | ${result.priority} Priority | Confidence: ${result.confidence}%`, 
        type: "result" 
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    handleClassify()
  }, [])

  return (
    <section id="demo" className="py-24 relative bg-[#0F172A]/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Watch AI in <span className="gradient-text">Action</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Experience real-time classification. Enter a sample ticket below to see how NexaFlow AI instantly understands the severity and context.
            </p>
            
            <div className="relative mb-6">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a sample issue..."
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 pr-32 text-white focus:border-[#7C3AED] outline-none"
              />
              <button 
                onClick={handleClassify}
                disabled={isProcessing}
                className="absolute right-2 top-2 h-10 px-4 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50"
              >
                {isProcessing ? "Classifying..." : "Try it out"}
              </button>
            </div>

            <div className="space-y-4">
              {[
                "OpenAI GPT-4o Powered",
                "Real-time Webhook Integration",
                "99.9% Classification Accuracy",
                "Automatic Priority Escalation"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="w-full aspect-[4/3] glass rounded-[2.5rem] border border-white/10 p-4 shadow-2xl overflow-hidden">
              <div className="h-full w-full bg-black/60 rounded-[1.8rem] p-6 font-mono text-xs md:text-sm overflow-hidden relative">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-slate-500 ml-4">nexaflow-ai-demo.sh</span>
                </div>

                {/* Demo Content */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {logs.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex gap-3 ${s.type === 'result' ? 'text-green-400 font-bold' : s.type === 'webhook' ? 'text-blue-400' : s.type === 'ai' ? 'text-purple-400' : 'text-slate-300'}`}
                      >
                        <span className="text-slate-600">$</span>
                        <span className="break-words">{s.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isProcessing && (
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-[#7C3AED] ml-6"
                    >
                      _
                    </motion.div>
                  )}
                </div>

                {/* Processing Overlay */}
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center bg-[#0B1020]/20"
                  >
                    <div className="w-32 h-32 bg-[#7C3AED]/10 blur-3xl animate-pulse" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Floating Badge */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute -top-6 -right-6 px-4 py-3 glass rounded-2xl border border-[#7C3AED]/30 flex items-center gap-3 backdrop-blur-xl z-30 shadow-2xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#7C3AED] animate-bounce" />
                  </div>
                  <span className="text-white font-bold text-xs">AI NEURAL PROCESSING</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
