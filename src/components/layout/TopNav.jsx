"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Settings, Ticket, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const [searchVal, setSearchVal] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchVal.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <header className="h-20 flex-shrink-0 sticky top-0 z-50 glass border-b border-white/10 flex items-center pl-6 md:pl-10 pr-8 gap-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

      {/* ── Brand Alignment Section (Matches Sidebar Width) ── */}
      <div className="w-[240px] flex-shrink-0 flex items-center pr-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          {isMounted ? (
            <Image
              src="/logo-nexaflow.png"
              alt="NexaFlow"
              width={34}
              height={34}
              className="object-contain flex-shrink-0 drop-shadow-[0_0_8px_rgba(163,230,53,0.45)] group-hover:drop-shadow-[0_0_14px_rgba(163,230,53,0.7)] transition-all duration-300"
              priority
            />
          ) : (
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.1)]" />
          )}
          <span className="hidden md:block text-[11px] font-black text-white uppercase tracking-widest">
            NexaFlow
          </span>
        </Link>
      </div>

      {/* ── Centralized Intelligence Core (Breadcrumbs + Search) ── */}
      <div className="flex-1 flex justify-center items-center gap-12 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="hidden lg:flex items-center gap-3 text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] whitespace-nowrap">
          <span>Platform</span>
          <span className="text-white/10">/</span>
          <span className="text-white">Workspace</span>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-5 w-px bg-white/10" />

        {/* Search */}
        <div className="w-full max-w-md">
          <div className="input-wrapper" style={{ borderRadius: "12px" }}>
            <Search className="input-icon" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search tickets, bookings, analytics..."
              className="auth-input"
              style={{ height: "2.75rem" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto flex-shrink-0">

        {/* Create Ticket */}
        <Link href="/dashboard/create-ticket">
          <button className="h-10 px-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(163,230,53,0.2)] hover:shadow-[0_6px_28px_rgba(163,230,53,0.35)] whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Ticket</span>
          </button>
        </Link>

        {/* Avatar / Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            aria-label="Open profile menu"
            className="w-10 h-10 rounded-xl overflow-hidden bg-[var(--color-primary)] flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_16px_rgba(163,230,53,0.15)]"
          >
            <User className="w-5 h-5 text-black" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-3 w-60 glass border border-white/20 rounded-[1.75rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
                >
                  {/* Profile header */}
                  <div className="p-5 border-b border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white uppercase tracking-tight leading-none">Root Admin</p>
                      <p className="text-[10px] text-[var(--color-primary)] uppercase tracking-widest font-black mt-1">Enterprise Operator</p>
                    </div>
                  </div>

                  {/* Nav items */}
                  <div className="p-2">
                    {[
                      { label: "My Profile", icon: User, href: "/settings" },
                      { label: "My Bookings", icon: Ticket, href: "/dashboard/my-bookings" },
                      { label: "Settings", icon: Settings, href: "/settings" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setShowProfile(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        <item.icon className="w-4 h-4 group-hover:text-[var(--color-primary)] transition-colors" />
                        <span className="text-xs font-bold">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Sign out */}
                  <div className="p-2 border-t border-white/5">
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/70 hover:text-red-400 hover:bg-red-500/8 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
