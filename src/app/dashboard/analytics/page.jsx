"use client"
import { motion } from "framer-motion"
import { 
  CategoryPieChart, 
  PriorityDonutChart, 
  TicketTrendsChart, 
  AIConfidenceChart 
} from "@/components/dashboard/Charts"
import { Activity, Brain, TrendingUp, AlertTriangle } from "lucide-react"

export default function AnalyticsPage() {
  // Mock data for analytics
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
    { date: "May 30", tickets: 45, confidence: 92 },
    { date: "May 31", tickets: 52, confidence: 94 },
    { date: "June 1", tickets: 38, confidence: 91 },
    { date: "June 2", tickets: 65, confidence: 96 },
    { date: "June 3", tickets: 48, confidence: 95 },
    { date: "June 4", tickets: 72, confidence: 98 },
    { date: "June 5", tickets: 55, confidence: 97 }
  ]

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <div className="space-y-2">
        <h1 className="title-xl uppercase tracking-[0.2em]">Neural <span className="gradient-text">Insights</span></h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] leading-none">Real-time performance metrics and AI classification trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { label: "Daily Volume", val: "1,284", change: "+14%", icon: Activity, color: "text-blue-400" },
           { label: "AI Confidence", val: "97.2%", change: "+2.1%", icon: Brain, color: "text-[var(--color-primary)]" },
           { label: "Resolution rate", val: "94%", change: "+5%", icon: TrendingUp, color: "text-green-500" },
           { label: "Critical Escalations", val: "12", change: "-4", icon: AlertTriangle, color: "text-red-500" }
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="dashboard-card p-8 group border-white/5 hover:border-[var(--color-primary)]/20 transition-all duration-500"
           >
             <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.02)]`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${stat.change.startsWith('+') ? 'text-green-400 bg-green-400/5 border-green-400/10' : 'text-slate-500 bg-white/5 border-white/10'}`}>
                  {stat.change}
                </span>
             </div>
             <div className="text-3xl font-black text-white mb-2 tracking-tighter tabular-nums">{stat.val}</div>
             <div className="text-slate-600 text-[10px] uppercase font-black tracking-[0.2em]">{stat.label}</div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="glass-card p-8 border-white/5">
            <CategoryPieChart data={categoryData} />
         </div>
         <div className="glass-card p-8 border-white/5">
            <PriorityDonutChart data={priorityData} />
         </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
         <div className="glass-card p-8 border-white/5">
            <TicketTrendsChart data={trendData} />
         </div>
         <div className="glass-card p-8 border-white/5">
            <AIConfidenceChart data={trendData} />
         </div>
      </div>
    </div>
  )
}
