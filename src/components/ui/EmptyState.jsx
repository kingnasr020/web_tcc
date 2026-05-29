import { SearchX, ServerCrash, PackageOpen } from "lucide-react";

export function EmptyState({
  icon: Icon = PackageOpen,
  title = "Tidak ada data",
  description = "Belum ada data yang tersedia saat ini.",
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mb-4">
        <Icon size={28} className="text-slate-500" />
      </div>
      <h3 className="text-slate-300 font-semibold text-base mb-1">{title}</h3>
      <p className="text-slate-500 text-sm max-w-xs">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SearchEmptyState({ query }) {
  return (
    <EmptyState
      icon={SearchX}
      title="Pencarian tidak ditemukan"
      description={`Tidak ada hasil untuk "${query}". Coba kata kunci yang berbeda.`}
    />
  );
}

export function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
        <ServerCrash size={28} className="text-red-400" />
      </div>
      <h3 className="text-slate-300 font-semibold text-base mb-1">Gagal memuat data</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-5">
        Terjadi kesalahan saat mengambil data dari server.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}