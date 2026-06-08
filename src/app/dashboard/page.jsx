"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, 
  AlertTriangle, 
  Brain, 
  DollarSign, 
  MessageSquare, 
  CheckCircle, 
  Zap, 
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Map,
  Film,
  PlusCircle,
  Search,
  Activity,
  History,
  Clock,
  Bus,
  Train
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects";

const carouselItems = [
  {
    title: "Upcoming Trips",
    desc: "32 express routes scheduled for the next 48 hours across the regional transit matrix.",
    icon: Bus,
    image: "/images/bus_terminal.png",
    color: "from-blue-600 to-indigo-600",
    stat: "32 Active"
  },
  {
    title: "RailFlow Intelligence",
    desc: "Neural diagnostic sync complete for high-speed corridor 04. Optimization active.",
    icon: Train,
    image: "/images/train_express.png",
    color: "from-emerald-600 to-teal-600",
    stat: "System Optimal"
  },
  {
    title: "CineSync Operations",
    desc: "Interactive seat orchestration enabled for the evening premiere cycle.",
    icon: Film,
    image: "/images/cinema_experience.png",
    color: "from-pink-600 to-purple-600",
    stat: "8 New Releases"
  },
  {
    title: "Featured Promotions",
    desc: "Next-gen luxury travel experiences now boarding. Exclusive neural tier access.",
    icon: Zap,
    image: "/images/upcoming_trip_ad.png",
    color: "from-amber-500 to-orange-600",
    stat: "Special Offer"
  },
  {
    title: "Neural AI Insights",
    desc: "Predictive booking pipelines active with 98.4% classification accuracy.",
    icon: Brain,
    image: "/images/ai_insights.png",
    color: "from-purple-500 to-indigo-600",
    stat: "98.4% Confidence"
  }
];

