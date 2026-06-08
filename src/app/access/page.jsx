"use client"
import { motion } from "framer-motion"
import { Mail, Lock, User, ArrowRight, Zap, Target, Shield, Gauge } from "lucide-react"
import Link from "next/link"
import { FloatingOrbs, AnimatedGrid, Aurora } from "@/components/ui/BackgroundEffects"

export default function AccessPage() {
  const securityFeatures = [
    { icon: Shield, label: "AES-256 Neural Encryption", value: "Active" },
    { icon: Target, label: "Precision AI Routing", value: "99.8%" },
    { icon: Gauge, label: "Global Flow Rate", value: "14k/sec" },
  ]

  return (
    <div className="relative min-h-screen bg-[#050505] flex overflow-hidden">
      {/* LEFT SIDE: COVER */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0">
          <FloatingOrbs />
          <AnimatedGrid />
          <Aurora />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center p-20 space-y-12">
          <Link href="/" className="inline-flex items-center gap-4 group absolute top-20">
            <div className="w-12 h-12 bg-[#A3E635] rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            <span className="text-white font-black text-2xl tracking-tighter uppercase">NexaFlow Hub</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-9xl font-black text-white leading-none tracking-tighter title-black uppercase">
               SYSTEM <br /> <span className="text-[#A3E635]">ACCESS</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium max-w-xl">
               Welcome to the orchestration core. Choose your gateway to continue.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-10">
             {securityFeatures.map((f, i) => (
               <div key={i} className="flex items-center gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/5 w-fit">
                  <f.icon className="w-6 h-6 text-[#A3E635]" />
                  <div>
                    <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{f.label}</div>
                    <div className="text-white font-bold">{f.value}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Decorative Silhouette */}
        <div className="absolute -bottom-20 -right-20 w-3/4 h-3/4 opacity-10 filter blur-3xl bg-[#A3E635]/20 rounded-full" />
      </motion.div>

      {/* RIGHT SIDE: SELECT GATEWAY */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-20 relative z-20"
      >
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-black text-white tracking-tight uppercase">Identity Hub</h2>
             <p className="text-slate-500 font-medium italic italic">Select your authentication protocol</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
             <Link href="/login" className="group">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#A3E635]/30 hover:bg-[#A3E635]/5 transition-all text-center space-y-4 relative overflow-hidden">
                   <div className="text-[#A3E635] font-black text-sm uppercase tracking-[0.4em]">Gateway Alpha</div>
                   <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Authenticate</h3>
                   <p className="text-slate-600 text-sm font-medium">Existing operators only</p>
                   <div className="absolute top-4 right-4 text-white/5 group-hover:text-[#A3E635]/20 transition-colors">
                      <Lock className="w-12 h-12" />
                   </div>
                </div>
             </Link>

             <Link href="/signup" className="group">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#A3E635]/30 hover:bg-[#A3E635]/5 transition-all text-center space-y-4 relative overflow-hidden">
                   <div className="text-[#A3E635] font-black text-sm uppercase tracking-[0.4em]">Gateway Beta</div>
                   <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Initialize</h3>
                   <p className="text-slate-600 text-sm font-medium">Provision new identities</p>
                   <div className="absolute top-4 right-4 text-white/5 group-hover:text-[#A3E635]/20 transition-colors">
                      <User className="w-12 h-12" />
                   </div>
                </div>
             </Link>
          </div>

          <p className="text-center text-slate-800 font-black text-[9px] uppercase tracking-widest pt-10">
             End-to-End Encrypted Node: L-04.5.1
          </p>
        </div>
      </motion.div>
    </div>
  )
}
