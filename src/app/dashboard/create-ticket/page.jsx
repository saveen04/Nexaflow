"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bus, 
  Train, 
  Film, 
  Plus, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CreditCard,
  Hash,
  Monitor,
  CheckCircle2
} from "lucide-react";
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects";

const BookingMap = dynamic(() => import("@/components/booking/BookingMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 animate-pulse rounded-2xl flex items-center justify-center text-slate-600 text-xs font-bold uppercase tracking-widest">
      Loading Map...
    </div>
  ),
});

const CITY_DATA = {
  "bangalore": [12.9716, 77.5946],
  "bengaluru": [12.9716, 77.5946],
  "mumbai": [19.0760, 72.8777],
  "bombay": [19.0760, 72.8777],
  "delhi": [28.6139, 77.2090],
  "new delhi": [28.6139, 77.2090],
  "chennai": [13.0827, 80.2707],
  "madras": [13.0827, 80.2707],
  "hyderabad": [17.3850, 78.4867],
  "pune": [18.5204, 73.8567],
  "kolkata": [22.5726, 88.3639],
  "calcutta": [22.5726, 88.3639],
  "ahmedabad": [23.0225, 72.5714],
  "jaipur": [26.9124, 75.7873],
  "lucknow": [26.8467, 80.9462]
};

const fuzzyCityLookup = (input) => {
  const query = input.toLowerCase().trim();
  if (!query) return null;
  
  // Exact match first
  if (CITY_DATA[query]) return CITY_DATA[query];
  
  // Prefix or partial match
  const match = Object.keys(CITY_DATA).find(city => 
    city.includes(query) || query.includes(city)
  );
  return match ? CITY_DATA[match] : null;
};

