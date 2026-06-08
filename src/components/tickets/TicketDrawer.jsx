"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Clock, Cpu, Zap, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate, getPriorityColor, getStatusColor } from "@/lib/utils";

export function TicketDrawer({ ticketId, onClose }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ticketId) return;
    setLoading(true);
    fetch(`/api/tickets/${ticketId}`)
      .then((r) => r.json())
      .then((d) => setTicket(d))
      .finally(() => setLoading(false));
  }, [ticketId]);

  return (
    <AnimatePresence>
      {ticketId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#111827] border-l border-white/10 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0F172A]/50">
              <div>
                <h2 className="text-base font-semibold text-white">Ticket Details</h2>
                <p className="text-xs text-slate-400">{ticketId}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16" />)}
                </div>
              ) : ticket ? (
                <>
                  {/* Subject */}
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Subject</p>
                    <p className="text-sm font-medium text-white">{ticket.subject}</p>
                  </div>

                  {/* Description */}
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Description</p>
                    <p className="text-sm text-slate-300">{ticket.description}</p>
                  </div>

                  {/* AI Classification */}
                  <div className="glass rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-semibold text-blue-400">AI Classification</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Category</p>
                        <p className="text-sm text-white">{ticket.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Subcategory</p>
                        <p className="text-sm text-white">{ticket.subcategory}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Priority</p>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Status</p>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-2">AI Confidence Score</p>
                    <ConfidenceMeter value={ticket.confidence} size="lg" />
                  </div>

                  {/* Meta */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="glass rounded-xl p-3 text-center">
                      <Bot className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-400">Model</p>
                      <p className="text-xs text-white font-medium truncate">{ticket.aiModel}</p>
                    </div>
                    <div className="glass rounded-xl p-3 text-center">
                      <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-400">Tokens</p>
                      <p className="text-xs text-white font-medium">{ticket.tokensUsed}</p>
                    </div>
                    <div className="glass rounded-xl p-3 text-center">
                      <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-400">Latency</p>
                      <p className="text-xs text-white font-medium">{ticket.latency}ms</p>
                    </div>
                  </div>

                  {/* Prediction Timeline */}
                  {ticket.predictionLog?.length > 0 && (
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-300">Prediction Timeline</span>
                      </div>
                      <div className="space-y-2">
                        {ticket.predictionLog.map((log, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs">
                            <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
                            <div className="flex-1 flex items-center justify-between">
                              <span className="text-slate-400">{formatDate(log.timestamp)}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500">{log.model}</span>
                                <span className="text-green-400">{log.confidence}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 text-center">
                    Created {formatDate(ticket.createdAt)}
                  </p>
                </>
              ) : (
                <p className="text-slate-400 text-sm">Ticket not found</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
