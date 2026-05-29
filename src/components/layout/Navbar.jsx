import { useState, useRef, useEffect } from "react";
import { Menu, Bell, LogOut, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import authService from "../../services/authService";

const PAGE_TITLES = {
  "/dashboard": { title: "Dashboard", subtitle: "Ringkasan aktivitas hari ini" },
  "/teknisi": { title: "Manajemen Teknisi", subtitle: "Kelola data teknisi servis" },
  "/customer": { title: "Customer", subtitle: "Daftar pelanggan aplikasi" },
  "/order": { title: "Order", subtitle: "Daftar transaksi dan pesanan" },
  "/profile": { title: "Profil Saya", subtitle: "Detail informasi akun administrator" },
};

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  // State untuk dropdown profil
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // State BARU untuk Modal Konfirmasi Logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const pageInfo = PAGE_TITLES[location.pathname] || { title: "ServisPro Admin", subtitle: "" };

  // Menutup dropdown jika user klik di luar kotak dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fungsi Eksekusi Logout (Dijalankan dari dalam Modal)
  const confirmLogout = async () => {
    try {
      await authService.logout().catch(() => {});
      logout();
      setShowLogoutModal(false); // Tutup modal
      toast.success("Berhasil keluar.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Gagal logout");
      setShowLogoutModal(false);
    }
  };

  // Fungsi Notifikasi Sementara
  const handleNotifClick = () => {
    toast("Belum ada notifikasi baru", { icon: "🔔" });
  };

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 bg-white flex-shrink-0 relative z-40">
        
        {/* Kiri: hamburger + judul */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onMenuClick}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex-shrink-0"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <h1 className="text-slate-800 font-bold text-base md:text-lg leading-tight truncate">
              {pageInfo.title}
            </h1>
            {pageInfo.subtitle && (
              <p className="text-slate-500 text-xs hidden sm:block">{pageInfo.subtitle}</p>
            )}
          </div>
        </div>

        {/* Kanan: Lonceng Notifikasi & Avatar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          <button 
            onClick={handleNotifClick}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-blue-200 cursor-pointer hover:scale-105 transition-transform"
            >
              {(user?.name?.[0] || "A").toUpperCase()}
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden py-1">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <p className="text-sm font-bold text-slate-800 truncate">{user?.name || "Admin"}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || "admin@servis.com"}</p>
                </div>
                
                <button 
                  onClick={() => { 
                    setIsProfileOpen(false); 
                    navigate('/profile');
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                >
                  <User size={16} /> Profil Saya
                </button>
                
                {/* Tombol ini sekarang hanya memunculkan modal kustom */}
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} /> Keluar
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* MODAL KUSTOM LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <LogOut size={24} className="text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Keluar Aplikasi?</h3>
                <p className="text-sm text-slate-500 mt-1">Sesi Anda akan diakhiri dan perlu login kembali.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-sm shadow-rose-200"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}