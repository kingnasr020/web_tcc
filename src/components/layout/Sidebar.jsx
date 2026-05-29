import React from "react";
import {
  LayoutDashboard,
  Wrench,
  Users,
  ShoppingBag,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
  { 
    name: "Dashboard", 
    icon: LayoutDashboard, 
    path: "/dashboard" 
  },
  { 
    name: "Teknisi", 
    icon: Wrench, 
    path: "/teknisi" 
  },
  { 
    name: "Customer", 
    icon: Users, 
    path: "/customer" 
  },
  { 
    name: "Order", 
    icon: ShoppingBag, 
    path: "/order" 
  },
];

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-full h-full bg-gradient-to-b from-blue-600 to-cyan-500 text-white p-6 flex flex-col shadow-xl">
      
      {/* Header Logo & Title */}
      <div className="mb-12 shrink-0">
        <h1 className="text-4xl font-extrabold tracking-tight">
          ServiceHub
        </h1>
        <p className="text-blue-100 mt-2 font-medium">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-3 flex-1 overflow-y-auto">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={onClose} // Menutup sidebar otomatis di HP saat menu diklik
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-semibold ${
                  isActive
                    ? "bg-white text-blue-600 shadow-lg shadow-blue-900/20"
                    : "text-blue-50 hover:bg-white/10"
                }`
              }
            >
              <Icon size={22} className="shrink-0" />
              <span className="truncate">{menu.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}