"use client";
import { motion } from "framer-motion";
import { cn, getConfidenceColor } from "@/lib/utils";

export function ConfidenceMeter({ value, showLabel = true, size = "md" }) {
  const color = value >= 90 ? "#10B981" : value >= 70 ? "#F59E0B" : value >= 50 ? "#F97316" : "#EF4444";
  const heights = { sm: "h-1", md: "h-2", lg: "h-3" };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex-1 bg-white/10 rounded-full overflow-hidden", heights[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className={cn("text-xs font-mono font-semibold w-10 text-right", getConfidenceColor(value))}>
          {value}%
        </span>
      )}
    </div>
  );
}
