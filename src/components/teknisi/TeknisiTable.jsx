import { TableSkeleton } from "../ui/Loader";
import { ErrorState, EmptyState } from "../ui/EmptyState";

function Avatar({ name }) {
  const initials = name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.substring(0, 2)
    ?.toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
      {initials || "T"}
    </div>
  );
}

export default function TeknisiTable({
  data,
  isLoading,
  isError,
  error,
  refetch,
}) {
  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <ErrorState
          title="Gagal memuat data"
          description={error?.message}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Teknisi
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Telepon
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Spesialisasi
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <TableSkeleton rows={5} cols={5} />
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8">
                  <EmptyState
                    title="Belum ada teknisi"
                    description="Data teknisi belum tersedia atau tidak ditemukan."
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={item.nama || item.name} />
                      <div>
                        <p className="font-semibold text-sm text-slate-800">
                          {item.nama || item.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          ID #{item.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.telepon || item.phone}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                      {item.spesialisasi || "Umum"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === "aktif"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : item.status === "sibuk"
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {item.status
                        ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                        : "Unknown"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}