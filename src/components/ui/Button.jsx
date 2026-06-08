"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
  secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/20",
  danger: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30",
  ghost: "bg-transparent hover:bg-white/5 text-slate-400 hover:text-white",
  outline: "bg-transparent border border-white/20 text-slate-300 hover:border-white/40 hover:text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  icon,
  className,
  disabled,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={cn(
        "ripple inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </motion.button>
  );
}
