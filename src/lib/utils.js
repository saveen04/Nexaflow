import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getPriorityColor(priority) {
  switch (priority?.toLowerCase()) {
    case "critical": return "text-red-400 bg-red-400/10 border-red-400/30";
    case "high": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    case "medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    case "low": return "text-green-400 bg-green-400/10 border-green-400/30";
    default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
  }
}

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "open": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
    case "in-progress": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    case "resolved": return "text-green-400 bg-green-400/10 border-green-400/30";
    case "closed": return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
  }
}

export function getConfidenceColor(confidence) {
  if (confidence >= 90) return "text-green-400";
  if (confidence >= 70) return "text-yellow-400";
  if (confidence >= 50) return "text-orange-400";
  return "text-red-400";
}
