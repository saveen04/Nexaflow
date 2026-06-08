"use client";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";
import { Card } from "@/components/ui/Card";

const COLORS = ["#7C3AED", "#9333EA", "#EC4899", "#10B981", "#EF4444", "#3B82F6", "#06B6D4", "#F59E0B"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1E293B] border border-white/10 rounded-lg px-3 py-2 shadow-xl text-xs">
        {label && <p className="text-slate-400 mb-1">{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function CategoryPieChart({ data }) {
  return (
    <Card hover={false} className="col-span-1">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Category Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} opacity={0.85} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap gap-2">
        {data.slice(0, 5).map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-xs text-slate-400">{d.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PriorityDonutChart({ data }) {
  const priorityColors = {
    critical: "#EF4444",
    high: "#F97316",
    medium: "#F59E0B",
    low: "#10B981",
  };

  return (
    <Card hover={false} className="col-span-1">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Priority Breakdown</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={priorityColors[d.name] || COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: priorityColors[d.name] || COLORS[i % COLORS.length] }} />
            <span className="text-xs text-slate-400 capitalize">{d.name}: {d.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TicketTrendsChart({ data }) {
  return (
    <Card hover={false} className="col-span-2">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Ticket Trends (30 days)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="ticketGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="tickets"
            stroke="#7C3AED"
            fill="url(#ticketGrad)"
            strokeWidth={2}
            name="Tickets"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function AIConfidenceChart({ data }) {
  return (
    <Card hover={false} className="col-span-2">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">AI Confidence Trend</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="Confidence %"
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
