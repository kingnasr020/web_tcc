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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">
            Total Order
          </p>

          <h2 className="text-3xl font-bold">
            {data.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-amber-500">
            {
              data.filter(
                (o) => o.status === "pending"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">
            Selesai
          </p>

          <h2 className="text-3xl font-bold text-emerald-500">
            {
              data.filter(
                (o) => o.status === "selesai"
              ).length
            }
          </h2>
        </div>
      </div>

      <OrderTable data={data} />
    </div>
  );
}