"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Seeded pseudo-random — same output on server and client
function sr(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const ORB_CONFIG = [
  { x: "10%", y: "20%", size: 300, color: "rgba(163,230,53,0.04)", delay: 0 },
  { x: "80%", y: "10%", size: 250, color: "rgba(190,242,100,0.04)", delay: 1 },
  { x: "60%", y: "70%", size: 200, color: "rgba(163,230,53,0.03)", delay: 2 },
  { x: "20%", y: "80%", size: 180, color: "rgba(190,242,100,0.03)", delay: 1.5 },
];

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ORB_CONFIG.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: orb.color,
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(163,230,53,0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(163,230,53,0.2) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

// Standalone floating particles used in hero sections — client-only to avoid hydration mismatch
const HERO_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${sr(i * 3) * 90 + 5}%`,
  top: `${sr(i * 3 + 1) * 80 + 10}%`,
  duration: 4 + sr(i * 3 + 2) * 2,
  delay: sr(i * 7) * 4,
}));

export function Aurora() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <div 
        className="absolute -top-[10%] left-[20%] w-[50%] h-[40%] blur-[120px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(163,230,53,0.1) 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute bottom-[0%] right-[10%] w-[40%] h-[30%] blur-[100px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function HeroParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {HERO_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#A3E635]/40"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
}
