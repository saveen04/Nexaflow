"use client"
import { motion } from "framer-motion"
import { Ticket, Brain, BarChart3, Webhook, Activity, CreditCard } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    title: "Unified Booking System",
    icon: Ticket,
    color: "#7C3AED",
    description: "Manage Bus, Train, and Movie bookings from a single, high-performance interface."
  },
  {
    title: "AI Ticket Classification",
    icon: Brain,
    color: "#9333EA",
    description: "Intelligent issue categorization and sentiment analysis using advanced LLMs."
  },
  {
    title: "Analytics Dashboard",
    icon: BarChart3,
    color: "#EC4899",
    description: "Gain deep insights into booking trends, revenue metrics, and AI performance."
  },
  {
    title: "Webhook Automation",
    icon: Webhook,
    color: "#7C3AED",
    description: "Seamlessly connect your business ecosystem with real-time event triggers."
  },
  {
    title: "Real-Time Monitoring",
    icon: Activity,
    color: "#9333EA",
    description: "Monitor system health, latency, and classification accuracy in real-time."
  },
  {
    title: "Integrated Payments",
    icon: CreditCard,
    color: "#EC4899",
    description: "Secure and fast payments with integrated Razorpay checkout and UPI support."
  }
]

export function FeatureShowcase() {
  const [scrollX, setScrollX] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
        if (scrollLeft + clientWidth >= scrollWidth) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          containerRef.current.scrollBy({ left: 300, behavior: "smooth" })
        }
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#0B1020]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter"
          >
            District-Inspired <span className="gradient-text">Excellence</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium">
            A premium feature showcase inspired by modern high-performance SaaS interfaces.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-12 gap-6 no-scrollbar snap-x scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -15, 
                rotateY: 10,
                rotateX: -5,
                borderColor: "rgba(124, 58, 237, 0.4)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(124, 58, 237, 0.2)"
              }}
              style={{ perspective: "1000px" }}
              className="flex-shrink-0 w-80 h-[380px] glass-card p-10 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7C3AED]/10 blur-3xl rounded-full group-hover:bg-[#7C3AED]/20 transition-colors" />
              
              <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-2xl flex items-center justify-center mb-8 shadow-[0_8px_16px_rgba(124,58,237,0.3)] group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#7C3AED] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>

              <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-[#7C3AED] text-xs font-bold uppercase tracking-widest">
                  Learn More <span className="text-lg">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
