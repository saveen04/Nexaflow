"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Ticket, Bus, Train, Film, Search, Filter, Calendar, ChevronRight } from "lucide-react"
import { FloatingOrbs } from "@/components/ui/BackgroundEffects"
import { formatDate } from "@/lib/utils"

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    // Simulated fetch with history
    setTimeout(() => {
      setBookings([
        { id: "TIC-8821", type: "bus", title: "Bangalore to Mumbai", date: "2026-06-15", fare: 1850, status: "confirmed" },
        { id: "TIC-4492", type: "train", title: "Nexa Rajdhani (1A)", date: "2026-06-16", fare: 4200, status: "confirmed" },
        { id: "TIC-3105", type: "movie", title: "Interstellar: IMAX", date: "2026-06-12", fare: 450, status: "confirmed" },
        { id: "TIC-9901", type: "bus", title: "Mumbai to Pune", date: "2026-06-10", fare: 650, status: "cancelled" },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredBookings = bookings.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleCancel = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "cancelled" } : b))
  }

  const getIcon = (type) => {
    switch (type) {
      case "bus": return Bus
      case "train": return Train
      case "movie": return Film
      default: return Ticket
    }
  }

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <FloatingOrbs />
      
      <div className="relative z-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <h1 className="title-xl uppercase tracking-[0.2em]">Matrix <span className="gradient-text">History</span></h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Review legacy ticket orchestration chains</p>
          </div>
          <div className="flex gap-4">
             <div className="input-wrapper" style={{ borderRadius: "12px", width: "16rem" }}>
                <Search className="input-icon" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Hash..."
                  className="auth-input"
                  style={{ height: "2.75rem" }}
                />
             </div>
             <button className="btn-secondary h-11 px-4 flex items-center justify-center">
                <Filter className="w-5 h-5" />
             </button>
          </div>
        </header>

        <div className="space-y-6">
          {loading ? (
             [1,2,3].map(i => <div key={i} className="h-28 w-full glass-card rounded-3xl animate-pulse" />)
          ) : (
            <>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, i) => {
                  const Icon = getIcon(booking.type)
                  return (
                    <motion.div 
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="dashboard-card p-6 flex items-center gap-8 group hover:border-[var(--color-primary)]/20"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-8 h-8" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{booking.id}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-700" />
                          <span className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest">{booking.status}</span>
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter truncate group-hover:text-[var(--color-primary)] transition-colors">{booking.title}</h3>
                      </div>

                      <div className="text-center px-10 border-x border-white/5 hidden md:block">
                         <div className="flex items-center justify-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                            <Calendar className="w-3 h-3 text-[var(--color-primary)]" />
                            <span>Timestamp</span>
                         </div>
                         <div className="text-white font-black text-sm uppercase tracking-tighter">{formatDate(booking.date)}</div>
                      </div>

                      <div className="text-right min-w-[120px] px-10 border-l border-white/5">
                         <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">Fee Extract</div>
                         <div className={`text-2xl font-black tabular-nums tracking-tighter ${booking.status === 'cancelled' ? 'text-slate-700 line-through' : 'text-white'}`}>₹{booking.fare}</div>
                      </div>

                      <div className="flex items-center gap-4">
                        {booking.status === "confirmed" && (
                          <button 
                            onClick={() => handleCancel(booking.id)}
                            className="h-12 px-6 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all"
                          >
                             Abort
                          </button>
                        )}
                        <button className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                           <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <div className="p-20 glass rounded-[2rem] text-center space-y-4">
                   <div className="text-slate-700 font-black text-xs uppercase tracking-[0.3em]">No Historical Traces Found</div>
                   <p className="text-slate-600 text-[10px] uppercase font-bold">Try adjusting your search signature</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
