"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Search,
  User,
  BarChart3,
  HelpCircle,
  LogOut,
  Webhook,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar({ className }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Create Ticket", icon: PlusCircle, href: "/dashboard/create-ticket" },
    { label: "Book Tickets", icon: Search, href: "/dashboard/book-tickets" },
    { label: "My Bookings", icon: Ticket, href: "/dashboard/my-bookings" },
    { label: "Customer Support", icon: HelpCircle, href: "/dashboard/support" },
    { label: "Profile", icon: User, href: "/settings" },
  ];

  const footerItems = [];

  return (
    <aside className={cn("sidebar flex flex-col z-50", className)}>

      {/* Main Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-4 mb-4">Core Modules</div>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-item",
                active && "active"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                active ? "text-[var(--color-primary)]" : "text-slate-600 group-hover:text-white"
              )} />
              <span className="text-sm font-bold">{item.label}</span>
              {active && (
                <motion.div 
                   layoutId="active-indicator"
                   className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-4 mb-2">My Workspace</div>
        {footerItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "sidebar-item",
                active && "active"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-bold">{item.label}</span>
            </Link>
          );
        })}
        <div className="pt-2">
          <Link href="/login" className="sidebar-item text-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all group">
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">End Session</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
