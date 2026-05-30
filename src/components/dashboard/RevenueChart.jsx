import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axiosInstance from "../../api/axios";

// DATA CADANGAN: Digunakan jika API error atau data kosong
const defaultData = [
  { name: "Jan", total: 0 }, { name: "Feb", total: 0 }, { name: "Mar", total: 0 },
  { name: "Apr", total: 0 }, { name: "Mei", total: 0 }, { name: "Jun", total: 0 },
  { name: "Jul", total: 0 }, { name: "Ags", total: 0 }, { name: "Sep", total: 0 },
  { name: "Okt", total: 0 }, { name: "Nov", total: 0 }, { name: "Des", total: 0 }
];

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/admin/laporan/revenue-bulanan");
      
      // Cek apakah response sukses DAN datanya ada isinya
      if (response.data?.success && response.data?.data?.length > 0) {
        setData(response.data.data);
      } else {
        setData(defaultData); // Gunakan default jika kosong
      }
    } catch (error) {
      console.error("Gagal memuat data grafik:", error);
      setData(defaultData); // Gunakan default jika API Error (misal: 404 Not Found)
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className="
        bg-white
        rounded-[28px]
        p-6
        shadow-lg
        border
        border-slate-100
      "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Revenue Analytics
        </h2>
        <p className="text-slate-500 mt-1">
          Statistik pendapatan bulanan
        </p>
      </div>

      <div className="w-full h-[350px]">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center text-slate-400 animate-pulse">
            Memuat grafik...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                dy={10} 
                tick={{ fill: "#94a3b8", fontSize: 12 }} 
              />
              
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(value) => value === 0 ? "0" : `${value / 1000}k`}
                domain={[0, (dataMax) => (dataMax === 0 ? 1000 : dataMax)]} 
              />

              <Tooltip 
                formatter={(value) => [formatRupiah(value), "Pendapatan"]}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#2563eb" }}
                activeDot={{ r: 6, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;