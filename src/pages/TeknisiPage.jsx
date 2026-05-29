import AdminLayout from '../layouts/AdminLayout'
import TeknisiTable from '../components/teknisi/TeknisiTable'

function TeknisiPage() {
  const teknisi = [
    {
      id: 1,
      nama: 'Budi Santoso',
      email: 'budi@gmail.com',
      status: 'Aktif',
    },
    {
      id: 2,
      nama: 'Andi Wijaya',
      email: 'andi@gmail.com',
      status: 'Offline',
    },
    {
      id: 3,
      nama: 'Slamet Riyadi',
      email: 'slamet@gmail.com',
      status: 'Aktif',
    },
  ]

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Manajemen Teknisi
        </h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Tambah Teknisi
        </button>
      </div>

      <TeknisiTable data={teknisi} />
    </AdminLayout>
  )
}

export default TeknisiPage