"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";
import { Skeleton } from "@/components/ui/Skeleton";
import { TicketDrawer } from "@/components/tickets/TicketDrawer";
import { formatDate, getPriorityColor, getStatusColor } from "@/lib/utils";
import { FloatingOrbs } from "@/components/ui/BackgroundEffects";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("ticketId", {
    header: "Ticket ID",
    cell: (info) => (
      <span className="font-mono text-xs text-blue-400 font-semibold">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("subject", {
    header: "Subject",
    cell: (info) => (
      <span className="text-sm text-slate-200 line-clamp-1 max-w-[200px]">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => (
      <span className="text-xs text-slate-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("subcategory", {
    header: "Subcategory",
    cell: (info) => (
      <span className="text-xs text-slate-400">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => (
      <Badge className={getPriorityColor(info.getValue())}>
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("confidence", {
    header: "Confidence",
    cell: (info) => (
      <div className="w-28">
        <ConfidenceMeter value={info.getValue()} size="sm" />
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <Badge className={getStatusColor(info.getValue())}>
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: (info) => (
      <span className="text-xs text-slate-400">{formatDate(info.getValue())}</span>
    ),
  }),
];

const PRIORITIES = ["", "critical", "high", "medium", "low"];
const STATUSES = ["", "open", "in-progress", "resolved", "closed"];

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [sorting, setSorting] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const limit = 15;

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        priority,
        status,
      });
      const res = await fetch(`/api/tickets?${params}`);
      const data = await res.json();
      setTickets(data.tickets || []);
      setTotal(data.pagination?.total || 0);
    } finally {
      setLoading(false);
    }
  }, [page, search, priority, status]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const table = useReactTable({
    data: tickets,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="relative min-h-full">
      <FloatingOrbs />
      <div className="relative z-10 p-6 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Ticket Management</h1>
            <p className="text-sm text-slate-400">{total.toLocaleString()} total tickets</p>
          </div>
          <Button onClick={fetchTickets} variant="secondary" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Refresh
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="glass rounded-xl p-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search tickets..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
          </div>
          <select
            value={priority}
            onChange={(e) => { setPriority(e.target.value); setPage(1); }}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p} className="bg-[#1E293B]">
                {p ? p.charAt(0).toUpperCase() + p.slice(1) : "All Priorities"}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-[#1E293B]">
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All Statuses"}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b border-white/10">
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            header.column.getIsSorted() === "asc" ? <ArrowUp className="w-3 h-3 text-blue-400" /> :
                            header.column.getIsSorted() === "desc" ? <ArrowDown className="w-3 h-3 text-blue-400" /> :
                            <ArrowUpDown className="w-3 h-3 text-slate-600" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {loading ? (
                  [...Array(8)].map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      {columns.map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <Skeleton className="h-5 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedTicket(row.original.ticketId)}
                    className="border-b border-white/5 cursor-pointer hover:bg-white/3 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-xs text-slate-400">
                Page {page} of {totalPages} · {total} tickets
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  Previous
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                    >
                      {p}
                    </button>
                  );
                })}
                <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <TicketDrawer ticketId={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
}
