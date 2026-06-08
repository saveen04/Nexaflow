import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/5 rounded-lg",
        className
      )}
    />
  );
}
