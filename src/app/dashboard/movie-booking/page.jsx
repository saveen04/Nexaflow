"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Film, MapPin, Search, Calendar, ChevronRight, CheckCircle2, Ticket, QrCode } from "lucide-react"
import { FloatingOrbs } from "@/components/ui/BackgroundEffects"
import { QRCodeSVG } from "qrcode.react"

const CITIES = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai"]
const THEATRES = [
  { id: "pvr", name: "PVR: Soul Space Arena", location: "Marathahalli" },
  { id: "inox", name: "INOX: Lido Mall", location: "MG Road" },
  { id: "cinepolis", name: "Cinepolis: Royal Meenakshi Mall", location: "Bannerghatta" },
]

const SEAT_CATEGORIES = [
  { id: "standard", name: "Standard", price: 250, color: "bg-slate-800" },
  { id: "premium", name: "Premium", price: 450, color: "bg-[var(--color-primary)]" },
  { id: "vip", name: "VIP Matrix", price: 850, color: "bg-emerald-500" },
]

export default function MovieBookingPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [selectedTheatre, setSelectedTheatre] = useState(THEATRES[0])
  const [selectedMovie, setSelectedMovie] = useState("Interstellar: Enterprise Edition")
  const [selectedSeats, setSelectedSeats] = useState([])
  const [step, setStep] = useState(1) // 1: Theatre/Movie, 2: Seats, 3: Success

  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((acc, seat) => {
      const cat = SEAT_CATEGORIES.find(c => c.id === seat.type)
      return acc + (cat ? cat.price : 0)
    }, 0)
  }, [selectedSeats])

  const toggleSeat = (row, col, type) => {
    const seatId = `${row}${col}`
    const exists = selectedSeats.find(s => s.id === seatId)
    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, { id: seatId, type }])
    }
  }

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <FloatingOrbs />
      
      <div className="relative z-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <h1 className="title-xl uppercase tracking-[0.2em] font-black leading-none">Cine <span className="gradient-text">Orchestrator</span></h1>
            <div className="flex items-center gap-6">
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] leading-none">Initializing cinematic experience protocols — v4.0</p>
              <div className="w-16 h-0.5 bg-white/5" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">Neural Link Sync: 100%</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-[#EC4899]/5 border border-[#EC4899]/20 rounded-2xl flex items-center gap-4 group hover:bg-[#EC4899]/10 transition-all cursor-pointer">
            <div className="p-2 bg-[#EC4899]/20 rounded-lg group-hover:scale-110 transition-transform">
              <Film className="w-5 h-5 text-[#EC4899]" />
            </div>
            <div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] block mb-0.5">Cine-Matrix</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Terminal Active</span>
            </div>
          </div>
        </header>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-10">
              <div className="glass-card p-12 rounded-[4rem] border-white/5 space-y-10 bg-white/[0.01]">
                <div className="space-y-10">
                  <div className="space-y-5">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1 flex items-center gap-3">
                      <MapPin className="w-4 h-4" />
                      Vector Location
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                       {CITIES.map(city => (
                         <button 
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-5 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                            selectedCity === city ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-black shadow-lg scale-[1.02]" : "bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/20 hover:text-white"
                          }`}
                         >
                           {city}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1 flex items-center gap-3">
                      <ChevronRight className="w-4 h-4" />
                      Theatre Matrix
                    </label>
                    <div className="space-y-4">
                      {THEATRES.map(t => (
                        <div 
                          key={t.id}
                          onClick={() => setSelectedTheatre(t)}
                          className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer group relative overflow-hidden ${
                            selectedTheatre.id === t.id ? "bg-[var(--color-primary)]/5 border-[var(--color-primary)]/40 shadow-xl" : "bg-black/20 border-white/5 hover:border-white/10"
                          }`}
                        >
                          {selectedTheatre.id === t.id && (
                            <motion.div layoutId="theatre-glow" className="absolute inset-0 bg-[var(--color-primary)]/5 blur-xl pointer-events-none" />
                          )}
                          <div className={`text-sm font-black uppercase tracking-tighter transition-colors relative z-10 ${selectedTheatre.id === t.id ? 'text-[var(--color-primary)]' : 'text-white'}`}>{t.name}</div>
                          <div className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-2 italic relative z-10 group-hover:text-slate-400 transition-colors flex items-center gap-2">
                             <div className={`w-1 h-1 rounded-full ${selectedTheatre.id === t.id ? 'bg-[var(--color-primary)]' : 'bg-slate-800'}`} />
                             {t.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
               <div className="glass-card p-12 rounded-[5rem] border-white/5 h-full relative overflow-hidden group bg-[#020202]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80" />
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <Film className="w-64 h-64 text-white" />
                  </div>

                  <div className="relative z-20 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Live <span className="text-[var(--color-primary)]">Stream Matrix</span></h3>
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Neural Encryption Level: ALPHA</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-white px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-xl uppercase tracking-[0.2em] animate-pulse flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          Now Projecting
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">
                       <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden group border border-white/5 bg-slate-900 shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="absolute inset-0 flex items-center justify-center p-8 z-30">
                             <button 
                              onClick={() => setStep(2)}
                              className="btn-primary px-10 h-14 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_20px_50px_rgba(163,230,53,0.3)]"
                             >
                               Lock Seats
                             </button>
                          </div>
                          <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
                             <Film className="w-16 h-16 text-slate-700 group-hover:text-[var(--color-primary)] transition-colors duration-500" />
                             <div className="space-y-1">
                               <div className="text-2xl font-black text-white uppercase tracking-tighter italic">{selectedMovie}</div>
                               <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Sci-Fi | Neural Matrix | 4K-Ops</div>
                             </div>
                          </div>
                       </div>
                       <div className="space-y-8">
                          <div className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-[#050505] space-y-6">
                             <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Sync Schedule</h4>
                             <div className="grid grid-cols-2 gap-4">
                                {["10:30 AM", "02:15 PM", "06:30 PM", "10:00 PM"].map(time => (
                                  <button key={time} className="h-12 bg-white/[0.03] hover:bg-[var(--color-primary)] hover:text-black border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                    {time}
                                  </button>
                                ))}
                             </div>
                          </div>
                          <div className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-[#050505] space-y-4">
                             <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Neural Summary</h4>
                             <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic border-l-2 border-[var(--color-primary)]/30 pl-4 py-2">
                               In a future where resources are scarce, a team of explorers 
                               orchestrate a wormhole traversal in a critical attempt to ensure 
                               humanity's terminal survival plan.
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="glass-card p-16 rounded-[5rem] border-white/5 relative overflow-hidden bg-[#020202]">
               <div className="absolute inset-0 bg-[var(--color-primary)]/5 opacity-10" />
               {/* Screen Label */}
               <div className="text-center mb-24 relative z-10">
                  <div className="w-full h-2 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent rounded-full shadow-[0_0_30px_rgba(163,230,53,0.5)] opacity-50" />
                  <div className="text-[10px] text-white font-black uppercase tracking-[0.6em] mt-6 italic">Neural Projection Screen</div>
               </div>

               {/* Seat Grid */}
               <div className="grid grid-cols-10 gap-5 place-items-center mb-24 relative z-10 px-10">
                  {Array.from({ length: 6 }).map((_, r) => (
                    Array.from({ length: 10 }).map((_, c) => {
                      const type = r < 2 ? "vip" : r < 4 ? "premium" : "standard"
                      const seatId = `${String.fromCharCode(65 + r)}${c + 1}`
                      const isSelected = selectedSeats.find(s => s.id === seatId)
                      const cat = SEAT_CATEGORIES.find(cat => cat.id === type)
                      
                      return (
                        <motion.button 
                          key={seatId}
                          whileHover={{ scale: 1.3, rotate: 5 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggleSeat(String.fromCharCode(65 + r), c + 1, type)}
                          className={`w-8 h-8 rounded-lg transition-all border ${
                            isSelected ? "bg-white border-white shadow-[0_0_20px_#fff] scale-110" : `${cat.color} border-white/5 opacity-20 hover:opacity-100 hover:border-[var(--color-primary)]/40`
                          }`}
                          title={`Seat ${seatId} (${cat.name})`}
                        />
                      )
                    })
                  ))}
               </div>

               {/* Legend */}
               <div className="flex justify-center flex-wrap gap-10 relative z-10 mb-4">
                  {SEAT_CATEGORIES.map(cat => (
                    <div key={cat.id} className="flex items-center gap-3 group">
                       <div className={`w-4 h-4 rounded-md ${cat.color} group-hover:scale-125 transition-transform duration-300 shadow-xl`} />
                       <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">{cat.name} <span className="text-[var(--color-primary)] ml-1">₹{cat.price}</span></span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex items-center justify-between glass-card p-10 rounded-[3.5rem] border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 shadow-[0_0_50px_rgba(163,230,53,0.05)]">
               <div className="space-y-1 pl-6">
                  <div className="text-[10px] text-slate-700 font-black uppercase tracking-[0.4em] mb-1 italic">Total Orchestration Fee</div>
                  <div className="text-5xl font-black text-white tabular-nums tracking-tighter">₹{totalAmount}</div>
                  <div className="text-[9px] text-[var(--color-primary)] font-black uppercase tracking-widest mt-2 border-l border-[var(--color-primary)]/30 pl-3">
                    {selectedSeats.length > 0 ? `${selectedSeats.length} neural slots locked` : "Initialize seat mapping"}
                  </div>
               </div>
               <div className="flex gap-6 pr-6">
                  <button onClick={() => setStep(1)} className="btn-secondary h-16 px-10 text-[10px] uppercase font-black tracking-[0.2em]">
                    Abort
                  </button>
                  <button 
                    disabled={selectedSeats.length === 0}
                    onClick={() => setStep(3)} 
                    className="btn-primary h-16 px-14 text-[10px] uppercase font-black tracking-[0.3em] shadow-[0_20px_50px_rgba(163,230,53,0.3)] disabled:opacity-30 disabled:grayscale transition-all hover:tracking-[0.4em]"
                  >
                    Authorize Sync
                  </button>
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto glass-card p-16 rounded-[5rem] border-[var(--color-primary)]/20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--color-primary)]/5 opacity-10" />
            <div className="relative z-10 flex flex-col items-center space-y-12">
              <div className="w-28 h-28 bg-[var(--color-primary)] rounded-[3rem] flex items-center justify-center shadow-[0_0_60px_rgba(163,230,53,0.3)]">
                 <CheckCircle2 className="w-14 h-14 text-black" />
              </div>
              <div className="space-y-4">
                <h2 className="title-lg uppercase tracking-[0.2em]">Manifest <span className="gradient-text">Synchronized</span></h2>
                <p className="text-slate-500 font-medium max-w-sm px-8 italic leading-relaxed text-sm">
                  Your cinematic orchestration is fully decrypted. 
                  Validate the following hash at the terminal entrance.
                </p>
              </div>
              
              <div className="bg-white p-10 rounded-[4rem] inline-block mb-10 shadow-[0_0_80px_rgba(255,255,255,0.15)] group hover:scale-105 transition-transform duration-500">
                 <QRCodeSVG 
                  value={`MOOV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`} 
                  size={220}
                  fgColor="#000000"
                  level="H"
                 />
              </div>

              <div className="glass-card p-10 rounded-[3.5rem] border-white/5 text-left w-full bg-[#050505]">
                 <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Projection ID</div>
                      <div className="text-xl font-black text-white italic tracking-tighter uppercase">{selectedMovie.split(":")[0]}</div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Theatre Node</div>
                      <div className="text-xl font-black text-white italic tracking-tighter uppercase">{selectedTheatre.id} Terminal</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Locked Slots</div>
                      <div className="text-2xl font-black text-[var(--color-primary)] italic tracking-tighter tabular-nums">{selectedSeats.map(s => s.id).join(", ")}</div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Total Deduct</div>
                      <div className="text-2xl font-black text-white tabular-nums tracking-tighter">₹{totalAmount}</div>
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => setStep(1)}
                className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.3em] hover:tracking-[0.5em] transition-all"
              >
                Reset Cine-Matrix
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
