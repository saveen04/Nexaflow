"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Train, Calendar, Users, ChevronRight, Info, CheckCircle2, Search, Zap, ShieldCheck } from "lucide-react"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

const TRAIN_CLASSES = [
  { id: "1A", name: "AC First Class (1A)", price: 8.5 },
  { id: "2A", name: "AC 2-Tier (2A)", price: 5.2 },
  { id: "3A", name: "AC 3-Tier (3A)", price: 3.8 },
  { id: "SL", name: "Sleeper (SL)", price: 1.5 },
]

export default function TrainBookingPage() {
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [selectedClass, setSelectedClass] = useState(TRAIN_CLASSES[2])
  const [step, setStep] = useState(1) 
  const [searching, setSearching] = useState(false)

  const pnr = useMemo(() => Math.floor(1000000000 + Math.random() * 9000000000).toString(), [])
  const distance = useMemo(() => Math.floor(Math.random() * 1200) + 300, [source, destination])
  const fare = useMemo(() => Math.floor(distance * selectedClass.price * passengers), [distance, selectedClass, passengers])

  const handleSearch = () => {
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      setStep(2)
    }, 1500)
  }

  const handleBook = () => {
    setStep(3)
  }

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <FloatingOrbs />
      <AnimatedGrid />
      
      <div className="relative z-10 space-y-10">
        <header className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="title-xl uppercase tracking-[0.2em]">Rail <span className="gradient-text">Orchestrator</span></h1>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Initialize high-speed ticket reservations</p>
            </div>
            <div className="px-5 py-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-2xl flex items-center gap-2">
              <Train className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">Nexa-Rail Stable Link</span>
            </div>
          </div>
        </header>

        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-card p-12 rounded-[4rem] border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Departure Vector</label>
                  <div className="input-wrapper" style={{ borderRadius: "1rem" }}>
                    <Search className="input-icon" style={{ color: "var(--color-primary)" }} />
                    <input
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="Origin Station..."
                      className="auth-input"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Target Vector</label>
                  <div className="input-wrapper" style={{ borderRadius: "1rem" }}>
                    <Search className="input-icon" style={{ color: "#10b981" }} />
                    <input
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Destination Station..."
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Orchestration Point</label>
                  <div className="input-wrapper" style={{ borderRadius: "1rem" }}>
                    <Calendar className="input-icon" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="auth-input uppercase font-black text-[10px]"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Quota Logic</label>
                  <div className="relative">
                    <select className="form-input px-6 h-16 rounded-2xl appearance-none cursor-pointer font-black text-[10px] uppercase">
                      <option>General Matrix</option>
                      <option>Tatkal Priority</option>
                      <option>Ladies Quota</option>
                      <option>Premium Override</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSearch}
              disabled={!source || !destination || searching}
              className="btn-primary w-full h-18 text-[11px] uppercase tracking-[0.5em] shadow-[0_20px_50px_rgba(163,230,53,0.2)] flex items-center justify-center gap-4 transition-all hover:tracking-[0.6em]"
            >
              {searching ? (
                 <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Connect Matrix
                  <Zap className="w-5 h-5 fill-black" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Train List */}
            <div className="lg:col-span-8 space-y-6">
              {[
                { name: "Nexa Rajdhani", time: "06:00 - 14:30", duration: "8h 30m", speed: "130km/h" },
                { name: "Flow Shatabdi", time: "11:20 - 19:45", duration: "8h 25m", speed: "120km/h" },
                { name: "AI Superfast", time: "22:00 - 07:15", duration: "9h 15m", speed: "110km/h" }
              ].map((train, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="dashboard-card p-8 group border-white/5 hover:border-[var(--color-primary)]/20"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--color-primary)] transition-colors">{train.name}</div>
                      <div className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] mt-2 italic">Daily Service | Neural Express</div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-[var(--color-primary)]/5 rounded-lg border border-[var(--color-primary)]/20 shadow-[0_0_15px_rgba(163,230,53,0.05)]">
                       <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                       <span className="text-[9px] text-[var(--color-primary)] font-black uppercase tracking-widest">Verified Channel</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8 mb-10">
                     <div className="text-left">
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Initialize</div>
                       <div className="text-2xl font-black text-white tabular-nums tracking-tighter">{train.time.split(" - ")[0]}</div>
                     </div>
                     <div className="flex flex-col items-center justify-center relative">
                        <div className="text-[9px] text-[var(--color-primary)] font-black mb-2 uppercase tracking-[0.2em]">{train.duration}</div>
                        <div className="w-full h-px bg-white/5 relative">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
                        </div>
                     </div>
                     <div className="text-right">
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Terminate</div>
                       <div className="text-2xl font-black text-white tabular-nums tracking-tighter">{train.time.split(" - ")[1]}</div>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
                    {TRAIN_CLASSES.map((cls) => (
                      <button 
                        key={cls.id}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-6 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                          selectedClass.id === cls.id 
                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]" 
                            : "bg-white/[0.03] border-white/10 text-slate-500 hover:border-white/30"
                        }`}
                      >
                        {cls.name}
                        <div className={`text-[8px] mt-1 italic ${selectedClass.id === cls.id ? 'text-black/50' : 'text-slate-700'}`}>Avl: {Math.floor(Math.random()*50)+1} Slts</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar: Booking Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card p-10 rounded-[3.5rem] border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 sticky top-12 shadow-[0_0_50px_rgba(163,230,53,0.05)]">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8">Ticket <span className="text-[var(--color-primary)]">Summary</span></h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                    <span>Grade Class</span>
                    <span className="text-white">{selectedClass.id}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                    <span>Active Entities</span>
                    <span className="text-white">{passengers}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                    <span>Base Ticket</span>
                    <span className="text-white font-bold tracking-tighter">₹{fare - 150}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                    <span>Neural Link Fee</span>
                    <span className="text-white font-bold tracking-tighter">₹150</span>
                  </div>
                  <div className="h-px bg-white/5 my-6" />
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-1">Final Fee</span>
                    <span className="text-4xl font-black text-[var(--color-primary)] tracking-tighter tabular-nums leading-none">₹{fare}</span>
                  </div>
                </div>

                <button 
                  onClick={handleBook}
                  className="btn-primary w-full h-18 text-[11px] uppercase tracking-[0.5em] shadow-[0_15px_40px_rgba(163,230,53,0.2)]"
                >
                  Authorize Payment
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
            <div className="relative z-10 flex flex-col items-center space-y-10">
              <div className="w-28 h-28 bg-[var(--color-primary)] rounded-[3rem] flex items-center justify-center shadow-[0_0_60px_rgba(163,230,53,0.3)]">
                 <CheckCircle2 className="w-14 h-14 text-black" />
              </div>
              <div className="space-y-4">
                <h2 className="title-lg uppercase tracking-[0.2em]">Matrix <span className="gradient-text">Secured</span></h2>
                <p className="text-slate-500 font-medium max-w-md px-10 italic leading-relaxed text-sm">
                  Your rail orchestration hash has been permanently etched into the neural network. 
                  Manifest successfully synchronized.
                </p>
              </div>
              <div className="glass-card p-10 rounded-[3rem] border-white/5 w-full bg-[#050505]">
                 <div className="grid grid-cols-2 gap-10 text-left">
                    <div className="space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Neural Hash (PNR)</div>
                      <div className="text-3xl font-black text-[var(--color-primary)] tracking-tighter italic tabular-nums">{pnr}</div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Status</div>
                      <div className="text-lg font-black text-emerald-500 uppercase tracking-tighter">Locked & Confirmed</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Vessel/Node</div>
                      <div className="text-xl font-black text-white italic">Node B{Math.floor(Math.random()*5)+1} / Slot {Math.floor(Math.random()*60)+1}</div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">Orchestration Grade</div>
                      <div className="text-xl font-black text-white italic">{selectedClass.id} Class</div>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all"
              >
                Initialize New Booking
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
