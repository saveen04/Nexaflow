"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function Card({ children, className, hover = true, glow = "none" }) {
  const glowClass = {
    blue: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    green: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    red: "hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
    none: "",
  }[glow];

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "glass rounded-xl p-5 transition-all duration-200",
          glowClass,
          className
        )}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn("glass rounded-xl p-5", className)}>
      {children}
    </div>
  );
}
