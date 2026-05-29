import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Zap,
  X,
  Bell,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import authService from "../../services/authService";

const NAV_ITEMS = [
  {
    section: "Menu Utama",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/teknisi", icon: Users, label: "Teknisi" },
      { to: "/order", icon: ClipboardList, label: "Order", badge: 3, disabled: true },
      { to: "/ulasan", icon: Star, label: "Ulasan", disabled: true },
    ],
  },
  {
    section: "Laporan",
    items: [
      { to: "/analytics", icon: BarChart3, label: "Analytics", disabled: true },
      { to: "/notifikasi", icon: Bell, label: "Notifikasi", disabled: true },
    ],
  },
  {
    section: "Sistem",
    items: [
      { to: "/settings", icon: Settings, label: "Pengaturan", disabled: true },
    ],
  },
];

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await authService.logout().catch(() => {});
    logout();
    toast.success("Berhasil keluar.");
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-full w-64 flex flex-col bg-slate-900 border-r border-slate-800/60">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-slate-800/60 flex-shrink-0">
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Zap size={15} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-sm tracking-tight">
              Servis<span className="text-cyan-400">Pro</span>
            </span>
            <p className="text-slate-500 text-[10px] leading-tight">Admin Dashboard</p>
          </div>
        </NavLink>

        {/* Mobile close */}
        <button
          onClick={onClose}
          className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X size={14} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_ITEMS.map((section) => (
          <div key={section.section}>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-2 mb-1.5">
              {section.section}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ to, icon: Icon, label, badge, disabled }) => (
                <li key={to}>
                  {disabled ? (
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 cursor-not-allowed select-none">
                      <Icon size={16} />
                      <span className="text-sm font-medium">{label}</span>
                      {badge && (
                        <span className="ml-auto text-[10px] bg-slate-800 text-slate-500 rounded-full px-2 py-0.5">
                          {badge}
                        </span>
                      )}
                      <span className="ml-auto text-[9px] bg-slate-800 text-slate-600 rounded-full px-1.5 py-0.5 font-medium">
                        SOON
                      </span>
                    </div>
                  ) : (
                    <NavLink
                      to={to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon size={16} className={isActive ? "text-cyan-400" : ""} />
                          <span className="text-sm font-medium">{label}</span>
                          {badge && (
                            <span className="ml-auto text-[10px] bg-cyan-500/20 text-cyan-400 rounded-full px-2 py-0.5 font-semibold">
                              {badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-slate-800/60 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/40 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {(user?.name?.[0] || "A").toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-medium truncate">{user?.name || "Admin"}</p>
            <p className="text-slate-500 text-xs truncate">{user?.email || "admin@servis.com"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </div>
  );
}