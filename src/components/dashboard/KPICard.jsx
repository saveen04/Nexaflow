"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const colorMap = {
  lime: {
    icon: "text-[var(--color-primary)]",
    bg: "bg-[var(--color-primary)]/10",
    border: "border-[var(--color-primary)]/10",
    glow: "hover:shadow-[0_0_40px_rgba(163,230,53,0.15)] hover:border-[var(--color-primary)]/30",
    bar: "bg-[var(--color-primary)]",
  },
  emerald: {
    icon: "text-[var(--color-success)]",
    bg: "bg-[var(--color-success)]/10",
    border: "border-[var(--color-success)]/20",
    glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    bar: "bg-[var(--color-success)]",
  },
  red: {
    icon: "text-[var(--color-critical)]",
    bg: "bg-[var(--color-critical)]/10",
    border: "border-[var(--color-critical)]/20",
    glow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
    bar: "bg-[var(--color-critical)]",
  },
  orange: {
    icon: "text-[var(--color-warning)]",
    bg: "bg-[var(--color-warning)]/10",
    border: "border-[var(--color-warning)]/20",
    glow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.3)]",
    bar: "bg-[var(--color-warning)]",
  },
  zinc: {
    icon: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
    bar: "bg-slate-500",
  }
};

function CountUp({ target, suffix = "" }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    suffix === "%" ? v.toFixed(1) : Math.round(v).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(count, target, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [target, count]);

  return <motion.span>{rounded}</motion.span>;
}

export function KPICard({ title, value, suffix = "", icon: Icon, color, change, delay = 0 }) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "dashboard-card glass-card flex flex-col justify-between",
        c.glow
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2.5 rounded-xl", c.bg)}>
          <Icon className={cn("w-5 h-5", c.icon)} />
        </div>
        {change && (
          <span className="text-[10px] font-black uppercase text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-lg border border-[var(--color-primary)]/10">
            {change}
          </span>
        )}
      </div>
      <div className="space-y-1 mt-4">
        <div className="text-4xl font-black text-white tracking-tighter tabular-nums">
          <CountUp target={value} suffix={suffix} />
          {suffix}
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{title}</p>
      </div>
    </motion.div>
  );
}
