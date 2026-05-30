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
    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
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
}) {
  if (isError) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800">
        <ErrorState
          title="Gagal memuat data"
          description={error?.message}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase">
                Teknisi
              </th>

              <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase">
                Telepon
              </th>

              <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase">
                NIK
              </th>

              <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase">
                User ID
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableSkeleton rows={5} cols={5} />
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState
                    title="Belum ada teknisi"
                    description="Data teknisi belum tersedia."
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-800 hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={item.name} />

                      <div>
                        <p className="font-medium text-white">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          ID #{item.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.email}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.phone}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.nik}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.user_id}
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