"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const stats = [
    {
      value: "12+",
      label: "Years Experience",
    },
    {
      value: "60+",
      label: "Partner Clients",
    },
    {
      value: "240+",
      label: "Projects Delivered",
    },
    {
      value: "20+",
      label: "Global Awards",
    },
  ];

  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>

      <div className="hero-container">
        <div className="hero-grid">

          {/* IMAGE (LEFT) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hero-image-wrapper"
          >
            <div className="hero-image-card">
              <img
                src="/images/hero_character.png"
                alt="Hero"
                className="hero-image"
              />
            </div>
          </motion.div>

          {/* CONTENT (RIGHT) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hero-content flex flex-col justify-center"
          >

            <h1 className="hero-title">
              NexaFlow
              <br />
              <span className="hero-title-accent">
                Orchestrator
              </span>
            </h1>

            <p className="hero-description text-left">
              Intelligent booking workflows,
              AI powered support automation,
              webhook orchestration,
              ticket classification and
              enterprise analytics.
            </p>

            <div className="hero-actions">
              <Link href="/login">
                <button className="hero-btn-primary">
                  Get Access
                  <ArrowRight size={20} />
                </button>
              </Link>

              <Link href="#features">
                <button className="hero-btn-secondary">
                  Explore Platform
                </button>
              </Link>
            </div>

            {/* Stats below actions in right side */}
            <div className="hero-stats mt-20 grid grid-cols-2 gap-6 w-full max-w-lg">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="hero-stat-card"
                >
                  <h3 className="text-3xl font-black">{item.value}</h3>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}