import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StatsCard({ title, value, icon: Icon, colorTheme = 'blue', trend }) {
  // Tema warna yang elegan
  const themeStyles = {
    blue: 'bg-blue-50 text-blue-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  const iconClass = themeStyles[colorTheme] || themeStyles.blue;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      
      <div className="flex justify-between items-start gap-4">
        {/* min-w-0 dan truncate mencegah teks tumpah/turun berantakan */}
        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-sm font-medium truncate">{title}</p>
          <h3 className="text-3xl font-extrabold mt-1.5 text-slate-800 truncate">
            {value}
          </h3>
        </div>
        
        {/* shrink-0 memastikan ikon tidak gepeng/tergencet */}
        <div className={`p-3 rounded-xl shrink-0 ${iconClass}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
      
      {/* Bagian Trend (Bawah) */}
      {trend && (
        <div className="mt-5 flex items-center text-sm">
          <span className="flex items-center font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
            <ArrowUpRight size={16} className="mr-1" />
            {trend}
          </span>
          <span className="text-slate-400 ml-2 font-medium">Bulan ini</span>
        </div>
      )}
    </div>
  );
}