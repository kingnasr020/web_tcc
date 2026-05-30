import { useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { useTeknisiList } from "../../hooks/useTeknisi";
import TeknisiTable from "../../components/teknisi/TeknisiTable";

export default function TeknisiPage() {
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTeknisiList();

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.phone?.toLowerCase().includes(keyword) ||
      item.nik?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Manajemen Teknisi
        </h1>

        <p className="text-slate-400 mt-1">
          Data teknisi yang terdaftar pada sistem.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Cari nama, email, telepon atau NIK..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
          />
        </div>

        <button
          onClick={() => refetch()}
          className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <TeknisiTable
        data={filteredData}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </div>
  );
}