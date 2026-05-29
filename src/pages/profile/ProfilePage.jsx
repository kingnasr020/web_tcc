import React from 'react';
import useAuthStore from "../../store/useAuthStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Profil Administrator</h1>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Avatar Besar */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-lg shrink-0">
            {(user?.name?.[0] || "A").toUpperCase()}
          </div>
          
          {/* Info Detail */}
          <div className="text-center sm:text-left flex-1 w-full">
            <h2 className="text-2xl font-extrabold text-slate-800">{user?.name || "Admin Utama"}</h2>
            <p className="text-slate-500 mt-1">{user?.email || "admin@marketplace.com"}</p>
            
            <div className="mt-4 inline-flex items-center justify-center px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">
              {user?.role || "Administrator"}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nomor Telepon</p>
                <p className="font-medium text-slate-700">{user?.phone || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status Akun</p>
                <p className="font-medium text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Aktif
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}