export default function DashboardPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container relative min-h-screen space-y-12 pb-24">
      <FloatingOrbs />
      <AnimatedGrid />

      {/* Header / Project Context */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
               <span>Platform</span>
               <span>/</span>
               <span className="text-[var(--color-primary)]">Dashboard</span>
               <span>/</span>
               <span className="text-white">Telemetry</span>
            </div>
            <h1 className="title-lg uppercase">Live <span className="gradient-text">Telemetry</span></h1>
          </div>
          <div className="flex gap-3">
             <div className="px-5 py-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-2xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
                <span className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em]">Neural Sync Active</span>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Main Experience Carousel (MOVED TO UP) */}
      <section className="relative group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[540px] rounded-[4rem] overflow-hidden border border-white/10 bg-[#050505] shadow-2xl"
          >
            {/* BACKGROUND IMAGE WITH OVERLAY */}
            <div className="absolute inset-0">
              <motion.img 
                key={`img-${activeSlide}`}
                src={carouselItems[activeSlide].image} 
                alt={carouselItems[activeSlide].title}
                className="w-full h-full object-cover opacity-80 transition-all duration-[10s] ease-linear group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-center p-16 lg:p-24 space-y-8 max-w-4xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)] backdrop-blur-2xl shadow-2xl">
                    {(() => {
                      const Icon = carouselItems[activeSlide].icon;
                      return <Icon className="w-8 h-8" />;
                    })()}
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-[11px] font-black uppercase tracking-[0.5em] text-white shadow-xl"
                  >
                    {carouselItems[activeSlide].stat}
                  </motion.div>
                </div>
                
                <h2 className="text-6xl lg:text-7xl font-black uppercase text-white tracking-tighter leading-[0.9]">
                   {carouselItems[activeSlide].title}
                </h2>
                <p className="text-xl text-slate-200 max-w-xl font-medium leading-relaxed drop-shadow-lg">
                   {carouselItems[activeSlide].desc}
                </p>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <button className="hero-btn-primary scale-110 shadow-2xl">
                   Access Module <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex gap-3">
                  {carouselItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-2 rounded-full transition-all duration-500 shadow-lg ${activeSlide === i ? "w-12 bg-[var(--color-primary)]" : "w-2 bg-white/30 hover:bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Side Buttons */}
        <button 
          onClick={() => setActiveSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass border-white/10 flex items-center justify-center text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 backdrop-blur-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setActiveSlide((prev) => (prev + 1) % carouselItems.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass border-white/10 flex items-center justify-center text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 backdrop-blur-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* KPI Grid - High Impact Metrics (MOVED BELOW CAROUSEL) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 pt-4">
        <KPICard title="Total Tickets" value={4250} icon={PlusCircle} color="zinc" change="+14%" delay={0.1} />
        <KPICard title="Total Bookings" value={12480} icon={Ticket} color="lime" change="+12%" delay={0.2} />
        <KPICard title="Bus Bookings" value={5840} icon={Bus} color="lime" delay={0.3} />
        <KPICard title="Train Bookings" value={3920} icon={Train} color="lime" delay={0.4} />
        <KPICard title="Movie Bookings" value={2720} icon={Film} color="lime" delay={0.5} />
        <KPICard title="Revenue" value={45200} icon={DollarSign} color="lime" change="+8.4%" delay={0.6} suffix="$" />
      </div>

      {/* Recent Activity Telemetry (MOVED BELOW KPI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* System Confidence */}
        <div className="lg:col-span-1 glass-card rounded-[4rem] border border-white/5 p-10 flex flex-col justify-between bg-white/[0.01]">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Sync Integrity</h3>
              <Activity className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="space-y-8">
              {[
                { label: "Matrix Sync", value: 98.4, color: "var(--color-primary)" },
                { label: "Payment Hook", value: 99.1, color: "var(--color-primary-hover)" },
                { label: "Throughput", value: 87.5, color: "var(--color-accent)" }
              ].map((stat, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{stat.label}</span>
                    <span className="text-xs font-black text-white tracking-widest">{stat.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-10 mt-10 border-t border-white/5">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--color-primary)] shadow-inner">
                   <TrendingUp className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                   <p className="text-[11px] font-black text-white uppercase tracking-wider">Neural Growth</p>
                   <p className="text-[9px] text-[var(--color-primary)] uppercase font-black tracking-[0.2em] animate-pulse">Active & Stable</p>
                </div>
             </div>
          </div>
        </div>

        {/* Live Telemetry Feed */}
        <div className="lg:col-span-2 glass-card p-10 rounded-[4rem] bg-white/[0.01] border-white/5 space-y-10">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-xl">
                    <Activity className="w-6 h-6 text-slate-400" />
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight">Telemetry Stream</h3>
              </div>
              <button className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all">Clear Stream</button>
           </div>
           
           <div className="space-y-4">
              {[
                { type: "booking", desc: "Express Bus B-102 locked by user_824", time: "2 min ago", icon: Bus, color: "text-lime-500" },
                { type: "ticket", desc: "New Movie Ticket node initialized for 'Tenet'", time: "14 min ago", icon: Film, color: "text-pink-500" },
                { type: "booking", desc: "Train #12432 Rajdhani sync successful", time: "28 min ago", icon: Train, color: "text-blue-500" },
                { type: "system", desc: "Customer support link established", time: "1 hour ago", icon: Brain, color: "text-purple-500" },
                { type: "alert", desc: "Capacity threshold reached for Cinema_04", time: "2 hours ago", icon: AlertTriangle, color: "text-red-500" },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-6 p-5 rounded-3xl hover:bg-white/[0.04] transition-all group border border-transparent hover:border-white/10 bg-white/[0.01]">
                   <div className={`w-14 h-14 rounded-2xl bg-white/[0.02] flex items-center justify-center ${log.color} group-hover:scale-110 transition-all shadow-xl`}>
                      <log.icon className="w-6 h-6" />
                   </div>
                   <div className="flex-1">
                      <p className="text-base font-bold text-white tracking-tight leading-tight">{log.desc}</p>
                      <div className="flex items-center gap-4 mt-2 opacity-60">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.type}</span>
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {log.time}
                         </span>
                      </div>
                   </div>
                   <ChevronRight className="w-6 h-6 text-slate-800 group-hover:text-white transition-all opacity-0 group-hover:opacity-100" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
