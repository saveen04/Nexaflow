"use client"
import { motion } from "framer-motion"
import { CheckCircle2, Ticket, Calendar, MapPin, Share2, Download, ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

export default function BookingSuccessPage() {
  return (
    <div className="relative min-h-screen bg-[#0B1020] flex items-center justify-center p-6 overflow-hidden">
      <FloatingOrbs />
      <AnimatedGrid />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 glass p-12 md:p-20 rounded-[4rem] border border-white/10 text-center space-y-10 max-w-4xl shadow-2xl shadow-purple-500/10"
      >
        {/* Success Animation */}
        <div className="relative mx-auto w-32 h-32">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="w-full h-full bg-emerald-500/10 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-400" />
          </motion.div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-emerald-500/20 rounded-full"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tighter">Booking <span className="text-emerald-400">Confirmed!</span></h1>
          <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Your journey with <span className="text-white font-bold">NexaFlow AI</span> begins. We've sent a detailed itinerary and digital ticket to your registered email.
          </p>
        </div>

        {/* Digital Ticket Representation */}
        <div className="relative glass bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-left grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Ticket className="w-48 h-48 text-white rotate-12" />
           </div>
           <div className="space-y-6 relative z-10">
              <div className="space-y-1">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7C3AED]">Ticket ID</div>
                 <div className="font-mono text-xl font-black text-white">NX-8294029482</div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Mumbai Central → Bangalore City</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#EC4899]" />
                    <span className="text-sm font-bold text-white">12th June, 2026 · 09:30 AM</span>
                 </div>
              </div>
           </div>
           <div className="flex flex-col justify-between items-end relative z-10">
              <div className="text-right">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Seat Number</div>
                 <div className="text-4xl font-black text-white">A-42</div>
              </div>
              <div className="flex gap-2">
                 <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
                    <Download className="w-4 h-4" />
                 </button>
                 <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
                    <Share2 className="w-4 h-4" />
                 </button>
              </div>
           </div>
           
           {/* Abstract separator */}
           <div className="absolute left-0 right-0 h-1 border-t-2 border-dashed border-white/5 top-[180px] hidden md:block" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Link href="/dashboard" className="w-full sm:w-auto h-16 px-10 glass border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
              <Home className="w-5 h-5" />
              Return Home
           </Link>
           <Link href="/bookings" className="w-full sm:w-auto h-16 px-10 bg-[#7C3AED] text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-[#8B5CF6] transition-all shadow-xl shadow-purple-500/20">
              New Booking
              <ChevronRight className="w-5 h-5" />
           </Link>
        </div>
      </motion.div>
    </div>
  )
}
