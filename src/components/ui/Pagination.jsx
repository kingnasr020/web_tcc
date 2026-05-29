import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange, totalItems, limit }) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalItems);

  const getPages = () => {
    const pages = [];
    const delta = 1;
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      pages.push(i);
    }
    if (pages[0] > 2) pages.unshift("...");
    if (pages[0] > 1) pages.unshift(1);
    if (pages[pages.length - 1] < totalPages - 1) pages.push("...");
    if (pages[pages.length - 1] < totalPages) pages.push(totalPages);
    return pages;
  };

  const btnBase =
    "w-8 h-8 rounded-lg text-sm font-medium transition-all flex items-center justify-center";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 pt-4">
      <p className="text-slate-500 text-sm">
        Menampilkan <span className="text-slate-300">{from}–{to}</span> dari{" "}
        <span className="text-slate-300">{totalItems}</span> data
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`${btnBase} text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <ChevronLeft size={15} />
        </button>

        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-600 text-sm">
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${btnBase} ${
                p === page
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`${btnBase} text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}