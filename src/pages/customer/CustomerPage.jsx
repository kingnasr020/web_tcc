import { useState } from "react";
import { Search, RefreshCw, Users } from "lucide-react";
import { useCustomerList } from "../../hooks/useCustomer";

export default function CustomerPage() {
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    refetch,
  } = useCustomerList();

  const customers = data.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Customer Management
        </h1>

        <p className="text-slate-500 mt-2">
          Daftar seluruh customer yang terdaftar.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 border shadow-sm">
        <div className="flex items-center gap-3">
          <Users size={24} />
          <div>
            <p className="text-sm text-slate-500">
              Total Customer
            </p>
            <p className="text-2xl font-bold">
              {customers.length}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />
        </div>

        <button
          onClick={() => refetch()}
          className="px-4 rounded-xl border bg-white"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-5 py-4 text-left">Nama</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Telepon</th>
              <th className="px-5 py-4 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    {customer.name}
                  </td>

                  <td className="px-5 py-4">
                    {customer.email}
                  </td>

                  <td className="px-5 py-4">
                    {customer.phone}
                  </td>

                  <td className="px-5 py-4">
                    {customer.role}
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