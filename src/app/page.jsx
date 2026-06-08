"use client"
import { motion } from "framer-motion"
import {
  Zap,
  ArrowRight,
  BarChart3,
  Ticket,
  ShieldCheck,
  ChevronRight,
  Workflow,
  Brain,
  Webhook,
  Train,
  Bus,
  Film,
  Activity,
  Lock,
  Globe,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { FloatingOrbs, AnimatedGrid, Aurora } from "@/components/ui/BackgroundEffects"
import Hero from "@/components/landing/Hero"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Bus,
      title: "Bus Booking Engine",
      desc: "AI-powered fare calculation, real-time route mapping, and multi-class seat selection with live availability."
    },
    {
      icon: Train,
      title: "Rail Reservation",
      desc: "Instant PNR generation, coach/seat assignment, Tatkal quota support, and dynamic pricing intelligence."
    },
    {
      icon: Film,
      title: "Cinema Ticketing",
      desc: "Glassmorphic seat picker, QR-code tickets, theatre selection, and show-time management built-in."
    },
    {
      icon: Brain,
      title: "AI Classification",
      desc: "GPT-4o powered ticket triage — auto-routes support requests by priority, sentiment, and category in milliseconds."
    },
    {
      icon: Webhook,
      title: "Webhook Pipeline",
      desc: "Developer-grade webhook console with real-time payload testing, response inspection, and latency metrics."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      desc: "Live KPIs, trend charts, AI confidence tracking, and category distribution — all in one unified view."
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      desc: "AES-256 encrypted channels, role-based access control, and full audit trails across all booking flows."
    },
    {
      icon: Globe,
      title: "Global Availability",
      desc: "99.2% uptime SLA, edge-distributed infrastructure, and sub-2ms latency across all supported regions."
    }
  ]

  const services = [
    {
      title: "AI Booking Flow",
      desc: "Optimized neural pathways for seamless ticket acquisition across all channels.",
      icon: Ticket,
      active: true
    },
    {
      title: "Smart Classification",
      desc: "Instant priority routing and sentiment analysis for enterprise support.",
      icon: ShieldCheck,
      active: false
    },
    {
      title: "Revenue Insights",
      desc: "High-fidelity real-time data visualization for business orchestration.",
      icon: BarChart3,
      active: false
    }
  ]

  const projects = [
    { title: "NexaBus Core", category: "Fleet Logic", image: "/images/bus_terminal.png" },
    { title: "RailFlow AI", category: "Transit Neural", image: "/images/railflow_ai.png" },
    { title: "CineSync", category: "Entertainment", image: "/images/cinema_experience.png" },
    { title: "Neural Webhook", category: "Data Pipeline", image: "/images/neural_webhook.png" }
  ]

  return (
    <div className="relative min-h-screen w-screen bg-[var(--bg-primary)] text-white selection:bg-[var(--color-primary)] selection:text-black overflow-x-hidden flex flex-col items-center">
      <FloatingOrbs />
      <AnimatedGrid />
      <Aurora />

      {/* ── Navigation ── */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-20 py-10 w-full">
        <Link href="/" className="flex items-center gap-4 flex-shrink-0">
          <img src="/logo-nexaflow.png" alt="NexaFlow Logo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-black tracking-tighter uppercase">NexaFlow</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <Link href="#" className="text-[#A3E635] hover:text-white transition-colors">Home</Link>
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="btn-secondary h-12 flex items-center gap-2">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="btn-primary h-12 flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-40 mx-6 mb-6 glass rounded-2xl border border-white/10 p-6 space-y-4 md:hidden"
        >
          {["Home", "Features", "Projects", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Features" ? "#features" : item === "Projects" ? "#projects" : "#"}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#A3E635] transition-colors py-2"
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}

      {/* ── Hero Section ── */}
      <Hero />

      {/* ── Features Section ── */}
      <section id="features" className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 space-y-16">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/5 text-[#A3E635] text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <Activity className="w-3 h-3" />
            Platform Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black title-black text-white"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium text-lg leading-relaxed"
          >
            A complete orchestration suite — from bus and train booking to AI classification, analytics, and real-time webhook infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group p-7 rounded-[2rem] border border-white/5 bg-[#0A0A0A] hover:border-[#A3E635]/25 hover:bg-[#0F0F0F] transition-all cursor-default card-hover flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/8 flex items-center justify-center mb-6 group-hover:bg-[#A3E635]/15 transition-colors border border-[#A3E635]/10">
                <feature.icon className="w-6 h-6 text-[#A3E635]" />
              </div>
              <h3 className="text-lg font-black text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
          <Link href="/signup">
            <button className="btn-primary flex items-center gap-3 group">
              Start Scaling Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="btn-secondary flex items-center gap-3">
              Operational View
            </button>
          </Link>
        </div>
      </section>

      {/* ── Advanced Services Section ── */}
      <section className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-black title-black text-white">Advanced Services</h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Leveraging next-generation AI models to redefine the standard of enterprise ticketing and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative group p-8 md:p-10 rounded-[2.5rem] border transition-all cursor-default flex flex-col items-center text-center ${service.active
                  ? "bg-[#111111] border-[#A3E635]"
                  : "bg-[#0A0A0A] border-white/5 hover:border-white/15"
                }`}
            >
              {service.active && (
                <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#A3E635] animate-pulse shadow-[0_0_10px_#A3E635]" />
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${service.active ? "bg-[#A3E635]/10 text-[#A3E635]" : "bg-white/5 text-slate-500 group-hover:text-white"
                }`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">{service.desc}</p>
              <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${service.active ? "text-[#A3E635]" : "text-slate-600 hover:text-white"
                }`}>
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonial Section ── */}
      <section className="relative z-10 bg-[#0A0A0A] border-y border-white/5 py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 md:space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A3E635]">Global Trust</span>
            <h2 className="text-5xl md:text-7xl font-black title-black leading-none">Listen to <br /> our clients</h2>
            <div className="flex gap-4 pt-4 md:pt-10">
              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#A3E635] hover:text-black hover:border-[#A3E635] transition-all" aria-label="Previous">
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#A3E635] hover:text-black hover:border-[#A3E635] transition-all" aria-label="Next">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/10 space-y-8">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Zap key={s} className="w-4 h-4 text-[#A3E635] fill-current" />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-medium text-slate-300 italic leading-relaxed">
              "NexaFlow has completely transformed our booking throughput. The AI classification alone saved our support team hundreds of hours."
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex-shrink-0" />
              <div>
                <div className="font-black uppercase text-xs tracking-widest">Marcus Vane</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">CTO @ GlobalTransit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-40 space-y-14 md:space-y-20">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 border-b border-white/10 pb-12 text-center sm:text-left">
          <h2 className="title-xl uppercase leading-none">Featured <br /> <span className="gradient-text">Operations</span></h2>
          <button className="btn-primary flex items-center gap-2">
            View Platform Matrix
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative h-[340px] md:h-[500px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10"
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex justify-between items-end translate-y-2 group-hover:translate-y-0 transition-all">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A3E635] mb-2 inline-block">{project.category}</span>
                  <h4 className="text-3xl md:text-4xl font-black tracking-tight">{project.title}</h4>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A3E635] flex items-center justify-center text-black shadow-lg shadow-[#A3E635]/20 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 flex-shrink-0 ml-4">
                  <ArrowRight className="w-7 h-7" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-24 md:pb-40">
        <div className="bg-[#111111] rounded-[3rem] md:rounded-[4rem] border border-[#A3E635]/20 p-10 md:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-10 md:p-20 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
            <Workflow className="w-64 md:w-96 h-64 md:h-96 text-white" />
          </div>
          <div className="relative z-10 space-y-4 md:space-y-6">
            <h2 className="title-xl uppercase leading-none">
              Let's orchestrate <br className="hidden md:block" /> your pipeline
            </h2>
            <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
              Scale your operations with the world's most intelligent orchestration stack.
            </p>
          </div>
          <Link href="/signup" className="relative z-10 flex-shrink-0">
            <button className="btn-primary h-20 px-12 text-lg">
              Launch Dashboard
            </button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 py-10 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#A3E635] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">NexaFlow</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            &copy; 2026 NexaFlow AI Orchestration Platform
          </p>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-800">
            <Lock className="w-3 h-3" />
            <span>End-to-End Encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
