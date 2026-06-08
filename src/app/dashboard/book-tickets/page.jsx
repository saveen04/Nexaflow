"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bus, 
  Train, 
  Film, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard,
  ChevronRight,
  Ticket,
  Zap,
  Info,
  CheckCircle2
} from "lucide-react";
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects";

const DUMMY_TICKETS = [
  {
    id: "T-101",
    type: "bus",
    name: "Purple Galaxy Express",
    number: "KA-05-F-4421",
    source: "Bangalore",
    destination: "Mumbai",
    date: "2026-06-15",
    time: "21:30",
    capacity: 45,
    available: 12,
    price: 1850,
    image: "/images/bus_terminal.png",
    tags: ["AC", "Sleeper", "Premium"]
  },
  {
    id: "T-202",
    type: "train",
    name: "Nexa Rajdhani",
    number: "12432",
    source: "Delhi",
    destination: "Bangalore",
    date: "2026-06-16",
    time: "06:00",
    capacity: 720,
    available: 48,
    price: 4200,
    image: "/images/train_express.png",
    tags: ["1A", "AC", "Meal Included"]
  },
  {
    id: "T-303",
    type: "movie",
    name: "Interstellar: Remastered",
    theatre: "PVR: Soul Space",
    location: "Bangalore",
    date: "2026-06-12",
    time: "18:30",
    screen: "Screen 04",
    capacity: 120,
    available: 15,
    price: 450,
    image: "/images/cinema_experience.png",
    tags: ["IMAX", "4K", "Dolby Atmos"]
  },
  {
    id: "T-104",
    type: "bus",
    name: "Lime Orbit",
    number: "MH-01-G-9981",
    source: "Mumbai",
    destination: "Pune",
    date: "2026-06-14",
    time: "08:00",
    capacity: 40,
    available: 5,
    price: 650,
    tags: ["Non-AC", "Seater"]
  },
  {
    id: "T-205",
    type: "train",
    name: "Flow Shatabdi",
    number: "12008",
    source: "Chennai",
    destination: "Bangalore",
    date: "2026-06-13",
    time: "05:30",
    capacity: 540,
    available: 120,
    price: 950,
    tags: ["CC", "Executive"]
  }
];

import Script from "next/script";

