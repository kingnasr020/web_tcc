import { useState } from "react";
import { Search, RefreshCw, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useTeknisiList } from "../../hooks/useTeknisi";
import TeknisiTable from "../../components/teknisi/TeknisiTable";
import axiosInstance from "../../api/axios"; // Pastikan path ini sesuai dengan lokasi file axios kamu

export default function TeknisiPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "",
    nik: "", spesialisasi: "", alamat: "", area_kerja: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data = [], isLoading, isError, error, refetch } = useTeknisiList();

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.phone?.toLowerCase().includes(keyword) ||
      item.nik?.toLowerCase().includes(keyword)
    );
  });

  const handleCreateTeknisi = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axiosInstance.post('/admin/teknisi', formData);
      
      if (response.data.success) {
        toast.success("Teknisi berhasil ditambahkan!");
        setIsModalOpen(false);
        refetch(); // Refresh data di tabel
        
        // Reset form
        setFormData({ 
          name: "", email: "", phone: "", password: "", 
          nik: "", spesialisasi: "", alamat: "", area_kerja: "" 
        });
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      if (backendMessage) {
        toast.error(`Gagal: ${backendMessage}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Teknisi</h1>
          <p className="text-slate-400 mt-1">Data teknisi yang terdaftar pada sistem.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          <Plus size={18} /> Tambah Teknisi
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nama, email, telepon atau NIK..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => refetch()}
          className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <TeknisiTable data={filteredData} isLoading={isLoading} isError={isError} error={error} refetch={refetch} />

      {/* Modal Tambah Teknisi */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-md border border-slate-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Tambah Teknisi Baru</h2>
            
            <form onSubmit={handleCreateTeknisi} className="space-y-4">
              <input type="text" placeholder="Nama Lengkap" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name} />
              <input type="email" placeholder="Email" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, email: e.target.value})} value={formData.email} />
              <input type="text" placeholder="Nomor Telepon" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, phone: e.target.value})} value={formData.phone} />
              <input type="password" placeholder="Password (Sementara)" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, password: e.target.value})} value={formData.password} />
              <input type="text" placeholder="NIK" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, nik: e.target.value})} value={formData.nik} />
              <input type="text" placeholder="Spesialisasi (Cth: AC, Kulkas)" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, spesialisasi: e.target.value})} value={formData.spesialisasi} />
              <input type="text" placeholder="Alamat" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, alamat: e.target.value})} value={formData.alamat} />
              <input type="text" placeholder="Area Kerja" required className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, area_kerja: e.target.value})} value={formData.area_kerja} />
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white transition">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition">
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}