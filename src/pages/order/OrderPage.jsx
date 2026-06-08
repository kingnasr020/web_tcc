import { ClipboardList } from "lucide-react";
import { useOrders } from "../../hooks/useOrder";
import OrderTable from "../../components/order/OrderTable";

export default function OrderPage() {
  const {
    data = [],
    isLoading,
    isError,
  } = useOrders();

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Gagal mengambil data order
      </div>
    );
  }

  // 1. Menghitung jumlah masing-masing status dengan aman (kebal huruf besar/kecil)
  const stats = {
    total: data.length,
    pending: data.filter((item) => item.status?.toLowerCase() === 'pending').length,
    diproses: data.filter((item) => item.status?.toLowerCase() === 'diproses').length,
    selesai: data.filter((item) => item.status?.toLowerCase() === 'selesai').length,
    dibatalkan: data.filter((item) => item.status?.toLowerCase() === 'dibatalkan').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Manajemen Order
        </h1>

        <p className="text-slate-500 mt-2">
          Kelola seluruh pesanan servis pelanggan.
        </p>
      </div>

      {/* 2. Merender 5 Card Statistik menggunakan .map() */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Order", value: stats.total, color: "text-slate-800" },
          { label: "Pending", value: stats.pending, color: "text-amber-500" },
          { label: "Diproses", value: stats.diproses, color: "text-blue-500" },
          { label: "Selesai", value: stats.selesai, color: "text-emerald-500" },
          { label: "Dibatalkan", value: stats.dibatalkan, color: "text-red-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-slate-500 text-sm mb-1 font-medium">
              {s.label}
            </p>
            <h2 className={`text-3xl font-bold ${s.color}`}>
              {s.value}
            </h2>
          </div>
        ))}
      </div>

      <OrderTable data={data} />
    </div>
  );
}