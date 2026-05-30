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
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Manajemen Teknisi</h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola data dan status teknisi servis Anda.
          </p>
        </div>

        <button
          onClick={() => modal.open(null)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600
            text-white text-sm font-medium hover:bg-blue-700 transition-all
            shadow-sm shadow-blue-200 active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus size={18} />
          Tambah Teknisi
        </button>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Teknisi", value: stats.total, color: "text-slate-800", bg: "bg-white border-slate-200 shadow-sm" },
          { label: "Aktif", value: stats.aktif, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100 shadow-sm" },
          { label: "Sibuk", value: stats.sibuk, color: "text-amber-600", bg: "bg-amber-50 border-amber-100 shadow-sm" },
          { label: "Nonaktif", value: stats.nonaktif, color: "text-slate-500", bg: "bg-slate-50 border-slate-100 shadow-sm" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border rounded-2xl px-5 py-4`}>
            <p className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Cari nama, email, atau spesialisasi..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm
              placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-2 shadow-sm overflow-x-auto">
          <Filter size={15} className="text-slate-400 flex-shrink-0 ml-2" />
          <div className="flex gap-1 py-1.5 flex-nowrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => handleStatusChange(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  statusFilter === f.value
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent"
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
          className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center
            text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex-shrink-0 shadow-sm"
          title="Refresh data"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Dummy data notice */}
      {useDummy && (
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm shadow-sm">
          <Users size={18} className="flex-shrink-0 text-amber-500" />
          <span>
            Menampilkan <strong>dummy data</strong> — endpoint{" "}
            <code className="font-mono text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
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