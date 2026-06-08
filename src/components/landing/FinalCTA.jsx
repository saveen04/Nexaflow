"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-full bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#EC4899] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to Experience AI Support?
            </h2>
            <p className="text-white/80 text-lg mb-12">
              Join hundreds of companies transforming their booking and support flows 
              with NexaFlow AI. Start your 14-day free trial today.
            </p>
            
            <Link href="/signup">
              <button className="px-10 py-5 bg-white text-[#7C3AED] font-bold rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto group">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
