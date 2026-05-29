import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    month: "Jan",
    total: 4000,
  },
  {
    month: "Feb",
    total: 3000,
  },
  {
    month: "Mar",
    total: 5000,
  },
  {
    month: "Apr",
    total: 4500,
  },
  {
    month: "Mei",
    total: 7000,
  },
  {
    month: "Jun",
    total: 9000,
  },
];

const RevenueChart = () => {
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

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;