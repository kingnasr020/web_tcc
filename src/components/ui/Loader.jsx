import { Loader2 } from "lucide-react";

// Full page spinner
export function PageLoader() {
  return (
    <div className="flex h-full min-h-[300px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="animate-spin text-cyan-500" />
        <p className="text-slate-400 text-sm">Memuat data...</p>
      </div>
    </div>
  );
}

// Inline spinner
export function Spinner({ size = 16, className = "" }) {
  return <Loader2 size={size} className={`animate-spin text-cyan-500 ${className}`} />;
}

// Table row skeleton
export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, ri) => (
        <tr key={ri} className="border-b border-slate-800/50">
          {Array.from({ length: cols }).map((_, ci) => (
            <td key={ci} className="px-6 py-4">
              <div
                className="h-4 rounded-md bg-slate-800 animate-pulse"
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// Card skeleton
export function CardSkeleton({ className = "" }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 animate-pulse ${className}`}>
      <div className="h-4 w-1/3 bg-slate-800 rounded mb-3" />
      <div className="h-8 w-1/2 bg-slate-800 rounded mb-2" />
      <div className="h-3 w-2/3 bg-slate-800 rounded" />
    </div>
  );
}

// Default export (alias)
export default Spinner;