const calculateDistance = (coord1, coord2) => {
  const R = 6371; // km
  const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
  const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const TICKET_TYPES = [
  { id: "bus", label: "Bus Ticket", icon: Bus, color: "lime" },
  { id: "train", label: "Train Ticket", icon: Train, color: "blue" },
  { id: "movie", label: "Movie Ticket", icon: Film, color: "pink" },
];

export default function CreateTicketPage() {
  const [ticketType, setTicketType] = useState("bus");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failedJson, setFailedJson] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    date: "",
    time: "",
    capacity: 45,
    price: 0
  });

  // Map States
  const [sourceLabel, setSourceLabel] = useState("");
  const [destLabel, setDestLabel] = useState("");
  const [sourceCoord, setSourceCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);

  const updateSource = (val) => {
    setSourceLabel(val);
    const coord = fuzzyCityLookup(val);
    if (coord) setSourceCoord(coord);
  };

  const updateDest = (val) => {
    setDestLabel(val);
    const coord = fuzzyCityLookup(val);
    if (coord) setDestCoord(coord);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFailedJson(null);
    setLoading(true);

    try {
      const res = await loadRazorpay();
      if (!res) throw new Error("Razorpay Fail");

      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.price || 500,
          currency: "INR",
          receipt: `init_${Date.now()}`,
          metadata: {
            ticket_type: ticketType,
            node_name: formData.name
          }
        }),
      });
      const orderData = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NexaFlow Matrix",
        description: `Initialization of ${ticketType.toUpperCase()} Node`,
        order_id: orderData.order_id,
        handler: async function (response) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.success) {
            // 4. Save to Inventory Matrix
            const invRes = await fetch("/api/inventory/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: ticketType,
                name: formData.name,
                number: formData.number,
                source: sourceLabel,
                destination: destLabel,
                date: formData.date,
                time: formData.time,
                capacity: formData.capacity,
                price: formData.price,
                sourceCoord,
                destCoord
              }),
            });
            const invData = await invRes.json();
            if (invData.success) {
              setSuccess(true);
            } else {
               const localId = `LOCAL-${Math.floor(Math.random()*100000)}`;
               setFailedJson({
                 status: "PAYMENT_SUCCESS_DB_FAILURE",
                 local_ticket_id: localId,
                 payload: { ...formData, source: sourceLabel, destination: destLabel }
               });
            }
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            const localId = `DRAFT-${Math.floor(Math.random()*100000)}`;
            setFailedJson({
              status: "USER_CANCELLED_OR_FAILED",
              local_ticket_id: localId,
              message: "Payment synchronization interrupted. Local draft generated.",
              payload: { ...formData, source: sourceLabel, destination: destLabel }
            });
          }
        },
        prefill: {
          name: "Root Admin",
          email: "admin@nexaflow.io",
          method: "upi"
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay via UPI / GPay",
                instruments: [{ method: "upi", apps: ["google_pay", "phonepe", "paytm"] }]
              }
            },
            sequence: ["block.upi", "block.card"],
            preferences: { show_default_blocks: true }
          }
        },
        theme: { color: "#a3e635" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      const localId = `ERR-${Math.floor(Math.random()*100000)}`;
      setFailedJson({
        status: "ORCHESTRATION_ERROR",
        local_ticket_id: localId,
        error: err.message,
        payload: { ...formData, source: sourceLabel, destination: destLabel }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketType === "movie") {
      const basePrice = 250;
      const calculatedPrice = basePrice + Math.floor(formData.capacity / 10);
      setFormData(prev => ({ ...prev, price: calculatedPrice }));
      return;
    }

    if (sourceCoord && destCoord) {
      const distance = calculateDistance(sourceCoord, destCoord);
      const rates = { bus: 6.5, train: 9.8 };
      const minFares = { bus: 150, train: 350 };
      
      let calculatedPrice = Math.round(distance * (rates[ticketType] || 5));
      if (calculatedPrice < minFares[ticketType]) {
        calculatedPrice = minFares[ticketType];
      }
      
      setFormData(prev => ({ ...prev, price: calculatedPrice }));
    }
  }, [sourceCoord, destCoord, ticketType, formData.capacity]);

  const renderForm = () => {
    switch (ticketType) {
      case "bus":
        return (
          <div className="space-y-10">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Bus Name</label>
                <div className="input-wrapper">
                  <Bus className="input-icon" />
                  <input 
                    placeholder="e.g. Purple Express" 
                    className="auth-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bus Number</label>
                <div className="input-wrapper">
                  <Hash className="input-icon" />
                  <input 
                    placeholder="e.g. KA-01-F-1234" 
                    className="auth-input" 
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div className="form-group">
                    <label className="form-label">Departure Node (Source)</label>
                    <div className="input-wrapper">
                      <MapPin className="input-icon" />
                      <input
                        placeholder="e.g. Bangalore, Mumbai..."
                        className="auth-input"
                        value={sourceLabel}
                        onChange={(e) => updateSource(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Arrival Node (Destination)</label>
                    <div className="input-wrapper">
                      <MapPin className="input-icon" />
                      <input
                        placeholder="e.g. Chennai, Delhi..."
                        className="auth-input"
                        value={destLabel}
                        onChange={(e) => updateDest(e.target.value)}
                      />
                    </div>
                  </div>
               </div>
               <div className="glass-card rounded-[2.5rem] border-white/5 h-[280px] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-all pointer-events-none flex items-center justify-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white opacity-40 group-hover:opacity-0">Interactive Mapping Active</span>
                  </div>
                  <BookingMap
                    source={sourceCoord}
                    destination={destCoord}
                    route={sourceCoord && destCoord ? [sourceCoord, destCoord] : []}
                  />
               </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Departure Date</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" />
                  <input 
                    type="date" 
                    className="auth-input" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Departure Time</label>
                <div className="input-wrapper">
                  <Clock className="input-icon" />
                  <input 
                    type="time" 
                    className="auth-input" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Seat Capacity</label>
                <div className="input-wrapper">
                  <Users className="input-icon" />
                  <input 
                    type="number" 
                    placeholder="45" 
                    className="auth-input" 
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                   <label className="form-label mb-0 italic">Automated Fare</label>
                   {sourceCoord && destCoord && (
                     <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)]">Sync Optimized</span>
                   )}
                </div>
                <div className="input-wrapper border-[var(--color-primary)]/30">
                  <CreditCard className="input-icon" style={{ color: "var(--color-primary)" }} />
                  <input 
                    type="number" 
                    value={formData.price}
                    readOnly
                    placeholder="Enter Nodes..."
                    className="auth-input text-[var(--color-primary)] font-black tabular-nums" 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "train":
        return (
          <div className="space-y-10">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Train Name</label>
                <div className="input-wrapper">
                  <Train className="input-icon" />
                  <input 
                    placeholder="e.g. Rajdhani Express" 
                    className="auth-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Train Number</label>
                <div className="input-wrapper">
                  <Hash className="input-icon" />
                  <input 
                    placeholder="e.g. 12432" 
                    className="auth-input" 
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div className="form-group">
                    <label className="form-label">Source Station (Node A)</label>
                    <div className="input-wrapper">
                      <MapPin className="input-icon" />
                      <input 
                        placeholder="e.g. Delhi, Bangalore..." 
                        className="auth-input" 
                        value={sourceLabel}
                        onChange={(e) => updateSource(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination Station (Node B)</label>
                    <div className="input-wrapper">
                      <MapPin className="input-icon" />
                      <input 
                        placeholder="e.g. Mumbai, Kolkata..." 
                        className="auth-input" 
                        value={destLabel}
                        onChange={(e) => updateDest(e.target.value)}
                      />
                    </div>
                  </div>
               </div>
               <div className="glass-card rounded-[2.5rem] border-white/5 h-[280px] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-all pointer-events-none flex items-center justify-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white opacity-40 group-hover:opacity-0">Network Mapping Active</span>
                  </div>
                  <BookingMap
                    source={sourceCoord}
                    destination={destCoord}
                    route={sourceCoord && destCoord ? [sourceCoord, destCoord] : []}
                  />
               </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Departure Date</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" />
                  <input 
                    type="date" 
                    className="auth-input" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Departure Time</label>
                <div className="input-wrapper">
                  <Clock className="input-icon" />
                  <input 
                    type="time" 
                    className="auth-input" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Seat Units</label>
                <div className="input-wrapper">
                  <Users className="input-icon" />
                  <input 
                    type="number" 
                    placeholder="720" 
                    className="auth-input" 
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                   <label className="form-label mb-0 italic font-bold text-blue-400">Rail Fare Matrix (₹)</label>
                </div>
                <div className="input-wrapper border-blue-500/30">
                  <CreditCard className="input-icon text-blue-500" />
                  <input 
                    type="number" 
                    readOnly
                    value={formData.price}
                    className="auth-input text-blue-400 font-black tabular-nums font-bold" 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "movie":
        return (
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Movie Name</label>
              <div className="input-wrapper">
                <Film className="input-icon" />
                <input 
                  placeholder="e.g. Interstellar" 
                  className="auth-input" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Theatre Name</label>
              <div className="input-wrapper">
                <Monitor className="input-icon" />
                <input 
                  placeholder="e.g. PVR Cinema" 
                  className="auth-input" 
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div className="form-group">
                    <label className="form-label text-pink-400">Location Center (Node)</label>
                    <div className="input-wrapper">
                      <MapPin className="input-icon" />
                      <input 
                        placeholder="e.g. Mumbai, Bangalore..." 
                        className="auth-input" 
                        value={sourceLabel}
                        onChange={(e) => updateSource(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label italic">Show Date</label>
                    <div className="input-wrapper">
                      <Calendar className="input-icon" />
                      <input 
                        type="date" 
                        className="auth-input" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                  </div>
               </div>
               <div className="glass-card rounded-[2.5rem] border-white/5 h-[280px] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-all pointer-events-none flex items-center justify-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white opacity-40 group-hover:opacity-0">Cinema Mapping Active</span>
                  </div>
                  <BookingMap
                    source={sourceCoord}
                    destination={null}
                    route={[]}
                  />
               </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Show Time</label>
                <div className="input-wrapper">
                  <Clock className="input-icon" />
                  <input 
                    type="time" 
                    className="auth-input" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label font-bold text-pink-500 italic text-[9px] uppercase">Initialize Premium Price (₹)</label>
                <div className="input-wrapper border-pink-500/30">
                  <CreditCard className="input-icon text-pink-500" />
                  <input 
                    type="number" 
                    readOnly
                    className="auth-input text-pink-400 font-bold" 
                    value={formData.price}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="page-container flex items-center justify-center min-h-[600px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 rounded-[4rem] border-white/5 text-center space-y-8 max-w-lg"
        >
          <div className="w-24 h-24 bg-[var(--color-primary)] rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(163,230,53,0.3)]">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <div className="space-y-2">
            <h2 className="title-lg uppercase">Ticket Created</h2>
            <p className="text-slate-500 font-medium italic">Your {ticketType} ticket has been successfully initialized in the matrix.</p>
          </div>
          <button 
            onClick={() => setSuccess(false)}
            className="btn-primary w-full h-14 shadow-lg"
          >
            Create Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container relative min-h-screen space-y-12 pb-20">
      <FloatingOrbs />
      <AnimatedGrid />

      <header className="space-y-2">
        <h1 className="title-xl uppercase tracking-[0.2em]">Create <span className="gradient-text">Ticket</span></h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Initialize new inventory nodes into the booking matrix</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Type Selection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-10 rounded-[3rem] border-white/5 space-y-8">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Selection Matrix</h3>
            <div className="space-y-4">
              {TICKET_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTicketType(type.id)}
                  className={`w-full p-6 rounded-[2rem] border transition-all flex items-center gap-6 group ${
                    ticketType === type.id 
                      ? "bg-[var(--color-primary)] border-[var(--color-primary)] shadow-[0_0_30px_rgba(163,230,53,0.2)]" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    ticketType === type.id ? "bg-black text-[var(--color-primary)]" : "bg-white/5 text-slate-500 group-hover:text-white"
                  }`}>
                    <type.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-black uppercase tracking-tighter ${
                      ticketType === type.id ? "text-black" : "text-white"
                    }`}>
                      {type.label}
                    </div>
                    <div className={`text-[9px] font-black uppercase tracking-widest mt-0.5 ${
                      ticketType === type.id ? "text-black/60" : "text-slate-600"
                    }`}>
                      Terminal Node
                    </div>
                  </div>
                  <ChevronRight className={`ml-auto w-5 h-5 transition-transform ${
                    ticketType === type.id ? "text-black translate-x-1" : "text-slate-700"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          <div className="dashboard-card p-8 bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20 shadow-[0_0_40px_rgba(163,230,53,0.05)]">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] leading-relaxed italic">
              "Every ticket created is a neural link to a customer journey. Ensure protocol accuracy."
            </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="glass-card p-12 rounded-[4rem] border-white/5 space-y-12">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic border-b border-white/5 pb-6">
              {ticketType} <span className="text-[var(--color-primary)]">Configuration</span>
            </h3>
            
            {renderForm()}

            <AnimatePresence>
              {failedJson && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/20 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em]">Failover Telemetry Active</h4>
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-[8px] font-bold text-red-500 uppercase">{failedJson.status}</span>
                  </div>
                  <pre className="text-[10px] font-mono text-red-300 bg-black/40 p-6 rounded-2xl overflow-x-auto border border-red-500/10 leading-relaxed">
                    {JSON.stringify(failedJson, null, 2)}
                  </pre>
                  <p className="text-[9px] font-medium text-slate-500 italic text-center">
                    A local draft has been cached. You can manually re-sync this node or continue with a new initialization.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-slate-600">
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Payment Link Automated</span>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="btn-primary h-16 px-14 shadow-[0_20px_50px_rgba(163,230,53,0.2)] group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                    <span>Initialize Ticket</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Box(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
