import { useState } from "react";
import { Edit2, Trash2, MoreVertical, CheckCircle, XCircle, Clock } from "lucide-react";
import { TableSkeleton } from "../ui/Loader";
import { EmptyState, SearchEmptyState, ErrorState } from "../ui/EmptyState";
import ConfirmModal from "../ui/ConfirmModal";
import Pagination from "../ui/Pagination";
import { useDeleteTeknisi, useToggleTeknisiStatus } from "../../hooks/useTeknisi";

const STATUS_CONFIG = {
  aktif: {
    label: "Aktif",
    icon: CheckCircle,
    className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  nonaktif: {
    label: "Nonaktif",
    icon: XCircle,
    className: "bg-slate-700/50 text-slate-400 border border-slate-600/30",
  },
  sibuk: {
    label: "Sibuk",
    icon: Clock,
    className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.nonaktif;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.className}`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

function Avatar({ nama }) {
  const initials = nama
    ?.split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const colors = [
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
  ];
  const color = colors[(nama?.charCodeAt(0) || 0) % colors.length];
  return (
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function TeknisiTable({
  data,
  isLoading,
  isError,
  error,
  refetch,
  search,
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  onEdit,
}) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const deleteMutation = useDeleteTeknisi();
  const toggleMutation = useToggleTeknisiStatus();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleToggleStatus = (teknisi) => {
    const nextStatus = teknisi.status === "aktif" ? "nonaktif" : "aktif";
    toggleMutation.mutate({ id: teknisi.id, status: nextStatus });
  };

  // ─── States ────────────────────────────────────────────
  if (isError) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      {/* Table container */}
      <div className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden">
        {/* Responsive scroll wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Teknisi
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                  Kontak
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                  Spesialisasi
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                  Lokasi
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {isLoading ? (
                <TableSkeleton rows={5} cols={6} />
              ) : !data?.length ? (
                <tr>
                  <td colSpan={6}>
                    {search ? (
                      <SearchEmptyState query={search} />
                    ) : (
                      <EmptyState
                        title="Belum ada teknisi"
                        description="Tambahkan teknisi pertama Anda untuk mulai mengelola tim servis."
                      />
                    )}
                  </td>
                </tr>
              ) : (
                data.map((teknisi) => (
                  <tr
                    key={teknisi.id}
                    className="group hover:bg-slate-800/30 transition-colors duration-150"
                  >
                    {/* Teknisi */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar nama={teknisi.nama} />
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">{teknisi.nama}</p>
                          <p className="text-slate-500 text-xs truncate sm:hidden">{teknisi.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Kontak */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-slate-300 truncate">{teknisi.email}</p>
                      <p className="text-slate-500 text-xs">{teknisi.telepon}</p>
                    </td>

                    {/* Spesialisasi */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                        {teknisi.spesialisasi}
                      </span>
                    </td>

                    {/* Lokasi */}
                    <td className="px-6 py-4 text-slate-400 text-sm hidden lg:table-cell">
                      {teknisi.lokasi}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(teknisi)}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        title="Klik untuk toggle status"
                      >
                        <StatusBadge status={teknisi.status} />
                      </button>
                    </td>

                    {/* Aksi */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(teknisi)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                          title="Edit teknisi"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(teknisi)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Hapus teknisi"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && data?.length > 0 && (
          <div className="px-6 pb-5 border-t border-slate-800/50 pt-1">
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              limit={limit}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        title="Hapus Teknisi"
        message={`Apakah Anda yakin ingin menghapus teknisi "${deleteTarget?.nama}"? Data tidak dapat dikembalikan.`}
      />
    </>
  );
}