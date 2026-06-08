"use client";
import Image from "next/image";
import Link from "next/link";

/**
 * Reusable NexaFlow brand logo — transparent PNG, no background box.
 * Props:
 *  - size: "sm" | "md" | "lg"  (default "md")
 *  - href: link destination    (default "/")
 *  - showName: show text name  (default true)
 *  - className: extra classes on wrapper
 */
const SIZE_MAP = {
  sm: { img: 28, text: "text-base" },
  md: { img: 38, text: "text-xl" },
  lg: { img: 52, text: "text-2xl" },
};

export function BrandLogo({ size = "md", href = "/", showName = true, className = "" }) {
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <Link href={href} className={`inline-flex items-center gap-3 group ${className}`}>
      {/* No background wrapper — just the transparent PNG */}
      <Image
        src="/Logo-nexaflow-removebg-preview.png"
        alt="NexaFlow Logo"
        width={s.img}
        height={s.img}
        className="object-contain flex-shrink-0 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(163,230,53,0.8)] transition-all duration-300"
        priority
      />
      {showName && (
        <span className={`text-white font-black tracking-tighter uppercase ${s.text}`}>
          NexaFlow
        </span>
      )}
    </Link>
  );
}
