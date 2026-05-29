import { AlertTriangle, Loader2 } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Konfirmasi Hapus",
  message = "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
  confirmLabel = "Hapus",
  variant = "danger",
}) {
  const variantStyles = {
    danger: "bg-red-500 hover:bg-red-400 shadow-red-500/25",
    warning: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/25",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle size={26} className="text-red-400" />
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">{message}</p>

        <div className="flex gap-3 w-full pt-1">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2 ${variantStyles[variant]}`}
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : null}
            {loading ? "Memproses..." : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}