"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { 
  CategoryPieChart, 
  PriorityDonutChart, 
  TicketTrendsChart, 
  AIConfidenceChart 
} from "@/components/dashboard/Charts"
import { 
  Activity, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Calendar,
  Filter,
  Download,
  Share2
} from "lucide-react"
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/BackgroundEffects"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  // Extended mock data for analytics
  const categoryData = [
    { name: "Bus Booking", value: 450 },
    { name: "Train Booking", value: 300 },
    { name: "Movie Booking", value: 150 },
    { name: "Support", value: 200 },
    { name: "Billing", value: 100 }
  ]

  const priorityData = [
    { name: "critical", value: 40 },
    { name: "high", value: 120 },
    { name: "medium", value: 300 },
    { name: "low", value: 600 }
  ]

  const trendData = [
    { date: "May 30", tickets: 45, confidence: 92, revenue: 12000 },
    { date: "May 31", tickets: 52, confidence: 94, revenue: 15000 },
    { date: "June 1", tickets: 38, confidence: 91, revenue: 11000 },
    { date: "June 2", tickets: 65, confidence: 96, revenue: 18000 },
    { date: "June 3", tickets: 48, confidence: 95, revenue: 14000 },
    { date: "June 4", tickets: 72, confidence: 98, revenue: 22000 },
    { date: "June 5", tickets: 55, confidence: 97, revenue: 16000 }
  ]

  return (
    <div className="relative min-h-screen bg-[#0B1020] p-6 lg:p-10 space-y-10 overflow-x-hidden">
      <FloatingOrbs />
      <AnimatedGrid />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Neural <span className="gradient-text">Analytics</span></h1>
            <p className="text-slate-500 font-medium">Deep insights into booking flows and AI classification efficiency.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
                {["24h", "7d", "30d", "90d"].map(r => (
                  <button 
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${timeRange === r ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-500/20" : "text-slate-500 hover:text-white"}`}
                  >
                    {r}
                  </button>
                ))}
             </div>
             <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                <Download className="w-4 h-4" />
             </button>
          </div>
        </header>

        {/* Top KPI row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Revenue", val: "₹4.2M", change: "+18.4%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: "AI Confidence", val: "97.2%", change: "+2.1%", icon: Brain, color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10" },
            { label: "Auth Success", val: "99.9%", change: "stable", icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Critical Escalations", val: "04", change: "-12%", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-[2.5rem] border border-white/5 relative group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div className={`text-xs font-black uppercase tracking-widest ${stat.change.startsWith('+') ? 'text-emerald-400' : stat.change === 'stable' ? 'text-slate-500' : 'text-red-400'}`}>
                   {stat.change}
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.val}</div>
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
              
              {/* Abstract decorative element */}
              <div className="absolute bottom-6 right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <stat.icon className="w-20 h-20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-white tracking-tight uppercase font-black tracking-widest text-[10px]">Booking Volume & AI Accuracy</h3>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-[#7C3AED]" />
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Volume</span>
                  </div>
               </div>
               <TicketTrendsChart data={trendData} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass p-8 rounded-[3rem] border border-white/5 flex flex-col items-center">
                  <h3 className="text-sm font-black text-white mb-8 tracking-[0.2em] uppercase">Category Distribution</h3>
                  <CategoryPieChart data={categoryData} />
               </div>
               <div className="glass p-8 rounded-[3rem] border border-white/5 flex flex-col items-center">
                  <h3 className="text-sm font-black text-white mb-8 tracking-[0.2em] uppercase">Priority Distribution</h3>
                  <PriorityDonutChart data={priorityData} />
               </div>
            </div>
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-8 rounded-[3rem] border border-[#7C3AED]/20 bg-[#7C3AED]/5 space-y-6">
               <div className="w-12 h-12 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white mb-6">
                  <Activity className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-white tracking-tight">Active Insights</h3>
               <div className="space-y-4">
                  {[
                    { label: "Busiest Route", val: "Mumbai → Goa", confidence: "94%" },
                    { label: "Top Movie", val: "Inception (IMAX)", confidence: "99%" },
                    { label: "Avg Resolution", val: "4.2 mins", confidence: "-15% today" }
                  ].map((insight, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                       <div>
                          <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{insight.label}</div>
                          <div className="text-sm font-bold text-white mt-0.5">{insight.val}</div>
                       </div>
                       <div className="text-xs font-black text-[#7C3AED]">{insight.confidence}</div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass p-8 rounded-[3rem] border border-[#EC4899]/20 space-y-6">
               <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <Brain className="w-5 h-5 text-[#EC4899]" />
                  Neural Performance
               </h3>
               <div className="space-y-6">
                  <div className="h-[200px] flex items-end justify-between gap-2 px-2">
                     {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                       <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 0.8 }}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-[#EC4899]/20 to-[#EC4899] min-w-[20px]" 
                       />
                     ))}
                  </div>
                  <div className="pt-4 border-t border-white/5 text-center">
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                      AI response latency has decreased by <span className="text-white font-bold">185ms</span> in the last 24 hours.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Full Width AI Confidence Chart */}
        <div className="glass p-10 rounded-[3.5rem] border border-white/5">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase font-black tracking-widest text-[10px]">AI Confidence Over Time</h3>
                <p className="text-slate-500 text-sm mt-1">Correlation between volume and neural accuracy.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all">
                <Share2 className="w-4 h-4" /> Share Report
              </button>
           </div>
           <AIConfidenceChart data={trendData} />
        </div>
      </div>
    </div>
  )
}
