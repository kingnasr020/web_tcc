import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Modal from "../ui/Modal";
import { useCreateTeknisi, useUpdateTeknisi } from "../../hooks/useTeknisi";

const INITIAL_FORM = {
  nama: "",
  email: "",
  telepon: "",
  spesialisasi: "",
  lokasi: "",
  status: "aktif",
};

const SPESIALISASI_OPTIONS = [
  "AC & Pendingin",
  "Elektronik Rumah",
  "Kulkas & Freezer",
  "Mesin Cuci",
  "Komputer & Laptop",
  "Pompa Air",
  "Instalasi Listrik",
  "Plumbing",
  "Lainnya",
];

export default function TeknisiModal({ isOpen, onClose, teknisi = null }) {
  const isEdit = !!teknisi;
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const createMutation = useCreateTeknisi();
  const updateMutation = useUpdateTeknisi();
  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Populate form on edit
  useEffect(() => {
    if (teknisi) {
      setForm({
        nama: teknisi.nama || "",
        email: teknisi.email || "",
        telepon: teknisi.telepon || "",
        spesialisasi: teknisi.spesialisasi || "",
        lokasi: teknisi.lokasi || "",
        status: teknisi.status || "aktif",
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [teknisi, isOpen]);

  const validate = () => {
    const errs = {};
    if (!form.nama.trim()) errs.nama = "Nama wajib diisi.";
    if (!form.email.trim()) errs.email = "Email wajib diisi.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Format email tidak valid.";
    if (!form.telepon.trim()) errs.telepon = "Nomor telepon wajib diisi.";
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.telepon)) errs.telepon = "Format nomor tidak valid.";
    if (!form.spesialisasi) errs.spesialisasi = "Spesialisasi wajib dipilih.";
    if (!form.lokasi.trim()) errs.lokasi = "Lokasi wajib diisi.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...form };

    if (isEdit) {
      await updateMutation.mutateAsync({ id: teknisi.id, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    onClose();
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 rounded-xl bg-slate-800/60 border text-white placeholder-slate-500 text-sm outline-none transition-all duration-200
    focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50
    ${errors[field] ? "border-red-500/60" : "border-slate-700/60 hover:border-slate-600"}`;

  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Data Teknisi" : "Tambah Teknisi Baru"}
      size="md"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nama */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Nama Lengkap</label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Budi Santoso"
              className={inputClass("nama")}
            />
            {errors.nama && <p className="text-red-400 text-xs mt-1">{errors.nama}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="budi@email.com"
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Telepon */}
          <div>
            <label className={labelClass}>No. Telepon</label>
            <input
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              placeholder="0812-3456-7890"
              className={inputClass("telepon")}
            />
            {errors.telepon && <p className="text-red-400 text-xs mt-1">{errors.telepon}</p>}
          </div>

          {/* Spesialisasi */}
          <div>
            <label className={labelClass}>Spesialisasi</label>
            <select
              name="spesialisasi"
              value={form.spesialisasi}
              onChange={handleChange}
              className={inputClass("spesialisasi")}
            >
              <option value="" disabled className="bg-slate-800">Pilih spesialisasi</option>
              {SPESIALISASI_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-slate-800">{s}</option>
              ))}
            </select>
            {errors.spesialisasi && <p className="text-red-400 text-xs mt-1">{errors.spesialisasi}</p>}
          </div>

          {/* Lokasi */}
          <div>
            <label className={labelClass}>Lokasi / Kota</label>
            <input
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              placeholder="Jakarta Selatan"
              className={inputClass("lokasi")}
            />
            {errors.lokasi && <p className="text-red-400 text-xs mt-1">{errors.lokasi}</p>}
          </div>

          {/* Status */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Status</label>
            <div className="flex gap-3">
              {["aktif", "nonaktif", "sibuk"].map((s) => {
                const colorMap = {
                  aktif: "peer-checked:border-emerald-500/60 peer-checked:bg-emerald-500/10 peer-checked:text-emerald-400",
                  nonaktif: "peer-checked:border-slate-500/60 peer-checked:bg-slate-500/10 peer-checked:text-slate-300",
                  sibuk: "peer-checked:border-amber-500/60 peer-checked:bg-amber-500/10 peer-checked:text-amber-400",
                };
                return (
                  <label key={s} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={form.status === s}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div
                      className={`border border-slate-700 rounded-xl py-2 text-center text-sm font-medium text-slate-500 transition-all capitalize
                        ${colorMap[s]}`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold
              hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20
              disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={15} className="animate-spin" />}
            {isLoading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Teknisi"}
          </button>
        </div>
      </form>
    </Modal>
  );
}