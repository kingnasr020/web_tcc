import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function AdminLayout() {
  // Secara otomatis terbuka di layar besar (Laptop), tertutup di layar kecil (HP)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  // Tutup sidebar otomatis saat pindah halaman (hanya berlaku di HP)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Tutup pakai tombol ESC di keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex w-full h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Overlay layar gelap (Hanya muncul di HP saat menu dibuka) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Area Sidebar dengan Transisi Halus (Smooth) */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 h-full
          transition-all duration-300 ease-in-out overflow-hidden shrink-0
          ${sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:translate-x-0 lg:w-0"}
        `}
      >
        {/* Lebar statis w-64 di dalam agar isi menu tidak gepeng/berantakan saat animasi menutup */}
        <div className="w-64 h-full">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </aside>

      {/* Area Utama (Navbar + Konten Dashboard) */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        
        {/* Tombol hamburger menu di Navbar Anda sekarang otomatis berfungsi untuk PC! */}
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-1 overflow-y-auto w-full">
          <div className="p-6 md:p-8 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}