export default function BookTicketsPage() {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingTicket, setBookingTicket] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [failedJson, setFailedJson] = useState(null);

  const filteredTickets = useMemo(() => {
    return DUMMY_TICKETS.filter(t => {
      const matchesType = filterType === "all" || t.type === filterType;
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           t.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.theatre?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [filterType, searchTerm]);

  const handleBook = (ticket) => {
    setBookingTicket(ticket);
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

  const confirmBooking = async () => {
    if (!bookingTicket) return;
    setFailedJson(null);
    setIsPaying(true);

    try {
      const res = await loadRazorpay();
      if (!res) {
        throw new Error("Razorpay SDK failed to load");
      }

      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: bookingTicket.price,
          currency: "INR",
          receipt: `rcpt_${bookingTicket.id}_${Date.now()}`,
          metadata: {
            booking_id: bookingTicket.id,
            type: bookingTicket.type
          }
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.message || "Order Creation Failed");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NexaFlow Platform",
        description: `Booking for ${bookingTicket.name}`,
        order_id: orderData.order_id,
        handler: async function (response) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            await fetch("/api/booking/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: bookingTicket.type,
                details: {
                  source: bookingTicket.source || bookingTicket.theatre,
                  destination: bookingTicket.destination,
                  date: bookingTicket.date,
                  name: bookingTicket.name,
                  theatre: bookingTicket.theatre,
                  movie: bookingTicket.name,
                },
                fare: bookingTicket.price,
                paymentId: response.razorpay_payment_id
              }),
            });

            setBookingTicket(null);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
          } else {
            setFailedJson({
              status: "VERIFICATION_FAILED",
              message: "Payment verification mismatch in neural matrix.",
              response: verifyData
            });
          }
        },
        modal: {
          ondismiss: function() {
            setIsPaying(false);
            const draftId = `DRAFT-${Math.floor(Math.random()*100000)}`;
            setFailedJson({
              status: "USER_ABORTED",
              draft_id: draftId,
              message: "Transactional sync interrupted by user pulse.",
              payload: { ...bookingTicket }
            });
          }
        },
        prefill: {
          name: "Root Admin",
          email: "admin@nexaflow.io",
          contact: "9999999999",
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
        notes: {
          ticket_id: bookingTicket.id,
          ticket_type: bookingTicket.type,
        },
        theme: { color: "#a3e635" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      setFailedJson({
        status: "ORCHESTRATION_CRASH",
        error: err.message,
        payload: { ...bookingTicket }
      });
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="page-container relative min-h-screen space-y-12 pb-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <FloatingOrbs />
      <AnimatedGrid />

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="title-xl uppercase tracking-[0.2em]">Book <span className="gradient-text">Tickets</span></h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Discover and lock terminal nodes across the global matrix</p>
        </div>
        <div className="flex gap-4">
           <div className="px-5 py-3 glass-card rounded-2xl border-white/5 flex items-center gap-3">
              <Zap className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{filteredTickets.length} Nodes Found</span>
           </div>
        </div>
      </header>

      {/* Discovery Toolbar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="input-wrapper" style={{ borderRadius: "2rem", height: "4rem" }}>
            <Search className="input-icon" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by destination, name, or theatre..."
              className="auth-input"
              style={{ height: "4rem" }}
            />
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
           {["all", "bus", "train", "movie"].map(type => (
             <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-8 h-16 rounded-[2rem] border text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                filterType === type 
                ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-black" 
                : "bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/20"
              }`}
             >
               {type}
             </button>
           ))}
        </div>
        <button className="h-16 px-8 glass-card border-white/5 rounded-[2.5rem] flex items-center gap-3 text-slate-500 hover:text-white transition-all">
           <Filter className="w-4 h-4" />
           <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">Advanced Filters</span>
        </button>
      </div>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredTickets.map((ticket, idx) => (
            <motion.div
              layout
              key={ticket.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="dashboard-card group p-0 overflow-hidden flex flex-col md:flex-row min-h-[320px] border-white/5 hover:border-[var(--color-primary)]/20 transition-all duration-500"
            >
               {/* Impact Graphic Section */}
               <div className={`md:w-64 relative overflow-hidden group/img`}>
                  <img src={ticket.image || "/images/hero_character.png"} className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700" alt={ticket.name} />
                  <div className={`absolute inset-0 opacity-40 ${
                  ticket.type === "bus" ? "bg-lime-500/20" : ticket.type === "train" ? "bg-blue-500/20" : "bg-pink-500/20"
                  }`} />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 group-hover:rotate-6 ${
                      ticket.type === "bus" ? "bg-lime-500 text-black" : ticket.type === "train" ? "bg-blue-500 text-white" : "bg-pink-500 text-white"
                    }`}>
                       {ticket.type === "bus" ? <Bus className="w-7 h-7" /> : ticket.type === "train" ? <Train className="w-7 h-7" /> : <Film className="w-7 h-7" />}
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest mb-1 italic">Authorized</div>
                      <div className="text-2xl font-black text-white tracking-tighter tabular-nums">₹{ticket.price}</div>
                    </div>
                  </div>
               </div>

               {/* Details Section */}
               <div className="flex-1 p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                       <div className="space-y-1">
                          <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--color-primary)] transition-colors">{ticket.name}</h3>
                          <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">{ticket.number || ticket.theatre}</div>
                       </div>
                       <div className="flex flex-wrap gap-2 justify-end max-w-[200px]">
                          {ticket.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500">{tag}</span>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-4">
                       <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-600">
                             <MapPin className="w-3.5 h-3.5" />
                             <span className="text-[9px] font-black uppercase tracking-widest">Vector</span>
                          </div>
                          <div className="text-sm font-black text-white uppercase">{ticket.source || ticket.location}</div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-600">
                             <Calendar className="w-3.5 h-3.5" />
                             <span className="text-[9px] font-black uppercase tracking-widest">Orchestration</span>
                          </div>
                          <div className="text-sm font-black text-white uppercase">{ticket.date}</div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-600">
                             <Clock className="w-3.5 h-3.5" />
                             <span className="text-[9px] font-black uppercase tracking-widest">Temporal</span>
                          </div>
                          <div className="text-sm font-black text-white uppercase">{ticket.time}</div>
                       </div>
                    </div>
                  </div>

                  <div className="pt-10 flex items-center justify-between border-t border-white/5 mt-auto">
                     <div className="space-y-1">
                        <div className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Availability protocol</div>
                        <div className="flex items-center gap-3">
                           <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[var(--color-primary)] rounded-full animate-pulse" 
                                style={{ width: `${(ticket.available / ticket.capacity) * 100}%` }} 
                              />
                           </div>
                           <span className="text-[10px] font-black text-white tabular-nums uppercase">{ticket.available} Locked</span>
                        </div>
                     </div>
                     <button 
                      onClick={() => handleBook(ticket)}
                      className="btn-primary h-14 px-10 text-[10px] flex items-center gap-3 shadow-[0_15px_40px_rgba(163,230,53,0.15)] group-hover:scale-105 transition-all"
                     >
                        Confirm Sync <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Booking Overlay */}
      <AnimatePresence>
        {bookingTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingTicket(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-2xl p-12 rounded-[4rem] border-white/5 relative z-10 space-y-10"
            >
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-[2rem] flex items-center justify-center text-[var(--color-primary)] shadow-2xl">
                     <CreditCard className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="title-lg uppercase">Verify <span className="gradient-text">Sync</span></h2>
                    <p className="text-slate-500 font-medium italic">Authorize orchestration protocols for {bookingTicket.name}</p>
                  </div>
               </div>

                <div className="space-y-6">
                   <div className="glass-card p-8 bg-white/[0.02] border-white/5 rounded-3xl space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                         <span>Node Grade</span>
                         <span className="text-white uppercase">{bookingTicket.type} protocol</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                         <span>Temporal Vector</span>
                         <span className="text-white">{bookingTicket.date} | {bookingTicket.time}</span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 mb-1">Authorized Deduct</span>
                         <span className="text-4xl font-black text-[var(--color-primary)] tracking-tighter tabular-nums leading-none">₹{bookingTicket.price}</span>
                      </div>
                   </div>

                   <AnimatePresence>
                     {failedJson && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="p-6 rounded-[2rem] bg-red-500/5 border border-red-500/20 space-y-4"
                       >
                         <div className="flex items-center justify-between">
                           <h4 className="text-[9px] font-black text-red-400 uppercase tracking-[0.3em]">Failover Active</h4>
                           <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-[7px] font-bold text-red-500 uppercase">{failedJson.status}</span>
                         </div>
                         <pre className="text-[9px] font-mono text-red-300 bg-black/40 p-4 rounded-xl overflow-x-auto border border-red-500/10 max-h-[150px]">
                           {JSON.stringify(failedJson, null, 2)}
                         </pre>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>

               <div className="flex gap-6">
                  <button onClick={() => setBookingTicket(null)} className="btn-secondary flex-1 h-16 text-[10px] uppercase font-black tracking-[0.3em]">
                     Abort
                  </button>
                  <button 
                    onClick={confirmBooking} 
                    disabled={isPaying}
                    className="btn-primary flex-[2] h-16 text-[10px] uppercase font-black tracking-[0.4em] shadow-[0_20px_50px_rgba(163,230,53,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPaying ? "Synchronizing Payment..." : "Confirm Neural Hook"}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Success Indicator */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-[100] px-10 py-6 glass shadow-[0_0_50px_rgba(34,197,94,0.2)] border border-green-500/20 rounded-[2.5rem] flex items-center gap-6"
          >
             <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-black" />
             </div>
             <div>
                <p className="text-sm font-black text-white uppercase tracking-tighter">Sync Locked</p>
                <p className="text-[10px] text-slate-500 font-medium italic">Booking hash successfully dispatched.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
