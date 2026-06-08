"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bus, Train, Film, Search, Filter, Calendar, MapPin, ChevronRight, User } from "lucide-react"

const categories = [
  { id: "bus", name: "Bus", icon: Bus },
  { id: "train", name: "Train", icon: Train },
  { id: "movie", name: "Movie", icon: Film },
]

const bookings = [
  { id: "TX-9482", category: "bus", title: "Purple Express", route: "New York -> Boston", date: "June 12, 2026", status: "confirmed", price: "$45" },
  { id: "TX-9483", category: "train", title: "Nebula Rail", route: "San Francisco -> LA", date: "June 14, 2026", status: "pending", price: "$85" },
  { id: "TX-9484", category: "movie", title: "Avengers: Secret Wars", route: "IMAX Theater 4", date: "Tonight, 8:00 PM", status: "confirmed", price: "$22" },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("bus")
  const [search, setSearch] = useState("")

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="title-xl uppercase tracking-[0.2em]">Booking <span className="gradient-text">Center</span></h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Initialize neural ticket orchestration — v1.0.4</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="input-wrapper" style={{ borderRadius: "12px", width: "16rem" }}>
            <Search className="input-icon" />
            <input
              type="text"
              placeholder="Search Identity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="auth-input"
              style={{ height: "2.75rem" }}
            />
          </div>
          <button className="btn-secondary h-11 px-4 flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 p-2 glass-card w-fit rounded-2xl border-white/5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`
              flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative group
              ${activeTab === cat.id ? "text-black" : "text-slate-500 hover:text-white"}
            `}
          >
            {activeTab === cat.id && (
              <motion.div 
                layoutId="active-tab"
                className="absolute inset-0 bg-[var(--color-primary)] rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.3)]"
              />
            )}
            <cat.icon className={`w-4 h-4 relative z-10 ${activeTab === cat.id ? 'text-black' : 'group-hover:text-[var(--color-primary)]'} transition-colors`} />
            <span className="relative z-10">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {bookings
            .filter(b => b.category === activeTab)
            .map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1 }}
                className="dashboard-card group cursor-pointer border-white/5 hover:border-[var(--color-primary)]/30"
              >
                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 group-hover:scale-110 transition-all duration-500">
                      {booking.category === 'bus' ? <Bus className="w-7 h-7" /> : booking.category === 'train' ? <Train className="w-7 h-7" /> : <Film className="w-7 h-7" />}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border ${booking.status === 'confirmed' ? 'text-[var(--color-primary)] border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10' : 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10'}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--color-primary)] transition-colors">{booking.title}</h3>
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                        <span>{booking.route}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar className="w-3 h-3 text-[var(--color-primary)]" />
                        <span>{booking.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                    <div>
                      <span className="text-slate-600 font-black uppercase tracking-[0.2em] text-[9px] block mb-1">Fee Orchestrated</span>
                      <span className="text-white font-black text-2xl tracking-tighter tabular-nums">{booking.price}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
