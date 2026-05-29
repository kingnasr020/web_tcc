import {
  ClipboardList,
  DollarSign,
  Users,
  AlertTriangle,
} from 'lucide-react'

import AdminLayout from '../layouts/AdminLayout'

function DashboardPage() {
  const stats = [
    {
      title: 'Total Order',
      value: '1,240',
      icon: <ClipboardList size={28} />,
      color: 'bg-blue-500',
    },
    {
      title: 'Revenue',
      value: 'Rp 85jt',
      icon: <DollarSign size={28} />,
      color: 'bg-green-500',
    },
    {
      title: 'Teknisi Aktif',
      value: '32',
      icon: <Users size={28} />,
      color: 'bg-purple-500',
    },
    {
      title: 'Dispute',
      value: '5',
      icon: <AlertTriangle size={28} />,
      color: 'bg-red-500',
    },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor marketplace jasa servis secara realtime
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3 text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.color} text-white p-4 rounded-2xl`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">
          Statistik Order
        </h2>

        <div className="h-[350px] flex items-center justify-center text-gray-400">
          Grafik Recharts nanti di sini
        </div>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage