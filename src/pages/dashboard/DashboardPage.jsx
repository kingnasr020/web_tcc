import React, { useEffect, useState } from "react";
import { Users, Wrench, Wallet, ShoppingBag } from "lucide-react";
import StatsCard from "../../components/dashboard/StatsCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import axiosInstance from "../../api/axios";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalTeknisi: 0,
    totalOrder: 0,
    totalCustomer: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [orderRes, teknisiRes] = await Promise.all([
        axiosInstance.get("/order/antrean"),
        axiosInstance.get("/teknisi/admin"),
      ]);

      const orders = orderRes?.data?.data || [];
      const teknisi = teknisiRes?.data?.data || [];

      setStats({
        totalOrder: orders.length,
        totalTeknisi: teknisi.length,
        totalCustomer: 0,
        totalRevenue: 0,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Teknisi"
          value={loading ? "..." : stats.totalTeknisi}
          icon={Wrench}
          colorTheme="blue"
        />

        <StatsCard
          title="Pelanggan Aktif"
          value={loading ? "..." : stats.totalCustomer}
          icon={Users}
          colorTheme="cyan"
        />

        <StatsCard
          title="Total Order"
          value={loading ? "..." : stats.totalOrder}
          icon={ShoppingBag}
          colorTheme="emerald"
        />

        <StatsCard
          title="Pendapatan"
          value={loading ? "..." : `Rp ${stats.totalRevenue}`}
          icon={Wallet}
          colorTheme="amber"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
          <p className="font-medium">Data Backend Aktif</p>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Teknisi :{" "}
              <span className="font-semibold text-slate-700">
                {stats.totalTeknisi}
              </span>
            </p>

            <p className="text-sm">
              Order :{" "}
              <span className="font-semibold text-slate-700">
                {stats.totalOrder}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}