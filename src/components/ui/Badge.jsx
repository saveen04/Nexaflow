import { cn } from "@/lib/utils";

export function Badge({ children, className, variant = "default" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
        variant === "outline" ? "bg-transparent" : "",
        className
      )}
    >
      {children}
    </span>
  );
}
