import { useState, useMemo } from "react";
import { Plus, Search, Filter, RefreshCw, Users } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";
import useModal from "../../hooks/useModal";
import { useTeknisiList } from "../../hooks/useTeknisi";
import TeknisiTable from "../../components/teknisi/TeknisiTable";
import TeknisiModal from "../../components/teknisi/TeknisiModal";

// ─── Dummy data fallback (hapus setelah backend /api/admin/teknisi aktif) ────
const DUMMY_TEKNISI = [
  { id: "1", nama: "Budi Santoso", email: "budi@servis.com", telepon: "0812-1111-2222", spesialisasi: "AC & Pendingin", lokasi: "Jakarta Selatan", status: "aktif" },
  { id: "2", nama: "Siti Rahayu", email: "siti@servis.com", telepon: "0813-2222-3333", spesialisasi: "Mesin Cuci", lokasi: "Bandung", status: "aktif" },
  { id: "3", nama: "Ahmad Fauzi", email: "ahmad@servis.com", telepon: "0814-3333-4444", spesialisasi: "Komputer & Laptop", lokasi: "Surabaya", status: "sibuk" },
  { id: "4", nama: "Dewi Lestari", email: "dewi@servis.com", telepon: "0815-4444-5555", spesialisasi: "Elektronik Rumah", lokasi: "Yogyakarta", status: "aktif" },
  { id: "5", nama: "Riko Pratama", email: "riko@servis.com", telepon: "0816-5555-6666", spesialisasi: "Instalasi Listrik", lokasi: "Semarang", status: "nonaktif" },
  { id: "6", nama: "Nurul Hidayah", email: "nurul@servis.com", telepon: "0817-6666-7777", spesialisasi: "Kulkas & Freezer", lokasi: "Medan", status: "aktif" },
  { id: "7", nama: "Joko Widodo", email: "joko@servis.com", telepon: "0818-7777-8888", spesialisasi: "Pompa Air", lokasi: "Bekasi", status: "aktif" },
  { id: "8", nama: "Rina Susanti", email: "rina@servis.com", telepon: "0819-8888-9999", spesialisasi: "Plumbing", lokasi: "Depok", status: "sibuk" },
];

const STATUS_FILTERS = [
  { value: "", label: "Semua Status" },
  { value: "aktif", label: "Aktif" },
  { value: "nonaktif", label: "Nonaktif" },
  { value: "sibuk", label: "Sibuk" },
];

const LIMIT = 8;

export default function TeknisiPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const modal = useModal();

  // TanStack Query — akan hit backend kalau sudah aktif
  const { data: apiData, isLoading, isError, error, refetch } = useTeknisiList({
    page,
    limit: LIMIT,
    search: debouncedSearch,
    status: statusFilter,
  });

  // ─── Fallback ke dummy data kalau API belum ada ────────────────
  const useDummy = isError || !apiData;
  const filteredDummy = useMemo(() => {
    if (!useDummy) return [];
    return DUMMY_TEKNISI.filter((t) => {
      const matchSearch =
        !debouncedSearch ||
        t.nama.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.spesialisasi.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = !statusFilter || t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [useDummy, debouncedSearch, statusFilter]);

  const dummyPaged = filteredDummy.slice((page - 1) * LIMIT, page * LIMIT);

  const tableData = useDummy ? dummyPaged : (apiData?.data ?? []);
  const totalItems = useDummy ? filteredDummy.length : (apiData?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalItems / LIMIT));
  const effectiveLoading = useDummy ? false : isLoading;
  const effectiveError = useDummy ? false : isError;

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  const stats = {
    total: DUMMY_TEKNISI.length,
    aktif: DUMMY_TEKNISI.filter((t) => t.status === "aktif").length,
    sibuk: DUMMY_TEKNISI.filter((t) => t.status === "sibuk").length,
    nonaktif: DUMMY_TEKNISI.filter((t) => t.status === "nonaktif").length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Manajemen Teknisi</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Kelola data dan status teknisi servis Anda.
          </p>
        </div>

        <button
          onClick={() => modal.open(null)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
            text-white text-sm font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all
            shadow-lg shadow-cyan-500/20 active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus size={16} />
          Tambah Teknisi
        </button>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Teknisi", value: stats.total, color: "text-white", bg: "bg-slate-800/60" },
          { label: "Aktif", value: stats.aktif, color: "text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/20" },
          { label: "Sibuk", value: stats.sibuk, color: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/20" },
          { label: "Nonaktif", value: stats.nonaktif, color: "text-slate-400", bg: "bg-slate-700/30" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-slate-800 rounded-xl px-4 py-3`}>
            <p className="text-slate-500 text-xs mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Cari nama, email, atau spesialisasi..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm
              placeholder-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-slate-500 flex-shrink-0" />
          <div className="flex gap-1 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => handleStatusChange(f.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === f.value
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Refresh */}
        <button
          onClick={() => refetch()}
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center
            text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex-shrink-0"
          title="Refresh data"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Dummy data notice */}
      {useDummy && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          <Users size={15} className="flex-shrink-0" />
          <span>
            Menampilkan <strong>dummy data</strong> — endpoint{" "}
            <code className="font-mono text-xs bg-amber-500/10 px-1.5 py-0.5 rounded">
              GET /api/admin/teknisi
            </code>{" "}
            belum aktif di backend.
          </span>
        </div>
      )}

      {/* Table */}
      <TeknisiTable
        data={tableData}
        isLoading={effectiveLoading}
        isError={effectiveError}
        error={error}
        refetch={refetch}
        search={debouncedSearch}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        limit={LIMIT}
        onPageChange={handlePageChange}
        onEdit={(teknisi) => modal.open(teknisi)}
      />

      {/* Modal */}
      <TeknisiModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        teknisi={modal.data}
      />
    </div>
  );
}