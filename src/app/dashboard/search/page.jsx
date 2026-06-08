"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Ticket, Bus, Train, Film, ChevronRight, LayoutDashboard } from "lucide-react";
import { FloatingOrbs } from "@/components/ui/BackgroundEffects";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!query) return;
      setLoading(true);
      try {
        // Fetch Tickets
        const tReq = await fetch(`/api/tickets?search=${encodeURIComponent(query)}`);
        const tData = await tReq.json();
        setTickets(tData.tickets || []);

        // Simulated Bookings Search
        const mockBookings = [
          { id: "TIC-8821", type: "bus", title: "Bangalore to Mumbai", date: "2026-06-15", fare: 1850, status: "confirmed" },
          { id: "TIC-4492", type: "train", title: "Nexa Rajdhani (1A)", date: "2026-06-16", fare: 4200, status: "confirmed" },
          { id: "TIC-3105", type: "movie", title: "Interstellar: IMAX", date: "2026-06-12", fare: 450, status: "confirmed" },
        ].filter(b => 
          b.title.toLowerCase().includes(query.toLowerCase()) || 
          b.id.toLowerCase().includes(query.toLowerCase())
        );
        setBookings(mockBookings);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  const getBookingIcon = (type) => {
    switch (type) {
      case "bus": return Bus;
      case "train": return Train;
      case "movie": return Film;
      default: return Ticket;
    }
  };

  return (
    <div className="page-container relative min-h-screen space-y-12">
      <FloatingOrbs />
      
      <div className="relative z-10 space-y-10">
        <header className="space-y-2">
          <div className="flex items-center gap-3 text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.3em] mb-2">
            <Search className="w-4 h-4" />
            <span>Search Intelligence Node</span>
          </div>
          <h1 className="title-xl uppercase tracking-[0.2em]">
            Results for <span className="gradient-text">"{query}"</span>
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
            {tickets.length + bookings.length} matches across orchestration matrix
          </p>
        </header>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 glass-card animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Tickets Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-blue-400" />
                  Support Tickets ({tickets.length})
                </h2>
              </div>
              <div className="space-y-3">
                {tickets.length > 0 ? tickets.map(ticket => (
                  <div key={ticket.ticketId} className="dashboard-card p-5 group hover:border-blue-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">{ticket.ticketId}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded bg-white/5 ${
                        ticket.priority === 'critical' ? 'text-red-500' : 'text-slate-500'
                      }`}>{ticket.priority}</span>
                    </div>
                    <h3 className="text-sm font-black text-white uppercase mb-1">{ticket.subject}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{ticket.category}</p>
                  </div>
                )) : (
                  <div className="p-10 glass rounded-3xl text-center text-slate-700 text-xs font-black uppercase tracking-widest">No tickets match query</div>
                )}
              </div>
            </section>

            {/* Bookings Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[var(--color-primary)]" />
                  Booking Ledger ({bookings.length})
                </h2>
              </div>
              <div className="space-y-3">
                {bookings.length > 0 ? bookings.map(booking => {
                  const Icon = getBookingIcon(booking.type);
                  return (
                    <div key={booking.id} className="dashboard-card p-5 group hover:border-[var(--color-primary)]/20">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[var(--color-primary)]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 text-[9px] font-black text-slate-500 uppercase mb-1">
                            <span>{booking.id}</span>
                            <span>•</span>
                            <span>{formatDate(booking.date)}</span>
                          </div>
                          <h3 className="text-sm font-black text-white uppercase truncate">{booking.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-black text-white tracking-widest whitespace-nowrap">₹{booking.fare}</div>
                          <div className="text-[8px] font-black text-[var(--color-primary)] uppercase tracking-widest mt-1">{booking.status}</div>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="p-10 glass rounded-3xl text-center text-slate-700 text-xs font-black uppercase tracking-widest">No bookings match query</div>
                )}
              </div>
            </section>

          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center uppercase tracking-widest font-black">Connecting to Intelligence Matrix...</div>}>
      <SearchResults />
    </Suspense>
  );
}
