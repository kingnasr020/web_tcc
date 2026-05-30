import { useUpdateOrderStatus } from "../../hooks/useOrder";

const STATUS_OPTIONS = [
  "pending",
  "diproses",
  "selesai",
  "dibatalkan",
];

export default function OrderTable({ data }) {
  const updateMutation = useUpdateOrderStatus();

  const handleStatusChange = (id, status) => {
    updateMutation.mutate({
      id,
      status,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Order</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Layanan</th>
              <th className="text-left p-4">Alamat</th>
              <th className="text-left p-4">Jadwal</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4 font-medium">
                  {item.order_code}
                </td>

                <td className="p-4">
                  <div>{item.customer?.name}</div>
                  <div className="text-xs text-slate-500">
                    {item.customer?.phone}
                  </div>
                </td>

                <td className="p-4">
                  {item.service?.nama}
                </td>

                <td className="p-4">
                  {item.alamat_servis}
                </td>

                <td className="p-4">
                  {new Date(
                    item.jadwal_tanggal
                  ).toLocaleDateString("id-ID")}
                </td>

                <td className="p-4">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(
                        item.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}