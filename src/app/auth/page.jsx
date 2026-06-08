"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, User, Phone, ArrowRight, ChevronLeft, Eye, EyeOff, KeyRound } from "lucide-react"
import Link from "next/link"
import { FloatingOrbs, AnimatedGrid, Aurora } from "@/components/ui/BackgroundEffects"
import { BrandLogo } from "@/components/ui/BrandLogo"

const tabs = ["Login", "Sign Up", "Forgot Password"]

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden px-4 py-16">
      <div className="absolute inset-0 z-0">
        <FloatingOrbs /><AnimatedGrid /><Aurora />
      </div>

      {/* Back home */}
      <Link href="/" className="absolute top-8 left-8 z-20 inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back Home</span>
      </Link>

      {/* Logo */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 z-20">
        <BrandLogo href="/" size="sm" />
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass rounded-[2.5rem] border border-white/8 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* Tab bar */}
          <div className="flex p-2 gap-1 bg-white/[0.02] border-b border-white/5">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`auth-tab flex-1 ${activeTab === i ? "active" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">

              {/* ── LOGIN ── */}
              {activeTab === 0 && (
                <motion.div key="login"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}
                  className="space-y-7">

                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Unlock Access</h2>
                    <p className="text-slate-500 text-sm">Enter your credentials to engage the platform.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Terminal Identity</label>
                      <div className="input-wrapper">
                        <Mail className="input-icon" />
                        <input type="email" placeholder="operator@nexaflow.ai" className="auth-input" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Access Token</label>
                        <button type="button" onClick={() => setActiveTab(2)}
                          className="text-[10px] text-[#A3E635] font-black uppercase tracking-widest hover:text-white transition-colors">
                          Forgot?
                        </button>
                      </div>
                      <div className="input-wrapper">
                        <Lock className="input-icon" />
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="auth-input pr-11" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="flex-shrink-0 mr-4 text-slate-600 hover:text-slate-300 transition-colors"
                          aria-label="Toggle password">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="remember" className="w-4 h-4 rounded bg-[#0D0D0D] border border-white/10 accent-[#A3E635] cursor-pointer flex-shrink-0" />
                      <label htmlFor="remember" className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] cursor-pointer hover:text-slate-400">
                        Maintain active session
                      </label>
                    </div>
                  </div>

                  <Link href="/dashboard" className="block">
                    <motion.button whileTap={{ scale: 0.97 }} type="button"
                      className="w-full h-13 bg-[#A3E635] text-black font-black uppercase tracking-[0.18em] rounded-2xl hover:scale-[1.02] shadow-[0_12px_30px_rgba(163,230,53,0.2)] flex items-center justify-center gap-3 group text-sm py-4">
                      Engage Core <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="h-11 rounded-xl border border-white/6 bg-white/[0.03] text-white font-black uppercase text-[9px] tracking-widest hover:bg-[#A3E635]/5 hover:border-[#A3E635]/20 transition-all">Google</button>
                    <button className="h-11 rounded-xl border border-white/6 bg-white/[0.03] text-white font-black uppercase text-[9px] tracking-widest hover:bg-[#A3E635]/5 hover:border-[#A3E635]/20 transition-all">Microsoft</button>
                  </div>

                  <p className="text-center text-slate-700 font-black uppercase text-[9px] tracking-widest">
                    No identity?{" "}
                    <button onClick={() => setActiveTab(1)} className="text-[#A3E635] hover:text-white transition-colors ml-1 border-b border-[#A3E635]/50 pb-px">
                      Register Terminal
                    </button>
                  </p>
                </motion.div>
              )}

              {/* ── SIGN UP ── */}
              {activeTab === 1 && (
                <motion.div key="signup"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}
                  className="space-y-6">

                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Create Identity</h2>
                    <p className="text-slate-500 text-sm">Initialize your enterprise credentials.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Full Operator Name</label>
                      <div className="input-wrapper">
                        <User className="input-icon" />
                        <input type="text" placeholder="John Wick" className="auth-input" />
                      </div>
                    </div>

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

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Secure Key</label>
                      <div className="input-wrapper">
                        <Lock className="input-icon" />
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="auth-input pr-11" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="flex-shrink-0 mr-4 text-slate-600 hover:text-slate-300 transition-colors" aria-label="Toggle password">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Confirm Key</label>
                      <div className="input-wrapper">
                        <Lock className="input-icon" />
                        <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="auth-input pr-11" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="flex-shrink-0 mr-4 text-slate-600 hover:text-slate-300 transition-colors" aria-label="Toggle confirm password">
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="terms" className="w-4 h-4 rounded bg-[#0D0D0D] border border-white/10 accent-[#A3E635] cursor-pointer flex-shrink-0" />
                      <label htmlFor="terms" className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] cursor-pointer hover:text-slate-400">
                        Accept neural protocols
                      </label>
                    </div>
                  </div>

                  <Link href="/dashboard" className="block">
                    <motion.button whileTap={{ scale: 0.97 }} type="button"
                      className="w-full bg-[#A3E635] text-black font-black uppercase tracking-[0.18em] rounded-2xl hover:scale-[1.02] shadow-[0_12px_30px_rgba(163,230,53,0.2)] flex items-center justify-center gap-3 group text-sm py-4">
                      Register Identity <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>

                  <p className="text-center text-slate-700 font-black uppercase text-[9px] tracking-widest">
                    Already registered?{" "}
                    <button onClick={() => setActiveTab(0)} className="text-[#A3E635] hover:text-white transition-colors ml-1 border-b border-[#A3E635]/50 pb-px">
                      Authenticate
                    </button>
                  </p>
                </motion.div>
              )}

              {/* ── FORGOT PASSWORD ── */}
              {activeTab === 2 && (
                <motion.div key="forgot"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}
                  className="space-y-7">

                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-[#A3E635]/10 rounded-2xl flex items-center justify-center mb-3">
                      <KeyRound className="w-6 h-6 text-[#A3E635]" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Reset Access</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Enter your terminal identity and we'll send a reset link to your neural inbox.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">Terminal Identity</label>
                      <div className="input-wrapper">
                        <Mail className="input-icon" />
                        <input type="email" placeholder="operator@nexaflow.ai" className="auth-input" />
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#A3E635]/5 border border-[#A3E635]/10">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Reset link expires in <span className="text-[#A3E635]">15 minutes</span>. Check spam if it doesn't arrive within 2 minutes.
                      </p>
                    </div>
                  </div>

                  <motion.button whileTap={{ scale: 0.97 }} type="button"
                    className="w-full bg-[#A3E635] text-black font-black uppercase tracking-[0.18em] rounded-2xl hover:scale-[1.02] shadow-[0_12px_30px_rgba(163,230,53,0.2)] flex items-center justify-center gap-3 group text-sm py-4">
                    Send Reset Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-center text-slate-700 font-black uppercase text-[9px] tracking-widest">
                    Remembered your key?{" "}
                    <button onClick={() => setActiveTab(0)} className="text-[#A3E635] hover:text-white transition-colors ml-1 border-b border-[#A3E635]/50 pb-px">
                      Back to Login
                    </button>
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
        <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-800 mt-5">
          End-to-End Encrypted · Neural Core v12.4
        </p>
      </motion.div>
    </div>
  )
}
