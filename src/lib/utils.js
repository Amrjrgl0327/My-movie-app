import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export function formatDate(dataStr) {
//   if (!dataStr) return "TBA";
//   const data = new Date(dataStr);
//   if (isNaN(Date.getTime())) return "TBA";
//   return Date.toISOString().split(`T`)[0].replace(/-/g, ".");
// }

// export function formatRuntime(minutes) {
//   if (!minutes || isNaN(minutes)) return "N/A";
//   const h = Math.floor(minutes / 60);
//   const m = minutes % 60;
//   return `${h}h ${m}m`;
// }
