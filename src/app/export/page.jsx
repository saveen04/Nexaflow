"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, FileSpreadsheet, Database, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FloatingOrbs } from "@/components/ui/BackgroundEffects";

export default function ExportPage() {
  const [exporting, setExporting] = useState(null);
  const [done, setDone] = useState(null);

  async function handleExport(format) {
    setExporting(format);
    setDone(null);
    try {
      const res = await fetch(`/api/export?format=${format}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tickets-${Date.now()}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      setDone(format);
      setTimeout(() => setDone(null), 3000);
    } finally {
      setExporting(null);
    }
  }

  const exportOptions = [
    {
      id: "csv",
      icon: FileText,
      label: "Export as CSV",
      description: "Comma-separated values. Compatible with Excel, Google Sheets, and any data tool.",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
    },
    {
      id: "json",
      icon: Database,
      label: "Export as JSON",
      description: "Full structured data export. Ideal for API integrations and programmatic access.",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "excel",
      icon: FileSpreadsheet,
      label: "Export as Excel",
      description: "Microsoft Excel compatible format with formatting and multiple sheets.",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="relative min-h-full">
      <FloatingOrbs />
      <div className="relative z-10 p-6 space-y-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-400" />
            Export Center
          </h1>
          <p className="text-sm text-slate-400">Download your ticket data in multiple formats</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          {exportOptions.map((opt, i) => (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`glass rounded-xl p-6 border cursor-pointer transition-all ${opt.bg}`}
            >
              <div className="mb-4">
                <opt.icon className={`w-8 h-8 ${opt.color} mb-3`} />
                <h3 className="text-sm font-semibold text-white mb-1">{opt.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{opt.description}</p>
              </div>
              <Button
                onClick={() => handleExport(opt.id === "excel" ? "csv" : opt.id)}
                loading={exporting === opt.id}
                variant={done === opt.id ? "secondary" : "primary"}
                className="w-full"
                icon={done === opt.id ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Download className="w-4 h-4" />}
              >
                {done === opt.id ? "Downloaded!" : "Download"}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="glass rounded-xl p-5 max-w-3xl border border-white/8">
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Export Notes</h3>
          <ul className="space-y-1.5">
            {[
              "Exports include all tickets stored in the database.",
              "Prediction log details are excluded from exports for size.",
              "CSV and JSON exports are generated in real-time.",
              "Large datasets may take a few seconds to generate.",
            ].map((note, i) => (
              <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>{note}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
