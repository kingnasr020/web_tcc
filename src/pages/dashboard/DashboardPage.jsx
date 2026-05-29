import React from "react";
import { Users, Wrench, Wallet, ShoppingBag } from "lucide-react";
import StatsCard from "../../components/dashboard/StatsCard";
import RevenueChart from "../../components/dashboard/RevenueChart";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Monitoring performa marketplace jasa servis secara realtime.
        </p>
      </div>

      {/* Stats Grid - Memastikan 4 kolom rapi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Teknisi" 
          value="124" 
          icon={Wrench} 
          colorTheme="blue" 
          trend="+12%" 
        />
        <StatsCard 
          title="Pelanggan Aktif" 
          value="2,430" 
          icon={Users} 
          colorTheme="cyan" 
          trend="+5.4%" 
        />
        <StatsCard 
          title="Total Order" 
          value="1,240" 
          icon={ShoppingBag} 
          colorTheme="emerald" 
          trend="+24%" 
        />
        <StatsCard 
          title="Pendapatan" 
          value="Rp 12,4Jt" 
          icon={Wallet} 
          colorTheme="amber" 
          trend="+8%" 
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        
        {/* Komponen sampingan */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
          <p className="font-medium">Area Komponen Tambahan</p>
          <p className="text-sm">(Aktivitas Terbaru)</p>
        </div>
      </div>
    </div>
  );
}