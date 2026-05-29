import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Sen', pendapatan: 1200000 },
  { name: 'Sel', pendapatan: 1800000 },
  { name: 'Rab', pendapatan: 1500000 },
  { name: 'Kam', pendapatan: 2100000 },
  { name: 'Jum', pendapatan: 1700000 },
  { name: 'Sab', pendapatan: 2800000 },
  { name: 'Min', pendapatan: 2500000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 w-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">Statistik Pendapatan</h2>
        <p className="text-sm text-slate-500">7 Hari Terakhir</p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3}/> {/* Cyan color */}
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              tickFormatter={(value) => `Rp${value / 1000000}M`}
            />
            <Tooltip 
              formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
            />
            <Area type="monotone" dataKey="pendapatan" stroke="#0891b2" strokeWidth={3} fillOpacity={1} fill="url(#colorPendapatan)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;