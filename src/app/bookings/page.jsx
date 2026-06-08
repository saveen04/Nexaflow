"use client"
import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MapPin, 
  Calendar, 
  Users, 
  Bus, 
  Train, 
  Film, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  CreditCard,
  User as UserIcon,
  Search,
  Zap
} from "lucide-react"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

// Dynamic import for Leaflet (SSR fix)
const BookingMap = dynamic(() => import("@/components/booking/BookingMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-900/50 animate-pulse rounded-[2.5rem] flex items-center justify-center text-slate-500 border border-white/5">Loading Map...</div>
})

const CATEGORIES = [
  { id: "bus", name: "Bus", icon: Bus, color: "from-[#7C3AED] to-[#8B5CF6]" },
  { id: "train", name: "Train", icon: Train, color: "from-[#EC4899] to-[#F472B6]" },
  { id: "movie", name: "Movie", icon: Film, color: "from-[#3B82F6] to-[#60A5FA]" },
]

const DATA = {
  bus: [
    { id: "b1", name: "Purple Express", type: "AC Sleeper", price: 1200, rating: 4.8, seats: 12 },
    { id: "b2", name: "Nebula Travels", type: "Volvo Multi-Axle", price: 1500, rating: 4.9, seats: 8 },
    { id: "b3", name: "Galaxy Bus", type: "Ordinary", price: 600, rating: 4.2, seats: 24 },
  ],
  train: [
    { id: "t1", name: "Shatabdi Express", type: "Chair Car", price: 800, rating: 4.7, seats: 45 },
    { id: "t2", name: "Rajdhani Express", type: "3-Tier AC", price: 2100, rating: 4.9, seats: 12 },
    { id: "t3", name: "Local Passenger", type: "General", price: 120, rating: 3.5, seats: 200 },
  ],
  movie: [
    { id: "m1", name: "Avengers: Endgame", type: "IMAX 3D", price: 450, rating: 4.9, seats: 60 },
    { id: "m2", name: "Inception", type: "4DX", price: 550, rating: 4.8, seats: 40 },
    { id: "m3", name: "The Dark Knight", type: "Standard", price: 250, rating: 4.9, seats: 120 },
  ]
}

