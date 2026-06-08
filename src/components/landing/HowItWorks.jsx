"use client"
import { motion } from "framer-motion"
import { Ticket, CreditCard, CheckCircle2, MessageSquare, Webhook, Brain, Zap, CheckCircle } from "lucide-react"

const flowItems = [
  { title: "Book Ticket", icon: Ticket, color: "#7C3AED" },
  { title: "Payment", icon: CreditCard, color: "#9333EA" },
  { title: "Success", icon: CheckCircle2, color: "#10B981" },
  { title: "Support", icon: MessageSquare, color: "#EC4899" },
  { title: "Webhook", icon: Webhook, color: "#7C3AED" },
  { title: "OpenAI", icon: Brain, color: "#9333EA" },
  { title: "Classification", icon: Zap, color: "#EC4899" },
  { title: "Resolution", icon: CheckCircle, color: "#10B981" }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#0B1020]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter"
          >
            Seamless <span className="gradient-text">Automation</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium">
            From the moment you book a ticket to the second an issue is resolved, NexaFlow AI manages every step.
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Main Path: Booking to Success */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 relative mb-20">
            {flowItems.slice(0, 3).map((item, i) => (
              <div key={i} className="flex flex-col items-center group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-20 h-20 md:w-24 md:h-24 glass-card flex items-center justify-center mb-4 relative z-10 hover:border-[#7C3AED] transition-colors"
                >
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-[#7C3AED] transition-colors" />
                </motion.div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">{item.title}</span>
                {i < 2 && (
                  <div className="absolute top-10 md:top-12 left-[calc(100%-2rem)] w-4 md:w-12 h-px bg-white/10 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* Alternative Path: Support to Resolution */}
          <div className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12">OR</div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-12 relative w-full">
            {flowItems.slice(3).map((item, i) => (
              <div key={i} className="flex flex-col items-center group relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i + 3) * 0.1 }}
                  className="w-20 h-20 md:w-24 md:h-24 glass-card flex items-center justify-center mb-4 relative z-10 hover:border-[#EC4899] transition-colors"
                >
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-[#EC4899] transition-colors" />
                </motion.div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#EC4899]">{item.title}</span>
                
                {/* Connecting Lines */}
                {i < 4 && (
                  <div className="absolute top-10 md:top-12 left-[calc(100%-1.5rem)] md:left-[calc(100%-1rem)] w-4 md:w-12 h-px bg-white/10 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50%] bg-[#7C3AED]/5 blur-[120px] rounded-full -z-10" />
    </section>
  )
}
