"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Command } from "lucide-react"

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-[#0B1020]/80 backdrop-blur-md px-6 flex items-center justify-between"
    >
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Command className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">NexaFlow <span className="text-[#7C3AED]">AI</span></span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
        <Link href="#demo" className="hover:text-white transition-colors">AI Demo</Link>
        <Link href="#reviews" className="hover:text-white transition-colors">Reviews</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">Login</Link>
        <Link href="/signup">
          <button className="px-5 py-2 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white text-sm font-medium rounded-full transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            Get Started
          </button>
        </Link>
      </div>
    </motion.nav>
  )
}