export default function UnifiedBookingPage() {
  const [activeCategory, setActiveCategory] = useState("bus")
  const [searchQuery, setSearchQuery] = useState({ from: "", to: "", date: "", guests: 1 })
  const [step, setStep] = useState(1) // 1: Search & Results, 2: Seat & Details, 3: Payment, 4: Success
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })

  const results = useMemo(() => DATA[activeCategory], [activeCategory])

  const handleSelect = (item) => {
    setSelectedItem(item)
    setStep(2)
  }

  const handlePayment = () => {
    setStep(4)
  }

  return (
    <div className="relative min-h-screen bg-[#0B1020] p-6 lg:p-10 pb-20 overflow-x-hidden">
      <FloatingOrbs />
      <AnimatedGrid />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
              Explore & <span className="gradient-text">Book</span>
            </h1>
            <p className="text-slate-500 font-medium">Unified AI-powered booking for all your needs.</p>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setSelectedItem(null)
                  setStep(1)
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeCategory === cat.id 
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg` 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-4">
           {[1, 2, 3].map((s) => (
             <div key={s} className="flex items-center gap-4">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                 step >= s ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_15px_#7C3AED]" : "border-white/10 text-slate-500"
               }`}>
                 {s}
               </div>
               {s < 3 && <div className={`w-12 h-0.5 rounded-full ${step > s ? "bg-[#7C3AED]" : "bg-white/10"}`} />}
             </div>
           ))}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Search Bar */}
                  <div className="glass p-8 rounded-[2.5rem] border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED]">Leaving From</label>
                      <div className="input-wrapper" style={{ borderRadius: "12px" }}>
                        <MapPin className="input-icon" />
                        <input className="auth-input" placeholder="Source" style={{ height: "2.75rem" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#EC4899]">Going To</label>
                      <div className="input-wrapper" style={{ borderRadius: "12px" }}>
                        <MapPin className="input-icon" />
                        <input className="auth-input" placeholder="Destination" style={{ height: "2.75rem" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Travel Date</label>
                      <div className="input-wrapper" style={{ borderRadius: "12px" }}>
                        <Calendar className="input-icon" />
                        <input type="date" className="auth-input" style={{ height: "2.75rem" }} />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <button className="w-full h-11 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2">
                        <Search className="w-4 h-4" />
                        Find {activeCategory}
                      </button>
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="space-y-4">
                    {results.map((item) => (
                      <motion.div 
                        key={item.id}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="glass p-6 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer"
                        onClick={() => handleSelect(item)}
                      >
                        <div className="flex items-center gap-6 text-center md:text-left">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#7C3AED]/20 transition-colors">
                            {activeCategory === "bus" && <Bus className="w-8 h-8 text-[#7C3AED]" />}
                            {activeCategory === "train" && <Train className="w-8 h-8 text-[#EC4899]" />}
                            {activeCategory === "movie" && <Film className="w-8 h-8 text-[#3B82F6]" />}
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-white tracking-tight">{item.name}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm font-bold text-[#7C3AED] uppercase tracking-wider">{item.type}</span>
                              <div className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-sm text-slate-500">{item.seats} seats remaining</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                             <div className="text-3xl font-black text-white">₹{item.price}</div>
                             <div className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em]">Per Passenger</div>
                          </div>
                          <button className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all flex items-center gap-2">
                             Select <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  <div className="h-[500px] relative rounded-[3rem] overflow-hidden border border-white/10 glass shadow-2xl">
                    <div className="absolute inset-0 bg-dot-white/[0.1]" />
                    <div className="absolute top-8 left-8 z-20">
                      <h2 className="text-2xl font-black text-white">Interactive Selector</h2>
                      <p className="text-slate-400 font-medium">Select your preferred {activeCategory === "movie" ? "seats" : "route"}.</p>
                    </div>
                    {activeCategory === "movie" ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-12 pt-24">
                        <div className="w-full max-w-md h-2 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent mb-12 shadow-[0_10px_30px_#3B82F6]" />
                        <div className="grid grid-cols-8 gap-4">
                          {[...Array(32)].map((_, i) => (
                            <button key={i} className={`w-8 h-8 rounded-lg border-2 transition-all ${i % 5 === 0 ? "bg-white/5 border-white/10 cursor-not-allowed" : "border-[#3B82F6]/30 hover:border-[#3B82F6] hover:bg-[#3B82F6]/20"}`} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <BookingMap />
                    )}
                  </div>

                  <div className="glass p-8 rounded-[3rem] border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <UserIcon className="w-5 h-5 text-[#7C3AED]" />
                      Passenger Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                        <input className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-[#7C3AED]/50" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                        <input className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-[#7C3AED]/50" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 h-16 bg-white/5 hover:bg-white/10 text-white font-bold rounded-[1.5rem] border border-white/10">Go Back</button>
                    <button onClick={() => setStep(3)} className="flex-[2] h-16 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold rounded-[1.5rem] shadow-xl shadow-purple-500/20">Proceed to Payment</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="glass p-12 rounded-[3.5rem] border border-white/10 text-center space-y-8">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                      <CreditCard className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Complete Payment</h2>
                      <p className="text-slate-400 font-medium">Verify details and finalize your booking.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 max-w-md mx-auto space-y-4">
                      <div className="flex justify-between">
                         <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Service</span>
                         <span className="text-white font-bold">{selectedItem?.name} ({activeCategory})</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Passenger</span>
                         <span className="text-white font-bold">{formData.name || "John Doe"}</span>
                      </div>
                      <div className="h-px bg-white/5 mx-2" />
                      <div className="flex justify-between items-center pt-2">
                         <span className="text-slate-300 font-bold text-lg">Total Amount</span>
                         <span className="text-3xl font-black text-[#10B981]">₹{selectedItem?.price}</span>
                      </div>
                    </div>
                    <button onClick={handlePayment} className="w-full max-w-md h-16 bg-white text-black hover:bg-[#7C3AED] hover:text-white transition-all font-black text-lg rounded-[1.5rem] flex items-center justify-center gap-3">
                      Pay Now & Confirm <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass p-16 rounded-[4rem] border border-white/10 text-center space-y-8"
                >
                  <div className="relative">
                    <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                    </div>
                    {/* Abstract particle effect */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full scale-125"
                    />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white mb-3 tracking-tighter">Booking Confirmed!</h2>
                    <p className="text-slate-400 font-medium max-w-md mx-auto">
                      Your ticket has been generated and sent to your email. You can view your trips in the dashboard.
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setStep(1)} className="px-10 h-14 glass border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all">New Booking</button>
                    <button className="px-10 h-14 bg-[#7C3AED] shadow-xl shadow-purple-500/30 text-white font-bold rounded-2xl hover:bg-[#8B5CF6] transition-all">View Ticket</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass p-8 rounded-[3rem] border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <Info className="w-5 h-5 text-[#7C3AED]" />
                Selection Info
              </h3>
              {selectedItem ? (
                <div className="space-y-6 text-sm">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest text-[#7C3AED]">Selected {activeCategory}</div>
                    <div className="text-lg font-bold text-white">{selectedItem.name}</div>
                    <div className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest">{selectedItem.type}</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500 font-medium">Base Fare</span>
                       <span className="text-white font-bold">₹{selectedItem.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500 font-medium">Service Tax (5%)</span>
                       <span className="text-white font-bold">₹{Math.round(selectedItem.price * 0.05)}</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between items-center pt-2">
                       <span className="text-white font-black text-xl">Total</span>
                       <span className="text-2xl font-black gradient-text">₹{Math.round(selectedItem.price * 1.05)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <Search className="w-8 h-8 text-slate-700" />
                  </div>
                  <p className="text-slate-600 font-medium text-sm">Select a {activeCategory} to see details and fare breakdown.</p>
                </div>
              )}
            </div>

            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative overflow-hidden glass p-6 rounded-[3rem] border border-[#7C3AED]/20 bg-[#7C3AED]/5"
            >
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white">
                   <Zap className="w-6 h-6" />
                 </div>
                 <h4 className="text-lg font-black text-white">AI Advantage</h4>
               </div>
               <p className="text-slate-400 text-sm font-medium leading-relaxed">
                 Our neural engine monitors over 50,000 data points to ensure you get the best seats at the most optimized price.
               </p>
               <div className="mt-4 flex gap-2">
                 <div className="h-1 bg-[#7C3AED] flex-1 rounded-full opacity-40" />
                 <div className="h-1 bg-[#7C3AED] flex-1 rounded-full" />
                 <div className="h-1 bg-[#7C3AED] flex-1 rounded-full" />
               </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
