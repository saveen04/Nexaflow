"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, Phone, ArrowRight, ChevronLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { FloatingOrbs, AnimatedGrid, Aurora } from "@/components/ui/BackgroundEffects"
import { BrandLogo } from "@/components/ui/BrandLogo"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row">

      {/* ══ LEFT PANEL ══ */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative border-r border-white/5 min-h-screen flex-col"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <FloatingOrbs /><AnimatedGrid /><Aurora />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <img src="/images/hero_character.png" alt="" className="w-full h-full object-cover object-center opacity-15 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full px-10 xl:px-16 py-12">
          <BrandLogo href="/" size="md" />

          <div className="space-y-6 py-10">
            <div className="px-4 py-2 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/5 inline-flex">
              <span className="text-[#A3E635] text-[10px] font-black uppercase tracking-[0.4em]">Registering Neural Host v1.0</span>
            </div>
            <div className="space-y-1">
              <h1 className="font-black text-white uppercase tracking-tighter leading-none title-black"
                  style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)" }}>
                Join the
              </h1>
              <h1 className="font-black uppercase tracking-tighter leading-none title-black"
                  style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)", color: "#1e293b" }}>
                Identity
              </h1>
            </div>
            <p className="text-lg text-slate-500 font-medium max-w-md leading-relaxed">
              Initialize your presence in the orchestration pool and{" "}
              <span className="text-[#A3E635]">automation network</span>.
            </p>
          </div>

          <div className="flex items-center gap-8 border-t border-white/5 pt-8">
            <div>
              <div className="text-2xl font-black text-white uppercase tracking-tighter">Instant</div>
              <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">Provisioning</div>
            </div>
            <div className="w-px h-7 bg-white/5" />
            <div>
              <div className="text-2xl font-black text-white uppercase tracking-tighter">Global</div>
              <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">Availability</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══ RIGHT PANEL ══ */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center items-center min-h-screen px-6 py-12 sm:px-10 md:px-14"
      >
        <div className="w-full max-w-sm space-y-6">

          <Link href="/" className="lg:hidden inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Return Home</span>
          </Link>

          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Create Identity</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-sm">Initialize your enterprise credentials.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Full Operator Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input type="text" placeholder="John Wick" className="auth-input" />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Email</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input type="email" placeholder="john@nexaflow.ai" className="auth-input" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Phone</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" />
                  <input type="tel" placeholder="+91 000 0000" className="auth-input" />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Secure Key</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="auth-input pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                  aria-label="Toggle password">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Confirm Key</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input type="password" placeholder="••••••••" className="auth-input" />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-3 pt-1">
              <input type="checkbox" id="terms"
                className="w-4 h-4 rounded bg-[#0D0D0D] border border-white/10 accent-[#A3E635] cursor-pointer flex-shrink-0" />
              <label htmlFor="terms" className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] cursor-pointer hover:text-slate-400">
                Accept neural protocols
              </label>
            </div>

            {/* CTA */}
            <Link href="/dashboard" className="block pt-1">
              <motion.button whileTap={{ scale: 0.97 }} type="button"
                className="w-full bg-[#A3E635] text-black font-black uppercase tracking-[0.18em] rounded-2xl
                           hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(163,230,53,0.25)]
                           shadow-[0_12px_30px_rgba(163,230,53,0.18)] flex items-center justify-center gap-3 group text-sm py-4">
                Register Identity
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </form>

          <p className="text-center text-slate-700 font-black uppercase text-[9px] tracking-widest">
            Identity exists?{" "}
            <Link href="/login" className="text-[#A3E635] hover:text-white transition-colors border-b border-[#A3E635]/50 pb-px ml-1">
              Authenticate Terminal
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
