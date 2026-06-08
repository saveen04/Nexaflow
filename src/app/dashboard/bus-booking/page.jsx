"use client"
import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, Users, Bus, ChevronRight, Info, CheckCircle2 } from "lucide-react"
import { FloatingOrbs } from "@/components/ui/BackgroundEffects"

// Dynamic import for Leaflet (SSR fix)
const BookingMap = dynamic(() => import("@/components/booking/BookingMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-950 animate-pulse rounded-[3rem] border border-white/5 flex items-center justify-center text-slate-700 font-black uppercase tracking-[0.2em] text-[10px]">Initializing Map Matrix...</div>
})

const BUS_TYPES = [
  { id: "ordinary", name: "Ordinary", price: 1.2, icon: Bus },
  { id: "express", name: "Express", price: 1.8, icon: Bus },
  { id: "ac-sleeper", name: "AC Sleeper", price: 3.5, icon: Bus },
  { id: "volvo", name: "Volvo Matrix", price: 5.0, icon: Bus },
]

export default function BusBookingPage() {
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [selectedBus, setSelectedBus] = useState(BUS_TYPES[0])
  const [step, setStep] = useState(1) // 1: Search, 2: Select, 3: Confirm

  const distance = useMemo(() => Math.floor(Math.random() * 500) + 100, [source, destination])
  const fare = useMemo(() => Math.floor(distance * selectedBus.price * passengers), [distance, selectedBus, passengers])

  const handleBook = () => {
    setStep(3)
  }

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <FloatingOrbs />
      
      <div className="relative z-10 space-y-10">
        <header className="space-y-2">
          <h1 className="title-xl uppercase tracking-[0.2em]">Bus <span className="gradient-text">Orchestrator</span></h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Initialize neural route mapping</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side: Form & Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-10 rounded-[3rem] border-white/5 space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Origin Point</label>
                  <div className="input-wrapper" style={{ borderRadius: "1rem" }}>
                    <MapPin className="input-icon" style={{ color: "var(--color-primary)" }} />
                    <input
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="Enter source terminal"
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Vector Goal</label>
                  <div className="input-wrapper" style={{ borderRadius: "1rem" }}>
                    <MapPin className="input-icon" style={{ color: "#10b981" }} />
                    <input
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Enter target terminal"
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Timestamp</label>
                    <div className="input-wrapper" style={{ borderRadius: "1rem" }}>
                      <Calendar className="input-icon" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="auth-input text-[10px] uppercase font-black"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Entities</label>
                    <div className="input-wrapper" style={{ borderRadius: "1rem" }}>
                      <Users className="input-icon" />
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        className="auth-input font-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fare Summary */}
            <AnimatePresence mode="wait">
              {source && destination && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="dashboard-card p-8 bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20"
                >
                  <h3 className="text-[10px] font-black text-white mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <Info className="w-4 h-4 text-[var(--color-primary)]" />
                    Neural Fare Projection
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <span>Vector Distance</span>
                      <span className="text-white">{distance} km</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <span>Logic Grade ({selectedBus.name})</span>
                      <span className="text-white">₹{selectedBus.price}/km</span>
                    </div>
                    <div className="h-px bg-white/5 my-2" />
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-1">Final Orchestration Fee</span>
                      <span className="text-3xl font-black text-[var(--color-primary)] tracking-tighter tabular-nums">₹{fare}</span>
                    </div>
                  </div>
                  {step === 1 && (
                    <button 
                      onClick={() => setStep(2)}
                      className="btn-primary w-full mt-8 h-14 flex items-center justify-center gap-3 text-[10px] shadow-[0_15px_40px_rgba(163,230,53,0.15)]"
                    >
                      Scan Available Fleets
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side: Map or Selection */}
          <div className="lg:col-span-8">
            <div className="h-[680px] relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <BookingMap 
                      source={source ? [12.9716, 77.5946] : null}
                      destination={destination ? [13.0827, 80.2707] : null}
                      route={source && destination ? [[12.9716, 77.5946], [13.0827, 80.2707]] : null}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="selection"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full h-full space-y-6"
                  >
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">Selected <span className="text-[var(--color-primary)]">Fleet Options</span></h3>
                    <div className="space-y-4">
                      {BUS_TYPES.map((bus) => (
                        <div 
                          key={bus.id}
                          onClick={() => setSelectedBus(bus)}
                          className={`dashboard-card p-6 flex items-center justify-between transition-all cursor-pointer group ${
                            selectedBus.id === bus.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-[0_0_30px_rgba(163,230,53,0.1)]" : "border-white/5 hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 scale-110 group-hover:scale-125 ${
                              selectedBus.id === bus.id ? "bg-[var(--color-primary)] text-black" : "bg-white/[0.03] text-slate-500 border border-white/5"
                            }`}>
                              <bus.icon className="w-8 h-8" />
                            </div>
                            <div>
                              <div className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--color-primary)] transition-colors">{bus.name}</div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-1">Etd: 06:30 Neural Sync</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black text-white tabular-nums tracking-tighter">₹{Math.floor(distance * bus.price * passengers)}</div>
                            <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.2em] mt-1 italic">Taxes and fees included</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-6 mt-12">
                      <button 
                        onClick={() => setStep(1)}
                        className="btn-secondary flex-1 h-16 text-[10px] uppercase font-black tracking-[0.2em]"
                      >
                        Reset Matrix
                      </button>
                      <button 
                        onClick={handleBook}
                        className="btn-primary flex-[2] h-16 text-[10px] uppercase font-black tracking-[0.2em] shadow-[0_20px_50px_rgba(163,230,53,0.2)]"
                      >
                        Confirm Neural Hook
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full flex flex-col items-center justify-center glass-card rounded-[4rem] border-white/5 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[var(--color-primary)]/5 opacity-20" />
                    <div className="relative z-10 flex flex-col items-center space-y-10">
                      <div className="w-28 h-28 bg-[var(--color-primary)] rounded-[2.5rem] flex items-center justify-center shadow-[0_0_60px_rgba(163,230,53,0.3)]">
                         <CheckCircle2 className="w-14 h-14 text-black" />
                      </div>
                      <div className="text-center space-y-3">
                        <h2 className="title-lg uppercase">Success!</h2>
                        <p className="text-slate-500 font-medium max-w-sm px-10 leading-relaxed italic text-sm">
                          Terminal {selectedBus.name} has been successfully locked for your vector to {destination}. 
                          Manifest dispatched to neural link.
                        </p>
                      </div>
                      <div className="glass-card p-8 rounded-3xl border-white/5 w-80 space-y-1">
                         <div className="flex justify-between text-[10px] font-black text-slate-700 uppercase tracking-widest">
                           <span>Hash ID</span>
                           <span className="text-white font-black">BUS-{Math.floor(Math.random()*10000)}</span>
                         </div>
                         <div className="flex justify-between text-[10px] font-black text-slate-700 uppercase tracking-widest pt-2">
                           <span>Fee Confirmed</span>
                           <span className="text-[var(--color-primary)] font-black">₹{fare}</span>
                         </div>
                      </div>
                      <button 
                        onClick={() => setStep(1)}
                        className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.3em] hover:tracking-[0.5em] transition-all"
                      >
                        New Ticket Search
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
